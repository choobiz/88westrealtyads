import type { Metadata } from "next";
import MedicalNavbar from "@/components/medical/MedicalNavbar";
import MedicalFooter from "@/components/medical/MedicalFooter";
import MedicalStickyMobileCTA from "@/components/medical/MedicalStickyMobileCTA";
import CookieConsent from "@/components/medical/CookieConsent";
import DealsHero from "@/components/deals/DealsHero";
import StatsBar from "@/components/deals/StatsBar";
import SavingsCalculator from "@/components/deals/SavingsCalculator";
import DealCard from "@/components/deals/DealCard";
import type { Deal } from "@/components/deals/DealCard";
import HowItWorks from "@/components/deals/HowItWorks";
import DealsLeadForm from "@/components/deals/DealsLeadForm";
import DealsFAQ from "@/components/deals/DealsFAQ";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Vancouver Condo Deals 2026 — $100K+ in Developer Incentives | 88 West Realty",
  description: "5,458 unsold condos in Metro Vancouver. Developers offering $100K+ in stacked incentives: 5% deposits, cash credits, free parking. See this week's best deals.",
  alternates: { canonical: "https://go.88westrealty.com/vancouver-condo-deals" },
  openGraph: {
    title: "Vancouver Condo Deals — $100K+ in Developer Incentives",
    description: "5,458 unsold condos. Developers offering $100K+ in stacked incentives. See this week's best deals.",
    url: "https://go.88westrealty.com/vancouver-condo-deals",
    type: "website",
  },
};

const DEALS: Deal[] = [
  {
    tag: "HOT DEAL", tagColor: "red",
    project: "The Burrard Collection", location: "Burnaby, Metrotown", unitType: "1 Bed + Den · 612 SF",
    originalPrice: "$689,000", currentPrice: "$549,000", saving: "Save $140K",
    incentives: ["5% Deposit", "$40K Credit", "Free Parking"], completion: "Move-in Ready",
    image: "/images/deals/deal-burrard.webp",
  },
  {
    tag: "FIRST-TIME BUYER", tagColor: "teal",
    project: "Aspire at Lougheed", location: "Coquitlam, Burquitlam", unitType: "2 Bed · 785 SF",
    originalPrice: "$749,000", currentPrice: "$629,000", saving: "Save $120K",
    incentives: ["GST Rebate", "$35K Credit", "Storage Incl."], completion: "Completion 2027",
    image: "/images/deals/deal-aspire.webp",
  },
  {
    tag: "INVESTOR SPECIAL", tagColor: "navy",
    project: "Park & Maven", location: "Surrey, City Centre", unitType: "Studio · 485 SF",
    originalPrice: "$459,000", currentPrice: "$379,000", saving: "Save $80K",
    incentives: ["5% Deposit", "Rent Guarantee", "Zero Assignment"], completion: "Move-in Ready",
    image: "/images/deals/deal-park.webp",
  },
  {
    tag: "NEW LISTING", tagColor: "green",
    project: "Marine & 15th", location: "North Vancouver", unitType: "2 Bed + Den · 920 SF",
    originalPrice: "$899,000", currentPrice: "$769,000", saving: "Save $130K",
    incentives: ["$50K Credit", "Free Parking", "Customize Layout"], completion: "Completion 2028",
    image: "/images/deals/deal-marine.webp",
  },
];

const FAQ_ITEMS = [
  { q: "What incentives are developers offering right now?", a: "Current incentives include 5% deposits (vs traditional 15-20%), $25-50K cash credits, free parking ($40-80K value), zero assignment fees, and even vendor take-back mortgages. Combined, these can total $100K+ in effective savings on a $700K unit." },
  { q: "Is it really a buyer's market?", a: "Yes. The sales-to-active listings ratio is 10.3% for condos — firmly in buyer's market territory. There are 5,458 unsold completed condos, the highest in 24 years. Buyers have negotiating leverage not seen since before the pandemic." },
  { q: "How much can a first-time buyer save?", a: "A first-time buyer purchasing a $700K new condo can save approximately $43K in government programs (GST rebate ~$35K + PTT exemption ~$8K), plus $40-50K in developer incentives. Total potential savings: $83K+." },
  { q: "What is a presale assignment?", a: "An assignment is when the original presale buyer sells their purchase contract to a new buyer before completion. In 2026, assignment sellers are accepting $150K-$500K below their contract price, creating opportunities for new buyers." },
  { q: "Will prices go up in 2027?", a: "BCREA forecasts 3% price growth in 2026 with potential for 27% appreciation by 2032 as the current supply glut gets absorbed and the presale pipeline dries up. Only 64 new presale units launched in Feb 2026." },
];

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function VancouverCondoDeals() {
  return (
    <>
      <JsonLd />
      <MedicalNavbar />

      <DealsHero
        badge="BUYER'S MARKET — LIMITED WINDOW"
        eyebrow="5,458 UNSOLD CONDOS IN METRO VANCOUVER"
        headline="Developers Are Offering $100,000+ in Incentives. The Window Is Open."
        subheadline="Brand-new condos at 2020 prices. 5% deposits, cash credits, free parking — stacked incentives most buyers don't know exist. We show you where the deals are."
        ctaText="See This Week's Best Deals"
        bgImage="/images/deals/hero-deals.webp"
      />

      <StatsBar
        items={[
          { value: "5,458", label: "Unsold Units" },
          { value: "$100K+", label: "In Incentives" },
          { value: "10.3%", label: "Sales Ratio" },
          { value: "24yr", label: "Inventory High" },
        ]}
      />

      <div id="calculator">
        <SavingsCalculator
          ctaText="See Deals That Match My Budget →"
        />
      </div>

      {/* Featured Deals */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-med-navy text-[22px] md:text-[28px] font-bold text-center mb-2">
            This Week&apos;s Best Deals
          </h2>
          <p className="text-text-secondary text-sm text-center mb-10">
            Tap any deal to register for details. Updated every Monday.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            {DEALS.map((deal, i) => (
              <DealCard key={i} deal={deal} />
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#register" className="inline-flex items-center justify-center h-[44px] px-6 border-2 border-med-navy text-med-navy font-semibold rounded-full hover:bg-med-navy hover:text-white transition-all gap-2 text-[14px]">
              See All Available Deals
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <HowItWorks
        steps={[
          { title: "Tell Us What You Want", desc: "Budget, location, buyer type. Takes 30 seconds." },
          { title: "Get Curated Deals", desc: "We match you with the best developer incentives — updated weekly." },
          { title: "Save $100K+", desc: "We negotiate the stacked incentives. You get the deal." },
        ]}
      />

      <DealsLeadForm
        source="vancouver-condo-deals"
        showBuyerType
        heading="Get Your Personalized Deal List"
        subheading="Register in 30 seconds. We'll match you with the best deals."
      />

      <DealsFAQ items={FAQ_ITEMS} />

      {/* Final CTA */}
      <section className="bg-med-teal py-16 md:py-24">
        <div className="max-w-[720px] mx-auto px-5 text-center">
          <h2 className="text-white text-[24px] md:text-[36px] font-bold leading-tight mb-4">
            The Window Won&apos;t Stay Open.
          </h2>
          <p className="text-white/75 text-[15px] leading-relaxed mb-8 max-w-[560px] mx-auto">
            5,458 unsold condos. $100K+ in incentives. Once they&apos;re gone, this opportunity disappears. Don&apos;t wait for prices to recover.
          </p>
          <a href="#register" className="inline-flex items-center justify-center h-[52px] px-8 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px]">
            See This Week&apos;s Deals
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <MedicalFooter />
      <MedicalStickyMobileCTA />
      <CookieConsent />
    </>
  );
}
