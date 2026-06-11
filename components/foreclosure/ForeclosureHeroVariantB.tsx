"use client";

/**
 * ForeclosureHeroVariantB — A/B test variant of the foreclosure landing-page hero.
 *
 * Differences from ForeclosureHero (control / Variant A):
 *   - Removes the two competing scroll CTAs ("See This Week's Deals" + "Find My Next Deal")
 *   - Embeds ForeclosureLeadForm inline above the fold (formLocation="hero_inline")
 *   - Uses a 2-column desktop layout (copy left / form right); stacks on mobile
 *   - Submit label changed to "Get Today's Deal List" (less ambiguous than "Find My Next Deal")
 *
 * Test hypothesis: shortening the path from landing → form (no scroll) lifts
 * submission rate by 20–35%. See docs/audits/2026-06-11-foreclosure-lp-audit.md
 * findings F-1 + F-2.
 *
 * Variant selection happens in proxy.ts and is read in page.tsx via the
 * `x-ab-variant` header (first visit) or `_lp_ab_cohort` cookie (subsequent).
 * The form payload includes `experiment_variant` for GHL routing + attribution.
 */

import Image from "next/image";
import { ForeclosureLeadForm } from "./ForeclosureHero";
import foreclosureStats from "@/data/foreclosure-stats.json";

export default function ForeclosureHeroVariantB() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      <Image
        src="/images/foreclosure/hero-court-ordered.jpg"
        alt="A West Coast home overlooking Howe Sound and the Coast Mountains — illustrative of the Greater Vancouver homes that come through BC court-ordered sales."
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-6 relative z-10 py-12 md:py-16 w-full">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Copy column */}
          <div>
            <p className="text-brand-red text-[12px] md:text-[13px] font-semibold uppercase tracking-[2px] mb-4">
              GREATER VANCOUVER · COURT-ORDERED SPECIALIST
            </p>
            <h1 className="text-eightyw-blue text-[28px] md:text-[44px] lg:text-[48px] font-bold leading-[1.08] mb-4">
              Vancouver Foreclosures, Won at the Hearing.
            </h1>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-5 max-w-[560px]">
              Buyer-side specialist. We shortlist BC court-ordered listings that fit your budget,
              draft Schedule A, and attend the BC Supreme Court hearing on your behalf.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-3 bg-white border border-eightyw-border rounded-full text-eightyw-text text-xs md:text-sm shadow-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              ~{foreclosureStats.marketingNumber} active BC court-ordered listings right now
            </div>
            <p className="text-text-muted text-xs">
              We call back within 24 hours · Mon–Sat, 8 AM – 8 PM PT
            </p>
          </div>

          {/* Form column */}
          <div className="lg:max-w-md lg:ml-auto w-full">
            <ForeclosureLeadForm
              formLocation="hero_inline"
              submitLabel="Get Today's Deal List"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
