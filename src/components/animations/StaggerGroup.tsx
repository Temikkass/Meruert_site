"use client";

/**
 * components/animations/StaggerGroup.tsx
 * ----------------------------------------------------------------------------
 * Pairs with <StaggerItem> (same directory). The group is the only element
 * that triggers on scroll (`whileInView`) and owns the `staggerChildren`
 * timing; each <StaggerItem> inside it only declares its own hidden/visible
 * shape and inherits the animate state from this parent via Framer's
 * variant propagation — that's why StaggerItem must NOT set its own
 * `initial`/`whileInView` (see that file's comment). Getting this
 * inheritance right is what makes a gallery grid or a row of offering
 * cards reveal as one considered sequence instead of N independent pops.
 */

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations/variants";
import { REVEAL_VIEWPORT_MARGIN } from "@/lib/constants";

export interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerGroup({ children, className, staggerDelay = 0.08, once = true }: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: REVEAL_VIEWPORT_MARGIN }}
      variants={staggerContainer(staggerDelay)}
    >
      {children}
    </motion.div>
  );
}
