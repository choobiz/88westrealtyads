"use client";

import Image from "next/image";
import { ArrowRight, Lock, Sparkles, Eye } from "lucide-react";
import { useForeclosureLeadModal } from "./ForeclosureLeadProvider";
import dealsData from "@/data/foreclosure-deals.json";
import foreclosureStats from "@/data/foreclosure-stats.json";

type ForeclosureDeal = {
  type: string;
  area: string;
  street: string;
  price: string;
  sqft: string;
  courtOrdered: boolean;
  // `image` is the public path to a photo for this listing. Photo provenance
  // is described in data/foreclosure-deals.json compliance.note. When empty
  // (rare — the curator now sources photos automatically), the card renders a
  // branded placeholder. See InventoryDealCard.
  image: string;
  imageAlt: string;
  // True for the 12 featured cards shown unblurred above the fold. False for
  // the "locked" tier rendered with blur + an unlock CTA — the curiosity-gap
  // pattern that drives form submissions. Both click into the same lead form
  // modal; the modal copy differs by tier (see openProperty/openLocked state).
  featured?: boolean;
};

const LISTINGS: ForeclosureDeal[] = dealsData.deals;
const FEATURED = LISTINGS.filter((l) => l.featured !== false);
const LOCKED = LISTINGS.filter((l) => l.featured === false);

export default function InventoryPreview() {
  const { openLeadForm } = useForeclosureLeadModal();

  const openCard = (l: ForeclosureDeal, isLocked: boolean) => {
    const subtitle = `${l.type} · ${l.area} · ${l.price}`;
    openLeadForm({
      headline: isLocked
        ? "UNLOCK THIS LISTING + THE FULL DEAL LIST"
        : "GET DETAILS ON THIS LISTING",
      subtitle,
      selectedProperty: subtitle,
      submitLabel: isLocked ? "Send Me the Full List" : "Send Me the Details",
      formLocation: "property_modal",
      source: isLocked ? "inventory_locked_card" : "inventory_featured_card",
    });
  };

  return (
    <section id="deals" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-4">
            Court-Ordered Listings on the Market Right Now.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {FEATURED.length} featured Greater Vancouver court-ordered listings from this week&apos;s
            MLS&reg; scan — with {LOCKED.length} more available below. Your specialist sends the full
            address, court date, Schedule A draft, and possession-risk note on the intro call.
          </p>
        </div>

        <p className="text-center text-xs text-text-muted mb-8">
          A live shortlist. We&apos;re currently tracking ~{foreclosureStats.marketingNumber} active BC
          court-ordered listings — your specialist matches the right handful to your buy-box
          on the intro call.
        </p>

        {/* Featured tier — unblurred, full info, click → modal */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {FEATURED.map((l, i) => (
            <InventoryDealCard
              key={`f-${i}`}
              listing={l}
              locked={false}
              onClick={() => openCard(l, false)}
            />
          ))}
        </div>

        {/* Locked tier — blurred preview + unlock CTA. Click → modal with
            stronger conversion copy. The whole row is wrapped so the overlay
            CTA + the blurred cards visually read as a single "gated" block. */}
        {LOCKED.length > 0 && (
          <div className="relative mt-4">
            {/* Headline + unlock CTA, positioned ABOVE the blurred grid */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 pb-5 border-b border-eightyw-border">
              <div className="text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 text-brand-red text-[11px] font-semibold uppercase tracking-[2px] rounded-full mb-2">
                  <Lock className="w-3 h-3" />
                  {LOCKED.length} more active listings
                </div>
                <h3 className="text-eightyw-blue text-xl md:text-2xl font-bold">
                  Want to see the full list?
                </h3>
                <p className="text-text-secondary text-sm mt-1 max-w-xl">
                  We update the inventory continuously — the rest of this week&apos;s court-ordered
                  inventory is reserved for registered buyers. 30-second registration.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openLeadForm({
                    headline: "UNLOCK THIS LISTING + THE FULL DEAL LIST",
                    subtitle: `Unlock all ${LOCKED.length + FEATURED.length} active court-ordered listings`,
                    submitLabel: "Send Me the Full List",
                    formLocation: "deals_section",
                    source: "inventory_unlock_button",
                  })
                }
                className="inline-flex items-center justify-center h-[48px] px-6 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px] shadow-[0_10px_30px_rgba(197,34,4,0.25)] whitespace-nowrap"
              >
                <Eye className="w-4 h-4" />
                Unlock the full list
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {LOCKED.map((l, i) => (
                <InventoryDealCard
                  key={`l-${i}`}
                  listing={l}
                  locked={true}
                  onClick={() => openCard(l, true)}
                />
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-text-muted text-xs md:text-sm mt-10">
          Click any listing above to start the deal hunt — your specialist will walk you through it within 24 hours.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function InventoryDealCard({
  listing: l,
  locked,
  onClick,
}: {
  listing: ForeclosureDeal;
  locked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative text-left bg-white border rounded-2xl overflow-hidden transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2",
        locked
          ? "border-eightyw-border hover:border-brand-red/40 hover:shadow-lg hover:-translate-y-0.5"
          : "border-eightyw-border hover:shadow-lg hover:border-brand-red/50 hover:-translate-y-0.5",
      ].join(" ")}
      aria-label={
        locked
          ? `Locked listing in ${l.area} at ${l.price}. Click to unlock the full inventory.`
          : `${l.type} listing in ${l.area} at ${l.price}. Click for details.`
      }
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-eightyw-light overflow-hidden">
        {l.image ? (
          <Image
            src={l.image}
            alt={l.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={[
              "object-cover transition-transform duration-300 group-hover:scale-[1.03]",
              locked ? "blur-md scale-[1.05]" : "",
            ].join(" ")}
          />
        ) : (
          <div
            className={[
              "absolute inset-0 bg-gradient-to-br from-eightyw-blue via-eightyw-blue to-[#0a1f3a] flex items-center justify-center",
              locked ? "blur-md" : "",
            ].join(" ")}
            aria-label={`${l.type} in ${l.area} — photo and address shared on the intro call`}
          >
            <div className="text-center px-5">
              <p className="text-white/55 text-[10px] font-semibold uppercase tracking-[3px] mb-2">
                Photo + full address
              </p>
              <p className="text-white text-sm font-semibold tracking-wide">
                on intro call
              </p>
            </div>
          </div>
        )}

        {/* Type chip */}
        <span className="absolute top-3 left-3 px-3 py-1 bg-eightyw-blue text-white text-[10px] font-semibold rounded-full uppercase tracking-wider z-10">
          {l.type}
        </span>

        {/* Lock badge (only on locked tier) */}
        {locked && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-3 py-1 bg-white/90 text-eightyw-blue text-[10px] font-semibold rounded-full uppercase tracking-wider z-10 backdrop-blur-sm">
            <Lock className="w-3 h-3" /> Locked
          </span>
        )}

        {/* Locked-tier hover-CTA overlay (subtle dimmer + center prompt) */}
        {locked && (
          <div className="absolute inset-0 bg-eightyw-blue/30 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-xs font-semibold rounded-full shadow-lg">
              <Eye className="w-3.5 h-3.5" /> Tap to unlock
            </div>
          </div>
        )}
      </div>

      {/* Info area */}
      <div className="p-5">
        <p className="text-eightyw-blue font-bold text-base mb-0.5">{l.area}</p>
        <p className="text-text-secondary text-sm mb-4">
          {locked ? <span className="opacity-60">{l.street.replace(/^[0-9]+\s+/, "•••• ")}</span> : l.street}
        </p>
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
            {!locked && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-red text-white text-[11px] font-semibold rounded-full">
                <Sparkles className="w-3 h-3" /> Below-market opportunity
              </span>
            )}
          </div>
          <div className="flex justify-end">
            <span className="inline-flex items-center gap-1 text-brand-red text-xs font-semibold">
              {locked ? "Unlock details" : "Get details"} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
