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
 *
 * EXPECTED DEV WARNING — "Encountered a script tag while rendering React
 * component", pointing at the <NextThemesProvider> line below.
 *
 * next-themes renders an inline <script> that sets the theme class before
 * first paint, which is what prevents a flash of the wrong theme on load.
 * Switching language navigates across the [locale] segment, and since the
 * root layout lives inside that segment it remounts — so React re-creates
 * that <script> on the client, where browsers do not execute injected
 * scripts, and React says so.
 *
 * It is harmless here, and verified as such: the theme survives the switch
 * (the class is already on <html>, and next-themes' effects keep it in
 * sync), localStorage keeps the preference, and the toggle still works
 * afterwards. The warning is also development-only — a production build
 * logs nothing on the same navigation.
 *
 * Not worth engineering around: the only way to stop the remount is to move
 * the root layout out of the [locale] segment, which is exactly what lets
 * <html lang> be correct on every page.
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
