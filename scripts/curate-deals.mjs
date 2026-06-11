#!/usr/bin/env node
/**
 * curate-deals.mjs — Joins scraped foreclosure data with auto-sourced photos
 * (and manual photo overrides) and writes data/foreclosure-deals.json — the
 * LP's source of truth.
 *
 * Inputs:
 *   data/foreclosure-deals.scraped.json   — 100+ raw listings from aggregators
 *   data/foreclosure-deals.photos.json    — project_name → auto-sourced photo
 *   data/foreclosure-deals.manual.json    — operator-curated manual overrides
 *                                            (Paragon-authorized photos +
 *                                             user-supplied URLs by MLS#)
 *
 * Output:
 *   data/foreclosure-deals.json           — LP-consumed list
 *   data/foreclosure-deals.pending.json   — listings WITHOUT photos
 *                                            (operator reviews → supplies URLs)
 *
 * Policy (per operator direction 2026-06-11):
 *   "We shouldn't remove deals because photos couldn't be found."
 *   Implementation: deals stay in the pipeline; deals without photos move to
 *   the pending file rather than dropping silently. Operator supplies URLs
 *   in foreclosure-deals.manual.json; next curator run moves them to live.
 *
 * Filtering: only in-area listings reach the LP — Vancouver, North Vancouver,
 * Burnaby, Richmond, plus Surrey (existing breadth precedent: Morgan Creek).
 *
 * Sort order on LP: ascending by price.
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const SCRAPED_FILE = join(REPO_ROOT, "data", "foreclosure-deals.scraped.json");
const PHOTOS_FILE = join(REPO_ROOT, "data", "foreclosure-deals.photos.json");
const MANUAL_FILE = join(REPO_ROOT, "data", "foreclosure-deals.manual.json");
const OUT_LIVE = join(REPO_ROOT, "data", "foreclosure-deals.json");
const OUT_PENDING = join(REPO_ROOT, "data", "foreclosure-deals.pending.json");

// Area filter (intersection of stated areaServed in the JsonLd + breadth precedent).
const IN_AREA_CITIES = new Set([
  "Vancouver",
  "North Vancouver",
  "Burnaby",
  "Richmond",
  "Surrey",
]);

// Featured tier: top N deals shown unblurred above the fold. Everything else
// renders blurred with a "Unlock" CTA. Goal: drive form submission via the
// curiosity-gap pattern while keeping the visible set diverse and credible.
const FEATURED_COUNT = 12;
const FEATURED_SURREY_CAP = 1;           // at most 1 Surrey deal in the featured tier
const FEATURED_MAX_PER_AREA = 2;         // at most 2 cards from the same neighborhood

// ─────────────────────────────────────────────────────────────────────────────
// Display formatters

function formatPrice(price) {
  if (price == null) return "—";
  if (price >= 1_000_000) {
    const m = price / 1_000_000;
    return m >= 10 ? `$${m.toFixed(1)}M` : `$${m.toFixed(2)}M`;
  }
  return `$${Math.round(price / 1000)}K`;
}

function formatSqft(n) {
  if (n == null) return "—";
  return `${n.toLocaleString("en-US")} sq ft`;
}

function formatArea(neighborhood, city) {
  // "Hastings, Vancouver" / "Central Lonsdale, North Vancouver"
  // Drop direction suffixes like "VW" (Vancouver West) for cleaner display.
  const n = neighborhood.replace(/\s+(VW|VE|N|S|E|W)$/, "").trim();
  return `${n}, ${city}`;
}

function unmaskStreet(street_masked) {
  // Strip the ████ block. We never had the real street number anyway — the
  // operator shares it on the intro call (compliance posture).
  return street_masked.replace(/^████\s*/, "").trim();
}

// Match a scraped listing to a manual override by MLS#, then by area+street.
function findManualOverride(listing, manualEntries) {
  if (!manualEntries) return null;
  if (listing.mls_number) {
    const byMls = manualEntries.find((m) => m.mls_number === listing.mls_number);
    if (byMls) return byMls;
  }
  // area+street fallback (handles legacy manual entries from before MLS was tracked)
  const area = formatArea(listing.neighborhood, listing.city);
  const street = unmaskStreet(listing.street_masked);
  return manualEntries.find(
    (m) => (m.area || "").trim() === area && (m.street || "").trim() === street,
  ) || null;
}

// ─────────────────────────────────────────────────────────────────────────────

async function readJsonOptional(path, fallback) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return fallback;
    throw err;
  }
}

/**
 * Pick the FEATURED_COUNT deals to display unblurred above the fold.
 * Greedy algorithm that walks deals in ascending-price order and accepts the
 * first one that respects:
 *   - max FEATURED_SURREY_CAP Surrey listings (breadth precedent only)
 *   - max FEATURED_MAX_PER_AREA listings per neighborhood
 * The rest of the in-area deals render blurred with an "Unlock" CTA — they're
 * the curiosity-gap that converts browsers into form fills.
 */
function pickFeatured(sortedDeals) {
  const featured = [];
  const perArea = {};
  let surreyCount = 0;

  for (const d of sortedDeals) {
    if (featured.length >= FEATURED_COUNT) break;
    const isSurrey = d.area.endsWith(", Surrey");
    if (isSurrey && surreyCount >= FEATURED_SURREY_CAP) continue;
    if ((perArea[d.area] || 0) >= FEATURED_MAX_PER_AREA) continue;
    featured.push(d);
    perArea[d.area] = (perArea[d.area] || 0) + 1;
    if (isSurrey) surreyCount++;
  }

  // Backfill if we couldn't hit FEATURED_COUNT under the caps (e.g., thin
  // pipeline). Rather than ship an under-filled grid, relax the caps.
  if (featured.length < FEATURED_COUNT) {
    for (const d of sortedDeals) {
      if (featured.length >= FEATURED_COUNT) break;
      if (featured.includes(d)) continue;
      featured.push(d);
    }
  }

  const featuredSet = new Set(featured);
  return { featured, locked: sortedDeals.filter((d) => !featuredSet.has(d)) };
}

async function main() {
  const scraped = JSON.parse(await readFile(SCRAPED_FILE, "utf8"));
  const photos = await readJsonOptional(PHOTOS_FILE, { photoMap: {} });
  const manual = await readJsonOptional(MANUAL_FILE, { listings: [] });

  const manualEntries = manual.listings || [];

  const live = [];
  const pending = [];

  for (const l of scraped.listings) {
    if (!IN_AREA_CITIES.has(l.city)) continue;
    if (l.price == null) continue;

    const override = findManualOverride(l, manualEntries);

    // Photo resolution order: manual override > auto-sourced > nothing
    let image = "";
    let imageAlt = "";
    let imageSource = null;
    if (override?.image) {
      image = override.image;
      imageAlt = override.imageAlt || "";
      imageSource = "manual";
    } else if (l.project_name && photos.photoMap?.[l.project_name]?.path) {
      image = photos.photoMap[l.project_name].path;
      imageAlt = `${l.project_name} — exterior view (representational, sourced from publicly indexed marketing material).`;
      imageSource = "auto";
    }

    const deal = {
      type: l.property_type,
      area: formatArea(l.neighborhood, l.city),
      street: unmaskStreet(l.street_masked),
      price: formatPrice(l.price),
      sqft: formatSqft(l.area_sqft),
      courtOrdered: !!l.court_ordered_flag,
      image,
      imageAlt,
      // Internal-only debug fields (kept in JSON, ignored by LP component).
      _mls: l.mls_number,
      _projectName: l.project_name || null,
      _imageSource: imageSource,
      _priceNum: l.price,
    };

    if (image) {
      live.push(deal);
    } else {
      pending.push(deal);
    }
  }

  // Sort live deals by ascending price (entry-level first, anchors trust).
  live.sort((a, b) => a._priceNum - b._priceNum);
  pending.sort((a, b) => a._priceNum - b._priceNum);

  // Split into featured (above-the-fold, unblurred) and locked (blurred,
  // curiosity-gap CTA). Both render in InventoryPreview; both open the
  // same lead-form modal on click.
  const { featured, locked } = pickFeatured(live);
  const featuredIds = new Set(featured.map((d) => d._mls));
  for (const d of live) {
    d.featured = featuredIds.has(d._mls);
  }

  // Build the LP-consumed JSON. Preserve the existing compliance metadata
  // structure for continuity.
  const liveOut = {
    lastUpdated: new Date().toISOString().slice(0, 10),
    source: "curate-deals.mjs (scraped + auto-photos + manual overrides)",
    compliance: {
      status: "operator-override",
      date: new Date().toISOString().slice(0, 10),
      note:
        "OPERATOR OVERRIDE — real court-ordered listing data published on the public LP " +
        "during the bridge period before GVR WebAPI authorization. Listing data sourced " +
        "from multiple public foreclosure aggregator pages (Simon Clayton, Macnabs, " +
        "Realtyvibe). Photos resolved in this priority: (1) operator-curated manual " +
        "overrides — Paragon-authorized per-listing photos OR operator-supplied marketing-" +
        "material URLs, (2) automated project-name search via Tavily on publicly indexed " +
        "developer marketing pages, falling back to (3) listings without resolvable photos " +
        "are pending operator URL supply and DO NOT appear on the LP until a photo is " +
        "available (see foreclosure-deals.pending.json). Across all displayed listings: " +
        "street numbers withheld (shared on intro call); MLS numbers omitted from public " +
        "cards (retained in research dump); no listing remarks; no agent names. Flagged for " +
        "managing-broker awareness (Shirin Saleh, licence #X031527). Replace pipeline with " +
        "the GVR-feed-backed source once the WebAPI is authorized.",
      replaceWith: "GVR WebAPI feed — see docs/gvr-database-schema.md",
      stats: {
        scrapedTotal: scraped.uniqueCount,
        scrapedInArea: live.length + pending.length,
        liveOnLp: live.length,
        featuredOnLp: featured.length,
        lockedOnLp: locked.length,
        pendingPhoto: pending.length,
        manualOverrides: manualEntries.length,
        autoSourcedPhotos: Object.keys(photos.photoMap || {}).length,
      },
    },
    deals: live.map((d) => {
      // Strip internal debug fields from public output, keep `featured` flag.
      const { _mls, _projectName, _imageSource, _priceNum, ...pub } = d;
      return pub;
    }),
  };

  // Pending file: ops use this to see which deals need photo URLs supplied.
  const pendingOut = {
    generatedAt: new Date().toISOString(),
    note:
      "Listings scraped + in-area but waiting on a photo URL. Operator action: " +
      "supply a photo URL for any of these by adding an entry to " +
      "data/foreclosure-deals.manual.json keyed by `mls_number`. Re-run " +
      "`node scripts/curate-deals.mjs` to move them to live.",
    count: pending.length,
    listings: pending,
  };

  await writeFile(OUT_LIVE, JSON.stringify(liveOut, null, 2) + "\n");
  await writeFile(OUT_PENDING, JSON.stringify(pendingOut, null, 2) + "\n");

  console.log(`[curate] live   → ${live.length} listings (${OUT_LIVE.replace(REPO_ROOT, "")})`);
  console.log(`[curate] pending → ${pending.length} listings (${OUT_PENDING.replace(REPO_ROOT, "")})`);
  console.log(`[curate] manual overrides applied: ${manualEntries.length}`);
  console.log(`[curate] auto photos available: ${Object.keys(photos.photoMap || {}).length}`);
}

main().catch((err) => {
  console.error("[curate] FAILED:", err);
  process.exit(1);
});
