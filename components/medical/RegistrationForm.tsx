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

  // Form abandon tracking
  useEffect(() => {
    function handleBeforeUnload() {
      if (formStarted && !submitted) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_abandon",
          form_name: "medical_registration",
          fields_filled: [
            form.name ? "name" : "",
            form.email ? "email" : "",
            form.phone ? "phone" : "",
          ].filter(Boolean).join(","),
        });
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formStarted, submitted, form]);

  function handleFormFocus() {
    if (!formStarted) {
      setFormStarted(true);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "form_start", form_name: "medical_registration" });
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
    // clients. All three fields matter for attribution + CRM workflow.
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
      form_location: "register_section",
      page_url: window.location.href,
      consent: "implied_submit",
      privacy_consent: "on",
      ...tracking,
    };

    // Submitting the form implies consent (per the inline notice) — mirror
    // the hero form: grant GA4/Ads consent automatically.
    localStorage.setItem("cookie_consent", "accepted");
    if (window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
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
            <form onSubmit={handleSubmit} onFocus={handleFormFocus} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Full name <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    placeholder="Dr. Jane Smith"
                    autoComplete="name"
                    aria-label="Full name (required)"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Email <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@clinic.com"
                    autoComplete="email"
                    aria-label="Email (required)"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">
                  Phone <span className="text-brand-red">*</span>
                </label>
                <input
                  type="tel"
                  required
                  inputMode="tel"
                  placeholder="(604) 555-0123"
                  autoComplete="tel"
                  aria-label="Phone (required)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                  className={inputClass}
                />
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
              <p className="text-xs text-text-muted text-center leading-relaxed">
                By submitting, you agree to the{" "}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-med-teal hover:underline">
                  Privacy Policy
                </a>{" "}
                and consent to 88 West Realty contacting you about this pre-sale.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
