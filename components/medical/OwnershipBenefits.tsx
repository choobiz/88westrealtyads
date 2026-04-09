import { TrendingUp, Shield, PieChart, Landmark, Award } from "lucide-react";

const BENEFITS = [
  { icon: TrendingUp, title: "Equity Creation", desc: "Every mortgage payment builds wealth. Stop paying your landlord's mortgage and start building your own asset." },
  { icon: Shield, title: "Control & Security", desc: "No more lease renewals, rent hikes, or landlord restrictions. Own your space, control your practice environment." },
  { icon: PieChart, title: "Portfolio Diversification", desc: "Healthcare real estate is one of the most recession-resistant asset classes. Diversify beyond RRSPs and your primary residence." },
  { icon: Landmark, title: "Access to Capital", desc: "Commercial ownership unlocks financing options unavailable to tenants — use equity for practice expansion or additional units." },
  { icon: Award, title: "Succession & Practice Value", desc: "Your practice is worth more when it comes with real estate. Sell or lease your unit when you're ready to retire." },
];

export default function OwnershipBenefits() {
  return (
    <section id="benefits" className="bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <h2 className="text-med-navy text-[26px] md:text-[38px] font-bold leading-[1.15] text-center mb-12">
          Why Own Instead of Lease?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className={`border border-med-border rounded-xl p-6 md:p-7 ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <div className="w-12 h-12 rounded-xl bg-brand-red/8 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-red" />
                </div>
                <h3 className="text-med-navy text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-text-secondary text-[15px] leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
