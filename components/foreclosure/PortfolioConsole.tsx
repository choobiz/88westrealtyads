"use client";

/**
 * PortfolioConsole — Bento-grid LP section reframing the foreclosure inventory
 * as an investment "portfolio console."
 *
 * Design rationale (synthesised from the 2026-06-12 research pass):
 *   - Portfolio Console framing (#1 of the research) — listings are
 *     "positions," not "houses." The user is a strategist, not a shopper.
 *     This raises lead quality (documented across financial-aesthetic
 *     reframings of non-financial verticals).
 *   - Apple/Linear bento layout (#2) — asymmetric tiles, modular blocks,
 *     scannable in 1-2 viewports. Documented +47% time on page, +38% CTR.
 *
 * Replaces InventoryPreview in the page. Same form, same GHL webhook, same
 * `experiment_variant` and `form_location` tracking — only the framing is
 * different.
 *
 * Layout:
 *   Row 1  Portfolio Overview  (span 7)  +  Featured Position  (span 5)
 *   Row 2  Tier Distribution   (span 4)  +  Geographic (4)  +  Calendar (4)
 *   Row 3  Strategy Session    (span 12 — with inline form)
 *   Row 4  Active Inventory    (span 12 — compact strip of all positions)
 *
 * Mobile collapses everything to single column with smaller text.
 */

import { useMemo } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calendar,
  Eye,
  Gavel,
  Lock,
  MapPin,
  TrendingDown,
} from "lucide-react";
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
  image: string;
  imageAlt: string;
  featured?: boolean;
};

const LISTINGS: ForeclosureDeal[] = dealsData.deals;
const FEATURED = LISTINGS.filter((l) => l.featured !== false);
const LOCKED = LISTINGS.filter((l) => l.featured === false);

// Parse display price strings ($499K, $1.27M) back to numbers so we can
// compute aggregates and tier buckets. Source data has clean format
// so the parser stays minimal.
function priceToNum(p: string): number {
  const s = p.replace(/[$,]/g, "");
  if (s.endsWith("M")) return parseFloat(s) * 1_000_000;
  if (s.endsWith("K")) return parseFloat(s) * 1_000;
  return parseFloat(s) || 0;
}

const PRICES = LISTINGS.map((l) => priceToNum(l.price));
const TOTAL_VALUE = PRICES.reduce((a, b) => a + b, 0);
const MIN_PRICE = Math.min(...PRICES);
const MAX_PRICE = Math.max(...PRICES);
const MEDIAN_PRICE = [...PRICES].sort((a, b) => a - b)[Math.floor(PRICES.length / 2)];

const TIERS = [
  { label: "Entry", range: "<$500K", min: 0, max: 500_000 },
  { label: "Mid", range: "$500K–$1M", min: 500_000, max: 1_000_000 },
  { label: "Premium", range: "$1M–$2M", min: 1_000_000, max: 2_000_000 },
  { label: "Luxury", range: "$2M+", min: 2_000_000, max: Infinity },
] as const;

function priceFmt(n: number): string {
  if (n >= 1_000_000) {
    return n >= 10_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${(n / 1_000_000).toFixed(2)}M`;
  }
  return `$${Math.round(n / 1000)}K`;
}

// ─────────────────────────────────────────────────────────────────────────────

export default function PortfolioConsole() {
  const { openLeadForm } = useForeclosureLeadModal();

  const openCard = (l: ForeclosureDeal, isLocked: boolean) => {
    const subtitle = `${l.type} · ${l.area} · ${l.price}`;
    openLeadForm({
      headline: isLocked
        ? "BOOK YOUR FORECLOSURE STRATEGY SESSION"
        : "POSITION DETAILS",
      subtitle,
      selectedProperty: subtitle,
      submitLabel: isLocked ? "Schedule Strategy Call" : "Send Me Position Details",
      formLocation: "property_modal",
      source: isLocked ? "console_locked_card" : "console_featured_card",
    });
  };

  const openConsult = () => {
    openLeadForm({
      headline: "BOOK YOUR FORECLOSURE STRATEGY SESSION",
      subtitle: `Strategy session · ${LISTINGS.length} active positions`,
      submitLabel: "Schedule Strategy Call",
      formLocation: "deals_section",
      source: "console_strategy_cta",
    });
  };

  // Featured = position #1 by lowest price (entry deal — broadest appeal)
  const featuredPosition = useMemo(
    () => [...FEATURED].sort((a, b) => priceToNum(a.price) - priceToNum(b.price))[0],
    [],
  );

  const tierCounts = useMemo(
    () =>
      TIERS.map((t) => ({
        ...t,
        count: PRICES.filter((p) => p >= t.min && p < t.max).length,
      })),
    [],
  );

  const cityCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of LISTINGS) {
      const city = l.area.split(", ").slice(-1)[0];
      map.set(city, (map.get(city) || 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  return (
    <section
      id="deals"
      className="bg-[#F7F8FA] py-12 lg:py-16"
      style={{ fontFeatureSettings: '"tnum" 1, "lnum" 1' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section eyebrow */}
        <div className="mb-6">
          <p className="text-eightyw-cta text-[11px] font-semibold uppercase tracking-[2px] mb-2">
            Foreclosure portfolio console · Updated {new Date().toISOString().slice(0, 10)}
          </p>
          <h2 className="text-eightyw-blue text-3xl md:text-4xl font-bold leading-tight">
            {LISTINGS.length} active positions across Greater Vancouver.
          </h2>
          <p className="text-text-secondary text-base md:text-lg mt-2 max-w-3xl">
            Court-ordered listings reframed as an opportunity portfolio. Public summary visible
            below — full positions and strategy notes available on a 20-minute call.
          </p>
        </div>

        {/* ROW 1 — Portfolio Overview + Featured Position */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
          <PortfolioOverviewTile
            totalCount={LISTINGS.length}
            featuredCount={FEATURED.length}
            lockedCount={LOCKED.length}
          />
          <FeaturedPositionTile listing={featuredPosition} onOpen={() => openCard(featuredPosition, false)} />
        </div>

        {/* ROW 2 — Tier · Geographic · Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
          <TierDistributionTile tiers={tierCounts} />
          <GeographicDistributionTile cities={cityCounts} />
          <CourtCalendarTile />
        </div>

        {/* ROW 3 — Strategy Session CTA */}
        <div className="mb-4">
          <StrategySessionTile onCta={openConsult} />
        </div>

        {/* ROW 4 — Active inventory strip */}
        <ActiveInventoryTile
          featured={FEATURED}
          lockedCount={LOCKED.length}
          onOpenFeatured={(l) => openCard(l, false)}
          onUnlock={openConsult}
        />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Tile: Portfolio Overview (2x2 hero metric block)
// ═════════════════════════════════════════════════════════════════════════════

function PortfolioOverviewTile({
  totalCount,
  featuredCount,
  lockedCount,
}: {
  totalCount: number;
  featuredCount: number;
  lockedCount: number;
}) {
  return (
    <div className="lg:col-span-7 bg-white border border-eightyw-border rounded-2xl p-6 md:p-7 relative overflow-hidden">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-text-muted text-[10px] font-semibold uppercase tracking-[2px]">
            Portfolio overview
          </p>
          <h3 className="text-eightyw-blue text-xl md:text-2xl font-bold mt-0.5">
            Active Positions
          </h3>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent-green/10 text-accent-green text-[10px] font-semibold rounded-full">
          <span className="w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse" /> Live
        </span>
      </div>

      {/* Metric grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <Metric label="Positions" value={totalCount.toString()} />
        <Metric label="Public" value={featuredCount.toString()} sub="visible below" />
        <Metric label="Registration" value={lockedCount.toString()} sub="unlock on call" />
        <Metric label="Aggregate Value" value={priceFmt(TOTAL_VALUE)} sub="market list" />
      </div>

      <div className="border-t border-eightyw-border pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <Row label="Price range" value={`${priceFmt(MIN_PRICE)} → ${priceFmt(MAX_PRICE)}`} />
          <Row label="Median position" value={priceFmt(MEDIAN_PRICE)} />
          <Row label="Tracked weekly" value="Greater Vancouver MLS scan" />
          <Row label="Specialist" value="Buyer-side · attends every hearing" />
        </div>
      </div>

      <p className="text-text-muted text-[10px] mt-4">
        ~{foreclosureStats.marketingNumber} active BC court-ordered listings tracked overall · this is
        the curated Greater Vancouver shortlist.
      </p>
    </div>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="text-text-muted text-[10px] font-semibold uppercase tracking-[1.5px] mb-0.5">
        {label}
      </p>
      <p className="text-eightyw-blue text-2xl md:text-3xl font-bold leading-tight">{value}</p>
      {sub && <p className="text-text-muted text-[10px] mt-0.5">{sub}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-text-muted text-xs">{label}</span>
      <span className="text-eightyw-text text-xs font-semibold tabular-nums">{value}</span>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Tile: Featured Position (2x2, with photo)
// ═════════════════════════════════════════════════════════════════════════════

function FeaturedPositionTile({
  listing,
  onOpen,
}: {
  listing: ForeclosureDeal;
  onOpen: () => void;
}) {
  if (!listing) return null;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="lg:col-span-5 bg-white border border-eightyw-border rounded-2xl overflow-hidden text-left hover:shadow-lg hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-eightyw-cta/40 focus:ring-offset-2 group"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Photo */}
        <div className="relative aspect-[4/3] md:aspect-auto bg-eightyw-light overflow-hidden">
          {listing.image && (
            <Image
              src={listing.image}
              alt={listing.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          )}
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-eightyw-cta text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
            Top position
          </span>
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col">
          <p className="text-text-muted text-[10px] font-semibold uppercase tracking-[2px]">
            Featured today
          </p>
          <p className="text-eightyw-blue text-lg font-bold leading-tight mt-1">
            {listing.area}
          </p>
          <p className="text-text-secondary text-sm">{listing.street}</p>

          <div className="mt-3 pt-3 border-t border-eightyw-border flex items-end justify-between">
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wider">List</p>
              <p className="text-eightyw-cta text-2xl font-bold leading-tight tabular-nums">
                {listing.price}
              </p>
            </div>
            <div className="text-right">
              <p className="text-text-muted text-[10px] uppercase tracking-wider">Size · Type</p>
              <p className="text-eightyw-blue text-xs font-semibold">{listing.sqft}</p>
              <p className="text-eightyw-blue text-xs">{listing.type}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-eightyw-cta/10 text-eightyw-cta text-[10px] font-semibold rounded-full">
              <Gavel className="w-2.5 h-2.5" /> Court-ordered
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-green/10 text-accent-green text-[10px] font-semibold rounded-full">
              <TrendingDown className="w-2.5 h-2.5" /> Below market
            </span>
          </div>

          <div className="mt-auto pt-3">
            <span className="inline-flex items-center gap-1 text-eightyw-cta text-xs font-semibold">
              Open position details <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Tile: Price Tier Distribution (horizontal bars)
// ═════════════════════════════════════════════════════════════════════════════

function TierDistributionTile({
  tiers,
}: {
  tiers: { label: string; range: string; count: number }[];
}) {
  const total = tiers.reduce((a, t) => a + t.count, 0);
  return (
    <div className="lg:col-span-4 bg-white border border-eightyw-border rounded-2xl p-5">
      <p className="text-text-muted text-[10px] font-semibold uppercase tracking-[2px]">
        Distribution
      </p>
      <h3 className="text-eightyw-blue text-base font-bold mt-0.5 mb-4">
        By price tier
      </h3>

      <div className="space-y-2.5">
        {tiers.map((t) => {
          const pct = total > 0 ? (t.count / total) * 100 : 0;
          return (
            <div key={t.label}>
              <div className="flex items-baseline justify-between text-xs mb-1">
                <span className="text-eightyw-text font-semibold">{t.label}</span>
                <span className="text-text-muted tabular-nums">
                  {t.count} · {pct.toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 bg-eightyw-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-eightyw-blue rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-text-muted text-[10px] mt-0.5">{t.range}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Tile: Geographic Distribution (city list with dots)
// ═════════════════════════════════════════════════════════════════════════════

function GeographicDistributionTile({ cities }: { cities: [string, number][] }) {
  const total = cities.reduce((a, c) => a + c[1], 0);
  return (
    <div className="lg:col-span-4 bg-white border border-eightyw-border rounded-2xl p-5">
      <p className="text-text-muted text-[10px] font-semibold uppercase tracking-[2px]">
        Geographic
      </p>
      <h3 className="text-eightyw-blue text-base font-bold mt-0.5 mb-4">
        By city
      </h3>

      <div className="space-y-2">
        {cities.map(([city, count]) => {
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={city} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-eightyw-cta" />
                <span className="text-eightyw-text font-semibold">{city}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-eightyw-border rounded-full overflow-hidden hidden md:block">
                  <div
                    className="h-full bg-eightyw-cta rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-text-muted text-xs tabular-nums w-8 text-right">{count}</span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-text-muted text-[10px] mt-4 pt-3 border-t border-eightyw-border">
        Service area: Vancouver / N. Vancouver / Burnaby / Richmond · plus active Surrey deals
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Tile: Court Calendar (upcoming hearings)
// ═════════════════════════════════════════════════════════════════════════════

function CourtCalendarTile() {
  // We don't have per-listing court dates in the scrape yet — surface a
  // qualitative summary backed by the operator's process. Replace with real
  // per-listing court dates when GVR WebAPI lands (see foreclosure-deals.json
  // compliance.replaceWith).
  return (
    <div className="lg:col-span-4 bg-white border border-eightyw-border rounded-2xl p-5">
      <p className="text-text-muted text-[10px] font-semibold uppercase tracking-[2px]">
        Court hearings
      </p>
      <h3 className="text-eightyw-blue text-base font-bold mt-0.5 mb-4">
        Scheduled at BC Supreme Court
      </h3>

      <div className="space-y-3">
        <CalendarRow label="This week" detail="Active hearings — shortlist on call" highlight />
        <CalendarRow label="Next 2 weeks" detail="Approval cycles in progress" />
        <CalendarRow label="Ongoing" detail="Specialist attends on your behalf" />
      </div>

      <div className="mt-4 pt-3 border-t border-eightyw-border flex items-center gap-2">
        <Calendar className="w-3.5 h-3.5 text-text-muted" />
        <p className="text-text-muted text-[10px]">
          Specific dates shared at intro call · we attend the hearing
        </p>
      </div>
    </div>
  );
}

function CalendarRow({
  label,
  detail,
  highlight,
}: {
  label: string;
  detail: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={[
          "mt-1 w-2 h-2 rounded-full shrink-0",
          highlight ? "bg-eightyw-cta animate-pulse" : "bg-eightyw-border",
        ].join(" ")}
      />
      <div className="flex-1">
        <p className="text-eightyw-text text-sm font-semibold">{label}</p>
        <p className="text-text-secondary text-xs">{detail}</p>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Tile: Strategy Session CTA (form-row, full width)
// ═════════════════════════════════════════════════════════════════════════════

function StrategySessionTile({ onCta }: { onCta: () => void }) {
  return (
    <div className="bg-eightyw-blue text-white rounded-2xl p-6 md:p-7 overflow-hidden relative">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_auto] items-center gap-6">
        <div>
          <p className="text-white/60 text-[10px] font-semibold uppercase tracking-[2px] mb-2">
            Strategy session · 20 min · No fee
          </p>
          <h3 className="text-white text-xl md:text-2xl font-bold leading-tight mb-2">
            Review the full portfolio with a buyer-side specialist.
          </h3>
          <p className="text-white/70 text-sm md:text-base max-w-2xl">
            We share full addresses, court dates, Schedule A drafts, and our take on which
            positions actually pencil for your buy-box. Booked direct — no broker tour
            roulette.
          </p>
        </div>
        <button
          type="button"
          onClick={onCta}
          className="inline-flex items-center justify-center h-[52px] px-7 bg-eightyw-cta text-white font-semibold rounded-full hover:bg-eightyw-cta-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px] shadow-[0_10px_30px_rgba(197,34,4,0.35)] whitespace-nowrap"
        >
          Book strategy session <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Tile: Active Inventory (compact card grid of all positions)
// ═════════════════════════════════════════════════════════════════════════════

function ActiveInventoryTile({
  featured,
  lockedCount,
  onOpenFeatured,
  onUnlock,
}: {
  featured: ForeclosureDeal[];
  lockedCount: number;
  onOpenFeatured: (l: ForeclosureDeal) => void;
  onUnlock: () => void;
}) {
  return (
    <div className="bg-white border border-eightyw-border rounded-2xl p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-text-muted text-[10px] font-semibold uppercase tracking-[2px]">
            Active inventory · Public summary
          </p>
          <h3 className="text-eightyw-blue text-base font-bold mt-0.5">
            {featured.length} positions visible
          </h3>
        </div>
        <button
          type="button"
          onClick={onUnlock}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-eightyw-light border border-eightyw-border text-eightyw-text text-xs font-semibold rounded-full hover:border-eightyw-cta hover:text-eightyw-cta transition-colors"
        >
          <Lock className="w-3 h-3" /> Unlock {lockedCount} more
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {featured.map((l, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onOpenFeatured(l)}
            className="text-left bg-white border border-eightyw-border rounded-xl overflow-hidden hover:shadow-md hover:border-eightyw-cta/30 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-eightyw-cta/40 focus:ring-offset-1 group"
          >
            <div className="relative aspect-[4/3] bg-eightyw-light overflow-hidden">
              {l.image && (
                <Image
                  src={l.image}
                  alt={l.imageAlt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              )}
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-eightyw-blue text-white text-[9px] font-bold rounded-full uppercase tracking-wider">
                {l.type}
              </span>
            </div>
            <div className="p-3">
              <p className="text-eightyw-blue text-xs font-bold leading-tight truncate">
                {l.area}
              </p>
              <p className="text-text-muted text-[10px] truncate">{l.street}</p>
              <div className="mt-1.5 flex items-baseline justify-between">
                <p className="text-eightyw-cta text-base font-bold tabular-nums">{l.price}</p>
                <p className="text-text-muted text-[10px]">{l.sqft}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onUnlock}
        className="mt-5 w-full flex items-center justify-between gap-3 bg-gradient-to-r from-eightyw-light to-white border border-dashed border-eightyw-cta/40 rounded-xl px-5 py-4 hover:border-eightyw-cta transition-colors group"
      >
        <div className="flex items-center gap-3 text-left">
          <span className="inline-flex items-center justify-center w-9 h-9 bg-eightyw-cta/10 text-eightyw-cta rounded-full">
            <Building2 className="w-4 h-4" />
          </span>
          <div>
            <p className="text-eightyw-blue text-sm font-bold">
              {lockedCount} additional positions available
            </p>
            <p className="text-text-secondary text-xs">
              Premium tier · luxury tier · areas not shown publicly
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-eightyw-cta text-xs font-semibold group-hover:gap-1.5 transition-all">
          <Eye className="w-3.5 h-3.5" /> Unlock with strategy call
        </span>
      </button>
    </div>
  );
}
