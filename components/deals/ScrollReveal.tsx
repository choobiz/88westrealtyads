"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Animated counter that counts up when scrolled into view */
function AnimatedCounter({ end, prefix = "", suffix = "", duration = 2 }: {
  end: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 80%", once: true },
      onUpdate: () => {
        el.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix;
      },
    });
  }, [end, prefix, suffix, duration]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/** A single reveal section with fade-in animation */
function RevealSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1, delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
  }, [delay]);

  return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>;
}

/** Horizontal bar that grows as you scroll */
function AnimatedBar({ width, color, label }: { width: string; color: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { width: "0%" },
      {
        width, duration: 1.5, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
  }, [width]);

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-white/80">{label}</span>
        <span className="text-white font-semibold">{width}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div ref={ref} className={`h-full rounded-full ${color}`} style={{ width: "0%" }} />
      </div>
    </div>
  );
}

export default function ScrollReveal() {
  const heroRef = useRef<HTMLDivElement>(null);
  // Images for background sections
  const bgImages = {
    hero: "/images/deals/scroll-hero-sunset.webp",
    priceSection: "/images/deals/scroll-aerial.webp",
    windowSection: "/images/deals/scroll-mountains.webp",
  };

  useEffect(() => {
    // Parallax on hero number
    const el = heroRef.current;
    if (!el) return;
    gsap.to(el, {
      y: -50,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
    });
  }, []);

  return (
    <div className="bg-med-navy">
      {/* Screen 1: The Big Number */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden" style={{ backgroundImage: `url(${bgImages.hero})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-med-navy/85" />
        <div ref={heroRef} className="text-center relative z-10">
          <p className="text-med-teal text-sm font-semibold tracking-[3px] uppercase mb-4">
            RIGHT NOW IN METRO VANCOUVER
          </p>
          <div className="text-white text-[80px] md:text-[140px] font-bold leading-none mb-4">
            <AnimatedCounter end={5458} duration={2.5} />
          </div>
          <p className="text-white/60 text-xl md:text-2xl font-medium">
            brand-new condos sit unsold
          </p>
          <p className="text-white/40 text-sm mt-4">
            The highest inventory in 24 years. Scroll to see what this means for you.
          </p>
          <div className="mt-12 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Screen 2: The Price Drop */}
      <section className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-[800px] mx-auto w-full">
          <RevealSection>
            <p className="text-med-teal text-xs font-semibold tracking-[3px] uppercase mb-6">THE MARKET HAS SHIFTED</p>
            <h2 className="text-white text-[36px] md:text-[56px] font-bold leading-[1.05] mb-8">
              Prices are back to<br />
              <span className="text-med-teal">2020 levels.</span>
            </h2>
          </RevealSection>

          <RevealSection delay={0.3} className="space-y-4 mt-8">
            <AnimatedBar width="100%" color="bg-white/30" label="2022 Peak Price" />
            <AnimatedBar width="94%" color="bg-white/20" label="2023 — Down 6%" />
            <AnimatedBar width="85%" color="bg-white/20" label="2024 — Down 15%" />
            <AnimatedBar width="75%" color="bg-med-teal" label="2026 — Down 25%" />
          </RevealSection>

          <RevealSection delay={0.5} className="mt-10">
            <p className="text-white/60 text-lg leading-relaxed max-w-[600px]">
              Condo benchmarks have dropped <span className="text-white font-semibold">5.9% year-over-year</span>.
              In Burnaby, price per square foot fell <span className="text-white font-semibold">10.5% in under a year</span>.
              Developers are not just dropping prices — they&apos;re stacking incentives on top.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Screen 3: The Incentive Stack */}
      <section className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-[800px] mx-auto w-full">
          <RevealSection>
            <p className="text-med-teal text-xs font-semibold tracking-[3px] uppercase mb-6">
              THE MOST AGGRESSIVE INCENTIVES SINCE 2018
            </p>
            <h2 className="text-white text-[36px] md:text-[56px] font-bold leading-[1.05] mb-12">
              $100,000+ in savings.<br />
              <span className="text-white/40">Hidden in plain sight.</span>
            </h2>
          </RevealSection>

          <div className="space-y-6">
            {[
              { label: "5% Deposit (vs 15-20% traditional)", amount: 10500, icon: "🏦", delay: 0.1 },
              { label: "Developer Cash Credit", amount: 40000, icon: "💰", delay: 0.2 },
              { label: "Free Parking + Storage", amount: 50000, icon: "🅿️", delay: 0.3 },
              { label: "GST Rebate (first-time buyers)", amount: 35000, icon: "🏛️", delay: 0.4 },
              { label: "PTT Exemption (BC)", amount: 8000, icon: "📋", delay: 0.5 },
            ].map((item) => (
              <RevealSection key={item.label} delay={item.delay}>
                <div className="flex items-center gap-4 bg-white/5 rounded-xl p-5 border border-white/10">
                  <span className="text-3xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-white/70 text-sm">{item.label}</p>
                  </div>
                  <span className="text-med-teal text-xl font-bold">
                    -<AnimatedCounter end={item.amount} prefix="$" duration={1.5} />
                  </span>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={0.7} className="mt-10">
            <div className="bg-brand-red/20 border border-brand-red/40 rounded-xl p-6 text-center">
              <p className="text-white/60 text-sm uppercase tracking-wider mb-2">TOTAL POTENTIAL SAVINGS</p>
              <div className="text-brand-red text-[48px] md:text-[64px] font-bold">
                $<AnimatedCounter end={175000} duration={2} />
              </div>
              <p className="text-white/50 text-sm mt-2">on a $700,000 condo</p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Screen 4: The Window */}
      <section className="min-h-[70vh] flex items-center px-6 py-20 relative" style={{ backgroundImage: `url(${bgImages.windowSection})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-med-navy/90" />
        <div className="max-w-[800px] mx-auto w-full text-center relative z-10">
          <RevealSection>
            <p className="text-med-teal text-xs font-semibold tracking-[3px] uppercase mb-6">
              BUT HERE&apos;S THE THING
            </p>
            <h2 className="text-white text-[32px] md:text-[52px] font-bold leading-[1.1] mb-6">
              Only 64 presale units launched last month.
            </h2>
            <p className="text-white/50 text-lg mb-2">
              Normal month: 1,100+ units. February 2026: <span className="text-white font-bold">64.</span>
            </p>
            <p className="text-white/50 text-lg mb-10">
              The supply pipeline is <span className="text-brand-red font-bold">dead</span>. When these 5,458 units are gone,
              the shortage returns. BCREA forecasts a <span className="text-white font-bold">27% price jump by 2032</span>.
            </p>
          </RevealSection>

          <RevealSection delay={0.3}>
            <div className="inline-block bg-white/5 border border-white/20 rounded-2xl px-8 py-6">
              <p className="text-white/40 text-sm mb-1">The window is open</p>
              <p className="text-white text-2xl font-bold">but it won&apos;t stay open.</p>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
