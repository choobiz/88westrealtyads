"use client";

/**
 * ForeclosureLeadProvider — single source of truth for the lead-form modal
 * across the entire foreclosure LP.
 *
 * Before 2026-06-13, several different patterns coexisted:
 *   - Hero CTAs scrolled to #register / #deals anchors (Variant A only)
 *   - Mobile sticky CTA scrolled to #register
 *   - GuaranteeAndFinalCTA scrolled to #register
 *   - InventoryPreview + PortfolioConsole each owned their own LeadFormModal
 *     instance with local React state
 *
 * The scroll behavior was friction for conversion (especially mobile — page
 * jumps disorientation, form scrolls below fold, user can scroll past it).
 * Per operator direction 2026-06-13, ALL scroll-to-form CTAs now open the
 * centered modal directly via this context. Card-click flows (deal cards
 * opening with specific listing context) also route through this provider
 * for consistency.
 *
 * Usage:
 *   1. Wrap the page (or any subtree) in <ForeclosureLeadProvider> in a
 *      client-only wrapper (page.tsx is a Server Component, so wrap in a
 *      Client Component shell like ForeclosureLayout).
 *   2. Any descendant can call:
 *        const { openLeadForm, closeLeadForm } = useForeclosureLeadModal();
 *        openLeadForm({
 *          headline: "BOOK YOUR STRATEGY SESSION",
 *          subtitle: "...",
 *          selectedProperty: "Condo · Hastings · $499K",
 *          formLocation: "property_modal",
 *          submitLabel: "Send Me the Details",
 *        });
 *
 * Tracking: every openLeadForm push emits a `form_open` dataLayer event so
 * GA4/Tag Manager can attribute the open separately from the form_start
 * (focus) and form_submit events the form itself emits.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import LeadFormModal from "@/components/shared/LeadFormModal";
import ForeclosureLeadForm, {
  type ForeclosureLeadFormProps,
} from "./ForeclosureLeadForm";

declare global {
  interface Window {
    __foreclosureLeadFormWarned?: boolean;
  }
}

export type OpenLeadFormArgs = {
  /** Modal header eyebrow (e.g. "BOOK YOUR STRATEGY SESSION") */
  headline?: string;
  /** Modal subheading (typically the listing context or session pitch) */
  subtitle?: string;
  /** Forwarded to the form as `selected_property` payload field */
  selectedProperty?: string;
  /** Forwarded to the form as `form_location` payload field — drives GHL routing */
  formLocation?: ForeclosureLeadFormProps["formLocation"];
  /** Submit button label on the form */
  submitLabel?: string;
  /** Where in the page the open was triggered from — used for dataLayer attribution */
  source?: string;
};

type ContextValue = {
  openLeadForm: (args: OpenLeadFormArgs) => void;
  closeLeadForm: () => void;
};

const LeadFormContext = createContext<ContextValue | null>(null);

export function useForeclosureLeadModal(): ContextValue {
  const v = useContext(LeadFormContext);
  if (!v) {
    // No provider in scope — typically because a shared CTA component
    // (ConsultationStickyMobileCTA, navbar) was rendered on a page that
    // doesn't have its own lead-form provider (e.g. developer-condo-deals).
    // Fall back to the old scroll-to-#register behavior so the component
    // is still functional, just less polished. Logs a one-time warning
    // in dev to flag the page for wrapping if conversion matters there.
    if (typeof window !== "undefined" && !window.__foreclosureLeadFormWarned) {
      window.__foreclosureLeadFormWarned = true;
      // eslint-disable-next-line no-console
      console.warn(
        "[foreclosure] useForeclosureLeadModal called outside a provider — falling back to scroll-to-#register. Wrap the page in <ForeclosureLeadProvider> for modal CTAs.",
      );
    }
    return {
      openLeadForm: () => {
        if (typeof window !== "undefined") {
          window.location.hash = "#register";
        }
      },
      closeLeadForm: () => {},
    };
  }
  return v;
}

export default function ForeclosureLeadProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [args, setArgs] = useState<OpenLeadFormArgs | null>(null);

  const openLeadForm = useCallback((next: OpenLeadFormArgs) => {
    setArgs(next);
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      // form_open — new event introduced 2026-06-13 with the modal-on-CTA
      // refactor. Carries source attribution so GA4 can split conversion
      // funnels by which CTA triggered the modal.
      window.dataLayer.push({
        event: "form_open",
        form_name: "foreclosure_lead",
        form_location: next.formLocation ?? "property_modal",
        open_source: next.source ?? "unknown",
        ...(next.headline ? { context_headline: next.headline } : {}),
        ...(next.selectedProperty ? { selected_property: next.selectedProperty } : {}),
      });
      // cta_click — backward-compat alias for the legacy event that
      // EventTracking.tsx pushed when CTAs were <a href="#register"> links.
      // Any existing GTM trigger / GA4 funnel filter still fires.
      window.dataLayer.push({
        event: "cta_click",
        cta_text: next.submitLabel ?? next.headline ?? "open lead form",
        cta_location: next.source ?? "unknown",
        cta_href: "#register",
      });
    }
  }, []);

  const closeLeadForm = useCallback(() => setArgs(null), []);

  // Esc-to-close is handled inside LeadFormModal already; here we just
  // listen for a global event name so external scripts (e.g. legacy
  // tag-manager triggers, the EventTracking shared component) can open
  // the form without holding a React ref. Optional — safe to remove
  // if no consumers materialize.
  useEffect(() => {
    function onExternalOpen(e: Event) {
      const detail =
        (e as CustomEvent<OpenLeadFormArgs>).detail ?? ({} as OpenLeadFormArgs);
      openLeadForm({ ...detail, source: detail.source ?? "external_event" });
    }
    window.addEventListener("foreclosure:open-lead-form", onExternalOpen);
    return () =>
      window.removeEventListener("foreclosure:open-lead-form", onExternalOpen);
  }, [openLeadForm]);

  return (
    <LeadFormContext.Provider value={{ openLeadForm, closeLeadForm }}>
      {children}
      <LeadFormModal
        open={args !== null}
        onClose={closeLeadForm}
        contextHeadline={args?.headline}
        contextSubtitle={args?.subtitle}
      >
        <ForeclosureLeadForm
          formLocation={args?.formLocation ?? "property_modal"}
          selectedProperty={args?.selectedProperty}
          submitLabel={args?.submitLabel ?? "Send Me the Details"}
          bare
        />
      </LeadFormModal>
    </LeadFormContext.Provider>
  );
}
