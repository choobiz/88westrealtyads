# Google Ads Audit — Foreclosure Vancouver
**Date:** 2026-06-11 (campaign day-25, 8 days early of scheduled 2026-06-13 day-14 checkpoint)
**Campaign:** `23860739926` ENABLED · MANUAL_CPC · $10/day
**Auditor:** Amir Omidvar
**Prior audit:** [2026-05-28](./2026-05-28-google-ads-audit.md)

---

## Executive summary

Foreclosure campaign is performing **better than the day-14 trajectory predicted on CTR but worse on CPA**. Underlying cause is split:
- Mobile (75% of traffic) converts at industry-benchmark 2.4–4% — healthy
- **Desktop converts at 0%** despite 22% CTR — driving the "high CTR but no form submissions" perception
- Budget bound at $10/day with **90% Lost-IS-Budget** — biggest unrealized lever, but Amir chose to hold

Pre-audit: a P0 bug in `manage.py audit` was found and patched (see Bug #1). The original audit run showed $0 across the board because `find_campaign_id` was matching a REMOVED zombie campaign by name. Fixed in `client/reporter.py`.

7 mutations executed this pass. Medical Strata campaign also paused (was running unintentionally with $113 spend / 0 conversions over 30 days).

---

## Bug #1 (P0) — `manage.py audit` was reading REMOVED zombie campaigns

**Root cause:** `find_campaign_id` in `client/reporter.py` matched by name only, didn't filter `REMOVED`. Account `7077162356` has 5 REMOVED dupes of `[Search] Vancouver Foreclosure & Court-Ordered Sales` (from earlier iterations). The function pulled a dead one and reported zero metrics.

**Fix shipped:** Patched `find_campaign_id` to filter `campaign.status != 'REMOVED'` and prefer ENABLED matches over PAUSED. Same root cause as the 2026-05-28 `monitor.py` fix; this propagates the fix to all audit/monitor codepaths.

**Verification:** Re-ran `manage.py audit foreclosure-vancouver --days 14` post-patch → Score jumped 64 → **78/100, Grade C** with real metrics surfacing.

---

## Headline performance (14d, correct data)

| Metric | Day-14 target | Actual | Verdict |
|---|---|---|---|
| Spend | — | $238.70 ($17/day avg) | over-delivering on $10/day cap |
| Impressions | — | 258 | impression-share bound |
| Clicks | — | 97 | — |
| CTR | — | **37.6%** | exceptional |
| Avg CPC | $1.80–$2.20 | $2.46 | slight miss |
| Conversions | 5–7 | **3 real** (4th is pre-demotion artifact) | miss |
| CPA | $22–28 | **$79.57** | significant miss |
| Search IS | — | 10.0% | 90% Lost-IS-Budget |

## Device-level breakdown — critical finding

| Device | Impr | Clicks | CTR | Cost | Conv | CvR |
|---|---|---|---|---|---|---|
| **Desktop** | 68 | 15 | 22.1% | $37.87 | **0** | **0.0%** |
| **Mobile** | 193 | 83 | 43.0% | $203.41 | 2 (web) | 2.4% |
| Tablet | 2 | 0 | — | $0 | 0 | — |

**Mobile is doing all the conversion work.** Desktop is a click sink — 15 clicks, $37.87, zero conversions. This is most of the "high CTR but no submissions" gap.

## Conversion-tracking integrity (P0-3 from earlier)

| Action | primary_for_goal | include_in_conversions_metric | Counting |
|---|---|---|---|
| Registration Form Submit (`7556742210`) | False ✓ | False ✓ | ONE_PER_CLICK |
| CRM Lead (Offline) (`7582974906`) | True ✓ | True ✓ | ONE_PER_CLICK |

**Dedup is holding correctly.** The apparent leak (1 conversion attributed to Registration Form Submit in the 14d window) is pre-demotion data inside the lookback — resolves naturally 2026-06-12.

---

## Mutations executed (7)

| # | Mutation | Reason |
|---|---|---|
| 1 | Pause RSA `811515815500` (Foreclosure Listings v2) | POOR ad-strength, EXCELLENT fallback in same ad group |
| 2 | Pause RSA `811515816679` (City-Specific v2) | POOR ad-strength |
| 3 | Pause ad group `City-Specific` | 0 impressions/14d — failed probation |
| 4 | Add `richmond foreclosure` PHRASE @ $2.50 to Foreclosure Listings | Migrate geo intent from paused City-Specific |
| 5 | Add `surrey foreclosure` PHRASE @ $2.50 to Foreclosure Listings | Same |
| 6 | Add `repossession houses bc` PHRASE @ $2.50 to Foreclosure Listings | Variant intent surfaced in search-term report |
| 7 | Pause Medical Strata campaign (`23714564803`) | ENABLED unexpectedly, $113.92/30d / 0 conv |

## Decisions deferred (per Amir)

- **Budget held at $10/day** — leaves 90% Lost-IS-Budget on the table. Revisit if Amir wants to test acceleration.
- **No geo-overflow negatives** — service area question still open. ~12 search terms reaching Surrey/Burnaby/Langley/North Van; could be deal-rich or off-strategy depending on 88 West's positioning.

---

## Smart Bidding transition — when can we switch from Manual CPC?

| Strategy | Min lifetime conversions | Additional req | Current state |
|---|---|---|---|
| Manual CPC | — | — | current |
| Maximize Clicks | — | bid cap ≤ $18 | n/a (not desired) |
| **Maximize Conversions** | **15** | 14+ days on current strategy | 3 conv, need **12 more** |
| **Target CPA** | **30** | stable CPA (CV < 0.50) | 3 conv, need **27 more** |

At current pace of ~6 conversions/month (3 in 14 days), we hit:
- Maximize Conversions threshold (~15): **late August / early September 2026**
- Target CPA threshold (~30): **late October / November 2026**

Doubling budget to $20/day with 90% Lost-IS-Budget would roughly halve those timelines.

---

## Open follow-ups

1. **`audit.py` REMOVED filter** — patched in this audit. Done.
2. **Court-Ordered Sales ad group** — 11 days old, 0 conversions, 16 impressions. Too thin to judge. Re-check 2026-06-25.
3. **EXACT vs PHRASE for `foreclosure homes for sale`** — PHRASE doing all the work (100 impr, 2 conv); EXACT (14 impr, 0 conv) needs 14 more days.
4. **Desktop conversion gap** — see LP audit doc 2026-06-11-foreclosure-lp-audit.md (separate).
5. **Smart Bidding transition** — defer until 15 lifetime conversions.
6. **Foreclosure deals refresh** — scrape ran 2026-06-11 → 31 fresh listings in `data/foreclosure-deals.scraped.json`. LP-consumed `data/foreclosure-deals.json` still has 9 deals from 2026-05-16. Manual curation needed (no auto-curator yet).
7. **GVR WebAPI provision** — when ready, retire `scrape-foreclosure-deals.mjs`, switch LP data source to GVR-backed Postgres feed.

---

## Next audit checkpoint

**2026-06-25** (2 weeks post-mutation). Watch for:
- Richmond/Surrey/repossession keywords accruing impressions + early conversions
- Court-Ordered Sales conversion break
- Foreclosure Listings IS improvement (POOR RSA paused, Google reallocates auctions to EXCELLENT)
- Desktop CvR — should stay 0% unless LP audit drives a change

*Audit + mutations executed by Claude Code via `manage.py` + direct API. Snapshot of pre-mutation state in audit log; rollback by reversing mutations 1-7.*
