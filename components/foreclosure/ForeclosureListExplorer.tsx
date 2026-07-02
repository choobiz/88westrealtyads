"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { MapPin, List as ListIcon, ArrowUpDown, X, ArrowRight } from "lucide-react";
import { useForeclosureLeadModal } from "./ForeclosureLeadProvider";
import explorerData from "@/data/foreclosure-explorer-deals.json";

type Deal = {
  type: string;
  area: string;
  region: string;
  street: string;
  price: string;
  priceNum: number | null;
  sqft: string;
  image: string;
  imageAlt: string;
  courtOrdered: boolean;
  mls: string | null;
  lat?: number;
  lng?: number;
};

const DEALS: Deal[] = explorerData.deals as Deal[];
const REGIONS: string[] = explorerData.regions as string[];
const TYPES: string[] = explorerData.types as string[];
const AUTO_OPEN_MS = 35_000;
const AUTO_OPEN_CAP = 3;

const money = (n: number | null) => (n == null ? "n/d" : n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : `$${Math.round(n / 1e3)}K`);

export default function ForeclosureListExplorer() {
  const { openLeadForm } = useForeclosureLeadModal();

  const [view, setView] = useState<"list" | "map">("list");
  const [regions, setRegions] = useState<Set<string>>(new Set());
  const [types, setTypes] = useState<Set<string>>(new Set());
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<"price-asc" | "price-desc" | "region">("price-asc");

  const openDeal = (d: Deal, source: string) =>
    openLeadForm({
      headline: "GET DETAILS ON THIS LISTING",
      subtitle: `${d.type} · ${d.area} · ${d.price}`,
      selectedProperty: `${d.type} · ${d.area} · ${d.price}`,
      submitLabel: "Send Me the Details",
      formLocation: "property_modal",
      source,
    });

  // ── 35s dwell auto-open (capped, stops after a submit) ──────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    let opens = 0;
    const id = setInterval(() => {
      if (localStorage.getItem("_lp_lead_submitted") === "1") { clearInterval(id); return; }
      if (opens >= AUTO_OPEN_CAP) { clearInterval(id); return; }
      opens += 1;
      openLeadForm({
        headline: "WANT THE FULL COURT-ORDERED LIST?",
        subtitle: "Your specialist sends addresses, court dates & Schedule A drafts.",
        submitLabel: "Send Me the Deals",
        formLocation: "list_explorer",
        source: `dwell_${opens * 35}s`,
      });
    }, AUTO_OPEN_MS);
    return () => clearInterval(id);
  }, [openLeadForm]);

  const filtered = useMemo(() => {
    let list = DEALS.filter((d) => {
      if (regions.size && !regions.has(d.region)) return false;
      if (types.size && !types.has(d.type)) return false;
      if (maxPrice != null && d.priceNum != null && d.priceNum > maxPrice) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return (a.priceNum ?? 9e15) - (b.priceNum ?? 9e15);
      if (sort === "price-desc") return (b.priceNum ?? -1) - (a.priceNum ?? -1);
      return a.region.localeCompare(b.region) || (a.priceNum ?? 0) - (b.priceNum ?? 0);
    });
    return list;
  }, [regions, types, maxPrice, sort]);

  const toggle = (set: Set<string>, v: string, upd: (s: Set<string>) => void) => {
    const n = new Set(set);
    n.has(v) ? n.delete(v) : n.add(v);
    upd(n);
  };

  const priceBands = [500_000, 750_000, 1_000_000, 1_500_000, 2_000_000];

  return (
    <section id="deals" className="bg-white py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-3">
            Search Every Court-Ordered Listing We Track.
          </h2>
          <p className="text-text-secondary text-base max-w-3xl mx-auto">
            {DEALS.length} live Greater Vancouver court-ordered listings — filter by price, region and type,
            or switch to the map. Click any listing and your specialist sends the full address, court date,
            and Schedule A draft.
          </p>
        </div>

        {/* Controls */}
        <div className="rounded-2xl border border-eightyw-border bg-eightyw-light/40 p-4 mb-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mr-1">Region</span>
            {REGIONS.map((r) => (
              <Chip key={r} on={regions.has(r)} onClick={() => toggle(regions, r, setRegions)}>{r}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mr-1">Type</span>
            {TYPES.map((t) => (
              <Chip key={t} on={types.has(t)} onClick={() => toggle(types, t, setTypes)}>{t}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mr-1">Max price</span>
            {priceBands.map((p) => (
              <Chip key={p} on={maxPrice === p} onClick={() => setMaxPrice(maxPrice === p ? null : p)}>≤ {money(p)}</Chip>
            ))}

            <div className="ml-auto flex items-center gap-2">
              <label className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
                <ArrowUpDown className="w-4 h-4 text-text-muted" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="bg-white border border-eightyw-border rounded-lg px-2 py-1.5 text-sm"
                >
                  <option value="price-asc">Price ↑</option>
                  <option value="price-desc">Price ↓</option>
                  <option value="region">Region</option>
                </select>
              </label>
              <div className="inline-flex rounded-lg border border-eightyw-border overflow-hidden">
                <button type="button" onClick={() => setView("list")} className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold ${view === "list" ? "bg-eightyw-blue text-white" : "bg-white text-text-secondary"}`}>
                  <ListIcon className="w-4 h-4" /> List
                </button>
                <button type="button" onClick={() => setView("map")} className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold ${view === "map" ? "bg-eightyw-blue text-white" : "bg-white text-text-secondary"}`}>
                  <MapPin className="w-4 h-4" /> Map
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-text-muted">{filtered.length} of {DEALS.length} listings</span>
            {(regions.size > 0 || types.size > 0 || maxPrice != null) && (
              <button type="button" onClick={() => { setRegions(new Set()); setTypes(new Set()); setMaxPrice(null); }} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-red">
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>
        </div>

        {view === "list" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((d, i) => <DealRow key={i} d={d} onClick={() => openDeal(d, "list_explorer_card")} />)}
            {filtered.length === 0 && <p className="text-text-muted text-sm col-span-full text-center py-10">No listings match these filters.</p>}
          </div>
        ) : (
          <MapView deals={filtered} onPick={(d) => openDeal(d, "list_explorer_map")} />
        )}

        <p className="text-center text-text-muted text-xs mt-8">
          Click any listing to start the deal hunt — your specialist follows up within 24 hours.
        </p>
      </div>
    </section>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-[13px] font-semibold border transition-colors ${on ? "bg-brand-red text-white border-brand-red" : "bg-white text-text-secondary border-eightyw-border hover:border-brand-red/50"}`}
    >
      {children}
    </button>
  );
}

function DealRow({ d, onClick }: { d: Deal; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="group flex text-left bg-white border border-eightyw-border rounded-xl overflow-hidden hover:shadow-md hover:border-brand-red/50 transition-all focus:outline-none focus:ring-2 focus:ring-brand-red/40">
      <div className="relative w-28 shrink-0 bg-eightyw-light">
        {d.image ? (
          <Image src={d.image} alt={d.imageAlt} fill sizes="112px" className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-eightyw-blue to-[#0a1f3a]">
            <span className="text-white/60 text-[9px] font-semibold uppercase tracking-wider text-center px-2">Photo on call</span>
          </div>
        )}
      </div>
      <div className="flex-1 p-3 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 bg-eightyw-blue text-white text-[9px] font-semibold rounded-full uppercase tracking-wide">{d.type}</span>
          <span className="text-text-muted text-[11px] truncate">{d.region}</span>
        </div>
        <p className="text-eightyw-blue font-bold text-sm leading-tight truncate">{d.area}</p>
        <p className="text-text-secondary text-xs mb-1 truncate">{d.street}</p>
        <div className="flex items-baseline justify-between">
          <span className="text-brand-red font-bold text-lg">{d.price}</span>
          <span className="text-text-muted text-[11px]">{d.sqft}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-brand-red text-[11px] font-semibold mt-1">Get details <ArrowRight className="w-3 h-3" /></span>
      </div>
    </button>
  );
}

// ── Map (Leaflet loaded from CDN, client-only) ────────────────────────
function MapView({ deals, onPick }: { deals: Deal[]; onPick: (d: Deal) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const pinned = deals.filter((d) => d.lat != null && d.lng != null);

  useEffect(() => {
    let cancelled = false;
    // expose the picker so Leaflet popups (raw HTML) can call back into React
    (window as unknown as { __fclPick?: (i: number) => void }).__fclPick = (i: number) => onPick(pinned[i]);

    async function ensureLeaflet(): Promise<any> {
      const w = window as any;
      if (w.L) return w.L;
      if (!document.querySelector('link[data-leaflet]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.setAttribute("data-leaflet", "1");
        document.head.appendChild(link);
      }
      await new Promise<void>((res, rej) => {
        const s = document.createElement("script");
        s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        s.onload = () => res();
        s.onerror = () => rej(new Error("leaflet load failed"));
        document.body.appendChild(s);
      });
      return w.L;
    }

    ensureLeaflet().then((L) => {
      if (cancelled || !ref.current) return;
      const map = L.map(ref.current, { scrollWheelZoom: false }).setView([49.24, -123.0], 10);
      mapRef.current = map;
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        maxZoom: 19, subdomains: "abcd",
        attribution: '&copy; OpenStreetMap &copy; CARTO',
      }).addTo(map);
      const pts: [number, number][] = [];
      pinned.forEach((d, i) => {
        const m = L.circleMarker([d.lat, d.lng], { radius: 8, color: "#0a1f3a", weight: 1.5, fillColor: "#c52204", fillOpacity: 0.9 }).addTo(map);
        m.bindPopup(`<div style="min-width:150px"><b>${d.area}</b><br>${d.street}<br><b style="color:#c52204">${d.price}</b> · ${d.type}<br><a href="#" onclick="window.__fclPick(${i});return false" style="color:#c52204;font-weight:600">Get details →</a></div>`);
        pts.push([d.lat as number, d.lng as number]);
      });
      if (pts.length) map.fitBounds(pts, { padding: [30, 30], maxZoom: 12 });
      setTimeout(() => map.invalidateSize(), 80);
    }).catch(() => {});

    return () => {
      cancelled = true;
      const m = mapRef.current as { remove?: () => void } | null;
      if (m && m.remove) m.remove();
      mapRef.current = null;
    };
  }, [deals, onPick, pinned]);

  return (
    <div>
      <div ref={ref} className="w-full h-[520px] rounded-2xl overflow-hidden border border-eightyw-border z-0" />
      <p className="text-center text-text-muted text-[11px] mt-2">
        {pinned.length} of {deals.length} shown on map (others geolocating — all visible in list view).
      </p>
    </div>
  );
}
