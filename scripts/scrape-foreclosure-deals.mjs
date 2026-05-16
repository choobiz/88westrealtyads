#!/usr/bin/env node
/**
 * scrape-foreclosure-deals.mjs — Pulls structured court-ordered sale
 * listings from public aggregator pages and writes them to a research
 * dump that the LP can consume.
 *
 * ─── COMPLIANCE OVERRIDE NOTE (2026-05-16) ────────────────────────────
 * This scraper is enabled by explicit operator override of the prior
 * architectural rule (see scripts/scrape-foreclosure-stats.mjs comment,
 * which forbids listing-detail scraping pending GVR WebAPI). Operator
 * accepted the n=1 precedent for a short bridge period until GVR
 * WebAPI is provisioned. When GVR data lands:
 *
 *   1. Set ENABLE_SCRAPE=false (env or default below) — scraper exits
 *      cleanly without overwriting the output.
 *   2. Replace the LP data source with the GVR-backed Postgres feed
 *      (see docs/gvr-database-schema.md).
 *   3. Delete this script.
 *
 * To stay defensible during the bridge period:
 *   - No photo URLs captured (no republish of MLS-licensed images).
 *   - No listing remarks / descriptions captured.
 *   - No listing-agent names captured.
 *   - Address masked at display time (LP renders street numbers as ████).
 *   - Postal code stored as first 3 chars only (FSA, not full LDU).
 *   - Output is research-tier, not the live LP source — LP curation
 *     gateway remains the operator's responsibility until the
 *     auto-curator is wired (see auto-curate-deals.mjs — pending).
 *
 * Output: data/foreclosure-deals.scraped.json
 * ─────────────────────────────────────────────────────────────────────
 */

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const OUT_FILE = join(REPO_ROOT, "data", "foreclosure-deals.scraped.json");

const ENABLE_SCRAPE = (process.env.ENABLE_SCRAPE ?? "true").toLowerCase() !== "false";

const SOURCES = [
  {
    name: "Simon Clayton (Macdonald Realty)",
    url: "https://simonclayton.ca/foreclosures/",
    platform: "myrealpage",
  },
  {
    name: "Macnabs (Royal LePage Elite West)",
    url: "https://www.themacnabs.com/foreclosures-and-court-ordered-sales/",
    platform: "myrealpage",
  },
  {
    name: "Realtyvibe (Sutton Premier)",
    url: "https://realtyvibe.ca/vancouver-foreclosures-for-sale/",
    platform: "myrealpage",
  },
];

const USER_AGENT =
  "Mozilla/5.0 (88WestRealty-DealResearch/1.0; +https://go.88westrealty.com)";

// MyRealPage emits structured-ish HTML. We anchor on listing-item-entry-title
// blocks and pull adjacent <alt> + price + property-type blocks.
const LISTING_TITLE_RE =
  /<h3[^>]*class=["']listing-item-entry-title["'][^>]*>\s*([\s\S]*?)<\/h3>/g;
const TITLE_PARSE_RE =
  /^\s*(?<street>[^\n]+?) in (?<city>[A-Za-z .'-]+):\s*(?<subarea>[A-Za-z .'-]+?)\s+(?<propertyType>House|Condo|Townhouse|Apartment|Detached|Half-?duplex|Duplex|Multi[- ]Family|Manufactured|Land|Other)\s+for sale.*?MLS®#\s*(?<mls>[RV]\d{6,8})/i;
const ALT_BLOCK_RE = /<alt>([\s\S]*?)<\/alt>/g;
const ALT_FIELD_RE = /<span\s+class=["']alt-(addr|subarea|city|postal-code)["']>\s*([^<]+?)\s*<\/span>/g;
const PRICE_RE = /class=["']mrp-listing-price-container["'][^>]*>\s*\$?([0-9,]+)/;
const BEDS_RE = /summary-bedrooms[^<]*<[^>]*>\s*([0-9]+)/;
const BATHS_RE = /summary-bathrooms[^<]*<[^>]*>\s*([0-9.]+)/;
const SQFT_RE = /([0-9,]{3,})\s*sq\.?\s*ft/i;
const COURT_FLAG_RE = /court[- ]?ordered|foreclosure|schedule\s*a/i;

function maskStreet(street) {
  // Replace street number with full-block placeholder so we never store
  // the exact MLS address in our research dump. Operator can resolve to
  // exact address via MLS# at curation time.
  return street.replace(/^\d+\s+/, "████ ");
}

function fsa(postalCode) {
  return (postalCode || "").trim().toUpperCase().slice(0, 3);
}

function parsePrice(html) {
  const m = html.match(PRICE_RE);
  return m ? parseInt(m[1].replace(/,/g, ""), 10) : null;
}

function parseBeds(html) {
  const m = html.match(BEDS_RE);
  return m ? parseInt(m[1], 10) : null;
}

function parseBaths(html) {
  const m = html.match(BATHS_RE);
  return m ? parseFloat(m[1]) : null;
}

function parseSqft(html) {
  const m = html.match(SQFT_RE);
  if (!m) return null;
  const n = parseInt(m[1].replace(/,/g, ""), 10);
  // Filter out years (1900-2099) and tiny numbers
  return n >= 250 && n <= 20000 ? n : null;
}

function parseListings(html, sourceName) {
  const listings = [];
  // Split HTML into approximate per-listing chunks by finding consecutive
  // listing-item-entry-title anchors and the section in between.
  const titleMatches = [...html.matchAll(LISTING_TITLE_RE)];

  for (let i = 0; i < titleMatches.length; i++) {
    const titleHtml = titleMatches[i][1];
    const titleClean = titleHtml.replace(/\s+/g, " ").trim();
    const m = titleClean.match(TITLE_PARSE_RE);
    if (!m || !m.groups) continue;

    const { street, city, subarea, propertyType, mls } = m.groups;

    // Pull the chunk of HTML between this title and the next (or EOF)
    // — that's where price/beds/baths/sqft live for THIS listing.
    const chunkStart = titleMatches[i].index;
    const chunkEnd =
      i + 1 < titleMatches.length ? titleMatches[i + 1].index : html.length;
    const chunk = html.slice(chunkStart, chunkEnd);

    // Pull alt-postal-code from the chunk if present
    let postalCode = null;
    const altSpans = chunk.matchAll(ALT_FIELD_RE);
    for (const alt of altSpans) {
      if (alt[1] === "postal-code") postalCode = alt[2];
    }

    const courtFlag = COURT_FLAG_RE.test(chunk);

    listings.push({
      mls_number: mls.toUpperCase(),
      property_type: propertyType,
      neighborhood: subarea.trim(),
      city: city.trim(),
      fsa: fsa(postalCode),
      street_masked: maskStreet(street.trim()),
      price: parsePrice(chunk),
      bedrooms: parseBeds(chunk),
      bathrooms: parseBaths(chunk),
      area_sqft: parseSqft(chunk),
      court_ordered_flag: courtFlag,
      source: sourceName,
    });
  }

  return listings;
}

async function fetchAndParse(source) {
  try {
    const res = await fetch(source.url, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) {
      return { ok: false, listings: [], error: `${res.status} ${res.statusText}` };
    }
    const html = await res.text();
    const listings = parseListings(html, source.name);
    return { ok: true, listings, bytes: html.length };
  } catch (err) {
    return { ok: false, listings: [], error: String(err.message || err) };
  }
}

function deduplicate(listings) {
  // Listings can appear across multiple aggregator sites. Dedupe by MLS#,
  // keeping the first-seen instance (source order in SOURCES is intentional).
  const seen = new Set();
  return listings.filter((l) => {
    if (seen.has(l.mls_number)) return false;
    seen.add(l.mls_number);
    return true;
  });
}

async function main() {
  if (!ENABLE_SCRAPE) {
    console.log("[fcl-deals] ENABLE_SCRAPE=false — exiting without overwrite.");
    return;
  }

  console.log(`[fcl-deals] scraping ${SOURCES.length} sources`);

  const perSource = [];
  for (const src of SOURCES) {
    const r = await fetchAndParse(src);
    perSource.push({ source: src.name, url: src.url, ...r });
    console.log(
      `[fcl-deals]   ${r.ok ? `${r.listings.length} listings` : `error: ${r.error}`} · ${src.name}`,
    );
  }

  const all = perSource.flatMap((r) => r.listings);
  const unique = deduplicate(all);

  const out = {
    source: "scrape-foreclosure-deals.mjs",
    scrapedAt: new Date().toISOString(),
    parserVersion: "1.0",
    sourceCount: SOURCES.length,
    rawCount: all.length,
    uniqueCount: unique.length,
    perSource: perSource.map((r) => ({
      source: r.source,
      url: r.url,
      ok: r.ok,
      listings: r.listings.length,
      error: r.error ?? null,
    })),
    note:
      "Research dump. Bridge-period scraper pending GVR WebAPI replacement. " +
      "Address numbers masked (████). Postal codes stored as FSA only. " +
      "No photo URLs / remarks / agent names captured.",
    listings: unique,
  };

  await mkdir(dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`[fcl-deals] wrote ${unique.length} unique → ${OUT_FILE}`);
}

main().catch((err) => {
  console.error("[fcl-deals] FAILED:", err);
  process.exit(1);
});
