# Foreclosure Landing Page — Conversion Audit
**Date:** 2026-06-11
**Page:** `https://go.88westrealty.com/foreclosure-deals-vancouver`
**Source code:** `app/foreclosure-deals-vancouver/page.tsx` (105 lines, 10 sections)
**Companion:** [2026-06-11-google-ads-audit.md](./2026-06-11-google-ads-audit.md)

---

## Why we're auditing now

Amir's framing: "CTR ratios are quite high but we're not getting any form submissions." The Google Ads side shows that perception is partially driven by:
- **3 real form submissions in 14 days** (1 per ~5 days, feels sparse in real time)
- **Desktop CvR = 0%** on 15 clicks / $37.87 spend — the visible "click but no submission" pattern
- **Mobile CvR = 2.4% web + 1–2 offline = ~3–5% effective** — actually in real-estate benchmark range

So the LP isn't broken on Mobile — it's at industry baseline. The improvement opportunity is two-pronged: (a) lift Mobile from 3% → 5%+, (b) fix the Desktop 0% black hole or stop paying for it.

---

## Current LP architecture

**Section order (page.tsx):**
1. ForeclosureNavbar
2. ForeclosureHero (above-fold) — *no inline form*, two scroll CTAs
3. InventoryPreview (`#deals`)
4. **ForeclosureFormSection** (`#register`) — primary lead form
5. MortgageCliffCallout
6. ProcessExplainer
7. AudienceSplit
8. AgentTrust
9. ForeclosureFAQ
10. GuaranteeAndFinalCTA
11. MedicalFooter + ConsultationStickyMobileCTA + CookieConsent

**Hero CTAs:**
- "See This Week's Deals" (red, primary visual weight) → scrolls to `#deals`
- "Find My Next Deal" (outlined blue) → scrolls to `#register`

**Form structure (`ForeclosureLeadForm` in ForeclosureHero.tsx):**
- 2-step form when `showBuyerType=true` (default)
- Step 1: name, email, phone
- Step 2: buyer type (First-Time / Upgrader / Investor) + optional rent + privacy
- 5 required fields + 1 segmentation step + 6 tracking fields auto-attached (gclid, utm_*)

---

## Findings — ranked

### F-1 (high impact) — No above-the-fold form capture
Above-the-fold has two CTAs that scroll, not a form. Users coming from a "see foreclosure deals" intent click "See This Week's Deals" (the louder red CTA), land on InventoryPreview, and may bounce after seeing the inventory without ever reaching the form. Industry-standard for mobile real estate LPs is **inline form in hero** for sub-3-second engagement.

**Impact estimate:** +20–35% form submission lift if hero-inline-form is tested.

### F-2 (high impact) — Two competing hero CTAs split intent
The visually dominant CTA ("See This Week's Deals" red, with shadow + animation) routes users *away* from the form, not *toward* it. Browse-then-form is a longer commitment path than form-first.

**Impact estimate:** +10–15% if "See This Week's Deals" is removed or demoted (single CTA → form).

### F-3 (medium impact) — Multi-step form adds completion friction
2 steps is fine in principle, but the buyer-type step is a *segmentation question* that benefits 88 West's CRM (routing/personalization) more than it benefits the user. Users at top-of-funnel often abandon when asked to self-classify before they've gotten value.

**Impact estimate:** +5–10% if buyer-type step is removed (collect post-submission via follow-up).

### F-4 (medium impact) — Desktop conversion is 0% on a mobile-first design
The LP is clearly designed mobile-first (`min-h-[520px] md:min-h-[600px]`, mobile-specific copy hidden on `lg:`). At desktop widths the hero image dominates and the form section is "far below" the fold. Combined with desktop users being more likely to be researchers (agents, competitors, info-seekers), the 0% rate is partially structural.

**Impact estimate:** Likely won't fix to 2%+ even with LP changes — desktop intent profile is different. The clean lever here is **device-level bid adjustment**: bid-down Desktop -50% to -100% in Google Ads. Saves ~$80/month while preserving Mobile budget.

### F-5 (low–medium impact) — Form is in section #3 (good positioning) but headline above it leads with "STEP 1 — TELL US WHAT YOU'RE LOOKING FOR"
"STEP 1" wording implies more steps coming. Real users skim and read this as "this is going to be a long process." Could test removing "STEP 1" prefix.

### F-6 (low impact, but worth checking) — Sticky mobile CTA component is present
`ConsultationStickyMobileCTA` should be tracking taps separately from form submissions. If it currently routes to phone/WhatsApp rather than form, that's fine — but ensure those are counted as conversions in their own actions.

### F-7 (data freshness) — Inventory section shows 9 deals from 2026-05-16
LP-consumed `data/foreclosure-deals.json` is **26 days stale**. Fresh scrape (this session, 31 listings) hasn't been curated into the live LP yet. Users seeing "active listings right now" copy paired with stale data erodes trust in a market where listings move fast.

**Fix:** Curate 6–9 fresh deals from `data/foreclosure-deals.scraped.json` and replace `data/foreclosure-deals.json`. Auto-curator (`auto-curate-deals.mjs`) is still pending per the script header.

---

## Recommended A/B test plan

### Test #1 (priority, highest expected lift) — **Hero with inline form**

| Variant | Description |
|---|---|
| A (control) | Current: two CTAs, no form above fold |
| B | Hero with inline 3-field form (name + email + phone), single primary CTA "Get Today's Deal List." Below the fold, the same inventory + full form section as fallback |

Implementation: clone hero component → `ForeclosureHeroVariantB.tsx`. Use Vercel middleware to route ~50/50 by `_ab_lp_cohort` cookie. Both variants post to the same webhook with `variant: 'A'|'B'` field added for GHL routing.

**Sample size needed:** ~250 form submissions per variant to detect 20% lift with 90% confidence. At current ~6/month per variant, that's 80+ days. **Practical alternative:** run for 4 weeks, decide on directional lift even at lower confidence.

### Test #2 (after Test #1 reads) — **Single-step form** (no buyer-type step)

Variant B drops the buyer-type segmentation, collects post-submission via SMS/email follow-up. Smaller expected lift (+5–10%) but quicker to ship (just a flag toggle on the existing form).

---

## Non-test recommendations to ship now

1. **Bid-down Desktop -50%** in Google Ads campaign. (Doesn't need an A/B test — desktop is already 0% converting, lowering bid retains some upside while shifting budget to Mobile.)
2. **Curate fresh deals** into `data/foreclosure-deals.json` from this session's 31-listing scrape. Replaces 26-day-old data.
3. **Tracking check on `ConsultationStickyMobileCTA`** — verify it has its own conversion action wired (call, whatsapp, etc).
4. **Remove "STEP 1 —" prefix** above the form headline — single-character risk, possible small lift.

---

## What we're NOT recommending changing

- **Mobile-first design** — correct given 75% of traffic. Keep it.
- **Trust elements (AgentTrust, GuaranteeAndFinalCTA, ProcessExplainer)** — these are deeper-funnel reassurance. No data suggests they're hurting.
- **Form fields beyond buyer-type** — name/email/phone is the minimum viable. Don't trim further (lower-quality leads).
- **2-step form structure entirely** — single-step variant is a TEST candidate (F-3), not a default change.

---

## Methodology notes

- Google Ads device + conversion data pulled live via `manage.py monitor`
- LP code inspected: `app/foreclosure-deals-vancouver/page.tsx`, `components/foreclosure/ForeclosureHero.tsx`, `ForeclosureFormSection.tsx`, `components/deals/DealsLeadForm.tsx`
- No GA4 / heatmap data accessed in this audit — would strengthen findings if added later
- No live load-tested on desktop vs mobile (recommend Lighthouse run pre-test)

*Audit by Claude Code. Companion to the Google Ads audit of same date.*
