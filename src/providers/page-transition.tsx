"use client";

/**
 * providers/page-transition.tsx
 * ----------------------------------------------------------------------------
 * WHY THIS LIVES IN A PERSISTENT LAYOUT, NOT app/template.tsx
 * Next's special `template.tsx` file remounts on every navigation, which
 * gives an ENTER animation for free but can't show an EXIT animation —
 * AnimatePresence needs the outgoing element to still exist in a
 * component that ISN'T itself remounting in order to animate it out. So
 * this wrapper lives in `app/layout.tsx` (rendered once, persists across
 * navigations) and keys its child on `usePathname()` — when the pathname
 * changes, AnimatePresence sees the old keyed element removed and the new
 * one added, and can animate both.
 *
 * ONLY the page content transitions — `<Navbar>`/`<Footer>` are siblings
 * of this component in layout.tsx, outside what gets keyed/remounted, so
 * they stay visually stable across navigations instead of fading out and
 * back in with the page (which would read as broken chrome, not a
 * premium transition, and would also reset the navbar's own scroll-blur
 * and active-section state on every click for no reason).
 *
 * `initial={false}` skips the enter animation on first load — a fresh
 * page load should show content immediately, not blur/scale in; the
 * transition is for client-side navigations only.
 */

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageTransition } from "@/lib/animations/variants";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Snap to top INSTANTLY on every route change. Without this, Lenis
  // intercepts the browser's own scroll-to-top-on-navigate and eases it
  // into a visible upward scroll — on top of the fade/blur/scale
  // transition already playing, that reads as two competing animations
  // rather than one clean transition. `immediate: true` bypasses Lenis's
  // easing for this one call.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname} initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
