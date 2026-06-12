"use client";

/**
 * InventoryMapLoader — client-side wrapper that lazy-loads InventoryMap.
 *
 * Why this file exists: Next.js 16 disallows `ssr: false` with
 * `next/dynamic` in Server Components. The page.tsx is a Server Component
 * (it reads headers() for the A/B variant), so the dynamic-import-with-
 * skip-SSR pattern has to happen INSIDE a Client Component. This wrapper
 * is that Client Component.
 *
 * The actual map (InventoryMap.tsx) uses Leaflet which calls window/document
 * on import, so SSR has to be skipped.
 */

import dynamic from "next/dynamic";

const InventoryMap = dynamic(() => import("./InventoryMap"), {
  ssr: false,
  loading: () => (
    <section id="deals" className="bg-eightyw-light py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl overflow-hidden border border-eightyw-border bg-white animate-pulse"
          style={{ height: 680 }}
          aria-label="Loading foreclosure map"
        />
      </div>
    </section>
  ),
});

export default InventoryMap;
