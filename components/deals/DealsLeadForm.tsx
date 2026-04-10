"use client";

import { useState, useEffect, type FormEvent } from "react";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import { MEDICAL_WEBHOOK_URL, TRACKING } from "@/lib/constants";

declare global {
  interface Window {
    __getTrackingCookie?: (name: string) => string | null;
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

interface DealsLeadFormProps {
  /** Which page this form is on */
  source: string;
  /** Show buyer type step */
  showBuyerType?: boolean;
  /** Show rent field */
  showRentField?: boolean;
  /** Heading text */
  heading?: string;
  /** Subheading text */
  subheading?: string;
}

const BUYER_TYPES = [
  { id: "first-time", label: "First-Time Buyer", desc: "Never owned a home" },
  { id: "upgrader", label: "Upgrader", desc: "Own a home, looking for better" },
  { id: "investor", label: "Investor", desc: "Looking for returns" },
];

export default function DealsLeadForm({
  source,
  showBuyerType = true,
  showRentField = false,
  heading = "Get Your Personalized Deal List",
  subheading = "Register in 30 seconds. We'll match you with the best deals.",
}: DealsLeadFormProps) {
  const [step, setStep] = useState(1);
  const totalSteps = showBuyerType ? 2 : 1;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", buyerType: "", rent: "", privacy: false,
  });
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

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length >= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    if (digits.length >= 3) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return digits;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      buyer_type: form.buyerType,
      current_rent: form.rent,
      source,
      page_url: window.location.href,
      consent: form.privacy ? "consented" : "not_consented",
      ...tracking,
    };

    if (form.privacy) {
      localStorage.setItem("cookie_consent", "accepted");
      window.gtag?.("consent", "update", {
        ad_storage: "granted", analytics_storage: "granted",
        ad_user_data: "granted", ad_personalization: "granted",
      });
    }

    try {
      await fetch(MEDICAL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submit",
        form_id: "deals-form",
        form_name: source,
        conversion_id: TRACKING.awId,
        conversion_label: TRACKING.awConversionLabel,
        ...payload,
      });

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us at 604-281-1828.");
    } finally {
      setSubmitting(false);
    }
  }

  const progressPct = showBuyerType
    ? step === 1 ? 40 : 90
    : 80;

  const inputClass = "w-full h-12 px-4 bg-white border border-med-border rounded-xl text-med-navy text-base placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-med-teal/30 focus:border-med-teal transition-colors";

  return (
    <section id="register" className="bg-med-navy py-16 lg:py-24">
      <div className="max-w-xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">{heading}</h2>
        <p className="text-white/60 text-sm text-center mb-8">{subheading}</p>

        <div className="bg-white rounded-2xl p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-med-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-med-teal" />
              </div>
              <h3 className="text-med-navy text-2xl font-bold mb-2">You&apos;re In!</h3>
              <p className="text-text-secondary">We&apos;ll send you curated deals matching your criteria within 24 hours.</p>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="text-center mb-2">
                <span className="text-med-teal text-[11px] font-semibold">
                  Step {step} of {totalSteps}
                </span>
              </div>
              <div className="h-1 bg-med-border rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full bg-med-teal rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Step 1: Buyer type selection */}
              {showBuyerType && step === 1 && (
                <div className="space-y-3">
                  <p className="text-med-navy text-[15px] font-semibold mb-1">I am a...</p>
                  {BUYER_TYPES.map((bt) => (
                    <button
                      key={bt.id}
                      type="button"
                      onClick={() => { setForm({ ...form, buyerType: bt.id }); setStep(2); }}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                        form.buyerType === bt.id
                          ? "border-med-teal bg-med-teal/5"
                          : "border-med-border hover:border-med-teal/40"
                      }`}
                    >
                      <div className="flex-1">
                        <p className="text-med-navy text-[15px] font-semibold">{bt.label}</p>
                        <p className="text-text-secondary text-[12px]">{bt.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        form.buyerType === bt.id ? "border-med-teal" : "border-med-border"
                      }`}>
                        {form.buyerType === bt.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-med-teal" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2 (or step 1 if no buyer type): Contact info */}
              {((!showBuyerType && step === 1) || step === 2) && (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {showBuyerType && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1 text-text-muted text-sm mb-2 hover:text-med-navy"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  )}
                  <input type="text" required placeholder="Full name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                  <input type="email" required placeholder="Email address" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                  <input type="tel" required placeholder="Phone number" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })} className={inputClass} />
                  {showRentField && (
                    <input type="text" placeholder="Current monthly rent (optional)" value={form.rent} onChange={(e) => setForm({ ...form, rent: e.target.value })} className={inputClass} />
                  )}
                  <div className="pt-1">
                    <label className="flex items-start gap-3 text-[11px] leading-relaxed text-text-secondary cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={form.privacy}
                        onChange={(e) => setForm({ ...form, privacy: e.target.checked })}
                        className="mt-1 h-4 w-4 text-med-teal focus:ring-med-teal border-gray-300 rounded"
                      />
                      <span>I agree to the Privacy Policy and consent to 88 West Realty contacting me about available deals.</span>
                    </label>
                  </div>
                  {error && <p className="text-brand-red text-sm text-center">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-[52px] bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all flex items-center justify-center gap-2 text-[15px] disabled:opacity-60"
                  >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <>
                        {showRentField ? "See My Deals →" : "See This Week's Deals →"}
                        {!submitting && <ArrowRight className="w-4 h-4" />}
                      </>
                    )}
                  </button>
                  <p className="text-text-muted text-[11px] text-center">
                    🔒 No obligation · Your info stays private
                  </p>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
