"use client";

import Image from "next/image";
import { useState, useEffect, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { MEDICAL_WEBHOOK_URL, TRACKING } from "@/lib/constants";

declare global {
  interface Window {
    __getTrackingCookie?: (name: string) => string | null;
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

interface MedicalHeroProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  badge?: string;
  bgImage: string;
  showInlineForm?: boolean;
}

export default function MedicalHero({ eyebrow, headline, subheadline, ctaText, badge, bgImage, showInlineForm }: MedicalHeroProps) {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      <Image
        src={bgImage}
        alt="North Shore Health Pavilion medical strata building exterior on Marine Drive, North Vancouver"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-med-navy/95 via-med-navy/85 to-med-navy/60" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-6 relative z-10 py-16 md:py-24 w-full">
        <div className={showInlineForm ? "grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center" : ""}>
          <div className={showInlineForm ? "max-w-[620px]" : "max-w-[680px]"}>
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
            <p className="text-white/75 text-base md:text-[18px] leading-relaxed mb-8 max-w-[580px]">
              {subheadline}
            </p>
            {!showInlineForm && (
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#register" className="inline-flex items-center justify-center h-[52px] px-8 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px]">
                  {ctaText}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="tel:+16042811828" className="inline-flex items-center justify-center h-[52px] px-8 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all gap-2 text-[15px]">
                  Call 604-281-1828
                </a>
              </div>
            )}
            {showInlineForm && (
              // Desktop-only CTAs — visible alongside the inline form on the
              // right. Without these, desktop visitors don't realize the form
              // box IS the CTA (Apr 26 heatmap: 0% desktop clicks on the form).
              <div className="hidden lg:flex flex-col sm:flex-row gap-3 mt-2">
                <a
                  href="#register"
                  className="inline-flex items-center justify-center h-[52px] px-7 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px] shadow-[0_10px_30px_rgba(197,34,4,0.3)]"
                >
                  {ctaText}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:+16042811828"
                  className="inline-flex items-center justify-center h-[52px] px-7 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all gap-2 text-[15px]"
                >
                  Call 604-281-1828
                </a>
              </div>
            )}
          </div>

          {showInlineForm && (
            <div className="mt-4 lg:mt-0">
              <InlineHeroForm ctaText={ctaText} />
              <a href="tel:+16042811828" className="lg:hidden mt-4 inline-flex items-center justify-center w-full h-[48px] border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all gap-2 text-[15px]">
                Or call 604-281-1828
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function InlineHeroForm({ ctaText }: { ctaText: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [formStarted, setFormStarted] = useState(false);
  const [tracking, setTracking] = useState({
    gclid: "", utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", utm_term: "",
  });

  useEffect(() => {
    const get = window.__getTrackingCookie;
    if (!get) return;
    setTracking({
      gclid: get("_lp_gclid") || "",
      utm_source: get("_lp_utm_source") || "",
      utm_medium: get("_lp_utm_medium") || "",
      utm_campaign: get("_lp_utm_campaign") || "",
      utm_content: get("_lp_utm_content") || "",
      utm_term: get("_lp_utm_term") || "",
    });
  }, []);

  function handleFormFocus() {
    if (!formStarted) {
      setFormStarted(true);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "form_start", form_name: "medical_hero_inline" });
    }
  }

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length >= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    if (digits.length >= 3) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return digits;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    // Defensive validation — browser `required` can be bypassed by custom
    // clients. Webhook workflows (and our own attribution) rely on all three
    // fields being present and non-trivial.
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    if (name.length < 2) { setError("Please enter your full name."); return; }
    if (!email.includes("@") || !email.includes(".")) { setError("Please enter a valid email."); return; }
    if (phone.replace(/\D/g, "").length < 10) { setError("Please enter a valid phone number."); return; }

    setSubmitting(true);

    const payload = {
      name,
      email,
      phone,
      source: "north-shore-health-pavilion",
      form_location: "hero_inline",
      page_url: window.location.href,
      consent: "implied_inline",
      privacy_consent: "on",
      ...tracking,
    };

    try {
      await fetch(MEDICAL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submit",
        form_id: "hero-inline-form",
        form_name: "medical_hero_inline",
        conversion_id: TRACKING.awId,
        conversion_label: TRACKING.awConversionLabel,
        ...payload,
      });

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call 604-281-1828.");
    } finally {
      setSubmitting(false);
    }
  }

  // Inputs sit on a white form-card — use the standard navy text + light grey border
  const inputClass = "w-full bg-white border border-med-border rounded-lg px-4 py-3 text-sm text-med-navy placeholder:text-text-muted focus:ring-2 focus:ring-med-teal/30 focus:border-med-teal outline-none transition-colors";

  // Form box: opaque white card with a colored top accent so it reads as
  // the primary CTA at a glance (was previously translucent — Apr 26 heatmap
  // showed 0% desktop clicks; the box was disappearing into the navy hero).
  return (
    <div className="bg-white rounded-2xl shadow-2xl border-t-4 border-brand-red overflow-hidden">
      {submitted ? (
        <div className="text-center py-10 px-6">
          <div className="w-14 h-14 bg-med-teal/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-7 h-7 text-med-teal" />
          </div>
          <h3 className="text-med-navy text-xl font-bold mb-2">Thank you — you&apos;re registered.</h3>
          <p className="text-text-secondary text-sm">We&apos;ll be in touch within 24 hours with floor plans, pricing, and priority access details.</p>
        </div>
      ) : (
        <div className="p-5 md:p-6">
          <div className="mb-4">
            <h3 className="text-med-navy text-lg md:text-xl font-bold leading-tight">Get the price list and floor plans</h3>
            <p className="text-text-secondary text-xs md:text-sm mt-1">Priority access for medical professionals and investors.</p>
          </div>
          <form onSubmit={handleSubmit} onFocus={handleFormFocus} className="space-y-3">
            <input
              type="text"
              required
              minLength={2}
              placeholder="Full name *"
              autoComplete="name"
              aria-label="Full name (required)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
            <input
              type="email"
              required
              placeholder="Email *"
              autoComplete="email"
              aria-label="Email (required)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
            <input
              type="tel"
              required
              inputMode="tel"
              placeholder="Phone *"
              autoComplete="tel"
              aria-label="Phone (required)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
              className={inputClass}
            />
            {error && <p className="text-brand-red bg-brand-red/10 border border-brand-red/30 rounded px-3 py-2 text-xs text-center">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-[48px] bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-hover transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-[15px]"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  {ctaText}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[11px] text-text-muted leading-relaxed">
              By submitting, you agree to the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-med-teal hover:underline">Privacy Policy</a> and consent to 88 West Realty contacting you about this pre-sale.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
