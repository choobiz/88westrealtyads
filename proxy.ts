/**
 * proxy.ts — A/B cohort assignment for foreclosure LP test.
 *
 * Note: In Next.js 16+, what was "middleware" is now called "proxy".
 * File location, export name, and matcher config differ from older docs.
 * See node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md
 *
 * Test plan: ForeclosureHero (control / variant A — current 2-CTA hero, no inline form)
 *   vs. ForeclosureHeroVariantB (treatment / variant B — single-CTA hero with inline 3-field form).
 *
 * Assignment lifecycle:
 *   1. First visit: cookie `_lp_ab_cohort` is missing
 *      → assign A or B (50/50) via Math.random
 *      → set cookie on response (30-day persistence)
 *      → also set a request-scoped header `x-ab-variant` so page.tsx can read
 *        the assignment on the SAME request (cookies() reads the request, not
 *        the response, so without the header trick first-visit users would
 *        always see Variant A)
 *   2. Subsequent visits: cookie is read, header is mirrored, no re-assignment
 *
 * Attribution: the form reads the cookie at submit time and forwards
 * `experiment_variant: 'A' | 'B'` to the GHL webhook + dataLayer payload.
 *
 * Sample size note: at current ~6 form submissions/month, detecting a 20% lift
 * with 90% confidence takes ~80 days. Run for at least 4 weeks before pulling
 * directional reads. See docs/audits/2026-06-11-foreclosure-lp-audit.md.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "_lp_ab_cohort";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function proxy(request: NextRequest) {
  // QA / preview override: `?ab=A` or `?ab=B` forces the variant for the
  // current visit AND persists the cookie. Used for stakeholder reviews and
  // post-deploy spot checks. The override only fires when a query param is
  // present — natural traffic still gets the random 50/50 assignment.
  const forced = request.nextUrl.searchParams.get("ab");
  const forcedVariant: "A" | "B" | null =
    forced === "A" || forced === "B" ? forced : null;

  const existingCookie = request.cookies.get(COOKIE_NAME)?.value;
  const variant: "A" | "B" =
    forcedVariant ??
    (existingCookie === "A" || existingCookie === "B"
      ? existingCookie
      : Math.random() < 0.5
        ? "A"
        : "B");

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
