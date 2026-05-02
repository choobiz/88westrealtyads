# Foreclosure LP — Image Sourcing Plan

**Page slug:** `go.88westrealty.com/foreclosure-deals-vancouver`
**Companion docs:** [`seo-blueprint-foreclosure.md`](./seo-blueprint-foreclosure.md) §Image Strategy, [`phase2-synthesis-foreclosure-and-developer-deals.md`](./phase2-synthesis-foreclosure-and-developer-deals.md) §1
**Author:** Phase 4 image-planning agent
**Date:** 2026-04-20
**Status:** Plan only — no images downloaded or processed. Build phase handles actual sourcing.

---

## TL;DR

- **8 image slots** (7 page slots + 1 OG image variant). 5 are stock-sourceable, 2 prefer AI generation, 1 is brokerage-supplied.
- **Sourcing strategy:** Pexels first (Vancouver-specific imagery is strong there), Unsplash second for lifestyle/keys shots, Wikimedia Commons for BC Supreme Court exterior, Replicate Flux 2 Pro / GPT Image 1 for the inventory-preview placeholder card and any Vancouver-specific shot stock can't deliver.
- **Estimated total cost:** $0 stock + ~$0.20–$0.60 AI gen (max 2 Flux 2 Pro renders at ~$0.10/each plus optional Real-ESRGAN upscale at ~$0.01/each). Brokerage-supplied agent headshot is no-cost but blocks launch if not delivered.
- **Build-phase delivery format:**
  - WebP primary, AVIF fallback where Next/Image supports it
  - 2 sizes per slot (desktop @ 1920w or slot-native, mobile @ 768w)
  - Hero LCP target ≤200 KB after compression; total page image weight <600 KB
  - All `<Image>` components from Next/Image; `priority` only on hero
  - Alt text per slot below — verbatim, no rewrite

---

## Style brief (3–5 sentences)

Tasteful, professional, trustworthy — Vancouver as a city that smart people invest in confidently, not a doom-scape of distressed homes. Wide aerial geographic establishing shots (skyline + water + North Shore mountains) for hero; bright, daylight, modern; deeply saturated blues and golds, never grey or moody. Lifestyle shots featuring buyers should look age 30–50, ethnically diverse, neutral business-casual to casual — never suit-and-handshake, never "wealthy investor in penthouse," never anyone visibly distressed. Anti-vibe: courtroom interiors, gavels, "FORECLOSURE" red banners, broken windows, empty foreclosed-home interiors, predatory close-ups of legal documents, stock-art "investor" tropes (cigar, Lambo, suit-handshake).

Reference: see existing `/public/images/medical/hero-exterior.jpg` — that level of clean, daylight, architectural professionalism is the bar. Editorial real-estate-magazine vibe, not advertising-stock-art vibe.

---

## Image slots

### Slot 1 — Hero background (Block 1)

- **Block:** 1 — Hero + Form
- **Dimensions:** 1920×1080 desktop, 1200×900 mobile (text overlay composed in code, NOT baked in)
- **Subject:** Greater Vancouver skyline, aerial/elevated angle, daytime or golden hour. Must include water (Burrard Inlet or False Creek) AND visible North Shore mountains. Stanley Park edge or downtown towers acceptable as foreground. NO Canada Place flag focus (over-used). Wide horizontal composition with quiet sky region top-left for headline overlay.
- **Mood:** Established, prosperous, calm, geographic. "This is the market we work in" — not "this is what foreclosure looks like."
- **Alt text:** `Greater Vancouver skyline at golden hour — downtown towers, Burrard Inlet, and North Shore mountains.`
- **Source recommendations (ranked):**
  1. Pexels search `vancouver skyline aerial` — multiple strong free options. Top picks based on Tavily results: search returns 10+ free aerial Vancouver shots with mountains + water. Build agent should pick the one with the cleanest top-left negative space for headline overlay. https://www.pexels.com/search/vancouver%20city/ — confirm Pexels License (free commercial, no attribution required).
  2. Unsplash search `vancouver skyline` — https://unsplash.com/s/photos/vancouver-skyline — strong alternates. Avoid Getty-watermarked entries (Unsplash+ requires license). Photographers with native Vancouver portfolios: Aditya Chinchure, Adrian Yu, Mike Benna.
  3. AI gen fallback (only if both stock options fail composition test): Flux 2 Pro prompt — `"Aerial photograph of Vancouver British Columbia skyline at golden hour, downtown glass towers in midground, Burrard Inlet water in foreground, snow-dusted North Shore mountains in background, clean blue sky with quiet negative space top-left for text overlay, photorealistic editorial real-estate-magazine style, high resolution, no people, no text, no logos"`. Cost ~$0.10. Risk: synthetic skylines look generic; only fall back if stock search comes up dry.
- **Notes:** Hero must work as a backdrop with white text overlay (form sits to the right on desktop, full-width below on mobile). Build agent should test the chosen image with the actual H1 + form mock before final selection. Consider a dark linear gradient overlay (left → right, 0% → 40% black) on desktop to guarantee text legibility. LCP target: ≤200 KB compressed.

---

### Slot 2 — Live Inventory Preview placeholder card (Block 2)

- **Block:** 2 — Live Inventory Preview
- **Dimensions:** 800×600 per card, 4:3 ratio. Need 4–6 distinct images cycled across the 6–12 sample listings (reuse acceptable).
- **Subject:** Clean, neutral Greater Vancouver residential exteriors — modest detached homes, low-rise condo/townhouse exteriors, east-side Vancouver style. NO luxury, NO distressed, NO interiors. Daytime, no people. Each property card image is a placeholder/illustrative — not the actual listed property.
- **Mood:** Ordinary, livable, "this is a real Vancouver street." NOT aspirational, NOT depressing.
- **Alt text:** `Sample Greater Vancouver residential exterior — illustrative court-ordered listing placeholder.` (vary per card with city name: `…North Vancouver residential exterior…`, `…Burnaby townhouse exterior…`, etc.)
- **Source recommendations (ranked):**
  1. Pexels: search `vancouver house`, `north vancouver home`, `bc home exterior`, `burnaby house`. Strong free results. https://www.pexels.com/search/vancouver%20house/
  2. Unsplash: search `vancouver house exterior` — https://unsplash.com/s/photos/vancouver-house — fewer Vancouver-specific results, but North American suburban exteriors work as a fallback.
  3. AI gen (recommended for 2–3 of the 4–6 cards if stock looks too "Toronto-y" or too "California-y"): Flux 2 Pro prompt — `"Photograph of a modest two-story detached home in East Vancouver, BC — wood and stucco exterior, small front yard with cedars, overcast PNW daylight, residential street, no people, no street signs, no text, no for-sale signage, photorealistic real-estate-listing style"`. Cost ~$0.10/image; budget 2–3 generations. Vary the prompt for each: replace "East Vancouver" with "North Vancouver craftsman home", "Burnaby townhouse complex exterior", "Richmond mid-century rancher".
- **Notes:** Each card MUST display the standard caveat overlay: "Sample data — full list emailed to subscribers" (handled by component, not baked into image). Build phase should use the same 4–6 image library for any future updates rather than sourcing per-listing — these are placeholders for visual rhythm, not property accuracy. If/when a real MLS feed lights up, swap to real listing photos with proper licensing.

---

### Slot 3 — Educational explainer illustrative (Block 3)

- **Block:** 3 — How BC court-ordered sales actually work
- **Dimensions:** 1200×800 desktop, 600×400 mobile. Optional — block can also work with no image (typographic-only with anchor link cards).
- **Subject:** BC Supreme Court building exterior, daytime, Robson Street facade. Architectural / civic / professional. NOT interior courtroom. NOT gavels. NOT Lady Justice statues. Alternative: Vancouver Law Courts building (Arthur Erickson, 800 Smithe) — the modernist green-glass terraced structure is iconic and visually distinctive without feeling grim.
- **Mood:** Civic, transparent, "this is a real public process" — reinforces the "court-supervised, title is clear" educational message.
- **Alt text:** `Vancouver Law Courts building — where every BC court-ordered sale is approved by the BC Supreme Court.`
- **Source recommendations (ranked):**
  1. Wikimedia Commons: search `Vancouver Law Courts` — multiple CC-BY-SA images of the Erickson building. Best candidates have permissive commercial licenses. https://commons.wikimedia.org/wiki/Category:Law_Courts_(Vancouver) — verify license per image, attribute in footer.
  2. Pexels/Unsplash: search `vancouver courthouse` — sparse results; most are interior shots. May not yield usable hits.
  3. AI gen fallback: Flux 2 Pro prompt — `"Photograph of a modernist terraced glass courthouse building exterior in downtown Vancouver, daytime, civic architecture, sloped green-tinted glass roof, concrete columns, no people in frame, no text or signage, editorial architectural photography style"`. Cost ~$0.10. Risk: the Erickson building is so distinctive that a synthetic version may look uncannily wrong; prefer Wikimedia.
- **Notes:** Judgment call — this slot is OPTIONAL. If the educational block reads better as pure typography with citation footnotes (CMHC, BC Supreme Court rules), skip the image entirely and reduce page weight. Recommend skipping on first build, A/B test adding it later.

---

### Slot 4 — Investor column lifestyle (Block 4, left/top)

- **Block:** 4 — For Investors / For Owner-Occupiers split
- **Dimensions:** 800×600, 4:3. Mobile crop: 600×450.
- **Subject:** Single person, age 35–50, gender-neutral framing, reviewing a tablet or laptop at a clean desk with charts/spreadsheets visible (not specifically). Casual professional dress, daytime light. No suit-and-tie, no handshake, no "predator" close-up. Could be at home office or modern co-working space — NOT a Wall Street trading floor.
- **Mood:** Calm, analytical, doing their homework. "I'm running the numbers" — not "I'm closing a deal."
- **Alt text:** `Investor reviewing court-ordered sale ROI math on a tablet — running the numbers before bidding.`
- **Source recommendations (ranked):**
  1. Pexels: https://www.pexels.com/search/investor/ + https://www.pexels.com/search/financial%20professional/ — many free options. Filter for: solo subject, daylight, no suit, no obvious "stock-broker" stereotype. Top candidate descriptors from Tavily: "Business professional analyzing financial data on a laptop for strategic decision making", "Bald man with beard reviews financial charts on a tablet in office".
  2. Unsplash: search `tablet financial review` — https://unsplash.com/s/photos/tablet-financial-review — solid alternates with cleaner editorial framing.
  3. AI gen fallback (only if stock feels too "stock-art"): Flux 2 Pro prompt — `"Mid-30s person of South Asian descent in casual sweater reviewing a tablet at a clean wood desk, soft natural window light, real estate spreadsheets faintly visible on tablet screen, editorial photojournalism style, no logos, no text overlay, no suit"`. Cost ~$0.10.
- **Notes:** Must NOT visually pair as "white couple = owner-occupier / white single male = investor." If Slot 5 (owner-occupier) is a Caucasian couple, this Slot 4 must be a different demographic. Image-pair representational diversity is non-negotiable.

---

### Slot 5 — Owner-occupier column lifestyle (Block 4, right/bottom)

- **Block:** 4 — For Investors / For Owner-Occupiers split
- **Dimensions:** 800×600, 4:3. Mobile crop: 600×450.
- **Subject:** Couple or small family, ethnically diverse, age 28–45, mid-action moment of receiving keys / unpacking / standing on front porch of a home. Daylight, modern but not luxury home. Genuine candid feel — NOT staged "look at camera holding sold sign" cliché.
- **Mood:** Settled, relieved, beginning. "We finally got the keys." Owner-occupier first-time-buyer warmth.
- **Alt text:** `First-time buyers receiving keys to their new Greater Vancouver home — the owner-occupier path through court-ordered sales.`
- **Source recommendations (ranked):**
  1. Pexels: https://www.pexels.com/photo/content-diverse-couple-moving-into-new-house-4246034 — explicitly diverse couple, moving-in scene, natural light. Strong primary candidate.
  2. Unsplash: https://unsplash.com/photos/a-happy-young-couple-buying-their-new-home-and-receiving-keys-from-real-estate-agent-i1gRNqPHpiw — Getty Images via Unsplash+ (verify license — Unsplash+ is paid). Skip if license blocks free commercial use; use only if 88West has Unsplash+.
  3. Free Unsplash alternates: search `new home keys couple` — https://unsplash.com/s/photos/new-home-keys — multiple non-Unsplash+ free options exist; build agent picks one matching diversity + composition spec.
- **Notes:** Avoid "real estate agent in suit handing keys" framing — that's the lender-pitch competitor cliché we're differentiating from. Prefer keys-in-hand, walking-into-home, or unpacking-boxes framing where the buyer is the protagonist, not the agent.

---

### Slot 6 — Agent face headshot (Block 5, Trust)

- **Block:** 5 — Trust + final CTA
- **Dimensions:** 600×600 (square crop, will display as circle at 240×240 on desktop, 160×160 on mobile)
- **Subject:** Real designated 88 West Realty foreclosure specialist. Professional headshot, neutral background, daylight or studio light, friendly direct gaze. Business-casual.
- **Mood:** Approachable, expert, real human. The opposite of "anonymous lead-form-bot."
- **Alt text:** `[Agent name], 88 West Realty buyer-side foreclosure specialist — RECBC license #[number].` (build agent fills in actual name + license once 88West provides.)
- **Source recommendations:**
  1. **88West-supplied real photo — REQUIRED.** Anonymous LPs underconvert. This slot blocks launch if not delivered.
  2. Placeholder while waiting: a generic neutral-gray silhouette + name caption. Do NOT use a stock photo as a "stand-in agent" — it's deceptive and a known compliance issue.
- **Notes:** Build phase must NOT ship the page live with a stock-photo agent. If the real headshot isn't ready, ship with a no-photo Trust block (initial + name only) and add the image post-launch. Flag this as a launch blocker in the build runbook.

---

### Slot 7 — Brokerage badge / 88 West Realty logo

- **Block:** 5 — Trust + final CTA, Footer
- **Dimensions:** 240×80 (logo lockup), SVG preferred for crispness, fall back to PNG with transparent bg
- **Subject:** Official 88 West Realty wordmark / lockup
- **Alt text:** `88 West Realty logo`
- **Source:** Existing `88westrealtyads` repo — check `/public/images/` and `/public/logos/` for existing campaign assets. The medical-strata page already ships brand assets at `/public/images/medical/apex-medical-realty-white.png` (unrelated brand) — confirm the 88West logo is at `/public/images/brand/88west-logo.svg` or similar. Build agent checks repo before sourcing.
- **Notes:** Also need: RECBC official badge (download from RECBC corporate brand kit), MLS reciprocity badge (per RECBC + REBGV brand kits), and the "We don't represent banks; only buyers" trust badge — the last one is custom, build agent designs as inline SVG.

---

### Slot 8 — Open Graph share image (1200×630)

- **Block:** Meta tags only (not on-page)
- **Dimensions:** 1200×630 OG (Facebook/LinkedIn/general), 1200×675 Twitter card. Must compose with text overlay.
- **Subject:** Branded composite — Vancouver skyline backdrop (hero crop reused, dimmed 30%) + 88 West Realty wordmark top-left + bold headline center: "Greater Vancouver Foreclosure Sheet" + sub: "Updated every business morning. Free."
- **Alt text (in OG metadata):** `88 West Realty — Greater Vancouver Foreclosure Sheet, updated every business morning.`
- **Source recommendations:**
  1. **Composite at build time** from Slot 1 hero image + brand assets. Sharp.js or Figma export. Build agent generates two variants (1200×630 OG, 1200×675 Twitter) from a single Figma layered file. Cost: $0.
  2. AI gen alternative: Flux 2 Pro composite prompt — discouraged. The text overlay is critical and AI image gen handles small text poorly. Composite at build time.
- **Notes:** Reference existing `/medical-office-for-sale-north-vancouver` OG image at `/public/og/` if present — copy that template's layout, swap branding/headline. Twitter Card validator + Facebook Sharing Debugger must both pass before launch (per SEO blueprint pre-launch checklist item #7).

---

## Decision matrix — stock vs. AI gen

| Slot | Stock viable? | AI fallback? | Recommendation |
|---|---|---|---|
| 1 — Hero (Vancouver skyline) | **Yes — strong** | Yes (low priority) | Pexels first. Vancouver-specific real photography is plentiful and free. AI gen only if no Pexels image clears the negative-space-for-overlay test. |
| 2 — Inventory cards (4–6 home exteriors) | Partial — generic Pacific NW stock works, true "East Van street" is thin | **Yes — recommended** for 2–3 of the 4–6 cards | Hybrid: 2–3 stock + 2–3 Flux 2 Pro generations to ensure regional authenticity. |
| 3 — Courthouse / civic explainer | Wikimedia partial; Pexels/Unsplash thin | Yes (medium risk) | Wikimedia first (Vancouver Law Courts CC photos exist). Or skip slot entirely — block reads fine without image. |
| 4 — Investor lifestyle | **Yes — strong** | Yes (only if stock looks too cliché) | Pexels first. Plenty of analytical-tablet-review options. |
| 5 — Owner-occupier lifestyle | **Yes — strong** | No needed | Pexels primary. Pexels' "diverse couple moving into new house" (ID 4246034) is a near-perfect match. |
| 6 — Agent headshot | **No — must be real** | No | 88West-supplied. Launch-blocker if missing. |
| 7 — Logo / brokerage badge | Internal asset | No | Pull from existing repo. |
| 8 — OG image | Build-time composite | No | Sharp.js / Figma layered composite from Slot 1 + brand. |

**Total AI generation budget:** 0–5 Flux 2 Pro renders × ~$0.10 = $0–$0.50. Plus optional Real-ESRGAN upscale on hero stock if resolution is borderline (~$0.01).

---

## Anti-patterns the build must avoid

- **No gavel imagery.** Period.
- **No "FORECLOSURE" red banner overlays** on real-estate photography.
- **No distressed-home interiors** — broken windows, peeling paint, empty rooms with eviction notices, mattress-on-floor implications.
- **No "save big!" / "huge discount!" stock graphics** with starbursts, slashed prices, or red SALE typography.
- **No stereotypical "investor in suit shaking hands with realtor"** stock-art handshake imagery — that's the lender-pitch competitor cliché.
- **No predatory framing** — no images implying "buy when others lose." Buyer is always the protagonist, never the displaced owner.
- **No courtroom interiors / Lady Justice / scales** — civic exterior architecture only if courthouse imagery is used at all.
- **No "luxury aspirational"** infinity-pool, penthouse-skyline-from-inside, Lambo-in-driveway tropes. Owner-occupier audience converts on relatable, not aspirational.
- **No images with visible logos, brand names, MLS-listing watermarks, or for-sale signage** — both legal liability and visual clutter.
- **No baked-in text overlays** in the source images. Headlines/CTAs are HTML/CSS only — preserves localization and component reuse.
- **No demographic homogeneity** across Slots 4 + 5 — the investor-image and owner-occupier-image pair must visibly represent different demographics.

---

## Open questions for 88West / build phase

1. **Real agent headshot:** Who is the designated foreclosure specialist? Need name, RECBC license #, and high-res headshot before launch. Currently a launch-blocker for Slot 6.
2. **88 West Realty logo asset path:** Confirm file location in the repo. Is it at `/public/images/brand/` or somewhere else? Build agent should verify before composing the OG image (Slot 8) and the trust block (Slot 7).
3. **Office exterior photo:** Should the footer include an exterior shot of the 970 Marine Drive office (or wherever 88West's Vancouver office is)? Not in the current 7-slot spec, but adds a trust signal. Decide before footer build.
4. **Medical-strata OG template reuse:** Confirm whether `/public/og/` already has a templated OG composite from the medical campaign that the foreclosure OG can clone. If yes, sharp.js compositing is trivial. If no, build agent designs OG from scratch in Figma.
5. **Unsplash+ license access:** Some of the strongest "couple receiving keys" candidates on Unsplash are Unsplash+ (paid). Does 88West have an Unsplash+ subscription? If not, restrict to free Unsplash and Pexels options.

---

*End — image sourcing plan.*
