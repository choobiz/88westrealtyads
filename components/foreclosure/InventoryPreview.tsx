"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import LeadFormModal from "@/components/shared/LeadFormModal";
import { ForeclosureLeadForm } from "./ForeclosureHero";
import dealsData from "@/data/foreclosure-deals.json";
import foreclosureStats from "@/data/foreclosure-stats.json";

type ForeclosureDeal = {
  type: string;
  area: string;
  street: string;
  price: string;
  sqft: string;
  courtOrdered: boolean;
  // `image` is the public path to a Paragon-authorized photo for THIS specific
  // listing. Photo authorization is per-listing, so newly-added listings that
  // don't have an associated authorized photo use an empty string here, and
  // the card renders a branded "photo + address on intro call" placeholder
  // instead. This is consistent with the rest of the compliance posture
  // (street numbers masked, MLS numbers omitted, full address shared on the
  // intro call) — see data/foreclosure-deals.json compliance.note.
  image: string;
  imageAlt: string;
};

const LISTINGS: ForeclosureDeal[] = dealsData.deals;

export default function InventoryPreview() {
  const [openProperty, setOpenProperty] = useState<string | null>(null);
  return (
    <section id="deals" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-4">
            Court-Ordered Listings on the Market Right Now.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {LISTINGS.length} current Greater Vancouver court-ordered and foreclosure listings from this
            week&apos;s MLS&reg; scan. Your specialist sends the full address, court date, Schedule A
            draft, and possession-risk note on the intro call.
          </p>
        </div>

        <p className="text-center text-xs text-text-muted mb-8">
          A live shortlist. We&apos;re currently tracking ~{foreclosureStats.marketingNumber} active BC
          court-ordered listings — your specialist matches the right handful to your buy-box
          on the intro call.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {LISTINGS.map((l, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setOpenProperty(`${l.type} · ${l.area} · ${l.price}`)}
              className="text-left bg-white border border-eightyw-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-brand-red/50 hover:-translate-y-0.5 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2"
            >
              <div className="relative aspect-[4/3] bg-eightyw-light">
                {l.image ? (
                  <Image
                    src={l.image}
                    alt={l.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  // Branded placeholder — photo + full address shared on the
                  // intro call (per compliance posture). Visual mix of imaged
                  // and placeholder cards conveys an actively-refreshed
                  // inventory rather than a stale-stock-photo look.
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-eightyw-blue via-eightyw-blue to-[#0a1f3a] flex items-center justify-center"
                    aria-label={`${l.type} in ${l.area} — photo and address shared on the intro call`}
                  >
                    <div className="text-center px-5">
                      <p className="text-white/55 text-[10px] font-semibold uppercase tracking-[3px] mb-2">
                        Photo + full address
                      </p>
                      <p className="text-white text-sm font-semibold tracking-wide">
                        on intro call
                      </p>
                      <div className="w-10 h-px bg-brand-red/60 mx-auto my-3" />
                      <p className="text-white/70 text-[11px] font-medium leading-tight">
                        {l.area}
                      </p>
                    </div>
                  </div>
                )}
                <span className="absolute top-3 left-3 px-3 py-1 bg-eightyw-blue text-white text-[10px] font-semibold rounded-full uppercase tracking-wider">
                  {l.type}
                </span>
              </div>
              <div className="p-5">
                <p className="text-eightyw-blue font-bold text-base mb-0.5">{l.area}</p>
                <p className="text-text-secondary text-sm mb-4">{l.street}</p>
                <div className="flex items-end justify-between mb-4 pb-4 border-b border-eightyw-border">
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">List price</p>
                    <p className="text-brand-red font-bold text-2xl md:text-3xl leading-tight">
                      {l.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">Size</p>
                    <p className="text-eightyw-blue font-semibold text-sm">{l.sqft}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-[11px] font-semibold rounded-full">
                      Court-ordered sale
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-red text-white text-[11px] font-semibold rounded-full">
                      <Sparkles className="w-3 h-3" /> Below-market opportunity
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <span className="inline-flex items-center gap-1 text-brand-red text-xs font-semibold">
                      Get details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-text-muted text-xs md:text-sm">
          Click any listing above to start the deal hunt — your specialist will walk you through it within 24 hours.
        </p>
      </div>

      <LeadFormModal
        open={openProperty !== null}
        onClose={() => setOpenProperty(null)}
        contextHeadline="GET DETAILS ON THIS LISTING"
        contextSubtitle={openProperty ?? undefined}
      >
        <ForeclosureLeadForm
          formLocation="property_modal"
          selectedProperty={openProperty ?? undefined}
          submitLabel="Send Me the Details"
          bare
        />
      </LeadFormModal>
    </section>
  );
}
