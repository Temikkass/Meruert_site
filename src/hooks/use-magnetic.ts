"use client";

/**
 * hooks/use-magnetic.ts
 * ----------------------------------------------------------------------------
 * The "magnetic" hover effect — an element subtly follows the cursor within
 * its own bounds, then springs back on mouse-leave. Implemented once, here,
 * because both the Button and Card systems offer it as an opt-in prop
 * (`magnetic`) and a bug or tuning change in the physics should only need
 * fixing in one place.
 *
 * DELIBERATELY DISABLED on touch devices and under prefers-reduced-motion —
 * "follows the cursor" has no meaning on touch, and the constant micro-
 * movement is exactly the class of motion the reduced-motion preference
 * exists to remove. In both cases this hook returns a static, zeroed
 * transform so the calling component doesn't need its own branch.
 */

import { useRef } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useReducedMotionPreference } from "./use-reduced-motion";
import { useMediaQuery } from "./use-media-query";

interface UseMagneticOptions {
  /** How far, in px, the element is allowed to travel toward the cursor */
  strength?: number;
}

interface UseMagneticResult {
  ref: React.RefObject<HTMLElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  handlers: {
    onMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave: () => void;
  };
  /** False on touch devices or with reduced motion on — callers can skip
   * wrapping in a motion element entirely when this is false. */
  enabled: boolean;
}

export function useMagnetic({ strength = 16 }: UseMagneticOptions = {}): UseMagneticResult {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotionPreference();
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const enabled = !prefersReducedMotion && !isCoarsePointer;

  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20, mass: 0.5 });

  function onMouseMove(event: React.MouseEvent<HTMLElement>) {
    if (!enabled || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const relativeX = event.clientX - (bounds.left + bounds.width / 2);
    const relativeY = event.clientY - (bounds.top + bounds.height / 2);
    x.set((relativeX / (bounds.width / 2)) * strength);
    y.set((relativeY / (bounds.height / 2)) * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, x, y, handlers: { onMouseMove, onMouseLeave }, enabled };
}
