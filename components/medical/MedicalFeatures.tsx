import { Monitor, Building2, FlaskConical, Radio, Server, Users } from "lucide-react";

const FEATURES = [
  { icon: Monitor, title: "Medical-Grade HVAC", desc: "Independent climate control per unit. Hospital-grade air filtration meets infection control standards." },
  { icon: Building2, title: "Reinforced Floors", desc: "Engineered for heavy diagnostic equipment — MRI, X-ray, CT, and dental imaging systems." },
  { icon: FlaskConical, title: "Plumbing Pre-Rough", desc: "Pre-roughed plumbing for exam rooms, sterilization areas, and laboratory spaces." },
  { icon: Radio, title: "Sound Insulation", desc: "STC 55+ rated walls between units ensure patient privacy and acoustic comfort." },
  { icon: Server, title: "Data Infrastructure", desc: "Fiber optic backbone, backup power systems, and enterprise-grade network infrastructure." },
  { icon: Users, title: "Accessibility", desc: "Barrier-free design, wide corridors, and medical-grade elevator for patient accessibility." },
];

export default function MedicalFeatures() {
  return (
    <section id="features" className="bg-med-light py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-med-navy mb-4">Purpose-Built for Clinical Excellence</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Every detail designed for modern medical practice.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-white p-8 rounded-xl border border-med-border shadow-sm">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-med-teal" />
                </div>
                <h3 className="font-semibold text-med-navy mb-2">{f.title}</h3>
                <p className="text-sm text-text-secondary">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
