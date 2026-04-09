import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  heading: string;
  body: string;
  ctaText: string;
}

export default function FinalCTA({ heading, body, ctaText }: FinalCTAProps) {
  return (
    <section className="bg-med-teal py-16 md:py-24">
      <div className="max-w-[720px] mx-auto px-5 md:px-6 text-center">
        <h2 className="text-white text-[26px] md:text-[38px] font-bold leading-[1.15] mb-5">
          {heading}
        </h2>
        <p className="text-white/70 text-base md:text-[17px] leading-relaxed mb-8 max-w-[600px] mx-auto">
          {body}
        </p>
        <a href="#register" className="inline-flex items-center justify-center h-[52px] px-8 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px]">
          {ctaText}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
