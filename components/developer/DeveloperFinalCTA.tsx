import { DeveloperLeadForm } from "./DeveloperHero";

export default function DeveloperFinalCTA() {
  return (
    <section id="register" className="bg-eightyw-light border-t border-eightyw-border py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-3">
            Book a free consultation.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Free, buyer-side only. We call within 24 hours, get specific about your buy-box, and
            negotiate the stack on your behalf — building by building. No fee charged to buyers.
          </p>
        </div>

        <DeveloperLeadForm formLocation="final_cta" />

        <p className="text-center text-text-muted text-sm mt-6">
          Licensed BC brokerage · 88 West Realty · #X031527 · 970 Marine Drive, North Vancouver · 604-281-1828
        </p>
      </div>
    </section>
  );
}
