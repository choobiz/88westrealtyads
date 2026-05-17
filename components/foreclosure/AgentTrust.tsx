import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export default function AgentTrust() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-eightyw-cta text-[13px] font-semibold uppercase tracking-[2px] mb-3">
            BUYER-SIDE ONLY
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-eightyw-blue mb-4">
            We don&apos;t represent banks — only buyers.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Sellers (banks and the court) pay our commission. So our advice is yours alone.
            Most BC competitors mix buyer and lender representation on the same page.
            That&apos;s a conflict we don&apos;t accept.
          </p>
        </div>

        <div className="bg-eightyw-light border border-eightyw-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md">
            <Image
              src="/images/agent/shirin-saleh.jpg"
              alt="Shirin Saleh, Managing Broker and Owner of 88 West Realty"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-eightyw-blue text-xl md:text-2xl font-bold mb-1">
              Shirin Saleh
            </h3>
            <p className="text-text-secondary text-sm md:text-base mb-1">
              Managing Broker &amp; Owner · 88 West Realty
            </p>
            <p className="text-text-muted text-sm mb-3">
              REALTOR&reg; · Licensed in BC · #X031527
            </p>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-4">
              Serving Greater Vancouver since 2015 — sixty agents strong, with deep
              roots in North Vancouver and across the Lower Mainland. Buyer-side help
              Monday–Saturday, 8 AM – 8 PM PT.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a
                href="tel:+16042811828"
                className="inline-flex items-center justify-center gap-2 px-5 h-[44px] bg-brand-red text-white font-semibold text-sm rounded-full hover:bg-brand-red-hover transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call now
              </a>
              <a
                href="mailto:shirin@88westrealty.com"
                className="inline-flex items-center justify-center gap-2 px-5 h-[44px] border-2 border-eightyw-blue/20 text-eightyw-blue font-semibold text-sm rounded-full hover:bg-eightyw-blue hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-text-muted text-xs mt-6">
          88 West Realty · Licensed in British Columbia (X031527) ·
          970 Marine Drive, North Vancouver, BC · 604-281-1828 · shirin@88westrealty.com
        </p>
      </div>
    </section>
  );
}
