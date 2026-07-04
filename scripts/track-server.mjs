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

// Configured traffic split — MIRROR of proxy.ts VARIANT_SPLIT. Update both together.
// A retired 2026-07-03 (its 25% → B). All live variants use the inline-form hero.
const SPLIT = { A: 0, B: 50, C: 25, D: 25 };
const LP = "https://go.88westrealty.com/foreclosure-deals-vancouver";
const META = {
  A: "RETIRED — control 2-CTA hero (historical data only)",
  B: "Inline-form hero + gated cards",
  C: "Inline-form hero + Portfolio Console (bento layout)",
  D: "Inline-form hero + interactive explorer (list + map, 35s modal)",
};

function dashboardHtml(agg, token) {
  const t = agg.totals;
  const bestCvr = Math.max(0, ...agg.byVariant.filter((r) => r.sessions >= 5).map((r) => r.cvr));
  const rows = agg.byVariant.map((r) => {
    const obs = t.sessions ? Math.round((100 * r.sessions) / t.sessions) : 0;
    const win = r.cvr === bestCvr && bestCvr > 0 && r.sessions >= 5;
    return `<tr class="${win ? "win" : ""}">
      <td><b>${r.variant}</b></td>
      <td class="desc">${META[r.variant] || ""}</td>
      <td class="num">${SPLIT[r.variant] ?? "–"}%</td>
      <td class="num">${obs}%</td>
      <td class="num">${r.sessions}</td>
      <td class="num">${r.leads}</td>
      <td class="num cvr">${r.cvr}%${win ? " ★" : ""}</td>
      <td><a href="${LP}?ab=${r.variant}" target="_blank">?ab=${r.variant} ↗</a></td>
    </tr>`;
  }).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="refresh" content="60"><title>Foreclosure LP — Variant Performance</title>
<style>
  body{margin:0;background:#0f1216;color:#e6edf3;font:15px/1.5 -apple-system,Segoe UI,Roboto,sans-serif}
  .wrap{max-width:1000px;margin:0 auto;padding:28px 18px}
  h1{font-size:22px;margin:0 0 8px}.sub{color:#8b97a6;font-size:13px;margin-bottom:20px}
  .lpbar{background:#161b22;border:1px solid #263040;border-radius:10px;padding:10px 14px;margin-bottom:8px;font-size:13px;color:#9fb0c3}
  .lpurl{color:#c25a3a;font-weight:700;font-size:14px;word-break:break-all}
  .cards{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px}
  .kpi{background:#161b22;border:1px solid #263040;border-radius:12px;padding:14px 18px;min-width:120px}
  .kpi .v{font-size:26px;font-weight:800}.kpi .l{color:#8b97a6;font-size:11px;text-transform:uppercase;letter-spacing:1px}
  table{width:100%;border-collapse:collapse;background:#161b22;border:1px solid #263040;border-radius:12px;overflow:hidden}
  th,td{padding:11px 12px;text-align:left;border-bottom:1px solid #232c38;font-size:14px}
  th{background:#1b2530;color:#9fb0c3;font-size:11px;text-transform:uppercase;letter-spacing:1px}
  td.num{text-align:right;font-variant-numeric:tabular-nums}td.cvr{font-weight:700;color:#3fb984}
  td.desc{color:#9fb0c3;font-size:12.5px}tr.win{background:#13251c}tr.win td.cvr{color:#5fe0a0}
  a{color:#c25a3a;text-decoration:none;font-weight:600;font-size:12px}
  .note{color:#8b97a6;font-size:12px;margin-top:14px}.red{color:#c25a3a}
</style></head><body><div class="wrap">
  <h1>Foreclosure LP — Variant Performance</h1>
  <div class="lpbar">Live landing page: <a href="${LP}" target="_blank" class="lpurl">${LP} ↗</a></div>
  <div class="sub">updated ${agg.generatedAt} · auto-refresh 60s</div>
  <div class="cards">
    <div class="kpi"><div class="v">${t.sessions}</div><div class="l">Sessions</div></div>
    <div class="kpi"><div class="v">${t.leads}</div><div class="l">Leads</div></div>
    <div class="kpi"><div class="v" style="color:#3fb984">${t.cvr}%</div><div class="l">Overall CVR</div></div>
  </div>
  <table>
    <thead><tr><th>Variant</th><th>Design</th><th>Traffic (set)</th><th>Traffic (observed)</th><th>Sessions</th><th>Leads</th><th>Conv. rate</th><th>Preview</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p class="note">★ = best conversion rate (min 5 sessions to qualify). "Traffic (set)" = configured split in proxy.ts; "observed" = actual sessions share. Tracking started fresh 2026-07-03 — allow a few days of traffic before drawing conclusions. <span class="red">First-party data (not GA4).</span></p>
</div></body></html>`;
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

  if (req.method === "GET" && path.endsWith("/dashboard")) {
    if (!TOKEN || url.searchParams.get("token") !== TOKEN) { res.writeHead(401, { "Content-Type": "text/html" }); return res.end("<h1>401</h1><p>Append ?token=…</p>"); }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(dashboardHtml(aggregate(), url.searchParams.get("token")));
  }

  if (req.method === "GET" && path.endsWith("/health")) { res.writeHead(200); return res.end("ok"); }

  res.writeHead(404); res.end();
});

server.listen(PORT, "127.0.0.1", () => console.log(`[88w-track] listening on 127.0.0.1:${PORT} → ${DATA}`));
