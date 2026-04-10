import type { Metadata } from "next";
import MedicalNavbar from "@/components/medical/MedicalNavbar";
import MedicalFooter from "@/components/medical/MedicalFooter";
import MedicalStickyMobileCTA from "@/components/medical/MedicalStickyMobileCTA";
import CookieConsent from "@/components/medical/CookieConsent";
import DealsHero from "@/components/deals/DealsHero";
import StatsBar from "@/components/deals/StatsBar";
import SavingsCalculator from "@/components/deals/SavingsCalculator";
import EligibilityChecker from "@/components/deals/EligibilityChecker";
import DealCard from "@/components/deals/DealCard";
import type { Deal } from "@/components/deals/DealCard";
import HowItWorks from "@/components/deals/HowItWorks";
import DealsLeadForm from "@/components/deals/DealsLeadForm";
import DealsFAQ from "@/components/deals/DealsFAQ";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "First-Time Home Buyer Vancouver — $43,000 in Government Savings | 88 West Realty",
  description: "First-time buyer? Get $43K in government savings (GST rebate + PTT exemption) plus $40K+ in developer credits. Brand-new condos. Owning is cheaper than renting.",
  alternates: { canonical: "https://go.88westrealty.com/first-time-buyer-vancouver" },
  openGraph: {
    title: "First-Time Buyer — $43,000 Head Start on Your First Home",
    description: "GST rebate + PTT exemption + developer credits = $83K+ in savings. Brand-new condos under $700K.",
    url: "https://go.88westrealty.com/first-time-buyer-vancouver",
    type: "website",
  },
};

const DEALS: Deal[] = [
  {
    tag: "FIRST-TIME BUYER", tagColor: "teal",
    project: "Park & Maven", location: "Surrey, City Centre", unitType: "Studio · 485 SF",
    originalPrice: "$459,000", currentPrice: "$379,000", saving: "Save $80K",
    incentives: ["GST Rebate", "5% Deposit", "Rent Guarantee"], completion: "Move-in Ready",
  },
  {
    tag: "FIRST-TIME BUYER", tagColor: "teal",
    project: "Aspire at Lougheed", location: "Burquitlam", unitType: "1 Bed · 545 SF",
    originalPrice: "$549,000", currentPrice: "$469,000", saving: "Save $80K",
    incentives: ["GST Rebate", "$30K Credit", "Storage Incl."], completion: "Completion 2027",
  },
  {
    tag: "BEST VALUE", tagColor: "green",
    project: "The Langley", location: "Willoughby", unitType: "1 Bed · 560 SF",
    originalPrice: "$499,000", currentPrice: "$429,000", saving: "Save $70K",
    incentives: ["GST Rebate", "Free Parking", "5% Deposit"], completion: "Completion 2027",
  },
];

const FAQ_ITEMS = [
  { q: "How does the GST rebate work?", a: "The federal government eliminates GST (5%) for first-time buyers on new homes up to $1M. On a $700K new condo, that's approximately $35,000 in savings. You claim it through the CRA after purchase." },
  { q: "What is the PTT exemption?", a: "BC's Property Transfer Tax exemption for first-time buyers eliminates PTT on the first $500K of purchase price for homes up to $835K in fair market value. This saves approximately $8,000 on a $700K purchase." },
  { q: "Can I combine government and developer savings?", a: "Yes! The GST rebate, PTT exemption, and developer incentives all stack. On a $700K unit: $35K GST + $8K PTT + $40K developer credit + $50K parking = $133K+ in combined savings." },
  { q: "How much down payment do I need?", a: "For homes under $500K: minimum 5%. For $500K-$1M: 5% on the first $500K + 10% on the remainder. Many developers are offering 5% total deposit structures, making it easier than ever to get started." },
  { q: "Is owning actually cheaper than renting?", a: "In many cases, yes. Average Vancouver rent is $2,630/month. After incentives, a $650K condo with 5% down at current rates costs approximately $2,180/month — saving you $450/month while building equity." },
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

export default function FirstTimeBuyerPage() {
  return (
    <>
      <JsonLd />
      <MedicalNavbar />

      <DealsHero
        badge="FIRST-TIME BUYER PROGRAM"
        badgeColor="teal"
        eyebrow="$43,000 IN GOVERNMENT SAVINGS + DEVELOPER DEALS"
        headline="Your First Home. Brand New. $43,000 Head Start."
        subheadline="The government gives you $43K. Developers add $40K+ in credits. For the first time in years, owning is cheaper than renting."
        ctaText="Calculate My Savings"
      />

      <StatsBar
        items={[
          { value: "$35,000", label: "GST Rebate" },
          { value: "$8,000", label: "PTT Exemption" },
          { value: "$40,000+", label: "Developer Credits" },
        ]}
      />

      <div id="calculator">
        <SavingsCalculator
          firstTimeBuyer
          min={400000}
          max={1000000}
          defaultPrice={650000}
          ctaText="See Homes I Can Afford →"
          showRentComparison
        />
      </div>

      <EligibilityChecker />

      {/* First-Time Buyer Deals */}
      <section className="bg-med-light py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-med-navy text-[22px] md:text-[28px] font-bold text-center mb-2">
            First-Time Buyer Deals
          </h2>
          <p className="text-text-secondary text-sm text-center mb-10">
            New condos under $700K with full incentives. Tap for details.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
            {DEALS.map((deal, i) => (
              <DealCard key={i} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks
        steps={[
          { title: "Check Your Eligibility", desc: "Answer 4 quick questions. Most BC buyers qualify." },
          { title: "See Your Savings", desc: "We calculate your GST rebate + PTT exemption + developer deals." },
          { title: "Get Matched", desc: "We find the best first-time buyer deals in your budget and area." },
        ]}
      />

      <DealsLeadForm
        source="first-time-buyer-vancouver"
        showBuyerType={false}
        showRentField
        heading="Start Your Home Journey"
        subheading="We'll match you with first-time buyer deals in your budget."
      />

      <DealsFAQ items={FAQ_ITEMS} title="First-Time Buyer FAQ" />

      {/* Final CTA */}
      <section className="bg-med-teal py-16 md:py-24">
        <div className="max-w-[720px] mx-auto px-5 text-center">
          <h2 className="text-white text-[24px] md:text-[36px] font-bold leading-tight mb-4">
            $43,000 Is Waiting for You.
          </h2>
          <p className="text-white/75 text-[15px] leading-relaxed mb-8 max-w-[560px] mx-auto">
            GST rebate + PTT exemption + developer credits. Your first home is closer than you think.
          </p>
          <a href="#calculator" className="inline-flex items-center justify-center h-[52px] px-8 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px]">
            Calculate My Savings
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
