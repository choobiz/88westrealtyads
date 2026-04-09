"use client";

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

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", privacy: false });
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
      source: "north-shore-health-pavilion",
      page_url: window.location.href,
      consent: form.privacy ? "consented" : "not_consented",
      privacy_consent: form.privacy ? "on" : "off",
      ...tracking,
    };

    // Grant consent on form submit if checkbox is checked
    if (form.privacy) {
      localStorage.setItem("cookie_consent", "accepted");
      if (window.gtag) {
        window.gtag("consent", "update", {
          ad_storage: "granted",
          analytics_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
        });
      }
    }

    try {
      await fetch(MEDICAL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Fire Google Ads conversion via dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submit",
        form_id: "register-form",
        form_name: "medical_registration",
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

  const inputClass = "w-full border border-med-border rounded-lg px-4 py-3 text-sm text-med-navy placeholder:text-text-muted focus:ring-2 focus:ring-med-teal/30 focus:border-med-teal outline-none transition-colors";

  return (
    <section id="register" className="bg-med-navy py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Register for Priority Access</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Complete this form to receive priority access to floor plans, pricing, and exclusive pre-sale opportunities.</p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-med-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-med-teal" />
              </div>
              <h3 className="text-med-navy text-2xl font-bold mb-2">Thank You for Registering!</h3>
              <p className="text-text-secondary text-base">We&apos;ll be in touch within 24 hours with priority access details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">Name</label>
                  <input type="text" required placeholder="Dr. Jane Smith" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">Email</label>
                  <input type="email" required placeholder="jane@clinic.com" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="(604) 555-0123"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                  className={inputClass}
                />
              </div>
              <div className="pt-2">
                <label className="flex items-start gap-3 text-xs leading-relaxed text-text-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.privacy}
                    onChange={(e) => setForm({ ...form, privacy: e.target.checked })}
                    className="mt-1 h-4 w-4 text-med-teal focus:ring-med-teal border-gray-300 rounded"
                  />
                  <span className="flex-1">
                    I agree to the <a href="/privacy-policy" className="text-med-teal hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and consent to 88 West Realty collecting my contact details. I understand my information may be used to communicate with me regarding medical strata pre-sales and securely shared with third-party platforms (like our CRM and advertising partners) to measure marketing performance.
                  </span>
                </label>
              </div>
              {error && <p className="text-brand-red text-sm text-center">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full text-center px-4 md:px-8 py-4 bg-brand-red text-white font-semibold rounded-lg shadow-[0_10px_30px_rgba(197,34,4,0.3)] hover:bg-brand-red-hover hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    Register Now — Priority Access
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-xs text-text-muted text-center">No obligation. Your information is confidential.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
