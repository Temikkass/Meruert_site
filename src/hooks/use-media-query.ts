"use client";

/**
 * hooks/use-media-query.ts
 * ----------------------------------------------------------------------------
 * Thin wrapper around matchMedia. Used sparingly — most responsive behavior
 * should be CSS (Tailwind breakpoints), not JS. This exists for the rare
 * cases where a component's *behavior* (not just its styling) needs to
 * change across breakpoints — e.g. Embla Carousel's options object, or
 * disabling a parallax effect below `lg`.
 *
 * Built on `useSyncExternalStore`, which is what React provides for exactly
 * this shape of problem: a value that lives outside React, needs a
 * subscription, and needs a distinct server snapshot. The earlier version
 * seeded `useState(false)` and corrected it from an effect, which meant every
 * consumer rendered once with the wrong answer and then again with the right
 * one. `useSyncExternalStore` reads the true value during the first client
 * render instead, so there is no cascading second pass — and React 19's
 * `react-hooks/set-state-in-effect` rule flags the old pattern for that
 * reason.
 */

import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onStoreChange);
      return () => mediaQueryList.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  // `false` on the server: this hook only runs in Client Components, and a
  // mobile-first, no-JS render is the safe assumption to hydrate against.
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
