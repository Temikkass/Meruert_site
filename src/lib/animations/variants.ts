/**
 * lib/animations/variants.ts
 * ----------------------------------------------------------------------------
 * Every preset below is a plain Framer Motion `Variants` object — components
 * spread `variants={fadeUp}` plus `initial="hidden" animate="visible"`, so
 * the same preset works whether it's triggered by `whileInView` (scroll
 * reveal) or a page-load sequence.
 *
 * REDUCED MOTION
 * These variants define the "full motion" version only. Respecting
 * `prefers-reduced-motion` is handled centrally by `useReducedMotion()`
 * (see /hooks/use-reduced-motion.ts) + Framer Motion's own
 * `MotionConfig reducedMotion="user"` set in providers/motion-provider.tsx
 * — Framer automatically substitutes a cross-fade for transform-based
 * animation when the OS setting is on, so individual variants below don't
 * need a reduced-motion branch each.
 */

import type { Variants } from "framer-motion";
import { transitions, easing } from "./transitions";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: transitions.base },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: transitions.base },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: transitions.base },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition: transitions.slow },
};

/**
 * Reveal: the default scroll-triggered section entrance — a slightly slower
 * fade + rise, meant to be the "house style" reveal used across most
 * sections so the page doesn't feel like a showcase of different effects.
 */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
};

/**
 * Stagger container: wraps a list of children (offering cards, gallery
 * tiles) so they reveal in sequence rather than all at once. Pair with a
 * child variant like `fadeUp` on each item.
 */
export const staggerContainer = (staggerDelay = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

/**
 * Text reveal: for headline treatments where individual words/lines rise
 * into place. Intended to be applied per-word by a <TextReveal> component
 * that splits its children — this variant is the per-word animation.
 */
export const textReveal: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: "0%", transition: transitions.base },
};

/**
 * Image reveal: a clip-path wipe used for hero/project imagery — reads as
 * more considered than a plain fade for large photography.
 */
export const imageReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", scale: 1.08 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    scale: 1,
    transition: { ...transitions.slow, duration: transitions.slow.duration * 1.3 },
  },
};

/** Page transition: used by the (future) template-level page wrapper */
/**
 * Page transition: the route-change enter/exit, used by
 * providers/page-transition.tsx. Combines fade + a very slight scale +
 * blur — three of the four techniques the motion brief calls out
 * ("subtle: fade / blur / scale / clip-path"). Clip-path is deliberately
 * NOT stacked into this one transition too: combining all four at once on
 * every navigation would read as busy rather than "elegant," so
 * clip-path's use elsewhere in this file (clipReveal, imageReveal,
 * maskReveal) covers that technique in a context where it reads as
 * intentional rather than crowded. Kept fast on purpose — a page
 * transition users pay this cost on every click should never feel like a
 * tax; exit is quicker than enter (0.18s vs 0.32s) so the outgoing page
 * gets out of the way promptly.
 */
export const pageTransition: Variants = {
  hidden: { opacity: 0, scale: 0.985, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.32, ease: easing.entrance },
  },
  exit: {
    opacity: 0,
    scale: 1.01,
    filter: "blur(4px)",
    transition: { duration: 0.18, ease: easing.exit },
  },
};

/** Section transition: slightly larger movement than fadeUp, for full sections */
export const sectionTransition: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
};

// ---- Design-system phase additions --------------------------------------

/**
 * Clip reveal: a directional wipe via clip-path, no opacity change — reads
 * as more "engineered" than a fade, good for panels and dividing lines.
 * Distinct from `imageReveal` (which pairs the wipe with a scale-down for
 * photography specifically); this is the general-purpose version for any
 * element.
 */
export const clipReveal = (direction: "up" | "down" | "left" | "right" = "up"): Variants => {
  const hiddenInset: Record<typeof direction, string> = {
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
  };
  return {
    hidden: { clipPath: hiddenInset[direction] },
    visible: { clipPath: "inset(0 0 0 0)", transition: transitions.slow },
  };
};

/**
 * Mask reveal: pairs a clip-path wipe with a blur, for a softer "developing"
 * feel than the hard edge of `clipReveal` — used for section-level imagery
 * that shouldn't feel as mechanical as the hero's `imageReveal` wipe.
 */
export const maskReveal: Variants = {
  hidden: { clipPath: "inset(0 0 40% 0)", filter: "blur(8px)", opacity: 0.6 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    filter: "blur(0px)",
    opacity: 1,
    transition: transitions.slow,
  },
};

/**
 * Slide: pure translate, no opacity change — for elements that are already
 * visible in the DOM (e.g. a sticky sub-nav sliding into view) where a
 * fade would look like a flicker rather than an entrance.
 */
export const slide = (direction: "up" | "down" | "left" | "right" = "up", distance = 40): Variants => {
  const isHorizontal = direction === "left" || direction === "right";
  const offset = direction === "up" || direction === "left" ? distance : -distance;

  return {
    hidden: isHorizontal ? { x: offset } : { y: offset },
    visible: isHorizontal
      ? { x: 0, transition: transitions.base }
      : { y: 0, transition: transitions.base },
  };
};

/** Rotate: a small, restrained rotation-in — never more than a few degrees, this isn't a game UI */
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -4, scale: 0.97 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: transitions.base },
};

/**
 * Floating: a continuous, looping micro-movement for decorative elements
 * (a background blob, an icon badge) — NOT scroll-triggered, so it's
 * applied via `animate` directly rather than `whileInView`. Framer's
 * `reducedMotion="user"` config (see providers/motion-provider.tsx) halts
 * this automatically when the OS preference is on.
 */
export const floating = {
  y: [0, -12, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};
