export const COMPANY = {
  name: "88 West Realty",
  legalName: "88 West Realty Inc.",
  phone: "1-604-281-1828",
  phoneClean: "+16042811828",
  founderPhone: "604-767-8795",
  founderPhoneClean: "+16047678795",
  email: "info@88westrealty.com",
  officeEmail: "office@88westrealty.com",
  website: "https://88westrealty.com",
  logoUrl: "https://88westrealty.com/wp-content/uploads/2025/08/88.png",
  address: "North Vancouver, BC, Canada",
  founded: "2015",
  founder: "Shirin Saleh",
  founderTitle: "Owner and Managing Broker",
  agents: "60+",
  listings: "283+",
  northVanListings: "800+",
  tagline: "Boutique brokerage, big results.",
  social: {
    instagram: "https://www.instagram.com/88westrealty/",
    youtube: "https://www.youtube.com/@88westrealty88",
    facebook: "https://www.facebook.com/88westrealty/",
  },
} as const;

// ─── GoHighLevel sub-account location IDs ──────────────────────────────
// Each webhook URL MUST have one of these embedded in its /hooks/<id>/
// path segment. assertWebhookLocation() enforces this at module load so
// misrouted webhooks fail the Next.js build instead of silently posting
// leads to the wrong CRM account.
//
// History: from 2026-04-09 → 2026-04-20 the medical-strata landing page
// was deployed with a webhook URL pointing to the BRIO location, so every
// lead was auto-tagged "campaign-bathroom" and nurtured with the wrong
// content before we caught it. Don't repeat that.
export const GHL_LOCATIONS = {
  EIGHTY_EIGHT_WEST: "7cP5dKRcwCgdBclC1d3m", // 88 West Realty sub-account
  BRIO: "7Z5Zm3czsuWjz4zwmsFr",              // Brio Construction — do NOT use for 88West campaigns
} as const;

function assertWebhookLocation(url: string, expectedLocationId: string, label: string): string {
  if (!url.includes(`/hooks/${expectedLocationId}/`)) {
    throw new Error(
      `[webhook-misrouted] "${label}" webhook URL missing expected GHL location "${expectedLocationId}". ` +
      `Got: ${url}`,
    );
  }
  return url;
}

/** GHL webhook for 88 West Realty medical strata leads (North Shore Health Pavilion pre-sale). */
export const MEDICAL_WEBHOOK_URL = assertWebhookLocation(
  "https://services.leadconnectorhq.com/hooks/7cP5dKRcwCgdBclC1d3m/webhook-trigger/AuGxFj3BBA8IwzHQjMsT",
  GHL_LOCATIONS.EIGHTY_EIGHT_WEST,
  "medical-strata",
);

/** GHL webhook for 88 West Realty foreclosure / court-ordered sales leads.
 *
 * NOTE: trigger ID below is a PLACEHOLDER. Before launch, user must:
 *   1. Create a new "Inbound Webhook" workflow in 88West GHL location
 *   2. Replace the trigger ID below with the new workflow's URL
 *   3. The location-prefix assertion guarantees we can't accidentally use a
 *      Brio URL — but a placeholder trigger will silently fail to capture leads
 *      until the real ID is filled in.
 */
export const FORECLOSURE_WEBHOOK_URL = assertWebhookLocation(
  "https://services.leadconnectorhq.com/hooks/7cP5dKRcwCgdBclC1d3m/webhook-trigger/PLACEHOLDER-FORECLOSURE-REPLACE-BEFORE-LAUNCH",
  GHL_LOCATIONS.EIGHTY_EIGHT_WEST,
  "foreclosure-deals-vancouver",
);

/** Campaign → webhook URL. Add new 88West Realty campaigns here; the
 * assertion above will catch any accidental Brio URL before build ships. */
export const WEBHOOKS = {
  "medical-strata": MEDICAL_WEBHOOK_URL,
  "foreclosure-deals-vancouver": FORECLOSURE_WEBHOOK_URL,
} as const;

/** Google Ads / GA4 IDs */
export const TRACKING = {
  gtmId: "GTM-MVD6JFMR",
  gaId: "G-ZPQFGGWJM3",
  awId: "AW-11020121875",
  awConversionLabel: "QvTFCLiluvsbEIOZuKtA", // Registration Form Submit
} as const;
