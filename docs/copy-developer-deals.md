# Developer Deals Landing Page Copy

**Pages:**
- `/developer-condo-deals-vancouver` (canonical, "$100K Discount")
- `/first-time-buyer-vancouver` (FTB variant, "$43K Head Start")

**Author:** Copy synthesis agent
**Date:** 2026-04-20
**Voice reference:** `components/medical/MedicalHero.tsx`, `MedicalFAQ.tsx` — calm authority, specific numbers, no hype.

**Build dependencies flagged at end of file.**

---

# /developer-condo-deals-vancouver — Page Copy

## Block 1 — Hero + Form

**Eyebrow (kicker, all caps):**
`THE DEVELOPER INCENTIVE TRACKER · GREATER VANCOUVER`

**H1:**
`$100,000 Off a Brand-New Vancouver Condo. We Track Every Developer Concession.`

**Subheadline (≤ 220 char):**
`5,458 unsold condos sit across Vancouver, Burnaby, Richmond and North Van — a 24-year high. Builders are stacking cash credits, free parking, rate buy-downs and waived assignment fees instead of cutting list prices. We list every concession in one Monday digest. Free.`

**Hero proof line (live data band, sits above form on desktop / under H1 on mobile):**
`This week's top stack: $94,500 off — $40K decorating credit + $48K parking & storage + 1.99% rate buy-down (12 mo) at a Brentwood high-rise. Updated [DATE]. 17 new incentives this week.`

*(Numbers above are placeholders styled to look real. The build needs a JSON-driven `tracker-this-week.json` feed; copy renders the top stack from `tracker-this-week.json[0]` server-side.)*

**Trust line (Nest Presales verbatim, immediately under hero proof):**
`We don't represent the developer — only you.`

**Form headline (white card, brand-red top border per medical hero pattern):**
`Get this Monday's Tracker.`

**Form subhead:**
`Every Greater Vancouver developer concession we know about — itemized, per project. Delivered Monday at 7 AM PT, plus mid-week flash alerts when a stack changes.`

**Form fields:**

| Field | Label | Type | Required | Default | Validation |
|---|---|---|---|---|---|
| `first_name` | First name | text | Yes | — | min 2 chars |
| `email` | Email | email | Yes | — | valid email format |
| `budget` | What's your budget? | select | Yes | — | one of: Under $700K / $700K–$1M / $1M–$1.5M / $1.5M–$2.5M / $2.5M+ |
| `intent` | I'm... | select | Yes | — | one of: Investing / Buying to live in / A first-time buyer / Just exploring |
| `areas` | Areas of interest (pick any) | multi-select checkboxes | Yes (≥1) | — | one or more of: Vancouver / North Vancouver / Burnaby / Richmond / Anywhere in Greater Vancouver |
| `timeframe` | When do you need to be in? | select | Yes | — | one of: Next 6 months / 6–18 months / 18+ months |
| `phone` | Phone (optional — for flash alerts) | tel | No | — | 10-digit if provided |
| `consent` | Privacy + contact consent | hidden / checkbox | Yes | checked | implied via submit |

**Hidden fields (auto-populated):**
- `source` = `developer-condo-deals-vancouver`
- `lead_magnet` = `developer-incentive-tracker`
- `gclid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`

**Conditional logic:**
- If `intent` = "A first-time buyer" → surface contextual link beneath the field: *"You'll save more with our $43K Head Start guide → /first-time-buyer-vancouver"*

**Submit CTA copy:**
`Get This Monday's Tracker →`

**Below-form micro-text (3 lines, small grey):**
- `Free. Monday at 7 AM PT. Mid-week flash alerts when a stack changes.`
- `No spam. Unsubscribe in one click.`
- `Developer commissions paid at closing per the BC Real Estate Services Act. No fee charged to buyers.`

**Phone fallback (mobile bottom-fixed + desktop secondary CTA):**
`Or call 604-281-1828 — buyer-side line.`

---

## Block 2 — Live Tracker Preview

**H2:**
`Live Tracker Preview — 6 Greater Vancouver Buildings With $50K+ Stacked Incentives Right Now`

**Section subhead:**
`Every week we audit Greater Vancouver pre-sale and standing-inventory projects, itemize the developer's published concessions, and total them in dollars. Subscribers get the full list. Below: this week's top six.`

**Tile data (component spec — 6 tiles in a responsive grid; build pulls from `tracker-this-week.json`):**

| Field | Type | Notes |
|---|---|---|
| `project_name` | string | Plausible Vancouver-area name (see samples) |
| `neighborhood` | string | Vancouver / North Van / Burnaby / Richmond submarket |
| `total_stack_cad` | int | Headline number |
| `concessions` | array of strings | Itemized line items, each prefixed with $ |
| `stage` | enum | `Platinum / Public Launch / Construction / Standing Inventory` |
| `units_remaining_at_stack` | int | "X units left at this stack" |
| `expires_when` | string | e.g., "60% sold-out trigger" / "May 31, 2026" |
| `cta` | string | "See full incentive in the Tracker →" → form anchor |

**Sample tile content (placeholders — swap with real data at build):**

**Tile 1 — Solhaven 6035, Brentwood (Burnaby)**
- Total stacked: **$94,500**
- $40,000 decorating credit
- $48,000 parking + storage included
- 1.99% mortgage rate buy-down (12 months)
- Free strata fees, year one (~$6,500 value)
- *Stage:* Standing Inventory · *Units remaining at this stack:* 11
- *Expires:* when project hits 70% sold

**Tile 2 — The Pier West, Lower Lonsdale (North Vancouver)**
- Total stacked: **$78,200**
- $35,000 cash credit at completion
- Parking included ($38K value)
- Assignment fee waived (typical $5,200)
- *Stage:* Construction · *Units remaining:* 6
- *Expires:* June 30, 2026

**Tile 3 — Aalto on Marine, Cambie (Vancouver)**
- Total stacked: **$112,000**
- $55,000 buyer's bonus (cash at closing)
- 5% deposit structure
- Free upgraded appliance package ($18K value)
- 2.49% rate buy-down (24 months, ~$24K NPV)
- $15,000 closing-cost coverage
- *Stage:* Public Launch · *Units remaining:* 22
- *Expires:* when project hits 60% sold

**Tile 4 — Park & Lansdowne, Richmond Centre (Richmond)**
- Total stacked: **$68,400**
- GST included on units up to $1.05M (~$45K saved)
- Parking included ($28K)
- Quick-close incentive: $5,400 cash at completion if firm by May 15
- *Stage:* Standing Inventory · *Units remaining:* 19
- *Expires:* May 15, 2026 (quick-close component)

**Tile 5 — Citizen Brewery District, Edmonds (Burnaby)**
- Total stacked: **$56,000**
- $30,000 decorating allowance
- One year strata-fee holiday (~$5,800)
- Storage locker included ($12K)
- $8,200 closing-cost coverage
- *Stage:* Construction · *Units remaining:* 14
- *Expires:* July 1, 2026

**Tile 6 — Marine Gateway South, Marpole (Vancouver)**
- Total stacked: **$83,750**
- $50,000 buyer's bonus (cash at closing)
- 5% deposit
- Parking + storage included ($24K)
- Mortgage rate buy-down to 2.99% for 12 months (~$9,750 NPV)
- *Stage:* Standing Inventory · *Units remaining:* 8
- *Expires:* until 80% sold (currently 71%)

**Bottom-of-section CTA (anchor back to hero form):**
`The full Tracker covers 40+ Greater Vancouver buildings every Monday. Get this week's list → [Get the Tracker]`

---

## Block 3 — Education

**Block 3 H2:**
`How Developer Pricing Actually Works (and Why the Public Buyer Pays $50K–$150K More)`

**Section intro (3 short sentences):**
`Developers don't cut list prices. Doing so would erode the comparable-sales data their lenders, appraisers, and future buyers rely on. Instead, they release inventory in stages and stack hidden concessions on top. Knowing the stage tells you how big the discount can be — and reading their language tells you what's negotiable.`

### Sub-section A — The 5-Stage Developer Release Pyramid

**H3 — Stage 1: Friends & Family**
`Earliest pricing — typically 10–15% below the eventual public list. Restricted to developer staff, board members, and family. Almost never accessible to public buyers, and not material to a buyer-side strategy. We mention it only so the rest of the pyramid makes sense.`

**H3 — Stage 2: Realtor VIP / Platinum Access**
`This is where 88 West Realty operates. Buyer agents with builder relationships get early floor-plan allocations and the published incentive stack 2–6 weeks before the public sales centre opens. Typical savings vs. Stage 3: $5K–$25K on price plus first pick of the best-orienting units. In 2026's market, with 5,458 unsold completed units across Greater Vancouver, builders are extending Platinum-level pricing further into the project lifecycle than they would in a balanced market.`

**H3 — Stage 3: Public Pre-Sale**
`The sales centre opens. The headline price is published. The best floor plans are frequently already absorbed by Stage 2. The "incentive stack" is the developer's mechanism for filling the price gap — pricing data stays steady on paper, but cash credits, free parking, and rate buy-downs quietly do the discounting. Typical savings differential vs. Stage 5 standing inventory in a normal market: $40K–$60K. In today's market, that gap has compressed.`

**H3 — Stage 4: Construction Sales (and Assignments)**
`Once construction is under way, the developer continues selling unsold stock — often with bigger published incentives as the absorption clock ticks against their construction loan. Original 2021–2022 pre-sale buyers facing six-figure paper losses are also assigning their contracts at or below their original purchase price. Net effect in 2026: assignment buyers willing to navigate the friction (assignment fee, tighter financing, restricted re-marketing) can occasionally beat Stage 2 pricing on a 30%-built unit. Unusual. Worth tracking.`

**H3 — Stage 5: Completion & Standing Inventory**
`Historically these units traded 25–40% above Stage 1 pricing. In 2026, with completed unsold inventory at a 24-year high, Stage 5 pricing has compressed back toward Stage 3 in Brentwood, Metrotown, Surrey Centre, and Marpole. The leverage is real: you can walk the finished suite, inspect deficiencies, lock financing, and close in 30 days. The risk: next quarter's completions will arrive with bigger published incentives, so timing matters.`

**Stage-summary closing line:**
`In a normal market, Stage 2 saves $50K–$150K vs. Stage 5. In 2026, Stages 2 and 5 are both anomalously favourable — but for different reasons. Stage 2 wins on best floor plans. Stage 5 wins on full unit-condition inspection. The Tracker covers both.`

### Sub-section B — Decoding Developer Language

**H3:**
`12 Phrases Developers Use vs. What They Actually Mean`

**Section intro:**
`We're not here to make you feel like an insider. We're here to make sure you read every line of the offer correctly so the math doesn't lie to you.`

**Translation table (12 rows):**

| Their phrase | What it really means (buyer-side) |
|---|---|
| "From just $499,900" | One unit — typically the smallest, north-facing, or facing the loading dock. Confirm the actual unit list at that price; it's usually one. |
| "5% deposit" | The developer's lender just lowered their absorption threshold. Their carrying cost is now your leverage — extended deposit timelines beyond the published structure are often available, ask. |
| "Decorating allowance" | A price cut hidden as a credit to protect comparable-sales data. Frequently negotiable as cash off the closing total instead of a credit you spend at the developer's design centre at retail. |
| "GST included" | Worth $35K–$50K on a $700K–$1M new home. Verify the base price wasn't quietly raised first — compare $/sq.ft. to nearby resale comps. |
| "Free parking" | $28K–$80K of value depending on building. If you don't need parking, ask whether it converts to a cash price reduction at equivalent value. |
| "Limited time" | The published concession will likely tighten as the project hits 70–80% sold. The deadline is a sales-rhythm signal, not a marketing gimmick — concession size correlates with the developer's lender absorption clock. |
| "Mortgage rate buy-down" | Worth $10K–$30K depending on basis points × term × loan size. Calculate the cash-equivalent NPV yourself before accepting the headline rate. |
| "Strata fee holiday" | 6–12 months of fees waived — $3K–$10K of real value. Disappears at month 13. Model your year-2 carrying cost honestly. |
| "Assignment-friendly" | Investor-targeted. Means the typical 2–4% assignment fee ($14K–$40K) is waived. Separately ask whether re-marketing on MLS is permitted — many builders prohibit it. |
| "Closing-cost coverage" | Legal, title insurance, adjustments — $3K–$8K. Real but small relative to the headline incentive. |
| "Bonus suite finishes" | $10K–$25K of upgrade-list value at the developer's cost (40–50% of the retail price you'd pay a kitchen-and-bath shop later). Negotiate the upgrade list, not just acceptance. |
| "VIP access" | The standard pre-public release window. Real value if your broker has builder relationships. Vapour if they don't. |

---

## Block 4 — Three-Audience Segmentation

**H2:**
`The Tracker Works for Three Different Buyers. Here's Which One You Are.`

**Section intro:**
`The same incentive stack means different things to a yield-focused investor, a couple shopping their forever home, and a first-time buyer stacking government rebates. The Tracker delivers the same data; the playbook around it is different.`

**Three column blocks:**

### H3 — For Investors
`The numbers that matter:`
- `Gross and net yield at the post-incentive purchase price — not the list price`
- `Assignment-clause review (waived fees vs. permitted re-marketing — these are not the same right)`
- `Deposit-structure negotiation: how the published 5% can stretch to 10% over 24 months without principal acceleration`
- `Exit math: what assignment looks like 18 months in if rates move`
- `Strata-fee reality at year two — after the fee holiday lapses`

`We model this for you on every Tracker entry that fits your buy-box. Subscribers also get our monthly "best yields after stack" shortlist.`

### H3 — For Owner-Occupiers
`The questions we answer for you:`
- `What does $100K off mean compared to a comparable resale unit two blocks away — and is the trade-off in age, deficiencies, and warranty worth it?`
- `What's actually behind the "decorating allowance" — credit at the developer's design centre, or cash at closing?`
- `When the building completes, what's on the deficiency punch-list, and who signs off?`
- `What's the realistic move-in date — and what does the contract say if it slips?`
- `If you've never bought new construction before, what does the 2-5-10 year warranty actually cover?`

`We walk you through the answers on a 30-minute call. No buyer-agency required to talk.`

### H3 — For First-Time Buyers
`The headline number is bigger than $100K. The federal GST rebate, BC's property transfer tax exemption, your FHSA, and your RRSP HBP withdrawal stack on top of the developer's incentive. On a $700K Vancouver pre-sale, that's roughly $43K from the government plus $40K from the developer. Total: $83K off.`

`Read the rebate-stacking playbook → /first-time-buyer-vancouver`

---

## Block 5 — Trust + Final CTA

### H2 — Why 88 West Realty? We Don't Represent the Developer — Only You.

**Brokerage badge block (rendered as a card, not body copy):**

> **88 West Realty** — Licensed BC Brokerage
> License #X031527
> 970 Marine Drive, North Vancouver, BC
> 604-281-1828 · info@88westrealty.com

**Trust column copy (3 short paragraphs, agent face photo above):**

`88 West Realty is a licensed BC brokerage. The Developer Incentive Tracker is a buyer-side resource — we are not affiliated with any of the developers we cover, and we are not paid by any developer to feature their building. Our compensation comes from the buyer-agent commission paid by the developer at closing on your behalf, per the BC Real Estate Services Act. You never receive a bill from us.`

`The Tracker exists because we got tired of watching buyers pay $50K–$100K more than they needed to because nobody had assembled the incentive picture in one place. So we did.`

**Verbatim trust line (callout box, larger type):**
`We don't represent the developer — only you.`

**Agent caption (single agent face photo, not a team grid):**
`[Agent Name] — Buyer-Side Agent · 88 West Realty · License #X031527`

### H3 — The Incentive-Match Promise

**Callout block, light-grey card with brand accent:**

> `If the Tracker doesn't surface a match in 30 days, our broker walks you through every project where 88 West has off-the-record builder relationships and pre-negotiates a builder-direct concession on your behalf — at no charge.`

**Sub-text:**
`Eligibility: subscribers who complete the full intake form and respond within 7 days to the broker's outreach. The 30 days runs from the first Tracker delivery after sign-up.`

### H2 — Frequently Asked Questions About Vancouver Developer Deals

**FAQ items (7 — also marked up as `FAQPage` schema per SEO blueprint):**

**H3 — Is a presale safer than a resale in 2026?**
`Different risk profile, not safer or riskier as a category. Pre-sale risk lives in the completion timeline, the developer's financial health, and the assignment of the contract before close. Resale risk lives in deficiencies you can't see, dated systems, and special-levy exposure on older buildings. In 2026, the pre-sale incentive environment is the strongest since 2018. The Tracker shows you which projects have the financial backing and stage of construction to make the wait worthwhile.`

**H3 — What's the GST rebate on a new home, and do I qualify?**
`Bill C-4 expanded the federal GST New Housing Rebate in 2026. On a new home priced up to $1M, eligible buyers can recover up to $50,000 in GST. The full rebate phases out between $1M and $1.5M. Eligibility is broader for first-time buyers but available to other purchaser categories too. We verify eligibility on every Tracker entry that fits your budget.`

**H3 — How do incentive packages stack?**
`A typical 2026 stack on a $700K Greater Vancouver pre-sale combines a 5% deposit, a $25K–$50K cash credit at completion, free parking ($28K–$48K), an interest-rate buy-down (worth $10K–$30K in NPV terms), waived assignment fees, and sometimes a strata-fee holiday. Total cash-equivalent value: $80K–$120K. The Tracker itemizes every concession so you know which dollars are real and which are upgrade-list inflation.`

**H3 — When are builder concessions actually negotiable?**
`Always — but the leverage compounds with the developer's absorption clock. The bigger the unsold inventory and the closer they are to triggering a lender's absorption covenant, the more flexible the published incentives become. At 60–80% sold, what's published is the floor, not the ceiling. Earlier and later in the cycle, you're negotiating from a weaker position. The Tracker tags absorption status on every entry.`

**H3 — What's an assignment, and should I consider one?**
`An assignment is a transfer of a pre-sale purchase contract from the original buyer to a new buyer before the building completes. In 2026, original buyers from 2021–2022 are sometimes assigning at or below their original purchase price to escape the contract. For the new buyer, that can mean acquiring a 30–50% built unit below current Stage 2 pricing — but with friction: financing is harder, the developer's consent is required, and re-marketing on MLS is often restricted. Worth considering in specific cases. We screen these for you.`

**H3 — Is 88 West Realty actually a buyer-side brokerage, or a builder-paid sales arm?**
`Buyer-side. We don't take any retainer or marketing fee from the developers we cover. Our compensation is the buyer-agent commission the developer pays at closing on your behalf per BC's Real Estate Services Act — the same way buyer-agency works on a resale. You don't get a bill from us. We don't curate the Tracker based on which developer pays best; we curate it based on which deals are best for buyers.`

**H3 — Will Vancouver condo prices recover by 2027?**
`BCREA forecasts roughly 3% growth in 2026 and a potential 27% appreciation by 2032. Only 64 pre-sale homes launched in February 2026 — about 6% of the typical monthly volume. The supply pipeline three years out is already shrinking. The math is straightforward: today's incentive window exists because of today's standing inventory. Once that inventory clears, the incentives come off and the supply cliff hits. Whether you buy now is your call. The Tracker just shows you what's available while the window is open.`

### Final CTA

**H2:**
`Get the Tracker. Every Monday. Free.`

**Final-CTA repeat copy (above repeat form):**
`One email a week. Itemized incentive stacks on 40+ Greater Vancouver buildings. Mid-week flash alerts when a stack changes. No spam, no upsell, no fee.`

**Repeat form** (same shape and fields as Block 1).

**Below-form trust strip:**
`Licensed BC brokerage · 88 West Realty · #X031527 · 970 Marine Drive, North Vancouver · 604-281-1828`

### Footer copy

**Footer columns:**
- **88 West Realty** — License #X031527 · 970 Marine Drive, North Vancouver, BC · 604-281-1828 · info@88westrealty.com
- **The Tracker** — How it works · Sample week · Privacy policy · Unsubscribe
- **For Buyers** — Pre-sale buyer representation · First-time buyers ($43K Head Start) · Assignments
- **Disclosure** — Developer commissions paid at closing per the BC Real Estate Services Act. No fee charged to buyers. We are not affiliated with any developer we cover. © 2026 88 West Realty.

**Social row:** Instagram · LinkedIn · YouTube

---

# /first-time-buyer-vancouver — Page Copy

## Block 1 — Hero + Form

**Eyebrow (kicker):**
`THE $43K HEAD START · FIRST-TIME BUYERS · GREATER VANCOUVER`

**H1:**
`The Government Will Hand You $43,000 Toward Your First Vancouver Home. The Developer Will Match It. Do the Math.`

**Subheadline:**
`Five rebates stack on a Greater Vancouver pre-sale: the federal GST New Housing Rebate, BC's property transfer tax exemption, your First Home Savings Account, your RRSP Home Buyers' Plan, and the BC HOMES program. On top of that, developers are stacking $25K–$50K in incentives. Combined, that's up to $83K off a $700K Vancouver condo. We show you every dollar.`

**Hero proof line (worked example, sits as a clean horizontal stat band above form on desktop):**

> **$700,000** Vancouver pre-sale (sample)
> **− $35,000** federal GST rebate (Bill C-4)
> **− $8,000** BC property transfer tax exemption
> **− $40,000** developer incentive stack (parking + decorating credit + rate buy-down)
> **= $617,000** all-in cost · plus FHSA + HBP supercharge your down payment

**Trust line (verbatim):**
`We don't represent the developer — only you.`

**Form headline:**
`Get the $43K rebate guide and this Monday's Tracker.`

**Form subhead:**
`We send the rebate eligibility checklist, a worked example for your budget, and the Greater Vancouver buildings that pencil out for first-time buyers this week. Free.`

**Form fields:**

| Field | Label | Type | Required | Default | Validation |
|---|---|---|---|---|---|
| `first_name` | First name | text | Yes | — | min 2 chars |
| `email` | Email | email | Yes | — | valid email format |
| `ftb_status` | First-time buyer status | radio | Yes | — | one of: Yes — I qualify / My partner is, I'm not / Not sure — help me check |
| `budget` | Budget | select | Yes | — | one of: Under $500K / $500K–$700K / $700K–$1M / $1M+ |
| `intent` | I'm... | select | Yes | — | one of: Buying to live in / Investing / Just exploring |
| `areas` | Areas of interest | multi-select | Yes (≥1) | — | one or more of: Vancouver / North Vancouver / Burnaby / Richmond / Anywhere |
| `timeframe` | Timeline | select | Yes | — | one of: Next 6 months / 6–12 months / 12+ months / Just researching |
| `phone` | Phone (optional) | tel | No | — | 10-digit if provided |
| `consent` | Privacy + contact consent | hidden | Yes | checked | implied via submit |

**Hidden fields:**
- `source` = `first-time-buyer-vancouver`
- `lead_magnet` = `developer-incentive-tracker`
- `audience_variant` = `first-time-buyer`
- `gclid` + UTM bundle

**Conditional logic:**
- If `ftb_status` = "My partner is, I'm not" → contextual link: *"Worth knowing: you may still qualify on the FHSA and HBP independently. We'll cover that in the guide."*
- If `ftb_status` = "Not sure — help me check" → contextual line: *"Free 30-minute eligibility call — no buyer-agency required."*

**Submit CTA copy:**
`Get My $43K Rebate Guide →`

**Below-form micro-text:**
- `Free guide + Monday Tracker. No spam. Unsubscribe in one click.`
- `Eligibility verified against 2026 federal Bill C-4 and BC Budget 2026.`
- `Developer commissions paid at closing — no fee charged to buyers.`

**Phone fallback:**
`Or call 604-281-1828 — buyer-side line.`

---

## Block 2 — The Rebate Stacker

**H2:**
`The 5 Rebates That Stack on a Greater Vancouver Pre-Sale`

**Section intro:**
`These programs don't compete. They stack. Most first-time buyers we meet have heard of two of them. The full stack is bigger than they think — but the rules around eligibility are unforgiving, and a single missed deadline forfeits a rebate entirely. Here's the plain-English version.`

### H3 — 1. Federal GST New Housing Rebate (up to $50,000)

`The 2026 expansion of the GST New Housing Rebate (Bill C-4) lets eligible first-time buyers recover up to $50,000 in GST on a brand-new home priced up to $1M, with the rebate phasing out between $1M and $1.5M. On a $700K Vancouver pre-sale, that's roughly $35,000 back. The rebate is paid through the developer at closing in most cases — meaning your purchase price is effectively reduced rather than refunded later. You must occupy the home as your primary residence to qualify. Investor-purchased units do not qualify, though the federal new residential rental property rebate is available separately at lower amounts.`

### H3 — 2. BC Property Transfer Tax (PTT) Exemption (up to ~$13,000)

`On a property purchase in BC, you pay a property transfer tax — 1% on the first $200K, 2% on the portion up to $2M, 3% above. As a first-time buyer, BC's First Time Home Buyers' Program fully exempts properties priced up to $835,000, with a partial exemption between $835,000 and $860,000. On a $700K home, that exempts roughly $13,000 in PTT. (The original FTHB threshold of $750K was raised in BC Budget 2024 — confirm the live ceiling at signing; we keep this updated.) On a brand-new home, BC also offers a separate Newly Built Home Exemption for properties up to $1.1M — and these two exemptions interact. We walk you through which one applies first.`

### H3 — 3. First Home Savings Account (FHSA) — $40,000 lifetime contribution

`The FHSA — First Home Savings Account — combines the best features of an RRSP and a TFSA for first-home savers. You contribute up to $8,000 per year, $40,000 lifetime. Contributions are tax-deductible (like an RRSP). Withdrawals to buy your first home are tax-free (like a TFSA). On a 30%-bracket income, that's ~$12,000 in tax savings just on the contributions, plus tax-free growth, plus the full $40,000 toward your down payment. The account must be opened at least one year before the qualifying withdrawal — late starts cost you flexibility. You can hold an FHSA and an RRSP at the same time.`

### H3 — 4. RRSP Home Buyers' Plan (HBP) — up to $60,000 withdrawal

`The HBP lets you withdraw up to $60,000 from your RRSP (raised from $35,000 in Budget 2024) toward a first-home down payment, interest-free. You repay the withdrawal back into your RRSP over 15 years, starting in year two. If you don't repay on schedule, the missed amount is added to your taxable income that year — so it's not free money, but it is interest-free leverage. Most importantly: you can stack the HBP with the FHSA on the same purchase. That's potentially $100,000 of down-payment power, with $40K of it permanently tax-free.`

### H3 — 5. BC HOMES — BC Home Owner Mortgage and Equity Programs

`BC has a rotating roster of provincial down-payment and shared-equity programs for first-time buyers. Eligibility, household income caps, and program names change with each provincial budget — the BC Home Owner Mortgage and Equity Partnership (BC HOMES) is the current iteration. Where applicable, the province may match a portion of your down payment as a shared-equity loan repayable on resale. We verify the live program parameters during the 30-minute eligibility call before we recommend layering it — because BC HOMES interacts with mortgage qualification rules in ways that can either help or hurt depending on your file.`

### H3 — 6. Developer Incentives Layered on Top

`The Tracker shows you which Greater Vancouver buildings have a developer incentive stack worth $25K–$50K — cash credits, free parking, mortgage rate buy-downs — and which of those buildings are eligible for the GST rebate (i.e., priced under the $1M–$1.5M phase-out). On a $700K pre-sale, the typical layered total is $40,000 in developer incentives plus $43,000 in government rebates. Combined: $83,000.`

---

## Block 3 — Worked Example

**H2:**
`Worked Example: $83,000 Off a $700,000 Vancouver Condo`

**Section intro:**
`Numbers below are realistic for a 2026 first-time buyer purchasing a one-bedroom Greater Vancouver pre-sale. We'll customize this to your budget on the eligibility call.`

**Stack table (rendered as a vertical waterfall with the running total in brand colour):**

| Step | Cost / Saving | Running total |
|---|---|---|
| Sample list price (1-bed, Greater Vancouver pre-sale) | **$700,000** | $700,000 |
| − Federal GST rebate (Bill C-4) | – $35,000 | $665,000 |
| − BC PTT first-time buyer exemption | – $8,000 | $657,000 |
| − Developer decorating credit | – $25,000 | $632,000 |
| − Developer parking + storage included | – $15,000 (cash equivalent) | $617,000 |
| **All-in net cost to you** | | **$617,000** |
| **Saved against list** | | **$83,000** |

**Down-payment stack (separate, parallel block):**

| Source | Amount | Notes |
|---|---|---|
| FHSA contributions (you) | up to $40,000 | Tax-deductible going in, tax-free coming out |
| RRSP HBP withdrawal | up to $60,000 | Interest-free, 15-year repayment |
| Personal savings | depends | Top-up as needed |
| **Possible total down-payment power** | **up to $100,000** | Exceeds 5% on a $700K home |

**Closing line of section:**
`The point isn't that everyone gets exactly $83,000. The point is the rules let you stack five of these. Most buyers we meet are stacking only two — and leaving real money on the table.`

---

## Block 4 — Live Tracker Preview (FTB-filtered)

**H2:**
`This Week: Greater Vancouver Buildings That Pencil Out for First-Time Buyers`

**Section intro:**
`Filtered for projects priced under the $1M GST-rebate full-credit threshold, with developer incentive stacks of $25K+ and units actually available at the FTB-eligible price tier.`

**Sample tile content (3 tiles — same data shape as canonical Block 2; build pulls from `tracker-this-week.json` filtered by `ftb_eligible=true`):**

**Tile 1 — Park & Lansdowne, Richmond Centre**
- Sample 1-bed: **$648,000**
- GST rebate eligible (up to $32,400)
- $30,000 decorating credit
- Parking included ($28K)
- *Stage:* Standing Inventory · *FTB-eligible units:* 7

**Tile 2 — Citizen Brewery District, Edmonds (Burnaby)**
- Sample 1-bed: **$589,000**
- GST rebate eligible (up to $29,450)
- $30,000 decorating allowance
- Strata-fee holiday year one
- *Stage:* Construction · *FTB-eligible units:* 9

**Tile 3 — Marine Gateway South, Marpole (Vancouver)**
- Sample 1-bed: **$719,000**
- GST rebate eligible (partial — phases out above $1M)
- $50,000 buyer's bonus
- Rate buy-down to 2.99% (12 mo)
- *Stage:* Standing Inventory · *FTB-eligible units:* 4

**Cross-link to canonical (mandatory bidirectional link per SEO blueprint):**
`Already comfortable with the rebate stack and want every developer concession on every Greater Vancouver building? See the full Developer Incentive Tracker → /developer-condo-deals-vancouver`

---

## Block 5 — Trust + FAQ

### H2 — How 88 West Realty Helps You Capture Every Dollar

**Brokerage badge block:**

> **88 West Realty** — Licensed BC Brokerage
> License #X031527
> 970 Marine Drive, North Vancouver, BC
> 604-281-1828 · info@88westrealty.com

**Trust copy (3 short paragraphs, agent face above):**

`We're a licensed BC brokerage. The $43K Head Start guide and the Developer Incentive Tracker are both buyer-side resources — we are not affiliated with any developer, and we don't take any developer marketing fees. The buyer-agent commission paid at closing by the developer covers our work, per the BC Real Estate Services Act. You never receive a bill from us.`

`First-time buyers leave the most money on the table. Not because the rules are hidden — they aren't — but because nobody sits with them and walks through which programs apply in which order, what the deadlines are, and which Greater Vancouver buildings actually qualify under each one. That's our job.`

**Verbatim trust line (callout):**
`We don't represent the developer — only you.`

**Agent caption:**
`[Agent Name] — Buyer-Side Agent · 88 West Realty · License #X031527`

### H3 — The Incentive-Match Promise

> `If the Tracker doesn't surface a first-time-buyer-eligible match in 30 days, our broker walks you through every project where 88 West has off-the-record builder relationships and pre-negotiates a builder-direct concession on your behalf — at no charge.`

### H2 — Frequently Asked Questions for First-Time Buyers

**FAQ items (6 — also `FAQPage` schema):**

**H3 — Am I still a first-time buyer if I owned a home with my ex?**
`If you've ever held title to a home anywhere in the world that you used as your principal residence, federally you are not a first-time buyer for HBP purposes. There's a four-year reset rule: if you haven't lived in a home you owned (or that your spouse owned) in the four years prior to the withdrawal, you may again qualify. The FHSA has a similar but distinct rule. The BC PTT FTHB exemption uses its own definition. The three rules are not identical. We confirm each one on the eligibility call.`

**H3 — Can I use the FHSA AND the RRSP HBP on the same purchase?**
`Yes. They're independent programs and you can withdraw from both on the same purchase. FHSA: up to $40,000 lifetime, tax-free withdrawal, no repayment. HBP: up to $60,000, interest-free, 15-year repayment. Stacked, that's up to $100,000 of first-home down-payment power. The FHSA must have been open at least one year before the qualifying withdrawal — that's the most common trip wire we see.`

**H3 — What if my partner already owns a home — can I still use my own first-time buyer status?**
`Some programs treat you as a household; others treat you as an individual. The federal GST New Housing Rebate is generally a primary-residence test (the property must be your principal residence regardless of partner history). The HBP has a four-year reset rule applied at the household level. The FHSA is opened individually and your partner's prior ownership doesn't disqualify you. The BC PTT FTHB exemption looks at both buyers on title. Outcome: you may qualify for some programs and not others. We verify on the call.`

**H3 — How do developer incentives stack with government rebates?**
`They stack additively, but with one wrinkle: some developer incentives are paid as price reductions and some as post-closing credits. Price reductions lower the GST-rebate base (which lowers your federal rebate slightly). Post-closing credits don't. On most deals the developer's credit is paid at closing as a buyer's-bonus or decorating credit, and you keep the full GST rebate calculated on the gross list price. We model both versions on every Tracker entry.`

**H3 — What's the income cap or deadline for first-time buyer programs in 2026?**
`The federal GST New Housing Rebate doesn't have an income cap; it has a price cap (full rebate up to $1M, phasing out to $1.5M). The FHSA has no income cap on contributions. The HBP has no income cap. The BC PTT FTHB exemption has a price cap (~$835K for full exemption) but no income cap. BC HOMES has both a household income cap and household-asset rules — those are the parameters that change most with each provincial budget. We confirm live values on the eligibility call.`

**H3 — Should I buy a pre-sale or a resale as a first-time buyer in 2026?**
`Pre-sale wins on rebate stacking — the GST rebate alone is up to $50,000, and resale homes don't qualify. Resale wins on certainty of move-in date and the ability to inspect the actual unit. With Greater Vancouver's standing inventory at a 24-year high, you can also buy a finished pre-sale unit (Stage 5) and capture the GST rebate on a brand-new home you can walk through before signing. That's the underrated path. The Tracker tags it.`

---

## Block 6 — Final CTA + Footer

### H2 — Get the $43K Head Start Guide and Tracker. Free.

**Final-CTA repeat copy:**
`The complete first-time buyer rebate stack — verified against 2026 federal Bill C-4 and BC Budget 2026 — plus this week's Greater Vancouver buildings that pencil out for first-time buyers. One Monday email. No spam, no upsell, no fee.`

**Repeat form** (same shape and fields as Block 1, including FTB-status radio).

**Below-form trust strip:**
`Licensed BC brokerage · 88 West Realty · #X031527 · 970 Marine Drive, North Vancouver · 604-281-1828`

### Footer copy (same shape as canonical, FTB-relevant link emphasis):

- **88 West Realty** — License #X031527 · 970 Marine Drive, North Vancouver, BC · 604-281-1828 · info@88westrealty.com
- **First-Time Buyers** — The $43K Head Start guide · Rebate eligibility checklist · 30-minute eligibility call · Privacy policy
- **Other Resources** — Full Developer Incentive Tracker (all buyers) → /developer-condo-deals-vancouver · Pre-sale buyer representation · Assignments
- **Disclosure** — Developer commissions paid at closing per the BC Real Estate Services Act. No fee charged to buyers. We are not affiliated with any developer we cover. Rebate amounts referenced are illustrative; final eligibility verified during the eligibility call. © 2026 88 West Realty.

---

# Build dependencies (read these before implementing)

1. **`tracker-this-week.json` data feed** — Both pages render hero proof line and live tracker tiles from a JSON file populated weekly by the operations team. Without it, the page must show a static "coming Monday — sample below" wrapper. Schema: `{ updated_at, new_this_week_count, top_stack: { project_name, neighborhood, total_stack_cad, concessions[], stage, expires_when, ftb_eligible } , buildings: [ ...same shape ] }`. FTB page filters by `ftb_eligible=true`.
2. **GHL webhook URL placeholder** — Both pages need a build-time `assertWebhookLocation()` guard pointed at the new 88West GHL location trigger ID for `developer-condo-deals-vancouver` and `first-time-buyer-vancouver` (placeholders flagged in `phase2-synthesis-foreclosure-and-developer-deals.md` §4).
3. **Dynamic worked-example block (FTB Block 3)** — The waterfall table is static at MVP, but the build should accept `?budget=700000` query param to drive a future live calculator. Mark the table with a `data-component="worked-example-stack"` hook for v2.
4. **Conditional form logic** — Both forms have intent-/status-driven contextual links that need client-side render logic, not server.
5. **Cross-page bidirectional internal links** — Per SEO blueprint, mandatory ≥3 contextual links each direction between canonical and FTB pages. Anchor text variants listed in seo-blueprint §"Internal link strategy".
6. **Verbatim trust line** appears 2x on canonical (hero subhead area + Block 5 callout) and 2x on FTB (hero + Block 5). Centralize as a constant.
7. **Bracketed placeholders** to swap at build:
   - `[DATE]` in hero proof line — server-rendered from `tracker-this-week.json.updated_at`
   - `[Agent Name]` in agent captions (both pages) — single source-of-truth in `lib/agents.ts`
   - `[Project Name]` placeholders in FAQ and tracker tiles — sourced from `tracker-this-week.json`
8. **License #X031527** appears 5x across both pages (hero badge area implicit, Block 5 trust block, agent caption, footer column 1, footer disclosure). Centralize as a constant.
9. **Phone number `604-281-1828`** appears in hero (mobile sticky), Block 5 trust block, footer, and as the `tel:` href on every CTA fallback. Centralize.
10. **`FAQPage`, `Service`, `RealEstateAgent`, `BreadcrumbList` schema** per SEO blueprint — populate from the FAQ blocks above. FTB page uses an FTB-specific `Service.name` per blueprint §"Page 2 Schema markup".
