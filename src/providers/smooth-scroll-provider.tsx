"use client";

/**
 * providers/smooth-scroll-provider.tsx
 * ----------------------------------------------------------------------------
 * Mounts Lenis once at the root and exposes the instance on
 * `window.__lenis` so lib/scroll.ts#scrollToSection() can drive anchor
 * navigation through it (keeping programmatic scrolls and user-driven
 * scrolls physically consistent, rather than one being eased and the other
 * instant).
 *
 * COMPATIBILITY NOTES (motion-design pass)
 * - Anchor navigation: lib/scroll.ts#scrollToSection() calls
 *   `window.__lenis.scrollTo(...)`, so every in-page anchor (nav links,
 *   Hero CTAs, the homepage/about CTA sections) already goes through Lenis
 *   rather than the native jump — no separate wiring needed here.
 * - Sticky elements: Lenis (in this default configuration, no custom
 *   `wrapper`/`content`) eases the REAL document scroll position via
 *   `window.scrollTo` on every frame — it doesn't fake scrolling with a
 *   transformed container. `position: sticky` (StickySection) is native
 *   browser layout behavior keyed off real scroll position, so it works
 *   unmodified.
 * - Framer Motion: for the same reason, native `scroll` events keep firing
 *   as Lenis eases the page, which is what Framer's `useScroll`/
 *   `whileInView` (Parallax, Reveal, StaggerGroup, AnimatedSection) key
 *   off of — no bridging code needed between the two libraries.
 * - Mobile / touch: `syncTouch: false` (the explicit default) keeps touch
 *   scrolling fully native — Lenis only intercepts wheel input. This is
 *   deliberate: syncing touch through Lenis's eased scroll model is what
 *   causes the "sluggish, fighting my thumb" feeling on some sites, and
 *   the brief is explicit about not breaking native touch scrolling.
 *
 * ACCESSIBILITY: if the user has `prefers-reduced-motion` on, Lenis is never
 * instantiated at all — scrolling falls back to native browser scrolling,
 * which is the correct "reduced motion" behavior for a whole-page effect
 * like this (unlike a small UI transition, easing every scroll in the page
 * is exactly the kind of motion that setting exists to opt out of).
 */

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // matches theme's "entrance" feel
      smoothWheel: true,
      syncTouch: false, // native touch scrolling — see file header comment
    });

    window.__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    let frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
