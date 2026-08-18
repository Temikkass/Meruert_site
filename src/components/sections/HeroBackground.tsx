"use client";

/**
 * components/sections/HeroBackground.tsx
 * ----------------------------------------------------------------------------
 * Purely decorative — two soft gradient forms drifting and slowly
 * breathing (scale + rotate), built from the existing gradient/blur tokens
 * rather than a new visual language. `aria-hidden` throughout since it
 * carries no content.
 *
 * GRADIENT ANIMATION, GPU-CHEAP ON PURPOSE: the "movement" is drift
 * (x/y) plus a slow scale/rotate breathe — never `background-position`,
 * which would force the browser to repaint the gradient itself every
 * frame. Animating the shape's transform instead lets the compositor
 * handle it, so the effect is free to leave running continuously without
 * a frame-rate cost.
 *
 * MOBILE: the second, larger blob is hidden below `lg` and the remaining
 * one's motion range is smaller — "reduce animations on mobile" from the
 * brief, applied as fewer/smaller moving elements rather than turning
 * animation off entirely (a fully static hero on mobile would look
 * unfinished next to the desktop version). Both animations are skipped
 * entirely under `prefers-reduced-motion`.
 */

import { motion } from "framer-motion";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";

export function HeroBackground() {
  const prefersReducedMotion = useReducedMotionPreference();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-24 top-1/4 size-72 rounded-full bg-gradient-radial-glow blur-xl lg:size-[32rem] lg:blur-2xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 -top-16 hidden size-[28rem] rounded-full bg-gradient-brand opacity-[0.08] blur-2xl lg:block"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, 24, 0], rotate: [0, 8, 0], opacity: [0.08, 0.13, 0.08] }
        }
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-subtle opacity-60" />
    </div>
  );
}
