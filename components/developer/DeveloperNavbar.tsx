"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "This Week's Tracker", href: "#tracker" },
  { label: "How It Works", href: "#stages" },
  { label: "FAQ", href: "#faq" },
];

export default function DeveloperNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-brand-red h-[72px] flex items-center">
      <div className="max-w-[1200px] mx-auto w-full px-5 md:px-6 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image src="/logo.png" alt={COMPANY.name} width={100} height={40} className="h-9 w-auto" priority />
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((link) => (
            <a key={link.label} href={link.href} className="text-[15px] font-medium text-white/90 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href={`tel:${COMPANY.phoneClean}`} className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors">
            <Phone className="w-4 h-4" />
            {COMPANY.phone}
          </a>
          <a href="#register" className="inline-flex items-center h-10 px-5 bg-white text-brand-red text-sm font-semibold rounded-full hover:bg-eightyw-light transition-colors">
            Get the Tracker
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <a href={`tel:${COMPANY.phoneClean}`} className="w-10 h-10 flex items-center justify-center text-white" aria-label="Call us">
            <Phone className="w-5 h-5" />
          </a>
          <a href="#register" className="inline-flex items-center h-9 px-4 bg-white text-brand-red text-xs font-semibold rounded-full">
            Get the Tracker
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="w-10 h-10 flex items-center justify-center text-white" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-brand-red border-t border-white/20 md:hidden">
          <div className="px-5 py-4 space-y-3">
            {NAV_ITEMS.map((link) => (
              <a key={link.label} href={link.href} className="block text-base font-medium text-white py-2" onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
