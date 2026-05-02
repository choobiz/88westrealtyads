import Image from "next/image";

const INVESTORS = [
  "Gross and net yield at the post-incentive purchase price — not the list price",
  "Assignment-clause review (waived fees vs. permitted re-marketing — these are not the same right)",
  "Deposit-structure negotiation: how the published 5% can stretch to 10% over 24 months without principal acceleration",
  "Exit math: what assignment looks like 18 months in if rates move",
  "Strata-fee reality at year two — after the fee holiday lapses",
];

const OWNER_OCCUPIERS = [
  "What does $100K off mean compared to a comparable resale unit two blocks away — and is the trade-off in age, deficiencies, and warranty worth it?",
  `What's actually behind the "decorating allowance" — credit at the developer's design centre, or cash at closing?`,
  "When the building completes, what's on the deficiency punch-list, and who signs off?",
  "What's the realistic move-in date — and what does the contract say if it slips?",
  "If you've never bought new construction before, what does the 2-5-10 year warranty actually cover?",
];

export default function DeveloperAudienceSplit() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue mb-6">
            The Tracker Works for Three Different Buyers. Here&apos;s Which One You Are.
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            The same incentive stack means different things to a yield-focused investor, a couple shopping
            their forever home, and a first-time buyer stacking government rebates. The Tracker delivers
            the same data; the playbook around it is different.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <article className="bg-eightyw-light border border-eightyw-border rounded-2xl overflow-hidden">
            <div className="relative aspect-[16/9] bg-eightyw-border">
              <Image
                src="/images/shared/lifestyle/investor-laptop.jpg"
                alt="Investor reviewing post-incentive purchase price math on a laptop — running the numbers before signing."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
            <h3 className="text-eightyw-blue text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-brand-red rounded-full" />
              For Investors
            </h3>
            <p className="text-text-secondary text-sm md:text-base font-medium mb-4">
              The numbers that matter:
            </p>
            <ul className="space-y-3 text-text-secondary text-sm md:text-base leading-relaxed">
              {INVESTORS.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-brand-red shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-eightyw-blue text-sm md:text-base font-semibold leading-relaxed">
              We model this for you on every Tracker entry that fits your buy-box. Subscribers also get
              our monthly &ldquo;best yields after stack&rdquo; shortlist.
            </p>
            </div>
          </article>

          <article className="bg-eightyw-light border border-eightyw-border rounded-2xl overflow-hidden">
            <div className="relative aspect-[16/9] bg-eightyw-border">
              <Image
                src="/images/shared/lifestyle/owner-keys.jpg"
                alt="Couple receiving keys to their new home — the owner-occupier path through new-construction pre-sale incentives."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
            <h3 className="text-eightyw-blue text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-brand-red rounded-full" />
              For Owner-Occupiers
            </h3>
            <p className="text-text-secondary text-sm md:text-base font-medium mb-4">
              The questions we answer for you:
            </p>
            <ul className="space-y-3 text-text-secondary text-sm md:text-base leading-relaxed">
              {OWNER_OCCUPIERS.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-brand-red shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-eightyw-blue text-sm md:text-base font-semibold leading-relaxed">
              We walk you through the answers on a 30-minute call. No buyer-agency required to talk.
            </p>
            </div>
          </article>
        </div>

        <article className="bg-eightyw-blue text-white rounded-2xl p-6 md:p-8 border-l-4 border-brand-red">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="inline-block w-1 h-6 bg-brand-red rounded-full" />
            For First-Time Buyers
          </h3>
          <p className="text-white/85 text-sm md:text-base leading-relaxed mb-3">
            The headline number is bigger than $100K. The federal GST rebate, BC&apos;s property
            transfer tax exemption, your FHSA, and your RRSP HBP withdrawal stack on top of the
            developer&apos;s incentive. On a $700K Vancouver pre-sale, that&apos;s roughly{" "}
            <span className="text-white font-semibold">$43K from the government plus $40K from the
            developer. Total: $83K off.</span>
          </p>
          <a
            href="/first-time-buyer-vancouver"
            className="inline-flex items-center gap-2 text-white font-semibold underline underline-offset-4 hover:text-white/80 transition-colors"
          >
            Read the rebate-stacking playbook →
          </a>
        </article>
      </div>
    </section>
  );
}
