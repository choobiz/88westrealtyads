"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is buying a foreclosure in BC safe?",
    a: "BC court-ordered sales are court-supervised, so the title is clear at closing. The risks aren't title-related — they're \"as-is, where-is\" condition risk, court-date outbid risk, and (rarely) possession risk if the former owner is still in the home. Working with a court-experienced buyer-side broker mitigates each of these.",
  },
  {
    q: "What's the difference between a foreclosure and a court-ordered sale in BC?",
    a: "In BC they're the same thing. The legal mechanism is a \"judicial sale\" supervised by the BC Supreme Court. Ontario uses \"power of sale\" instead, which is contractual — no court oversight required. BC's process is slower but the title is cleaner.",
  },
  {
    q: "Can a first-time buyer purchase a court-ordered sale in Vancouver?",
    a: "Yes. Most major Canadian banks finance court-ordered purchases at standard rates and ratios; a few B-lenders refuse, so your mortgage broker matters. The bigger consideration is risk tolerance: you accept the property \"as-is\" and may face a competing bid at the court approval hearing. We provide pre-approval intros and walk you through every step.",
  },
  {
    q: "What is Schedule A in a BC foreclosure?",
    a: "Schedule A is the lender/court addendum attached to every court-ordered sale offer in BC. It releases the lender and former owner from any condition, warranty, or disclosure responsibility. Holes in walls, missing appliances, surprise liens — all your problem. We draft it with you and explain every line before you sign.",
  },
  {
    q: "What happens at the foreclosure court date?",
    a: "The lender's lawyer applies to BC Supreme Court for sale approval. Other buyers can show up with competing subject-free offers; the judge usually awards to the highest bid. Your broker can attend on your behalf and submit improved offers if needed. Once approved, completion typically follows in 1–10 days.",
  },
  {
    q: "Can I get a mortgage on a court-ordered sale?",
    a: "Yes. Most major Canadian banks finance court-ordered purchases at standard rates and amortizations. The catch is that your offer typically needs to be subject-free at the court date — meaning fully approved, not just pre-approved. We introduce you to three Vancouver-area mortgage brokers who close these files weekly.",
  },
  {
    q: "Do I need a realtor to buy a foreclosure in BC?",
    a: "You don't have to use one, but BC's process makes it expensive to go alone. Schedule A drafting, court-date attendance, and possession-risk research aren't standard parts of a typical realtor's workflow — they're foreclosure-specific. We're buyer-side only, sellers pay our commission, and the engagement costs you nothing on the property itself.",
  },
];

export default function ForeclosureFAQ() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="faq" className="bg-med-light py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-med-navy text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="bg-white border border-med-border rounded-2xl overflow-hidden divide-y divide-med-border">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between text-left p-5 md:p-6 group"
                  aria-expanded={isOpen}
                >
                  <span className="text-med-navy font-semibold text-base md:text-lg group-hover:text-med-teal transition-colors pr-4">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-med-navy/60 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-5 md:px-6 pb-5 md:pb-6 text-text-secondary text-base leading-relaxed">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
