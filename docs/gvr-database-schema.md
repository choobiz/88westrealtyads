# GVR WebAPI → Self-Hosted Database — Architecture & Schema

**Status:** Design doc. Implementation gated on GVR WebAPI access (see
[`gvr-vow-webapi-application.md`](./gvr-vow-webapi-application.md)).

**Reference implementation:** matinhomes.ca (analyzed 2026-05-06). Their
`/api/properties` endpoint returns RESO-shaped records out of an Express +
Mongo backend with ~26,025 active listings + sold history. We're rebuilding
their architecture in our stack (Next.js + Postgres) with the same data
shape so the migration to the LP is a one-import change.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          GVR Bridge platform                         │
│         (RESO Web API · Combined IDX + VOW feed endpoints)          │
└────────────────────────────┬────────────────────────────────────────┘
                             │ ModificationTimestamp delta poll
                             │ (hourly cron)
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│              guesty-vm  ·  /home/amir/88west-mls/                   │
│                                                                       │
│   sync-worker.mjs   (Node, PM2-managed)                              │
│      ├─ 1. Poll Bridge: GET /properties?$filter=                     │
│      │                  ModificationTimestamp gt <last>              │
│      ├─ 2. Upsert into Postgres                                      │
│      ├─ 3. Download new photos → /var/lib/88w-mls-photos/            │
│      └─ 4. Update sync_state.last_sync_at                            │
│                                                                       │
│   image-cache       (nginx serving /var/lib/88w-mls-photos/)         │
│      └─ proxied at api.88westrealty.com/photos/<id>-m<n>.jpg         │
│                                                                       │
│   Postgres 16       (port 5434, Docker, separate DB from guesty-ops) │
│      ├─ properties                                                    │
│      ├─ property_photos                                               │
│      ├─ property_history                                              │
│      ├─ property_flags                                                │
│      └─ sync_state                                                    │
└────────────────────────────┬────────────────────────────────────────┘
                             │ /api/* via nginx → uvicorn or express
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  go-landing (Next.js · Vercel)                       │
│                                                                       │
│   /app/api/properties/route.ts                                       │
│      └─ proxies to api.88westrealty.com/api/properties (cached)      │
│                                                                       │
│   /components/foreclosure/InventoryPreview.tsx                       │
│      └─ fetches from /api/properties?flags=court-ordered&limit=6     │
│                                                                       │
│   /components/developer/TrackerPreview.tsx                           │
│      └─ fetches from /api/properties?propertyType=presale&limit=6    │
│         then enriches with the Mike Stewart scraper output           │
└─────────────────────────────────────────────────────────────────────┘
```

**Why this split:**
- **VM, not Vercel, for sync** — the GVR poll is long-running (~1-2 min per delta),
  needs persistent storage for ~25k+ records and ~500GB of cached photos, and
  needs to run reliably on a cron. Vercel serverless cold starts + 10s
  execution limits don't fit.
- **Postgres, not Mongo** — our other Brio infra (guesty-ops, brio-marketing-hub
  dashboard, business-dashboard) is all Postgres. Stay consistent.
- **Nginx + cached photos** — reduces per-request hits to GVR Bridge image
  endpoints (which are rate-limited) and keeps listings rendering even if
  Bridge has an outage.

---

## Database schema (Postgres 16)

### `properties`

The core table. One row per active+sold listing.

```sql
CREATE TABLE properties (
  -- Identity
  listing_key      TEXT PRIMARY KEY,        -- RESO ListingKey, GVR's stable ID
  mls_number       TEXT NOT NULL,           -- e.g. R3119386
  source_system    TEXT NOT NULL DEFAULT 'GVR',  -- GVR | FVREB | CADREB | BCNREB

  -- Status
  status           TEXT NOT NULL,           -- Active | Sold | Pending | Cancelled | Expired
  feed_types       TEXT[] NOT NULL,         -- ['IDX'] | ['VOW'] | ['IDX','VOW']
  type             TEXT NOT NULL,           -- sale | lease

  -- Pricing
  price                INT,
  original_list_price  INT,                 -- VOW-only; lets us compute price drops
  close_price          INT,                 -- VOW-only; sold price
  close_date           DATE,                -- VOW-only
  sold_date            DATE,                -- VOW-only

  -- Address
  unit            TEXT,
  address         TEXT,
  city            TEXT NOT NULL,
  neighborhood    TEXT,
  postal_code     TEXT,
  mls_area_major  TEXT,                     -- GVR's normalized area code

  -- Property
  property_type      TEXT NOT NULL,         -- house | condo | townhouse | half-duplex | etc.
  property_subtype   TEXT,                  -- 'Single Family Residence' etc.
  structure_type     TEXT,
  bedrooms           SMALLINT,
  bathrooms          SMALLINT,
  area_sqft          INT,
  lot_size_acres     NUMERIC(8,4),
  lot_dimensions     TEXT,
  frontage           TEXT,
  year_built         SMALLINT,

  -- Listing meta
  listed_at          DATE,
  listing_office     TEXT,
  last_price_update  TIMESTAMPTZ,

  -- Geo
  lat                NUMERIC(10,7),
  lng                NUMERIC(10,7),

  -- Open house
  open_house          BOOLEAN DEFAULT FALSE,
  open_house_start    TIMESTAMPTZ,
  open_house_end      TIMESTAMPTZ,

  -- Sync metadata
  modification_ts    TIMESTAMPTZ NOT NULL,  -- RESO ModificationTimestamp
  raw_payload        JSONB,                  -- Full RESO record for forward-compat
  ingested_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_properties_status_city       ON properties (status, city) WHERE status = 'Active';
CREATE INDEX idx_properties_modification_ts   ON properties (modification_ts);
CREATE INDEX idx_properties_price_active      ON properties (price) WHERE status = 'Active';
CREATE INDEX idx_properties_property_type     ON properties (property_type);
CREATE INDEX idx_properties_close_date        ON properties (close_date) WHERE close_date IS NOT NULL;
CREATE INDEX idx_properties_neighborhood      ON properties (neighborhood);
CREATE INDEX idx_properties_geo               ON properties USING gist (point(lng, lat));
```

### `property_photos`

One-to-many. Photos are downloaded once, hosted locally.

```sql
CREATE TABLE property_photos (
  id              BIGSERIAL PRIMARY KEY,
  listing_key     TEXT NOT NULL REFERENCES properties(listing_key) ON DELETE CASCADE,
  display_order   SMALLINT NOT NULL,
  remote_url      TEXT NOT NULL,            -- Original GVR Bridge URL
  local_path      TEXT,                      -- /var/lib/88w-mls-photos/<key>-m<n>.jpeg
  width_px        INT,
  height_px       INT,
  bytes           INT,
  downloaded_at   TIMESTAMPTZ,
  UNIQUE (listing_key, display_order)
);

CREATE INDEX idx_property_photos_listing ON property_photos (listing_key);
```

### `property_flags`

Decoupled because we add our own flags on top of GVR's (e.g. our own
"court-ordered" detection from remarks parsing, our own "investor-friendly"
classifier, etc.). Many-to-one.

```sql
CREATE TABLE property_flags (
  listing_key  TEXT NOT NULL REFERENCES properties(listing_key) ON DELETE CASCADE,
  flag         TEXT NOT NULL,               -- court-ordered | foreclosure | price-reduced | new-listing | open-house | first-time-buyer-eligible | etc.
  source       TEXT NOT NULL,               -- gvr-remarks | gvr-status | 88w-classifier | 88w-manual
  set_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (listing_key, flag)
);

CREATE INDEX idx_property_flags_flag ON property_flags (flag);
```

### `property_history`

Status changes, price changes — the audit log. Lets us answer "how long has
this been on market" and "did it drop in price" without keeping multiple
snapshots of the full record.

```sql
CREATE TABLE property_history (
  id            BIGSERIAL PRIMARY KEY,
  listing_key   TEXT NOT NULL REFERENCES properties(listing_key) ON DELETE CASCADE,
  changed_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  field         TEXT NOT NULL,              -- price | status | listing_office
  old_value     TEXT,
  new_value     TEXT
);

CREATE INDEX idx_property_history_key_time ON property_history (listing_key, changed_at DESC);
```

### `sync_state`

Single-row table tracking the last successful poll watermark.

```sql
CREATE TABLE sync_state (
  source_system     TEXT PRIMARY KEY,       -- GVR | FVREB | etc.
  last_sync_at      TIMESTAMPTZ NOT NULL,
  last_modification_ts TIMESTAMPTZ NOT NULL,
  last_records      INT NOT NULL DEFAULT 0,
  last_error        TEXT,
  last_error_at     TIMESTAMPTZ
);

INSERT INTO sync_state (source_system, last_sync_at, last_modification_ts)
VALUES ('GVR', '1970-01-01', '1970-01-01') ON CONFLICT DO NOTHING;
```

---

## Sync worker (`sync-worker.mjs`)

Pseudocode for the hourly poll. Runs on guesty-vm under PM2.

```js
import pg from "pg";
import { fetchBridge, downloadPhoto } from "./bridge-client.mjs";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function syncOnce() {
  const { rows: [state] } = await pool.query(
    "SELECT last_modification_ts FROM sync_state WHERE source_system = 'GVR'"
  );
  const since = state.last_modification_ts;

  let total = 0;
  for await (const batch of fetchBridge({
    endpoint: "/Property",
    filter: `ModificationTimestamp gt ${since.toISOString()}`,
    select: REQUIRED_FIELDS,    // explicit field list per docs
    pageSize: 200,
  })) {
    await pool.query("BEGIN");
    try {
      for (const r of batch) {
        await upsertProperty(pool, r);
        await syncPhotos(pool, r);
        await classifyFlags(pool, r);  // court-ordered detection from PrivateRemarks
      }
      await pool.query(
        "UPDATE sync_state SET last_sync_at = NOW(), last_modification_ts = $1, last_records = last_records + $2 WHERE source_system = 'GVR'",
        [maxTs(batch), batch.length]
      );
      await pool.query("COMMIT");
      total += batch.length;
    } catch (err) {
      await pool.query("ROLLBACK");
      await pool.query(
        "UPDATE sync_state SET last_error = $1, last_error_at = NOW() WHERE source_system = 'GVR'",
        [String(err)]
      );
      throw err;
    }
  }
  console.log(`[gvr-sync] ${total} records · ${new Date().toISOString()}`);
}

await syncOnce();
process.exit(0);
```

**Court-ordered detection:**
The VOW feed includes `PrivateRemarks` (broker-only notes) and
`PublicRemarks`. Court-ordered listings are flagged via:

```js
function isCourtOrdered(record) {
  const haystack = [
    record.PublicRemarks,
    record.PrivateRemarks,
    record.SaleType,        // sometimes set to "Court Ordered"
    record.SpecialConditions, // sometimes lists "Court Approval Required"
  ].filter(Boolean).join(" ").toLowerCase();
  return /\b(court[\s-]?ordered?|judicial sale|schedule[\s-]?a|court[\s-]?approval)\b/.test(haystack);
}
```

We set the `court-ordered` flag in `property_flags` when this matches.

---

## Public API (`api.88westrealty.com/api/properties`)

Same shape as matinhomes.ca's, so the LP migration is one import change.

### `GET /api/properties`

| Param | Type | Notes |
|---|---|---|
| `city` | string | URL-encoded, multi-value via comma |
| `propertyType` | enum | house, condo, townhouse, half-duplex, … |
| `minPrice` / `maxPrice` | int | |
| `minYearBuilt` / `maxYearBuilt` | int | |
| `flags` | string | Filter by flag — e.g. `flags=court-ordered` |
| `openHouseOnly` | bool | |
| `sort` | enum | newest \| price-asc \| price-desc \| price-drop |
| `limit` | int | default 20, max 100 |
| `offset` | int | for pagination |

Response:

```json
{
  "properties": [ /* same shape as Matin's */ ],
  "total": 26025,
  "page": 1,
  "pages": 1302
}
```

### Specific endpoints used by the LPs

```
GET /api/properties?flags=court-ordered&sort=newest&limit=6
  → Foreclosure InventoryPreview tiles

GET /api/properties?propertyType=presale&sort=newest&limit=6
  → Developer TrackerPreview tiles
  (cross-referenced with Mike Stewart scraper for incentive enrichment)

GET /api/properties/count?flags=court-ordered
  → ForeclosureHero "~XXX active" pill (replaces foreclosure-stats.json)

GET /api/properties/{listingKey}
  → Detail page; reveals address only after auth (VOW compliance)
```

---

## Implementation order (post-GVR-access)

| # | Task | Effort | Output |
|---|---|---|---|
| 1 | Provision Postgres on guesty-vm (port 5434, Docker) + run migrations | 2h | `properties`, `property_*`, `sync_state` tables live |
| 2 | Implement `bridge-client.mjs` — RESO Web API client with paging, OAuth/bearer auth, retry | 4h | Reusable client, tested against Bridge sandbox |
| 3 | Implement `sync-worker.mjs` — full sync first (every record), then delta sync | 4h | All 25k+ active listings in DB |
| 4 | Implement `photo-downloader.mjs` — concurrent photo fetch with rate limiting + nginx serving | 3h | All photos cached locally; image proxy live |
| 5 | Implement `classify-flags.mjs` — court-ordered, price-reduced, new-listing, etc. | 2h | `property_flags` populated |
| 6 | Set up PM2 cron (hourly) on guesty-vm | 1h | Auto-running, monitored |
| 7 | Implement `/api/properties` public API (Express on VM) | 4h | matinhomes.ca-shaped responses |
| 8 | Update `InventoryPreview.tsx` and `TrackerPreview.tsx` to fetch from API instead of local JSON | 2h | LP shows live data |
| 9 | Set up VOW user-registration flow (per CREA rules — required to display address-on-detail) | 6h | Compliant client portal |
| **Total** | | **~28h** (3-4 working days) | |

**Cost (revised after research):**
- **GVR Direct WebAPI: $0/mo** — included in 88W's existing MLS service fees
  (~$75–$100/mo) per RealtyNinja's coverage table. No separate data fee
  for member brokerages, confirmed for GVR + FVREB + CADREB.
- Bridge Interactive (the platform GVR uses): $0 — they don't charge
  brokerages directly.
- One-time GVR onboarding admin fee: $0–$500 (we asked them to confirm).
- Postgres on existing guesty-vm: $0 (existing).
- Photo storage: ~500GB local disk, $0–$5/mo extra disk if VM needs it.
- Vercel: no change.
- **Total recurring beyond what 88W already pays: $0/mo.**

The expensive options online ($50–$200/mo from Realtyna / Showcase IDX /
MyRealPage / SimplyRETS) are vendor wrappers bundling a hosted website
with the data feed. We're going direct so we own the data and the UI.

---

## What gets thrown away when this lands

- `data/foreclosure-stats.json` — replaced by `GET /api/properties/count?flags=court-ordered`
- `scripts/scrape-foreclosure-stats.mjs` — deleted; the live count is authoritative
- `data/foreclosure-deals.json` manual workflow — replaced by live API pull
- `data/developer-deals.json` manual workflow — partial: still curated for narrative copy (incentive concessions), but base listings come from API

The Mike Stewart scraper (`scripts/scrape-deals.mjs`) **stays** — it provides
the incentive narrative (the actual concession dollar amounts) that GVR's
listing remarks won't have in structured form.

---

## Open questions for the user

1. **Domain for the data API** — `api.88westrealty.com` (subdomain on existing
   88westrealty.com) or `api.go.88westrealty.com`? The latter keeps it clearly
   "go-landing" infra; the former leaves room to power the main brokerage site
   from the same DB.
2. **Where to host** — guesty-vm (existing, has spare capacity) or a new VM?
   Guesty-vm has ~3 services already; one more is fine if we keep the cron
   off-peak. Per CLAUDE.md the staggering rule says avoid `:00` and 03:00–06:00 UTC.
3. **VOW user-portal scope** — basic email signup (just enough to satisfy CREA
   VOW rules) or full account (saved searches, favorites, like Matin built)?
   Basic is faster; full takes the 28h estimate to ~50h.
