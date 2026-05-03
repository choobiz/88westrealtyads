import type { Metadata } from "next";
import DeveloperNavbar from "@/components/developer/DeveloperNavbar";
import MedicalFooter from "@/components/medical/MedicalFooter";
import ConsultationStickyMobileCTA from "@/components/shared/ConsultationStickyMobileCTA";
import CookieConsent from "@/components/medical/CookieConsent";
import DeveloperHero from "@/components/developer/DeveloperHero";
import TrackerPreview from "@/components/developer/TrackerPreview";
import SupplyPipelineCallout from "@/components/developer/SupplyPipelineCallout";
import StageExplainer from "@/components/developer/StageExplainer";
import DeveloperAudienceSplit from "@/components/developer/DeveloperAudienceSplit";
import DeveloperAgentTrust from "@/components/developer/DeveloperAgentTrust";
import DeveloperFAQ from "@/components/developer/DeveloperFAQ";
import DeveloperFinalCTA from "@/components/developer/DeveloperFinalCTA";

export const metadata: Metadata = {
  title: "Vancouver Pre-Sale Specialist | $100K Off New Condos · 88 West Realty",
  description:
    "5,458 unsold Greater Vancouver condos. Get matched with 88 West Realty's buyer-side pre-sale specialist — we negotiate the developer's stack on your behalf, project by project. Free, no fee charged to buyers.",
  alternates: {
    canonical: "https://go.88westrealty.com/developer-condo-deals-vancouver",
  },
  openGraph: {
    title: "Vancouver Pre-Sale Specialist | $100K Off New Condos",
    description:
      "Personalized buyer-side representation for Greater Vancouver new-construction pre-sales. We negotiate the stack for you — no developer affiliation.",
    url: "https://go.88westrealty.com/developer-condo-deals-vancouver",
    type: "website",
  },
};

function JsonLd() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Is a presale safer than a resale in 2026?", acceptedAnswer: { "@type": "Answer", text: "Different risk profile, not safer or riskier as a category. Pre-sale risk lives in the completion timeline, the developer's financial health, and the assignment of the contract before close. Resale risk lives in deficiencies you can't see, dated systems, and special-levy exposure on older buildings. In 2026, the pre-sale incentive environment is the strongest since 2018." } },
      { "@type": "Question", name: "What's the GST rebate on a new home, and do I qualify?", acceptedAnswer: { "@type": "Answer", text: "Bill C-4 expanded the federal GST New Housing Rebate in 2026. On a new home priced up to $1M, eligible buyers can recover up to $50,000 in GST. The full rebate phases out between $1M and $1.5M. Eligibility is broader for first-time buyers but available to other purchaser categories too." } },
      { "@type": "Question", name: "How do incentive packages stack?", acceptedAnswer: { "@type": "Answer", text: "A typical 2026 stack on a $700K Greater Vancouver pre-sale combines a 5% deposit, a $25K–$50K cash credit at completion, free parking ($28K–$48K), a rate buy-down (worth $10K–$30K NPV), waived assignment fees, and sometimes a strata-fee holiday. Total cash-equivalent value: $80K–$120K." } },
      { "@type": "Question", name: "When are builder concessions actually negotiable?", acceptedAnswer: { "@type": "Answer", text: "Always — but the leverage compounds with the developer's absorption clock. The bigger the unsold inventory and the closer they are to triggering a lender's absorption covenant, the more flexible the published incentives become. At 60–80% sold, what's published is the floor, not the ceiling." } },
      { "@type": "Question", name: "What's an assignment, and should I consider one?", acceptedAnswer: { "@type": "Answer", text: "An assignment is a transfer of a pre-sale purchase contract from the original buyer to a new buyer before the building completes. In 2026, original buyers from 2021–2022 are sometimes assigning at or below their original purchase price to escape the contract. For the new buyer, that can mean acquiring a 30–50% built unit below current Stage 2 pricing — but with friction." } },
      { "@type": "Question", name: "Is 88 West Realty a buyer-side brokerage or builder-paid sales arm?", acceptedAnswer: { "@type": "Answer", text: "Buyer-side. We don't take any retainer or marketing fee from the developers we cover. Our compensation is the buyer-agent commission the developer pays at closing on your behalf per BC's Real Estate Services Act — the same way buyer-agency works on a resale." } },
      { "@type": "Question", name: "Will Vancouver condo prices recover by 2027?", acceptedAnswer: { "@type": "Answer", text: "BCREA forecasts roughly 3% growth in 2026 and a potential 27% appreciation by 2032. Only 64 pre-sale homes launched in February 2026 — about 6% of typical monthly volume. The supply pipeline three years out is already shrinking. Today's incentive window exists because of today's standing inventory." } },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "88 West Realty",
    description: "Buyer-side specialist for Greater Vancouver developer pre-sale and standing-inventory deals.",
    url: "https://go.88westrealty.com/developer-condo-deals-vancouver",
    telephone: "+1-604-281-1828",
    email: "info@88westrealty.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "970 Marine Drive",
      addressLocality: "North Vancouver",
      addressRegion: "BC",
      addressCountry: "CA",
    },
    areaServed: ["Vancouver", "North Vancouver", "Burnaby", "Richmond"],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Greater Vancouver Pre-Sale Buyer Representation",
    serviceType: "Buyer-side real estate agency for new-construction pre-sale and standing-inventory deals",
    provider: { "@type": "RealEstateAgent", name: "88 West Realty" },
    areaServed: "Greater Vancouver, British Columbia",
    description: "Personalized buyer-side representation for Greater Vancouver pre-sale and standing-inventory condo deals: shortlist matching, itemized incentive-stack analysis, builder-direct negotiation, and a 30-day incentive-match promise. No fee charged to buyers.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  );
}

export default function DeveloperCondoDealsPage() {
  return (
    <>
      <JsonLd />
      <DeveloperNavbar />
      <DeveloperHero />
      <TrackerPreview />
      <SupplyPipelineCallout />
      <StageExplainer />
      <DeveloperAudienceSplit />
      <DeveloperAgentTrust />
      <DeveloperFAQ />
      <DeveloperFinalCTA />
      <MedicalFooter />
      <ConsultationStickyMobileCTA />
      <CookieConsent />
    </>
  );
}
