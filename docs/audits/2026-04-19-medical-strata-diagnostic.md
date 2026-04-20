# Medical Strata Campaign — Full Diagnostic

**Date:** 2026-04-19
**Campaign:** 88West Realty — Medical Strata (North Shore Health Pavilion)
**Landing page:** https://go.88westrealty.com/medical-office-for-sale-north-vancouver
**Status at audit time:** Budget reduced $16/day → $4.50/day due to low conversions

**Companion report:** `/Users/amirsmacbookair/claude/brio-marketing-hub/builtbybrio-seo/google-ads/audits/2026-04-19-medical-strata-audit.md` (auto-generated Google Ads scorecard)

---

## TL;DR

**This is a landing page regression, not an ads problem.** A new Next.js landing page shipped April 9, replacing the prior Astro page. Since the swap, conversions dropped from real (2 GHL leads on April 6) to zero across 12 subsequent days despite 67+ ad clicks. The single biggest contributor: a cookie consent banner that sits on top of the sticky mobile register CTA, forcing users to interact with a cookie prompt before they can engage with the page.

Three stacking landing-page problems caused the regression:
1. Cookie banner overlays the sticky mobile CTA (z-index conflict, mobile-only but mobile = 71% of traffic)
2. Hero leads with industry jargon + scarcity before establishing what the product IS
3. Conversion form is 9 sections deep; average scroll depth is 34%

Ads-side work (new negatives, landing-page-experience ratings) matters only after the page starts converting.

---

## Data sources

| Source | Status |
|---|---|
| Google Ads API | Fresh audit pulled via `python manage.py audit medical-strata --days 30` |
| GHL | Webhook test confirmed pipeline intact (Diagnostic Test contact arrived) |
| Microsoft Clarity | Dashboard screenshot + click heatmap (last 3 days, 15 sessions) |
| Landing-page git history | Commit trail April 9-10 on `go-landing` repo |
| Form/component code | `components/medical/*.tsx`, `lib/constants.ts` |

---

## 1. Google Ads data (last 30 days)

From fresh audit saved at `builtbybrio-seo/google-ads/audits/2026-04-19-medical-strata-audit.md`.

| Metric | Apr 7 | Apr 19 | Trend |
|---|---|---|---|
| Spend | $64 | $237 | +270% |
| Impressions | 280 | 1,176 | +320% |
| Clicks | 19 | 86 | +353% |
| **CTR** | **6.79%** | **7.31%** | Strong (above 5% benchmark) |
| Avg CPC | $3.38 | $2.76 | Improving (-18%) |
| **Conversions** | **1** | **1** | Flat — 0 new conversions in 12 days |
| **CPA** | **$64** | **$237** | Worse (+270%) |
| Impression Share | 24% | 18% | −6pts |

**Interpretation:** Ads are working harder than ever. CTR is above benchmark, CPC is improving, more people are clicking through. But the post-click outcome is flat. That rules out audience/messaging as the primary bottleneck.

Google Ads scorecard: **Grade D (68/100)**. Landing Page category: **1/10**. Quality Score distribution: **0% of spend on QS 7+ keywords** — the landing page rating is actively inflating CPCs across the account.

---

## 2. GHL pipeline integrity check

Direct POST to the GHL webhook with a test payload:

```bash
curl -X POST 'https://services.leadconnectorhq.com/hooks/.../d8c59051-...' \
  -d '{"name":"Diagnostic Test","email":"diag@test.com",...,"source":"audit-diagnostic-2026-04-19"}'
# → HTTP 200
```

**Test contact arrived in GHL** (confirmed by operator). Conclusion: webhook pipeline is intact end-to-end. The conversion drop is not caused by a broken integration. Real visitors are reaching the page but not submitting the form.

---

## 3. Microsoft Clarity data (last 3 days, installed April 10)

From the Clarity `88West Realty` project dashboard filtered to the medical page.

| Signal | Value | Interpretation |
|---|---|---|
| Sessions | 15 (3 bot sessions excluded) | Matches ~5 clicks/day budget |
| Quick backs | 0% | ✓ Visitors are NOT bouncing on arrival — intent is real |
| Rage clicks | 0% | ✓ No frustration-level UX breakage |
| **Scroll depth (avg)** | **34.20%** | 🚨 **Most visitors never see the form (at ~75% depth)** |
| **Active time** | **36 sec (of 1.9 min total)** | Brief engagement, then idle/leave |
| **Dead clicks** | **13.33% (2 of 15 sessions)** | Users click non-interactive elements |
| Pages per session | 1 | Expected (single-page) |

### Click distribution (click heatmap, 10 total taps in 3 days)

| Rank | Element | Clicks | % |
|---|---|---|---|
| 1 | **`BUTTON.flex...`** — cookie Accept button | **4** | **40%** |
| 2 | Stat element "TOTAL AREA …" | 1 | 10% |
| 3 | `svg.lucide.lucide-menu[1]` — hamburger menu | 1 | 10% |
| 4 | `svg.lucide.lucide-x[1]>path[2]` — X close | 1 | 10% |
| 5–7 | Scattered other interactions | 3 | 30% |

**Near-zero clicks on:**
- Navbar "Register" pill
- Hero CTA button
- Sticky mobile register CTA at the bottom of the viewport

**The single most-clicked element on the page is the cookie consent "Accept" button** — 40% of all taps.

---

## 4. Code review (the regression)

### Timeline

```
<Apr 9     Astro landing page in prod (2 leads captured April 6)
Apr 9      Next.js rebuild ships, /medical redirects to /medical-office-for-sale-north-vancouver
Apr 10     Microsoft Clarity + GA4 event tracking added
Apr 9-19   ZERO leads despite 67 more clicks
```

### Structural problems in the new page

Component tree (`app/medical-office-for-sale-north-vancouver/page.tsx`):
```
MedicalNavbar
MedicalHero
MedicalSocialProof
BuildingSpecs
WhoIsThisFor
LocationSection
MedicalFeatures
OwnershipBenefits
RegistrationForm   ← section 9 of 14
MedicalFAQ
FinalCTA
MedicalFooter
MedicalStickyMobileCTA
CookieConsent
```

At 34% average scroll depth, the average visitor gets to roughly the end of `BuildingSpecs` and leaves. They never encounter `RegistrationForm`.

### The z-index conflict (primary problem)

**`CookieConsent.tsx`:** `fixed bottom-0 left-0 right-0 z-[60]`
**`MedicalStickyMobileCTA.tsx`:** `fixed bottom-0 left-0 right-0 z-50 md:hidden`

Both fixed to `bottom-0` on mobile. Cookie banner `z-[60]` wins over sticky CTA `z-50`. On mobile, the primary conversion CTA is hidden under the cookie banner until the user accepts/declines.

### The hero messaging mismatch (secondary)

Current hero:
> **Headline:** *"The North Shore's First Purpose-Built Medical Strata. There Won't Be a Second Chance at First."*
> **Eyebrow:** *"NOW SELLING — NORTH VANCOUVER'S FIRST MEDICAL STRATA"*

Your ad keywords are matching searches like *"commercial property for sale"*, *"office space for sale"*, *"clinic space for sale"*. A searcher at that stage wants to know: what is it, how big, where, how much. The current hero leads with scarcity language (*"There Won't Be a Second Chance at First"*) and industry jargon (*"Purpose-Built Medical Strata"*) without plain-language answers.

---

## 5. Root-cause synthesis

| Layer | Status |
|---|---|
| **Targeting** | ✓ OK — real commercial-property buyers are clicking |
| **Ad creative** | ✓ OK — 7.3% CTR, improving CPC |
| **Technical pipeline** | ✓ OK — webhook live, form posts successfully |
| **Above-the-fold experience** | ❌ Cookie banner blocks primary mobile CTA |
| **Hero messaging** | ❌ Scarcity before product clarity; industry jargon |
| **Form placement** | ❌ 9 sections deep, unreachable at 34% avg scroll |
| **Offer/product-market-fit** | ❓ Cannot evaluate until 1-3 pass; page is currently failing before the offer gets a chance to be seen |

**Diagnosis:** Landing page regression on April 9 is the primary cause of the conversion cliff. Fix landing-page issues first; the market-fit question can only be answered once visitors can actually reach and consider the offer.

---

## 6. Ranked prescriptions

### Fix #1 — cookie banner (today, ~20 min)
- Defer banner display 5 seconds after page load, OR only show after user has scrolled 50% of first viewport
- Lower z-index from `z-[60]` to `z-40` so sticky CTA wins on mobile in any overlap
- Keep all consent logic intact for PIPEDA compliance

Expected impact: restores mobile CTA visibility on first load. Should account for the bulk of the conversion drop since the old Astro page didn't have this banner.

### Fix #2 — hero rewrite (this week, 1-2 hours)
Replace current hero with product-clarity-first:
- **Headline:** *"Own your medical office in North Vancouver."*
- **Subheadline:** *"5-storey, 34,733 SF medical strata. Units from 1,000 SF starting at ~$640/SF. Pre-sale, 2028 completion."*
- **Badge:** Keep "PRE-SALE NOW OPEN"; move *"First Medical Strata"* framing to a secondary section

Expected impact: faster first-3-seconds comprehension → higher scroll depth → more visitors reaching the form.

### Fix #3 — inline hero form (this week, 2-3 hours)
Replace the hero's "Register for Priority Access" button with a 3-field inline form (name, email, phone) that posts to the same webhook. Captures weak-but-present interest without requiring any scroll. Keep the full `RegistrationForm` at section 9 as a secondary path.

Expected impact: captures visitors who would bounce before reaching section 9 — directly addresses the 34% scroll-depth constraint.

---

## 7. Budget reality

At **$4.50/day** budget, the campaign gets ~5 visitors/day. Even with all three fixes shipped, validating improvement will take **2-3 weeks** of accumulated data.

**Recommendation:** after all three fixes ship and are confirmed working (test submission + Clarity verification), raise the budget back to **$10-12/day** for a 2-week validation window. At that rate we'd see ~150-200 clicks in 2 weeks — enough to measure whether conversion rate moved from 0% to a meaningful baseline.

If post-fix conversion rate is still <1% over that window, the issue has moved downstream to product-market-fit and we should reconsider the medical-strata angle vs. broader commercial-property positioning.

---

## 8. What happens next

- [x] Audit documented
- [ ] Fix #1 implemented — cookie banner defer + z-index
- [ ] Fix #2 implemented — hero rewrite
- [ ] Fix #3 implemented — inline hero form
- [ ] All fixes deployed to Vercel
- [ ] Budget raised to $10-12/day once fixes verified
- [ ] Phase 2 monitoring system (see `brio-marketing-hub/monitoring/`) wires in weekly automated diagnosis

Feeding forward to the monitoring system: this diagnostic becomes the template for future campaign audits. The five diagnostic layers (ads → arrival → engagement → form → pipeline) and the data sources used here (Google Ads API + Clarity export + GHL webhook test + code review) become the standard audit playbook.
