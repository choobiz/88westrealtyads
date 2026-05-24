import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MedicalFooter from "@/components/medical/MedicalFooter";

export const metadata: Metadata = {
  title: "Privacy Policy · 88 West Realty",
  description:
    "How 88 West Realty collects, uses, and protects information submitted through our marketing landing pages and lead-intake forms.",
  alternates: { canonical: "https://go.88westrealty.com/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-text-muted text-sm mb-8">
            88 West Realty Ltd. · Effective May 24, 2026
          </p>

          <p className="text-text-secondary leading-relaxed mb-6">
            88 West Realty Ltd. (&ldquo;88 West Realty&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;) respects your privacy and is committed to protecting the personal
            information you provide through our marketing landing pages and lead-intake forms.
            This Privacy Policy explains what information we collect, how we use it, and the
            choices you have. It applies to the landing pages we operate from{" "}
            <code>go.88westrealty.com</code> and related campaign subdomains.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-eightyw-blue mt-10 mb-3">
            1. Information we collect
          </h2>
          <p className="text-text-secondary leading-relaxed mb-3">
            When you submit a form on one of our landing pages, we collect:
          </p>
          <ul className="list-disc pl-6 text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>The name, email address, and phone number you provide</li>
            <li>The form&apos;s source page and submission timestamp</li>
            <li>
              The marketing source that referred you (Google Ads click identifier, search term,
              UTM parameters)
            </li>
            <li>
              Standard analytics signals (browser, device, anonymized geographic region) collected
              by Google Analytics 4 and Microsoft Clarity for service improvement
            </li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-6">
            We do <strong>not</strong> collect financial information, mortgage data, social
            insurance numbers, or government identification through these landing pages. Any such
            information you may later share with a 88 West Realty REALTOR<sup>®</sup> during a
            client relationship is governed by the brokerage&apos;s separate privacy policy and by
            British Columbia&apos;s Personal Information Protection Act (PIPA).
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-eightyw-blue mt-10 mb-3">
            2. How we use your information
          </h2>
          <p className="text-text-secondary leading-relaxed mb-3">
            We use the information you submit solely to:
          </p>
          <ul className="list-disc pl-6 text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>
              Have an 88 West Realty managing broker or licensed REALTOR<sup>®</sup> contact you
              about the service you inquired about (Greater Vancouver foreclosures, pre-sale condos,
              or related real estate services)
            </li>
            <li>
              Send you the specific materials offered on the page (such as the 48-Hour Deal
              Shortlist or 48-Hour Incentive Audit)
            </li>
            <li>
              Send you periodic follow-up communication about Greater Vancouver real estate
              opportunities matching your inquiry, until you opt out
            </li>
            <li>Improve our marketing and landing pages based on aggregated analytics</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-6">
            We may pair your form submission with the Google Ads click identifier (gclid) and
            report the conversion back to Google Ads so we can measure which ads produced which
            inquiries. No personally identifying contact information is sent to Google in that
            loop — only the click identifier and the fact that a conversion occurred.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-eightyw-blue mt-10 mb-3">
            3. SMS / text-message consent
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            When you submit a lead form that includes a phone number, you consent to receive SMS /
            text messages from 88 West Realty related to your inquiry. Messages may include deal
            alerts matching your buy-box, appointment confirmations, document delivery (such as
            your Deal Shortlist), and follow-up. Up to 10 messages per month. Message and data
            rates may apply. Reply <strong>STOP</strong> to any message to opt out — this removes
            your number from all SMS sequences within 24 hours. Reply <strong>HELP</strong> for
            help, or email{" "}
            <a className="text-eightyw-cta hover:underline" href="mailto:shirin@88westrealty.com">
              shirin@88westrealty.com
            </a>
            .
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-eightyw-blue mt-10 mb-3">
            4. Who has access to your information
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Your information is accessible only to the 88 West Realty managing broker and licensed
            staff assigned to your inquiry. We do <strong>not</strong> share, sell, rent, or trade
            your contact information with banks, lenders, mortgage brokers, developers, or any
            third party. If you choose to be introduced to a mortgage broker through us, we will
            request your explicit consent before sharing your contact information for that
            introduction.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-eightyw-blue mt-10 mb-3">
            5. Cookies and analytics
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            We use cookies and similar technologies through Google Analytics 4 and Microsoft
            Clarity to understand how visitors use our pages. You can disable cookies in your
            browser without affecting your ability to submit a form. Our cookie consent banner
            offers a one-click decline option that prevents non-essential cookies from being set.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-eightyw-blue mt-10 mb-3">
            6. Data retention and deletion
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            We retain your contact information for as long as you have an active or potential
            client relationship with 88 West Realty, plus the period required by British
            Columbia&apos;s Real Estate Services Act records-retention rules. You can request
            deletion of your data at any time by emailing{" "}
            <a className="text-eightyw-cta hover:underline" href="mailto:shirin@88westrealty.com">
              shirin@88westrealty.com
            </a>
            . We will confirm deletion within 30 days, except where retention is required by BC
            law for completed real-estate transactions.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-eightyw-blue mt-10 mb-3">
            7. Your rights under BC&apos;s PIPA
          </h2>
          <p className="text-text-secondary leading-relaxed mb-3">
            Under British Columbia&apos;s Personal Information Protection Act, you have the right
            to:
          </p>
          <ul className="list-disc pl-6 text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>
              Withdraw your consent at any time (subject to legal and contractual restrictions)
            </li>
            <li>
              File a complaint with the BC Office of the Information and Privacy Commissioner
            </li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-6">
            To exercise any of these rights, please email shirin@88westrealty.com.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-eightyw-blue mt-10 mb-3">
            8. Contact
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
            Licensed in British Columbia.
          </p>
        </article>
      </main>

      <MedicalFooter />
    </>
  );
}
