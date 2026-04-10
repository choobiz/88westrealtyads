"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

export default function DealsFAQ({ items, title = "Common Questions" }: { items: FAQItem[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[800px] mx-auto px-5">
        <h2 className="text-med-navy text-[22px] md:text-[28px] font-bold text-center mb-10">{title}</h2>
        <div className="divide-y divide-med-border">
          {items.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-med-navy text-[15px] font-semibold pr-4 group-hover:text-med-teal transition-colors">
                  {item.q}
                </span>
                <ChevronDown className={`w-5 h-5 text-text-muted shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96 pb-5" : "max-h-0"}`}>
                <p className="text-text-secondary text-[14px] leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
