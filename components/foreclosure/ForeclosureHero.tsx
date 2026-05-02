"use client";

import Image from "next/image";
import { useState, useEffect, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { FORECLOSURE_WEBHOOK_URL, TRACKING } from "@/lib/constants";

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
  { value: "investing", label: "I'm investing" },
  { value: "living-in", label: "I'm buying to live in" },
  { value: "exploring", label: "I'm exploring" },
];

const AREA_OPTIONS = [
  { value: "vancouver", label: "Vancouver" },
  { value: "north-vancouver", label: "North Van" },
  { value: "burnaby", label: "Burnaby" },
  { value: "richmond", label: "Richmond" },
  { value: "other", label: "Other GVA" },
];

interface ForeclosureHeroProps {
  formLocation?: "hero_inline" | "final_cta";
}

export default function ForeclosureHero({ formLocation = "hero_inline" }: ForeclosureHeroProps) {
  return (
    <section className="relative min-h-[640px] md:min-h-[760px] flex items-center overflow-hidden">
      <Image
        src="/images/foreclosure/hero-vancouver.jpg"
        alt="Greater Vancouver skyline with North Shore mountains — backdrop for 88 West Realty's daily-updated court-ordered sales list"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/10 lg:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/30 lg:to-transparent" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-6 relative z-10 py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
          <div className="max-w-[640px]">
            <p className="text-brand-red text-[13px] font-semibold uppercase tracking-[2px] mb-4">
              GREATER VANCOUVER · COURT-ORDERED SALES
            </p>
            <h1 className="text-eightyw-blue text-[32px] md:text-[52px] font-bold leading-[1.08] mb-6">
              Greater Vancouver&apos;s Daily-Updated Court-Ordered Sales List.
            </h1>
            <p className="text-text-secondary text-base md:text-[18px] leading-relaxed mb-6 max-w-[580px]">
              The new Vancouver, North Van, Burnaby, and Richmond court-ordered listings,
              emailed every business morning. Free, buyer-side only — no bank affiliation.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white border border-eightyw-border rounded-full text-eightyw-text text-xs md:text-sm shadow-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              ~389 active BC court-ordered listings as of today
            </div>

            <div className="hidden lg:flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href="#register"
                className="inline-flex items-center justify-center h-[52px] px-7 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all hover:-translate-y-0.5 gap-2 text-[15px] shadow-[0_10px_30px_rgba(197,34,4,0.3)]"
              >
                Send Me Tomorrow&apos;s List
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
              Monday–Saturday, 8 AM – 8 PM PT
            </p>
          </div>

          <div className="mt-4 lg:mt-0">
            <ForeclosureLeadForm formLocation={formLocation} />
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

export function ForeclosureLeadForm({ formLocation = "hero_inline" }: ForeclosureHeroProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    intent: "",
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
      window.dataLayer.push({ event: "form_start", form_name: "foreclosure_lead" });
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
    if (!form.intent) { setError("Please select an option for what you're doing."); return; }
    if (form.areas.length === 0) { setError("Please select at least one area."); return; }

    setSubmitting(true);

    const payload = {
      name,
      email,
      budget: form.budget,
      intent: form.intent,
      areas: form.areas.join(","),
      source: "foreclosure-deals-vancouver",
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
      await fetch(FORECLOSURE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submit",
        form_id: "foreclosure-lead-form",
        form_name: "foreclosure_lead",
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

  const inputClass = "w-full bg-white border border-eightyw-border rounded-lg px-4 py-3 text-sm text-eightyw-text placeholder:text-text-muted focus:ring-2 focus:ring-eightyw-cta/30 focus:border-eightyw-cta outline-none transition-colors";

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl border-t-4 border-brand-red overflow-hidden p-8 md:p-10 text-center">
        <div className="w-14 h-14 bg-eightyw-cta/15 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-eightyw-cta" />
        </div>
        <h3 className="text-eightyw-blue text-xl font-bold mb-2">You&apos;re on the list.</h3>
        <p className="text-text-secondary text-sm">
          Tomorrow morning at 7 AM PT, you&apos;ll get every Greater Vancouver
          court-ordered listing that matches your budget and areas. We&apos;ll
          also call within 24 hours to confirm your saved-search filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl border-t-4 border-brand-red overflow-hidden">
      <div className="p-5 md:p-6">
        <div className="mb-4">
          <h3 className="text-eightyw-blue text-lg md:text-xl font-bold leading-tight">
            Get the Foreclosure Sheet.
          </h3>
          <p className="text-text-secondary text-xs md:text-sm mt-1">
            Free. Every business morning. No phone required to start.
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

          <fieldset>
            <legend className="text-xs text-text-muted mb-1.5">I am... *</legend>
            <div className="flex flex-wrap gap-2">
              {INTENT_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`px-3 py-2 text-xs font-medium rounded-full border cursor-pointer transition-colors ${
                    form.intent === opt.value
                      ? "bg-eightyw-cta text-white border-eightyw-cta"
                      : "bg-white text-eightyw-blue border-eightyw-border hover:border-eightyw-cta"
                  }`}
                >
                  <input
                    type="radio"
                    name="intent"
                    value={opt.value}
                    className="sr-only"
                    checked={form.intent === opt.value}
                    onChange={(e) => setForm({ ...form, intent: e.target.value })}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs text-text-muted mb-1.5">Where are you looking? *</legend>
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
                Send Me Tomorrow&apos;s List
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-[11px] text-text-muted leading-relaxed">
            Free. No credit check. No phone required to start. Unsubscribe anytime.
            By submitting, you agree to the{" "}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-eightyw-cta hover:underline">
              Privacy Policy
            </a>{" "}
            and consent to 88 West Realty contacting you about Greater Vancouver
            court-ordered sales. We don&apos;t share your information with banks,
            lenders, or any third party.
          </p>
        </form>
      </div>
    </div>
  );
}
