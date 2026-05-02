"use client";

import Image from "next/image";
import { useState, useEffect, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { DEVELOPER_WEBHOOK_URL, TRACKING } from "@/lib/constants";

declare global {
  interface Window {
    __getTrackingCookie?: (name: string) => string | null;
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

const BUDGET_OPTIONS = [
  { value: "under-700k", label: "Under $700K" },
  { value: "700k-1m", label: "$700K – $1M" },
  { value: "1m-1.5m", label: "$1M – $1.5M" },
  { value: "1.5m-2.5m", label: "$1.5M – $2.5M" },
  { value: "2.5m-plus", label: "$2.5M+" },
];

const INTENT_OPTIONS = [
  { value: "investing", label: "Investing" },
  { value: "living-in", label: "Buying to live in" },
  { value: "first-time", label: "First-time buyer" },
  { value: "exploring", label: "Just exploring" },
];

const AREA_OPTIONS = [
  { value: "vancouver", label: "Vancouver" },
  { value: "north-vancouver", label: "North Van" },
  { value: "burnaby", label: "Burnaby" },
  { value: "richmond", label: "Richmond" },
  { value: "anywhere", label: "Anywhere GVA" },
];

const TIMEFRAME_OPTIONS = [
  { value: "0-6", label: "Next 6 months" },
  { value: "6-18", label: "6 – 18 months" },
  { value: "18-plus", label: "18+ months" },
];

interface DeveloperHeroProps {
  formLocation?: "hero_inline" | "final_cta";
}

export default function DeveloperHero({ formLocation = "hero_inline" }: DeveloperHeroProps) {
  return (
    <section className="relative bg-white overflow-hidden">
      <Image
        src="/images/developer/hero-vancouver-skyline.jpg"
        alt="Greater Vancouver downtown skyline — modern condo towers along Burrard Inlet with North Shore mountains."
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/10 lg:to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/30 lg:to-transparent pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-5 md:px-6 relative py-16 md:py-24">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
          <div className="max-w-[640px]">
            <p className="text-brand-red text-[13px] font-semibold uppercase tracking-[2px] mb-4">
              GREATER VANCOUVER · PRE-SALE SPECIALIST
            </p>
            <h1 className="text-eightyw-blue text-[32px] md:text-[52px] font-bold leading-[1.08] mb-6">
              $100,000 Off a Brand-New Vancouver Condo. We Negotiate the Stack For You.
            </h1>
            <p className="text-text-secondary text-base md:text-[18px] leading-relaxed mb-6 max-w-[580px]">
              5,458 unsold condos sit across Vancouver, Burnaby, Richmond and North Van — a 24-year high.
              Builders aren&apos;t cutting list prices; they&apos;re stacking cash credits, free parking,
              rate buy-downs and waived assignment fees instead. We&apos;re a buyer-side brokerage that
              hunts the right project for you — and negotiates the stack on your behalf, building by building.
            </p>
            <div className="bg-white border border-eightyw-border rounded-2xl p-4 md:p-5 mb-6 shadow-sm">
              <p className="text-[11px] text-brand-red font-semibold uppercase tracking-wider mb-2">
                A STACK WE NEGOTIATED THIS WEEK
              </p>
              <p className="text-eightyw-blue text-base md:text-lg font-semibold leading-snug mb-1">
                $94,500 off — $40K decorating credit + $48K parking &amp; storage + 1.99% rate buy-down (12&nbsp;mo)
              </p>
              <p className="text-text-muted text-xs md:text-sm">
                Brentwood high-rise · 17 active stacks across our watch-list
              </p>
            </div>

            <p className="text-eightyw-blue text-base md:text-lg font-semibold mb-6">
              We don&apos;t represent the developer — only you.
            </p>

            <div className="hidden lg:flex flex-col sm:flex-row gap-3">
              <a
                href="#register"
                className="inline-flex items-center justify-center h-[52px] px-7 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px] shadow-[0_10px_30px_rgba(197,34,4,0.3)]"
              >
                Get Matched With Our Specialist
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+16042811828"
                className="inline-flex items-center justify-center h-[52px] px-7 border-2 border-eightyw-border bg-white text-eightyw-blue font-semibold rounded-full hover:border-eightyw-blue/40 transition-all gap-2 text-[15px]"
              >
                Call 604-281-1828
              </a>
            </div>
            <p className="hidden lg:block text-text-muted text-xs mt-3">
              We call back within 24 hours · Mon–Sat, 8 AM – 8 PM PT
            </p>
          </div>

          <div className="mt-2 lg:mt-0">
            <DeveloperLeadForm formLocation={formLocation} />
            <a
              href="tel:+16042811828"
              className="lg:hidden mt-4 inline-flex items-center justify-center w-full h-[48px] border-2 border-eightyw-border bg-white text-eightyw-blue font-semibold rounded-full hover:border-eightyw-blue/40 transition-all gap-2 text-[15px]"
            >
              Or call 604-281-1828
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DeveloperLeadForm({ formLocation = "hero_inline" }: DeveloperHeroProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    intent: "",
    timeframe: "",
    areas: [] as string[],
  });
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
      window.dataLayer.push({ event: "form_start", form_name: "developer_lead" });
    }
  }

  function toggleArea(value: string) {
    setForm((f) => ({
      ...f,
      areas: f.areas.includes(value)
        ? f.areas.filter((a) => a !== value)
        : [...f.areas, value],
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const name = form.name.trim();
    const email = form.email.trim();
    if (name.length < 2) { setError("Please enter your first name."); return; }
    if (!email.includes("@") || !email.includes(".")) { setError("Please enter a valid email."); return; }
    if (!form.budget) { setError("Please select a budget range."); return; }
    if (!form.intent) { setError("Please tell us what you're doing."); return; }
    if (!form.timeframe) { setError("Please select a timeframe."); return; }
    if (form.areas.length === 0) { setError("Please select at least one area."); return; }

    setSubmitting(true);

    const payload = {
      name,
      email,
      phone: form.phone.trim(),
      budget: form.budget,
      intent: form.intent,
      timeframe: form.timeframe,
      areas: form.areas.join(","),
      source: "developer-condo-deals-vancouver",
      lead_magnet: "developer-incentive-tracker",
      form_location: formLocation,
      page_url: window.location.href,
      consent: "implied_inline",
      privacy_consent: "on",
      ...tracking,
    };

    localStorage.setItem("cookie_consent", "accepted");
    if (window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "granted", analytics_storage: "granted",
        ad_user_data: "granted", ad_personalization: "granted",
      });
    }

    try {
      await fetch(DEVELOPER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submit",
        form_id: "developer-lead-form",
        form_name: "developer_lead",
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

  const inputClass = "w-full bg-white border border-eightyw-border rounded-lg px-4 py-3 text-sm text-eightyw-text placeholder:text-text-muted focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red outline-none transition-colors";

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl border-t-4 border-brand-red overflow-hidden p-8 md:p-10 text-center">
        <div className="w-14 h-14 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-brand-red" />
        </div>
        <h3 className="text-eightyw-blue text-xl font-bold mb-2">We&apos;ll call within 24 hours.</h3>
        <p className="text-text-secondary text-sm">
          A buyer-side pre-sale specialist will reach out, get specific about what you&apos;re looking
          for, and start a personal shortlist from the 40+ Greater Vancouver projects we already monitor.
          We negotiate the stack on your behalf — no fee charged to buyers.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl border-t-4 border-brand-red overflow-hidden">
      <div className="p-5 md:p-6">
        <div className="mb-4">
          <h3 className="text-eightyw-blue text-lg md:text-xl font-bold leading-tight">
            Get matched with our pre-sale specialist.
          </h3>
          <p className="text-text-secondary text-xs md:text-sm mt-1">
            Free, buyer-side only. We call within 24 hours.
          </p>
        </div>
        <form onSubmit={handleSubmit} onFocus={handleFormFocus} className="space-y-3">
          <input
            type="text"
            required
            minLength={2}
            placeholder="First name *"
            autoComplete="given-name"
            aria-label="First name (required)"
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
          <select
            required
            aria-label="Budget range (required)"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className={`${inputClass} ${form.budget ? "" : "text-text-muted"}`}
          >
            <option value="" disabled>Budget range *</option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
          <select
            required
            aria-label="What's your intent (required)"
            value={form.intent}
            onChange={(e) => setForm({ ...form, intent: e.target.value })}
            className={`${inputClass} ${form.intent ? "" : "text-text-muted"}`}
          >
            <option value="" disabled>I&apos;m... *</option>
            {INTENT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {form.intent === "first-time" && (
            <p className="text-xs text-brand-red bg-brand-red/5 border border-brand-red/20 rounded px-3 py-2">
              You&apos;ll save more with our $43K Head Start guide →{" "}
              <a href="/first-time-buyer-vancouver" className="font-semibold underline">
                /first-time-buyer-vancouver
              </a>
            </p>
          )}
          <select
            required
            aria-label="When do you need to be in (required)"
            value={form.timeframe}
            onChange={(e) => setForm({ ...form, timeframe: e.target.value })}
            className={`${inputClass} ${form.timeframe ? "" : "text-text-muted"}`}
          >
            <option value="" disabled>When do you need to be in? *</option>
            {TIMEFRAME_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>

          <fieldset>
            <legend className="text-xs text-text-muted mb-1.5">Areas of interest * (pick any)</legend>
            <div className="flex flex-wrap gap-2">
              {AREA_OPTIONS.map((a) => {
                const active = form.areas.includes(a.value);
                return (
                  <button
                    type="button"
                    key={a.value}
                    onClick={() => toggleArea(a.value)}
                    className={`px-3 py-2 text-xs font-medium rounded-full border transition-colors ${
                      active
                        ? "bg-brand-red text-white border-brand-red"
                        : "bg-white text-eightyw-blue border-eightyw-border hover:border-brand-red"
                    }`}
                  >
                    {a.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <input
            type="tel"
            placeholder="Phone (optional — for flash alerts)"
            autoComplete="tel"
            aria-label="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />

          {error && (
            <p className="text-brand-red bg-brand-red/10 border border-brand-red/30 rounded px-3 py-2 text-xs text-center">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-[48px] bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-hover transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-[15px]"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                Get Matched With Our Specialist
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-[11px] text-text-muted leading-relaxed">
            Free, buyer-side only. We call within 24 hours.
            Developer commissions paid at closing per the BC Real Estate Services Act —
            no fee charged to buyers.{" "}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">
              Privacy Policy
            </a>.
          </p>
        </form>
      </div>
    </div>
  );
}
