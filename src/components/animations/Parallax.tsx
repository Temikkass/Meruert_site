"use client";

/**
 * components/animations/Parallax.tsx
 * ----------------------------------------------------------------------------
 * Scroll-linked movement — NOT scroll-triggered (that's <Reveal>). Uses
 * Framer's `useScroll` + `useTransform` against the element's own scroll
 * progress through the viewport, so it works whether the page uses native
 * scroll or the Lenis smooth-scroll provider (Lenis dispatches the same
 * native scroll events Framer's `useScroll` listens to).
 *
 * Disabled under prefers-reduced-motion — continuous scroll-linked motion
 * is exactly the category that preference exists to remove — and disabled
 * on coarse pointers by default via `mobileDisabled` (true by default),
 * since parallax on a small viewport tends to just look like jitter rather
 * than depth.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

export interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Total vertical travel, in px, across the element's scroll-through-viewport range */
  strength?: number;
  mobileDisabled?: boolean;
}

export function Parallax({ children, className, strength = 80, mobileDisabled = true }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotionPreference();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const disabled = prefersReducedMotion || (mobileDisabled && isMobile);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [strength / 2, -strength / 2]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={disabled ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
