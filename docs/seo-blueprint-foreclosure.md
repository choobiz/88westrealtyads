# Foreclosure LP — SEO Blueprint (SPEC mode)

**Page slug:** `go.88westrealty.com/foreclosure-deals-vancouver`
**Audience:** Greater Vancouver — investors AND owner-occupiers / first-time buyers
**Hero angle:** *"Greater Vancouver's daily-updated court-ordered sales list — with a 30-day Tour Guarantee."*
**Lead magnet:** "The Vancouver Foreclosure Sheet" — every business morning
**Companion:** [`keyword-research-foreclosure.md`](./keyword-research-foreclosure.md)
**Source spec:** [`phase2-synthesis-foreclosure-and-developer-deals.md`](./phase2-synthesis-foreclosure-and-developer-deals.md) §1
**Author:** Phase 3 SEO agent
**Date:** 2026-04-20

---

## URL + canonical

- **Canonical:** `https://go.88westrealty.com/foreclosure-deals-vancouver`
- **Trailing slash:** No (matches `medical-strata` convention).
- **Subdomain rationale:** `go.88westrealty.com` is the dedicated ads/lead-capture subdomain. All paid traffic lands here. Organic queries land on the same URL — no separate organic clone.
- **HTTPS:** Required. Force https→ via Vercel.
- **www handling:** No www on `go.` subdomain.

---

## Title tag (60-char target)

Three variants ranked by predicted CTR + relevance:

1. **(Recommended)** `Vancouver Foreclosure Sheet | Court-Ordered Sales Daily` — 56 chars
2. `Greater Vancouver Foreclosures — Updated Every Morning` — 54 chars
3. `Vancouver Court-Ordered Sales | Free Daily List 2026` — 53 chars

**Why #1 wins:** explicit lead-magnet noun ("Sheet") + BC-specific vocabulary ("Court-Ordered Sales") + cadence proof ("Daily") inside 60 chars. Matches the hero H1 closely (message-match boost on Quality Score). Ranks for "vancouver foreclosure" + "court-ordered sales" + "vancouver foreclosure list" simultaneously.

---

## Meta description (155–160 char target)

Three variants:

1. **(Recommended)** *"Every Greater Vancouver court-ordered sale, emailed every business morning. Free buyer-side list — no bank affiliation. 30-day Tour Guarantee from 88 West Realty."* — 159 chars
2. *"Daily list of Vancouver, North Van, Burnaby, and Richmond foreclosures. Free, buyer-side only. We explain Schedule A and court date in plain English."* — 152 chars
3. *"389+ active BC court-ordered listings. We send the new ones every business morning — to investors and first-time buyers. Free Sheet. 30-day match guarantee."* — 157 chars

**Why #1 wins:** opens with the value (geo + cadence), closes with the brand + guarantee. The "no bank affiliation" line addresses the strongest objection from competitor research §1.3 (BC Prime / Simon Clayton lender-pitch confusion). 159 chars sits inside the safe limit on both desktop and mobile.

---

## H1

**Recommended H1:** *"Greater Vancouver's Daily-Updated Court-Ordered Sales List."*

**Sub-hero (H2 immediately under H1):** *"389+ active BC court-ordered listings as of today. We send the new Greater Vancouver ones to your inbox every business morning — before MLS sees them. Free, buyer-side only."*

**Constraints met:**
- Includes "court-ordered" + "Greater Vancouver" (must-have per brief)
- Single, falsifiable claim ("389+ active") with footnote citation to `realestatecoalharbour.com` aggregator
- Under-promises cadence ("every business morning") per locked decision
- Buyer-side framing protects against lender-pitch confusion

---

## Heading hierarchy (H2 → H3)

Ordered to match the 5-block architecture from synthesis doc §1.

### Block 1 — Hero + Form
- **H1:** Greater Vancouver's Daily-Updated Court-Ordered Sales List.
- **H2 (sub-hero):** 389+ active BC court-ordered listings — we send the new Greater Vancouver ones every business morning.

### Block 2 — Live Inventory Preview
- **H2:** This Week's Greater Vancouver Court-Ordered Sample
  - *One-line summary:* 6–12 sample listings with masked address, court date, and spread vs. assessment.
  - **H3:** What each row tells you (legend: court date / spread vs assessment / Schedule A flag / condition flag)

### Block 3 — Educational explainer
- **H2:** How BC Court-Ordered Sales Actually Work
  - *Summary:* Plain-English 3-paragraph block (judicial sale vs Ontario power-of-sale, Schedule A, court-day outbid risk, possession risk). Anchors the page for organic ranking on "how does foreclosure work in bc" and similar process-anxiety long-tails.
  - **H3:** The Judicial Sale Process — Step by Step
  - **H3:** Schedule A in 60 Seconds
  - **H3:** What Happens at the Court Date
  - **H3:** Possession Risk — and How to Manage It

### Block 4 — Audience split (For Investors / For Owner-Occupiers)
- **H2:** Whether You're an Investor or a First-Time Buyer, This List Works for You
  - *Summary:* Two-column section, audience-specific bullets.
  - **H3:** For Investors — ROI Math, Court-Date Strategy, Lender Intros
  - **H3:** For Owner-Occupiers and First-Time Buyers — Pre-Approval, Possession Handholding, Financing Triage

### Block 5 — Trust + final CTA
- **H2:** Why 88 West Realty (and the 30-Day Tour Guarantee)
  - **H3:** The 30-Day Tour Guarantee
  - **H3:** Buyer-Side Only — We Don't Represent Banks
  - **H3:** Frequently Asked Questions (FAQ accordion — schema-marked)
  - **H3:** Get the Sheet (final form repeat)

---

## Schema markup (JSON-LD)

All schema in a single `<script type="application/ld+json">` block in `<head>` (or one block per type — implementer's choice; combined `@graph` is preferred).

### LocalBusiness (RealEstateAgent)

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://go.88westrealty.com/foreclosure-deals-vancouver#agent",
  "name": "88 West Realty",
  "url": "https://www.88westrealty.com/",
  "telephone": "+1-604-XXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Vancouver",
    "addressRegion": "BC",
    "addressCountry": "CA"
  },
  "areaServed": [
    {"@type": "City", "name": "Vancouver"},
    {"@type": "City", "name": "North Vancouver"},
    {"@type": "City", "name": "Burnaby"},
    {"@type": "City", "name": "Richmond"}
  ],
  "knowsAbout": ["Court-Ordered Sales", "Judicial Sale BC", "Foreclosure Buyer Representation", "Schedule A"],
  "priceRange": "$$",
  "image": "https://go.88westrealty.com/og/foreclosure-hero.jpg"
}
```
*(Reuse phone, address, and license fields from the existing `medical-office-for-sale-north-vancouver` page schema where they're already populated.)*

### Service

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://go.88westrealty.com/foreclosure-deals-vancouver#service",
  "serviceType": "Foreclosure Buyer Representation",
  "provider": {"@id": "https://go.88westrealty.com/foreclosure-deals-vancouver#agent"},
  "areaServed": "Greater Vancouver",
  "audience": [
    {"@type": "Audience", "audienceType": "Real Estate Investors"},
    {"@type": "Audience", "audienceType": "First-Time Home Buyers"}
  ],
  "name": "Vancouver Foreclosure Sheet — Daily Court-Ordered Sales List",
  "description": "Free daily list of Greater Vancouver court-ordered sales, plus buyer-side specialist representation with a 30-day Tour Guarantee."
}
```

### FAQPage (5–7 sample Q&A — these become the FAQ accordion content)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is buying a foreclosure in BC safe?",
      "acceptedAnswer": {"@type": "Answer", "text": "BC court-ordered sales are court-supervised, so the title is clear at closing. The risks aren't title-related — they're 'as-is, where-is' condition risk, court-date outbid risk, and (rarely) possession risk if the former owner is still in the home. Working with a court-experienced buyer-side broker mitigates each of these."}
    },
    {
      "@type": "Question",
      "name": "What's the difference between a foreclosure and a court-ordered sale in BC?",
      "acceptedAnswer": {"@type": "Answer", "text": "In BC they're the same thing. The legal mechanism is a 'judicial sale' supervised by the BC Supreme Court. Ontario uses 'power of sale' instead, which is contractual — no court oversight required. BC's process is slower but the title is cleaner."}
    },
    {
      "@type": "Question",
      "name": "Can a first-time buyer purchase a court-ordered sale in Vancouver?",
      "acceptedAnswer": {"@type": "Answer", "text": "Yes. Most major Canadian banks finance court-ordered purchases at standard rates and ratios; a few B-lenders refuse, so your mortgage broker matters. The bigger consideration is risk tolerance: you accept the property 'as-is' and may face a competing bid at the court approval hearing. We provide pre-approval intros and walk you through every step."}
    },
    {
      "@type": "Question",
      "name": "What is Schedule A in a BC foreclosure?",
      "acceptedAnswer": {"@type": "Answer", "text": "Schedule A is the lender/court addendum attached to every court-ordered sale offer in BC. It releases the lender and former owner from any condition, warranty, or disclosure responsibility. Holes in walls, missing appliances, surprise liens — all your problem. We draft it with you and explain every line before you sign."}
    },
    {
      "@type": "Question",
      "name": "What happens at the foreclosure court date?",
      "acceptedAnswer": {"@type": "Answer", "text": "The lender's lawyer applies to BC Supreme Court for sale approval. Other buyers can show up with competing subject-free offers; the judge usually awards to the highest bid. Your broker can attend on your behalf and submit improved offers if needed. Once approved, completion typically follows in 1–10 days."}
    },
    {
      "@type": "Question",
      "name": "Are foreclosures in Vancouver actually cheaper?",
      "acceptedAnswer": {"@type": "Answer", "text": "Sometimes. BC's competitive court-bid environment usually closes most properties within 5–15% of fair market value, not 20–40%. The bigger advantage is access to inventory other buyers ignore because of the 'weird process' — and that's where your specialist broker earns their fee."}
    },
    {
      "@type": "Question",
      "name": "Do you represent banks too?",
      "acceptedAnswer": {"@type": "Answer", "text": "No. 88 West Realty is buyer-side only. Sellers (banks and the court) pay our commission, so our representation is yours alone. We're explicit about this because most BC competitors mix buyer and lender representation on the same page — that's a conflict we don't accept."}
    }
  ]
}
```

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "88 West Realty", "item": "https://www.88westrealty.com/"},
    {"@type": "ListItem", "position": 2, "name": "Foreclosures", "item": "https://go.88westrealty.com/foreclosure-deals-vancouver"}
  ]
}
```

---

## Internal linking plan

### Inbound links (from existing 88West properties → this new LP)
- `www.88westrealty.com/` homepage — add a tile in services / featured-pages section linking to "Foreclosure Deals" with anchor "Greater Vancouver Foreclosure Sheet — Daily List."
- `www.88westrealty.com/buyers/` (or equivalent buyer-services page) — paragraph link "Looking for distressed-property opportunities? See our [daily court-ordered sales list]."
- `www.88westrealty.com/blog/*` — any blog posts on Vancouver real estate, mortgage, or affordability should link with anchor "Vancouver foreclosure list" or "Greater Vancouver court-ordered sales."
- `go.88westrealty.com/medical-office-for-sale-north-vancouver` — footer link "Other 88 West campaigns: [Foreclosure Deals]" (subtle; not at the expense of the medical CTA).
- `go.88westrealty.com/first-time-buyer-vancouver` (existing variant) — soft cross-link from FAQ: "Buying a foreclosure as a first-time buyer? See our [process explainer]."

### Outbound links (this LP → other 88West pages)
- Footer anchor: "About 88 West Realty" → `www.88westrealty.com/about`
- Footer: "Privacy" → `www.88westrealty.com/privacy`
- FAQ links to deeper explainers (if/when published): "Schedule A in BC court-ordered sales" → `www.88westrealty.com/blog/schedule-a-bc-foreclosure`
- Sub-page CTA inside the audience-split block: "First-time buyer? See our $43K Head Start page" → `go.88westrealty.com/first-time-buyer-vancouver`

### nofollow rules
- All external citations (CMHC, BC Supreme Court info, REBGV) → `rel="noopener nofollow"` (preserves link equity, signals editorial independence).

---

## Image strategy

**Tone rule:** tasteful, NOT exploitative. No gavel, no boarded-up house, no grim courthouse interior. Vancouver skyline + "buyer with keys" lifestyle + agent face is the right vibe.

| # | Slot | Purpose | Alt-text draft | Source notes |
|---|---|---|---|---|
| 1 | Hero background | Aerial Vancouver skyline (water + mountains) | "Greater Vancouver skyline at golden hour — Stanley Park, downtown towers, North Shore mountains." | Stock (Pexels/Unsplash) — confirm BC real-estate licensing. Dimensions: 1920×900 hero, 768×500 mobile. |
| 2 | Block 2 inventory preview banner | A tasteful sample home exterior (modest, not luxury) | "Vancouver east-side detached home — sample court-ordered listing." | AI-generated via imagegen if no real listing photo cleared. |
| 3 | Block 3 educational illustration | BC Supreme Court building exterior (Robson Street, daytime) | "BC Supreme Court — where every BC court-ordered sale is approved." | Stock or Wikimedia. |
| 4 | Block 4 — investor column | "Buyer reviewing comp report on tablet" lifestyle shot | "Investor reviewing court-ordered sale ROI math." | Stock — keep gender-neutral and age 30–50. |
| 5 | Block 4 — owner-occupier column | "Couple receiving keys" lifestyle shot | "First-time buyers receiving keys to their first court-ordered sale home in Greater Vancouver." | Stock — diverse representation, age 28–45. |
| 6 | Block 5 — agent face photo | Headshot of designated 88West foreclosure specialist | "[Agent name], 88 West Realty buyer-side foreclosure specialist." | Brokerage-supplied real photo. Required — anonymous LPs underconvert. |
| 7 | Footer / OG image | Branded composite (logo + skyline) for social shares | "88 West Realty — Greater Vancouver Foreclosure Sheet." | Custom design. 1200×630 OG, 1200×675 Twitter. |

**Image performance budget:**
- All images served via Next.js `<Image>` with priority loading on hero only
- WebP/AVIF format, lazy-loaded below the fold
- Total image weight on initial load: <600 KB
- Hero LCP image ≤200 KB after compression

---

## Open Graph + Twitter Card

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://go.88westrealty.com/foreclosure-deals-vancouver">
<meta property="og:title" content="Vancouver Foreclosure Sheet | Court-Ordered Sales Daily">
<meta property="og:description" content="Every Greater Vancouver court-ordered sale, emailed every business morning. Free buyer-side list. 30-day Tour Guarantee from 88 West Realty.">
<meta property="og:image" content="https://go.88westrealty.com/og/foreclosure-deals-vancouver.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_CA">
<meta property="og:site_name" content="88 West Realty">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Vancouver Foreclosure Sheet | Daily Court-Ordered List">
<meta name="twitter:description" content="Daily list of Greater Vancouver foreclosures — buyer-side only. 30-day Tour Guarantee.">
<meta name="twitter:image" content="https://go.88westrealty.com/og/foreclosure-deals-vancouver-twitter.jpg">
```

OG image specs:
- 1200×630 PNG/JPG <300 KB
- Branded: "88 West Realty" logo top-left, big "Greater Vancouver Foreclosure Sheet" headline, sub-line "Updated every business morning. Free.", subtle Vancouver skyline backdrop
- Twitter image: 1200×675 (16:9) variant of the same composition

---

## Off-page / citation plan

Prioritized by domain authority + topical fit. Pursue 5–10 over the first 90 days post-launch.

| # | Target | Type | Effort | Priority |
|---|---|---|---|---|
| 1 | REBGV (Real Estate Board of Greater Vancouver) blog | Guest post: "BC court-ordered sales — what buyers ask us most" | Medium | High |
| 2 | BC Real Estate Association — newsroom / member highlights | Press pitch on BC mortgage-renewal-cliff angle | Medium | High |
| 3 | Business in Vancouver (BIV) — real estate vertical | Op-ed pitch: "What 389 active BC foreclosures means for buyers" | High | High |
| 4 | Vancouver Sun — real estate column | Pitch the same angle, more general-audience framing | High | Medium |
| 5 | Globe and Mail BC bureau — real estate desk | Press pitch — same angle, national lens | Very High | Medium |
| 6 | CBC News BC — real estate | Press pitch | High | Medium |
| 7 | Toronto Realty Blog — guest post on BC vs Ontario foreclosure mechanics | Cross-pollinate to ON audience | Low | Medium |
| 8 | Realosophy / John Pasalis blog — guest commentary | Specialist commentary | Low | Low |
| 9 | Vancouver real estate podcasts (Owen Bigland, Adam Chahl, Ralph Case) | Guest appearance pitch | Medium | Medium |
| 10 | Brokerage roll-up directories — RECBC, MLS reciprocity, brokerage parent page | Standard citation hygiene | Low | High (do first) |

**Local citations to verify/build (foundation):**
- Google Business Profile for 88 West Realty
- Bing Places
- Yelp Canada
- BBB Vancouver chapter
- Yellow Pages CA
- Apple Maps connect
- N2C / RankRanger / BrightLocal local-citation audit

---

## Above-the-fold form fields

Per synthesis doc §1 + competitor research §6 cross-check:

**Order (all visible above the fold on desktop; phone-only collapses to single column on mobile):**
1. **Email** — required, type=email, autocomplete=email
2. **First name** — required, type=text, autocomplete=given-name
3. **Budget bucket** — required, select dropdown, 5 options:
   - Under $700K
   - $700K – $1M
   - $1M – $1.5M
   - $1.5M – $2.5M
   - $2.5M+
4. **Intent** — required, radio buttons (3 options):
   - "I'm investing"
   - "I'm buying to live in"
   - "I'm exploring"
5. **Areas of interest** — required, multi-select checkboxes:
   - Vancouver
   - North Vancouver
   - Burnaby
   - Richmond
   - Other Greater Vancouver
6. **CTA button:** *"Send Me Tomorrow's List →"*
7. **Consent checkbox** *(small, below button)*: "Yes, I consent to communication from 88 West Realty about court-ordered sales. I can unsubscribe at any time."

**Phone field is NOT above the fold.** It's requested on the thank-you page (per synthesis spec; competitor research §6 confirms Toronto's phone-on-thank-you pattern outperforms BC's "phone upfront" pattern).

**Fields hidden in form payload:**
- `source` = `foreclosure-deals-vancouver` (for GHL attribution)
- `lp_url`, `gclid`, `utm_*` = standard captured

---

## Trust signal placement

Mapped to the 5-block architecture:

| Block | Trust signals | Placement detail |
|---|---|---|
| 1 (Hero) | "389+ active BC court-ordered listings" badge near CTA; "Free, buyer-side only" microcopy under form | Above the fold |
| 1 (Hero) | RECBC + MLS reciprocity logos in fine print under form | Below form |
| 2 (Inventory preview) | "Updated every business morning" timestamp + "Sample data — full list emailed to subscribers" caveat | Above carousel |
| 3 (Education) | Citation footnotes to BC Supreme Court rules + CMHC | Inline anchor links |
| 4 (Audience split) | Investor block: "10+ court-ordered closings completed by 88 West specialists." Owner-occupier block: "Lender intros to 3 banks that finance court-ordered purchases at prime." | Inline within columns |
| 5 (Trust + final) | **Verbatim disclaimer line: "We don't represent banks; only buyers."** Agent face photo + name + RECBC license #. Brokerage badge. 1–3 named buyer testimonials (city + dollar value won, with permission). FAQ accordion. Final form repeat. | This is the densest trust block |
| Footer | License #, brokerage parent, RECBC badge, MLS reciprocity, privacy, contact phone | Standard footer |

**The "we don't represent banks; only buyers" line MUST appear verbatim** — both in Block 5 trust copy AND in the meta description AND under the hero form. It's the core differentiator vs. BC Prime / Simon Clayton lender-pitch competitors and the strongest single trust signal in the entire research corpus.

---

## Macro narrative integration

Per synthesis doc §1 — the macro story lands in Blocks 2 and 3 without doom-screaming.

### Block 2 — inventory tease anchor
- Above the live preview: *"389 active BC court-ordered listings as of today — the count refreshes every business morning."* (Cite `realestatecoalharbour.com` aggregator with footnote.)
- Right-rail callout: *"~2 million Canadian mortgages renew across 2025–2026 (CMHC). The supply pipeline is real — and it's in your inbox before MLS sees it."*

### Block 3 — educational explainer anchor
- Opening paragraph references CMHC mortgage-renewal data as *context*, not doom: *"CMHC reports ~2 million Canadian mortgages renewing across 2025–2026, with BC and Ontario showing rising delinquency rates. Translation: the inventory exists today, and we surface it for buyers ready to act."*
- Citation: footnote to CMHC Mortgage Industry Report (Nov 2024) + nesto.ca summary.
- Tone calibration: under-state, never predict crash. Per market research §2 counter-narrative — TD Bank's softer renewal-cliff outlook means we don't lean on doomsday claims; we lean on "the supply is here right now."

### Live count refresh policy
- Footer of Block 2: "Count last updated: [DATE TIME]" — script auto-fetches from realestatecoalharbour.com weekly until 88West has its own MLS feed.
- If the feed isn't ready at launch: the page must say "**~389 active**" with footnote rather than a precise number; never claim a number we can't refresh.

---

## Performance targets

| Metric | Target | Why |
|---|---|---|
| Mobile page weight (initial transfer) | <1.5 MB | Synthesis spec; acceptable for real-estate vertical mobile-first |
| LCP (Largest Contentful Paint) — mobile | <2.4s | Quality Score input; Google Ads punishes slower LPs |
| FID (First Input Delay) | <100ms | Form interaction must be snappy |
| CLS (Cumulative Layout Shift) | <0.05 | Form-field jumps cause abandonment |
| TTFB | <500ms | Vercel CDN target |
| Mobile Lighthouse Performance | ≥90 | Hard floor for ad LP |
| Mobile Lighthouse Accessibility | ≥95 | Required for diverse audience (FTB segment includes vision-impaired users) |
| Image total weight | <600 KB | All images WebP/AVIF, hero ≤200 KB |
| JS bundle (initial) | <150 KB gz | Reuse component library from medical-strata; minimize new deps |
| Number of fonts | 1 family, 2 weights | Match site convention |

**Mobile-first requirements (synthesis §1):**
- Sticky mobile CTA (reuse `MedicalStickyMobileCTA` pattern)
- Hero form is single-column on mobile, max 5 visible inputs without scrolling
- All tap targets ≥48×48 px
- Skip-link to form for screen-readers

---

## Pre-launch SEO audit checklist

15 line items the build must verify before going live:

1. [ ] Canonical tag present and correct (`https://go.88westrealty.com/foreclosure-deals-vancouver`)
2. [ ] No conflicting `<meta name="robots">` — should be `index, follow` (or omitted)
3. [ ] `<title>` matches the recommended variant (60 chars, includes Vancouver + Court-Ordered)
4. [ ] Meta description set (155–160 chars; "no bank affiliation" line present)
5. [ ] H1 present, single, includes "Greater Vancouver" + "Court-Ordered" or "Foreclosure"
6. [ ] All images have `alt` attributes (no decorative-only without empty `alt=""`)
7. [ ] OG + Twitter Card tags populated; OG image renders in Sharing Debugger / Twitter Validator
8. [ ] JSON-LD validates in [validator.schema.org](https://validator.schema.org/) (LocalBusiness + Service + FAQPage + BreadcrumbList)
9. [ ] Google Search Console — submit URL for indexing + verify mobile usability
10. [ ] Sitemap (`sitemap.xml`) updated with new URL + `lastmod`
11. [ ] `robots.txt` does NOT block the new path
12. [ ] GA4 event `lead_form_submit` fires on form completion (test with DebugView)
13. [ ] Google Ads conversion `AW-11020121875` fires on form submit (test with Tag Assistant)
14. [ ] Meta Pixel `Lead` event fires (test with Facebook Pixel Helper)
15. [ ] GHL webhook (`https://services.leadconnectorhq.com/hooks/.../webhook-trigger/...`) receives test submission with correct `source` value `foreclosure-deals-vancouver`
16. [ ] `assertWebhookLocation()` build-time guard passes (per synthesis §4)
17. [ ] PageSpeed Insights mobile score ≥90; LCP <2.4s
18. [ ] Form has accessible labels; keyboard-navigable; screen-reader tested
19. [ ] Cookie consent banner displays (with the Apr 20 deferred-display fix)
20. [ ] HTTPS forced; no mixed-content warnings in console
21. [ ] Spelling/grammar pass on every block (especially the "we don't represent banks; only buyers" verbatim line)
22. [ ] FAQ schema Q&A text matches visible page Q&A text exactly (Google requirement)

---

*End — SEO blueprint file.*
