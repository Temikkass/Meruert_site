"use client";

/**
 * components/animations/Magnetic.tsx
 * ----------------------------------------------------------------------------
 * Button and Card (components/ui) already have a built-in `magnetic` prop
 * for the common case. This standalone wrapper is for everything else the
 * brief calls out for the effect that isn't a button or card — a nav
 * logo, a floating social icon, a small decorative element — via the same
 * shared hooks/use-magnetic.ts physics.
 */

import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/use-magnetic";

export interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 16, className }: MagneticProps) {
  const { ref, x, y, handlers, enabled } = useMagnetic({ strength });

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={enabled ? { x, y } : undefined}
      onMouseMove={handlers.onMouseMove}
      onMouseLeave={handlers.onMouseLeave}
    >
      {children}
    </motion.div>
  );
}
