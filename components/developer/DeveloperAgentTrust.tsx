export default function DeveloperAgentTrust() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-brand-red text-[13px] font-semibold uppercase tracking-[2px] mb-3">
            WHY 88 WEST REALTY
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-eightyw-blue mb-4">
            We Don&apos;t Represent the Developer — Only You.
          </h2>
        </div>

        <div className="bg-eightyw-light border border-eightyw-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-eightyw-blue flex items-center justify-center text-white shrink-0">
            <span className="text-3xl md:text-4xl font-bold tracking-wider">88W</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-eightyw-blue text-xl md:text-2xl font-bold mb-1">
              [Agent Name — Placeholder]
            </h3>
            <p className="text-brand-red text-sm font-semibold mb-3">
              Buyer-Side Agent · 88 West Realty · License #X031527
            </p>
            <div className="space-y-3 text-text-secondary text-sm md:text-base leading-relaxed">
              <p>
                88 West Realty is a licensed BC brokerage. The Developer Incentive Tracker is a
                buyer-side resource — we are not affiliated with any of the developers we cover, and
                we are not paid by any developer to feature their building. Our compensation comes
                from the buyer-agent commission paid by the developer at closing on your behalf, per
                the BC Real Estate Services Act. You never receive a bill from us.
              </p>
              <p>
                The Tracker exists because we got tired of watching buyers pay $50K–$100K more than
                they needed to because nobody had assembled the incentive picture in one place. So we did.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-eightyw-border rounded-2xl p-6 md:p-8 mb-8 text-center shadow-sm">
          <p className="text-eightyw-blue text-xl md:text-2xl font-semibold leading-relaxed italic">
            &ldquo;We don&apos;t represent the developer — only you.&rdquo;
          </p>
        </div>

        <div className="bg-white border-t-4 border-brand-red border border-eightyw-border rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
          <p className="text-brand-red text-[13px] font-semibold uppercase tracking-[2px] mb-3">
            THE INCENTIVE-MATCH PROMISE
          </p>
          <p className="text-eightyw-blue text-base md:text-lg font-semibold leading-relaxed mb-3">
            If the Tracker doesn&apos;t surface a match in 30 days, our broker walks you through every
            project where 88 West has off-the-record builder relationships and pre-negotiates a
            builder-direct concession on your behalf — at no charge.
          </p>
          <p className="text-text-muted text-sm">
            Eligibility: subscribers who complete the full intake form and respond within 7 days to
            the broker&apos;s outreach. The 30 days runs from the first Tracker delivery after sign-up.
          </p>
        </div>

        <div className="bg-eightyw-light border border-eightyw-border rounded-2xl p-6 md:p-8 text-center">
          <p className="text-eightyw-blue font-bold text-base md:text-lg mb-1">88 West Realty</p>
          <p className="text-text-secondary text-sm md:text-base">
            Licensed BC Brokerage · #X031527
          </p>
          <p className="text-text-secondary text-sm md:text-base">
            970 Marine Drive, North Vancouver, BC
          </p>
          <p className="text-text-secondary text-sm md:text-base">
            <a href="tel:+16042811828" className="text-brand-red hover:underline font-semibold">604-281-1828</a>
            {" · "}
            <a href="mailto:info@88westrealty.com" className="text-brand-red hover:underline">info@88westrealty.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}
