#!/usr/bin/env node
/**
 * cron-runner.mjs — Daily wrapper that runs all data-engine scrapers,
 * commits results if changed, pushes to GitHub. Vercel auto-deploys
 * on push to main → fresh data lands on the LPs.
 *
 * Designed to run unattended on guesty-vm via PM2 cron_restart.
 *
 * Schedule: 14:17 UTC daily (07:17 Pacific morning) — avoids the :00
 * mark and the 03:00–06:00 UTC band per the VM's cron staggering rule.
 *
 * Each scraper writes to its own output file under data/. We commit
 * the data/ dir if any file changed. Idempotent: no-op if no changes.
 *
 * Kill switch: set ENABLE_CRON=false in .env to short-circuit. Set
 * ENABLE_SCRAPE=false to disable just the listing-detail scraper
 * (preserves stats + developer scraping).
 */

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync, existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");

// Load REPO_ROOT/.env (git-ignored) so secrets like TAVILY_API_KEY reach the
// spawned scrapers without being committed or hardcoded in ecosystem.config.cjs.
const envFile = join(REPO_ROOT, ".env");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    const v = t.slice(i + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[k]) process.env[k] = v;
  }
}

const ENABLE_CRON = (process.env.ENABLE_CRON ?? "true").toLowerCase() !== "false";

const SCRAPERS = [
  { name: "developer-deals",     script: "scripts/scrape-deals.mjs" },
  { name: "foreclosure-stats",   script: "scripts/scrape-foreclosure-stats.mjs" },
  { name: "foreclosure-deals",   script: "scripts/scrape-foreclosure-deals.mjs" },
  // Photo sourcing must run AFTER the deals scrape and BEFORE curate — it
  // sources exterior photos (Tavily) for newly-scraped NAMED buildings so they
  // land in the shown set, not pending. Needs TAVILY_API_KEY (loaded from .env
  // above). Nameless plain-address houses can't be matched and stay pending
  // (they still appear ungated in Variant D's list/map).
  { name: "foreclosure-photos",  script: "scripts/source-listing-photos.mjs" },
  // Curate must run AFTER the foreclosure-deals scraper — it joins the fresh
  // scraped dump + photos into data/foreclosure-deals.json (the LP's source of
  // truth). Without this the LP listings never refresh, only the raw dump does.
  // Uses existing photos; brand-new buildings without a photo land in
  // foreclosure-deals.pending.json until source-listing-photos.mjs is run.
  { name: "foreclosure-curate",  script: "scripts/curate-deals.mjs" },
  // Explorer dataset (Variant D) — merges shown + pending listings, geocodes
  // (cached), writes data/foreclosure-explorer-deals.json. Runs AFTER curate.
  { name: "foreclosure-explorer", script: "scripts/build-explorer-deals.mjs" },
];

function ts() {
  return new Date().toISOString();
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      cwd: REPO_ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
      ...opts,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("close", (code) => {
      resolve({ code, stdout, stderr });
    });
  });
}

async function gitStatus() {
  const r = await run("git", ["status", "--porcelain", "data/"]);
  return r.stdout.trim();
}

async function main() {
  console.log(`[cron] ${ts()} starting`);

  if (!ENABLE_CRON) {
    console.log("[cron] ENABLE_CRON=false — exiting without action.");
    return;
  }

  // 1. Pull latest main so we commit on top of HEAD (avoid divergence
  // if someone pushed from local in the meantime).
  console.log("[cron] git pull origin main");
  const pull = await run("git", ["pull", "--ff-only", "origin", "main"]);
  if (pull.code !== 0) {
    console.error(`[cron] git pull failed (code ${pull.code}):\n${pull.stderr}`);
    process.exit(1);
  }

  // 2. Run each scraper sequentially. Each writes to its own output file.
  for (const s of SCRAPERS) {
    console.log(`[cron] running ${s.name}`);
    const r = await run("node", [s.script]);
    if (r.code !== 0) {
      console.error(`[cron]   ${s.name} FAILED (code ${r.code}):\n${r.stderr}`);
      // Don't abort the cron run — try the next scraper. Stats are useful
      // even if details fail, and vice versa.
    } else {
      // Show last 3 lines of stdout for a quick signal in PM2 logs.
      const tail = r.stdout.trim().split("\n").slice(-3).join("\n");
      console.log(`[cron]   ${s.name} done:\n${tail}`);
    }
  }

  // 3. If anything changed under data/, commit + push.
  const status = await gitStatus();
  if (!status) {
    console.log("[cron] no data changes — nothing to commit.");
    return;
  }

  console.log(`[cron] data changes detected:\n${status}`);

  const add = await run("git", ["add", "data/"]);
  if (add.code !== 0) {
    console.error(`[cron] git add failed:\n${add.stderr}`);
    process.exit(1);
  }

  const commitMsg = `data: scheduled scrape ${new Date().toISOString().slice(0, 10)}`;
  const commit = await run("git", [
    "commit",
    "-m",
    `${commitMsg}\n\nAuto-committed by scripts/cron-runner.mjs.`,
  ]);
  if (commit.code !== 0) {
    console.error(`[cron] git commit failed:\n${commit.stderr}`);
    process.exit(1);
  }
  console.log(`[cron] committed: ${commitMsg}`);

  const push = await run("git", ["push", "origin", "main"]);
  if (push.code !== 0) {
    console.error(`[cron] git push failed (code ${push.code}):\n${push.stderr}`);
    process.exit(1);
  }
  console.log("[cron] pushed to origin/main. Vercel will auto-deploy.");
}

main().catch((err) => {
  console.error(`[cron] FAILED: ${err.message || err}`);
  process.exit(1);
});
