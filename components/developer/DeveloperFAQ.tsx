"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is a presale safer than a resale in 2026?",
    a: `Different risk profile, not safer or riskier as a category. Pre-sale risk lives in the completion timeline, the developer's financial health, and the assignment of the contract before close. Resale risk lives in deficiencies you can't see, dated systems, and special-levy exposure on older buildings. In 2026, the pre-sale incentive environment is the strongest since 2018. We screen for the projects that have the financial backing and stage of construction to make the wait worthwhile.`,
  },
  {
    q: "What's the GST rebate on a new home, and do I qualify?",
    a: `Bill C-4 expanded the federal GST New Housing Rebate in 2026. On a new home priced up to $1M, eligible buyers can recover up to $50,000 in GST. The full rebate phases out between $1M and $1.5M. Eligibility is broader for first-time buyers but available to other purchaser categories too. We verify eligibility on every project we shortlist for you.`,
  },
  {
    q: "How do incentive packages stack?",
    a: `A typical 2026 stack on a $700K Greater Vancouver pre-sale combines a 5% deposit, a $25K–$50K cash credit at completion, free parking ($28K–$48K), an interest-rate buy-down (worth $10K–$30K in NPV terms), waived assignment fees, and sometimes a strata-fee holiday. Total cash-equivalent value: $80K–$120K. We itemize every concession in your shortlist so you know which dollars are real and which are upgrade-list inflation.`,
  },
  {
    q: "When are builder concessions actually negotiable?",
    a: `Always — but the leverage compounds with the developer's absorption clock. The bigger the unsold inventory and the closer they are to triggering a lender's absorption covenant, the more flexible the published incentives become. At 60–80% sold, what's published is the floor, not the ceiling. Earlier and later in the cycle, you're negotiating from a weaker position. We tag absorption status on every project we screen for you.`,
  },
  {
    q: "What's an assignment, and should I consider one?",
    a: `An assignment is a transfer of a pre-sale purchase contract from the original buyer to a new buyer before the building completes. In 2026, original buyers from 2021–2022 are sometimes assigning at or below their original purchase price to escape the contract. For the new buyer, that can mean acquiring a 30–50% built unit below current Stage 2 pricing — but with friction: financing is harder, the developer's consent is required, and re-marketing on MLS is often restricted. Worth considering in specific cases. We screen these for you.`,
  },
  {
    q: "Is 88 West Realty actually a buyer-side brokerage, or a builder-paid sales arm?",
    a: `Buyer-side. We don't take any retainer or marketing fee from the developers we cover. Our compensation is the buyer-agent commission the developer pays at closing on your behalf per BC's Real Estate Services Act — the same way buyer-agency works on a resale. You don't get a bill from us. We don't shortlist based on which developer pays best; we shortlist based on which deals are best for buyers.`,
  },
  {
    q: "Will Vancouver condo prices recover by 2027?",
    a: `BCREA forecasts roughly 3% growth in 2026 and a potential 27% appreciation by 2032. Only 64 pre-sale homes launched in February 2026 — about 6% of typical monthly volume. The supply pipeline three years out is already shrinking. The math is straightforward: today's incentive window exists because of today's standing inventory. Once that inventory clears, the incentives come off and the supply cliff hits. Whether you buy now is your call. We'll show you what's available while the window is open.`,
  },
];

export default function DeveloperFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-eightyw-light py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-eightyw-blue text-center mb-10">
          Frequently Asked Questions About Vancouver Developer Deals.
        </h2>

        <div className="bg-white border border-eightyw-border rounded-2xl overflow-hidden divide-y divide-eightyw-border">
          {FAQS.map((f, i) => {
            const open = openIndex === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4 group"
                  aria-expanded={open}
                >
                  <span className="text-eightyw-blue font-semibold text-base md:text-lg group-hover:text-brand-red transition-colors pr-4">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-eightyw-blue/60 shrink-0 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-text-secondary text-sm md:text-base leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
