import { ArrowRight } from "lucide-react";

export default function DeveloperFinalCTA() {
  return (
    <section className="bg-eightyw-light border-t border-eightyw-border py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-t-4 border-brand-red border border-eightyw-border rounded-2xl p-6 md:p-10 text-center shadow-sm">
          <p className="text-brand-red text-[13px] font-semibold uppercase tracking-[2px] mb-3">
            BOOK A FREE CONSULTATION
          </p>
          <p className="text-eightyw-blue text-xl md:text-2xl font-bold leading-relaxed mb-4">
            Tell us your buy-box. We negotiate the stack on your behalf — building by building.
          </p>
          <p className="text-text-secondary text-sm md:text-base mb-8">
            Free, buyer-side only. We call within 24 hours. No fee charged to buyers.
          </p>
          <a
            href="#register"
            className="inline-flex items-center justify-center h-[52px] px-8 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px] shadow-[0_10px_30px_rgba(197,34,4,0.3)]"
          >
            Book My Free Consultation
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-text-muted text-xs mt-5">
            Licensed BC brokerage · 88 West Realty · #X031527 · 970 Marine Drive, North Vancouver · 604-281-1828
          </p>
        </div>
      </div>
    </section>
  );
}
