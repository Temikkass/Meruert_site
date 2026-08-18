"use client";

/**
 * components/shared/stats/AnimatedCounter.tsx
 * ----------------------------------------------------------------------------
 * Counts from 0 to `value` once the element scrolls into view, using a
 * manual requestAnimationFrame loop against an eased progress ratio rather
 * than Framer's `animate()` — for a single numeric tween triggered once,
 * this is fewer moving parts than wiring a MotionValue + change-listener +
 * local state, and it's trivial to short-circuit for reduced motion (jump
 * straight to the final value, no animation frames scheduled at all).
 *
 * REDUCED MOTION is handled by deriving the displayed number during render
 * rather than writing the final value into state from the effect. Same
 * result, one less render, and no synchronous setState in an effect body —
 * which React 19's `react-hooks/set-state-in-effect` rule flags.
 */

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";

export interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number; // ms
  className?: string;
}

export function AnimatedCounter({ value, prefix = "", suffix = "", duration = 1600, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotionPreference();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;

    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic — fast start, gentle settle, matches the system's
      // "entrance" easing feel without importing the CSS cubic-bezier here.
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, prefersReducedMotion]);

  const shown = prefersReducedMotion ? value : display;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toLocaleString()}
      {suffix}
    </span>
  );
}
