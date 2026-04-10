import { TrendingUp, Receipt, Puzzle, Wallet } from "lucide-react";

const BENEFITS = [
  { icon: TrendingUp, title: "Build Equity", desc: "Monthly payments build your wealth, not your landlord's. Medical strata values appreciate with the market." },
  { icon: Receipt, title: "Tax Advantages", desc: "Depreciation, mortgage interest deduction, and capital cost allowance reduce your tax burden significantly." },
  { icon: Puzzle, title: "Design Control", desc: "Your space, your layout, your brand. Customize every detail to match your clinical workflow." },
  { icon: Wallet, title: "Retirement Asset", desc: "Sell or lease your unit when you retire. Your practice space becomes a valuable income-generating asset." },
];

export default function OwnershipBenefits() {
  return (
    <section id="benefits" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-med-navy mb-4">Why Own Instead of Lease?</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="bg-med-light p-8 rounded-xl border border-med-border">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-med-teal" />
                </div>
                <h3 className="font-semibold text-med-navy text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-text-secondary">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
