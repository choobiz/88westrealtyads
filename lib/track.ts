// First-party A/B/C/D variant tracking — sends a "view" (once per browser
// session) and a "lead" (on form submit) to the VM tracker, tagged with the
// assigned variant (from the _lp_ab_cohort cookie) and a random session id.
// No PII. See scripts/track-server.mjs. Fire-and-forget; never blocks the UI.

const TRACK_URL = "https://104-198-45-146.nip.io/88w-track/event";

function cookie(name: string): string {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}

function sessionId(): string {
  try {
    let s = sessionStorage.getItem("_lp_sid");
    if (!s) {
      s = Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
      sessionStorage.setItem("_lp_sid", s);
    }
    return s;
  } catch {
    return "";
  }
}

export function trackEvent(e: "view" | "lead", source?: string): void {
  if (typeof window === "undefined") return;
  const v = cookie("_lp_ab_cohort");
  if (!["A", "B", "C", "D"].includes(v)) return;
  const sid = sessionId();
  if (!sid) return;

  // "view" fires at most once per session.
  if (e === "view") {
    try {
      if (sessionStorage.getItem("_lp_viewed") === "1") return;
      sessionStorage.setItem("_lp_viewed", "1");
    } catch {}
  }

  const body = JSON.stringify({ v, e, sid, s: source });
  try {
    // Beacon with text/plain avoids a CORS preflight; the server parses JSON.
    if (navigator.sendBeacon) {
      navigator.sendBeacon(TRACK_URL, new Blob([body], { type: "text/plain;charset=UTF-8" }));
    } else {
      fetch(TRACK_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body, keepalive: true }).catch(() => {});
    }
  } catch {}
}
