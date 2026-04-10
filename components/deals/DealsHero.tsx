import { ArrowRight } from "lucide-react";

interface DealsHeroProps {
  badge: string;
  badgeColor?: "red" | "teal";
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaText: string;
}

export default function DealsHero({ badge, badgeColor = "red", eyebrow, headline, subheadline, ctaText }: DealsHeroProps) {
  const badgeBg = badgeColor === "teal" ? "bg-med-teal" : "bg-brand-red";

  return (
    <section className="relative bg-med-navy overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-24">
        <div className="max-w-[680px]">
          <span className={`inline-flex items-center h-7 px-4 ${badgeBg} text-white text-[10px] font-semibold rounded-full mb-5 tracking-wide uppercase`}>
            {badge}
          </span>
          <p className="text-med-teal text-[11px] font-semibold uppercase tracking-[2px] mb-4">
            {eyebrow}
          </p>
          <h1 className="text-white text-[30px] md:text-[48px] font-bold leading-[1.1] mb-5">
            {headline}
          </h1>
          <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed mb-8 max-w-[560px]">
            {subheadline}
          </p>
          <a
            href="#calculator"
            className="inline-flex items-center justify-center h-[52px] px-8 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px]"
          >
            {ctaText}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
