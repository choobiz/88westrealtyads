"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface SavingsItem {
  label: string;
  getAmount: (price: number) => number;
  condition?: "first-time" | "all";
}

interface SavingsCalculatorProps {
  /** Show first-time buyer savings (GST, PTT) */
  firstTimeBuyer?: boolean;
  /** Min slider value */
  min?: number;
  /** Max slider value */
  max?: number;
  /** Default price */
  defaultPrice?: number;
  /** CTA text */
  ctaText?: string;
  /** Show rent comparison */
  showRentComparison?: boolean;
}

const formatter = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
const fmt = (n: number) => formatter.format(n);

export default function SavingsCalculator({
  firstTimeBuyer = false,
  min = 400000,
  max = 1500000,
  defaultPrice = 700000,
  ctaText = "See Deals That Match →",
  showRentComparison = false,
}: SavingsCalculatorProps) {
  const [price, setPrice] = useState(defaultPrice);

  const savings: SavingsItem[] = [
    { label: "Market Discount (vs 2022)", getAmount: (p) => Math.round(p * 0.06) },
    { label: "Developer Cash Credit", getAmount: () => 40000 },
    { label: "Free Parking + Storage", getAmount: () => 50000 },
    ...(firstTimeBuyer
      ? [
          { label: "GST Rebate (federal)", getAmount: (p: number) => Math.round(p * 0.05), condition: "first-time" as const },
          { label: "PTT Exemption (BC)", getAmount: (p: number) => p <= 835000 ? Math.min(8000, p * 0.01) : 0, condition: "first-time" as const },
        ]
      : []),
  ];

  const totalSavings = savings.reduce((sum, s) => sum + s.getAmount(price), 0);
  const effectivePrice = price - totalSavings;
  const monthlyMortgage = Math.round((effectivePrice * 0.95 * 0.0354) / 12 / (1 - Math.pow(1 + 0.0354 / 12, -300)));
  const avgRent = 2630;

  const pct = ((price - min) / (max - min)) * 100;

  return (
    <section className="bg-med-light py-16 md:py-24">
      <div className="max-w-[600px] mx-auto px-5 md:px-6">
        <h2 className="text-med-navy text-[22px] md:text-[28px] font-bold text-center mb-2">
          {firstTimeBuyer ? "How Much Will You Actually Pay?" : "How Much Could You Save?"}
        </h2>
        <p className="text-text-secondary text-sm text-center mb-8">
          {firstTimeBuyer
            ? "See your real price after all savings are applied."
            : "Slide to set your budget. See your real savings."}
        </p>

        <div className="bg-white rounded-2xl p-5 md:p-8 border border-med-border shadow-lg">
          {/* Budget display */}
          <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest mb-1">
            {firstTimeBuyer ? "HOME PRICE" : "YOUR BUDGET"}
          </p>
          <p className="text-med-navy text-[34px] font-bold mb-4">{fmt(price)}</p>

          {/* Slider */}
          <div className="relative mb-2">
            <input
              type="range"
              min={min}
              max={max}
              step={5000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-med-teal"
              style={{
                background: `linear-gradient(to right, #1B7A6E ${pct}%, #E2E8F0 ${pct}%)`,
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-text-muted mb-6">
            <span>{fmt(min)}</span>
            <span>{fmt(max)}</span>
          </div>

          <div className="h-px bg-med-border mb-4" />

          {/* Breakdown */}
          <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest mb-3">
            YOUR SAVINGS BREAKDOWN
          </p>
          <div className="space-y-2 mb-4">
            {savings.map((s) => (
              <div key={s.label} className="flex justify-between items-center">
                <span className="text-text-secondary text-[13px]">{s.label}</span>
                <span className="text-med-teal text-[14px] font-semibold">-{fmt(s.getAmount(price))}</span>
              </div>
            ))}
          </div>

          <div className="h-[2px] bg-med-navy mb-3" />

          {/* Total */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-med-navy text-[14px] font-bold">TOTAL SAVINGS</span>
            <span className="text-brand-red text-[22px] font-bold">{fmt(totalSavings)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-text-secondary text-[13px] font-medium">Effective Price</span>
            <span className="text-med-navy text-[17px] font-bold">{fmt(effectivePrice)}</span>
          </div>

          {/* Rent vs Own comparison */}
          {showRentComparison && (
            <>
              <div className="h-px bg-med-border mb-4" />
              <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest mb-3">
                MONTHLY COMPARISON
              </p>
              <div className="flex gap-3 mb-3">
                <div className="flex-1 bg-red-50 rounded-xl p-3 text-center">
                  <p className="text-text-muted text-[11px]">Current Rent</p>
                  <p className="text-brand-red text-[17px] font-bold">${avgRent.toLocaleString()}/mo</p>
                </div>
                <div className="flex items-center text-text-muted text-sm font-medium">vs</div>
                <div className="flex-1 bg-emerald-50 rounded-xl p-3 text-center">
                  <p className="text-text-muted text-[11px]">Mortgage</p>
                  <p className="text-emerald-600 text-[17px] font-bold">${monthlyMortgage.toLocaleString()}/mo</p>
                </div>
              </div>
              {monthlyMortgage < avgRent && (
                <div className="bg-emerald-50 rounded-lg py-2 text-center">
                  <p className="text-emerald-600 text-[13px] font-semibold">
                    You save ${(avgRent - monthlyMortgage).toLocaleString()}/month by owning
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* CTA */}
        <a
          href="#register"
          className="mt-6 w-full h-[52px] bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-[15px]"
        >
          {ctaText}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
