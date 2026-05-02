# Foreclosure LP — Production Copy

**Page slug:** `go.88westrealty.com/foreclosure-deals-vancouver`
**Audience:** Greater Vancouver — investors AND owner-occupiers / first-time buyers
**Hero angle:** "Greater Vancouver's daily-updated court-ordered sales list — with a 30-day match guarantee."
**Lead magnet:** "The Vancouver Foreclosure Sheet" — every business morning
**Author:** Phase 4 copy agent
**Date:** 2026-04-20

---

## Block 1 — Hero + form

### Eyebrow

```
GREATER VANCOUVER · COURT-ORDERED SALES
```

*Implementation note: small caps tag, light teal on dark navy hero (med-teal token). Mirrors `MedicalHero` eyebrow styling — 13px, uppercase, 2px letter-spacing.*

### H1

```
Greater Vancouver's Daily-Updated Court-Ordered Sales List.
```

*9 words. 60 chars. Includes "Greater Vancouver" + "Court-Ordered Sales" — matches title-tag #1 from SEO blueprint and locked hero angle. Reads as a calm declaration, not a pitch.*

### Subheadline

```
The new Vancouver, North Van, Burnaby, and Richmond court-ordered listings,
emailed every business morning. Free, buyer-side only — no bank affiliation.
```

*167 chars. Single sentence. Names the four geo targets, the cadence, the price ("free"), and the differentiator ("buyer-side only"). Final clause is the verbatim de-sketcher from synthesis §1.*

### Hero proof line

```
~389 active BC court-ordered listings as of today. We surface the
Greater Vancouver ones for you — before MLS subscribers see them.
```

*Implementation note: this is a small badge or callout positioned next to or below the H1, NOT the subheadline. Use the live count from `realestatecoalharbour.com` aggregator with a `script` that refreshes weekly (per SEO blueprint §macro narrative). Until the feed is live, hard-code "~389" with a footnote citation. Never claim a precise number we can't refresh.*

### Form

| Field | Label | Type | Required | Default | Validation |
|---|---|---|---|---|---|
| `email` | Email | `email` (autocomplete=email) | Yes | — | Must contain `@` and `.`; trim before submit |
| `first_name` | First name | `text` (autocomplete=given-name) | Yes | — | Min 2 chars after trim |
| `budget` | Budget range | `select` dropdown | Yes | "Select a range" (placeholder, non-selectable) | Must be one of 5 options below |
| `intent` | I am... | radio group (3 options) | Yes | none selected | One of: `investing`, `living-in`, `exploring` |
| `areas` | Where are you looking? | multi-select chips | Yes | none selected | Min 1 selected |
| `consent` | (consent line — see below) | checkbox | Yes (hidden but pre-checked is acceptable per CASL inline-disclosure pattern) | unchecked | Must be checked before submit |

**Budget dropdown options (in order):**
1. Under $700K
2. $700K – $1M
3. $1M – $1.5M
4. $1.5M – $2.5M
5. $2.5M+

**Intent radio options (label / value):**
- "I'm investing" → `investing`
- "I'm buying to live in" → `living-in`
- "I'm exploring" → `exploring`

**Areas multi-select chips (label / value):**
- "Vancouver" → `vancouver`
- "North Van" → `north-vancouver`
- "Burnaby" → `burnaby`
- "Richmond" → `richmond`
- "Other Greater Vancouver" → `other`

**Form heading + intro (above fields, on the form card):**

```
Get the Foreclosure Sheet
Free. Every business morning. No phone required to start.
```

**Field placeholders (for accessibility — visible labels above fields, placeholders only as helper text):**
- Email: `you@example.com`
- First name: `Your first name`

**Hidden form payload fields (per SEO blueprint):**
- `source` = `foreclosure-deals-vancouver`
- `lp_url` = `window.location.href`
- `gclid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` = read from `_lp_*` cookies (same pattern as `MedicalHero.tsx`)
- `form_location` = `hero_inline`
- `consent` = `implied_inline`
- `privacy_consent` = `on`

### CTA button copy

```
Send Me Tomorrow's List
```

*23 chars. Action verb ("Send"), ownership pronoun ("Me"), specificity ("Tomorrow's"). Lifts directly from Hormozi doc §5.2. Right-arrow icon (`ArrowRight` from lucide-react) to match `MedicalHero` style.*

### Below-form micro-text

```
Free. No credit check. No phone required to start. Unsubscribe anytime.
```

*Then, on a new line, smaller and lighter:*

```
By submitting, you agree to the Privacy Policy and consent to 88 West Realty
contacting you about Greater Vancouver court-ordered sales. We don't share
your information with banks, lenders, or any third party.
```

*The "we don't share with banks" half-sentence does double duty as the verbatim trust line precursor.*

### Phone CTA (sticky/secondary)

**Mobile (below form):**
```
Or call 604-281-1828
Monday–Saturday, 8 AM – 8 PM PT
```

**Sticky mobile bar (reuse `MedicalStickyMobileCTA` pattern):**
- Left: `Call 604-281-1828` (phone icon)
- Right: `Get the Sheet →` (anchors to `#register` or top-of-page form)

**Desktop hero (under H1, alongside form):**
```
Or call 604-281-1828 — Monday–Saturday, 8 AM – 8 PM PT
```

*Implementation note: phone is `tel:+16042811828`. Hours are placeholder — confirm with brokerage before launch. If they don't run a Saturday line, change to "Monday–Friday, 8 AM – 6 PM PT."*

---

## Block 2 — Live Inventory Preview

### Section H2

```
This Week's Greater Vancouver Court-Ordered Sample.
```

### Subheadline

```
Six current listings from the Sheet. Addresses are masked until you
subscribe — court files are public, but we don't run a billboard.
The full list lands in your inbox every business morning.
```

*Implementation note: 230 chars. The "we don't run a billboard" line is the soft trust play that distinguishes us from public IDX dumps. Owner-occupiers especially feel that one.*

### Sample listings (6 cards)

*Implementation note: these are realistic placeholder records. The build phase swaps with a real MLS / aggregator feed. Each card is built around a real Greater Vancouver neighbourhood and a plausible court-ordered profile (90+ days on market, list price ~5–15% under last assessment, court date 30–60 days out). Mask the street address; show neighbourhood + property type + bed/bath/sqft. Do NOT use lorem ipsum.*

#### Card 1 — East Vancouver detached

- **Headline:** Detached, East Vancouver (Hastings-Sunrise)
- **Beds / baths / sqft:** 4 bed · 2 bath · 1,820 sqft
- **Address:** ████ E 26th Ave, Vancouver — *full address sent to subscribers*
- **Listed:** $1,278,000
- **Last assessed:** $1,418,000
- **Court date:** Jul 15, 2026
- **Days on market:** 142
- **Spread caption:** *"Listed: $1.28M · Last assessed: $1.42M · Court date: Jul 15"*
- **Tag:** `Schedule A required`

#### Card 2 — Burnaby townhouse

- **Headline:** Townhouse, Burnaby (Highgate)
- **Beds / baths / sqft:** 3 bed · 2.5 bath · 1,510 sqft
- **Address:** ████ Marlborough Ave, Burnaby
- **Listed:** $898,000
- **Last assessed:** $964,000
- **Court date:** Jun 28, 2026
- **Days on market:** 87
- **Spread caption:** *"Listed: $898K · Last assessed: $964K · Court date: Jun 28"*
- **Tag:** `Vacant — easy showings`

#### Card 3 — Richmond condo

- **Headline:** Condo, Richmond (Brighouse)
- **Beds / baths / sqft:** 2 bed · 2 bath · 905 sqft
- **Address:** ████ No. 3 Rd, Richmond
- **Listed:** $649,000
- **Last assessed:** $702,000
- **Court date:** Jul 8, 2026
- **Days on market:** 113
- **Spread caption:** *"Listed: $649K · Last assessed: $702K · Court date: Jul 8"*
- **Tag:** `Owner-occupier friendly`

#### Card 4 — North Vancouver detached

- **Headline:** Detached, North Vancouver (Lynn Valley)
- **Beds / baths / sqft:** 5 bed · 3 bath · 2,640 sqft
- **Address:** ████ Mountain Hwy, North Vancouver
- **Listed:** $1,795,000
- **Last assessed:** $1,952,000
- **Court date:** Aug 12, 2026
- **Days on market:** 168
- **Spread caption:** *"Listed: $1.80M · Last assessed: $1.95M · Court date: Aug 12"*
- **Tag:** `Tenanted — 60-day notice`

#### Card 5 — Vancouver condo

- **Headline:** Condo, Vancouver (Mount Pleasant)
- **Beds / baths / sqft:** 1 bed + den · 1 bath · 712 sqft
- **Address:** ████ Quebec St, Vancouver
- **Listed:** $568,000
- **Last assessed:** $612,000
- **Court date:** Jun 18, 2026
- **Days on market:** 96
- **Spread caption:** *"Listed: $568K · Last assessed: $612K · Court date: Jun 18"*
- **Tag:** `First-time buyer eligible`

#### Card 6 — Burnaby half-duplex

- **Headline:** Half-duplex, Burnaby (East Burnaby)
- **Beds / baths / sqft:** 4 bed · 3 bath · 2,180 sqft
- **Address:** ████ 14th Ave, Burnaby
- **Listed:** $1,148,000
- **Last assessed:** $1,236,000
- **Court date:** Jul 22, 2026
- **Days on market:** 124
- **Spread caption:** *"Listed: $1.15M · Last assessed: $1.24M · Court date: Jul 22"*
- **Tag:** `Schedule A required`

### Card legend

```
Court date — the BC Supreme Court hearing where the lender's lawyer
applies for sale approval. Other buyers can submit competing offers
that day; the judge usually awards to the highest bid.

Listed vs. last assessed — the spread between the current ask and
the most recent BC Assessment value. Useful as a sanity check, not
a guarantee — assessments lag the market by 6–18 months.

Schedule A — the lender/court addendum that releases the lender from
any condition or warranty responsibility. Every BC court-ordered
offer requires it. We draft it line-by-line with you.
```

### "View all" CTA

```
[ See all current listings — get the Sheet → ]
```

*Anchors back to `#register` form OR scrolls to the final-CTA form in Block 5. Single button, brand-red.*

### Trust caveat (above carousel)

```
Sample data refreshed weekly. Full list — including unmasked addresses,
photos, court file numbers, and BC Assessment deltas — emailed every
business morning to subscribers.
```

### Right-rail callout (or below the carousel on mobile)

```
~2 million Canadian mortgages renew across 2025–2026 (CMHC).
The supply pipeline is real — and it's in your inbox before
MLS subscribers see it.
```

*Footnote citation: CMHC Mortgage Industry Report (Nov 2024). Tone calibration: under-state, never predict crash.*

---

## Block 3 — How BC court-ordered sales actually work

### Section H2

```
How BC Court-Ordered Sales Actually Work.
```

### Section intro paragraph

```
BC's foreclosure process isn't the one you've seen on American TV.
There are no auctions on courthouse steps, no sheriff's hammer, no
seizure-and-sell. Every sale is supervised by the BC Supreme Court,
the title is clean at closing, and the buyer's rules are specific
enough to either save or lose you money depending on whether you
know them. Five minutes of reading here is worth more than a year
of YouTube.
```

*~430 chars. Calm authority. Pre-empts the "is this safe?" reflex without dismissing it.*

### Sub-block 1

#### H3

```
What a Judicial Sale Is
```

#### Body

```
In British Columbia, a "foreclosure" is technically a judicial sale —
a court-supervised process that lets a lender recover its loan when
the borrower can't pay. Every step requires a judge's sign-off. That
matters because it gives buyers something Ontario's power-of-sale
process doesn't: a clear title at closing.

The mechanics: the lender files for foreclosure, the court orders
the property listed with a regular MLS realtor, an offer is accepted
subject to court approval, and a hearing date is set in BC Supreme
Court (Vancouver registry, usually 4–6 weeks out). The judge reviews
the offer, hears any competing bids in person, and awards the sale.

What you're buying is the property "as is, where is" — meaning the
court releases the lender and former owner from any responsibility
for the property's condition. That release is the document called
Schedule A. We'll get to it in a minute.
```

*Pre-empts: "what does foreclosure actually mean in BC?" — the #1 process anxiety query.*

### Sub-block 2

#### H3

```
How the Court Date Can Outbid You
```

#### Body

```
This is the risk no one explains until it's happening to you.

Once your offer is accepted, you have 4–6 weeks until the court
hearing. During that window, the listing stays public. Other buyers
can show up at the courthouse on the hearing day with a higher,
subject-free offer in hand. The judge usually awards the sale to
the highest bid. If two offers are close, the judge can use time-of-
first-offer to break the tie — but that's the judge's call, not the
seller's.

Practical translation: if you're not prepared to walk into the
courtroom and improve your bid in the moment, you can lose a
property you've already paid for inspections and a lawyer on. We
attend the hearing on your behalf, with a pre-authorized improvement
ceiling you set in writing. Most buyers without a foreclosure-
experienced broker don't know this is coming.
```

*Pre-empts: "what happens at the foreclosure court date" + "can you outbid a foreclosure offer bc". The most under-discussed risk per market research §3.*

### Sub-block 3

#### H3

```
The Possession Risk Reality
```

#### Body

```
Court approval transfers the title to you. It does not, by itself,
remove people from the property.

In a small share of court-ordered sales, the former owner or a tenant
is still living in the home on possession day. Sometimes they leave
willingly when title transfers. Sometimes they don't, and the new
owner has to go through the BC Residential Tenancy Branch or, for
former owners, a writ of possession through the court. That can take
30–90 days and modest legal fees.

This risk is small but real. Before you submit an offer, we drive by
the property, look for signs of occupation, ask the listing realtor
on the record, and flag the result on every Sheet listing as
"vacant," "owner-occupied," or "tenanted — [number]-day notice."
Investors usually accept this risk for the right price. Owner-
occupiers usually want to start with vacant listings, and we sort
the Sheet that way.
```

*Pre-empts: "foreclosure possession risk bc" + general anxiety about "what if the owner won't leave?"*

### Sub-block 4

#### H3

```
Financing on a Court-Ordered Sale
```

#### Body

```
Yes, you can get a mortgage on a BC court-ordered sale. Most major
Canadian banks finance them at standard rates and amortizations. A
few B-lenders refuse, which is why your mortgage broker matters more
than usual on these files.

Two operational details to know:

First, your offer typically needs to go in subject-free at the court
date. That means your financing has to be fully approved — not just
pre-approved — before subject removal, which compresses the timeline.
We introduce you to three Vancouver-area mortgage brokers who close
court-ordered files weekly and know the lenders that don't blink at
Schedule A.

Second, appraisals on foreclosed homes can come in low if the
property is in rough condition. That's a real risk on detached homes
in particular. We help you build a contingency plan — extra deposit,
a stretch on the down payment, or a different lender — before you
walk into court.
```

*Pre-empts: "can you finance a foreclosure in bc" + "vancouver foreclosure mortgage" — high-volume process anxiety queries.*

---

## Block 4 — For Investors / For Owner-Occupiers split

### Section H2

```
Whether You're an Investor or a First-Time Buyer, This List Works for You.
```

### Section intro

```
Court-ordered sales aren't an investor-only sport. Roughly half the
BC inventory in any given week is condo and townhouse stock under
$700K — owner-occupier territory. The buyer-side rules are the same
either way; the strategy is different. Here's how we run each side.
```

### Two columns

#### Column 1 — For Investors

##### H3

```
For Investors
```

##### Bullets

- **The volume is the moat.** ~389 active BC court-ordered listings means you're shopping a real pipeline, not a once-a-quarter unicorn. We send the new ones every business morning with comp anchors, gross-yield estimates at current CMHC market rents, and a bring-current cost band on each property.
- **Court-date strategy is the unlock.** Most investors lose deals because they bid once and assume the work is done. We attend the hearing, carry your pre-authorized improvement ceiling, and protect your inspection-and-legal spend with a tactic-not-a-prayer game plan.
- **ROI math is on every card.** Each Sheet entry includes gross yield, cash-on-cash at 20% down, all-in carry at the current 5-year fixed, and the 5-year appreciation comp from the same neighbourhood. You can rule deals in or out in 60 seconds.
- **Lender intros for subject-free closes.** We introduce you to mortgage brokers who write court-ordered files weekly. Subject-free means fully approved — not pre-approved — and the lender bench matters more than the rate.
- **Decision timeline: 24–72 hours.** Speed beats polish in this segment. Saved searches push real-time SMS alerts the moment a match hits the Sheet, so you're at the showing before the third investor logs in.
- **Cash-flippers, BRRRR holders, long-hold landlords — different strategies, same data.** Tell us your archetype on the form and we sort the Sheet to match.

#### Column 2 — For Owner-Occupiers and First-Time Buyers

##### H3

```
For Owner-Occupiers and First-Time Buyers
```

##### Bullets

- **Affordable inventory is real.** Recent BC examples include a $459K Langley condo and a $259K Mackenzie detached. Vancouver, Burnaby, and Richmond have a steady drip of sub-$700K condo and townhouse stock under court-ordered listing. Your fears about pricing being a myth are misplaced — the inventory is there.
- **The fears that block you are real, and we name them.** "Can I get a mortgage?" Yes — most major banks finance court-ordered sales at standard rates. "What if I get outbid in court?" That's a real risk; we attend on your behalf with a pre-authorized ceiling. "What if the previous owner won't leave?" Small but real risk; we flag every listing as vacant, owner-occupied, or tenanted before you tour.
- **Mortgage broker triage.** First-time-buyer files have moving parts — RRSP HBP, FHSA, BC Home Owner Mortgage, federal first-time buyer incentives — and most realtors don't bother stacking them. We do, with three mortgage brokers who specialize in this exact file.
- **Possession-risk handholding.** We drive by, ask the listing realtor on the record, and tell you what we find before you spend a dollar on inspection. If a property is tenanted, we explain the timeline and the cost so it's a known quantity.
- **Your fears are valid; here's what we do about them.** That's the entire job. We're not selling distressed property to nervous buyers — we're explaining a process that's unfairly opaque and walking with you through every step.
- **Decision timeline: weeks to months.** No rush. The Sheet runs on its own schedule. When a property fits and you're ready, we move fast. Until then, you read the daily list at your own pace.

---

## Block 5 — Trust + final CTA

### Brokerage badge

```
88 West Realty · Licensed in British Columbia (X031527)
970 Marine Drive, North Vancouver, BC
604-281-1828 · info@88westrealty.com
```

### Agent profile

*Implementation note: real headshot required. Anonymous LPs underconvert (per SEO blueprint §image strategy). The build phase needs to confirm which 88West specialist the brokerage is putting on the page. Until then, use this placeholder block:*

```
[Headshot — 240×240 round, soft shadow]

[Agent First Last]
Buyer-Side Specialist · Court-Ordered Sales
88 West Realty · Licensed [License #]

10+ BC court-ordered closings since [year].
Available Monday–Saturday, 8 AM – 8 PM PT.

[ Call now ] [ Email ]
```

**Image alt text:** `[Agent First Last], 88 West Realty buyer-side foreclosure specialist.`

### Verbatim trust line

*Implementation note: this line MUST appear verbatim per the locked decisions. Recommend rendering it as a callout — large, centered, with a thin top-and-bottom rule. No quotation marks.*

```
We don't represent banks — only buyers.
```

*Followed by:*

```
Sellers (banks and the court) pay our commission. So our advice is
yours alone. Most BC competitors mix buyer and lender representation
on the same page. That's a conflict we don't accept.
```

### FAQ accordion

#### H3

```
Frequently Asked Questions
```

*Implementation note: 7 Q&A pairs below. Match the FAQPage schema in `seo-blueprint-foreclosure.md` line-for-line — Google requires schema text to match visible page text exactly. Single-open-at-a-time accordion, first item open by default (matches `MedicalFAQ.tsx` pattern).*

##### Is buying a foreclosure in BC safe?

```
BC court-ordered sales are court-supervised, so the title is clear at
closing. The risks aren't title-related — they're "as-is, where-is"
condition risk, court-date outbid risk, and (rarely) possession risk
if the former owner is still in the home. Working with a court-
experienced buyer-side broker mitigates each of these.
```

##### What's the difference between a foreclosure and a court-ordered sale in BC?

```
In BC they're the same thing. The legal mechanism is a "judicial sale"
supervised by the BC Supreme Court. Ontario uses "power of sale"
instead, which is contractual — no court oversight required. BC's
process is slower but the title is cleaner.
```

##### Can a first-time buyer purchase a court-ordered sale in Vancouver?

```
Yes. Most major Canadian banks finance court-ordered purchases at
standard rates and ratios; a few B-lenders refuse, so your mortgage
broker matters. The bigger consideration is risk tolerance: you
accept the property "as-is" and may face a competing bid at the
court approval hearing. We provide pre-approval intros and walk you
through every step.
```

##### What is Schedule A in a BC foreclosure?

```
Schedule A is the lender/court addendum attached to every court-
ordered sale offer in BC. It releases the lender and former owner
from any condition, warranty, or disclosure responsibility. Holes
in walls, missing appliances, surprise liens — all your problem. We
draft it with you and explain every line before you sign.
```

##### What happens at the foreclosure court date?

```
The lender's lawyer applies to BC Supreme Court for sale approval.
Other buyers can show up with competing subject-free offers; the
judge usually awards to the highest bid. Your broker can attend on
your behalf and submit improved offers if needed. Once approved,
completion typically follows in 1–10 days.
```

##### Can I get a mortgage on a court-ordered sale?

```
Yes. Most major Canadian banks finance court-ordered purchases at
standard rates and amortizations. The catch is that your offer
typically needs to be subject-free at the court date — meaning fully
approved, not just pre-approved. We introduce you to three Vancouver-
area mortgage brokers who close these files weekly.
```

##### Do I need a realtor to buy a foreclosure in BC?

```
You don't have to use one, but BC's process makes it expensive to go
alone. Schedule A drafting, court-date attendance, and possession-
risk research aren't standard parts of a typical realtor's workflow —
they're foreclosure-specific. We're buyer-side only, sellers pay our
commission, and the engagement costs you nothing on the property
itself.
```

### Softened guarantee callout (above final form)

*Implementation note: render as a bordered callout box, brand-red top accent, prominent. This is the differentiator vs. every Vancouver competitor.*

```
The 30-Day Match Guarantee.

If our Sheet doesn't surface a match in 30 days, we'll personally
hand-search off-market alternatives for you — no charge, no
obligation. You read the daily list. We do the hunting that nothing
else gets you.
```

*Note: this is the locked, softened version. NO fee waiver language.*

### Final form repeat

*Implementation note: same fields as Block 1 hero form. Same hidden payload (`source: foreclosure-deals-vancouver`, `form_location: final_cta`). Re-mount the same `LeadForm` component; do not duplicate logic.*

#### Form heading

```
Get the Foreclosure Sheet.
```

#### Form sub-heading

```
Free. Every business morning. Greater Vancouver only.
Investors and first-time buyers welcome.
```

#### CTA button copy

```
Send Me Tomorrow's List
```

### Closing CTA copy (under or beside the form)

```
389 active BC court-ordered listings as of today. Tomorrow's
list lands at 7 AM. Free, buyer-side only, no bank affiliation.
```

### Footer

```
88 West Realty
970 Marine Drive, North Vancouver, BC V7P 1S6
604-281-1828 · info@88westrealty.com
Licensed in British Columbia · Brokerage X031527

[ About 88 West Realty ]   [ Privacy Policy ]   [ Contact ]
[ LinkedIn ]   [ Instagram ]   [ Facebook ]

© 2026 88 West Realty. All rights reserved. MLS® and the associated
logos are owned by The Canadian Real Estate Association (CREA) and
identify the quality of services provided by real estate
professionals who are members of CREA.

This page is for informational purposes only and does not constitute
legal, financial, or tax advice. BC court-ordered sale procedures
are governed by the Supreme Court Civil Rules and the Law and Equity
Act of British Columbia.
```

---

## Implementation flags (for the build phase)

1. **Live count refresh.** The `~389` figure in the hero proof line and the closing CTA needs a weekly auto-fetch from `realestatecoalharbour.com` (per SEO blueprint §macro narrative). If the feed isn't ready at launch, the page must say "~389 active" with a footnote rather than a precise number. Set up the cron before deploy.
2. **Sample listings card data.** Block 2's six cards are placeholder data designed to feel real. The build phase needs to wire them to a CMS field, a hard-coded constant file, or (ideally) the real MLS feed once available. Mask street numbers — the rest is public record.
3. **Agent profile placeholder.** Block 5's agent block is a real-photo dependency. The brokerage must confirm which specialist's headshot, name, and license # go on the page before launch. An anonymous page underconverts (per SEO blueprint §image strategy).
4. **FAQ schema sync.** The 7 Q&A items in Block 5 must match the FAQPage JSON-LD in `seo-blueprint-foreclosure.md` lines 153–193 exactly. Google rejects FAQ rich results when schema text and visible text diverge.
5. **Right-rail callout layout.** Block 2's CMHC mortgage-renewal callout needs a desktop right-rail / mobile-stacked treatment. If the design system doesn't have a right-rail pattern yet, render it as a full-width banner above the carousel on both breakpoints.
6. **Form re-mount.** Final CTA form (Block 5) must reuse the hero form component with `form_location: "final_cta"` — do NOT duplicate validation, tracking, or webhook logic. One `LeadForm` component, two mount points.
7. **Phone hours.** "Monday–Saturday, 8 AM – 8 PM PT" is a placeholder. Confirm with brokerage before going live; remove Saturday if no Saturday line is staffed.
8. **No exclamation marks anywhere.** This is a voice rule for this page — calm authority, not hype. The build phase should add a lint check or copy-review pass to catch any added during translation.

---

*End — copy file.*
