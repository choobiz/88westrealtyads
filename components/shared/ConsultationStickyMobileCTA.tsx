"use client";

import { Phone, ArrowRight } from "lucide-react";

export default function ConsultationStickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-eightyw-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)] md:hidden">
      <div className="flex items-center gap-2 px-4 py-3">
        <a href="tel:+16042811828" className="w-12 h-12 flex items-center justify-center bg-eightyw-blue rounded-full shrink-0" aria-label="Call 88 West Realty">
          <Phone className="w-5 h-5 text-white" />
        </a>
        <a href="#register" className="flex-1 h-12 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover flex items-center justify-center gap-2 text-[15px]">
          Find My Next Deal
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
