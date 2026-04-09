import Image from "next/image";
import { Hospital, Train, MapPin, Building2 } from "lucide-react";

const PROXIMITY = [
  { icon: Hospital, title: "Lions Gate Hospital", detail: "Steps away — $325M acute care expansion complete, Phase 2 starting 2026" },
  { icon: Train, title: "Transit Access", detail: "Close to Marine Drive bus routes, 15 min to SeaBus, direct access from Hwy 1" },
  { icon: MapPin, title: "Marine Drive Corridor", detail: "North Vancouver's primary commercial corridor, rezoned for higher density" },
  { icon: Building2, title: "Medical Ecosystem", detail: "Adjacent to existing medical offices, pharmacies, and allied health providers" },
];

export default function LocationSection() {
  return (
    <section id="location" className="bg-med-light py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <h2 className="text-med-navy text-[26px] md:text-[38px] font-bold leading-[1.15] text-center mb-3">
          Prime Location on Marine Drive, North Vancouver
        </h2>
        <p className="text-center text-text-secondary text-base md:text-[17px] mb-12 max-w-[640px] mx-auto">
          835-845 W 15th Street — at the heart of the North Shore&apos;s medical corridor, steps from Lions Gate Hospital.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            {PROXIMITY.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-med-border">
                  <div className="w-11 h-11 rounded-lg bg-med-teal/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-med-teal" />
                  </div>
                  <div>
                    <h3 className="text-med-navy text-[16px] font-semibold">{p.title}</h3>
                    <p className="text-text-secondary text-sm mt-0.5">{p.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <Image
              src="/images/medical/marine-drive-view.jpg"
              alt="Marine Drive corridor near North Shore Health Pavilion, North Vancouver"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
