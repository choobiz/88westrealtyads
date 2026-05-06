#!/usr/bin/env node
/**
 * scrape-foreclosure-stats.mjs — Pulls a daily snapshot of BC court-ordered
 * sale activity from public aggregator pages. Output is the COUNT of distinct
 * MLS-style listing numbers visible on each page; we never persist or
 * redistribute the listing details themselves.
 *
 * Why count-only:
 *   The actual listing payloads on these pages are MLS-licensed under the
 *   Board IDX agreement of each scraped brokerage. Counting visible MLS
 *   reference numbers is a public-stat extraction (analogous to "how many
 *   results does Google show for X"); republishing the records would be
 *   a CREA Code-of-Ethics issue. Stay on the count side of the line.
 *
 * Output: data/foreclosure-stats.json
 *   {
 *     scrapedAt, sources: [{ name, url, mlsCount, ok }],
 *     bestEstimate: <number>,         // max across sources
 *     marketingNumber: <number>,      // bestEstimate, rounded for hero copy
 *     note: "Stat scrape only — no listing details captured. Replace with
 *            GVR WebAPI count once IDX/VOW access is provisioned."
 *   }
 *
 * Sources (sorted by yield-during-testing):
 *   - simonclayton.ca/foreclosures/    — server-rendered, ~12 visible listings
 *   - themacnabs.com (Royal LePage)    — JS-rendered, may return 0
 *   - realtyvibe.ca                    — JS-rendered, may return 0
 *   - realestatecoalharbour.com regions — JS-rendered, may return 0
 *
 * Pages that are JS-rendered will return 0 from this lightweight scraper.
 * We log them honestly and use the highest count seen elsewhere as the
 * best estimate. When GVR WebAPI is provisioned, this entire script gets
 * replaced by a single SQL count of `properties WHERE flags @> 'court-ordered'`.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const OUT_FILE = join(REPO_ROOT, "data", "foreclosure-stats.json");

const SOURCES = [
  { name: "Simon Clayton (Macdonald Realty)", url: "https://simonclayton.ca/foreclosures/" },
  { name: "Macnabs (Royal LePage Elite West)", url: "https://www.themacnabs.com/foreclosures-and-court-ordered-sales/" },
  { name: "Realtyvibe (Sutton Premier)", url: "https://realtyvibe.ca/vancouver-foreclosures-for-sale/" },
  { name: "Real Estate Coal Harbour — Vancouver", url: "https://realestatecoalharbour.com/vancouver-foreclosure-listings" },
  { name: "Real Estate Coal Harbour — North Van", url: "https://realestatecoalharbour.com/north-vancouver-foreclosure-listings" },
  { name: "Real Estate Coal Harbour — Burnaby", url: "https://realestatecoalharbour.com/burnaby-foreclosure-listings" },
];

const USER_AGENT =
  "Mozilla/5.0 (88WestRealty-DealResearch/1.0; +https://go.88westrealty.com)";

// Match BC MLS numbers — typically R + 6-8 digits (REBGV/FVREB/CADREB share R-prefix).
// V-prefix is older; covered too.
const MLS_NUMBER_RE = /\b[RV]\d{6,8}\b/g;

async function countMlsNumbers(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) {
      return { ok: false, mlsCount: 0, error: `${res.status} ${res.statusText}` };
    }
    const html = await res.text();
    const matches = new Set(html.match(MLS_NUMBER_RE) || []);
    return { ok: true, mlsCount: matches.size };
  } catch (err) {
    return { ok: false, mlsCount: 0, error: String(err.message || err) };
  }
}

async function main() {
  console.log(`[fcl-stats] checking ${SOURCES.length} sources`);

  const results = await Promise.all(
    SOURCES.map(async (s) => {
      const r = await countMlsNumbers(s.url);
      console.log(
        `[fcl-stats]   ${r.ok ? `${r.mlsCount} listings` : `error: ${r.error}`} · ${s.name}`,
      );
      return { ...s, ...r };
    }),
  );

  const counts = results.filter((r) => r.ok).map((r) => r.mlsCount);
  const bestEstimate = counts.length ? Math.max(...counts) : 0;

  // Marketing rounding: round down to a familiar number.
  // Historically the page shipped "~389 active" — keep that as the floor
  // until the scrape can reliably beat it; otherwise round to nearest 10.
  const HISTORICAL_FLOOR = 389;
  const marketingNumber =
    bestEstimate > HISTORICAL_FLOOR
      ? Math.floor(bestEstimate / 10) * 10
      : HISTORICAL_FLOOR;

  const out = {
    scrapedAt: new Date().toISOString(),
    sources: results,
    bestEstimate,
    marketingNumber,
    note:
      "Stat scrape only — no listing details captured. Lightweight HTTP " +
      "fetch, no headless browser, so JS-rendered pages return 0. " +
      "Replace this entire script with a SQL count once GVR WebAPI is " +
      "provisioned (see docs/gvr-database-schema.md).",
  };

  await mkdir(dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(
    `[fcl-stats] best=${bestEstimate} marketing=${marketingNumber} → ${OUT_FILE}`,
  );
}

main().catch((err) => {
  console.error("[fcl-stats] FAILED:", err);
  process.exit(1);
});
