import { ArrowRight } from "lucide-react";

export default function GuaranteeAndFinalCTA() {
  return (
    <section className="bg-eightyw-light border-t border-eightyw-border py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-t-4 border-brand-red border border-eightyw-border rounded-2xl p-6 md:p-10 text-center shadow-sm">
          <p className="text-brand-red text-[13px] font-semibold uppercase tracking-[2px] mb-3">
            THE 30-DAY MATCH GUARANTEE
          </p>
          <p className="text-eightyw-blue text-xl md:text-2xl font-bold leading-relaxed mb-4">
            If we don&apos;t surface a match within 30 days of the intro call, our broker
            hand-searches off-market alternatives on your behalf — no charge, no obligation.
          </p>
          <p className="text-text-secondary text-sm md:text-base mb-8">
            You tell us what you&apos;re looking for. We do the hunting that nothing else gets you.
          </p>
          <a
            href="#register"
            className="inline-flex items-center justify-center h-[52px] px-8 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px] shadow-[0_10px_30px_rgba(197,34,4,0.3)]"
          >
            Find My Next Deal
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-text-muted text-xs mt-4">
            We&apos;re tracking ~389 active BC court-ordered listings right now.
          </p>
        </div>
      </div>
    </section>
  );
}
