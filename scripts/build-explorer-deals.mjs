#!/usr/bin/env node
/**
 * build-explorer-deals.mjs — builds the dataset for the interactive list/map
 * variant (Variant D, ForeclosureListExplorer).
 *
 * Merges the shown deals (data/foreclosure-deals.json, ~28 with photos) with
 * the photo-less pending deals (data/foreclosure-deals.pending.json, ~53) into
 * ONE ungated set — the list/map is far less photo-dependent, so we surface
 * everything the scrape found. Normalizes price → number, derives region (city)
 * and a filterable house type, geocodes each address (Nominatim, cached), and
 * writes data/foreclosure-explorer-deals.json.
 *
 *   node scripts/build-explorer-deals.mjs
 *
 * Idempotent: geocodes only addresses not already in data/foreclosure-geocache.json.
 * Add to the daily cron (after curate) to keep Variant D fresh.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SHOWN = join(ROOT, "data", "foreclosure-deals.json");
const PENDING = join(ROOT, "data", "foreclosure-deals.pending.json");
const GEOCACHE = join(ROOT, "data", "foreclosure-geocache.json");
const OUT = join(ROOT, "data", "foreclosure-explorer-deals.json");

const readJson = (p, fb) => { try { return JSON.parse(readFileSync(p, "utf8")); } catch { return fb; } };

// "$355K" → 355000 · "$1.29M" → 1290000 · "$1,250,000" → 1250000
function priceToNum(s) {
  if (typeof s === "number") return s;
  if (!s) return null;
  const m = String(s).replace(/[, ]/g, "").match(/\$?([\d.]+)([KkMm]?)/);
  if (!m) return null;
  let n = parseFloat(m[1]);
  if (/k/i.test(m[2])) n *= 1e3;
  else if (/m/i.test(m[2])) n *= 1e6;
  return Math.round(n);
}

// "Downtown, Vancouver" → region "Vancouver"; fall back to the whole string.
function regionOf(area) {
  if (!area) return "Other";
  const parts = String(area).split(",").map((s) => s.trim());
  return parts[parts.length - 1] || area;
}

async function geocode(street, area, cache) {
  const key = `${street}, ${area}`;
  if (key in cache) return cache[key];
  const q = encodeURIComponent(`${street}, ${area}, British Columbia, Canada`);
  let coord = null;
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=ca`, {
      headers: { "User-Agent": "88WestRealty-Explorer/1.0 (+https://go.88westrealty.com)" },
    });
    const j = await r.json();
    if (j && j[0]) coord = { lat: +j[0].lat, lng: +j[0].lon };
  } catch {}
  cache[key] = coord; // cache nulls too, but we retry nulls next build (see load)
  await new Promise((res) => setTimeout(res, 1100)); // Nominatim: 1 req/s
  return coord;
}

function normalize(d) {
  return {
    type: d.type || "Other",
    area: d.area || "",
    region: regionOf(d.area),
    street: d.street || "",
    price: d.price || "",
    priceNum: typeof d._priceNum === "number" ? d._priceNum : priceToNum(d.price),
    sqft: d.sqft || "",
    image: d.image || "",
    imageAlt: d.imageAlt || "",
    courtOrdered: d.courtOrdered !== false,
    mls: d._mls || null,
  };
}

async function main() {
  // foreclosure-deals.json (shown) now contains the FULL curated set (photo-less
  // deals included, with placeholders) — so it's the single source of truth.
  // Pending is only a fallback for any photo-less deal not already in shown.
  const shown = readJson(SHOWN, { deals: [] }).deals || [];
  const pendingRaw = readJson(PENDING, { listings: [] });
  const shownKeys = new Set(shown.map((d) => `${d.street}|${d.area}`.toLowerCase().replace(/\s+/g, " ").trim()));
  const pending = (pendingRaw.listings || pendingRaw.deals || []).filter(
    (d) => !shownKeys.has(`${d.street}|${d.area}`.toLowerCase().replace(/\s+/g, " ").trim()),
  );
  // Retry nulls: keep only successful coords in the persisted cache so failed
  // geocodes get another chance next build.
  const rawCache = readJson(GEOCACHE, {});
  const cache = {};
  for (const [k, v] of Object.entries(rawCache)) if (v) cache[k] = v;

  const merged = [...shown, ...pending].map(normalize);

  // No dedup: `shown` is already the curator's canonical unique set (distinct
  // same-building units are intentionally separate), and `pending` was filtered
  // to non-overlapping deals above.
  const deals = merged;

  let geocoded = 0;
  for (const d of deals) {
    const c = await geocode(d.street, d.area, cache);
    if (c) { d.lat = c.lat; d.lng = c.lng; geocoded++; }
  }

  writeFileSync(GEOCACHE, JSON.stringify(cache, null, 1));
  writeFileSync(OUT, JSON.stringify({
    generatedAt: new Date().toISOString(),
    count: deals.length,
    withPhoto: deals.filter((d) => d.image).length,
    geocoded,
    regions: [...new Set(deals.map((d) => d.region))].sort(),
    types: [...new Set(deals.map((d) => d.type))].sort(),
    deals,
  }, null, 1));
  console.log(`explorer dataset: ${deals.length} deals (${deals.filter((d) => d.image).length} w/ photo), geocoded ${geocoded}/${deals.length} → ${OUT}`);
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
