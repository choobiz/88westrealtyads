import { ArrowRight } from "lucide-react";
import foreclosureStats from "@/data/foreclosure-stats.json";

export default function GuaranteeAndFinalCTA() {
  return (
    <section className="bg-eightyw-light border-t border-eightyw-border py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-t-4 border-brand-red border border-eightyw-border rounded-2xl p-6 md:p-10 text-center shadow-sm">
          <p className="text-brand-red text-[13px] font-semibold uppercase tracking-[2px] mb-3">
            YOUR FREE 48-HOUR DEAL SHORTLIST
          </p>
          <p className="text-eightyw-blue text-xl md:text-2xl font-bold leading-relaxed mb-4">
            A personalized court-ordered shortlist — in your inbox within 48 hours.
          </p>
          <p className="text-text-secondary text-sm md:text-base mb-8">
            Tell us your budget and target areas on the intro call. Within 48 hours
            of that call you get a written shortlist of 3–5 current court-ordered
            listings matched to you — each with its court date, a comparable-sales
            read, and a possession-risk rating. A $500 analysis, yours free with
            no obligation.
          </p>
          <a
            href="#register"
            className="inline-flex items-center justify-center h-[52px] px-8 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px] shadow-[0_10px_30px_rgba(197,34,4,0.3)]"
          >
            Find My Next Deal
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-text-muted text-xs mt-4">
            We&apos;re tracking ~{foreclosureStats.marketingNumber} active BC court-ordered listings right now.
          </p>
        </div>
      </div>
    </section>
  );
}
