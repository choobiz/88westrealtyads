import { ForeclosureLeadForm } from "./ForeclosureHero";

export default function GuaranteeAndFinalCTA() {
  return (
    <section id="register" className="bg-eightyw-light border-t border-eightyw-border py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-t-4 border-brand-red border border-eightyw-border rounded-2xl p-6 md:p-8 mb-8 text-center shadow-sm">
          <p className="text-brand-red text-[13px] font-semibold uppercase tracking-[2px] mb-3">
            THE 30-DAY MATCH GUARANTEE
          </p>
          <p className="text-eightyw-blue text-lg md:text-xl font-semibold leading-relaxed mb-3">
            If our Sheet doesn&apos;t surface a match in 30 days, we&apos;ll personally
            hand-search off-market alternatives for you — no charge, no obligation.
          </p>
          <p className="text-text-secondary text-sm md:text-base">
            You read the daily list. We do the hunting that nothing else gets you.
          </p>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-3">
            Get the Foreclosure Sheet.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Free. Every business morning. Greater Vancouver only.
            Investors and first-time buyers welcome.
          </p>
        </div>

        <ForeclosureLeadForm formLocation="final_cta" />

        <p className="text-center text-text-muted text-sm mt-6">
          ~389 active BC court-ordered listings as of today. Tomorrow&apos;s
          list lands at 7 AM. Free, buyer-side only, no bank affiliation.
        </p>
      </div>
    </section>
  );
}
