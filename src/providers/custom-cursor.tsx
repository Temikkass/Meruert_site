"use client";

/**
 * providers/custom-cursor.tsx
 * ----------------------------------------------------------------------------
 * A small dot plus a lagged outer ring that scales up over interactive
 * elements — the restrained version of the "agency site" custom cursor
 * (Lusion/Cuberto/Dogstudio use a heavier version of the same idea).
 * Deliberately minimal: no cursor text, no inversion effects — just enough
 * presence to feel considered, never enough to get in the way.
 *
 * WHY THIS NEVER BREAKS USABILITY
 * - Renders nothing at all unless `(pointer: fine)` matches AND
 *   `prefers-reduced-motion` is off — checked before mount, not just
 *   styled away, so there's zero DOM/listener overhead on touch or
 *   reduced-motion devices in the first place.
 * - Every element this renders has `pointer-events-none` — the cursor is
 *   purely visual and can never intercept a click, hover, or drag meant
 *   for the real content underneath.
 * - The native cursor is only hidden (via a `cursor-none` class on
 *   `<html>`) AFTER this component has confirmed it's active and mounted
 *   — if JS fails to load or the check fails, the native cursor simply
 *   stays visible, which is the safe default, not a broken one.
 * - Hides itself on `mouseleave` from the document (e.g. cursor exits the
 *   browser window) so it never appears "stuck" at a stale position.
 *
 * PERFORMANCE: position is tracked via Framer Motion values (x/y), not
 * React state — the dot follows the raw mousemove 1:1, the ring follows
 * through a spring — both render as `translate3d` under the hood, so
 * neither triggers a React re-render or touches layout on any frame.
 */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, summary, [data-cursor="interactive"]';

export function CustomCursor() {
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const prefersReducedMotion = useReducedMotionPreference();
  const active = isFinePointer && !prefersReducedMotion;

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 300, damping: 30, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 300, damping: 30, mass: 0.5 });

  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add("cursor-none");

    function handleMouseMove(event: MouseEvent) {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      setVisible(true);
    }
    function handleMouseOver(event: MouseEvent) {
      const target = event.target as Element | null;
      setIsHoveringInteractive(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    }
    function handleMouseLeaveDocument() {
      setVisible(false);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveDocument);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveDocument);
    };
  }, [active, dotX, dotY]);

  if (!active) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] size-1.5 rounded-full bg-accent"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.15 } }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-accent/40"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHoveringInteractive ? 56 : 32,
          height: isHoveringInteractive ? 56 : 32,
          opacity: visible ? (isHoveringInteractive ? 0.6 : 0.3) : 0,
        }}
        transition={{ default: { duration: 0.25, ease: "easeOut" }, opacity: { duration: 0.15 } }}
      />
    </>
  );
}
