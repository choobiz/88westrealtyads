import Image from "next/image";

const SPECS = [
  { label: "Total Area", value: "34,733 SF" },
  { label: "Floors", value: "5 Storeys" },
  { label: "Unit Sizes", value: "From 1,000 SF" },
  { label: "Completion", value: "2028" },
  { label: "Parking", value: "Underground Secured" },
  { label: "Location", value: "Marine Drive, North Van" },
  { label: "Elevator", value: "Medical-Grade" },
  { label: "HVAC", value: "Independent per Unit" },
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
              <div key={i} className="bg-med-light p-5 rounded-xl border border-med-border">
                <p className="text-text-muted text-xs uppercase tracking-wider mb-1">{spec.label}</p>
                <p className="text-med-navy font-bold text-lg">{spec.value}</p>
              </div>
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
