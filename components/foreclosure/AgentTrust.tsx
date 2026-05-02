import { Phone, Mail } from "lucide-react";

export default function AgentTrust() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-med-teal text-[13px] font-semibold uppercase tracking-[2px] mb-3">
            BUYER-SIDE ONLY
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-med-navy mb-4">
            We don&apos;t represent banks — only buyers.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Sellers (banks and the court) pay our commission. So our advice is yours alone.
            Most BC competitors mix buyer and lender representation on the same page.
            That&apos;s a conflict we don&apos;t accept.
          </p>
        </div>

        <div className="bg-med-light border border-med-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-med-navy to-med-teal flex items-center justify-center text-white shrink-0">
            <span className="text-3xl md:text-4xl font-bold tracking-wider">88W</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-med-navy text-xl md:text-2xl font-bold mb-1">
              [Agent Name — Placeholder]
            </h3>
            <p className="text-text-secondary text-sm md:text-base mb-1">
              Buyer-Side Specialist · Court-Ordered Sales
            </p>
            <p className="text-text-muted text-sm mb-3">
              88 West Realty · Licensed in BC
            </p>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-4">
              10+ BC court-ordered closings since 2020.
              Available Monday–Saturday, 8 AM – 8 PM PT.
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
                href="mailto:info@88westrealty.com"
                className="inline-flex items-center justify-center gap-2 px-5 h-[44px] border-2 border-med-navy/20 text-med-navy font-semibold text-sm rounded-full hover:bg-med-navy hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-text-muted text-xs mt-6">
          88 West Realty · Licensed in British Columbia (X031527) ·
          970 Marine Drive, North Vancouver, BC · 604-281-1828 · info@88westrealty.com
        </p>
      </div>
    </section>
  );
}
