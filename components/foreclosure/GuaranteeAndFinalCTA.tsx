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
            If we don&apos;t surface a match within 30 days of the intro call, our broker
            hand-searches off-market alternatives on your behalf — no charge, no obligation.
          </p>
          <p className="text-text-secondary text-sm md:text-base">
            You tell us what you&apos;re looking for. We do the hunting that nothing else gets you.
          </p>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-3">
            Get matched with our court-ordered specialist.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Free, buyer-side only. Greater Vancouver. Investors and first-time buyers welcome.
            We call within 24 hours.
          </p>
        </div>

        <ForeclosureLeadForm formLocation="final_cta" />

        <p className="text-center text-text-muted text-sm mt-6">
          We&apos;re tracking ~389 active BC court-ordered listings right now. Free,
          buyer-side only, no bank affiliation.
        </p>
      </div>
    </section>
  );
}
