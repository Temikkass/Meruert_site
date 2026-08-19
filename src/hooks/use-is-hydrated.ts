"use client";

/**
 * hooks/use-is-hydrated.ts
 * ----------------------------------------------------------------------------
 * `false` during SSR and the hydration pass, `true` from then on.
 *
 * The usual way to express this is `useState(false)` plus
 * `useEffect(() => setMounted(true), [])`, which React 19's
 * `react-hooks/set-state-in-effect` rule now flags: it schedules a second
 * render purely to record a fact React already knows.
 *
 * `useSyncExternalStore` states it directly instead — the server snapshot is
 * `false`, the client snapshot is `true`, and the value never changes
 * afterwards, so `subscribe` has nothing to listen to and returns a no-op
 * unsubscribe. No state, no effect, no extra render.
 *
 * Use this only for genuinely client-only facts (a `localStorage` theme, a
 * `matchMedia` result). Gating ordinary content behind it would hide that
 * content from the server-rendered HTML.
 */

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useIsHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
