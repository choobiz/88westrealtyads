# Phase 2 Synthesis — Foreclosure + Developer Deals Landing Pages

**Author:** Amir Omidvar (synthesis from Phase 1 research)
**Date:** 2026-05-01
**Inputs:** [`competitor-research-foreclosure-2026.md`](./competitor-research-foreclosure-2026.md), [`competitor-research-developer-deals-2026.md`](./competitor-research-developer-deals-2026.md), [`market-research-foreclosure-2026.md`](./market-research-foreclosure-2026.md), [`market-research-developer-deals-2026.md`](./market-research-developer-deals-2026.md), [`hormozi-offers-foreclosure-and-deals.md`](./hormozi-offers-foreclosure-and-deals.md), [`campaign-2-developer-deals-plan.md`](./campaign-2-developer-deals-plan.md)
**Status:** Awaiting user approval before Phase 3 (keyword + SEO blueprint)

---

## TL;DR — Phase 2 picks

1. **Foreclosure LP.** Single recommended angle: **"Greater Vancouver's daily-updated court-ordered sales list — with a 30-day Tour Guarantee."** Primary lead magnet is "The Vancouver Foreclosure Sheet" per the Hormozi doc, but the differentiator on the LP itself is the **buyer-side education + offer-stack guarantee**, since literally every Vancouver competitor is either a lender-pitch site, an ugly IDX dump, or a generic "set alerts" form. We win by being the first true *buyer-side conversion-optimized* foreclosure brand in BC.
2. **Developer Deals LP.** Single recommended angle: **"The $100K Discount"** as the dollar-anchored hero (per Hormozi recommendation — strongest of the three approved angles for a Hormozi-framework launch). Layer **"The Window"** as urgency wrapper inside the page. Reserve **"The $43K Head Start"** as a first-time-buyer-specific *variant* page (`/first-time-buyer-vancouver` already exists — repurpose) that shares the same backend tracker.
3. **Both LPs use the same Money Model architecture** (free Sheet → Pro subscription downsell → full Buyer Agency upsell → Off-Market Alpha continuity). Continuity ("88West Off-Market Alpha") is shared across both verticals — operationally one product, dual-audience offer.
4. **Page architectures are different but follow the same five-block skeleton.** Both use a structure compatible with the existing `/medical-office-for-sale-north-vancouver` stack so we can reuse components.

---

## 1. Foreclosure Deals — Recommended Angle + Page Spec

### Slug
`go.88westrealty.com/foreclosure-deals-vancouver`

### Hero angle
**"Greater Vancouver's daily-updated court-ordered sales list — with a 30-day Tour Guarantee."**

### Hero proof line
*"389 active BC court-ordered listings as of today — including 24 in Greater Vancouver. We send the new ones to your inbox at 7 AM, before MLS sees them."*

(Number is from realestatecoalharbour.com aggregator on 2026-05-01. We'll script a real count once the data feed is live; until then, write it as ~"X+ active" with monthly refresh.)

### Lead magnet
**"The Vancouver Foreclosure Sheet"** — full Hormozi spec lives in [`hormozi-offers-foreclosure-and-deals.md`](./hormozi-offers-foreclosure-and-deals.md). Key form fields above-fold:
- Email + first name + budget bucket + intent (investor / owner-occupier / exploring) + area multi-select (Vancouver / North Van / Burnaby / Richmond)
- Phone is requested on the *thank-you* page, not above-fold (Toronto pattern outperforms BC pattern of demanding phone upfront)

### Conditional guarantee (the differentiator vs. all Vancouver competitors)
**"The 30-Day Tour Guarantee:**
*If our daily Foreclosure Sheet doesn't surface at least one Greater Vancouver property worth touring in your budget within 30 days, our broker will personally call you, walk you through 3 off-market alternatives we're sitting on, AND waive the buyer-agency engagement fee on any deal that comes from that call."*

No Vancouver competitor has any guarantee. Stan Stanchev's 1%-savings-or-10%-rebate is the closest analogue — we copy the architecture, but our guarantee fits the foreclosure context.

### Page architecture (5 blocks)

| # | Block | Purpose | Steal-from |
|---|---|---|---|
| 1 | **Hero + form** — angle, proof line (389+ active), 6-field form, "Get the Sheet" CTA | Lead capture | Toronto's powerofsalelistings.com hero |
| 2 | **Live Inventory Preview** — 6-12 latest sample listings with masked addresses + court-date + spread vs assessment ("Listed: $1.18M — Last assessment: $1.42M — court date Jul 15") | Concrete proof the data is real, not vapor | Auction.com inventory carousel |
| 3 | **"How BC court-ordered sales actually work" educational section** — 3-paragraph plain-English explainer of judicial sale + Schedule A + court date + outbid risk + possession risk | The educational hook earns trust BEFORE the form. Owner-occupier audience needs this most. | Reimers' long educational guide; Pazder's risk explainer; carlycarey.com |
| 4 | **For Investors / For Owner-Occupiers split** — two-column section, audience-specific bullets ("Investors: ROI math, court-date strategy, financing intros to lenders who underwrite subject-frees" / "Owner-Occupiers: financing pre-approval intro, possession-risk handholding, mortgage broker triage") | Acknowledges the dual-audience reality without splitting the page | None — this is a category-creating differentiator |
| 5 | **Trust + final CTA** — agent face photo, brokerage badge (88 West Realty), license #, "we don't represent banks — only buyers" disclaimer, FAQ accordion (5-7 questions), final form repeat | Closes the trust gap that lender-pitch competitors leave open | Nest Presales' "We are not affiliated with any developer" — we adapt to "We don't represent banks; only buyers" |

### Patterns to steal (from competitor research)
1. **Live inventory counter** — every credible site has one ("389 active" → "Updated daily 24/7"). Vancouver has no such counter on any current LP.
2. **"Before Anyone Else" framing** for the email cadence — works for both audiences.
3. **Stacked guarantee** — adapt Stan Stanchev's offer-stack architecture, but tuned to foreclosure context.
4. **Plain-English process explainer** — Reimers' long-form is the model. Owner-occupier audience needs this most.
5. **Schedule A demystification** — competitors mention it; nobody explains it well. We can.

### Anti-patterns to avoid
1. **Lender-pitch confusion** — never mention "if you're a bank or lawyer." Buyer-side ONLY.
2. **Fragmented region IDX dumps** — one unified search filter, not 16 separate region links.
3. **"No listings, check back" empty state** — must always show something live.
4. **Predator language** — never "buy distressed people's homes." Frame as smart-shopping for property in BC's unique judicial sale process.
5. **Speculative discount claims** — no "save 20-40%" without proof. BC's competitive court-bid environment makes this hard to defend.

### Macro narrative for the LP
- **CMHC: ~2 million Canadian mortgages renew across 2025-2026**, $15B/yr in additional payments, BC and ON delinquency rates rising.
- We don't doom-scream. We just say: *"BC's court-ordered listings are at multi-year highs. The pipeline is real."*

---

## 2. Developer Deals LP — Recommended Angle + Page Spec

### Slug
`go.88westrealty.com/developer-condo-deals-vancouver`

### Hero angle
**"$100K Discount."** Specifically:
*"We track every developer concession on Greater Vancouver pre-sales. The current top stack is $[X]K off list price + free parking + decorating credit + mortgage rate buy-down. Get the full Tracker every Monday at 7 AM."*

The Hormozi recommendation is strong: dollar-anchored, falsifiable, every line of copy can quote a real $-off list price. **"The Window"** layers in as urgency wrapper inside the page (urgency on a 6-week horizon: "this incentive expires when 70% of units sell"). **"The $43K Head Start"** becomes a separate first-time-buyer variant page that shares the backend Tracker.

### Lead magnet
**"The Developer Incentive Tracker"** — full Hormozi spec lives in [`hormozi-offers-foreclosure-and-deals.md`](./hormozi-offers-foreclosure-and-deals.md). Same form architecture as the foreclosure LP (email + name + budget + intent + area + phone-on-thank-you-page).

### Conditional guarantee
**"The Incentive-Match Promise:**
*If the Tracker doesn't surface at least one Greater Vancouver developer offer matching your budget and timeline within 30 days, our broker personally walks you through every project where 88West has off-the-record builder relationships — and pre-negotiates a builder-direct concession on your behalf — at no charge."*

### Page architecture (5 blocks)

| # | Block | Purpose | Steal-from |
|---|---|---|---|
| 1 | **Hero + form** — $100K Discount headline, current top-stack proof line, 6-field form | Lead capture | Mike Stewart's hero promise; GTA-Homes' Platinum Access hero |
| 2 | **Live Tracker Preview** — 6-9 active projects with itemized incentive stacks (project name + total $ off + bullet list of concessions) | Proof the data is real | Mike Stewart's incentive grid (steal grid layout, but with our $-totaled headline number) |
| 3 | **"The 5-Stage Developer Release Pyramid" educational section** — adapted from GTA-Homes for BC. Why early-stage incentives are largest, why they disappear at 70-80% sold, how the pyramid means timing matters. Plus a "Decoding Developer Language" translation table reframed as **buyer-side advocacy** ("Their phrase: 'Limited Time' → What it really means: this concession is currently published; check back daily, it tightens as units sell"). | Education earns trust before the form ask. Differentiates us from "VIP list" template competitors. | GTA-Homes' 5-stage pyramid + Mike Stewart's "Decoding Developer Language" — but we reframe as buyer-side, not insider-bro |
| 4 | **For Investors / For Owner-Occupiers / For First-Time Buyers** — three-column or carousel section. Investor: gross/net yield, assignment-clause review, deposit-structure negotiation. Owner-occupier: $100K Discount math vs. resale. First-time buyer: $43K Head Start rebate stacker, eligibility check. | Acknowledges the three audience splits; first-time-buyer column drives traffic to the variant page | None — only Tang & Kung qualifies leads by audience; nobody segments the LP |
| 5 | **Trust + final CTA** — agent face, brokerage badge, license #, **"We don't represent the developer — only you"** disclaimer (verbatim lift from Nest Presales), FAQ, final form | Trust-gap close. Buyer-agent positioning. | Nest Presales' verbatim disclaimer; Mike Stewart's REDMA disclosure language |

### Patterns to steal (from competitor research)
1. **Mike Stewart's daily-updated incentive grid** — but our hero has a *single aggregate $ headline* he doesn't have.
2. **GTA-Homes' 5-stage release-cycle education** — adapted for BC. Nobody in BC educates buyers this way.
3. **"Decoding Developer Language" translation table** — but reframed as buyer-side advocacy, not insider-priesthood.
4. **Nest Presales' "We are not affiliated with any developer"** — verbatim trust line.
5. **Tang & Kung's qualifier form** — best buyer-agent example; we'll adapt for our segmented intent dropdown.

### Anti-patterns to avoid
1. **Generic "VIP list" hero** — every BC competitor has one; we need to be sharper.
2. **Pure aggregator framing without buyer-agent service** — competitors who do this have no upsell path.
3. **Lender / developer-side copy** — buyer-only, always.
4. **Builder-direct microsite framing** — we're aggregating *across* developers, not pitching one.
5. **Vague urgency** — "limited time" without a specific mechanic. Use "expires when X% sold" or "ends [date]."

### Macro narrative for the LP
- 5,458 unsold condos in Metro Vancouver (24-year high; from existing market research).
- Stacked incentives totalling $100K+ are real and current (Mike Stewart's grid shows project-by-project).
- Developers don't cut headline prices because that erodes comparable-sales data; they stack concessions instead.
- Buyer-agent who tracks all of them = $100K+ in concrete savings opportunity for the buyer.

---

## 3. Shared Money Model Stack (both LPs)

| Stage | Foreclosure | Developer Deals |
|---|---|---|
| **Attraction** (free) | The Vancouver Foreclosure Sheet — daily 7 AM digest, live dashboard | The Developer Incentive Tracker — Monday digest + flash alerts |
| **Upsell** (paid commission + $500 refundable activation) | Foreclosure Buyer Concierge — Court-to-Keys: dedicated specialist, court attendance, Schedule A drafting, 90-Day Bid Guarantee | Pre-Sale Negotiator — Builder Direct: specialist, builder-direct intros, deposit negotiation, $25K Concession Guarantee |
| **Downsell** ($49/mo or $490/yr) | Foreclosure Match — Pro: real-time alerts, custom buy-box, monthly strategy call, 5 comp memos/mo, 6-month credit-back to upsell | Pre-Sale Tracker — Pro: real-time SMS, pre-sale buy-box, monthly call, 5 builder memos/mo, 6-month credit-back |
| **Continuity** ($99/mo or $999/yr) | **88West Off-Market Alpha** — same product across both verticals: off-market deal flow, quarterly equity report, refi triggers, referral concierge, mastermind dinners |

**Operational consequence:** the continuity offer is one product, not two. That's a real economic moat — both lead pools feed the same recurring-revenue funnel.

---

## 4. Cross-page architectural decisions

### Component reuse from existing 88West LPs
The existing `/medical-office-for-sale-north-vancouver` page already has the patterns we need:
- `MedicalHero` + `InlineHeroForm` → reusable as `LeadHero` + `InlineHeroLeadForm`
- `MedicalSocialProof`, `MedicalFeatures`, `MedicalFAQ`, `RegistrationForm` → reusable
- `CookieConsent` (with the Apr 20 deferred-display fix) → reusable as-is
- `MedicalStickyMobileCTA` → reusable
- `MedicalNavbar` + `MedicalFooter` → branded variants per page

I'll abstract the medical-specific components into generic ones (`Hero`, `LeadForm`, `FAQ`, etc.) before building the new pages. That way Campaign 3+ inherits the same architecture for free.

### Tracking + GHL infrastructure (Phase 6)

Each new LP needs a **separate webhook URL** in 88West's GHL location, with the build-time `assertWebhookLocation()` guard:

| LP | Source value (for GHL contact attribution) | Webhook URL placeholder |
|---|---|---|
| Foreclosure Deals | `foreclosure-deals-vancouver` | `https://services.leadconnectorhq.com/hooks/7cP5dKRcwCgdBclC1d3m/webhook-trigger/<NEW_TRIGGER_ID>` |
| Developer Deals | `developer-condo-deals-vancouver` | `https://services.leadconnectorhq.com/hooks/7cP5dKRcwCgdBclC1d3m/webhook-trigger/<NEW_TRIGGER_ID>` |

Then add both source values to `builtbybrio-seo/google-ads/config/shared.py::CRM_SYNC.source_to_account` so the hourly Phase B sync auto-uploads them to the Apex Medical / 88West Google Ads offline conversion action.

### Conversion tracking (Google Ads)
Both pages reuse the existing `AW-11020121875` Apex Medical Realty (which is also 88West's tracking) account. Standard:
- Client-side WEBPAGE conversion action (gtag fires on form_submit)
- Offline UPLOAD_CLICKS action (already exists: `7582974906` "CRM Lead (Offline)" — Phase B sync auto-uploads)

### Monitoring
Each new LP gets a `monitoring/campaigns/<slug>/config.yaml` so we can run weekly cross-channel audits. Same template as `medical-strata`.

---

## 5. What's still needed before Phase 3 starts

### Things you (Amir) should confirm
1. **Is the Apex Medical Google Ads account the right account for these new 88West campaigns?** Both new pages are 88West products, not Apex Medical. The current setup runs all 88West Google Ads campaigns through the Apex Medical account because that's the conversion-tracking account they've been using. Two options:
   - **A)** Keep them on Apex Medical (simplest — reuses everything we just built)
   - **B)** Provision a separate 88West-branded Google Ads account (cleaner long-term but adds setup overhead — requires running `manage.py conversions setup-offline-lead --account 88west-realty` and creating a new entry in shared.py)
2. **Hormozi-recommended angle picks** — confirm:
   - Foreclosure: "Daily Sheet + 30-Day Tour Guarantee" hero, single angle (no variants for now)
   - Developer Deals: "$100K Discount" main page + "$43K Head Start" first-time-buyer variant page sharing the same backend Tracker
3. **Lead magnet operational reality** — at launch, can 88West deliver a real daily-updated foreclosure list? If the data feed isn't ready, the page should say "every business morning" instead of "daily" — under-promise. Same for the Developer Tracker (Monday digest is more achievable than daily).
4. **First-time buyer variant** — should `/first-time-buyer-vancouver` (which already exists) be repurposed as the "$43K Head Start" page tied to the Developer Tracker, or kept as a standalone product?
5. **Existing `/vancouver-condo-deals` and `/vancouver-condo-deals-v2` pages** — these are the existing Campaign 2 variants. Should they be:
   - **A)** Replaced by the new `/developer-condo-deals-vancouver` page (cleanest)
   - **B)** Kept as A/B test variants alongside the new page
   - **C)** Redirected to the new page (preserves any existing ad-link state)

### Things I'll handle in Phase 3 (no decisions needed from you)
- Keyword research per page (`local-seo-keyword-finder` skill)
- SEO blueprint per page (`landing-page-seo-optimizer` SPEC mode)
- Geo-targeting refinement for Greater Vancouver

---

## 6. Approval gate

**To proceed to Phase 3, I need a yes/no on these specific items:**

1. ✅/❌ Foreclosure LP angle + slug + lead magnet as specified above
2. ✅/❌ Developer Deals LP angle + slug + lead magnet as specified above
3. ✅/❌ Money Model offer architecture (Sheet → Pro $49 → Concierge → Off-Market Alpha $99) — including the conditional guarantees
4. **Decision needed:** Apex Medical vs. dedicated 88West Google Ads account (Option A or B in §5)
5. **Decision needed:** Existing `/vancouver-condo-deals*` pages — replace, A/B test, or redirect?
6. **Confirmation:** lead-magnet cadence — "daily" vs. "every business morning" vs. "Monday digest"
7. **Confirmation:** keep `/first-time-buyer-vancouver` as the $43K Head Start variant tied to the Tracker?

Once those decisions are in, I'll fire Phase 3 (keyword + SEO blueprint, parallel agents).
