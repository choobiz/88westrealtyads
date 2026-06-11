#!/usr/bin/env node
/**
 * source-listing-photos.mjs — Automated photo sourcing for foreclosure listings.
 *
 * For each unique project/building name extracted by scrape-foreclosure-deals.mjs,
 * uses Tavily Search API to find marketing-material photos of the building,
 * picks the best exterior shot via a simple keyword heuristic, downloads it to
 * /public/images/foreclosure/listings/auto/<slug>.jpg, and writes a side-car
 * file mapping project name → public photo path for the curator to consume.
 *
 * Workflow:
 *   1. Read data/foreclosure-deals.scraped.json
 *   2. De-dupe listings by project_name (Chloé Kerrisdale = 4 units = 1 search)
 *   3. Cache hit: if /public/.../auto/<slug>.jpg already exists, skip search
 *   4. Tavily search: `<project_name> <street> <city> building exterior`
 *   5. Score returned images (prefer "building/exterior/facade", avoid
 *      "interior/kitchen/floor plan"); pick top-scoring image
 *   6. Download to disk; cap at ~2 MB / image
 *   7. Write data/foreclosure-deals.photos.json side-car
 *
 * Env:
 *   TAVILY_API_KEY    — required. Free tier: 1000 searches/month at tavily.com.
 *                       At ~50 unique projects per refresh, that's 20× headroom.
 *
 * Cost: ~$0.005/search, so ~$0.25 per full refresh of 50 projects. Negligible.
 *
 * Output:
 *   public/images/foreclosure/listings/auto/<slug>.jpg
 *   data/foreclosure-deals.photos.json
 */

import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Buffer } from "node:buffer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const SCRAPED_FILE = join(REPO_ROOT, "data", "foreclosure-deals.scraped.json");
const SIDECAR_FILE = join(REPO_ROOT, "data", "foreclosure-deals.photos.json");
const PHOTO_DIR = join(REPO_ROOT, "public", "images", "foreclosure", "listings", "auto");

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
const TAVILY_ENDPOINT = "https://api.tavily.com/search";
const USER_AGENT =
  "Mozilla/5.0 (88WestRealty-PhotoLookup/1.0; +https://go.88westrealty.com)";

const MAX_IMAGE_BYTES = 2_500_000; // 2.5 MB safety cap
const REQUEST_TIMEOUT_MS = 20_000;

// Heuristic to prefer building-exterior photos over interior shots.
const PREFER_KEYWORDS = [
  "building", "exterior", "facade", "tower", "condo",
  "residence", "complex", "front", "street view",
];
const AVOID_KEYWORDS = [
  "kitchen", "bathroom", "interior", "floor plan", "floorplan",
  "amenity", "lounge", "lobby", "pool", "fitness", "gym",
  "bedroom", "living room", "rendering interior",
];

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function scoreImage(img) {
  const desc = (img.description || "").toLowerCase();
  const url = (img.url || "").toLowerCase();
  const haystack = `${desc} ${url}`;
  let score = 0;
  for (const k of PREFER_KEYWORDS) if (haystack.includes(k)) score += 2;
  for (const k of AVOID_KEYWORDS) if (haystack.includes(k)) score -= 3;
  // Penalize obviously-tiny thumbnails based on URL hints
  if (/w=150|w=160|thumb|-150x|-160x/.test(url)) score -= 4;
  return score;
}

async function fileExists(path) {
  try { await stat(path); return true; } catch { return false; }
}

async function tavilySearch(query) {
  const res = await fetch(TAVILY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: TAVILY_API_KEY,
      query,
      search_depth: "advanced",
      include_images: true,
      include_image_descriptions: true,
      max_results: 5,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Tavily ${res.status} ${res.statusText}${body ? ` — ${body.slice(0, 200)}` : ""}`);
  }
  return res.json();
}

async function downloadImage(url, destPath) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "image/*" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Image fetch ${res.status} ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > MAX_IMAGE_BYTES) {
    throw new Error(`Image too large (${buf.length} bytes > ${MAX_IMAGE_BYTES} cap)`);
  }
  // Basic JPEG/PNG/WebP sniff so we don't store an HTML error page as `.jpg`.
  const head = buf.subarray(0, 12).toString("binary");
  const looksImage = head.startsWith("\xff\xd8\xff") || head.startsWith("\x89PNG") || head.includes("WEBP");
  if (!looksImage) throw new Error("Response is not an image (likely HTML error)");
  await writeFile(destPath, buf);
  return buf.length;
}

async function main() {
  if (!TAVILY_API_KEY) {
    console.error("[photos] TAVILY_API_KEY not set — exiting without lookup.");
    console.error("[photos] Free tier at tavily.com. Then: `export TAVILY_API_KEY=tvly-...`");
    process.exit(0);
  }

  await mkdir(PHOTO_DIR, { recursive: true });

  const scraped = JSON.parse(await readFile(SCRAPED_FILE, "utf8"));

  // De-dupe by project_name across all sources. One search → one photo →
  // serves every unit in that building.
  const projects = new Map(); // canonical name → metadata
  for (const l of scraped.listings) {
    if (!l.project_name) continue;
    if (projects.has(l.project_name)) continue;
    projects.set(l.project_name, {
      name: l.project_name,
      slug: slugify(l.project_name),
      city: l.city,
      neighborhood: l.neighborhood,
      sample_street: l.street_masked.replace(/^████\s*/, ""),
    });
  }

  console.log(`[photos] ${projects.size} unique projects to look up`);
  if (projects.size === 0) {
    console.log("[photos] Nothing to do.");
    return;
  }

  const photoMap = {}; // project_name → { path, source, description, bytes, downloadedAt }
  const cacheHits = [];
  const successes = [];
  const failures = [];

  for (const [name, info] of projects) {
    const destPath = join(PHOTO_DIR, `${info.slug}.jpg`);
    const publicPath = `/images/foreclosure/listings/auto/${info.slug}.jpg`;

    if (await fileExists(destPath)) {
      photoMap[name] = { path: publicPath, source: "cached", slug: info.slug };
      cacheHits.push(name);
      continue;
    }

    try {
      const query = `${info.name} ${info.sample_street} ${info.city} building exterior`;
      const search = await tavilySearch(query);
      const rawImages = search.images || [];
      const images = rawImages.map((img) =>
        typeof img === "string" ? { url: img, description: "" } : img,
      );
      if (images.length === 0) {
        failures.push({ name, reason: "no images returned by search" });
        console.log(`[photos] ✗ ${name} — no images`);
        continue;
      }
      images.sort((a, b) => scoreImage(b) - scoreImage(a));

      // Try in order; first that downloads cleanly wins.
      let downloaded = null;
      let lastErr = null;
      for (const candidate of images) {
        try {
          const bytes = await downloadImage(candidate.url, destPath);
          downloaded = { url: candidate.url, description: candidate.description, bytes };
          break;
        } catch (err) {
          lastErr = err;
        }
      }

      if (!downloaded) {
        failures.push({ name, reason: `all ${images.length} candidates failed; last: ${lastErr?.message || lastErr}` });
        console.log(`[photos] ✗ ${name} — all candidates failed`);
        continue;
      }

      photoMap[name] = {
        path: publicPath,
        source: downloaded.url,
        description: downloaded.description,
        bytes: downloaded.bytes,
        slug: info.slug,
        downloadedAt: new Date().toISOString(),
      };
      successes.push(name);
      console.log(`[photos] ✓ ${name} — ${(downloaded.bytes / 1024).toFixed(0)}KB`);
    } catch (err) {
      failures.push({ name, reason: String(err.message || err) });
      console.log(`[photos] ✗ ${name} — ${err.message || err}`);
    }
  }

  await writeFile(
    SIDECAR_FILE,
    JSON.stringify({
      sourcedAt: new Date().toISOString(),
      totalProjects: projects.size,
      cached: cacheHits.length,
      sourced: successes.length,
      failed: failures.length,
      photoMap,
      failures,
    }, null, 2) + "\n",
  );

  console.log(
    `[photos] DONE — sourced ${successes.length}, cached ${cacheHits.length}, failed ${failures.length}`,
  );
  console.log(`[photos] Side-car → ${SIDECAR_FILE}`);
}

main().catch((err) => {
  console.error("[photos] FAILED:", err);
  process.exit(1);
});
