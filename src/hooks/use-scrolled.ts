"use client";

/**
 * hooks/use-scrolled.ts
 * ----------------------------------------------------------------------------
 * Backs the Navbar's transparent → blurred-glass transition. A plain
 * scroll listener (not IntersectionObserver — there's no target element
 * here, just a raw scroll offset) with a threshold, throttled via
 * requestAnimationFrame so it doesn't run the state update on every
 * scroll-fired pixel.
 */

import { useEffect, useState } from "react";

export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        ticking = false;
      });
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
