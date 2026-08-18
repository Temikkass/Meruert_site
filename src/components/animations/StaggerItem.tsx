"use client";

/**
 * components/animations/StaggerItem.tsx
 * ----------------------------------------------------------------------------
 * Deliberately has no `initial`/`whileInView`/`viewport` of its own — it
 * inherits its animate state from the nearest ancestor <StaggerGroup>.
 * Adding those props here would make this item trigger independently on
 * its own scroll position instead of as part of the group's sequence,
 * silently breaking the stagger effect. If you need a single element to
 * reveal on its own, use <Reveal> instead.
 */

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations/variants";
import type { Variants } from "framer-motion";

export interface StaggerItemProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
}

export function StaggerItem({ children, variants = fadeUp, className }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
