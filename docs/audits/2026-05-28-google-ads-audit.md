# 88 West Google Ads Audit — 2026-05-28 → 2026-05-30

**Scope:** Foreclosure (`23860739926`) + Developer Condo Deals (`23856222179`)
**Account:** `7077162356` (shared with Apex Medical Realty)
**Window:** 14-day GAQL pull (campaigns launched 2026-05-17 → 11 days of data at audit start)
**Tool:** `brio-marketing-hub/builtbybrio-seo/google-ads/manage.py` + direct GAQL

---

## Status: audit + refinement complete

This audit was a two-pass effort:

1. **Audit pass (2026-05-28)** — surfaced double-counting of conversions, budget allocation issue, redundant/wasteful keywords, dead keywords, missing dashboard wiring, and 5 REMOVED zombie duplicates polluting name-based queries.
2. **Refinement pass (2026-05-28 → 30)** — executed corrective mutations: paused Developer, doubled Foreclosure budget, killed double-count, paused 10 wasteful/dead keywords, added 3 EXACT converters, created the missing Court-Ordered Sales ad group + RSA + 6 EXACT keywords, added 3 campaign negatives, wired 88W into the dashboard registry.

Final state below reflects post-mutation reality.

---

## Mutations executed (chronological, all via Google Ads API v23)

| # | Mutation | Object | Result |
|---|---|---|---|
| 1 | Pause | Developer campaign (`23856222179`) | ENABLED → PAUSED |
| 2 | Budget update | Foreclosure budget (`15583934787`) | $10.00 → **$20.00**/day |
| 3 | Demote conversion action | `Registration Form Submit` (`7556742210`) | primary_for_goal True → **False** (side-effect: `include_in_conversions_metric` flipped to False, killing the double-count) |
| 4–13 | Pause keywords (Foreclosure Listings ad group) | 8 PHRASE keywords: `foreclosures bc`, `foreclosure houses bc`, `foreclosures vancouver`, `foreclosure`, `foreclosure properties bc`, `foreclosure house for sale`, `foreclosed homes british columbia`, `foreclosed homes bc` | All paused |
| | Pause keywords (City-Specific ad group) | 2 PHRASE: `burnaby foreclosure`, `coquitlam foreclosure` | All paused |
| 14–16 | Add EXACT keywords (Foreclosure Listings ad group) | `[foreclosure homes for sale]`, `[foreclosure homes vancouver]`, `[house foreclosure sales]` | All enabled |
| 17 | Create ad group | `Court-Ordered Sales` (id `203787864184`, max bid $4.00) | Created |
| 18 | Create RSA | Responsive Search Ad in Court-Ordered Sales — 10 headlines, 4 descriptions, UTM-tagged landing URL. First attempt failed Google policy on `~389` symbol; resubmitted as `About 389` | Created |
| 19–24 | Add EXACT keywords (Court-Ordered Sales ad group) | `[court order sales]`, `[court order sale]`, `[court ordered sales vancouver]`, `[court ordered sale vancouver]`, `[court ordered homes vancouver]`, `[court ordered listings bc]` | All enabled |
| 25–27 | Add campaign negatives | `[vancouver homes for sale]` EXACT, `prince george` PHRASE (was already present — noop), `abandoned houses` PHRASE | 2 new + 1 dup |

**Total: 27 API mutations** across 2 services (CampaignService, CampaignBudgetService, ConversionActionService, AdGroupCriterionService, CampaignCriterionService, AdGroupService, AdGroupAdService). Every batch ran with pre-state inspection and post-state verification.

Also: 88W now wired into the brio-ads dashboard sync registry (`dashboard-backend/sync/run_sync.py`), commit `84c48ff`. Once the next 6h cron tick runs, 88W appears at `/monitoring/foreclosure-vancouver` and `/monitoring/developer-condo-deals`.

---

## Audit-window performance (pre-refinement, with double-count corrected)

These are the numbers from the 14 days *before* refinement. They reflect what the campaigns produced under the original config ($10/day Foreclosure, $10/day Developer, double-counted conversions).

| Metric | Foreclosure (23860739926) | Developer (23856222179) |
|---|---|---|
| Status (pre-refinement) | ENABLED | ENABLED → now PAUSED |
| Days serving | 9 | 11 |
| Daily budget (pre-refinement) | $10.00 | $10.00 |
| Spend (14d) | $108.69 | $216.15 |
| Impressions | 179 | 379 |
| Clicks | 43 | 51 |
| CTR | **24.0%** (very high — narrow-intent search) | 13.5% |
| Avg CPC | $2.53 | $4.24 |
| **Conversions** (recorded, double-counted) | 6 | 0 |
| **Real conversions** (post-dedupe) | **3** | 0 |
| **Real CPA** | **$36.23** | n/a |
| Search Impression Share | 10% | 10% |
| Search Lost-IS (budget) | **90%** | **90%** |
| Search Lost-IS (rank) | 1% | 1.4% |

The 24% CTR on Foreclosure is unusually high — search-intent for foreclosures is narrow and high-converting; healthy signal. Developer's 13.5% CTR was fine for search but the **0-conversion / $216-spent gap was the audit's #1 finding**.

---

## Findings + status

### CRITICAL — RESOLVED

#### C-1 — Developer campaign: 0 conversions on 51 clicks / $216 spent → **PAUSED**
Top search terms were named-building queries (`tesoro vancouver`, `portico coquitlam`, `grafia vancouver`, `westbank oakridge presale price`) — people researching *specific buildings*, not buyers shopping for an agent. Intent mismatch. **Action taken: campaign paused 2026-05-30**, freeing $10/day to Foreclosure (which now runs at $20/day). Re-evaluate if/when the developer landing page has conversion tracking confirmed and tighter keyword targeting designed.

#### C-2 — Both campaigns: Lost-IS-Budget 90% but spending only ~30% of nominal budget → **PARTIALLY RESOLVED**
Foreclosure budget doubled $10 → $20/day. Expected effect: Lost-IS-Budget drops from 90% toward 30–50% as the budget envelope expands, more auctions won, more conversions at same CPA. **Re-measure at day 7 + day 14 post-refinement.**

### HIGH — RESOLVED

#### H-1 — Foreclosure: most converting keyword had only 4 (= 2 real) conversions on 5 clicks → **EXACTed**
`foreclosure homes for sale` (PHRASE QS=6) was driving the bulk of conversions. Now also added as `[foreclosure homes for sale]` EXACT in the same ad group to ringfence the auction.

#### H-2 — Developer "presale condo" PHRASE: 22% of campaign spend with 0 conversions → **MOOT (campaign paused)**
Will become live again only if Developer campaign is re-enabled with tighter targeting.

#### H-3 — Multiple high-spend search terms were named-building queries → **MOOT (campaign paused)**
Negatives weren't needed since Developer is paused. If/when re-enabled, add: `tesoro`, `portico`, `grafia`, `oakridge`, `westbank` as PHRASE negatives.

#### H-4 — Quality Scores low (3–5) on Foreclosure top-spend keywords → **EXPECTED TO IMPROVE PASSIVELY**
QS climbs when (a) low-QS keywords leave the ad group (achieved by pausing 8 PHRASE QS=3-5 keywords) and (b) ad-keyword relevance is tighter (achieved by adding EXACT converters + splitting court-ordered intent into its own ad group). Expect QS to drift up over 2–4 weeks as Google reassesses.

### MEDIUM — PARTIALLY RESOLVED

#### M-1 — 5 zombie REMOVED duplicate campaigns in the account → **NOT REMOVED (Google API doesn't allow full deletion)**
```
23735968539  REMOVED  [Search] Vancouver Developer Condo Deals
23850858948  REMOVED  [Search] Vancouver Foreclosure & Court-Ordered Sales
23856163178  REMOVED  [Search] Vancouver Foreclosure & Court-Ordered Sales
23856166997  REMOVED  [Search] Vancouver Developer Condo Deals
23856222179  ENABLED  [Search] Vancouver Developer Condo Deals  ← live (now PAUSED)
23860596436  REMOVED  [Search] Vancouver Foreclosure & Court-Ordered Sales
23860739926  ENABLED  [Search] Vancouver Foreclosure & Court-Ordered Sales  ← live
```
**Action deferred** — REMOVED status is permanent in Google Ads (can't be fully deleted). The CLI bug that caused `manage.py monitor` to grab the wrong duplicate by name has been worked around by patching `monitor.py` to use `cust_id = config.get("customer_id", CUSTOMER_ID)` (commit `23a4fef`); a deeper fix would have `find_campaign_id` prefer status=ENABLED matches. Tracked as a follow-up.

#### M-2 — 88W not in dashboard → **WIRED**
Added `foreclosure-vancouver` and `developer-condo-deals` to `dashboard-backend/sync/run_sync.py::CAMPAIGN_REGISTRY` (commit `84c48ff`). VM container restarted; next 6h campaign sync cron picks them up. Will appear at:
- `dashboard-frontend-pearl-zeta.vercel.app/monitoring/foreclosure-vancouver`
- `dashboard-frontend-pearl-zeta.vercel.app/monitoring/developer-condo-deals`

#### M-3 — Foreclosure City-Specific ad group dormant → **HELD ON PROBATION**
2 of 5 keywords paused (burnaby, coquitlam — 0 impressions). 3 remain (richmond, foreclosure houses vancouver, surrey). If still at <5 impressions in 14 days, consider archiving the ad group and rolling the active geos into Foreclosure Listings as city-modifier keywords.

### LOW — INCORPORATED

#### L-1 — "court order sales" + "house foreclosure sales" search terms converted → **PROMOTED**
`[court order sales]` is in the new Court-Ordered Sales ad group EXACT. `[house foreclosure sales]` was added EXACT to Foreclosure Listings. Both will compete for the converting traffic going forward.

---

## Post-refinement campaign structure

### Foreclosure campaign (23860739926) — ACTIVE
- **Status:** ENABLED · **Daily budget:** $20.00 (was $10.00)
- **Bid strategy:** Manual CPC

**Ad group 1: Foreclosure Listings** (id `193828639422`, max bid $2.50)
- 7 enabled keywords:
  - PHRASE QS=7: `foreclosure listings vancouver`
  - PHRASE QS=6: `foreclosure homes for sale` ← converter
  - PHRASE QS=5: `bc foreclosure listings`
  - PHRASE QS=-: `foreclosure homes vancouver` ← converter
  - **NEW** EXACT: `[foreclosure homes for sale]`
  - **NEW** EXACT: `[foreclosure homes vancouver]`
  - **NEW** EXACT: `[house foreclosure sales]`
- 8 paused (the waste + dead set)

**Ad group 2: City-Specific** (id `196266533949`, max bid $1.75)
- 3 enabled PHRASE keywords: `richmond foreclosure`, `foreclosure houses vancouver`, `surrey foreclosure`
- 2 paused (burnaby, coquitlam)
- On probation — archive if <5 impressions in 14 days

**Ad group 3: Court-Ordered Sales** (id `203787864184`, max bid $4.00) **— NEW**
- 6 enabled EXACT keywords: `[court order sales]`, `[court order sale]`, `[court ordered sales vancouver]`, `[court ordered sale vancouver]`, `[court ordered homes vancouver]`, `[court ordered listings bc]`
- 1 RSA (10 headlines, 4 descriptions, UTM-tagged landing URL pointing to `/foreclosure-deals-vancouver`)
- Pending Google ad review (12–24h typical)

**Campaign-level negatives (new this audit):**
- `[vancouver homes for sale]` EXACT
- `abandoned houses` PHRASE

(Existing ~85 negatives unchanged — `prince george`, `chilliwack`, `townhomes`, `lease`, `rental`, `fsbo`, `stop foreclosure`, `pre foreclosure`, etc. Strong baseline.)

### Developer campaign (23856222179) — PAUSED
Frozen at PAUSED state. Re-enable only after:
1. Manual conversion-path walk to confirm tracking fires on form submit
2. Named-building negatives added (tesoro, portico, grafia, oakridge, westbank)
3. Tighter targeting designed (likely: pause "presale condo" PHRASE, add EXACT variants for the few terms that show buyer intent, not browser intent)

---

## Conversion-tracking change

`Registration Form Submit` (WEBPAGE action `7556742210`) was demoted from primary to secondary. It still tracks in "All Conversions" for diagnostic visibility but no longer counts toward "Conversions" — meaning Smart Bidding (when transitioned) optimizes on a single, de-duplicated signal.

`CRM Lead (Offline)` (UPLOAD_CLICKS action `7582974906`) remains the single primary action. It's fed by the Phase B GHL→Google Ads hourly cron sync, which uploads every CRM contact carrying a gclid. This is the source of truth — captures the conversions that ad-blocked gtag misses.

**Open follow-up:** Customer Conversion Goals show the UNKNOWN-origin SUBMIT_LEAD_FORM goal (which holds the offline action) with `biddable=False`. When transitioning Foreclosure to Smart Bidding (currently 3 lifetime conversions → 15-target away), this needs to be flipped to `biddable=True` via `CustomerConversionGoalService` or Google won't optimize for offline conversions.

---

## Forward monitoring plan

| When | Check | Why |
|---|---|---|
| Day 2 (Sun) | RSA approval status on Court-Ordered Sales ad — Google reviews new ads in 12-24h | Catch any further policy issues (we already hit one: `~389` → `About 389`) |
| Day 4 | Foreclosure Search Impression Share + Lost-IS-Budget | If Lost-IS-Budget drops from 90% → 30-50%, the $20 budget bump worked |
| Day 7 | Conversions on `CRM Lead (Offline)` only — should be single-counted | First clean week of de-duped conversion data; verify the dashboard reflects new wiring |
| Day 7 | Quality Score climb on Foreclosure Listings keywords (look for 5→6, 6→7 movement) | Validates that pausing low-QS junk lifts the ad group's QS average |
| Day 14 | Full re-audit pass — re-run today's GAQL queries | Check whether projected gains landed: CPC down (target $1.80-$2.20 from $2.53), CPA down (target $22-$28 from $36.23), conversions up (target 5-7 from 3) |

---

## Methodology + tools

- All metrics pulled via direct GAQL `LAST_14_DAYS` filter (campaigns launched 2026-05-17 → 13 days of data at end of audit window)
- Conversion attribution post-2026-05-30: Last-click via `CRM Lead (Offline)` (UPLOAD_CLICKS, id `7582974906`) only. Historical 14-day window still includes double-counted attribution because the conversion-action mutation doesn't retroactively change recorded conversions
- Mutations executed via `google-ads` Python SDK v23 using the existing `client/auth.py` → `google-ads.yaml` credentials chain
- All mutations preceded by pre-state read-back and followed by post-state verification

**Bug surfaced + worked-around during audit:**
- `manage.py monitor` was reading the wrong (REMOVED zombie) campaign because `reporter.find_campaign_id` does name-based lookup and there are duplicates on the account. Fixed in `commands/monitor.py` by per-slug `customer_id` resolution (commit `23a4fef`). Deeper fix (`find_campaign_id` prefers ENABLED matches) tracked as M-1 follow-up.

---

## Follow-up — 2026-06-02 — Optimization Score pass

Third pass on the Foreclosure campaign, this time targeting the **Optimization Score** lever rather than performance metrics. Pre-state OS had drifted from 87% to **77.7%** because Google added a `CAMPAIGN_BUDGET` recommendation (it sees the 90% Lost-IS-Budget signal and wants more spend) after the 2026-05-30 mutations settled.

### Recommendations Google was showing on 2026-06-02

| Type | Decision | Reasoning |
|---|---|---|
| `SITELINK_ASSET` | **Accept — add 3 more** | Foreclosure had 4 sitelinks already; 7 is Google's "good" tier baseline |
| `RESPONSIVE_SEARCH_AD_IMPROVE_AD_STRENGTH` | **Accept — create v2 RSAs** | The 2026-05-24 W2 RSA pass needed reinforcement; ad strength was GOOD on Foreclosure Listings but AVERAGE on City-Specific |
| `TARGET_CPA_OPT_IN` | **Defer** | Premature — needs ≥15 lifetime conversions for stable Smart Bid learning; currently 3 |
| `CAMPAIGN_BUDGET` (raise from $20/day) | **Defer** | Holding $20/day through 2026-06-13 day-14 checkpoint to validate the prior $10 → $20 bump before stacking another |
| `DISPLAY_EXPANSION_OPT_IN` (from prior pass) | **Naturally expired** | Recommendation rotated off the active list before we got to it. No mutation needed. If it returns, the rationale to reject is documented in [the report file](#) — Display traffic has 5-10× lower conversion rate in real-estate niches; would dilute the niche-intent advantage Foreclosure has |

### What was executed (12 mutations)

**Sitelinks (6 mutations: 3 asset creates + 3 campaign-asset links)**

| Link text | Desc 1 | Desc 2 |
|---|---|---|
| Book Free Call | 15-min call with Shirin Saleh | Foreclosure-specific guidance |
| Weekly Sheet by Email | Business-day mornings, free | Greater Vancouver inventory |
| Why Buyer-Side Only | No bank affiliation | We represent buyers exclusively |

Foreclosure sitelink count: **4 → 7**

**Image assets (4 campaign-asset links)** — required two attempts:

- First attempt with `field_type = SQUARE_MARKETING_IMAGE` / `MARKETING_IMAGE` failed with INCOMPATIBLE field type for Search campaigns. Those field types are Performance Max specific.
- **Retried with `AD_IMAGE` and `BUSINESS_LOGO`** — both work for Search.

| Asset ID | Dimensions | Field type | What |
|---|---|---|---|
| 241890004314 | 6250×6250 (1:1) | `AD_IMAGE` | 88 West Realty logo |
| 270297351337 | 6900×6900 (1:1) | `AD_IMAGE` | Office sign (square) |
| 270307030788 | 6900×3611 (1.91:1) | `AD_IMAGE` | Office sign (landscape) |
| 241890004314 | 6250×6250 (1:1) | `BUSINESS_LOGO` | 88 West Realty logo (also as business profile logo) |

Image assets on Foreclosure: **0 → 4**.

Deliberately excluded from this pass: Paragon-derived listing photos (`hero-court-ordered.jpg`, `Untitled design (X).jpg`) — pending MLS-compliance confirmation with Shirin before using identifiable property exteriors in ad imagery. Team photos also held — extra policy review for images with identifiable people.

**RSAs (2 ad creates)** — new v2 RSAs in Foreclosure Listings + City-Specific ad groups with 8 fresh headlines + 4 fresh descriptions. Cleaner pattern than mutating existing RSAs (which would have re-triggered Google's full review). Both RSAs were created ENABLED and are now PENDING Google review.

| New headline | Chars |
|---|---|
| Buyer-Side Foreclosure Help | 28 |
| Free Foreclosure Sheet | 22 |
| Schedule A Explained | 20 |
| Court-Ordered Listings BC | 25 |
| No Bank Affiliation | 19 |
| Free for Buyers | 15 |
| Updated Each Business Day | 25 |
| Vancouver Foreclosure Pros | 26 |

| New description | Chars |
|---|---|
| Greater Vancouver court-ordered sales. Daily email. Buyer-side only, no bank ties. | 83 |
| Free Schedule A walkthrough with a 88 West agent. 15-min call, no obligation. | 77 |
| We surface BC foreclosure inventory daily — Vancouver, Burnaby, Richmond, North Van. | 84 |
| Investors + first-time buyers welcome. Shirin Saleh and the 88 West team represent you. | 87 |

Court-Ordered Sales ad group RSA was left untouched — it's still under Google's initial review from 2026-05-30 creation; adding a second RSA before the first one's approved adds noise to the comparison data.

### Post-mutation state

```
Foreclosure assets:
  CALL                                            1
  CALLOUT                                         8
  IMAGE / AD_IMAGE                                3   ← new
  IMAGE / BUSINESS_LOGO                           1   ← new
  SITELINK                                        7   ← was 4
  STRUCTURED_SNIPPET                              2

Foreclosure RSAs (all ENABLED):
  Foreclosure Listings   ad_id=809976066366   strength=GOOD
  Foreclosure Listings   ad_id=811515815500   strength=PENDING  ← new
  City-Specific          ad_id=809976066369   strength=AVERAGE
  City-Specific          ad_id=811515816679   strength=PENDING  ← new
  Court-Ordered Sales    ad_id=811132483914   strength=AVERAGE  (still in initial review)
```

OS at end of session: still **77.7%** — but the OS engine refreshes every 24-72h. The three addressed recommendations (`SITELINK_ASSET`, `RSA_IMPROVE_AD_STRENGTH`, partial `CAMPAIGN_BUDGET`) should auto-resolve as Google sees the new assets/ads.

### Expected trajectory

| Metric | When to expect | Projection |
|---|---|---|
| Optimization Score | 1-3 days | 77.7% → **85-90%** as `SITELINK_ASSET` + `RSA_IMPROVE_AD_STRENGTH` recs resolve |
| RSA strength (Foreclosure Listings v2) | 12-24h | PENDING → **GOOD or EXCELLENT** post-review |
| RSA strength (City-Specific v2) | 12-24h | PENDING → **GOOD** (more diverse headlines than the v1) |
| Image-asset CTR lift | 7-10 days of data | +3-7% on mobile primarily |

### Open follow-ups added by this pass

- **MLS-compliance check on listing photos** — talk to Shirin before linking Paragon-derived hero images (`hero-court-ordered.jpg` etc) as image assets. Could meaningfully strengthen the visual appeal beyond brand-only imagery.
- **Landscape logo asset** — none currently in inventory at the right aspect (1.91:1 logo). Either commission one or repurpose the existing landscape office sign as `LANDSCAPE_LOGO`. Low priority.
- **Court-Ordered Sales RSA reinforcement** — wait for the 2026-05-30 RSA to clear initial review + accumulate some data, then add a v2 RSA the same way we did for the other two ad groups.

---

**Audit prepared by:** Cadence/Claude (via `brio-marketing-hub/builtbybrio-seo/google-ads/manage.py` + direct GAQL queries)
**Source data:** Google Ads API v23, customer `7077162356`, queried 2026-05-28 + 2026-05-30 + 2026-06-02
