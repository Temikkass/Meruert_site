"use client";

/**
 * providers/toast-provider.tsx
 * ----------------------------------------------------------------------------
 * Wraps sonner's <Toaster> with the site's own token values (rather than
 * sonner's default styling) so success/error toasts from the contact form
 * (react-hook-form + zod, built in the next phase) look native to this
 * design system instead of like a library default.
 */

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "var(--color-surface)",
          color: "var(--color-ink)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
        },
      }}
    />
  );
}
