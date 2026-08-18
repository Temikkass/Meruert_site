"use client";

/**
 * components/layout/PageWrapper.tsx
 * ----------------------------------------------------------------------------
 * Applies the `pageTransition` preset (lib/animations/variants.ts) to a
 * page's content. Intended to be used inside a route's `template.tsx` once
 * pages exist (Next re-mounts `template.tsx` on every navigation, which is
 * what makes an exit animation possible — a plain `layout.tsx` persists
 * across routes and never unmounts, so it can't run an exit transition).
 * Built now, ahead of that phase, since the navigation and page-shell work
 * already depends on knowing this wrapper exists.
 */

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations/variants";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
      {children}
    </motion.div>
  );
}
