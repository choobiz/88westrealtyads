import Image from "next/image";

const TILES: {
  name: string;
  area: string;
  total: string;
  concessions: string[];
  stage: "Standing Inventory" | "Construction" | "Public Launch";
  unitsLeft: number;
  expires: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    name: "Solhaven 6035",
    area: "Brentwood (Burnaby)",
    total: "$94,500",
    concessions: [
      "$40,000 decorating credit",
      "$48,000 parking + storage included",
      "1.99% mortgage rate buy-down (12 months)",
      "Free strata fees, year one (~$6,500)",
    ],
    stage: "Standing Inventory",
    unitsLeft: 11,
    expires: "When project hits 70% sold",
    image: "/images/shared/properties/condo-modern-glass.jpg",
    imageAlt: "Modern glass-tower condo facade — illustrative example of a Standing Inventory building.",
  },
  {
    name: "The Pier West",
    area: "Lower Lonsdale (North Vancouver)",
    total: "$78,200",
    concessions: [
      "$35,000 cash credit at completion",
      "Parking included ($38K value)",
      "Assignment fee waived (typically $5,200)",
    ],
    stage: "Construction",
    unitsLeft: 6,
    expires: "June 30, 2026",
    image: "/images/shared/properties/condo-courtyard.jpg",
    imageAlt: "Modern apartment complex with landscaped courtyard — illustrative example of a Construction-stage project.",
  },
  {
    name: "Aalto on Marine",
    area: "Cambie (Vancouver)",
    total: "$112,000",
    concessions: [
      "$55,000 buyer's bonus (cash at closing)",
      "5% deposit structure",
      "Free upgraded appliance package ($18K value)",
      "2.49% rate buy-down (24 mo, ~$24K NPV)",
      "$15,000 closing-cost coverage",
    ],
    stage: "Public Launch",
    unitsLeft: 22,
    expires: "When project hits 60% sold",
    image: "/images/shared/properties/condo-minimalist.jpg",
    imageAlt: "Minimalist contemporary apartment facade — illustrative example of a Public Launch project.",
  },
  {
    name: "Park & Lansdowne",
    area: "Richmond Centre (Richmond)",
    total: "$68,400",
    concessions: [
      "GST included on units up to $1.05M (~$45K saved)",
      "Parking included ($28K)",
      "Quick-close: $5,400 cash if firm by May 15",
    ],
    stage: "Standing Inventory",
    unitsLeft: 19,
    expires: "May 15, 2026 (quick-close component)",
    image: "/images/shared/properties/townhouse-brick.jpg",
    imageAlt: "Brick low-rise residential exterior — illustrative example of an urban Standing Inventory project.",
  },
  {
    name: "Citizen Brewery District",
    area: "Edmonds (Burnaby)",
    total: "$56,000",
    concessions: [
      "$30,000 decorating allowance",
      "One-year strata-fee holiday (~$5,800)",
      "Storage locker included ($12K)",
      "$8,200 closing-cost coverage",
    ],
    stage: "Construction",
    unitsLeft: 14,
    expires: "July 1, 2026",
    image: "/images/shared/properties/detached-craftsman.jpg",
    imageAlt: "Craftsman-style two-story home with porch — illustrative example of a mixed-use project area.",
  },
  {
    name: "Marine Gateway South",
    area: "Marpole (Vancouver)",
    total: "$83,750",
    concessions: [
      "$50,000 buyer's bonus (cash at closing)",
      "5% deposit",
      "Parking + storage included ($24K)",
      "Rate buy-down to 2.99% for 12 mo (~$9,750 NPV)",
    ],
    stage: "Standing Inventory",
    unitsLeft: 8,
    expires: "Until 80% sold (currently 71%)",
    image: "/images/shared/properties/detached-suburban.jpg",
    imageAlt: "Suburban detached home with garden — illustrative example of a transit-oriented Standing Inventory project.",
  },
];

export default function TrackerPreview() {
  return (
    <section id="tracker" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-4">
            A Sample of Stacks We&apos;re Negotiating Right Now.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Every week we audit Greater Vancouver pre-sale and standing-inventory projects, itemize the
            developer&apos;s published concessions, and total them in dollars. Below: six current ones.
            Your specialist shortlists the right project for your buy-box on the intro call —
            then negotiates the stack on your behalf.
          </p>
        </div>

        <p className="text-center text-xs text-text-muted mb-8">
          Illustrative sample. We&apos;re actively negotiating across 40+ Greater Vancouver projects;
          clients get a buy-box-matched shortlist from their specialist after the intro call.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {TILES.map((t, i) => (
            <article
              key={i}
              className="bg-white border border-eightyw-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-brand-red/40 transition-all flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-eightyw-light">
                <Image
                  src={t.image}
                  alt={t.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute top-3 right-3 px-2 py-1 bg-white/95 backdrop-blur-sm text-eightyw-blue text-[10px] font-semibold rounded-full shadow-sm whitespace-nowrap">
                  {t.unitsLeft} units left
                </span>
                <span className="absolute bottom-3 left-3 px-2 py-1 bg-brand-red text-white text-[10px] font-semibold rounded-full uppercase tracking-wider">
                  {t.stage}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="mb-3">
                  <p className="text-eightyw-blue font-bold text-base">{t.name}</p>
                  <p className="text-text-secondary text-sm">{t.area}</p>
                </div>

                <div className="bg-eightyw-light border border-eightyw-border rounded-lg px-4 py-3 mb-4">
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Total stacked</p>
                  <p className="text-brand-red text-2xl md:text-3xl font-bold leading-tight">{t.total}</p>
                </div>

              <ul className="space-y-1.5 text-sm text-text-secondary mb-4 flex-1">
                {t.concessions.map((c, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-brand-red shrink-0">+</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

                <p className="text-xs text-text-muted border-t border-eightyw-border pt-3">
                  <span className="font-semibold text-eightyw-blue">Expires:</span> {t.expires}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <p className="text-text-secondary text-sm md:text-base mb-5 max-w-2xl mx-auto">
            We track absorption status on 40+ Greater Vancouver projects in real time — and know
            which ones are open to a backchannel offer beyond what the developer publishes.
          </p>
          <a
            href="#register"
            className="inline-flex items-center justify-center h-[52px] px-8 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px] shadow-[0_10px_30px_rgba(197,34,4,0.3)]"
          >
            Tell us your buy-box →
          </a>
        </div>
      </div>
    </section>
  );
}
