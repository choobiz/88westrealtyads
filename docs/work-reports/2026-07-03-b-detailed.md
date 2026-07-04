# 88 West Go-Landing — Detailed Work Report: 2026-07-03 (Part B)

**Purpose:** Technical reference for recreating the inline-hero rollout + Variant-A retirement.

---

## Task 1: Inline-form hero on all variants; retire Variant A

### Context
Foreclosure LP (`/foreclosure-deals-vancouver`) ran a 4-way A/B/C/D test (25/25/25/25). Only Variant B used `ForeclosureHeroVariantB` (lead form inline above the fold, `formLocation="hero_inline"`). A/C/D used `ForeclosureHero` (control, two modal-open CTAs, no inline form). All observed conversions were on B.

### Decision
Make the inline-form hero the hero for every variant; retire A (it would duplicate B). A's traffic folds into B. Variants then differ only by inventory section: B=gated cards, C=Portfolio Console, D=explorer.

### Solution

#### File: `proxy.ts`
- `type Variant = "B" | "C" | "D";`
- `const VARIANT_SPLIT = { B: 0.50, C: 0.75, D: 1.0 } as const;` (cumulative; B 50%, C 25%, D 25%).
- `isVariant` accepts `B|C|D` only.
- `assignFromRandom()` drops the A branch.
- Cohort resolution migrates stale A cookies:
```ts
const existingCookie = request.cookies.get(COOKIE_NAME)?.value;
const migratedCookie = existingCookie === "A" ? "B" : existingCookie;
const variant = forcedVariant ?? (isVariant(migratedCookie) ? migratedCookie : assignFromRandom());
```
- Cookie re-persist condition adds the A-migration case:
```ts
if (!existingCookie || existingCookie === "A" || (forcedVariant && existingCookie !== variant)) { /* set cookie */ }
```

#### File: `app/foreclosure-deals-vancouver/page.tsx`
- `type Variant = "B" | "C" | "D";`
- Variant resolution defaults to B: `headerVariant === "C" ? "C" : headerVariant === "D" ? "D" : "B"`.
- Hero: replaced `{variant === "B" ? <ForeclosureHeroVariantB /> : <ForeclosureHero />}` with unconditional `<ForeclosureHeroVariantB />`.
- Removed `{variant === "A" && <ForeclosureFormSection />}`.
- Removed imports `ForeclosureHero` and `ForeclosureFormSection` (now unused).
- Body unchanged: `variant === "C" ? <PortfolioConsole /> : variant === "D" ? <ForeclosureListExplorer /> : <InventoryPreview />`.

#### File: `scripts/track-server.mjs`
- `const SPLIT = { A: 0, B: 50, C: 25, D: 25 };` (mirror of proxy.ts; A retired).
- `META` descriptions updated; A row kept (dashboard still loops A–D so historical A data stays visible).

### Verification
- `npm run build` clean; `/foreclosure-deals-vancouver` compiles as a dynamic route.
- Live probes (`curl "$URL?ab=$v"` for B/C/D): each returns the inline hero (`<form>`, name/email/phone fields, "Get Today's Deal List" submit — note the apostrophe is HTML-encoded, so grep for `Get Today`), plus the correct body marker (Portfolio for C, explorer for D). Response `x-vercel-cache: MISS`, `set-cookie: _lp_ab_cohort=<v>`.
- Tracker `/stats` baseline at change: totals 26 sessions / 3 leads / 11.54% CVR; A 6/0, B 6/3 (50%), C 4/0, D remainder/0.

### Deployment
```
# LP
npx vercel --prod --yes            # → go.88westrealty.com
# Tracker (VM)
ssh guesty-vm 'cd /home/amir/88west-go-landing && git pull origin main && pm2 restart 88w-track'
```

### Notes / gotchas
- `ForeclosureHeroVariantB` is now the hero for all variants — the name is a misnomer; a future rename to `ForeclosureHeroInline` was offered, not requested.
- Repo auto-commits data daily via cron — always `git pull --rebase` before pushing.
- Attribution unchanged: the lead form reads `_lp_ab_cohort` at submit and forwards `experiment_variant` to GHL + dataLayer, so B/C/D leads remain separable.
