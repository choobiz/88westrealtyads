"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import LeadFormModal from "@/components/shared/LeadFormModal";
import { ForeclosureLeadForm } from "./ForeclosureHero";

const SAMPLE_LISTINGS: {
  type: string;
  area: string;
  street: string;
  beds: string;
  baths: string;
  sqft: string;
  listed: string;
  assessed: string;
  courtDate: string;
  daysOnMarket: number;
  tag: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    type: "Detached",
    area: "Vancouver (Hastings-Sunrise)",
    street: "████ E 26th Ave, Vancouver",
    beds: "4 bed", baths: "2 bath", sqft: "1,820 sqft",
    listed: "$1.28M", assessed: "$1.42M", courtDate: "Jul 15",
    daysOnMarket: 142, tag: "Schedule A required",
    image: "/images/shared/properties/detached-craftsman.jpg",
    imageAlt: "Sample detached Vancouver residential exterior — illustrative court-ordered listing placeholder.",
  },
  {
    type: "Townhouse",
    area: "Burnaby (Highgate)",
    street: "████ Marlborough Ave, Burnaby",
    beds: "3 bed", baths: "2.5 bath", sqft: "1,510 sqft",
    listed: "$898K", assessed: "$964K", courtDate: "Jun 28",
    daysOnMarket: 87, tag: "Vacant — easy showings",
    image: "/images/shared/properties/townhouse-brick.jpg",
    imageAlt: "Sample Burnaby townhouse exterior — illustrative court-ordered listing placeholder.",
  },
  {
    type: "Condo",
    area: "Richmond (Brighouse)",
    street: "████ No. 3 Rd, Richmond",
    beds: "2 bed", baths: "2 bath", sqft: "905 sqft",
    listed: "$649K", assessed: "$702K", courtDate: "Jul 8",
    daysOnMarket: 113, tag: "Owner-occupier friendly",
    image: "/images/shared/properties/condo-minimalist.jpg",
    imageAlt: "Sample Richmond condo facade — illustrative court-ordered listing placeholder.",
  },
  {
    type: "Detached",
    area: "North Vancouver (Lynn Valley)",
    street: "████ Mountain Hwy, North Vancouver",
    beds: "5 bed", baths: "3 bath", sqft: "2,640 sqft",
    listed: "$1.80M", assessed: "$1.95M", courtDate: "Aug 12",
    daysOnMarket: 168, tag: "Tenanted — 60-day notice",
    image: "/images/shared/properties/detached-suburban.jpg",
    imageAlt: "Sample North Vancouver detached home — illustrative court-ordered listing placeholder.",
  },
  {
    type: "Condo",
    area: "Vancouver (Mount Pleasant)",
    street: "████ Quebec St, Vancouver",
    beds: "1 bed + den", baths: "1 bath", sqft: "712 sqft",
    listed: "$568K", assessed: "$612K", courtDate: "Jun 18",
    daysOnMarket: 96, tag: "First-time buyer eligible",
    image: "/images/shared/properties/condo-modern-glass.jpg",
    imageAlt: "Sample Vancouver mid-rise condo exterior — illustrative court-ordered listing placeholder.",
  },
  {
    type: "Half-duplex",
    area: "Burnaby (East Burnaby)",
    street: "████ 14th Ave, Burnaby",
    beds: "4 bed", baths: "3 bath", sqft: "2,180 sqft",
    listed: "$1.15M", assessed: "$1.24M", courtDate: "Jul 22",
    daysOnMarket: 124, tag: "Schedule A required",
    image: "/images/shared/properties/condo-courtyard.jpg",
    imageAlt: "Sample East Burnaby low-rise residential exterior — illustrative court-ordered listing placeholder.",
  },
];

export default function InventoryPreview() {
  const [openProperty, setOpenProperty] = useState<string | null>(null);
  return (
    <section id="deals" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-4">
            A Sample of What We&apos;re Already Tracking This Week.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Six current Greater Vancouver court-ordered listings from our active watch-list.
            Addresses are masked here — the unmasked file, court date, Schedule A draft, and
            possession-risk note all come from your specialist on the intro call.
          </p>
        </div>

        <p className="text-center text-xs text-text-muted mb-8">
          Sample shown for illustration. We&apos;re currently tracking ~389 active BC
          court-ordered listings — your specialist shortlists the right handful for you
          on the intro call.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {SAMPLE_LISTINGS.map((l, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setOpenProperty(`${l.area} — ${l.beds}, ${l.listed}`)}
              className="text-left bg-white border border-eightyw-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-brand-red/50 hover:-translate-y-0.5 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2"
            >
              <div className="relative aspect-[4/3] bg-eightyw-light">
                <Image
                  src={l.image}
                  alt={l.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 px-2 py-1 bg-brand-red text-white text-[10px] font-semibold rounded-full uppercase tracking-wider">
                  {l.type}
                </span>
                <span className="absolute top-3 right-3 px-2 py-1 bg-white/95 backdrop-blur-sm text-eightyw-blue text-[10px] font-semibold rounded-full shadow-sm whitespace-nowrap">
                  {l.daysOnMarket} DOM
                </span>
              </div>
              <div className="p-5">
              <p className="text-eightyw-blue font-bold text-base mb-1">{l.area}</p>
              <p className="text-text-secondary text-sm mb-3 font-mono">{l.street}</p>
              <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-eightyw-border">
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Beds</p>
                  <p className="text-eightyw-blue font-semibold text-sm">{l.beds}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Baths</p>
                  <p className="text-eightyw-blue font-semibold text-sm">{l.baths}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Size</p>
                  <p className="text-eightyw-blue font-semibold text-sm">{l.sqft}</p>
                </div>
              </div>
              <div className="space-y-1.5 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Listed</span>
                  <span className="text-eightyw-blue font-bold">{l.listed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Last assessed</span>
                  <span className="text-eightyw-blue font-semibold">{l.assessed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Court date</span>
                  <span className="text-brand-red font-semibold">{l.courtDate}</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-[11px] font-semibold rounded-full">
                  {l.tag}
                </span>
                <span className="inline-flex items-center gap-1 text-brand-red text-xs font-semibold">
                  Get details <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-eightyw-light border border-eightyw-border rounded-2xl p-6 mb-10">
          <h3 className="text-eightyw-blue font-bold text-sm uppercase tracking-wider mb-3">Card legend</h3>
          <dl className="space-y-3 text-sm text-text-secondary">
            <div>
              <dt className="font-semibold text-eightyw-blue">Court date</dt>
              <dd>The BC Supreme Court hearing where the lender&apos;s lawyer applies for sale approval. Other buyers can submit competing offers that day; the judge usually awards to the highest bid.</dd>
            </div>
            <div>
              <dt className="font-semibold text-eightyw-blue">Listed vs. last assessed</dt>
              <dd>The spread between the current ask and the most recent BC Assessment value. Useful as a sanity check, not a guarantee — assessments lag the market by 6–18 months.</dd>
            </div>
            <div>
              <dt className="font-semibold text-eightyw-blue">Schedule A</dt>
              <dd>The lender/court addendum that releases the lender from any condition or warranty responsibility. Every BC court-ordered offer requires it. We draft it line-by-line with you.</dd>
            </div>
          </dl>
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
