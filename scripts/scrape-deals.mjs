#!/usr/bin/env node
/**
 * scrape-deals.mjs — Pulls public Vancouver pre-sale incentive data and
 * writes a candidate deal list for the developer-condo-deals-vancouver LP.
 *
 * Output: data/developer-deals.scraped.json (raw scrape + light enrichment)
 *
 * Sources (priority order):
 *   1. mikestewart.ca/vancouver-presale-condo-incentives/
 *      — public marketing page, daily-updated grid of 250+ projects
 *      — incentive_summary is the verbatim teaser line (truncated at ~150 chars)
 *
 * NOT a drop-in replacement for data/developer-deals.json. The scraped
 * data is *partial* (no `total`, no `stage`, no `unitsLeft`, no `expires`,
 * no image). Workflow:
 *   1. Run `node scripts/scrape-deals.mjs`
 *   2. Open data/developer-deals.scraped.json — pick the 6 most relevant
 *   3. Enrich them by hand (or by visiting the project_url) into
 *      data/developer-deals.json — the file the LP actually reads
 *
 * Run weekly (or daily) as a cron / GitHub Action.
 *
 * Legal: Mike Stewart's page is a public marketing page; we extract only
 * the published incentive teaser + project name + city. We do NOT
 * republish his MLS listings, photos, or full project descriptions.
 * Scraped output is internal — used as a research starting point that
 * the realtor curates manually before publishing on the LP.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import * as cheerio from "cheerio";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const OUT_FILE = join(REPO_ROOT, "data", "developer-deals.scraped.json");

const SOURCE_URL = "https://www.mikestewart.ca/vancouver-presale-condo-incentives/";
const USER_AGENT =
  "Mozilla/5.0 (88WestRealty-DealResearch/1.0; +https://go.88westrealty.com)";

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
  });
  if (!res.ok) {
    throw new Error(`fetch ${url} failed: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

/**
 * Parse Mike Stewart's incentive grid. The WordPress page renders each tile
 * inside a `.tb-grid-column` block (Toolset Views grid). Within the tile:
 *   - `.loop-listing-title` → project name
 *   - `.badgebox span` → city/neighborhood badge
 *   - `.loop-listing-caption` text node → verbatim incentive teaser
 *   - `<a href="/presale/<slug>/">` → project URL (wraps the whole tile)
 *
 * Class names occasionally rotate when the WP theme updates. If the parser
 * stops finding tiles, inspect the live HTML and refresh the selectors here.
 */
function parseMikeStewart(html) {
  const $ = cheerio.load(html);
  const projects = new Map(); // dedupe by project URL

  $(".tb-grid-column").each((_i, el) => {
    const $tile = $(el);
    const $a = $tile.find('a[href*="/presale/"]').first();
    if (!$a.length) return;
    const href = $a.attr("href");
    if (!href || !/\/presale\/[a-z0-9-]+\/?(?:[?#].*)?$/i.test(href)) return;

    const url = new URL(href, SOURCE_URL).toString().split("#")[0].split("?")[0];
    if (projects.has(url)) return;

    const name = $tile.find(".loop-listing-title").first().text().trim();
    if (!name || name.length > 200) return;

    const city = $tile.find(".badgebox span").first().text().trim();

    const $caption = $tile.find(".loop-listing-caption").first();
    if (!$caption.length) return;

    let teaser = $caption.text().replace(/\s+/g, " ").trim();
    teaser = teaser
      .replace(name, "")
      .replace(/Click Here for INCENTIVE DETAILS\.?/gi, "")
      .replace(/\s+/g, " ")
      .trim();

    if (teaser.length < 30) return; // too thin to be a real listing

    projects.set(url, {
      project_name: name,
      city,
      incentive_summary: teaser.slice(0, 320),
      project_url: url,
    });
  });

  return [...projects.values()];
}

/**
 * Light enrichment: extract the largest dollar-amount mentioned in the
 * incentive teaser to surface as a candidate `total`. The realtor still
 * has to confirm before publishing — many teasers cite multiple amounts
 * (e.g. "$40K credit + $48K parking"); we just flag the headline number.
 */
function extractDollarHeadline(text) {
  const matches = [...text.matchAll(/\$\s*([\d,]+(?:\.\d+)?)(?:\s*[KkMm])?/g)];
  if (!matches.length) return null;
  const numeric = matches
    .map((m) => {
      const raw = m[0].toUpperCase().replace(/[\s,$]/g, "");
      let n = parseFloat(raw);
      if (raw.endsWith("K")) n *= 1_000;
      else if (raw.endsWith("M")) n *= 1_000_000;
      return Number.isFinite(n) ? { raw: m[0], n } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.n - a.n);
  return numeric.length ? numeric[0].raw : null;
}

async function main() {
  console.log(`[scrape] fetching ${SOURCE_URL}`);
  const html = await fetchHtml(SOURCE_URL);
  console.log(`[scrape] ${html.length.toLocaleString()} bytes received`);

  const projects = parseMikeStewart(html);
  console.log(`[scrape] parsed ${projects.length} projects`);

  // Sort by signal strength: dollar-headline projects first, then by summary
  // richness. Projects without a clear dollar amount stay in the list (some
  // teasers describe the deal qualitatively) but rank lower.
  const enriched = projects
    .map((p) => ({
      ...p,
      headline_dollar: extractDollarHeadline(p.incentive_summary),
    }))
    .sort((a, b) => {
      const aD = a.headline_dollar ? 1 : 0;
      const bD = b.headline_dollar ? 1 : 0;
      if (aD !== bD) return bD - aD;
      return b.incentive_summary.length - a.incentive_summary.length;
    });

  const filtered = enriched;

  const out = {
    source: "mikestewart.ca/vancouver-presale-condo-incentives",
    sourceUrl: SOURCE_URL,
    scrapedAt: new Date().toISOString(),
    parserVersion: "1.0",
    note: "Internal research output. Curate into data/developer-deals.json before publishing on the LP. Schema: project_name, city, incentive_summary (truncated), project_url, headline_dollar (largest $ mentioned).",
    count: filtered.length,
    projects: filtered.slice(0, 30),
  };

  await mkdir(dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`[scrape] wrote ${filtered.length} → ${OUT_FILE}`);
}

main().catch((err) => {
  console.error("[scrape] FAILED:", err);
  process.exit(1);
});
