import { Activity, Zap, ArrowUpDown, Eye, Lock, Combine } from "lucide-react";

const FEATURES = [
  { icon: Activity, title: "Medical-Ready Infrastructure", desc: "High-capacity water, medical-grade mechanical systems, and dedicated clinical infrastructure from inception." },
  { icon: Zap, title: "200AMP / 3-Phase Power", desc: "Heavy-duty electrical per unit with upgrade options. Run imaging equipment, dental chairs, or surgical tools without compromise." },
  { icon: ArrowUpDown, title: "14ft Slab-to-Slab Ceilings", desc: "Generous ceiling heights allow for suspended medical equipment, proper HVAC routing, and a bright, open patient experience." },
  { icon: Eye, title: "Dual Frontage & Visibility", desc: "Strong street presence on both Marine Drive and W 15th, maximizing patient access and signage exposure." },
  { icon: Lock, title: "Separate Public & Service Access", desc: "Dedicated patient entry and back-of-house service access for clinical efficiency and privacy." },
  { icon: Combine, title: "Flexible, Combinable Units", desc: "Units from 1,000-2,000 SF can be combined for larger clinics. Design your exact practice layout during pre-construction." },
];

export default function MedicalFeatures() {
  return (
    <section id="features" className="bg-med-light py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <h2 className="text-med-navy text-[26px] md:text-[38px] font-bold leading-[1.15] text-center mb-3">
          Designed as a Medical Asset from Day One
        </h2>
        <p className="text-center text-text-secondary text-base md:text-[17px] mb-12 max-w-[640px] mx-auto">
          Not a retrofit. Not a conversion. Purpose-built for clinical excellence.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-white border border-med-border rounded-xl p-6 md:p-7">
                <div className="w-12 h-12 rounded-xl bg-med-teal/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-med-teal" />
                </div>
                <h3 className="text-med-navy text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-text-secondary text-[15px] leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
