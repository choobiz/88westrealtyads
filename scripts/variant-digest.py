#!/usr/bin/env python3
"""88 West foreclosure-LP variant monitor — daily email digest.

Runs on the guesty-vm HOST (not in Docker) so it can reach the tracker on
127.0.0.1:8088. Pulls /stats, computes day-over-day deltas vs the last run,
and emails a short digest. Reuses the guesty-ops Gmail SMTP creds.

Cron (VM, UTC): 13 16 * * *  → 9:13am Pacific daily.
Context: 2026-07-03 the inline-form hero went to ALL variants; Variant A was
retired (split B50/C25/D25). Watching whether C or D beats B on CVR.
"""
import json, os, smtplib, ssl, urllib.request
from email.mime.text import MIMEText

TRACK_ENV = "/home/amir/88west-go-landing/.env"
SMTP_ENV = "/home/amir/guesty-ops/backend/.env"
SNAPSHOT = "/home/amir/88w-track/last-digest.json"
STATS_URL = "http://127.0.0.1:8088/stats"
RECIPIENT = "amir@p3homes.ca"
LP = "https://go.88westrealty.com/foreclosure-deals-vancouver"


def env(path, key):
    try:
        for line in open(path):
            line = line.strip()
            if line.startswith(key + "="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    except FileNotFoundError:
        pass
    return ""


def fetch_stats():
    token = env(TRACK_ENV, "TRACK_STATS_TOKEN")
    with urllib.request.urlopen(f"{STATS_URL}?token={token}", timeout=15) as r:
        return json.loads(r.read().decode())


def load_prev():
    try:
        return json.load(open(SNAPSHOT))
    except Exception:
        return {}


def save_snapshot(stats):
    os.makedirs(os.path.dirname(SNAPSHOT), exist_ok=True)
    snap = {v["variant"]: {"sessions": v["sessions"], "leads": v["leads"]} for v in stats["byVariant"]}
    json.dump(snap, open(SNAPSHOT, "w"))


def build_digest(stats, prev):
    live = [v for v in stats["byVariant"] if v["variant"] in ("B", "C", "D")]
    lines = []
    live_sessions = 0
    new_sessions_total = new_leads_total = 0
    for v in sorted(live, key=lambda x: x["variant"]):
        name = v["variant"]
        s, l, cvr = v["sessions"], v["leads"], v["cvr"]
        live_sessions += s
        p = prev.get(name, {})
        ds = s - p.get("sessions", s) if prev else 0
        dl = l - p.get("leads", l) if prev else 0
        new_sessions_total += max(ds, 0)
        new_leads_total += max(dl, 0)
        delta = f"  (+{ds} sess, +{dl} leads since yesterday)" if prev else ""
        lines.append(f"  {name}:  {s} sessions · {l} leads · {cvr:.1f}% CVR{delta}")

    # Verdict
    verdict = []
    if live_sessions < 40:
        verdict.append(f"Sample still thin ({live_sessions} sessions across B/C/D) — no call yet.")
    else:
        ranked = sorted(live, key=lambda x: x["cvr"], reverse=True)
        best, worst = ranked[0], ranked[-1]
        b = next((x for x in live if x["variant"] == "B"), None)
        if best["cvr"] - worst["cvr"] >= 5 and best["sessions"] >= 30:
            verdict.append(f"{best['variant']} leads at {best['cvr']:.1f}% CVR vs {worst['variant']} at {worst['cvr']:.1f}%.")
            if b and best["variant"] != "B":
                verdict.append(f"{best['variant']} is beating B ({b['cvr']:.1f}%) — worth a closer look.")
        else:
            verdict.append("No variant is clearly ahead yet — CVRs are close.")
    if prev and new_sessions_total >= 10 and new_leads_total == 0:
        verdict.append("⚠️ New sessions but ZERO new leads across all variants since yesterday — check the LP form is working.")

    a = next((v for v in stats["byVariant"] if v["variant"] == "A"), None)
    a_note = ""
    if a and prev:
        da = a["sessions"] - prev.get("A", {}).get("sessions", a["sessions"])
        a_note = f"\n(A retired — {'+' + str(da) if da else 'no'} new sessions, as expected.)"

    t = stats["totals"]
    body = (
        f"88 West — Foreclosure LP variant test (daily)\n"
        f"as of {stats['generatedAt']}\n\n"
        f"{chr(10).join(lines)}\n\n"
        f"Totals (B/C/D + retired A): {t['sessions']} sessions · {t['leads']} leads · {t['cvr']:.1f}% CVR\n"
        f"{a_note}\n\n"
        f"Verdict: {' '.join(verdict)}\n\n"
        f"Split: B 50% / C 25% / D 25% — all share the inline-form hero; they differ only by body "
        f"(B=cards, C=Portfolio Console, D=explorer).\n{LP}"
    )
    return body


def main():
    stats = fetch_stats()
    prev = load_prev()
    body = build_digest(stats, prev)
    save_snapshot(stats)

    user = env(SMTP_ENV, "SMTP_USER")
    pw = env(SMTP_ENV, "SMTP_PASSWORD")
    if not user or not pw:
        print("SMTP not configured — printing digest instead:\n" + body)
        return
    msg = MIMEText(body)
    msg["Subject"] = "88W Foreclosure LP — daily variant digest"
    msg["From"] = user
    msg["To"] = RECIPIENT
    with smtplib.SMTP("smtp.gmail.com", 587) as s:
        s.starttls(context=ssl.create_default_context())
        s.login(user, pw)
        s.sendmail(user, [RECIPIENT], msg.as_string())
    print("digest sent to", RECIPIENT)


if __name__ == "__main__":
    main()
