import Image from "next/image";

// Each card links to the most relevant deeper section so the 14% dead-click
// rate (Apr 26 audit) becomes useful navigation rather than dead-end taps.
const SPECS: { label: string; value: string; href: string }[] = [
  { label: "Total Area", value: "34,733 SF", href: "#register" },
  { label: "Floors", value: "5 Storeys", href: "#register" },
  { label: "Unit Sizes", value: "From 1,000 SF", href: "#register" },
  { label: "Completion", value: "2028", href: "#faq" },
  { label: "Parking", value: "Underground Secured", href: "#features" },
  { label: "Location", value: "Marine Drive, North Van", href: "#location" },
  { label: "Elevator", value: "Medical-Grade", href: "#features" },
  { label: "HVAC", value: "Independent per Unit", href: "#features" },
];

export default function BuildingSpecs() {
  return (
    <section id="specs" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-med-navy mb-4">Building Specifications</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-6">
            {SPECS.map((spec, i) => (
              <a
                key={i}
                href={spec.href}
                className="block bg-med-light p-5 rounded-xl border border-med-border hover:border-med-teal hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <p className="text-text-muted text-xs uppercase tracking-wider mb-1">{spec.label}</p>
                <p className="text-med-navy font-bold text-lg group-hover:text-med-teal transition-colors">{spec.value}</p>
              </a>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/medical/hero-interior.jpg"
              alt="Purpose-built medical office interior at North Shore Health Pavilion"
              width={800}
              height={600}
              className="w-full h-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
