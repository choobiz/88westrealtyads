import { ForeclosureLeadForm } from "./ForeclosureHero";

export default function ForeclosureFormSection() {
  return (
    <section id="register" className="bg-eightyw-light border-t border-eightyw-border py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-brand-red text-[13px] font-semibold uppercase tracking-[2px] mb-3">
            STEP 1 — TELL US WHAT YOU&apos;RE LOOKING FOR
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-3">
            Book a free consultation.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            20 minutes with our buyer-side court-ordered specialist. We call within 24 hours
            with a personal shortlist matched to your budget, areas, and risk tolerance.
          </p>
        </div>

        <ForeclosureLeadForm formLocation="deals_section" />

        <p className="text-center text-text-muted text-sm mt-6">
          Free, buyer-side only. No bank affiliation. No fee charged to buyers.
        </p>
      </div>
    </section>
  );
}
