# GVR VOW WebAPI Application — Email Draft

**Send to:** `idx@gvrealtors.ca`
**From:** an `@88westrealty.com` address (preferably the broker of record's mailbox so they can confirm authority)
**Subject:** Request for IDX + VOW WebAPI access — 88 West Realty (License #X031527)

> ## Email body
>
> Hello,
>
> I'm writing on behalf of **88 West Realty** (BC license **#X031527**, North Vancouver) to apply for **WebAPI feed access via the Bridge platform**, both **IDX** and **VOW** tiers.
>
> ### About 88 West Realty
> 88 West Realty is an active member brokerage of GVR (also covering FVREB, CADREB and BCNREB through reciprocity). Office: **970 Marine Drive, North Vancouver, BC**. Phone: **604-281-1828**.
>
> ### What we're requesting
> 1. **IDX WebAPI feed** — for the public-facing search and listings display on our buyer-side landing pages (`go.88westrealty.com/foreclosure-deals-vancouver`, `go.88westrealty.com/developer-condo-deals-vancouver`, and the broader `88westrealty.com` site).
> 2. **VOW WebAPI feed** — for our authenticated client portal where registered buyers can see sold history, original list prices, days-on-market, off-market data, and full property remarks (including court-ordered/foreclosure flags) under the standard CREA VOW user-registration model.
> 3. The **Combined Feed Types** option (per your transition FAQ) so we can hit a single endpoint and use the `FeedTypes` field to enforce IDX vs VOW display rules.
> 4. The **mapping document** narrowed to IDX + VOW relevant fields (per your FAQ — *"available upon request"*).
>
> ### Why VOW (not just IDX)
> Two of our active campaigns require VOW-tier data:
> - A buyer-side **foreclosure / court-ordered sales** practice — we need access to the remarks, conditions, and court-related flags that VOW exposes but IDX strips.
> - A buyer-side **developer pre-sale tracking** practice — we need original list price, price history, and DOM to identify standing-inventory opportunities and sold comps.
>
> Both will be served through an authenticated client portal that complies with the CREA VOW user-registration requirements.
>
> ### Technical setup
> - We'll be implementing **RESO Web API** (RESTful), not RETS.
> - Sync will be **delta-based** (using `ModificationTimestamp` filtering) on an hourly cron, into our own PostgreSQL store.
> - Image hosting will be proxy-cached on our own CDN to comply with Board uptime and brand-attribution rules.
> - All listings will be displayed with the standard GVR/board attribution, brokerage credit, and disclaimer text per your display policies.
>
> ### Who'll be developing
> Implementation will be handled by our in-house technical team. Primary contact for technical onboarding: **[your email/phone]**.
>
> Could you please send through:
> - The application form / agreement(s) we need to sign,
> - The fee schedule (setup + monthly), and
> - The Bridge platform onboarding instructions and API credentials process?
>
> Happy to provide additional documentation (commercial general liability cert, brokerage certificate of authorization, anything else).
>
> Thank you,
>
> **[Your name]**
> [Title — e.g., Managing Broker / Owner]
> 88 West Realty Inc.
> 970 Marine Drive, North Vancouver, BC
> [your phone] · [your email]
> License #X031527

---

## What to expect after sending

- **Response time:** typically 3–10 business days for an initial reply with the application packet
- **Setup time after approval:** 1–3 weeks for credentials to land in your inbox
- **Fees:** Per RealtyNinja's MLS Coverage table (cross-referenced against
  the GVR member portal), the **direct GVR/FVREB/CADREB WebAPI carries no
  separate data fee for member brokerages** — it's bundled into the MLS
  service fees 88 West already pays via dues. There may be a one-time
  administrative onboarding cost (we explicitly ask in the email). Bridge
  Interactive (the hosting platform) does not charge brokerages directly.
  The expensive options ($50–$200/mo) you'll see online are *vendor
  wrappers* (Realtyna, Showcase IDX, MyRealPage) bundling a website with
  data — not the underlying API. We're going direct.
- **Compliance docs they may ask for:**
  - Brokerage Certificate of Authorization (issued by BCFSA)
  - Commercial General Liability insurance certificate
  - Sample of how you'll display listings (we'll send the foreclosure LP screenshot)
  - VOW user-agreement template (template needed only if we go VOW; CREA publishes a model agreement)

## Things NOT to mention in the email

- **Don't say "we want to scrape competitors"** — kills the application
- **Don't say "we'll redistribute the data"** — IDX/VOW agreements explicitly prohibit redistribution; we display only
- **Don't promise specific timelines** — we want to keep this open-ended
- **Don't mention MyRealPage** — they're a third-party vendor; GVR cares about us as a brokerage, not our website builder

## Once approved — what we get

Per the GVR transition FAQ:
- A Bridge platform login
- RESO Web API endpoints (separate for IDX, VOW, or combined)
- Mapping documentation showing field names
- A test sandbox we can hit before going live
- Clear display compliance rules (attribution, brokerage credit, disclaimer)

We then implement what's documented in `docs/gvr-database-schema.md` (workstream C).
