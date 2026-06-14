"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import foreclosureStats from "@/data/foreclosure-stats.json";
import { useForeclosureLeadModal } from "./ForeclosureLeadProvider";

// ForeclosureLeadForm was extracted into its own file 2026-06-13 so that
// ForeclosureLeadProvider can import it without a circular dependency.
// Re-export so existing call sites (InventoryPreview, PortfolioConsole,
// ForeclosureHeroVariantB, ForeclosureFormSection) keep working unchanged.
export { default as ForeclosureLeadForm } from "./ForeclosureLeadForm";

declare global {
  interface Window {
    __getTrackingCookie?: (name: string) => string | null;
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ForeclosureHero() {
  const { openLeadForm } = useForeclosureLeadModal();
  return (
    <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden">
      <Image
        src="/images/foreclosure/hero-court-ordered.jpg"
        alt="A West Coast home overlooking Howe Sound and the Coast Mountains — illustrative of the Greater Vancouver homes that come through BC court-ordered sales."
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/40" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-6 relative z-10 py-14 md:py-20 w-full">
        <div className="max-w-[720px]">
          <p className="text-brand-red text-[12px] md:text-[13px] font-semibold uppercase tracking-[2px] mb-4">
            GREATER VANCOUVER · COURT-ORDERED SPECIALIST
          </p>
          <h1 className="text-eightyw-blue text-[32px] md:text-[56px] font-bold leading-[1.05] mb-5">
            Vancouver Foreclosures, Won at the Hearing.
          </h1>
          <p className="text-text-secondary text-base md:text-xl leading-relaxed mb-6 max-w-[600px]">
            <span className="lg:hidden">
              Buyer-side specialist. Free intro call. We attend the court hearing for you.
            </span>
            <span className="hidden lg:inline">
              We&apos;re a buyer-side brokerage that hunts Greater Vancouver foreclosures full-time —
              shortlisting the ones that fit your budget, drafting Schedule A, and attending the BC
              Supreme Court hearing on your behalf.
            </span>
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white border border-eightyw-border rounded-full text-eightyw-text text-xs md:text-sm shadow-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            ~{foreclosureStats.marketingNumber} active BC court-ordered listings right now
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#deals"
              className="inline-flex items-center justify-center h-[52px] px-7 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px] shadow-[0_10px_30px_rgba(197,34,4,0.3)]"
            >
              See This Week&apos;s Deals
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() =>
                openLeadForm({
                  headline: "FIND YOUR NEXT FORECLOSURE",
                  subtitle: "Free intro call · 24h response · No fee to buyers",
                  formLocation: "final_cta",
                })
              }
              className="inline-flex items-center justify-center h-[52px] px-7 border-2 border-eightyw-blue bg-white text-eightyw-blue font-semibold rounded-full hover:bg-eightyw-blue hover:text-white transition-all gap-2 text-[15px]"
            >
              Find My Next Deal
            </button>
          </div>
          <p className="text-text-muted text-xs mt-4">
            We call back within 24 hours · Mon–Sat, 8 AM – 8 PM PT
          </p>
        </div>
      </div>
    </section>
  );
}

