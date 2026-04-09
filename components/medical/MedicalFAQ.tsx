"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  { q: "What is the price per square foot?", a: "Pre-sale pricing starts at approximately $640/SF, with unit sizes from 1,000 SF. Final pricing depends on floor, views, and unit configuration. Register for the current price list." },
  { q: "What are the monthly strata fees?", a: "Estimated strata fees include building insurance, common area maintenance, elevator service, and reserve fund contributions. Medical-grade buildings typically have slightly higher strata fees than residential due to specialized systems. Estimated range: $0.50-$0.75/SF/month." },
  { q: "Can I get financing for a medical strata unit?", a: "Yes. Several major Canadian banks offer commercial mortgage products for medical strata. Typical terms: 25-year amortization, 65-75% LTV, competitive commercial rates. Some lenders offer preferential rates for medical professionals. We can connect you with experienced commercial mortgage brokers." },
  { q: "Who can buy a unit?", a: "Units are available to medical professionals, healthcare organizations, and investors. Owner-occupants and investor-owners are welcome. The strata will have use restrictions ensuring the building maintains its medical/healthcare focus." },
  { q: "When is completion?", a: "Construction is targeted for 2028 completion. Pre-sale purchasers secure current pricing and can customize their units during the design phase. A detailed construction timeline is available upon registration." },
  { q: "Can I customize my unit?", a: "Pre-sale purchasers have significant customization options: interior layout, exam room configuration, reception design, specialized plumbing, and electrical. The developer works with your architect to ensure your space meets your clinical requirements." },
];

export default function MedicalFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="max-w-[800px] mx-auto px-5 md:px-6">
        <h2 className="text-med-navy text-[26px] md:text-[38px] font-bold leading-[1.15] text-center mb-10">
          Common Questions
        </h2>
        <div className="divide-y divide-med-border">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <button onClick={() => setOpenIndex(openIndex === i ? -1 : i)} className="w-full flex items-center justify-between py-5 text-left group" aria-expanded={openIndex === i}>
                <span className="text-med-navy text-[17px] font-semibold pr-4 group-hover:text-med-teal transition-colors">{item.q}</span>
                <ChevronDown className={`w-5 h-5 text-text-muted shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96 pb-5" : "max-h-0"}`}>
                <p className="text-text-secondary text-base leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
