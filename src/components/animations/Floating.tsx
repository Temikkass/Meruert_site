"use client";

/**
 * components/animations/Floating.tsx
 * ----------------------------------------------------------------------------
 * Wraps the `floating` preset (lib/animations/variants.ts) — a continuous
 * loop, so this is applied via `animate` directly rather than
 * `whileInView`. Reserved for decorative elements (a background shape, a
 * badge icon) — never body copy or anything the user needs to read, since
 * a permanently moving text block is a readability problem, not a premium
 * detail.
 */

import { motion } from "framer-motion";
import { floating } from "@/lib/animations/variants";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";

export interface FloatingProps {
  children: React.ReactNode;
  className?: string;
}

export function Floating({ children, className }: FloatingProps) {
  const prefersReducedMotion = useReducedMotionPreference();

  return (
    <motion.div className={className} animate={prefersReducedMotion ? undefined : floating}>
      {children}
    </motion.div>
  );
}
