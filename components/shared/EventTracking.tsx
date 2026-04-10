"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function pushEvent(event: string, params?: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export default function EventTracking() {
  const tracked = useRef(new Set<string>());

  useEffect(() => {
    // ── Section Visibility Tracking ──
    // Fires "section_view" when each major section enters viewport
    const sections = document.querySelectorAll("section[id], [id='register'], [id='specs'], [id='features'], [id='benefits'], [id='faq'], [id='calculator']");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id || entry.target.getAttribute("data-section") || "unknown";
            if (!tracked.current.has(id)) {
              tracked.current.add(id);
              pushEvent("section_view", { section_name: id });
            }
          }
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach((el) => observer.observe(el));

    // ── CTA Click Tracking ──
    // Track all anchor links pointing to #register
    function handleCtaClick(e: Event) {
      const target = e.currentTarget as HTMLAnchorElement;
      const section = target.closest("section");
      const sectionId = section?.id || section?.getAttribute("data-section") || "unknown";
      pushEvent("cta_click", {
        cta_text: target.textContent?.trim().slice(0, 50),
        cta_location: sectionId,
        cta_href: target.getAttribute("href"),
      });
    }

    const ctaLinks = document.querySelectorAll('a[href="#register"], a[href="#calculator"]');
    ctaLinks.forEach((el) => el.addEventListener("click", handleCtaClick));

    // ── Phone Click Tracking ──
    function handlePhoneClick(e: Event) {
      const target = e.currentTarget as HTMLAnchorElement;
      pushEvent("phone_click", {
        phone_number: target.getAttribute("href")?.replace("tel:", ""),
        click_location: target.closest("section")?.id || "unknown",
      });
    }

    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach((el) => el.addEventListener("click", handlePhoneClick));

    // Cleanup
    return () => {
      observer.disconnect();
      ctaLinks.forEach((el) => el.removeEventListener("click", handleCtaClick));
      phoneLinks.forEach((el) => el.removeEventListener("click", handlePhoneClick));
    };
  }, []);

  return null; // No visual output — tracking only
}
