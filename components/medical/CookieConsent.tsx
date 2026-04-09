"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "accepted") {
      grantConsent();
    } else if (!consent) {
      setVisible(true);
      denyConsent();
    }
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
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-med-navy/95 backdrop-blur-sm border-t border-white/10 p-4 md:p-5">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-white/80 text-sm flex-1">
          This website uses cookies to measure marketing performance and improve your experience.
          By continuing, you consent to our use of cookies.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => { denyConsent(); setVisible(false); }}
            className="px-5 py-2 text-sm text-white/70 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={grantConsent}
            className="px-5 py-2 text-sm text-white font-semibold bg-brand-red rounded-lg hover:bg-brand-red-hover transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
