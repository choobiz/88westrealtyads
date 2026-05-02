# Developer Deals LP — Image Sourcing Plan (covers canonical + FTB variant)

**Author:** landing-page-image-sourcer (planning mode)
**Date:** 2026-04-20
**Scope:** Two pages — canonical `/developer-condo-deals-vancouver` + variant `/first-time-buyer-vancouver`
**Status:** Plan only. NO images downloaded or processed. Build phase will execute against this brief.

---

## TL;DR

- **13 total image slots** across both pages (7 canonical + 6 FTB), of which:
  - **5 stock photo slots** (Pexels/Unsplash, free + commercial-licensed)
  - **2–3 AI-generated slots** (hero backgrounds — Flux 2 Pro via imagegen-mcp)
  - **3 custom SVG/illustrated slots** (5-Stage Pyramid, Rebate Stacker, $83K Worked Example waterfall)
  - **2 OG share-card composites** (1200×630, designed in code or Figma → exported PNG)
  - **1 real-photo placeholder** (88West agent headshot — supplied by client; **shared across both pages**)
- **Sourcing strategy:** Free stock first (Pexels + Unsplash), AI-gen for hero where stock can't deliver "Vancouver presale construction + cranes + mountains" specifically, custom SVG for the data-graphic slots. Avoid generic luxury condo and "happy stock couple" imagery.
- **Estimated total cost:** ~$3–$6 (Replicate + imagegen calls for 2 hero gens at $0.04–$0.08 ea, 2–4 retries, 2 OG composites). Stock is free; SVGs are designer hours not cost.
- **Shared assets between the two pages:**
  - Agent headshot (Slot 1.6 == Slot 2.4 — same image, same alt text base)
  - 88 West Realty logo + brokerage badge (footer, hero corner)
  - One Vancouver skyline establishing image MAY be reused as a secondary section background on FTB if needed (to keep visual continuity with canonical)

---

## Canonical page style brief

**Modern Vancouver presale-construction + finished-condo aspiration.** Cranes silhouetted against the North Shore mountains at golden hour. Concord Pacific / Brentwood / Marine Gateway-style glass towers under construction or just topped out. The visual register is "smart deal-finder reading the market correctly" — NOT "VIP exclusive luxury insider." Avoid Coal Harbour penthouse luxury coding, avoid yacht/champagne/marble, avoid suit-and-tie handshake stock. Color tone: cool blues + warm dusk amber. Composition: wide-angle, lots of sky/mountain negative space for hero text, cranes as the visual anchor that says "construction is happening, deals are live, supply is real." Reference texture: the existing `/public/images/medical/hero-exterior.jpg` clean professional flat-lit building photography — same level of polish, swap "medical office" for "condo tower under construction."

## FTB variant style brief

**First-home aspirational — modest scale, inclusive, real.** A young couple or small family (mid-20s to mid-30s, one or both visibly non-white — Vancouver is 50%+ visible-minority; the hero image must reflect that) holding keys outside or just inside a brand-new mid-market Vancouver condo. NOT "luxury new home buyer" coding. Think: Brentwood, Surrey Centre, Marine Gateway — a real first-home neighborhood, not Coal Harbour. The mood is "calm relief + quiet pride," not "champagne celebration." Soft natural light, daytime. Composition: people-as-subject (not skyline-as-subject) for the hero. Reserve Vancouver skyline imagery for one secondary block (final CTA) so the page reads as "human first, city second." Avoid: cardboard moving boxes, "SOLD" sign clichés, dad-thumbs-up-with-keys energy, stock-grade fake-laughing couple.

---

## Page 1: `/developer-condo-deals-vancouver` (canonical, $100K Discount)

### Slot 1.1 — Hero background

- **Block:** 1 (Hero + form)
- **Dimensions:** 1920×1080 desktop / 1200×900 mobile (mobile crop must keep cranes visible at left/right thirds, not center where text sits)
- **Subject:** Vancouver presale construction — 2-4 tower cranes silhouetted against the North Shore mountains at golden hour, with one or two glass condo towers in mid-construction visible. Format optimized for hero text overlay on the left third; cranes anchor the right.
- **Alt text:** `Vancouver downtown skyline showing active condo developments and cranes — Greater Vancouver presale market 2026`
- **Source recommendations (3 ranked candidates):**
  1. **AI-gen via Flux 2 Pro (imagegen-mcp).** Prompt: *"Wide cinematic photograph of Vancouver, BC at golden hour. North Shore mountains in the background. 3 yellow construction tower cranes against the sky. Two modern glass condo towers under construction in the foreground (rebar visible on top floor of one). Cool dusk-blue sky transitioning to warm amber on the horizon. Real, slightly grainy professional architectural photography, NOT renderings. Negative space upper-left for text overlay. Aspect ratio 16:9. Style: Vancouver Concord Pacific, modern presale, Brentwood / Olympic Village area."* Cost: ~$0.05. **Recommended primary** — stock can't reliably deliver "Vancouver + cranes + mountains" composition.
  2. **Stock fallback (Unsplash):** https://unsplash.com/photos/F6FSga8-jlc — "Construction cranes dominate a city skyline" (cranes-against-sky, no Vancouver-specificity but the silhouette works for above-fold use where text covers detail). License: free commercial.
  3. **Stock fallback (Unsplash):** https://unsplash.com/photos/3Ba2T04w0uM — "City skyline with construction cranes and waterfront buildings" (Claudio). Has water + construction + cranes — read-able as Vancouver in a hero treatment with overlay.
- **Notes:** If stock fallback is used, apply a cool-blue color grade in post (sharp.js / CSS filter) and place a subtle dark gradient on the left third to guarantee text contrast. Do NOT use a literal Coal Harbour photo — Concord Pacific Place / Yaletown / Brentwood reads better as "presale market" than "luxury waterfront."

### Slot 1.2 — Live Tracker Preview project tiles

- **Block:** 2 (Live Tracker Preview)
- **Dimensions:** 600×400 each (6-9 tiles in a responsive grid; 3-up desktop / 2-up tablet / 1-up mobile)
- **Subject:** 6-9 generic-but-on-brand modern Vancouver-style condo exteriors. Each must look interchangeable with a real builder marketing image — i.e., a single tower, daytime, clean glass facade, no people, no branding. Tiles will overlay with project name + $-incentive total.
- **Source recommendations:**
  1. **Pexels** — `pexels.com/search/condo` returns dozens of free modern high-rise glass facades. Pull 9 candidates, dedupe by similarity, keep 6 that vary in form (slim tower, podium-and-tower, mid-rise stepped).
  2. **Unsplash** — https://unsplash.com/photos/EwAhsrJD2sk (Jonathan Lim — actual Vancouver, BC modern glass + concrete building. Use this as the FIRST tile to anchor "yes these are real Vancouver buildings.")
  3. **Unsplash** — https://unsplash.com/photos/xCDjhiBn5_w — modern building with repeating geometric balcony patterns. Generic enough to be mistaken for a Brentwood / Marine Gateway tower.
- **Notes:** All 6-9 tiles MUST be color-graded to a unified palette in post (cool blue tone, slight desaturation) so the grid reads as a coherent "Tracker UI" rather than a stock-photo collage. Apply a 16:10 crop for consistency. Each tile gets a $X off + parking + rate buy-down badge on top. Do NOT use builder marketing renders (legal risk + tonal mismatch). Do NOT use any image with visible people.

### Slot 1.3 — 5-Stage Release Pyramid graphic

- **Block:** 3 (sub-section A — "The 5-Stage Developer Release Pyramid")
- **Dimensions:** 800×900 desktop (vertical pyramid) / 600×600 mobile
- **CUSTOM ILLUSTRATION — not stock.** Specify what the build phase should produce:
  - **Recommendation: SVG illustration as a 5-stacked-horizontal-bars pyramid** (NOT a true triangle pyramid — a stepped bar chart reads better on mobile). From bottom (widest) to top (narrowest):
    - **Stage 1: Friends & Family** — bar width 100% — *price baseline A* — color: light gray (rare, not actionable for buyers)
    - **Stage 2: Platinum / VIP Brokers** — bar width 90% — *price ≈ A + $0–$5K* — color: brand primary (88West blue) — annotated "← 88 West Realty operates here"
    - **Stage 3: Public Launch** — bar width 75% — *price ≈ A + $20K–$40K* — color: medium gray
    - **Stage 4: Construction-Period Assignments** — bar width 60% — *price ≈ A + $50K (varies wildly in 2026)* — color: amber (anomaly highlight)
    - **Stage 5: Completion / Standing Inventory** — bar width 45% — *price historically A + $80K, currently flat-to-down* — color: amber
  - Each bar has the $-savings label inline, plus a tiny icon (handshake / podium / building / contract / completed-tower).
  - Rendered as inline SVG in the React component for crisp scaling + accessibility (ARIA `role="img"`, descriptive label).
- **Build options:** (a) Hand-build SVG in code (cleanest, ~1hr designer time), (b) Build in Figma → export SVG, (c) AI-gen via GPT Image 1 (`mcp__imagegen__image_generate_openai`) is NOT recommended — data graphics are where AI image gen consistently fails (mislabeled axes, wrong proportions, distorted text). **Go with option (a) or (b).**
- **Alt text:** `5-stage Vancouver developer release pyramid showing pricing progression from Friends & Family through Standing Inventory — Platinum Broker stage saves buyers $50K-$150K vs. public launch`

### Slot 1.4 — Decoding Developer Language section

- **Block:** 3 (sub-section B — "Decoding Developer Language: 12 Phrases Builders Use vs. What They Actually Mean")
- **No primary hero image.** This is a content-table block; an image would compete with the table for attention.
- **Recommendation:** Single small decorative SVG icon at the section header — a stylized "translation" icon (two speech bubbles with an arrow between them, OR a magnifying glass over a brochure). Inline SVG, ~80×80px, brand-blue stroke, no fill. Not load-bearing visually.
- **OR:** Replace icon with a small annotated brochure mockup graphic (red-pen markup over marketing copy) — would require AI gen via GPT Image 1. Cost ~$0.04. **Recommend skipping unless the build phase has spare time** — the table itself is the content; an image adds noise.

### Slot 1.5 — Investor / Owner-Occupier / FTB split

- **Block:** 4 (Audience split — 3 columns)
- **Dimensions:** 600×600 each (square crops, 3-up desktop / stacked mobile)
- **Subject:** 3 small lifestyle shots, one per audience column. Vancouver-shot or Vancouver-readable, diverse, not stocky.
  - **(a) Investor:** Person at a clean modern desk reviewing a spreadsheet/laptop showing rental yield numbers. NOT a suit. Casual smart-casual, mid-30s. Could be any ethnicity.
  - **(b) Owner-occupier:** Couple in their late-20s to mid-30s touring a finished modern condo suite — looking out a window at a Vancouver-readable view. Daytime, soft natural light.
  - **(c) First-time buyer:** Young person (mid-20s to early-30s) signing a contract or holding a folder, with subtle "first home" energy — could be solo or with a partner. Same diversity expectation as FTB hero.
- **Source recommendations:**
  - **(a) Investor:** Pexels — `pexels.com/search/laptop spreadsheet home office` — many free candidates. Pick one with a real-looking spreadsheet on screen, modern interior. Avoid stock-suit-pointing-at-screen.
  - **(b) Owner-occupier:** Pexels — `pexels.com/search/couple condo apartment view` or Unsplash https://unsplash.com/photos/QKQv1cyIrbo (couple receiving keys from agent — could repurpose as "touring suite" with crop). Vary from FTB hero so the page doesn't feel repetitive.
  - **(c) First-time buyer:** REUSE a tighter crop of the FTB page hero (Slot 2.1) — visual continuity reinforces the cross-link.
- **Notes:** All 3 must be color-graded to match Slot 1.1 hero tone. Aspect ratio 1:1 for grid consistency. The FTB column tile gets a clickable overlay linking to `/first-time-buyer-vancouver` — design it with a subtle "→ $43K Head Start" badge.
- **Alt text (per spec):** (a) `Vancouver condo investor reviewing rental yield analysis on laptop`, (b) `Owner-occupier couple touring brand-new Vancouver presale condo suite`, (c) `First-time buyer signing presale contract with $43K rebate stack — 88 West Realty`

### Slot 1.6 — Trust section agent face

- **Block:** 5 (Trust + final CTA)
- **Dimensions:** 600×600 (square; will appear ~400×400 desktop, ~280×280 mobile)
- **PLACEHOLDER — real photo to be supplied by 88 West.** Build phase ships with a placeholder (recommend: simple branded grey square with "Agent photo coming soon" text in 88West blue) until the real headshot arrives.
- **Spec for real photo (give to 88West):** Single agent, eye contact with camera, professional but warm (smile not required, but no scowling), neutral background OR a soft-blurred Vancouver context (downtown / mountains), natural light or professional softbox, current within 12 months, business-casual (NOT a suit-and-tie 1990s realtor headshot). Format: square crop, 1200×1200 source, delivered as JPG.
- **Alt text:** `[Agent name], Buyer-Side Agent at 88 West Realty, licensed BC brokerage`
- **Cross-page reuse:** This is the SAME image used on FTB page (Slot 2.4). Single agent face on both pages reinforces the "single broker, dual offer" positioning.

### Slot 1.7 — Open Graph share image

- **Dimensions:** 1200×630 (Facebook + LinkedIn + Twitter Card spec)
- **Composition:** Vancouver skyline left half + bold "$100K Off" stacked numbers right half + 88 West Realty logo bottom right + tagline "Developer Incentive Tracker" in small caps under the dollar number.
- **Build approach:** Compose in code or Figma (NOT AI gen — text rendering in AI image gen is unreliable for $-numbers). Use a cropped version of Slot 1.1 hero as the left-half background; overlay text with a clean sans-serif (matches site font stack); export PNG at 1200×630.
- **Alt text (and og:image:alt):** `$100K off Vancouver condos — Developer Incentive Tracker by 88 West Realty`
- **Notes:** White-background variant also produced (1200×630, white bg + colored text + logo) for SERP image-pack pickup per SEO blueprint recommendation. Both variants saved as `/og/developer-condo-deals-vancouver.jpg` (dark) and `/og/developer-condo-deals-vancouver-light.jpg`.

---

## Page 2: `/first-time-buyer-vancouver` (FTB variant, $43K Head Start)

### Slot 2.1 — Hero background

- **Block:** 1 (Hero + form)
- **Dimensions:** 1920×1080 desktop / 1200×900 mobile (people-subject crop must work on mobile — face/keys must be in upper third; form sits below)
- **Subject:** Aspirational first-home moment. Couple or small family (mid-20s to mid-30s, visibly diverse — at least one non-white person) just inside a modern starter Vancouver condo, holding new keys, soft natural daytime light through a window, modest scale (NOT a luxury penthouse). Calm relief energy, not over-celebratory.
- **Alt text:** `First-time buyers receiving keys to new Vancouver condo with $43K rebate stack — 88 West Realty`
- **Source recommendations (3 ranked candidates):**
  1. **Unsplash** — https://unsplash.com/photos/OcA7kiGmfew — *"Overjoyed African American married couple showing keys of their new apartment."* Diverse, real-feeling, keys-in-frame. License: free commercial. **Top pick** — checks the diversity + first-home + keys boxes without screaming stock.
  2. **Unsplash** — https://unsplash.com/photos/QKQv1cyIrbo — couple receiving keys from real estate agent. Diverse-ish, slightly more posed. Backup if #1 doesn't crop well.
  3. **AI-gen via Flux 2 Pro.** Prompt: *"Photorealistic portrait of a young mixed-race couple in their late 20s, standing just inside a brand new modern Vancouver mid-rise condo, holding silver keys, soft natural daytime light from a balcony window with a partial Vancouver mid-rise neighborhood view (NOT downtown skyline, NOT luxury), warm relieved expression (not over-celebrating), woman holds keys at chest height, man stands slightly behind smiling. Modern minimalist condo interior, light wood floors, white walls, no furniture (just-moved-in feel). Aspect ratio 16:9. Style: candid editorial, NOT stock photography."* Cost ~$0.05. Use as fallback or if stock can't deliver the right mid-market scale.
- **Notes:** Apply a slight warm color grade (vs. canonical's cool blue) to differentiate the two pages tonally. Crop should keep the keys visible on mobile. Avoid any image where the couple looks under 25 (regulatory + tone — some FTB rebates have 19+ rules but the audience reads more "settled professionals" than "students"). Avoid kitchen/cardboard-boxes clichés.

### Slot 2.2 — Rebate Stacker section

- **Block:** 2 (How to Layer Each Rebate)
- **Dimensions:** 800×900 desktop / 600×700 mobile
- **CUSTOM GRAPHIC — illustrative stacking of 5 rebates.**
- **Recommendation: SVG illustration as 5 stacked horizontal blocks** (similar visual logic to Slot 1.3 pyramid but stacking-up rather than narrowing-up). From bottom to top:
  - **Federal GST Rebate** — up to $50K — color: brand-blue
  - **BC PTT Exemption** — up to $8K — color: brand-blue (lighter shade)
  - **FHSA Tax Deduction Value** — ~$10K-$15K (back-of-envelope based on $40K contribution × marginal rate) — color: brand-blue (lighter)
  - **RRSP HBP** — $60K (loan, not rebate; visualize differently — outline-only block) — color: gray outline
  - **Developer Incentives stacked on top** — up to $40K — color: amber (the "and-then-developer-adds-this" reveal)
- Total label at top: **"Up to $83K stacked"** in large brand-primary numerals.
- **Build options:** SVG in code OR Figma export. Same logic as Pyramid — AI-gen unreliable for data graphics. **Go custom.**
- **Alt text:** `BC first-time buyer rebate stack: GST rebate + PTT exemption + FHSA + RRSP HBP totaling up to $43,000 from government, plus up to $40,000 in developer incentives`

### Slot 2.3 — Worked Example section ($83K Stack Math)

- **Block:** 2 sub-section / Block 3
- **Dimensions:** 1000×600 desktop / 600×800 mobile (waterfall chart works horizontally on desktop, vertically on mobile)
- **CUSTOM GRAPHIC — waterfall chart showing $700K → $617K math.**
- **Recommendation: SVG waterfall chart** with 5 descending steps from $700K to $617K:
  - Start: **$700K** (Vancouver new condo list price) — full-height brand-blue bar
  - −$35K **Federal GST Rebate** — descending step, amber stripe
  - −$8K **BC PTT Exemption** — descending step, amber stripe
  - (assumes FHSA + HBP used as down-payment financing, not direct $-off; show as a side-note callout)
  - −$40K **Developer Incentives** (cash credit + free parking + rate buy-down equivalent) — descending step, amber stripe
  - End: **$617K** (effective acquisition cost) — full-height brand-blue bar — labeled "Net cost"
- **Numbers must be defensible** — match the SEO blueprint's H2 #3 ("$83K Total Stack: A Worked Example on a $700K Vancouver Condo"). The $43K government + $40K developer = $83K total maps cleanly to the $700K → $617K delta.
- **Build options:** SVG in code or Figma export. Same logic — AI-gen unreliable.
- **Alt text:** `$700K Vancouver condo reduced to $617K through layered first-time buyer rebates and developer incentives — $43K government plus $40K developer equals $83K stacked savings`

### Slot 2.4 — Trust section agent face (SHARED with Page 1)

- **Block:** 6 (How 88 West Realty Helps)
- **Dimensions:** Same as Slot 1.6 (600×600 source)
- **CONFIRMED SHARED.** Same JPG file. Reinforces "one broker, dual offer" positioning. Alt text varies per page context:
  - Canonical alt: `[Agent name], Buyer-Side Agent at 88 West Realty, licensed BC brokerage`
  - FTB alt: `[Agent name], Buyer-Side Agent at 88 West Realty — first-time buyer specialist`
- **Build phase note:** Single source file at `/public/images/agent/agent-headshot.jpg`, referenced from both pages.

### Slot 2.5 — Open Graph share image

- **Dimensions:** 1200×630
- **Composition:** Left half — keys-in-hand photo (cropped from Slot 2.1 hero) OR a soft Vancouver mid-rise skyline. Right half — bold "$43,000 Head Start" stacked numerals + tagline "First-Time Buyer Stack — 88 West Realty" + logo bottom right.
- **Build approach:** Same as canonical OG (compose in code/Figma, export PNG). Save as `/og/first-time-buyer-vancouver.jpg`.
- **Alt text (og:image:alt):** `$43,000 first-time buyer rebate stack — Vancouver new condos — 88 West Realty`

### Slot 2.6 — Final CTA section background (optional)

- **Block:** 8 (Get the Guide + Tracker — final CTA)
- **Dimensions:** 1920×600 (banner strip)
- **Subject:** Subtle Vancouver skyline at sunrise (per SEO blueprint Image #6: "starting somewhere new"). Used as a faded background for the final form repeat.
- **Source recommendations:**
  1. Reuse a brightened/warm-graded crop of Slot 1.1 canonical hero (visual continuity between the two pages)
  2. **Unsplash** — Vancouver sunrise / golden-hour skyline searches; pick something cleaner than Slot 1.1 (no cranes — this is the "future, ownership" half of the page)
- **Notes:** Ship with low opacity (20-30%) under the form section so it reads as a tonal background, not a competing image.
- **Alt text:** `New Vancouver condo skyline at sunrise — first-time buyers entering the market in 2026`

---

## Decision matrix (stock vs. AI gen vs. custom)

| Slot | Page | Source | Why |
|---|---|---|---|
| 1.1 Hero bg | Canonical | **AI-gen (Flux 2 Pro)** + stock fallback | Vancouver + cranes + mountains is too specific for reliable stock |
| 1.2 Tracker tiles ×6-9 | Canonical | **Free stock (Pexels + Unsplash)** | Generic condo exteriors are abundant in stock; cost + speed wins |
| 1.3 5-Stage Pyramid | Canonical | **Custom SVG** | Data graphic — AI gen distorts text/proportions |
| 1.4 Decoding section icon | Canonical | **Custom SVG (small)** | Decorative only; skip if time-constrained |
| 1.5 Audience split ×3 | Canonical | **Free stock (Pexels)** | Lifestyle stock is good enough; needs careful curation for diversity + non-stocky energy |
| 1.6 Agent headshot | Canonical | **Real photo from 88West** | Trust signal — must be authentic |
| 1.7 OG share image | Canonical | **Custom composite (code/Figma)** | Text rendering reliability + brand control |
| 2.1 FTB Hero | FTB | **Free stock (Unsplash) primary, AI-gen fallback** | Strong stock candidate (OcA7kiGmfew) exists; AI as backup if it doesn't crop |
| 2.2 Rebate Stacker | FTB | **Custom SVG** | Data graphic |
| 2.3 Worked Example waterfall | FTB | **Custom SVG** | Data graphic with specific $-numbers |
| 2.4 Agent headshot | FTB | **SHARED with 1.6** | Single broker positioning |
| 2.5 OG share image | FTB | **Custom composite** | Text rendering + brand |
| 2.6 Final CTA bg (optional) | FTB | **Stock or reuse 1.1 crop** | Background-only, low-opacity |

**Total cost estimate:**
- Stock photos: $0
- AI gen (1-2 hero attempts × 2 retries each): ~$0.20-$0.40
- OG composites: $0 (build-time render)
- Custom SVGs: 0 dollar cost, ~3-4hrs designer time across 3 graphics
- **Cash cost: ~$0.50–$2.00.** Time cost: ~4-6 designer/dev hours.

---

## Anti-patterns the build must avoid

- **No "luxury condo" stock-feeling imagery.** The audience is mid-market Vancouver presale buyers, not Coal Harbour penthouse. No marble, no champagne, no infinity-pool views.
- **No "VIP" / "exclusive" / "luxury" visual coding.** Velvet ropes, gold accents, "members-only" lockup graphics — all forbidden. The brand promise is buyer-side advocacy, not insider-priesthood.
- **No "happy young couple" stock that screams stock.** If they're showing teeth and looking off-camera at a laptop together, it's wrong. Pick candid-feeling, diverse, real.
- **No stereotypical first-time-buyer imagery.** No cardboard moving boxes. No "SOLD" lawn signs. No couple smiling at house keys held above heads. No "first home" hand-painted welcome mat.
- **No "$$$" cash imagery.** No piles of bills, no money-falling-from-sky, no jackpot energy. Feels predatory and tacky. Numbers go in the SVG charts, not in piles-of-cash photos.
- **No people in suits doing handshakes.** Banned across both pages. The agent face shot is warm professional, not transactional.
- **No builder marketing renderings.** Legal risk + tonal mismatch. Use real photography or AI-gen photography style, never CG building renders.
- **No outdated Vancouver skyline photos.** Skyline must be post-2024 (Brentwood + Marine Gateway visible). Avoid old Coal Harbour or pre-2020 stock.
- **No image with visible developer/builder branding.** Legal risk. Tracker-tile images especially — strip or blur any visible brand.
- **No AI-gen with visible artifacts.** Flux 2 Pro can produce 6-finger hands, melted faces, or impossible architecture. Inspect every gen at 100% before approving.

---

## Open questions for 88 West / build phase

1. **Real agent headshot:** Who is the "single agent face" for both pages? Need a current (within 12 mo) photo, square crop, neutral background or soft Vancouver context. Until supplied, ship with a branded placeholder. **Confirm: same agent on both pages, or different agent for FTB segment?** (Recommendation: same — reinforces single-broker positioning.)
2. **AI hero gen vs. stock for canonical:** Are we OK paying ~$0.20 for AI-gen on the canonical hero (Slot 1.1) to get Vancouver + cranes + mountains specifically, or use a generic-cranes-skyline stock fallback? (Recommendation: AI-gen — the specificity matters for the "5,458 unsold condos in Greater Vancouver" proof framing.)
3. **Custom SVG graphics — designer or in-code?** Three custom SVGs needed (5-Stage Pyramid, Rebate Stacker, $83K Waterfall). Options: (a) hand-code SVGs in React (~3hrs dev time, cleanest), (b) build in Figma → export SVG (~2hrs designer time, easiest to iterate), (c) Lucidchart-export (not recommended — Lucidchart SVG is messy). **Default to (a) unless designer is queued for Figma work.**
4. **Tracker tile data overlay:** Each Tracker preview tile (Slot 1.2) needs a $-incentive total + bullet list overlay. Is this a build-time static badge, or a runtime CMS-driven render from a real Tracker feed? (Per phase2-synthesis §5, the Tracker may launch with placeholder data — confirm whether tile overlays are dynamic or hard-coded for V1.)
5. **OG share image fonts:** Brand stack (per existing /medical-strata pattern) is what — Inter? Sora? Confirm font for OG image text rendering so it matches site type voice.

---

## Build sequencing recommendation

1. **Day 0 (planning — DONE):** This document.
2. **Day 1:** AI-gen hero for canonical (Slot 1.1) — generate 4 candidates at $0.05 ea, pick best. Pull stock candidates for 1.2, 1.5, 2.1, 2.6 — curate, color-grade, export at sized dimensions.
3. **Day 2:** Custom SVGs (1.3, 2.2, 2.3) — build in code, ship inline in the React component for accessibility.
4. **Day 3:** OG composites (1.7, 2.5) — build at 1200×630, ship as PNG.
5. **Day 4:** Insert agent placeholder. Ping 88West for real headshot delivery.
6. **Day 5:** QA — alt text on every `<img>`, AVIF/WebP conversion via sharp.js, hero <200KB target, Lighthouse CWV check.

---

**End of plan. Approval gate: confirm open questions 1-3 before build sequencing starts.**
