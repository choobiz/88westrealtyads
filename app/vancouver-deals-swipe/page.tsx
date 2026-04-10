import type { Metadata } from "next";
import MedicalNavbar from "@/components/medical/MedicalNavbar";
import MedicalFooter from "@/components/medical/MedicalFooter";
import CookieConsent from "@/components/medical/CookieConsent";
import SwipeDeals from "@/components/deals/SwipeDeals";
import StatsBar from "@/components/deals/StatsBar";
import SavingsCalculator from "@/components/deals/SavingsCalculator";
import DealsLeadForm from "@/components/deals/DealsLeadForm";
import DealsFAQ from "@/components/deals/DealsFAQ";
import type { Deal } from "@/components/deals/DealCard";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Swipe Through Vancouver Condo Deals — Find Your Match | 88 West Realty",
  description: "Swipe through the best condo deals in Metro Vancouver. Save your favorites, calculate your savings. $100K+ in developer incentives available now.",
  alternates: { canonical: "https://go.88westrealty.com/vancouver-deals-swipe" },
  openGraph: {
    title: "Swipe Through Vancouver Condo Deals",
    description: "Find your perfect condo deal. Swipe, save, and register for details. $100K+ in incentives.",
    url: "https://go.88westrealty.com/vancouver-deals-swipe",
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
  {
    tag: "BEST VALUE", tagColor: "green",
    project: "The Langley", location: "Willoughby", unitType: "1 Bed · 560 SF",
    originalPrice: "$499,000", currentPrice: "$429,000", saving: "Save $70K",
    incentives: ["GST Rebate", "Free Parking", "5% Deposit"], completion: "Completion 2027",
    image: "/images/deals/deal-langley.webp",
  },
  {
    tag: "LUXURY", tagColor: "navy",
    project: "Concord Pacific Place", location: "Vancouver, False Creek", unitType: "2 Bed · 890 SF",
    originalPrice: "$1,050,000", currentPrice: "$879,000", saving: "Save $171K",
    incentives: ["$50K Credit", "2yr Warranty", "Concierge"], completion: "Move-in Ready",
    image: "/images/deals/deal-burrard.webp",
  },
];

const FAQ_ITEMS = [
  { q: "How does the deal matching work?", a: "Swipe right on deals you're interested in. We'll send you detailed pricing, floor plans, and availability for your saved deals within 24 hours." },
  { q: "Are these real developer incentives?", a: "Yes. Every deal listed includes verified incentives directly from the developer. Incentives include cash credits, reduced deposits, free parking, and more." },
  { q: "What if I change my mind?", a: "No commitment! Swiping right just saves the deal to your list. You can always start over or update your preferences after registering." },
  { q: "How often are deals updated?", a: "We update our deal list every Monday with the latest developer incentives, price changes, and new listings across Metro Vancouver." },
  { q: "Is there a cost for this service?", a: "Our deal matching service is completely free for buyers. We're compensated by the developers when you purchase, so our service costs you nothing." },
];

export default function SwipePage() {
  return (
    <>
      <MedicalNavbar />

      {/* Hero */}
      <section className="bg-med-navy pt-12 pb-4 px-6 text-center">
        <p className="text-med-teal text-xs font-semibold tracking-[3px] uppercase mb-3">
          A NEW WAY TO FIND YOUR HOME
        </p>
        <h1 className="text-white text-[28px] md:text-[42px] font-bold leading-[1.1] mb-3 max-w-[600px] mx-auto">
          Swipe. Save. Move In.
        </h1>
        <p className="text-white/50 text-[15px] max-w-[480px] mx-auto">
          The best condo deals in Metro Vancouver. Swipe through them like you scroll social — but these ones save you $100K+.
        </p>
      </section>

      <StatsBar
        items={[
          { value: "5,458", label: "Unsold Units" },
          { value: "$100K+", label: "In Incentives" },
          { value: "6", label: "Deals This Week" },
        ]}
      />

      {/* Swipe Section */}
      <SwipeDeals deals={DEALS} />

      {/* Calculator */}
      <div id="calculator">
        <SavingsCalculator
          firstTimeBuyer
          ctaText="See My Savings →"
          showRentComparison
        />
      </div>

      {/* Lead Form */}
      <DealsLeadForm
        source="vancouver-deals-swipe"
        showBuyerType
        heading="Get Details on Your Saved Deals"
        subheading="We'll send pricing, floor plans, and availability within 24 hours."
      />

      <DealsFAQ items={FAQ_ITEMS} />

      {/* Final CTA */}
      <section className="bg-med-teal py-16 md:py-20 text-center px-6">
        <h2 className="text-white text-[24px] md:text-[36px] font-bold mb-4">
          Your Next Home Is One Swipe Away.
        </h2>
        <p className="text-white/75 text-[15px] mb-8 max-w-[500px] mx-auto">
          $100K+ in developer incentives. Updated weekly. Free for buyers.
        </p>
        <a href="#register" className="inline-flex items-center justify-center h-[52px] px-8 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all gap-2 text-[15px]">
          Register for Deal Alerts
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>

      <MedicalFooter />
      <CookieConsent />
    </>
  );
}
