"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import LeadFormModal from "@/components/shared/LeadFormModal";
import { DeveloperLeadForm } from "./DeveloperHero";
import dealsData from "@/data/developer-deals.json";

type DeveloperDeal = {
  project: string;
  developer: string;
  city: string;
  headline: string;
  headlineLabel: string;
  detail: string;
};

const TILES: DeveloperDeal[] = dealsData.deals;

export default function TrackerPreview() {
  const [openProperty, setOpenProperty] = useState<string | null>(null);
  return (
    <section id="deals" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-4">
            Presale Incentives We&apos;re Tracking This Week.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Every week we audit Greater Vancouver pre-sale and standing-inventory projects and itemize
            what the developer is actually offering. Below: {TILES.length} current ones. Your specialist
            shortlists the right project for your buy-box on the intro call — then negotiates on your behalf.
          </p>
        </div>

        <p className="text-center text-xs text-text-muted mb-8">
          Incentives are developer-published and time-limited — your specialist confirms current terms
          directly with the developer before you rely on them.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {TILES.map((t, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setOpenProperty(`${t.project} — ${t.city} · ${t.headline} ${t.headlineLabel}`)}
              className="text-left bg-white border border-eightyw-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-brand-red/50 hover:-translate-y-0.5 transition-all flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2"
            >
              <div className="flex items-center justify-between px-5 py-3 bg-eightyw-blue">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
                  {t.city}
                </span>
                <span className="text-[11px] font-mono text-white/65">Presale</span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="mb-4">
                  <p className="text-eightyw-blue font-bold text-base leading-tight">{t.project}</p>
                  <p className="text-text-secondary text-xs mt-0.5">by {t.developer}</p>
                </div>

                <div className="bg-eightyw-light border border-eightyw-border rounded-lg px-4 py-3 mb-4">
                  <p className="text-brand-red text-2xl md:text-3xl font-bold leading-tight">
                    {t.headline}
                  </p>
                  <p className="text-[11px] text-text-muted uppercase tracking-wider">
                    {t.headlineLabel}
                  </p>
                </div>

                <p className="text-sm text-text-secondary mb-4 flex-1">{t.detail}</p>

                <div className="flex items-center justify-end border-t border-eightyw-border pt-3">
                  <span className="inline-flex items-center gap-1 text-brand-red text-xs font-semibold whitespace-nowrap">
                    Get details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-text-muted text-xs md:text-sm">
          Click any project above to start the deal hunt — your specialist walks you through
          the full incentive stack within 24 hours.
        </p>
      </div>

      <LeadFormModal
        open={openProperty !== null}
        onClose={() => setOpenProperty(null)}
        contextHeadline="GET DETAILS ON THIS PROJECT"
        contextSubtitle={openProperty ?? undefined}
      >
        <DeveloperLeadForm
          formLocation="property_modal"
          selectedProperty={openProperty ?? undefined}
          submitLabel="Send Me the Details"
          bare
        />
      </LeadFormModal>
    </section>
  );
}
