/**
 * providers/index.tsx
 * ----------------------------------------------------------------------------
 * Composes every provider into one `<AppProviders>` so app/layout.tsx stays
 * declarative (one wrapper, not a five-deep nesting pyramid) and so adding
 * or reordering a provider later is a one-file change.
 *
 * Order matters: ThemeProvider is outermost so theme class/localStorage
 * logic is available to everything, including the toaster's inline style
 * tokens. MotionProvider and SmoothScrollProvider are independent of each
 * other and of ThemeProvider, so their relative order has no effect.
 * ToastProvider and CustomCursor are both global fixed-position overlays
 * (not context providers in the technical sense) rendered as siblings of
 * `children`, not wrappers around it — same reasoning as ToastProvider
 * already had: neither should affect the layout of the page content.
 */

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { MotionProvider } from "./motion-provider";
import { SmoothScrollProvider } from "./smooth-scroll-provider";
import { ToastProvider } from "./toast-provider";
import { CustomCursor } from "./custom-cursor";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <SmoothScrollProvider>
          {children}
          <ToastProvider />
          <CustomCursor />
        </SmoothScrollProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}
