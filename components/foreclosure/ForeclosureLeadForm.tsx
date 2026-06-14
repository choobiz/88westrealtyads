"use client";

/**
 * ForeclosureLeadForm — the 3-field lead capture form (name / email / phone).
 *
 * Used in multiple contexts: hero inline (Variant B), inside the LeadFormModal
 * (every variant when a CTA opens the modal), and historically inside the
 * lower ForeclosureFormSection on Variant A.
 *
 * Extracted from ForeclosureHero.tsx 2026-06-13 so the ForeclosureLeadProvider
 * (modal context) can import it without creating a circular dependency between
 * Provider and Hero. ForeclosureHero.tsx re-exports this for backward
 * compatibility with the prior import path used by InventoryPreview,
 * PortfolioConsole, ForeclosureHeroVariantB, and ForeclosureFormSection.
 *
 * Payload contract (sent to FORECLOSURE_WEBHOOK_URL on submit):
 *   name, email, phone — required fields
 *   budget, intent, areas — empty strings; legacy GHL field mappings depend on
 *     these keys existing in every payload even though the form stopped
 *     collecting them on 2026-05-17
 *   source — always "foreclosure-deals-vancouver"
 *   form_location — passed in by caller (`hero_inline`, `property_modal`, etc.)
 *   selected_property — only present when caller passes selectedProperty prop
 *   gclid + utm_* + experiment_variant — pulled from cookies set by the
 *     tracking-cookies script in app/layout.tsx
 *   consent / privacy_consent — "implied_inline" / "on" (inline submission
 *     counts as consent; full policy linked in the small text below the form)
 */

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { FORECLOSURE_WEBHOOK_URL, TRACKING } from "@/lib/constants";
import foreclosureStats from "@/data/foreclosure-stats.json";

export interface ForeclosureLeadFormProps {
  formLocation?: "hero_inline" | "final_cta" | "deals_section" | "property_modal";
  selectedProperty?: string;
  bare?: boolean;
  submitLabel?: string;
}

export default function ForeclosureLeadForm({
  formLocation = "hero_inline",
  selectedProperty,
  bare = false,
  submitLabel = "Find My Next Deal",
}: ForeclosureLeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formStarted, setFormStarted] = useState(false);
  const [tracking, setTracking] = useState({
    gclid: "", utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", utm_term: "",
    experiment_variant: "",
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
      // A/B/C cohort assigned by proxy.ts ('A' = control, 'B' = hero-inline-form
      // variant, 'C' = Portfolio Console). Forwarded to GHL webhook + dataLayer
      // for conversion attribution per arm.
      experiment_variant: get("_lp_ab_cohort") || "",
    });
  }, []);

  function handleFormFocus() {
    if (!formStarted) {
      setFormStarted(true);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "form_start", form_name: "foreclosure_lead" });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    if (name.length < 2) { setError("Please enter your full name."); return; }
    if (!email.includes("@") || !email.includes(".")) { setError("Please enter a valid email."); return; }
    if (!/^[\d\s()+-]{7,}$/.test(phone)) { setError("Please enter a valid phone number."); return; }

    setSubmitting(true);

    const payload = {
      name,
      email,
      phone,
      // budget / intent / areas removed from the form 2026-05-17 — kept in the
      // payload with empty defaults so existing GHL field mappings and
      // automations continue to receive the keys and don't break.
      budget: "",
      intent: "",
      areas: "",
      source: "foreclosure-deals-vancouver",
      form_location: formLocation,
      ...(selectedProperty ? { selected_property: selectedProperty } : {}),
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
      <div className={bare ? "p-6 md:p-8 text-center" : "bg-white rounded-2xl shadow-2xl border-t-4 border-brand-red overflow-hidden p-8 md:p-10 text-center"}>
        <div className="w-14 h-14 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-brand-red" />
        </div>
        <h3 className="text-eightyw-blue text-xl font-bold mb-2">We&apos;re on it.</h3>
        <p className="text-text-secondary text-sm">
          Your buyer-side foreclosure specialist will call within 24 hours to get specific
          about what you&apos;re looking for and walk you through a personal shortlist from
          the ~{foreclosureStats.marketingNumber} active BC court-ordered listings we already monitor. No pressure,
          no obligation, no fee.
        </p>
      </div>
    );
  }

  return (
    <div className={bare ? "" : "bg-white rounded-2xl shadow-2xl border-t-4 border-brand-red overflow-hidden"}>
      <div className="p-5 md:p-6">
        <div className="mb-4 pl-3 border-l-2 border-brand-red">
          <h3 className="text-eightyw-blue text-lg md:text-xl font-bold leading-tight">
            Find your next deal.
          </h3>
          <p className="text-text-secondary text-xs md:text-sm mt-1">
            Tell us your buy-box. Your specialist calls within 24 hours.
          </p>
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
            placeholder="Phone *"
            autoComplete="tel"
            aria-label="Phone (required)"
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
                {submitLabel}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-[11px] text-text-muted leading-relaxed">
            Free, buyer-side only. No credit check. We call within 24 hours.
            By submitting, you agree to the{" "}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-eightyw-cta hover:underline">
              Privacy Policy
            </a>{" "}
            and consent to 88 West Realty contacting you about Greater Vancouver
            court-ordered sales — including by SMS/text (deal alerts, appointment
            confirmations, and follow-ups; up to 10 msgs/month, message &amp; data
            rates may apply, reply STOP to opt out). We don&apos;t share your
            information with banks, lenders, or any third party.
          </p>
        </form>
      </div>
    </div>
  );
}
