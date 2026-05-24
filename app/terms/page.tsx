import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MedicalFooter from "@/components/medical/MedicalFooter";

export const metadata: Metadata = {
  title: "Terms of Use · 88 West Realty",
  description:
    "Terms governing use of 88 West Realty's marketing landing pages and lead-intake forms.",
  alternates: { canonical: "https://go.88westrealty.com/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <header className="bg-white border-b border-eightyw-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="88 West Realty"
              width={100}
              height={40}
              className="h-9 w-auto"
            />
          </Link>
          <Link
            href="/foreclosure-deals-vancouver"
            className="text-sm text-eightyw-blue hover:text-brand-red transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="bg-white py-12 lg:py-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
          <h1 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-2">
            Terms of Use
          </h1>
          <p className="text-text-muted text-sm mb-8">
            88 West Realty Ltd. · Effective May 24, 2026
          </p>

          <p className="text-text-secondary leading-relaxed mb-6">
            These Terms of Use govern your use of the 88 West Realty marketing landing pages (the
            &ldquo;Sites&rdquo;), including <code>go.88westrealty.com</code> and any
            campaign-specific subdomains we operate from time to time. By using the Sites, you
            agree to these Terms.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-eightyw-blue mt-10 mb-3">
            1. Informational use only
          </h2>
          <p className="text-text-secondary leading-relaxed mb-3">
            The Sites are provided for general informational purposes only. Property listings,
            foreclosure information, pre-sale inventory data, market commentary, and any other
            information presented on the Sites:
          </p>
          <ul className="list-disc pl-6 text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>Do not constitute investment, tax, legal, financial, or mortgage advice</li>
            <li>Are subject to change without notice</li>
            <li>Should be independently verified before you act on them</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-6">
            For real-estate transactions, you should obtain and rely on the formal documents
            provided by the brokerage during a contracted client relationship, not on summaries
            presented on these marketing pages.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-eightyw-blue mt-10 mb-3">
            2. No warranty of accuracy
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            While we make reasonable efforts to ensure the information on the Sites is accurate
            and current, we make no representation or warranty, express or implied, regarding the
            accuracy, completeness, reliability, suitability, or availability of any information,
            products, services, or related graphics. Foreclosure inventory counts and pre-sale
            unit counts in particular are market-estimate figures and change rapidly; live listings
            should always be verified against the source MLS<sup>®</sup> data before you act on
            them.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-eightyw-blue mt-10 mb-3">
            3. No professional relationship from use of the Sites
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Submitting a lead form on the Sites does not by itself create a real-estate agency
            relationship between you and 88 West Realty. A formal agency relationship is created
            only once a written Buyer&apos;s Agency Agreement is signed in accordance with British
            Columbia&apos;s Real Estate Services Act.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-eightyw-blue mt-10 mb-3">
            4. Third-party links
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            The Sites may link to third-party websites, including <code>88westrealty.com</code>,
            mortgage broker partners, external listing platforms, or developer marketing pages. We
            are not responsible for the content, accuracy, or privacy practices of any third-party
            site.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-eightyw-blue mt-10 mb-3">
            5. Brokerage
          </h2>
          <address className="not-italic text-text-secondary leading-relaxed mb-2">
            88 West Realty Ltd.
            <br />
            970 Marine Drive, North Vancouver, BC V7P 1R9
            <br />
            (604) 281-1828
            <br />
            <a className="text-eightyw-cta hover:underline" href="mailto:shirin@88westrealty.com">
              shirin@88westrealty.com
            </a>
          </address>
          <p className="text-text-muted text-sm mt-6">
            These Terms are governed by the laws of British Columbia, Canada.
          </p>
        </article>
      </main>

      <MedicalFooter />
    </>
  );
}
