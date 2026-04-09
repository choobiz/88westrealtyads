import { MapPin, Building2, Ruler, ArrowUpDown, Zap, Car } from "lucide-react";

const SPECS = [
  { icon: MapPin, label: "Location", value: "835-845 W 15th St (Marine Drive)", sub: "North Vancouver" },
  { icon: Building2, label: "Building Size", value: "34,733 SF", sub: "5 Storeys" },
  { icon: Ruler, label: "Unit Sizes", value: "Office: 1,000-2,000 SF", sub: "Retail: 1,300-2,200 SF" },
  { icon: ArrowUpDown, label: "Ceiling Height", value: "14ft", sub: "Slab-to-Slab" },
  { icon: Zap, label: "Electrical", value: "200AMP / 3-Phase", sub: "Per Unit + Upgrades" },
  { icon: Car, label: "Parking & Zoning", value: "Min 1 Stall / Unit", sub: "Zoned Retail & Medical" },
];

export default function BuildingSpecs() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <h2 className="text-med-navy text-[26px] md:text-[38px] font-bold leading-[1.15] text-center mb-4">
          Medical Office Space for Sale in North Vancouver
        </h2>
        <p className="text-center text-text-secondary text-base md:text-[17px] mb-12 max-w-[600px] mx-auto">
          North Shore Health Pavilion — purpose-built medical strata by Cascadia Green Development. Completion 2028.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SPECS.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <div key={i} className="border border-med-border rounded-xl p-6 hover:border-med-teal/40 transition-colors">
                <div className="w-11 h-11 rounded-lg bg-med-teal/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-med-teal" />
                </div>
                <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">{spec.label}</p>
                <p className="text-med-navy text-lg font-bold">{spec.value}</p>
                <p className="text-text-secondary text-sm mt-0.5">{spec.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
