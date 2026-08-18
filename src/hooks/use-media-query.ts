"use client";

/**
 * hooks/use-media-query.ts
 * ----------------------------------------------------------------------------
 * Thin wrapper around matchMedia. Used sparingly — most responsive behavior
 * should be CSS (Tailwind breakpoints), not JS. This exists for the rare
 * cases where a component's *behavior* (not just its styling) needs to
 * change across breakpoints — e.g. Embla Carousel's options object, or
 * disabling a parallax effect below `lg`.
 */

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  // Default to `false` on the server — this hook is only ever called from
  // Client Components, and this default avoids a hydration mismatch by
  // matching what a mobile-first, no-JS render would show.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
