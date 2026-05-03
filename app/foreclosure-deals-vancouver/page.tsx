import type { Metadata } from "next";
import ForeclosureNavbar from "@/components/foreclosure/ForeclosureNavbar";
import MedicalFooter from "@/components/medical/MedicalFooter";
import ConsultationStickyMobileCTA from "@/components/shared/ConsultationStickyMobileCTA";
import CookieConsent from "@/components/medical/CookieConsent";
import ForeclosureHero from "@/components/foreclosure/ForeclosureHero";
import InventoryPreview from "@/components/foreclosure/InventoryPreview";
import ForeclosureFormSection from "@/components/foreclosure/ForeclosureFormSection";
import MortgageCliffCallout from "@/components/foreclosure/MortgageCliffCallout";
import ProcessExplainer from "@/components/foreclosure/ProcessExplainer";
import AudienceSplit from "@/components/foreclosure/AudienceSplit";
import AgentTrust from "@/components/foreclosure/AgentTrust";
import ForeclosureFAQ from "@/components/foreclosure/ForeclosureFAQ";
import GuaranteeAndFinalCTA from "@/components/foreclosure/GuaranteeAndFinalCTA";

export const metadata: Metadata = {
  title: "Vancouver Foreclosure Specialist | Court-Ordered Sales Buyer Agent",
  description:
    "88 West Realty's buyer-side foreclosure specialist hunts Greater Vancouver court-ordered sales for you — Schedule A drafted, court hearing attended, possession risk screened. Free, no fee charged to buyers.",
  alternates: {
    canonical: "https://go.88westrealty.com/foreclosure-deals-vancouver",
  },
  openGraph: {
    title: "Vancouver Foreclosure Specialist | Court-Ordered Sales Buyer Agent",
    description:
      "Get matched with 88 West Realty's buyer-side foreclosure specialist. We hunt Greater Vancouver court-ordered sales for you and attend the hearing. Free, buyer-side only.",
    url: "https://go.88westrealty.com/foreclosure-deals-vancouver",
    type: "website",
    images: [{ url: "/images/foreclosure/hero-vancouver.jpg", width: 1200, height: 630 }],
  },
};

function JsonLd() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Is buying a foreclosure in BC safe?", acceptedAnswer: { "@type": "Answer", text: "BC court-ordered sales are court-supervised, so the title is clear at closing. The risks aren't title-related — they're \"as-is, where-is\" condition risk, court-date outbid risk, and (rarely) possession risk if the former owner is still in the home. Working with a court-experienced buyer-side broker mitigates each of these." } },
      { "@type": "Question", name: "What's the difference between a foreclosure and a court-ordered sale in BC?", acceptedAnswer: { "@type": "Answer", text: "In BC they're the same thing. The legal mechanism is a \"judicial sale\" supervised by the BC Supreme Court. Ontario uses \"power of sale\" instead, which is contractual — no court oversight required. BC's process is slower but the title is cleaner." } },
      { "@type": "Question", name: "Can a first-time buyer purchase a court-ordered sale in Vancouver?", acceptedAnswer: { "@type": "Answer", text: "Yes. Most major Canadian banks finance court-ordered purchases at standard rates and ratios; a few B-lenders refuse, so your mortgage broker matters. The bigger consideration is risk tolerance: you accept the property \"as-is\" and may face a competing bid at the court approval hearing. We provide pre-approval intros and walk you through every step." } },
      { "@type": "Question", name: "What is Schedule A in a BC foreclosure?", acceptedAnswer: { "@type": "Answer", text: "Schedule A is the lender/court addendum attached to every court-ordered sale offer in BC. It releases the lender and former owner from any condition, warranty, or disclosure responsibility. Holes in walls, missing appliances, surprise liens — all your problem. We draft it with you and explain every line before you sign." } },
      { "@type": "Question", name: "What happens at the foreclosure court date?", acceptedAnswer: { "@type": "Answer", text: "The lender's lawyer applies to BC Supreme Court for sale approval. Other buyers can show up with competing subject-free offers; the judge usually awards to the highest bid. Your broker can attend on your behalf and submit improved offers if needed. Once approved, completion typically follows in 1–10 days." } },
      { "@type": "Question", name: "Can I get a mortgage on a court-ordered sale?", acceptedAnswer: { "@type": "Answer", text: "Yes. Most major Canadian banks finance court-ordered purchases at standard rates and amortizations. The catch is that your offer typically needs to be subject-free at the court date — meaning fully approved, not just pre-approved. We introduce you to three Vancouver-area mortgage brokers who close these files weekly." } },
      { "@type": "Question", name: "Do I need a realtor to buy a foreclosure in BC?", acceptedAnswer: { "@type": "Answer", text: "You don't have to use one, but BC's process makes it expensive to go alone. Schedule A drafting, court-date attendance, and possession-risk research aren't standard parts of a typical realtor's workflow — they're foreclosure-specific. We're buyer-side only, sellers pay our commission, and the engagement costs you nothing on the property itself." } },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "88 West Realty",
    description: "Buyer-side specialist for Greater Vancouver court-ordered and foreclosure sales.",
    url: "https://go.88westrealty.com/foreclosure-deals-vancouver",
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
    name: "Greater Vancouver Court-Ordered Sales Buyer Representation",
    serviceType: "Buyer-side real estate agency for court-ordered sales and foreclosures",
    provider: { "@type": "RealEstateAgent", name: "88 West Realty" },
    areaServed: "Greater Vancouver, British Columbia",
    description: "Personalized buyer-side representation for Greater Vancouver court-ordered sales and foreclosures: shortlist matching, Schedule A drafting, BC Supreme Court hearing attendance, and possession-risk research. 30-day match guarantee. No fee charged to buyers.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  );
}

export default function ForeclosurePage() {
  return (
    <>
      <JsonLd />
      <ForeclosureNavbar />
      <ForeclosureHero />
      <InventoryPreview />
      <ForeclosureFormSection />
      <MortgageCliffCallout />
      <ProcessExplainer />
      <AudienceSplit />
      <AgentTrust />
      <ForeclosureFAQ />
      <GuaranteeAndFinalCTA />
      <MedicalFooter />
      <ConsultationStickyMobileCTA />
      <CookieConsent />
    </>
  );
}
