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

import { useEffect, useLayoutEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageTransition } from "@/lib/animations/variants";

/**
 * `useLayoutEffect` in the browser, `useEffect` on the server. React warns
 * about useLayoutEffect during SSR because it cannot run there; this keeps the
 * before-paint timing where it matters and stays quiet where it does not.
 */
const useBeforePaintEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Snaps to the top INSTANTLY when a new page mounts.
 *
 * Without it, Lenis intercepts the browser's own scroll-to-top-on-navigate and
 * eases it into a visible upward scroll, on top of the fade/blur/scale
 * transition already playing — two competing animations rather than one.
 * `immediate: true` bypasses Lenis's easing for this one call.
 *
 * WHY A CHILD COMPONENT, AND WHY BEFORE PAINT. Two timing bugs made
 * navigation from below the fold look like a glitch:
 *
 *  - As a plain `useEffect`, this ran a frame too late. The incoming page
 *    painted once at the OUTGOING page's scroll offset, every <Reveal> whose
 *    section was in view at that offset began animating, and only then did the
 *    scroll jump — putting different sections in view, which animated in turn.
 *    One animation started, cut off, and a second ran.
 *  - Keyed on `pathname` in the parent, it fired when the path changed, which
 *    with `mode="wait"` is the START of the outgoing page's exit — yanking the
 *    page still on screen up to the top before it faded out.
 *
 * Living inside the keyed element, its mount effect runs exactly once per
 * navigation, when the incoming page mounts and before it paints. The outgoing
 * page exits from where the reader left it, and the incoming one is already at
 * the top on its first frame, so the reveal observers fire once.
 */
function ScrollToTopOnMount() {
  useBeforePaintEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
  }, []);

  return null;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname} initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
        <ScrollToTopOnMount />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
