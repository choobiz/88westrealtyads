"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, X, Heart, RotateCcw } from "lucide-react";
import type { Deal } from "./DealCard";

interface SwipeDealsProps {
  deals: Deal[];
}

export default function SwipeDeals({ deals }: SwipeDealsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchDelta, setTouchDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isFinished = currentIndex >= deals.length;
  const current = deals[currentIndex];

  function swipe(dir: "left" | "right") {
    setDirection(dir);
    if (dir === "right") {
      setLiked((prev) => [...prev, currentIndex]);
    }
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDirection(null);
      setTouchDelta(0);
    }, 300);
  }

  function reset() {
    setCurrentIndex(0);
    setLiked([]);
    setDirection(null);
    setTouchDelta(0);
  }

  function handleTouchStart(e: React.TouchEvent) {
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - touchStart;
    setTouchDelta(delta);
  }

  function handleTouchEnd() {
    setIsDragging(false);
    if (Math.abs(touchDelta) > 80) {
      swipe(touchDelta > 0 ? "right" : "left");
    } else {
      setTouchDelta(0);
    }
  }

  const TAG_COLORS: Record<string, string> = {
    red: "bg-brand-red", teal: "bg-med-teal", navy: "bg-med-navy", green: "bg-emerald-600",
  };

  return (
    <section className="bg-med-navy py-16 md:py-24 overflow-hidden">
      <div className="max-w-[440px] mx-auto px-5">
        <p className="text-med-teal text-xs font-semibold tracking-[3px] uppercase text-center mb-2">
          SWIPE THROUGH DEALS
        </p>
        <h2 className="text-white text-[24px] md:text-[32px] font-bold text-center mb-2">
          {isFinished ? `You liked ${liked.length} deal${liked.length !== 1 ? "s" : ""}` : "Find Your Deal"}
        </h2>
        <p className="text-white/50 text-sm text-center mb-8">
          {isFinished
            ? "Register to get details on your saved deals."
            : "Swipe right if you're interested, left to skip."}
        </p>

        {/* Card Stack */}
        <div className="relative h-[480px] mb-6">
          {isFinished ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-med-teal/20 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-10 h-10 text-med-teal" />
              </div>
              <p className="text-white text-xl font-bold mb-2">
                {liked.length > 0 ? "Great taste!" : "No deals saved"}
              </p>
              {liked.length > 0 && (
                <p className="text-white/50 text-sm mb-6 max-w-[280px]">
                  You saved {liked.length} deal{liked.length !== 1 ? "s" : ""}.
                  Register below and we&apos;ll send you pricing, floor plans, and availability for each one.
                </p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-5 h-10 border border-white/20 text-white/70 rounded-full text-sm hover:bg-white/5"
                >
                  <RotateCcw className="w-4 h-4" /> Start Over
                </button>
                {liked.length > 0 && (
                  <a
                    href="#register"
                    className="flex items-center gap-2 px-5 h-10 bg-brand-red text-white rounded-full text-sm font-semibold hover:bg-brand-red-hover"
                  >
                    Get My Deals <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Next card preview (behind) */}
              {currentIndex + 1 < deals.length && (
                <div className="absolute inset-0 scale-[0.95] opacity-50 rounded-2xl bg-white/10 border border-white/10" />
              )}

              {/* Current card */}
              <div
                ref={cardRef}
                className={`absolute inset-0 bg-white rounded-2xl overflow-hidden shadow-2xl transition-transform ${
                  direction === "left" ? "animate-swipe-left" : direction === "right" ? "animate-swipe-right" : ""
                }`}
                style={{
                  transform: isDragging ? `translateX(${touchDelta}px) rotate(${touchDelta * 0.05}deg)` : undefined,
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Swipe indicators */}
                {touchDelta > 40 && (
                  <div className="absolute top-6 left-6 z-10 bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg rotate-[-15deg] border-2 border-emerald-300 text-lg">
                    INTERESTED ❤️
                  </div>
                )}
                {touchDelta < -40 && (
                  <div className="absolute top-6 right-6 z-10 bg-red-500 text-white font-bold px-4 py-2 rounded-lg rotate-[15deg] border-2 border-red-300 text-lg">
                    SKIP ✕
                  </div>
                )}

                {/* Image */}
                <div className="relative h-[220px] bg-gradient-to-br from-slate-200 to-slate-300">
                  {current.image ? (
                    <Image src={current.image} alt={current.project} fill className="object-cover" sizes="440px" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">Project Photo</div>
                  )}
                  <span className={`absolute top-3 left-3 ${TAG_COLORS[current.tagColor]} text-white text-[10px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-lg`}>
                    {current.tag}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-medium px-2.5 py-1 rounded-lg">
                    {current.completion}
                  </span>

                  {/* Card count */}
                  <span className="absolute top-3 right-3 bg-black/40 text-white text-[10px] font-medium px-2 py-1 rounded-md">
                    {currentIndex + 1} / {deals.length}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-med-navy text-xl font-bold mb-1">{current.project}</h3>
                  <p className="text-text-secondary text-sm mb-4">{current.location} · {current.unitType}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-med-navy text-2xl font-bold">{current.currentPrice}</span>
                    <span className="text-text-muted text-sm line-through">{current.originalPrice}</span>
                    <span className="bg-emerald-50 text-med-teal text-xs font-semibold px-2 py-1 rounded-md">{current.saving}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {current.incentives.map((inc) => (
                      <span key={inc} className="bg-med-light text-med-navy text-[11px] font-medium border border-med-border px-2 py-1 rounded-md">
                        {inc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Swipe Buttons */}
        {!isFinished && (
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => swipe("left")}
              className="w-14 h-14 rounded-full border-2 border-red-400/50 flex items-center justify-center text-red-400 hover:bg-red-400/10 transition-colors active:scale-90"
            >
              <X className="w-7 h-7" />
            </button>
            <button
              onClick={() => swipe("right")}
              className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30 active:scale-90"
            >
              <Heart className="w-8 h-8" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
