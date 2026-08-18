"use client";

/**
 * hooks/use-reduced-motion.ts
 * ----------------------------------------------------------------------------
 * A dedicated hook (rather than calling useMediaQuery directly everywhere)
 * so the query string ("(prefers-reduced-motion: reduce)") is written once,
 * and so it's greppable/discoverable as its own concept — accessibility
 * requirements should read as intentional decisions in the code, not a
 * generic media query call sitting next to unrelated ones.
 *
 * For Framer Motion specifically, prefer reading motion values through
 * Framer's own `useReducedMotion()` inside components already wrapped by
 * `MotionConfig reducedMotion="user"` (see providers/motion-provider.tsx) —
 * this hook is for the non-Framer cases: toggling a CSS class, gating a
 * Lenis/parallax effect, etc.
 */

import { useMediaQuery } from "./use-media-query";

export function useReducedMotionPreference(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
