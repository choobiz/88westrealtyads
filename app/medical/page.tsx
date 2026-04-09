import type { Metadata } from "next";
import MedicalNavbar from "@/components/medical/MedicalNavbar";
import MedicalHero from "@/components/medical/MedicalHero";
import MedicalSocialProof from "@/components/medical/MedicalSocialProof";
import BuildingSpecs from "@/components/medical/BuildingSpecs";
import MedicalFeatures from "@/components/medical/MedicalFeatures";
import WhoIsThisFor from "@/components/medical/WhoIsThisFor";
import LocationSection from "@/components/medical/LocationSection";
import OwnershipBenefits from "@/components/medical/OwnershipBenefits";
import RegistrationForm from "@/components/medical/RegistrationForm";
import MedicalFAQ from "@/components/medical/MedicalFAQ";
import FinalCTA from "@/components/medical/FinalCTA";
import MedicalFooter from "@/components/medical/MedicalFooter";
import MedicalStickyMobileCTA from "@/components/medical/MedicalStickyMobileCTA";
import CookieConsent from "@/components/medical/CookieConsent";

export const metadata: Metadata = {
  title: "North Shore Health Pavilion — First Medical Strata Pre-Sale | 88 West Realty",
  description: "Own your practice space in North Vancouver's first purpose-built medical strata. 34,733 SF, 5 storeys, units from 1,000 SF. Dental offices, clinics, specialist practices. Pre-sale now open.",
  alternates: {
    canonical: "https://go.88westrealty.com/medical",
  },
  openGraph: {
    title: "North Shore Health Pavilion — First Medical Strata Pre-Sale",
    description: "Own your practice space in North Vancouver's first purpose-built medical strata. 34,733 SF, 5 storeys, units from 1,000 SF. Pre-sale now open.",
    url: "https://go.88westrealty.com/medical",
    type: "website",
    images: [{ url: "/images/medical/hero-exterior.jpg", width: 1200, height: 630 }],
  },
};

function JsonLd() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is the price per square foot?", acceptedAnswer: { "@type": "Answer", text: "Pre-sale pricing starts at approximately $640/SF, with unit sizes from 1,000 SF. Final pricing depends on floor, views, and unit configuration. Register for the current price list." } },
      { "@type": "Question", name: "What are the monthly strata fees?", acceptedAnswer: { "@type": "Answer", text: "Estimated strata fees include building insurance, common area maintenance, elevator service, and reserve fund contributions. Estimated range: $0.50-$0.75/SF/month." } },
      { "@type": "Question", name: "Can I get financing for a medical strata unit?", acceptedAnswer: { "@type": "Answer", text: "Yes. Several major Canadian banks offer commercial mortgage products for medical strata. Typical terms: 25-year amortization, 65-75% LTV, competitive commercial rates." } },
      { "@type": "Question", name: "Who can buy a unit?", acceptedAnswer: { "@type": "Answer", text: "Units are available to medical professionals, healthcare organizations, and investors. Owner-occupants and investor-owners are welcome." } },
      { "@type": "Question", name: "When is completion?", acceptedAnswer: { "@type": "Answer", text: "Construction is targeted for 2028 completion. Pre-sale purchasers secure current pricing and can customize their units during the design phase." } },
      { "@type": "Question", name: "Can I customize my unit?", acceptedAnswer: { "@type": "Answer", text: "Pre-sale purchasers have significant customization options: interior layout, exam room configuration, reception design, specialized plumbing, and electrical." } },
    ],
  };

  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: "North Shore Health Pavilion — Medical Office Strata for Sale",
    description: "Purpose-built medical strata on Marine Drive, North Vancouver. 34,733 SF, 5 storeys, units from 1,000 SF. Dental offices, clinics, specialist practices.",
    url: "https://go.88westrealty.com/medical",
    address: {
      "@type": "PostalAddress",
      streetAddress: "835-845 W 15th Street (Marine Drive)",
      addressLocality: "North Vancouver",
      addressRegion: "BC",
      addressCountry: "CA",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }} />
    </>
  );
}

export default function MedicalPage() {
  return (
    <>
      <JsonLd />
      <MedicalNavbar />

      <MedicalHero
        eyebrow="NOW SELLING — NORTH VANCOUVER'S FIRST MEDICAL STRATA"
        headline="The North Shore's First Purpose-Built Medical Strata. There Won't Be a Second Chance at First."
        subheadline="Own your practice space in a 34,733 SF, 5-storey medical building designed from the ground up for clinical excellence. Pre-sale units from 1,000 SF on Marine Drive. Completion 2028."
        ctaText="Register for Priority Access"
        badge="PRE-SALE NOW OPEN — LIMITED UNITS"
        bgImage="/images/medical/hero-exterior.jpg"
      />

      <MedicalSocialProof
        items={[
          { icon: "building", text: "First Medical Strata on the North Shore" },
          { icon: "ruler", text: "34,733 SF Purpose-Built" },
          { icon: "calendar", text: "2028 Completion" },
          { icon: "ruler", text: "Units from 1,000 SF" },
        ]}
      />

      <BuildingSpecs />
      <WhoIsThisFor />
      <LocationSection />
      <MedicalFeatures />
      <OwnershipBenefits />
      <RegistrationForm />
      <MedicalFAQ />

      <FinalCTA
        heading="This Has Never Been Available Before. It Won't Be Again."
        body="The North Shore Health Pavilion is the first and only purpose-built medical strata on the North Shore. Once units are sold, this opportunity is gone. Secure your space in a building designed exclusively for clinical excellence."
        ctaText="Register Now — Limited Pre-Sale Units"
      />

      <MedicalFooter />
      <MedicalStickyMobileCTA />
      <CookieConsent />
    </>
  );
}
