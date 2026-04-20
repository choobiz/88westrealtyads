"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Show the cookie banner only after the user has had a chance to see the hero
// and either (a) scrolled past the first viewport or (b) lingered long enough
// to suggest engagement. Prevents the banner from blocking the primary CTA on
// first load — per the 2026-04-19 Clarity audit, 40% of all mobile clicks
// were going to the cookie Accept button because it overlaid the sticky CTA.
const REVEAL_DELAY_MS = 5000;  // fallback: after 5s of page time
const REVEAL_SCROLL_RATIO = 0.5;  // or earlier, once user scrolls 50% of viewport

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "accepted") {
      grantConsent();
      return;
    }
    if (consent === "declined") {
      // Already chose — don't re-prompt
      return;
    }

    // Default: deny consent immediately (GA4 / Ads respect this), but don't
    // show the banner until the user engages. Real interaction > forced prompt.
    denyConsent();

    let shown = false;
    const reveal = () => {
      if (shown) return;
      shown = true;
      setVisible(true);
    };

    const timeoutId = window.setTimeout(reveal, REVEAL_DELAY_MS);

    const handleScroll = () => {
      if (shown) return;
      const scrollRatio = window.scrollY / (window.innerHeight || 1);
      if (scrollRatio >= REVEAL_SCROLL_RATIO) reveal();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function grantConsent() {
    localStorage.setItem("cookie_consent", "accepted");
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) { window.dataLayer!.push(Object.fromEntries(args.map((a, i) => [i, a]))); }
    if (window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }
    setVisible(false);
  }

  function denyConsent() {
    if (window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  }

  if (!visible) return null;

  return (
    // z-40 (below the sticky mobile CTA at z-50) so if the two ever overlap,
    // the register button always wins for visibility + tap priority.
    // Mobile: anchor ABOVE the 72px-tall sticky CTA so both are visible.
    // Desktop: normal bottom bar (sticky CTA is hidden on desktop).
    <div className="fixed bottom-[72px] md:bottom-0 left-0 right-0 z-40 bg-med-navy/95 backdrop-blur-sm border-t border-white/10 p-3 md:p-5">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        <p className="text-white/80 text-xs md:text-sm flex-1">
          This website uses cookies to measure marketing performance and improve your experience.
          By continuing, you consent to our use of cookies.
        </p>
        <div className="flex gap-2 md:gap-3 shrink-0">
          <button
            onClick={() => { localStorage.setItem("cookie_consent", "declined"); denyConsent(); setVisible(false); }}
            className="px-3 md:px-5 py-2 text-xs md:text-sm text-white/70 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={grantConsent}
            className="px-3 md:px-5 py-2 text-xs md:text-sm text-white font-semibold bg-brand-red rounded-lg hover:bg-brand-red-hover transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
