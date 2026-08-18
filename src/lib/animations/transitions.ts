/**
 * lib/animations/transitions.ts
 * ----------------------------------------------------------------------------
 * Converts config/theme.ts's duration (ms) and easing (CSS cubic-bezier
 * strings) into the shape Framer Motion's `transition` prop expects —
 * Framer wants durations in SECONDS and easing as a number array, not a
 * CSS string. This is the one file that knows that conversion, so
 * variants.ts and every component can just import a ready-to-spread
 * `Transition` object instead of re-deriving it.
 */

import { theme } from "@/config/theme";

/**
 * Framer Motion's own `Transition` type is a union across tween/spring/
 * inertia configs, so `duration` isn't guaranteed to exist on it — which
 * would force a cast everywhere this object's `.duration` is read (see
 * variants.ts#imageReveal). Every preset here is a plain tween, so a
 * narrower, always-a-duration type is both more accurate and easier to
 * consume. Framer accepts this shape wherever it accepts `Transition`.
 */
export interface TweenTransition {
  duration: number;
  ease: number[];
}

/** Parses a CSS cubic-bezier(...) string into Framer Motion's [n,n,n,n] tuple */
function parseCubicBezier(css: string): [number, number, number, number] {
  const fallback: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const match = css.match(/cubic-bezier\(([^)]+)\)/);
  const captured = match?.[1];
  if (!captured) return fallback;

  const values = captured.split(",").map((n) => parseFloat(n.trim()));
  if (values.length !== 4 || values.some((n) => Number.isNaN(n))) return fallback;

  const [a, b, c, d] = values as [number, number, number, number];
  return [a, b, c, d];
}

export const easing = {
  standard: parseCubicBezier(theme.easing.standard),
  entrance: parseCubicBezier(theme.easing.entrance),
  exit: parseCubicBezier(theme.easing.exit),
};

export const transitions: Record<"fast" | "base" | "slow" | "ambient", TweenTransition> = {
  fast: { duration: theme.duration.fast / 1000, ease: easing.standard },
  base: { duration: theme.duration.base / 1000, ease: easing.entrance },
  slow: { duration: theme.duration.slow / 1000, ease: easing.entrance },
  ambient: { duration: theme.duration.ambient / 1000, ease: easing.standard },
};
