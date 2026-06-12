/**
 * foreclosure-geocode.ts — Neighborhood-centroid lookup for foreclosure pins.
 *
 * Approximate lat/lng centers for each Greater Vancouver neighborhood that
 * appears in `data/foreclosure-deals.json`. We deliberately use neighborhood
 * precision rather than per-listing addresses because:
 *   1. Compliance posture — we already mask street numbers; pinning to the
 *      exact building would defeat that
 *   2. Visual clarity — pinning at neighborhood center prevents single-pin
 *      buildings from dominating the map
 *   3. Operational — the operator shares the exact address on the intro call,
 *      so the pin precision matches what the user actually sees on the LP
 *
 * For neighborhoods with multiple listings, we apply a small deterministic
 * jitter (≤ 0.004°, ~300m) keyed off the street name so pins don't
 * perfectly overlap. Same listing always gets the same jitter — stable
 * across page refreshes.
 */

export type LatLng = { lat: number; lng: number };

// Hard-coded centroids. Order chosen for code readability (Vancouver core →
// suburbs). All values to 3 decimal places (~110m precision, more than
// adequate for visual pin placement).
const NEIGHBORHOOD_CENTROIDS: Record<string, LatLng> = {
  // City of Vancouver — downtown core
  "Downtown, Vancouver": { lat: 49.281, lng: -123.121 },
  "West End, Vancouver": { lat: 49.286, lng: -123.139 },
  "Yaletown, Vancouver": { lat: 49.276, lng: -123.122 },
  "Coal Harbour, Vancouver": { lat: 49.291, lng: -123.124 },
  "Gastown, Vancouver": { lat: 49.284, lng: -123.108 },

  // Vancouver West Side
  "Kitsilano, Vancouver": { lat: 49.270, lng: -123.165 },
  "Point Grey, Vancouver": { lat: 49.265, lng: -123.196 },
  "Dunbar, Vancouver": { lat: 49.250, lng: -123.190 },
  "Kerrisdale, Vancouver": { lat: 49.232, lng: -123.157 },
  "Shaughnessy, Vancouver": { lat: 49.245, lng: -123.140 },
  "Marpole, Vancouver": { lat: 49.207, lng: -123.130 },
  "Oakridge, Vancouver": { lat: 49.230, lng: -123.119 },

  // Vancouver East Side
  "Hastings, Vancouver": { lat: 49.281, lng: -123.062 },
  "Renfrew Heights, Vancouver": { lat: 49.255, lng: -123.040 },
  "South Marine, Vancouver": { lat: 49.210, lng: -123.072 },
  "Killarney, Vancouver": { lat: 49.226, lng: -123.043 },
  "Sunset, Vancouver": { lat: 49.221, lng: -123.087 },

  // North Vancouver
  "Central Lonsdale, North Vancouver": { lat: 49.327, lng: -123.073 },
  "Lower Lonsdale, North Vancouver": { lat: 49.312, lng: -123.078 },
  "Lynnmour, North Vancouver": { lat: 49.310, lng: -123.020 },
  "Lynn Valley, North Vancouver": { lat: 49.343, lng: -123.040 },
  "Capilano, North Vancouver": { lat: 49.323, lng: -123.111 },

  // Burnaby
  "Metrotown, Burnaby": { lat: 49.227, lng: -123.001 },
  "Sullivan Heights, Burnaby": { lat: 49.252, lng: -122.917 },
  "Brentwood Park, Burnaby": { lat: 49.265, lng: -123.001 },
  "Parkcrest, Burnaby": { lat: 49.252, lng: -122.972 },
  "Sperling-Duthie, Burnaby": { lat: 49.262, lng: -122.956 },

  // Richmond
  "Brighouse, Richmond": { lat: 49.169, lng: -123.139 },
  "Granville, Richmond": { lat: 49.158, lng: -123.124 },
  "Gilmore, Richmond": { lat: 49.181, lng: -123.169 },
  "Steveston, Richmond": { lat: 49.127, lng: -123.184 },

  // Surrey (breadth precedent — out of stated areaServed but we list these)
  "Morgan Creek, Surrey": { lat: 49.060, lng: -122.793 },
  "East Newton, Surrey": { lat: 49.135, lng: -122.851 },
  "West Newton, Surrey": { lat: 49.131, lng: -122.892 },
  "Fleetwood Tynehead, Surrey": { lat: 49.158, lng: -122.797 },
  "Sullivan Station, Surrey": { lat: 49.115, lng: -122.842 },
  "Grandview Surrey, Surrey": { lat: 49.026, lng: -122.829 },
  "Guildford, Surrey": { lat: 49.185, lng: -122.808 },
  "Cloverdale, Surrey": { lat: 49.108, lng: -122.722 },
};

// Fallback for unknown neighborhoods — centered near Vancouver downtown.
// Should rarely fire; logs a console warning when it does so we can extend
// the table.
const FALLBACK: LatLng = { lat: 49.281, lng: -123.121 };

/**
 * Deterministic jitter for a street within a neighborhood. Same street
 * always gets the same offset, so pins are stable across reloads but
 * don't perfectly overlap when multiple listings share an area.
 */
function jitterFromString(seed: string): LatLng {
  // Simple FNV-1a hash → split into lat / lng offsets up to ±0.004°
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const a = ((h >>> 0) % 1000) / 1000; // 0..1
  const b = ((h >>> 16) % 1000) / 1000; // 0..1
  // Map to ±0.0035° (~250m)
  return {
    lat: (a - 0.5) * 0.007,
    lng: (b - 0.5) * 0.007,
  };
}

export function locateListing(area: string, street: string): LatLng {
  const center = NEIGHBORHOOD_CENTROIDS[area];
  if (!center) {
    if (typeof window !== "undefined") {
      // Silent in production builds; helpful during development to extend
      // the table when new neighborhoods land.
      // eslint-disable-next-line no-console
      console.warn(`[foreclosure-geocode] unknown neighborhood: "${area}"`);
    }
    return FALLBACK;
  }
  const j = jitterFromString(street);
  return { lat: center.lat + j.lat, lng: center.lng + j.lng };
}

// Reasonable initial Vancouver-area view that fits ~95% of the listings.
export const MAP_CENTER: LatLng = { lat: 49.235, lng: -123.000 };
export const MAP_ZOOM_DEFAULT = 11;
