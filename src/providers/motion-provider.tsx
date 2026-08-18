"use client";

/**
 * providers/motion-provider.tsx
 * ----------------------------------------------------------------------------
 * `MotionConfig reducedMotion="user"` is set exactly once, here, and applies
 * to every Framer Motion component in the tree below it. With this set,
 * Framer automatically disables transform/layout animation (and keeps
 * opacity fades) whenever the OS-level "reduce motion" preference is on —
 * this is why the individual presets in lib/animations/variants.ts don't
 * each need their own reduced-motion branch.
 */

import { MotionConfig } from "framer-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
