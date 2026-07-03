#!/usr/bin/env node
/**
 * track-server.mjs — first-party A/B/C/D variant tracker for the foreclosure LP.
 *
 * Tiny dependency-free HTTP service (node:http). Runs on guesty-vm via PM2,
 * exposed behind nginx at /88w-track/. Records two event types per session:
 *   - "view"  (once per browser session, on page load)
 *   - "lead"  (on lead-form submit)
 * each tagged with the assigned variant (A|B|C|D) + a session id, so we can
 * compute per-variant sessions, leads, and conversion rate.
 *
 * Storage: append-only JSONL (survives deploys — lives outside the git repo).
 * No PII: variant, event, session id (random), source, timestamp only.
 *
 * Env:
 *   TRACK_PORT         default 8088
 *   TRACK_DATA         default /home/amir/88w-track/events.jsonl
 *   TRACK_STATS_TOKEN  required to read GET /stats
 *   TRACK_ORIGIN       allowed CORS origin (default https://go.88westrealty.com)
 */
import http from "node:http";
import { appendFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Load the git-ignored repo .env (TRACK_STATS_TOKEN etc.) before reading env.
const __dir = dirname(fileURLToPath(import.meta.url));
const envFile = join(__dir, "..", ".env");
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

const PORT = Number(process.env.TRACK_PORT || 8088);
const DATA = process.env.TRACK_DATA || "/home/amir/88w-track/events.jsonl";
const TOKEN = process.env.TRACK_STATS_TOKEN || "";
const ORIGIN = process.env.TRACK_ORIGIN || "https://go.88westrealty.com";

if (!existsSync(dirname(DATA))) mkdirSync(dirname(DATA), { recursive: true });

const VARIANTS = new Set(["A", "B", "C", "D"]);
const EVENTS = new Set(["view", "lead"]);

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
}

function readBody(req) {
  return new Promise((resolve) => {
    let b = "";
    req.on("data", (c) => { b += c; if (b.length > 4096) req.destroy(); });
    req.on("end", () => resolve(b));
  });
}

function aggregate() {
  // Per variant: distinct sessions with a view, distinct sessions with a lead.
  const views = {}, leads = {}, rawViews = {}, rawLeads = {};
  for (const k of ["A", "B", "C", "D"]) { views[k] = new Set(); leads[k] = new Set(); rawViews[k] = 0; rawLeads[k] = 0; }
  if (existsSync(DATA)) {
    for (const line of readFileSync(DATA, "utf8").split("\n")) {
      if (!line.trim()) continue;
      let e; try { e = JSON.parse(line); } catch { continue; }
      if (!VARIANTS.has(e.v)) continue;
      if (e.e === "view") { views[e.v].add(e.sid); rawViews[e.v]++; }
      else if (e.e === "lead") { leads[e.v].add(e.sid); rawLeads[e.v]++; }
    }
  }
  const rows = ["A", "B", "C", "D"].map((v) => {
    const s = views[v].size, l = leads[v].size;
    return { variant: v, sessions: s, leads: l, rawViews: rawViews[v], rawLeads: rawLeads[v], cvr: s ? +(100 * l / s).toFixed(2) : 0 };
  });
  const totS = rows.reduce((a, r) => a + r.sessions, 0), totL = rows.reduce((a, r) => a + r.leads, 0);
  return { generatedAt: new Date().toISOString(), totals: { sessions: totS, leads: totL, cvr: totS ? +(100 * totL / totS).toFixed(2) : 0 }, byVariant: rows };
}

const server = http.createServer(async (req, res) => {
  cors(res);
  const url = new URL(req.url, "http://x");
  const path = url.pathname.replace(/\/$/, "");

  if (req.method === "OPTIONS") { res.writeHead(204); return res.end(); }

  if (req.method === "POST" && path.endsWith("/event")) {
    const body = await readBody(req);
    let d; try { d = JSON.parse(body || "{}"); } catch { res.writeHead(400); return res.end(); }
    if (!VARIANTS.has(d.v) || !EVENTS.has(d.e) || typeof d.sid !== "string" || d.sid.length > 40) {
      res.writeHead(204); return res.end(); // silently ignore junk
    }
    const rec = { v: d.v, e: d.e, sid: d.sid.slice(0, 40), s: typeof d.s === "string" ? d.s.slice(0, 40) : null, ts: new Date().toISOString() };
    try { appendFileSync(DATA, JSON.stringify(rec) + "\n"); } catch {}
    res.writeHead(204); return res.end();
  }

  if (req.method === "GET" && path.endsWith("/stats")) {
    if (!TOKEN || url.searchParams.get("token") !== TOKEN) { res.writeHead(401); return res.end("unauthorized"); }
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(aggregate(), null, 2));
  }

  if (req.method === "GET" && path.endsWith("/health")) { res.writeHead(200); return res.end("ok"); }

  res.writeHead(404); res.end();
});

server.listen(PORT, "127.0.0.1", () => console.log(`[88w-track] listening on 127.0.0.1:${PORT} → ${DATA}`));
