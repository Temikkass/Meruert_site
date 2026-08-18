"use client";

/**
 * providers/theme-provider.tsx
 * ----------------------------------------------------------------------------
 * Thin wrapper around next-themes so app/layout.tsx imports one local,
 * project-owned component rather than the library directly — if the theming
 * library is ever swapped, only this file changes.
 *
 * `attribute="class"` toggles a `.dark` class on <html>, which is what the
 * Tailwind v4 `@theme` dark-mode variant in globals.css keys off. Kept as a
 * Client Component (next-themes requires this) but everything downstream
 * of it (Server Components rendering the actual page content) is
 * unaffected — this provider only manages the class attribute + a
 * localStorage preference.
 */

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
