# Developer Deals — SEO Blueprint (SPEC mode)

**Author:** SEO blueprint synthesis agent
**Date:** 2026-04-20
**Mode:** SPEC (pre-build) — generates blueprint to be implemented by next.js + landing-page-builder
**Inputs:**
- `phase2-synthesis-foreclosure-and-developer-deals.md` (page architecture §2)
- `campaign-2-developer-deals-plan.md` (3-angle approval)
- `keyword-research-developer-deals-2026.md` (keyword foundation)
- `KEYWORD-MATRIX-developer-deals.md` (keyword matrix + ad groups)
- `competitor-research-developer-deals-2026.md` (Mike Stewart + GTA-Homes + Nest Presales teardown)
- `market-research-developer-deals-2026.md` (5,458 unsold condos, $100K stacked incentives)
- `hormozi-offers-foreclosure-and-deals.md` (Money Model — Tracker + Negotiator + Off-Market Alpha)

**Locked decisions (not re-derived):**
- Canonical: `go.88westrealty.com/developer-condo-deals-vancouver`
- FTB variant: `go.88westrealty.com/first-time-buyer-vancouver` (existing page repurposed; shares Tracker backend)
- Geo: Greater Vancouver — Vancouver, North Vancouver, Burnaby, Richmond
- Lead magnet: "The Developer Incentive Tracker" — Monday digest 7 AM PT + mid-week flash alerts
- Money Model: Continuity-only ($99/mo Off-Market Alpha, past-clients-invitation-only). NO $49/mo Pro downsell.
- Conditional guarantee: "Incentive-Match Promise" (softened — broker walks prospect through 88West's off-the-record builder relationships at no charge)
- Google Ads: Apex Medical Realty `7077162356`, reuses CRM Lead (Offline) action `7582974906`
- 301 redirects: `/vancouver-condo-deals` and `/vancouver-condo-deals-v2` → `/developer-condo-deals-vancouver`

---

## Page 1: `/developer-condo-deals-vancouver` (canonical "$100K Discount" page)

### URL + canonical
- **Path:** `/developer-condo-deals-vancouver`
- **Canonical URL:** `https://go.88westrealty.com/developer-condo-deals-vancouver`
- **Self-referencing canonical** in `<head>` (no trailing slash, lowercase, no query params except UTM which should be excluded from canonical)
- **Robots:** `index, follow` (this is a primary SEO target)
- **hreflang:** `en-CA` (no other locales for now)

### Title tag (3 variants — ranked)

1. **`$100K Off Vancouver Condos: Developer Incentives Tracker | 88 West Realty`** (60 chars) — winner: dollar-anchored, brand suffix, "Tracker" implies productized lead magnet
2. **`Vancouver Presale Condo Deals & Developer Incentives 2026 | 88 West Realty`** (74 chars — slightly long but exact-match for Mike Stewart's head term)
3. **`Vancouver Condo Deals — $100K+ in Stacked Developer Incentives | 88 West`** (72 chars — $100K hero anchor)

**Recommended:** #1. Dollar number outperforms generic "Deals" framing in CTR tests for high-AOV verticals. Keep brand at end so the $ shows above the fold of the SERP snippet on mobile.

### Meta description (3 variants)

1. **(Recommended)** *"5,458 unsold Vancouver condos. We track every developer incentive — cash credits, free parking, rate buy-downs — across Vancouver, Burnaby, Richmond, North Van. Get the Tracker every Monday at 7 AM. Free."* (228 chars)
2. *"Real estate's most aggressive incentive environment since 2018 — $100K+ stacked across cash credits, free parking, mortgage buy-downs, and assignment fees waived. The Developer Incentive Tracker delivered Monday at 7 AM. Free, no spam."* (245 chars — trimmed for SERP)
3. *"BC's only buyer-side incentive aggregator. We don't represent the developer — only you. Track every Vancouver, Burnaby, Richmond and North Van developer concession in one Monday digest."* (205 chars)

### H1
**`$100,000 Off a Brand-New Vancouver Condo. We Track Every Developer Concession.`**

(Backup variant for A/B: `Developers Are Stacking $100K+ in Hidden Incentives. Most Buyers Never See the Full Stack.`)

### H2 hierarchy (page-order — aligned with synthesis §2 5-block architecture)

1. **H2 — "This Week's Top Stacked Incentive: $[X]K Off + Free Parking + Rate Buy-Down"** *(Block 1: Hero proof line)*
2. **H2 — "Live Tracker Preview — 6 Active Greater Vancouver Buildings With $50K+ Stacked Incentives"** *(Block 2: Live inventory preview, mirrors Mike Stewart's grid but with single-aggregate-$ headline he doesn't have)*
3. **H2 — "Decoding Developer Language: 12 Phrases Builders Use vs. What They Actually Mean"** *(Block 3a: translation table — buyer-side advocacy reframe of Mike Stewart's table)*
4. **H2 — "The 5-Stage Developer Release Pyramid (and Why Public Buyers Pay $50K–$150K More)"** *(Block 3b: GTA-Homes' education adapted for BC)*
5. **H2 — "For Investors / For Owner-Occupiers / For First-Time Buyers"** *(Block 4: 3-column audience split. The first-time-buyer column links to the FTB variant page)*
6. **H2 — "Why 88 West Realty? We Don't Represent the Developer — Only You"** *(Block 5a: trust + Nest Presales verbatim disclaimer)*
7. **H2 — "Frequently Asked Questions About Vancouver Developer Deals"** *(Block 5b: FAQ, 7 Q&A — schema-targeted)*
8. **H2 — "Get the Tracker. Every Monday. Free."** *(Block 5c: final CTA + form repeat)*

**H3s under each H2:**
- Under H2 #2: H3 per project tile (project name)
- Under H2 #3: H3 per phrase row (e.g., "5% deposit", "Decorating allowance")
- Under H2 #4: H3 per stage (Stage 1: Friends & Family, Stage 2: Platinum/VIP, etc.)
- Under H2 #5: H3 "For Investors", H3 "For Owner-Occupiers", H3 "For First-Time Buyers (See $43K Head Start →)"
- Under H2 #6: H3 "Licensed BC Brokerage", H3 "Buyer-Side Only", H3 "Incentive-Match Promise"

### Schema markup (JSON-LD — placed in `<head>`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://go.88westrealty.com/developer-condo-deals-vancouver#org",
      "name": "88 West Realty",
      "description": "Licensed BC brokerage specializing in buyer-side representation for Greater Vancouver pre-sale and resale condos.",
      "url": "https://88westrealty.com",
      "logo": "https://go.88westrealty.com/images/88west-logo.png",
      "image": "https://go.88westrealty.com/images/agent-headshot.jpg",
      "telephone": "+1-604-XXX-XXXX",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[88West office address]",
        "addressLocality": "Vancouver",
        "addressRegion": "BC",
        "postalCode": "[postal]",
        "addressCountry": "CA"
      },
      "areaServed": [
        { "@type": "City", "name": "Vancouver" },
        { "@type": "City", "name": "North Vancouver" },
        { "@type": "City", "name": "Burnaby" },
        { "@type": "City", "name": "Richmond" }
      ],
      "priceRange": "$$$",
      "sameAs": [
        "https://www.instagram.com/88westrealty",
        "https://www.linkedin.com/company/88-west-realty"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://go.88westrealty.com/developer-condo-deals-vancouver#service",
      "serviceType": "Pre-sale buyer representation",
      "provider": { "@id": "https://go.88westrealty.com/developer-condo-deals-vancouver#org" },
      "areaServed": "Greater Vancouver, BC",
      "name": "Developer Incentive Tracker + Pre-Sale Buyer Representation",
      "description": "Buyer-side aggregation of Greater Vancouver developer incentives, with licensed buyer-agency representation at no cost to the buyer. Builder commissions paid at closing — never by the buyer.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "CAD",
        "availability": "https://schema.org/InStock",
        "description": "The Developer Incentive Tracker — Monday digest at 7 AM PT plus mid-week flash alerts. Free."
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are presale condos worth it in Vancouver in 2026?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "With developers stacking $100K+ in incentives (cash credits, free parking, rate buy-downs), 5% deposits, and the new federal GST rebate saving first-time buyers up to $50K, 2026 presents the strongest buyer conditions in over 20 years. The key is reading the incentive stack correctly — that's what the Developer Incentive Tracker is for."
          }
        },
        {
          "@type": "Question",
          "name": "What incentives are Vancouver condo developers offering right now?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Currently active across Greater Vancouver: 5% deposit structures, $25K–$50K cash credits, free parking ($40K–$80K value), waived assignment fees, mortgage rate buy-downs, decorating allowances, and strata-fee holidays. Stacked, these can total $100K+ on a $700K unit — a 14%+ effective discount the developer holds off the headline price to protect comparable-sales data."
          }
        },
        {
          "@type": "Question",
          "name": "How can I see the full stack of incentives on a specific project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Developer Incentive Tracker itemizes every incentive per project — cash credit, parking, storage, rate buy-down, fee waivers, GST/PTT eligibility — with a single total $ figure. Subscribers get the full breakdown delivered every Monday at 7 AM, plus mid-week flash alerts when a developer changes the stack."
          }
        },
        {
          "@type": "Question",
          "name": "Is 88 West Realty affiliated with any developer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. 88 West Realty is a licensed BC brokerage. We work as buyer-side agents only — paid by the developer at closing on the buyer's behalf, never by you. We curate the Tracker based on which deals are genuinely the best buyer value, not on which developer pays us most."
          }
        },
        {
          "@type": "Question",
          "name": "Is it actually a buyer's market for condos in Vancouver right now?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Sales-to-active listings ratio is 10.3% for condos — firmly in buyer's market territory (under 12%). 5,458 unsold completed condos sit in Greater Vancouver, the highest in 24 years. Buyers have negotiating leverage that hasn't existed since 2009."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Incentive-Match Promise?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If the Tracker doesn't surface at least one Greater Vancouver developer offer matching your budget and timeline within 30 days of subscribing, our broker walks you through 88 West's off-the-record builder relationships and pre-negotiates a builder-direct concession on your behalf — at no charge."
          }
        },
        {
          "@type": "Question",
          "name": "Will Vancouver condo prices recover by 2027?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BCREA forecasts 3% growth in 2026 with potential for 27% appreciation by 2032 as the supply glut absorbs and the presale pipeline dries up. Only 64 presale homes launched in February 2026 (6% of normal). The future supply shortage is building right now — buyers acquiring through the current incentive window are positioned for that recovery."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://88westrealty.com" },
        { "@type": "ListItem", "position": 2, "name": "Developer Condo Deals Vancouver", "item": "https://go.88westrealty.com/developer-condo-deals-vancouver" }
      ]
    }
  ]
}
```

**Important: NO Product schema** — we're not selling a SKU; the Tracker is a free lead magnet. `Service` schema correctly represents the buyer-agency offering.

### Above-the-fold form fields (validated against Mike Stewart + Tang and Kung competitor specs)

**Form (one inline above-fold + sticky right-rail OR mobile-bottom-fixed):**
1. **First name** (required, text)
2. **Email** (required, email validation)
3. **Phone** (optional above-fold, requested on thank-you page for SMS alerts) — Toronto pattern outperforms BC pattern of demanding phone upfront
4. **Budget bucket** (required, select): Under $700K / $700K–$1M / $1M–$1.5M / $1.5M–$2.5M / $2.5M+
5. **Buyer intent** (required, select): I'm investing / I'm buying to live in / I'm a first-time buyer / I'm exploring
   - **Conditional logic:** if "first-time buyer" selected, surface a contextual link: *"You may also want our $43K Head Start guide → /first-time-buyer-vancouver"*
6. **Areas of interest** (required, multi-select checkboxes): Vancouver / North Vancouver / Burnaby / Richmond / Anywhere
7. **Submit CTA:** *"Get This Monday's Tracker →"* (specific time, specific output, action verb)

**Hidden fields (auto-populated):**
- `source` = `developer-condo-deals-vancouver`
- `lead_magnet` = `developer-incentive-tracker`
- `utm_*` capture
- `gclid` for Google Ads offline conversion attribution

**Microcopy under form:** *"No spam. Unsubscribe anytime. We share your info with no one — ever."*

### Trust signal placement

- **Verbatim line (lift from Nest Presales, sourced in competitor research):** *"We are not affiliated with any developer. 88 West Realty is a licensed BC brokerage. We don't represent the developer — only you."* — placed twice: once in hero subhead, once in Block 5 trust section
- **Brokerage badge:** 88 West Realty logo + "Licensed BC Brokerage" badge in hero, repeated in footer
- **Agent face photo:** real-estate buyer-agent positioning — single agent face above the form (not a team grid; Mike Stewart's pattern). Caption: name + "Buyer-Side Agent | 88 West Realty | License #[XXXXX]"
- **License #:** displayed in footer per BC FICOM/BCFSA disclosure requirements
- **Live data timestamp:** *"Last updated: [date]. [N] new incentives this week."* — falsifiable trust signal (steal Mike Stewart's daily-update pattern)
- **Aggregate-buyer proof (only when real data available):** *"Subscribers in 2026 saved an average $XX,XXX in stacked incentives — without negotiating a dollar off list price."* (placeholder until first cohort closes; do not fabricate)
- **REDMA-equivalent disclosure:** small print near form — *"Developer commissions paid at closing per BC Real Estate Services Act. No fee charged to buyer."*

### Image strategy (5–7 slots with alt text drafts)

| # | Slot | Image direction | Alt text |
|---|---|---|---|
| 1 | Hero background (above fold) | Clean Vancouver skyline at golden hour from Stanley Park or Coal Harbour — sharp, current (post-2024), cranes visible to telegraph "active development". NOT generic luxury condo lifestyle. | `Vancouver downtown skyline showing active condo developments and cranes — Greater Vancouver presale market 2026` |
| 2 | Block 2 banner (live tracker preview) | Presale construction worksite — visible tower under construction, scaffolding, crane | `Vancouver presale condo tower under construction with developer incentive offers active` |
| 3 | Block 3 (Decoding Developer Language) | Side-by-side "marketing brochure vs. annotated reality" — Brochure with marketing language, with red-pen markup translating phrases | `Annotated developer marketing brochure showing what presale incentive language actually means for buyers` |
| 4 | Block 4 (Audience split) | 3 lifestyle shots in horizontal grid: (a) investor reviewing spreadsheet on laptop, (b) couple touring a finished suite, (c) young first-time-buyer signing paperwork. Vancouver-shot, diverse, not stocky. | (a) `Vancouver condo investor reviewing rental yield analysis on laptop`, (b) `Owner-occupier couple touring brand-new Vancouver presale condo suite`, (c) `First-time buyer signing presale contract with $43K rebate stack — 88 West Realty` |
| 5 | Block 5 trust section | Agent face headshot — clean, professional, current (within 12 mo), eye contact, real-estate-buyer-agent positioning | `[Agent name], Buyer-Side Agent at 88 West Realty, licensed BC brokerage` |
| 6 | Block 5 brokerage badge | 88 West Realty logo + BCFSA license display | `88 West Realty — licensed BC brokerage logo` |
| 7 | (Optional) Footer city collage | 4-quadrant micro-images: Vancouver / North Van / Burnaby / Richmond skyline highlights | `Greater Vancouver areas served by 88 West Realty: Vancouver, North Vancouver, Burnaby, Richmond` |

**Image source priorities:** AI-generated via `landing-page-image-sourcer` skill (imagegen-mcp + Flux 2 Pro for skylines/construction; GPT Image 1 for annotated brochure mockup). Stock fallback via Pexels/Unsplash with `vancouver presale construction` and `vancouver skyline 2026` queries. Avoid: generic "luxury condo" stock; out-of-date skyline images (pre-Brentwood completion); model-suite renders provided by developers.

### Open Graph + Twitter Card

```html
<meta property="og:title" content="$100K Off Vancouver Condos: The Developer Incentive Tracker">
<meta property="og:description" content="5,458 unsold Vancouver condos. We track every developer incentive — cash credits, free parking, rate buy-downs. Monday digest at 7 AM. Free.">
<meta property="og:image" content="https://go.88westrealty.com/og/developer-condo-deals-vancouver.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://go.88westrealty.com/developer-condo-deals-vancouver">
<meta property="og:type" content="website">
<meta property="og:site_name" content="88 West Realty">
<meta property="og:locale" content="en_CA">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="$100K Off Vancouver Condos: Developer Incentive Tracker | 88 West">
<meta name="twitter:description" content="We track every Vancouver, Burnaby, Richmond, North Van developer concession. Monday digest at 7 AM. Free.">
<meta name="twitter:image" content="https://go.88westrealty.com/og/developer-condo-deals-vancouver.jpg">
```

**OG image content recipe:** Vancouver skyline left half + bold "$100K Off" stacked numbers right half + 88 West Realty logo bottom right. White background option for SERP image-pack pickup.

### Off-page / citation plan (10 items)

1. **Google Business Profile** — confirm 88 West Realty GBP service area covers Vancouver, North Van, Burnaby, Richmond. Add "Pre-sale buyer representation" as a service listing pointing to this page.
2. **GBP Posts** — weekly post linking to the page with the week's top stacked-incentive headline ("This week: $94K credit at Solhouse 6035")
3. **Realtor.ca / REW.ca agent profiles** — link to this page from the broker bio under "Specialties: Pre-sale buyer representation"
4. **88westrealty.com main site** — homepage banner + footer link to `go.88westrealty.com/developer-condo-deals-vancouver`. Internal linking signal critical for transferring main-site authority.
5. **88 West Realty YouTube** — pin a 3-5 min "How to read a developer incentive stack" video, link to this page in description
6. **Local citations refresh** — Yelp, Yellow Pages, BBB Canada, Cylex.ca, Nimbus, Houzz Pro — confirm consistent NAP (Name/Address/Phone) and add page link where possible
7. **BC real estate trade publications** — Western Investor, BIV (Business in Vancouver), Storeys.com — pitch a "data-driven analysis of Vancouver developer incentives in 2026" guest post linking to this page
8. **Reddit /r/vancouverhousing /r/realestatecanada** — value-first answer posts (no spam) referencing the Tracker as a public-data resource. Account must have post history.
9. **Substack / LinkedIn** — Amir / 88West agent bylines weekly: "Developer Incentive Tracker — Week of [date]" cross-published, linking back to the canonical page
10. **Local PR** — pitch CBC Early Edition / CKNW Mornings on the "5,458 unsold condo" angle when seasonal data refreshes, with the Tracker as the buyer-resource takeaway

### "Decoding Developer Language" translation table content (10 rows, expandable to 12)

| Their phrase | What it really means (buyer-side) |
|---|---|
| "5% deposit" | Their lender just lowered the absorption threshold. Their carrying cost is now your leverage — extended payment timelines often available beyond what's published. |
| "Decorating allowance" | A price drop the developer hides to protect comparable-sales data. Frequently negotiable as cash off the closing total instead of credits. |
| "GST included" | Worth $35K–$50K on a $700K-$1M new home. Verify the base price wasn't quietly raised first — compare to comparable resale $/sqft. |
| "Free parking" | $40K–$80K of value. If you weren't planning to buy parking, ask if it can be converted to a price reduction equivalent. |
| "Limited time" | This published concession will likely tighten as the project hits 70–80% sold. Concession size is correlated with developer's lender absorption clock, not a marketing deadline. |
| "Mortgage rate buy-down" | Worth $10K–$30K depending on basis points × term × notional. Calculate the $ value yourself — never accept the headline rate without the cash-equivalent math. |
| "Strata fee holiday" | 6–12 months of strata fees ($3K–$10K). Real value but disappears at month 13 — model your year-2 carrying cost honestly. |
| "Assignment-friendly" | Investor-targeted. Means waived assignment fee (typically 2–4% of contract price = $14K–$40K). Separately ask whether *re*-marketing on MLS is permitted. |
| "Closing-cost coverage" | Legal fees, title insurance, adjustments — $3K–$8K. Useful but small relative to the headline incentive. |
| "Bonus suite finishes" | Upgraded countertops, appliances, flooring. Often $10K–$25K of upgrade-list value at developer cost (which is 40–50% of the retail upgrade-list price you'd pay elsewhere). |
| "From just $X99,900" | Almost always one unit, typically the smallest, north-facing or facing the loading dock. Verify the actual unit availability at the headline price. *(Verbatim Mike Stewart pattern, reframed buyer-side.)* |
| "VIP access" | Industry-standard pre-public release window. Real value if your broker has builder relationships; vapor if they don't. |

### "5-Stage Developer Release Pyramid" educational section

Adapted from GTA-Homes' Platinum Access education for BC market context:

**Stage 1 — Friends & Family (price baseline = A)**
- Earliest pricing, often -10% to -15% off public release
- Restricted to developer staff, board members, family. Almost never accessible to public buyers.
- Currently in BC: rare and not material to public-buyer strategy.

**Stage 2 — Platinum / VIP Brokers (price ≈ A + $0–$5K)**
- 88 West Realty operates here. Buyer agents with builder relationships get early floor-plan access, first allocation on best units, and the published incentive stack at this stage.
- Window: 2-6 weeks before public open.
- **Why this stage matters in 2026's buyer's market:** with 5,458 unsold completed units across Greater Vancouver, builders are extending Platinum pricing further into the project lifecycle than they would in a balanced market.

**Stage 3 — Public Launch (price ≈ A + $20K–$40K)**
- Public sale center opens. Headline price published. Best floor plans frequently already absorbed by Stage 2.
- The "incentive stack" is what fills the price gap — it's the developer holding pricing data while quietly discounting through alternative mechanisms.

**Stage 4 — Construction-Period Assignments (price ≈ A + $50K, but ranging widely in 2026)**
- Original presale buyers from 2021–2022 facing $150K+ losses are assigning at *below* original contract.
- Net effect: assignment buyers in 2026 can sometimes acquire 30%-built units below Stage 2 pricing — but with assignment-fee, financing, and assignability friction.
- **2026 anomaly:** assignment market dysfunction means buyers willing to navigate the friction can occasionally beat Stage 2 pricing. This is unusual and reflects the post-peak distress described in `market-research-developer-deals-2026.md`.

**Stage 5 — Completion & Standing Inventory (price ≈ A + $80K nominal — but in 2026, currently flat-to-down)**
- Historically 25–40% above original Stage 1 pricing.
- **2026 reality:** with 5,458 completed unsold units, Stage 5 pricing has compressed back toward Stage 3 in many submarkets (Brentwood, Metrotown, Surrey Centre).
- Strongest negotiating leverage stage in current market — but you're competing against next-quarter completions arriving with bigger incentives, so timing is critical.

**Conclusion section (text):**
*"In a normal market, Stage 2 (where 88 West Realty operates) saves a buyer $50K–$150K vs. Stage 5. In 2026's market, Stages 2 and 5 are both anomalously favorable — but Stage 2 still wins on best-floor-plan availability, and Stage 5 wins on full unit-condition inspection. The Tracker covers both."*

### Performance targets

- **Largest Contentful Paint (LCP):** <2.0s on Mobile Lighthouse (target <1.5s)
- **Cumulative Layout Shift (CLS):** <0.05
- **First Input Delay (FID) / Interaction to Next Paint (INP):** <100ms
- **Total page weight:** <1.2 MB initial bundle (excluding hero image; hero ≤200 KB optimized AVIF/WebP)
- **Lighthouse SEO score:** ≥98
- **Form submission TTFB:** <300ms (GHL webhook is the hard floor; client-side optimistic submit then async webhook fire-and-forget)
- **Form fill rate (above-fold):** target ≥6% of unique visitors (Mike Stewart benchmark is ~4-5% by inference; we should beat with sharper $ hook)
- **CWV thresholds verified for Mobile-First Index** (this campaign is ~70%+ mobile traffic per medical-strata baseline)

---

## Page 2: `/first-time-buyer-vancouver` ("$43K Head Start" variant)

### URL + canonical
- **Path:** `/first-time-buyer-vancouver` (existing — repurposed, not new)
- **Canonical URL:** `https://go.88westrealty.com/first-time-buyer-vancouver`
- **Robots:** `index, follow`

### Title tag (3 variants — ranked)

1. **`First-Time Buyer Vancouver: $43K Head Start in Stacked Rebates | 88 West`** (66 chars) — winner: dollar-anchored, FTB intent term head, brand suffix
2. **`Vancouver First-Time Home Buyer Programs: GST Rebate + PTT + FHSA Stack | 88 West`** (81 chars — long but exact-match for program-search head terms)
3. **`First Home Vancouver: Stack $43K in Government + Developer Rebates | 88 West`** (74 chars)

**Recommended:** #1.

### Meta description (3 variants)

1. **(Recommended)** *"First-time buyer in Vancouver? Stack the $50K federal GST rebate, $8K BC property transfer tax exemption, FHSA, RRSP HBP and developer incentives — up to $83K combined. We show you every dollar. Free guide + Tracker."* (240 chars)
2. *"$43K from the government + $40K from the developer = $83K off your first Vancouver condo. The $43K Head Start guide and Developer Incentive Tracker — both free. 88 West Realty."* (197 chars)
3. *"BC's first-time buyer rebate stack is bigger than most realtors realize. GST + PTT + FHSA + BC HOMES + developer incentives — all in one Monday digest. Free, no spam."* (192 chars)

### H1
**`The Government Will Hand You $43,000 Toward Your First Vancouver Home. The Developer Will Match It. Do the Math.`**

(Backup A/B variant: `First-Time Buyer in Vancouver? You're Eligible for $43K in Government Rebates Most Buyers Never Stack Correctly.`)

### H2 hierarchy (page-order list)

1. **H2 — "The First-Time Buyer Rebate Stack: $43K From the Government Alone"** *(Hero proof block — itemized stack)*
2. **H2 — "How to Layer Each Rebate (and the Mistakes That Forfeit Them)"** *(Calculation worksheet content)*
   - **H3 — Federal GST Rebate (up to $50K on new homes ≤ $1M)**
   - **H3 — BC Property Transfer Tax Exemption (up to $8K on homes ≤ $835K)**
   - **H3 — First Home Savings Account (FHSA — $40K lifetime contribution, tax-deductible)**
   - **H3 — RRSP Home Buyers' Plan (HBP — $60K withdrawal, 15-yr repayment)**
   - **H3 — BC Home Owner Mortgage and Equity Partnership (BC HOMES) eligibility check**
   - **H3 — How developer incentives stack on top (cash credits, free parking, rate buy-downs)**
3. **H2 — "Your $83K Total Stack: A Worked Example on a $700K Vancouver Condo"** *(Concrete worked example, the Hormozi specificity move)*
4. **H2 — "Live Tracker: First-Time-Buyer-Eligible Greater Vancouver Buildings This Week"** *(Filtered Tracker view with `first_time_buyer_eligible=true` flag)*
5. **H2 — "Common First-Time Buyer Mistakes That Forfeit Rebates"** *(7 mistakes — schema-targeted FAQ content)*
6. **H2 — "How 88 West Realty Helps You Capture Every Dollar"** *(Trust + buyer-side advocacy positioning)*
7. **H2 — "Frequently Asked Questions for First-Time Buyers"** *(FAQPage schema)*
8. **H2 — "Get the $43K Head Start Guide + Tracker. Free."** *(Final CTA + form repeat)*

**Cross-link to canonical (mandatory):** in Block 4 and Block 6, surface a contextual link: *"Already comfortable with the rebate stack? See every developer incentive on every Vancouver building → /developer-condo-deals-vancouver"*

### Schema markup (JSON-LD)

Same `RealEstateAgent`, `Service`, `BreadcrumbList` as Page 1. Specific differences:

- **Service** `name`: "First-Time Buyer Rebate Stack Guide + Pre-Sale Buyer Representation"
- **Service** `description`: "Buyer-side guidance through the federal GST rebate, BC PTT exemption, FHSA, RRSP HBP, and developer incentives — for first-time Greater Vancouver condo buyers."
- **FAQPage** with first-time-buyer-specific Q&A:
  1. "How much can a first-time buyer save on a new condo in BC in 2026?"
  2. "Do I qualify for the $50K federal GST rebate?"
  3. "What's the difference between FHSA and RRSP HBP — can I use both?"
  4. "What's the BC PTT exemption maximum for a first-time buyer?"
  5. "Can I stack the federal GST rebate with developer incentives?"
  6. "Do I lose first-time-buyer status if my partner has owned a home?"
  7. "What's the deadline / income cutoff for first-time buyer programs in 2026?"
- **HowTo schema (optional, recommended)** — markup the "How to Layer Each Rebate" section as a HowTo with steps for federal GST → BC PTT → FHSA → RRSP HBP → BC HOMES → developer incentives. This earns rich-result eligibility.

### Above-the-fold form fields (FTB-specific intent)

1. **First name** (required)
2. **Email** (required)
3. **Phone** (optional above-fold)
4. **First-time-buyer status** (required, radio): "Yes — I qualify" / "Not first-time" / "Not sure — help me check"
   - **Conditional logic:** if "Not first-time" selected, show: *"You may want our $100K Discount tracker → /developer-condo-deals-vancouver"*
5. **Budget bucket** (required, select): Under $500K / $500K–$700K / $700K–$1M / $1M+
6. **Timeline** (required, select): Buying in next 6 months / 6–12 months / 12+ months / Just researching
7. **Areas of interest** (required, multi-select): Vancouver / North Vancouver / Burnaby / Richmond / Anywhere
8. **Submit CTA:** *"Get My $43K Rebate Stack Guide →"*

**Hidden fields:**
- `source` = `first-time-buyer-vancouver`
- `lead_magnet` = `developer-incentive-tracker` *(same backend Tracker — branded differently for the FTB segment)*
- `audience_variant` = `first-time-buyer`

### Image strategy

| # | Slot | Image direction | Alt text |
|---|---|---|---|
| 1 | Hero | Young couple (mid-20s to mid-30s) holding new keys outside a brand-new Vancouver condo building. Real Vancouver context. | `First-time buyers receiving keys to new Vancouver condo with $43K rebate stack — 88 West Realty` |
| 2 | Block 2 (rebate stack) | Annotated worksheet / calculator screenshot showing the line items adding up to $43K | `BC first-time buyer rebate stack: GST rebate + PTT exemption + FHSA + RRSP HBP totaling $43,000` |
| 3 | Block 3 (worked example) | Visual stack/waterfall of the $83K total: $700K - $35K GST - $8K PTT - $40K developer = $617K | `$700K Vancouver condo reduced to $617K through layered first-time buyer rebates and developer incentives` |
| 4 | Block 4 (Tracker preview) | Mobile screenshot of the Tracker filtered to FTB-eligible projects | `Developer Incentive Tracker filtered for Vancouver first-time buyer eligible buildings` |
| 5 | Block 6 (trust) | Same agent face as canonical page — consistency across both LPs reinforces 88 West's single-broker positioning | `[Agent name], Buyer-Side Agent at 88 West Realty — first-time buyer specialist` |
| 6 | Block 8 (final CTA) | Vancouver skyline with subtle "starting somewhere new" feel — sunrise tone | `New Vancouver condo skyline at sunrise — first-time buyers entering the market in 2026` |

### Trust signals

Same as Page 1 (Nest Presales verbatim disclaimer, brokerage badge, agent face, license #, REDMA disclosure) — **plus** FTB-specific:

- *"We've helped [N] first-time buyers stack the maximum rebate available since 2024."* (placeholder until aggregate available)
- *"Government program eligibility verified against 2026 federal Bill C-4 + BC Budget 2026."* (live timestamp + source-of-truth callout)
- *"Free 30-min eligibility call before any commitment — no buyer-agency required."*

### Internal link strategy (mandatory bidirectional)

**FROM `/first-time-buyer-vancouver` → `/developer-condo-deals-vancouver`:**
- Block 4: contextual link in copy
- Block 6: secondary CTA link
- Footer: "Not a first-time buyer? See the full Developer Incentive Tracker →"

**FROM `/developer-condo-deals-vancouver` → `/first-time-buyer-vancouver`:**
- Block 4 (audience split — FTB column): primary link "$43K Head Start →"
- Form conditional logic (when "first-time buyer" selected on intent dropdown): contextual link surfaced
- Footer: "First-time buyer? See the $43K Head Start →"

**Anchor text variants** (for SEO diversity):
- "$43K Head Start" (branded)
- "First-time buyer guide" (descriptive)
- "Vancouver first-time home buyer rebates" (keyword-rich)
- "the $43K rebate stack" (informal)

---

## Both pages: Shared infrastructure

### 301 redirects from old pages

Verified: `/vancouver-condo-deals` and `/vancouver-condo-deals-v2` exist in `app/` (per `ls` of go-landing/app). Configure redirects in `next.config.ts` under `redirects()`:

```typescript
async redirects() {
  return [
    {
      source: '/vancouver-condo-deals',
      destination: '/developer-condo-deals-vancouver',
      permanent: true, // 301
    },
    {
      source: '/vancouver-condo-deals-v2',
      destination: '/developer-condo-deals-vancouver',
      permanent: true, // 301
    },
    // /vancouver-deals-swipe is a separate experimental page — leave alone unless explicitly approved for redirect
  ];
}
```

**Verification post-deploy:** curl `-I https://go.88westrealty.com/vancouver-condo-deals` should return `301 Moved Permanently` with `Location: /developer-condo-deals-vancouver`. Test with Google Rich Results test + screaming-frog crawl post-deploy.

**SEO authority transfer:** existing pages have minimal authority (newly launched), so 301 transfer is a clean swap rather than a careful migration. No backlink reclamation work needed beyond updating any internal links from main 88westrealty.com.

### Google Ads ad-group structure (7 ad groups across both pages)

Mapped to seed keywords from `KEYWORD-MATRIX-developer-deals.md`:

#### Page 1 (`/developer-condo-deals-vancouver`) — 5 ad groups

**Ad Group 1: "Vancouver Presale Incentives" ($100K Discount, dollar-anchored)**
- Keywords (phrase + exact): "presale condo vancouver", "vancouver presale incentives", "vancouver presale condo deals", "developer incentives vancouver", "condo incentives vancouver", "presale condo deals vancouver", "vancouver presale condo incentives 2026", "stacked condo incentives vancouver"
- Match types: Phrase as default; exact for highest-volume head terms
- Final URL: `/developer-condo-deals-vancouver`
- Budget priority: Tier 1 (40% of canonical-page budget)

**Ad Group 2: "$100K Off Vancouver Condo" (dollar-anchored modifier)**
- Keywords: "100k off vancouver condo", "100000 off vancouver condo", "developer discount vancouver condo", "developer condo discounts vancouver", "biggest condo deals vancouver"
- Match types: Phrase
- Final URL: `/developer-condo-deals-vancouver`
- Budget: 15%

**Ad Group 3: "Vancouver Pre-Sale Window" (urgency angle)**
- Keywords: "vancouver buyer's market", "is it a good time to buy a condo in vancouver", "vancouver condo buyer's market", "unsold condos vancouver", "vancouver condo market 2026", "best time to buy condo vancouver"
- Match types: Phrase
- Final URL: `/developer-condo-deals-vancouver`
- Budget: 10%

**Ad Group 4: "City-Specific Greater Vancouver" (geo-modifier)**
- Keywords: "presale condos burnaby", "new condo burnaby", "presale condos coquitlam", "new condo richmond", "presale condo north vancouver", "new construction coquitlam", "condo deals burnaby", "developer incentives richmond"
- Match types: Phrase with `{KeyWord:Vancouver}` dynamic insertion in headlines for city auto-swap
- Final URL: `/developer-condo-deals-vancouver`
- Budget: 15%

**Ad Group 5: "Investor / Assignment" (investor segment)**
- Keywords: "condo investment vancouver", "investment condo vancouver", "buy condo for investment vancouver", "assignment sale vancouver", "presale assignment vancouver", "condo assignment vancouver"
- Match types: Phrase
- Final URL: `/developer-condo-deals-vancouver`
- Budget: 10%

#### Page 2 (`/first-time-buyer-vancouver`) — 2 ad groups

**Ad Group 6: "First Time Home Buyer Vancouver" (FTB head term)**
- Keywords: "first time home buyer vancouver", "first time buyer programs bc", "first time home buyer bc", "affordable condo vancouver", "first home grant bc", "presale condos under 500k vancouver", "first time buyer vancouver 2026"
- Match types: Phrase
- Final URL: `/first-time-buyer-vancouver`
- Budget: 60% of FTB-page budget

**Ad Group 7: "Rebate / Program Stacking" (FTB program-specific)**
- Keywords: "gst rebate new home bc", "gst rebate first home vancouver", "ptt exemption first time buyer bc", "property transfer tax exemption bc", "fhsa vancouver", "fhsa condo vancouver", "first time buyer savings calculator", "how much can first time buyer save bc"
- Match types: Phrase
- Final URL: `/first-time-buyer-vancouver`
- Budget: 40% of FTB-page budget

**Ad-group naming convention in Google Ads:** `[88W][Page][AdGroupName]` — e.g., `[88W][Dev][Presale Incentives]`, `[88W][FTB][Rebate Stack]`. Helps in `manage.py report` queries.

### RSA seed copy (8 headlines + 4 descriptions per ad group)

Below: **Ad Group 1 (Vancouver Presale Incentives)** as the canonical example. Other ad groups use the same template structure with keyword-aware substitutions; full per-ad-group copy will be built by `google-ads-campaign-planner` skill in Phase 4.

**Ad Group 1 — Headlines (30-char max):**
1. `$100K Off Vancouver Condos`
2. `Developer Incentive Tracker`
3. `Free Monday Tracker — 7 AM PT`
4. `5,458 Unsold — Your Leverage`
5. `Stacked Incentives, One List`
6. `We Don't Rep the Developer`
7. `Vancouver Presale Deals 2026`
8. `Free Tracker, No Spam`

**Ad Group 1 — Descriptions (90-char max):**
1. `Track every Vancouver, Burnaby, Richmond & North Van developer incentive. Monday digest. Free.`
2. `5,458 unsold condos. Builders are stacking $100K+ in cash credits, parking & rate buy-downs.`
3. `88 West Realty: licensed BC brokerage. We don't rep the developer — only you. No buyer fee.`
4. `Incentive-Match Promise: if Tracker doesn't surface a match in 30 days, we negotiate one for you.`

**Ad Group 6 — Headlines (FTB):**
1. `First-Time Buyer? Save $43K`
2. `$43K Government Rebate Stack`
3. `GST + PTT + FHSA + Developer`
4. `Free First Home Stack Guide`
5. `Stack $83K on First Vancouver`
6. `BC First-Time Buyer Rebates`
7. `Buy Vancouver. Stack $43K.`
8. `Free 30-Min Eligibility Call`

**Ad Group 6 — Descriptions (FTB):**
1. `$50K federal GST + $8K BC PTT + FHSA + RRSP HBP + developer incentives. We show every dollar.`
2. `BC's most complete first-time buyer rebate guide. Free. Verified against 2026 Bill C-4 + BC Budget.`
3. `Total stack on $700K condo: up to $83K combined savings. Free guide + Tracker. No spam.`
4. `Buyer-side only. We're not affiliated with any developer. 88 West Realty — licensed BC brokerage.`

### Negative keywords (40 shared across both pages)

**Single-word broad-match negatives:**
- `rent`, `rental`, `renting`, `lease`, `leasing`, `airbnb`, `sublet`
- `jobs`, `hiring`, `salary`, `career`, `employment`, `recruiter`, `recruitment`
- `commercial`, `office`, `industrial`, `warehouse`, `medical` *(except medical-strata is its own campaign)*
- `toronto`, `ontario`, `calgary`, `alberta`, `edmonton`, `ottawa`, `montreal`, `seattle`, `usa`, `america`
- `free`, `cheap`, `cheapest`, `100% free` *(prevents "free presale game" / "free to play" matches)*
- `dyi`, `diy`, `build your own`
- `news`, `article`, `youtube` *(unless content-campaign expansion approved)*
- `realtor jobs`, `become a realtor`, `realtor license`
- `zillow`, `realtor.ca`, `rew.ca` *(portal name negs)*

**Phrase-match negatives:**
- `"for rent"`
- `"presale game"` *(blocks "presale game" gaming results)*
- `"free presale"` *(blocks "free presale code" entertainment)*
- `"how to sell"`, `"selling my"`
- `"rental market"`
- `"property management"`
- `"real estate course"`
- `"investment seminar"`

**Exact-match negatives:**
- `[condo for rent vancouver]`
- `[apartments for rent vancouver]`
- `[condo fees vancouver]`
- `[strata fees vancouver]`

**Total: ~45 negatives. Add to campaign-level shared-set so both pages inherit.**

### Bid + budget guidance

**Per-page budget: $10/day each ($300/mo per page; $600/mo combined).**

**Realistic CPC range (Greater Vancouver, English, mobile + desktop, 2026 conditions):**
- Tier 1 head terms (`presale condo vancouver`, `first time home buyer vancouver`): **$5–$10 CPC**
- Tier 2 commercial (`developer incentives vancouver`, `gst rebate new home bc`): **$2–$5 CPC**
- Tier 3 long-tail (`stacked condo incentives vancouver`, `first time buyer savings calculator`): **$1–$3 CPC**

**Expected click volume at $10/day:**
- Page 1 (canonical, ~70% Tier 1 + Tier 2 weighting): ~30–60 clicks/mo at blended $5-7 CPC
- Page 2 (FTB, ~50% Tier 2 + 30% Tier 3): ~50–100 clicks/mo at blended $3-5 CPC

**CPL target:**
- Form-submission conversion rate: target **8–12%** of clicks (above industry average due to the $-anchored hook + Hormozi value-equation)
- Page 1 CPL target: **$50–$80** ($5-7 CPC ÷ 10% conversion)
- Page 2 CPL target: **$30–$50** ($3-5 CPC ÷ 10% conversion)

**Bid strategy:** start with **Maximize Conversions** (no tCPA cap) for first 2 weeks to gather conversion data, then switch to **Maximize Conversions with tCPA = $60 (Page 1) / $40 (Page 2)** once at least 30 conversions per ad group accumulate.

**Conversion action:** **CRM Lead (Offline)** — `7582974906` — already exists in Apex Medical Realty account `7077162356`. The Phase B hourly sync (`builtbybrio-seo/google-ads/manage.py conversions sync`) auto-uploads. Add `developer-condo-deals-vancouver` and `first-time-buyer-vancouver` to `CRM_SYNC.source_to_account` mapping in `shared.py`.

**Conversion attribution model:** Data-driven (default) once 600 ad-interactions in a 30-day period accumulate; until then, last-click.

### Pre-launch SEO audit checklist (15 items)

For verification by `landing-page-seo-optimizer` AUDIT mode after build:

1. [ ] Both pages return `200 OK` with self-referencing canonicals
2. [ ] `/vancouver-condo-deals` and `/vancouver-condo-deals-v2` return `301` to `/developer-condo-deals-vancouver` (verify via `curl -I`)
3. [ ] Mobile Lighthouse SEO score ≥98, Performance ≥90, Accessibility ≥95
4. [ ] LCP <2.0s, CLS <0.05, INP <100ms on mobile (PageSpeed Insights)
5. [ ] All schema validates without errors in Google Rich Results Test (FAQPage + Service + RealEstateAgent + BreadcrumbList)
6. [ ] FAQ Q&A count: ≥7 on canonical, ≥7 on FTB variant
7. [ ] H1 unique per page (no duplicate H1 across the two pages)
8. [ ] Open Graph preview renders correctly in Facebook Sharing Debugger + LinkedIn Post Inspector
9. [ ] Twitter Card validates (use Twitter Card Validator)
10. [ ] Internal links bidirectional between canonical and FTB variant (≥3 contextual links each direction)
11. [ ] Image alt text present on every `<img>`; no decorative-image alt-text spam
12. [ ] `lang="en-CA"` on `<html>`, `<meta charset="UTF-8">`, viewport meta correct
13. [ ] Sitemap.xml updated with both new URLs at priority 0.9; old URLs removed
14. [ ] robots.txt allows both new URLs; explicitly disallows `/vancouver-deals-swipe` if it's experimental
15. [ ] GA4 + Google Ads gtag fires on form submission (verify with Tag Assistant); `gclid` captured in webhook payload

---

## Operational notes

### GHL custom fields for FTB variant
The FTB page should write the same GHL fields as canonical, plus:
- `first_time_buyer_status`: `yes` / `no` / `unsure`
- `audience_variant`: `first-time-buyer` (for nurture sequence routing)
- `eligible_programs`: comma-separated list set by 30-min eligibility call

### Nurture sequence routing in GHL
- `audience_variant=first-time-buyer` → Day 0-21 sequence emphasizing rebate stacking + 30-min eligibility call CTA
- `intent=investor` → Day 0-14 sequence emphasizing $100K Discount math + Off-Market Alpha continuity preview
- `intent=owner-occupier` → Day 0-21 sequence emphasizing $100K Discount math + completion timing + decoration-allowance education
- `intent=exploring` → Day 0-30 sequence weighted toward education content + Tracker re-engagement

### Conversation AI prompt branching
Add to existing 88West Conversation AI prompt: branch on `audience_variant` and `first_time_buyer_status` to surface the right page on the next-step CTA. If FTB lead lands in canonical-page funnel, AI offers a "want me to send the $43K Head Start guide instead?" check-in.

### Image generation queue
Pre-launch, run `landing-page-image-sourcer` for both pages with a unified brief: 13 image slots total (7 canonical + 6 FTB). Estimated cost: ~$5-8 in Replicate/imagegen calls based on previous campaigns.

### Tracker data feed dependency
Both pages depend on a real Tracker data feed populated weekly. Without a real Tracker, the "Live Tracker Preview" section in Block 2 must show `coming Monday` placeholder OR aggregate-only stat ("17 new incentives this week"). Do not ship empty grids.

### Deferred (post-launch) work
- 88 West Realty main-site footer link to `/developer-condo-deals-vancouver` (cross-domain authority transfer)
- Substack/LinkedIn cross-post weekly Tracker digest
- Rich snippet monitoring via `monitoring/campaigns/developer-condo-deals-vancouver/config.yaml` weekly audits
