"use client";

/**
 * InventoryMap — replaces the inventory card-grid with an interactive
 * Leaflet map. Each foreclosure listing renders as a pin (featured = red,
 * locked = grey-with-lock-icon). Click pin → preview popover with photo +
 * price + Get Details / Unlock CTA → opens the same LeadFormModal used
 * everywhere else, so GHL routing is unchanged.
 *
 * Strategic rationale: the card-grid pattern is conventional. Foreclosure
 * search is a high-intent niche where users actually want to "see what's
 * out there" geographically. A map answers the implicit question "are
 * there deals in MY area?" in two seconds — which the grid takes a scroll
 * to answer. We're betting the engagement increase outweighs the form-
 * click friction of one extra interaction.
 *
 * Build notes:
 *   - SSR-disabled via `next/dynamic` in page.tsx (Leaflet needs window
 *     on import). This component is `use client`-only and lazy-loaded.
 *   - Pin precision is at the NEIGHBORHOOD level (not exact address) —
 *     matches the LP's broader compliance posture (street numbers masked,
 *     full address shared on call) and prevents pins from feeling like
 *     a privacy intrusion.
 *   - Filter chips on top filter both the visible pins AND the legend
 *     counts. Locked pins stay locked across filters.
 */

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Image from "next/image";
import { ArrowRight, Lock, MapPin, Eye } from "lucide-react";
import LeadFormModal from "@/components/shared/LeadFormModal";
import { ForeclosureLeadForm } from "./ForeclosureHero";
import dealsData from "@/data/foreclosure-deals.json";
import foreclosureStats from "@/data/foreclosure-stats.json";
import { locateListing, MAP_CENTER, MAP_ZOOM_DEFAULT } from "@/lib/foreclosure-geocode";
import "leaflet/dist/leaflet.css";

type ForeclosureDeal = {
  type: string;
  area: string;
  street: string;
  price: string;
  sqft: string;
  courtOrdered: boolean;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

type ModalContext = { subtitle: string; isLocked: boolean } | null;
type PropertyTypeFilter = "All" | "Condo" | "House" | "Townhouse" | "Other";

const LISTINGS: ForeclosureDeal[] = dealsData.deals;
const TYPE_FILTERS: PropertyTypeFilter[] = ["All", "Condo", "House", "Townhouse"];

// ─────────────────────────────────────────────────────────────────────────────
// Custom Leaflet pin icons. We use divIcon so we can use Tailwind colors +
// inline SVG rather than shipping PNGs.

const FEATURED_PIN_HTML = `
  <div class="w-7 h-7 bg-brand-red rounded-full border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
    <div class="w-2 h-2 bg-white rounded-full"></div>
  </div>
`;

const LOCKED_PIN_HTML = `
  <div class="w-7 h-7 bg-eightyw-blue rounded-full border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer transition-transform hover:scale-110 opacity-90">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  </div>
`;

function makeIcon(html: string) {
  return L.divIcon({
    html,
    className: "foreclosure-pin",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

// ─────────────────────────────────────────────────────────────────────────────

export default function InventoryMap() {
  const [modalCtx, setModalCtx] = useState<ModalContext>(null);
  const [typeFilter, setTypeFilter] = useState<PropertyTypeFilter>("All");

  const filtered = useMemo(() => {
    if (typeFilter === "All") return LISTINGS;
    return LISTINGS.filter((l) =>
      typeFilter === "Other"
        ? !["Condo", "House", "Townhouse"].includes(l.type)
        : l.type === typeFilter,
    );
  }, [typeFilter]);

  const featuredCount = filtered.filter((l) => l.featured !== false).length;
  const lockedCount = filtered.filter((l) => l.featured === false).length;

  const featuredIcon = useMemo(() => makeIcon(FEATURED_PIN_HTML), []);
  const lockedIcon = useMemo(() => makeIcon(LOCKED_PIN_HTML), []);

  const openCard = (l: ForeclosureDeal, isLocked: boolean) => {
    setModalCtx({
      subtitle: `${l.type} · ${l.area} · ${l.price}`,
      isLocked,
    });
  };

  return (
    <section id="deals" className="bg-eightyw-light py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-brand-red text-[12px] font-semibold uppercase tracking-[2px] mb-3">
            Live foreclosure map · Greater Vancouver
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-4">
            {LISTINGS.length} active court-ordered listings — see where they are.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Tap any pin to preview the listing. Featured pins are publicly viewable —{" "}
            <span className="inline-flex items-center gap-1 font-semibold text-eightyw-blue">
              <Lock className="w-3.5 h-3.5" />
              locked
            </span>{" "}
            pins unlock with a 30-second registration. Tracking ~{foreclosureStats.marketingNumber} active
            BC court-ordered listings; the map shows this week&apos;s shortlist.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {TYPE_FILTERS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={[
                "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                typeFilter === t
                  ? "bg-eightyw-blue text-white"
                  : "bg-white text-eightyw-blue border border-eightyw-border hover:border-eightyw-blue",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
          <div className="flex-1" />
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-eightyw-border rounded-full text-xs">
            <span className="inline-flex items-center gap-1.5 text-eightyw-blue font-semibold">
              <span className="w-2.5 h-2.5 bg-brand-red rounded-full" />
              {featuredCount} featured
            </span>
            <span className="text-text-muted">·</span>
            <span className="inline-flex items-center gap-1.5 text-eightyw-blue font-semibold">
              <span className="w-2.5 h-2.5 bg-eightyw-blue rounded-full" />
              {lockedCount} locked
            </span>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-eightyw-border shadow-lg bg-white">
          <MapContainer
            center={[MAP_CENTER.lat, MAP_CENTER.lng]}
            zoom={MAP_ZOOM_DEFAULT}
            scrollWheelZoom={false}
            style={{ height: "560px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Force a fit-bounds pass once on mount to include all visible pins */}
            <FitBoundsOnMount listings={filtered} />

            {filtered.map((l, i) => {
              const locked = l.featured === false;
              const pos = locateListing(l.area, l.street);
              return (
                <Marker
                  key={`${i}-${typeFilter}`}
                  position={[pos.lat, pos.lng]}
                  icon={locked ? lockedIcon : featuredIcon}
                >
                  <Popup minWidth={240} maxWidth={260}>
                    <DealPopupContent listing={l} locked={locked} onCta={() => openCard(l, locked)} />
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Unlock CTA below the map — for users who scrolled but didn't tap */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-eightyw-border rounded-2xl px-5 py-4">
          <div className="text-center sm:text-left">
            <p className="text-eightyw-blue font-bold text-base mb-0.5">
              See all {LISTINGS.length} listings unblurred — including the locked ones.
            </p>
            <p className="text-text-secondary text-sm">
              Full addresses, court dates, Schedule A drafts. 30-second registration. No fee to buyers.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setModalCtx({
                subtitle: `Unlock all ${LISTINGS.length} active court-ordered listings`,
                isLocked: true,
              })
            }
            className="inline-flex items-center justify-center h-[48px] px-6 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px] shadow-[0_10px_30px_rgba(197,34,4,0.25)] whitespace-nowrap"
          >
            <Eye className="w-4 h-4" />
            Unlock the full list
          </button>
        </div>

        <p className="text-center text-text-muted text-xs md:text-sm mt-6">
          Pins are at neighborhood precision — your specialist shares the exact address on the intro call.
          Map data &copy; OpenStreetMap contributors.
        </p>
      </div>

      <LeadFormModal
        open={modalCtx !== null}
        onClose={() => setModalCtx(null)}
        contextHeadline={
          modalCtx?.isLocked
            ? "UNLOCK THIS LISTING + THE FULL DEAL LIST"
            : "GET DETAILS ON THIS LISTING"
        }
        contextSubtitle={modalCtx?.subtitle}
      >
        <ForeclosureLeadForm
          formLocation="property_modal"
          selectedProperty={modalCtx?.subtitle}
          submitLabel={modalCtx?.isLocked ? "Send Me the Full List" : "Send Me the Details"}
          bare
        />
      </LeadFormModal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function DealPopupContent({
  listing: l,
  locked,
  onCta,
}: {
  listing: ForeclosureDeal;
  locked: boolean;
  onCta: () => void;
}) {
  return (
    <div className="w-full" style={{ fontFamily: "var(--font-poppins, sans-serif)" }}>
      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-eightyw-light rounded-lg overflow-hidden mb-2">
        {l.image ? (
          <Image
            src={l.image}
            alt={l.imageAlt}
            fill
            sizes="240px"
            className={["object-cover", locked ? "blur-md scale-[1.05]" : ""].join(" ")}
          />
        ) : (
          <div className="absolute inset-0 bg-eightyw-blue flex items-center justify-center">
            <MapPin className="w-8 h-8 text-white/40" />
          </div>
        )}
        <span className="absolute top-2 left-2 px-2 py-0.5 bg-eightyw-blue text-white text-[9px] font-bold rounded-full uppercase tracking-wider">
          {l.type}
        </span>
        {locked && (
          <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 bg-white/95 text-eightyw-blue text-[9px] font-bold rounded-full">
            <Lock className="w-2.5 h-2.5" /> Locked
          </span>
        )}
      </div>

      {/* Info */}
      <div className="px-1">
        <p className="text-eightyw-blue font-bold text-sm mb-0">{l.area}</p>
        <p className="text-text-secondary text-xs mb-2">
          {locked ? l.street.replace(/^[0-9]+\s+/, "•••• ") : l.street}
        </p>
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-[9px] text-text-muted uppercase tracking-wider">List price</p>
            <p className="text-brand-red font-bold text-lg leading-tight">{l.price}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-text-muted uppercase tracking-wider">Size</p>
            <p className="text-eightyw-blue font-semibold text-xs">{l.sqft}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onCta}
          className="w-full mt-1 inline-flex items-center justify-center gap-1 h-[36px] bg-brand-red text-white text-xs font-semibold rounded-full hover:bg-brand-red-hover transition-colors"
        >
          {locked ? "Unlock details" : "Get details"}
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Once-on-mount: fit map bounds around the visible pins so the user sees
 * Greater Vancouver framed nicely without manually panning. Only runs once
 * per filter change.
 */
function FitBoundsOnMount({ listings }: { listings: ForeclosureDeal[] }) {
  const map = useMap();
  useEffect(() => {
    if (listings.length === 0) return;
    const points = listings.map((l) => locateListing(l.area, l.street));
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
  }, [listings, map]);
  return null;
}
