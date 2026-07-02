/**
 * proxy.ts — A/B/C cohort assignment for foreclosure LP test.
 *
 * Note: In Next.js 16+, what was "middleware" is now called "proxy".
 * File location, export name, and matcher config differ from older docs.
 * See node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md
 *
 * Test plan (3 arms as of 2026-06-12):
 *   A — Control. ForeclosureHero (2-CTA hero) + InventoryPreview (gated card
 *       grid) + ForeclosureFormSection (lower form).
 *   B — Hero variant. ForeclosureHeroVariantB (single CTA + inline 3-field
 *       form) + InventoryPreview (gated card grid). No lower form section
 *       (the inline hero form covers it).
 *   C — Inventory variant. ForeclosureHero (control hero) + PortfolioConsole
 *       (financial-app + bento-grid inventory). No lower form section
 *       (PortfolioConsole has its own Strategy Session CTA). Holds the hero
 *       constant vs A so the experiment isolates the inventory-section
 *       change.
 *
 * Comparisons:
 *   A vs B = hero-section change isolated
 *   A vs C = inventory-section change isolated
 *   B vs C = both changed (composite — useful but harder to interpret)
 *
 * Assignment lifecycle:
 *   1. First visit: cookie `_lp_ab_cohort` is missing
 *      → assign A, B, or C via VARIANT_SPLIT (Math.random thresholds below)
 *      → set cookie on response (30-day persistence)
 *      → also set a request-scoped header `x-ab-variant` so page.tsx can read
 *        the assignment on the SAME request (cookies() reads the request, not
 *        the response, so without the header trick first-visit users would
 *        always see Variant A)
 *   2. Subsequent visits: cookie is read, header is mirrored, no re-assignment
 *
 * Attribution: the form reads the cookie at submit time and forwards
 * `experiment_variant: 'A' | 'B' | 'C'` to the GHL webhook + dataLayer payload.
 *
 * Traffic feed:
 *   - Organic / direct / referral: natural split via VARIANT_SPLIT below.
 *   - Google Ads paid: can override per-ad via `final_url_suffix` on the
 *     campaign (currently set to `ab=B` to force paid → B). Operator decides
 *     the per-arm budget; ads-side override skips the random assignment.
 *   - QA / preview: ?ab=A, ?ab=B, ?ab=C on the URL forces and persists.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Variant = "A" | "B" | "C" | "D";

const COOKIE_NAME = "_lp_ab_cohort";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Split thresholds for random assignment. Cumulative — Math.random() < threshold
// picks that variant. Adjust to skew traffic.
//
//   { A: 0.33, B: 0.66, C: 1.00 }  → equal-ish thirds
//   { A: 0.20, B: 0.40, C: 1.00 }  → C-heavy (60% C, 20% A, 20% B) ← current
//   { A: 0.25, B: 0.50, C: 1.00 }  → balanced challenger split
//
// 2026-07-02: added Variant D (ForeclosureListExplorer — ungated searchable
// list + map). Split is now 20/20/30/30 (A/B/C/D) — A control + B hero kept
// small; the two challengers (C console, D list) share the bulk so both
// accumulate conversion data. Adjust to skew.
//
// NOTE: paid Google Ads traffic also flows through this proxy now (the
// foreclosure campaign's `final_url_suffix` was cleared 2026-06-13), so this
// single split governs ALL traffic — paid and organic alike.
const VARIANT_SPLIT = { A: 0.20, B: 0.40, C: 0.70, D: 1.0 } as const;

function isVariant(v: string | null | undefined): v is Variant {
  return v === "A" || v === "B" || v === "C" || v === "D";
}

function assignFromRandom(): Variant {
  const r = Math.random();
  if (r < VARIANT_SPLIT.A) return "A";
  if (r < VARIANT_SPLIT.B) return "B";
  if (r < VARIANT_SPLIT.C) return "C";
  return "D";
}

export function proxy(request: NextRequest) {
  // QA / preview override: `?ab=A` | `?ab=B` | `?ab=C` forces the variant
  // for the current visit AND persists the cookie. Used for stakeholder
  // reviews and post-deploy spot checks. The override only fires when a
  // query param is present — natural traffic gets the VARIANT_SPLIT random
  // assignment instead.
  const forced = request.nextUrl.searchParams.get("ab");
  const forcedVariant: Variant | null = isVariant(forced) ? forced : null;

  const existingCookie = request.cookies.get(COOKIE_NAME)?.value;
  const variant: Variant =
    forcedVariant ??
    (isVariant(existingCookie) ? existingCookie : assignFromRandom());

  // Forward the assignment to the page via a request-scoped header so SSR sees
  // the correct variant on first visit (cookies()-read can't see what we're
  // about to set on the response).
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-ab-variant", variant);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Persist the assignment in a cookie if it's new OR if the query param
  // forced a different variant than the existing cookie (so the override
  // sticks for follow-up page views without the ?ab= param).
  if (!existingCookie || (forcedVariant && existingCookie !== variant)) {
    response.cookies.set({
      name: COOKIE_NAME,
      value: variant,
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
      httpOnly: false, // client needs to read this for the form payload
    });
  }

  return response;
}

export const config = {
  matcher: "/foreclosure-deals-vancouver/:path*",
};
