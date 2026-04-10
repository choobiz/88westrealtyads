import type { Metadata } from "next";
import MedicalNavbar from "@/components/medical/MedicalNavbar";
import MedicalFooter from "@/components/medical/MedicalFooter";
import CookieConsent from "@/components/medical/CookieConsent";
import ScrollReveal from "@/components/deals/ScrollReveal";
import SavingsCalculator from "@/components/deals/SavingsCalculator";
import DealCard from "@/components/deals/DealCard";
import type { Deal } from "@/components/deals/DealCard";
import DealsLeadForm from "@/components/deals/DealsLeadForm";
import DealsFAQ from "@/components/deals/DealsFAQ";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Vancouver Condo Deals 2026 — The Window Is Open | 88 West Realty",
  description: "5,458 unsold condos. $100K+ in stacked incentives. Prices at 2020 levels. The biggest buyer opportunity in 24 years. See this week's deals.",
  alternates: { canonical: "https://go.88westrealty.com/vancouver-condo-deals-v2" },
  openGraph: {
    title: "The Window Is Open — $100K+ in Vancouver Condo Incentives",
    description: "5,458 unsold condos. Prices at 2020 levels. See the deals before they're gone.",
    url: "https://go.88westrealty.com/vancouver-condo-deals-v2",
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
  { q: "What incentives are developers offering right now?", a: "Current incentives include 5% deposits (vs traditional 15-20%), $25-50K cash credits, free parking ($40-80K value), zero assignment fees, and vendor take-back mortgages. Combined, these can total $100K+ on a $700K unit." },
  { q: "Is it really a buyer's market?", a: "Yes. The sales-to-active listings ratio is 10.3% for condos — firmly in buyer's market territory. There are 5,458 unsold completed condos, the highest in 24 years." },
  { q: "Will prices go up in 2027?", a: "BCREA forecasts 3% price growth in 2026 with potential for 27% appreciation by 2032. Only 64 presale units launched in Feb 2026 — the future supply shortage is building now." },
  { q: "How much can a first-time buyer save?", a: "A first-time buyer purchasing a $700K new condo can save ~$43K in government programs (GST rebate + PTT exemption), plus $40-50K in developer incentives. Total: $83K+." },
  { q: "What is a presale assignment?", a: "An assignment is when the original presale buyer sells their contract before completion. In 2026, sellers are accepting $150K-$500K below contract price — creating opportunities for new buyers." },
];

export default function DealsV2() {
  return (
    <>
      <MedicalNavbar />

      {/* Scroll-driven storytelling hero */}
      <ScrollReveal />

      {/* Transition: CTA to calculator */}
      <section className="bg-med-navy py-12 text-center px-6">
        <a
          href="#calculator"
          className="inline-flex items-center justify-center h-[56px] px-10 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-1 gap-2 text-[16px] shadow-lg shadow-brand-red/30"
        >
          Calculate My Savings
          <ArrowRight className="w-5 h-5" />
        </a>
      </section>

      {/* Calculator */}
      <div id="calculator">
        <SavingsCalculator
          firstTimeBuyer
          ctaText="See Deals That Match →"
          showRentComparison
        />
      </div>

      {/* Featured Deals */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-med-navy text-[24px] md:text-[32px] font-bold text-center mb-2">
            This Week&apos;s Best Deals
          </h2>
          <p className="text-text-secondary text-sm text-center mb-10">
            Tap any deal to register for pricing and floor plans.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            {DEALS.map((deal, i) => (
              <DealCard key={i} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <DealsLeadForm
        source="vancouver-condo-deals-v2"
        showBuyerType
        heading="Get Your Personalized Deal List"
        subheading="Register in 30 seconds. We'll send you curated deals weekly."
      />

      <DealsFAQ items={FAQ_ITEMS} />

      {/* Final CTA */}
      <section className="bg-med-navy py-20 text-center px-6">
        <p className="text-med-teal text-xs font-semibold tracking-[3px] uppercase mb-4">DON&apos;T WAIT</p>
        <h2 className="text-white text-[28px] md:text-[44px] font-bold leading-tight mb-4 max-w-[700px] mx-auto">
          5,458 today. 0 tomorrow.
        </h2>
        <p className="text-white/50 text-base mb-8 max-w-[500px] mx-auto">
          When the inventory is absorbed, the window closes. Prices recover. Incentives disappear.
        </p>
        <a href="#register" className="inline-flex items-center justify-center h-[52px] px-8 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px]">
          See This Week&apos;s Deals
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>

      <MedicalFooter />
      <CookieConsent />
    </>
  );
}
