import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface MedicalHeroProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  badge?: string;
  bgImage: string;
}

export default function MedicalHero({ eyebrow, headline, subheadline, ctaText, badge, bgImage }: MedicalHeroProps) {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Preloaded hero image via next/image for speed */}
      <Image
        src={bgImage}
        alt="North Shore Health Pavilion medical strata building exterior on Marine Drive, North Vancouver"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-med-navy/95 via-med-navy/85 to-med-navy/50" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-6 relative z-10 py-20 md:py-28">
        <div className="max-w-[680px]">
          {badge && (
            <span className="inline-flex items-center h-8 px-4 bg-brand-red text-white text-xs font-semibold rounded-full mb-6 tracking-wide uppercase">
              {badge}
            </span>
          )}
          <p className="text-med-teal text-[13px] font-semibold uppercase tracking-[2px] mb-4">
            {eyebrow}
          </p>
          <h1 className="text-white text-[32px] md:text-[52px] font-bold leading-[1.08] mb-6">
            {headline}
          </h1>
          <p className="text-white/75 text-base md:text-[18px] leading-relaxed mb-10 max-w-[580px]">
            {subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#register" className="inline-flex items-center justify-center h-[52px] px-8 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px]">
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="tel:+16042811828" className="inline-flex items-center justify-center h-[52px] px-8 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all gap-2 text-[15px]">
              Call 604-281-1828
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
