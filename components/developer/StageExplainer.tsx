const STAGES: { stage: string; h3: string; body: string }[] = [
  {
    stage: "Stage 1",
    h3: "Friends & Family",
    body: `Earliest pricing — typically 10–15% below the eventual public list. Restricted to developer staff, board members, and family. Almost never accessible to public buyers. We mention it only so the rest of the pyramid makes sense.`,
  },
  {
    stage: "Stage 2",
    h3: "Realtor VIP / Platinum Access",
    body: `This is where 88 West Realty operates. Buyer agents with builder relationships get early floor-plan allocations and the published incentive stack 2–6 weeks before the public sales centre opens. Typical savings vs. Stage 3: $5K–$25K on price plus first pick of the best-orienting units. With 5,458 unsold completed units across Greater Vancouver, builders are extending Platinum-level pricing further into the project lifecycle than they would in a balanced market.`,
  },
  {
    stage: "Stage 3",
    h3: "Public Pre-Sale",
    body: `The sales centre opens. The headline price is published. The best floor plans are frequently already absorbed by Stage 2. The "incentive stack" is the developer's mechanism for filling the price gap — pricing data stays steady on paper, but cash credits, free parking, and rate buy-downs quietly do the discounting. Typical savings vs. Stage 5 in a normal market: $40K–$60K. In today's market, that gap has compressed.`,
  },
  {
    stage: "Stage 4",
    h3: "Construction Sales (and Assignments)",
    body: `Once construction is under way, the developer continues selling unsold stock — often with bigger published incentives as the absorption clock ticks. Original 2021–2022 pre-sale buyers facing six-figure paper losses are also assigning their contracts at or below their original purchase price. Net effect in 2026: assignment buyers willing to navigate the friction can occasionally beat Stage 2 pricing on a 30%-built unit. Unusual. Worth tracking.`,
  },
  {
    stage: "Stage 5",
    h3: "Completion & Standing Inventory",
    body: `Historically these units traded 25–40% above Stage 1. In 2026, with completed unsold inventory at a 24-year high, Stage 5 pricing has compressed back toward Stage 3 in Brentwood, Metrotown, Surrey Centre, and Marpole. The leverage is real: walk the finished suite, inspect deficiencies, lock financing, close in 30 days. The risk: next quarter's completions arrive with bigger published incentives, so timing matters.`,
  },
];

const PHRASES: { phrase: string; meaning: string }[] = [
  { phrase: `"From just $499,900"`, meaning: `One unit — typically the smallest, north-facing, or facing the loading dock. Confirm the actual unit list at that price; it's usually one.` },
  { phrase: `"5% deposit"`, meaning: `The developer's lender just lowered their absorption threshold. Their carrying cost is now your leverage — extended deposit timelines beyond the published structure are often available, ask.` },
  { phrase: `"Decorating allowance"`, meaning: `A price cut hidden as a credit to protect comparable-sales data. Frequently negotiable as cash off the closing total instead of a credit you spend at the developer's design centre at retail.` },
  { phrase: `"GST included"`, meaning: `Worth $35K–$50K on a $700K–$1M new home. Verify the base price wasn't quietly raised first — compare $/sq.ft. to nearby resale comps.` },
  { phrase: `"Free parking"`, meaning: `$28K–$80K of value depending on building. If you don't need parking, ask whether it converts to a cash price reduction at equivalent value.` },
  { phrase: `"Limited time"`, meaning: `The published concession will likely tighten as the project hits 70–80% sold. The deadline is a sales-rhythm signal, not a marketing gimmick — concession size tracks the developer's lender absorption clock.` },
  { phrase: `"Mortgage rate buy-down"`, meaning: `Worth $10K–$30K depending on basis points × term × loan size. Calculate the cash-equivalent NPV yourself before accepting the headline rate.` },
  { phrase: `"Strata fee holiday"`, meaning: `6–12 months of fees waived — $3K–$10K of real value. Disappears at month 13. Model your year-2 carrying cost honestly.` },
  { phrase: `"Assignment-friendly"`, meaning: `Investor-targeted. Means the typical 2–4% assignment fee ($14K–$40K) is waived. Separately ask whether re-marketing on MLS is permitted — many builders prohibit it.` },
  { phrase: `"Closing-cost coverage"`, meaning: `Legal, title insurance, adjustments — $3K–$8K. Real but small relative to the headline incentive.` },
  { phrase: `"Bonus suite finishes"`, meaning: `$10K–$25K of upgrade-list value at the developer's cost (40–50% of retail). Negotiate the upgrade list, not just acceptance.` },
  { phrase: `"VIP access"`, meaning: `The standard pre-public release window. Real value if your broker has builder relationships. Vapour if they don't.` },
];

export default function StageExplainer() {
  return (
    <section id="stages" className="bg-eightyw-light py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-6">
            How Developer Pricing Actually Works (and Why the Public Buyer Pays $50K–$150K More).
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            Developers don&apos;t cut list prices. Doing so would erode the comparable-sales data their
            lenders, appraisers, and future buyers rely on. Instead, they release inventory in stages
            and stack hidden concessions on top. Knowing the stage tells you how big the discount can
            be — and reading their language tells you what&apos;s negotiable.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-eightyw-blue text-xl md:text-2xl font-bold text-center mb-8">
            The 5-Stage Developer Release Pyramid
          </h3>
          <div className="space-y-4">
            {STAGES.map((s, i) => (
              <article key={i} className="bg-white border border-eightyw-border rounded-2xl p-6 md:p-7">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                  <div className="md:w-44 shrink-0">
                    <p className="text-brand-red text-xs font-semibold uppercase tracking-wider mb-1">
                      {s.stage}
                    </p>
                    <h4 className="text-eightyw-blue text-lg md:text-xl font-bold leading-tight">
                      {s.h3}
                    </h4>
                  </div>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed flex-1">
                    {s.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="text-eightyw-blue text-base md:text-lg font-semibold text-center mt-8 max-w-3xl mx-auto leading-relaxed">
            In a normal market, Stage 2 saves $50K–$150K vs. Stage 5. In 2026, Stages 2 and 5 are both
            anomalously favourable — but for different reasons. Stage 2 wins on best floor plans.
            Stage 5 wins on full unit-condition inspection. The Tracker covers both.
          </p>
        </div>

        <div>
          <h3 className="text-eightyw-blue text-xl md:text-2xl font-bold text-center mb-3">
            12 Phrases Developers Use vs. What They Actually Mean
          </h3>
          <p className="text-text-secondary text-sm md:text-base text-center mb-8 max-w-2xl mx-auto">
            We&apos;re not here to make you feel like an insider. We&apos;re here to make sure you
            read every line of the offer correctly so the math doesn&apos;t lie to you.
          </p>
          <div className="bg-white border border-eightyw-border rounded-2xl overflow-hidden divide-y divide-eightyw-border">
            {PHRASES.map((p, i) => (
              <div key={i} className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-6 p-5 md:p-6">
                <p className="text-eightyw-blue font-semibold text-sm md:text-base leading-snug">
                  {p.phrase}
                </p>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                  {p.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
