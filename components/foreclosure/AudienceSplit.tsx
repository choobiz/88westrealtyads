import Image from "next/image";

const INVESTOR_BULLETS: { strong: string; rest: string }[] = [
  {
    strong: "The volume is the moat.",
    rest: "~389 active BC court-ordered listings means you're shopping a real pipeline, not a once-a-quarter unicorn. We send the new ones every business morning with comp anchors, gross-yield estimates at current CMHC market rents, and a bring-current cost band on each property.",
  },
  {
    strong: "Court-date strategy is the unlock.",
    rest: "Most investors lose deals because they bid once and assume the work is done. We attend the hearing, carry your pre-authorized improvement ceiling, and protect your inspection-and-legal spend with a tactic-not-a-prayer game plan.",
  },
  {
    strong: "ROI math is on every card.",
    rest: "Each Sheet entry includes gross yield, cash-on-cash at 20% down, all-in carry at the current 5-year fixed, and the 5-year appreciation comp from the same neighbourhood. You can rule deals in or out in 60 seconds.",
  },
  {
    strong: "Lender intros for subject-free closes.",
    rest: "We introduce you to mortgage brokers who write court-ordered files weekly. Subject-free means fully approved — not pre-approved — and the lender bench matters more than the rate.",
  },
  {
    strong: "Decision timeline: 24–72 hours.",
    rest: "Speed beats polish in this segment. Saved searches push real-time SMS alerts the moment a match hits the Sheet, so you're at the showing before the third investor logs in.",
  },
  {
    strong: "Cash-flippers, BRRRR holders, long-hold landlords — different strategies, same data.",
    rest: "Tell us your archetype on the form and we sort the Sheet to match.",
  },
];

const OWNER_BULLETS: { strong: string; rest: string }[] = [
  {
    strong: "Affordable inventory is real.",
    rest: "Recent BC examples include a $459K Langley condo and a $259K Mackenzie detached. Vancouver, Burnaby, and Richmond have a steady drip of sub-$700K condo and townhouse stock under court-ordered listing. Your fears about pricing being a myth are misplaced — the inventory is there.",
  },
  {
    strong: "The fears that block you are real, and we name them.",
    rest: "\"Can I get a mortgage?\" Yes — most major banks finance court-ordered sales at standard rates. \"What if I get outbid in court?\" That's a real risk; we attend on your behalf with a pre-authorized ceiling. \"What if the previous owner won't leave?\" Small but real risk; we flag every listing as vacant, owner-occupied, or tenanted before you tour.",
  },
  {
    strong: "Mortgage broker triage.",
    rest: "First-time-buyer files have moving parts — RRSP HBP, FHSA, BC Home Owner Mortgage, federal first-time buyer incentives — and most realtors don't bother stacking them. We do, with three mortgage brokers who specialize in this exact file.",
  },
  {
    strong: "Possession-risk handholding.",
    rest: "We drive by, ask the listing realtor on the record, and tell you what we find before you spend a dollar on inspection. If a property is tenanted, we explain the timeline and the cost so it's a known quantity.",
  },
  {
    strong: "Your fears are valid; here's what we do about them.",
    rest: "That's the entire job. We're not selling distressed property to nervous buyers — we're explaining a process that's unfairly opaque and walking with you through every step.",
  },
  {
    strong: "Decision timeline: weeks to months.",
    rest: "No rush. The Sheet runs on its own schedule. When a property fits and you're ready, we move fast. Until then, you read the daily list at your own pace.",
  },
];

export default function AudienceSplit() {
  return (
    <section id="who" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-6">
            Whether You&apos;re an Investor or a First-Time Buyer, This List Works for You.
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            Court-ordered sales aren&apos;t an investor-only sport. Roughly half the BC inventory
            in any given week is condo and townhouse stock under $700K — owner-occupier territory.
            The buyer-side rules are the same either way; the strategy is different. Here&apos;s how we run each side.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <article className="bg-eightyw-light border border-eightyw-border rounded-2xl overflow-hidden">
            <div className="relative aspect-[16/9] bg-eightyw-border">
              <Image
                src="/images/shared/lifestyle/investor-laptop.jpg"
                alt="Investor running ROI math on a court-ordered listing — gross yield, cash-on-cash, all-in carry."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-eightyw-blue text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="inline-block w-1 h-6 bg-brand-red rounded-full" />
                For Investors
              </h3>
              <ul className="space-y-4">
                {INVESTOR_BULLETS.map((b, i) => (
                  <li key={i} className="text-text-secondary text-sm md:text-base leading-relaxed">
                    <strong className="text-eightyw-blue">{b.strong}</strong> {b.rest}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="bg-eightyw-light border border-eightyw-border rounded-2xl overflow-hidden">
            <div className="relative aspect-[16/9] bg-eightyw-border">
              <Image
                src="/images/shared/lifestyle/owner-keys.jpg"
                alt="First-time buyers receiving keys to their new home — owner-occupier path through court-ordered sales."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-eightyw-blue text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="inline-block w-1 h-6 bg-brand-red rounded-full" />
                For Owner-Occupiers and First-Time Buyers
              </h3>
              <ul className="space-y-4">
                {OWNER_BULLETS.map((b, i) => (
                  <li key={i} className="text-text-secondary text-sm md:text-base leading-relaxed">
                    <strong className="text-eightyw-blue">{b.strong}</strong> {b.rest}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
