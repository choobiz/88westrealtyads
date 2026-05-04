"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import LeadFormModal from "@/components/shared/LeadFormModal";
import { DeveloperLeadForm } from "./DeveloperHero";
import dealsData from "@/data/developer-deals.json";

type DeveloperDeal = {
  name: string;
  area: string;
  total: string;
  concessions: string[];
  stage: "Standing Inventory" | "Construction" | "Public Launch";
  unitsLeft: number;
  expires: string;
  image: string;
  imageAlt: string;
};

const TILES: DeveloperDeal[] = dealsData.deals as DeveloperDeal[];

export default function TrackerPreview() {
  const [openProperty, setOpenProperty] = useState<string | null>(null);
  return (
    <section id="deals" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-4">
            A Sample of Stacks We&apos;re Negotiating Right Now.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Every week we audit Greater Vancouver pre-sale and standing-inventory projects, itemize the
            developer&apos;s published concessions, and total them in dollars. Below: six current ones.
            Your specialist shortlists the right project for your buy-box on the intro call —
            then negotiates the stack on your behalf.
          </p>
        </div>

        <p className="text-center text-xs text-text-muted mb-8">
          Illustrative sample. We&apos;re actively negotiating across 40+ Greater Vancouver projects;
          clients get a buy-box-matched shortlist from their specialist after the intro call.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {TILES.map((t, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setOpenProperty(`${t.name} — ${t.area} · ${t.total} stacked`)}
              className="text-left bg-white border border-eightyw-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-brand-red/50 hover:-translate-y-0.5 transition-all flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2"
            >
              <div className="relative aspect-[4/3] bg-eightyw-light">
                <Image
                  src={t.image}
                  alt={t.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute top-3 right-3 px-2 py-1 bg-white/95 backdrop-blur-sm text-eightyw-blue text-[10px] font-semibold rounded-full shadow-sm whitespace-nowrap">
                  {t.unitsLeft} units left
                </span>
                <span className="absolute bottom-3 left-3 px-2 py-1 bg-brand-red text-white text-[10px] font-semibold rounded-full uppercase tracking-wider">
                  {t.stage}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="mb-3">
                  <p className="text-eightyw-blue font-bold text-base">{t.name}</p>
                  <p className="text-text-secondary text-sm">{t.area}</p>
                </div>

                <div className="bg-eightyw-light border border-eightyw-border rounded-lg px-4 py-3 mb-4">
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Total stacked</p>
                  <p className="text-brand-red text-2xl md:text-3xl font-bold leading-tight">{t.total}</p>
                </div>

              <ul className="space-y-1.5 text-sm text-text-secondary mb-4 flex-1">
                {t.concessions.map((c, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-brand-red shrink-0">+</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

                <div className="flex items-center justify-between gap-3 border-t border-eightyw-border pt-3">
                  <p className="text-xs text-text-muted">
                    <span className="font-semibold text-eightyw-blue">Expires:</span> {t.expires}
                  </p>
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
          the full stack within 24 hours.
        </p>
      </div>

      <LeadFormModal
        open={openProperty !== null}
        onClose={() => setOpenProperty(null)}
        contextHeadline="GET DETAILS ON THIS STACK"
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
