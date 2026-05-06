# Getting GVR IDX + VOW WebAPI access — the real process

**Important context — earlier version of this doc had a formal email
application template. That was wrong. The actual path for an existing
GVR member is self-service through the Bridge platform, not an email
application. Ron Matin (matinhomes.ca, same brokerage as us) almost
certainly used this path; ask him directly for the exact UI clicks.**

---

## The path (per GVR's own Transition FAQ + Repliers' published guide)

### Step 1 — Log into the member portal

`https://member.gvrealtors.ca` with your **REALTOR.ca SSO credentials**
(GVR migrated to CREA's SSO in June 2025, so this is the same login as
realtor.ca, WEBForms, and Paragon).

If you haven't logged in since October 2023 you may need to register
your CREA SSO first.

### Step 2 — Find the Bridge platform invitation

GVR transitioned from RETS to the Bridge WebAPI in 2025. Every active
member was sent an invitation to join the Bridge platform. Look for:

- An email from Bridge Interactive in your inbox (search:
  `subject: bridge` or sender `@bridgeinteractive.com`)
- A "Data Feeds" or "IDX" section inside `member.gvrealtors.ca`

If neither is visible, this is the one place to email
**`idx@gvrealtors.ca`** — but framed as "I haven't received my Bridge
invitation, can you re-send?" not as a brokerage application.

### Step 3 — In Bridge, request data access

Once logged into Bridge:

> **Data Access → Request Data Access**

Pick the application titled:

> **"Greater Vancouver REALTORS®, Fraser Valley Real Estate Board,
> Chilliwack and District Real Estate Board, BC Northern Real Estate
> Board – Residential"**

Submit a request for **both IDX and VOW** feed types. The Bridge
"Combined Feed Types" feature returns either feed from a single
endpoint based on a `FeedTypes` field on each record.

### Step 4 — Broker of Record authorizes

Bridge auto-emails 88 West's Broker of Record — **Shirin Saleh**
(Owner & Managing Broker per the brokerage's directory). She clicks an
authorize link. This is the same pattern TRREB uses in Ontario; GVR
mirrors it. No paperwork, no fee.

### Step 5 — VOW compliance loop (only for VOW, not IDX)

Per Repliers' published GVR onboarding guide:

1. After Shirin authorizes, GVR's compliance contact (Tim Yee) sends
   contracts to sign — primarily the VOW Data Agreement.
2. Sign and return.
3. GVR provides **test-feed credentials** to a sandbox.
4. We build the integration against the test feed.
5. Submit the live website to GVR for **compliance review** — they
   check that listings show required attributions, brokerage credit,
   user-registration gating for VOW data, etc.
6. After approval, we get **full-dataset credentials**.

### Step 6 — IDX-only case (faster)

If we only need IDX (no sold history, no court-ordered remarks),
there's no compliance review — credentials come right after broker
authorization. Trade-off: we lose the foreclosure detection that VOW
remarks unlock.

For our use case (foreclosure + pre-sale tracking), VOW is what we want,
so plan for the full compliance loop.

---

## Cost — confirmed (corrected from earlier draft)

Per RealtyNinja's MLS Coverage table and the GVR member fee schedule:

| Item | Cost |
|---|---|
| GVR Direct WebAPI (IDX + VOW) data fee | **$0** — bundled into existing MLS service fees |
| Bridge platform itself | $0 — Bridge doesn't charge brokerages directly |
| One-time admin onboarding | Likely $0; possibly small one-time setup |
| **Total recurring** | **$0/mo** beyond what 88W already pays in dues |

The only real cost is the time spent on Step 5's compliance review.

---

## Timeline

| Step | Likely duration |
|---|---|
| Steps 1–3 (login, request) | 30 minutes |
| Step 4 (broker auth) | Same day if Shirin is responsive |
| Step 5a (contract signing) | 1–3 business days |
| Step 5b (test feed credentials) | 1–5 business days after sign |
| Building integration against test feed | 2–3 days of dev work |
| Step 5c (compliance review of live site) | 5–15 business days |
| Step 5d (full credentials) | Same week as approval |
| **Total to live data** | **~3–5 weeks** |

Worth knowing before we start: most of that is GVR-side wait time, not
build time. We can build everything else (Postgres, sync worker, API
layer, image cache) against the test feed during the wait.

---

## Lessons logged

- **Don't write formal application emails for processes that have a
  self-service portal.** Check whether the path exists in-app first.
- **When the user references a specific person who has already done X,
  ask "what did they actually do?" before designing a fresh process.**
  Ron is at the same brokerage; he's the source of truth, not a
  hypothetical brokerage-onboarding template.
