import { Stethoscope, SmilePlus, Bone, Eye, Brain, Microscope, Scan, Sparkles, Heart, Briefcase } from "lucide-react";

const PRACTICES = [
  { icon: Stethoscope, name: "Family Physicians" },
  { icon: SmilePlus, name: "Dental Offices" },
  { icon: Bone, name: "Physiotherapy & Chiropractic" },
  { icon: Eye, name: "Optometry Clinics" },
  { icon: Brain, name: "Psychology & Mental Health" },
  { icon: Microscope, name: "Medical Labs" },
  { icon: Scan, name: "Imaging Centres" },
  { icon: Sparkles, name: "Medical Aesthetics" },
  { icon: Heart, name: "Specialist Practices" },
  { icon: Briefcase, name: "Healthcare Investors" },
];

export default function WhoIsThisFor() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <h2 className="text-med-navy text-[26px] md:text-[38px] font-bold leading-[1.15] text-center mb-3">
          Who Is This For?
        </h2>
        <p className="text-center text-text-secondary text-base md:text-[17px] mb-12 max-w-[640px] mx-auto">
          Whether you&apos;re opening a new clinic, expanding your practice, or investing in healthcare real estate — this building was designed for you.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {PRACTICES.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center p-5 rounded-xl border border-med-border hover:border-med-teal/40 transition-colors">
                <div className="w-12 h-12 rounded-full bg-med-teal/10 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-med-teal" />
                </div>
                <p className="text-med-navy text-sm font-semibold">{p.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
