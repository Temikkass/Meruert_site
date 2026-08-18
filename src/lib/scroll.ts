/**
 * lib/scroll.ts
 * ----------------------------------------------------------------------------
 * A single helper for anchor-link navigation (nav items, "back to top",
 * footer links) so scroll behavior — including the reduced-motion check —
 * lives in one place rather than being reimplemented per component. Works
 * alongside the Lenis smooth-scroll provider: if Lenis is mounted, it
 * exposes `window.__lenis`, which this helper prefers so the scroll is
 * eased consistently with the rest of the page; it falls back to the
 * native API so nothing breaks if Lenis hasn't mounted yet (e.g. during
 * the first paint).
 */

declare global {
  interface Window {
    __lenis?: { scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void };
  }
}

export function scrollToSection(sectionId: string, offset = 0): void {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (window.__lenis) {
    window.__lenis.scrollTo(target, {
      offset: -offset,
      immediate: prefersReducedMotion,
    });
    return;
  }

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}
