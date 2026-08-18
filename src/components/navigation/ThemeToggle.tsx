"use client";

/**
 * components/navigation/ThemeToggle.tsx
 * ----------------------------------------------------------------------------
 * The control that was missing: next-themes, providers/theme-provider.tsx and
 * a complete `.dark` token set in globals.css all shipped, but nothing in the
 * UI ever called `setTheme`, so the dark palette was unreachable — visitors
 * only ever saw it if their OS preference happened to select it. This is the
 * switch.
 *
 * MOUNT GUARD: `next-themes` cannot know the resolved theme during SSR (it
 * lives in localStorage / a media query), so rendering the real icon before
 * mount would guarantee a hydration mismatch. Until mounted we render the
 * same-sized button with a neutral icon — the layout never shifts, which is
 * the reason for reserving the box rather than returning null.
 */

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@/components/ui/icon";
import { themeToggleLabels } from "@/config/system";
import { defaultLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function ThemeToggle({
  locale = defaultLocale,
  className,
}: {
  locale?: Locale;
  className?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? themeToggleLabels.toLight[locale] : themeToggleLabels.toDark[locale];

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex size-button-md items-center justify-center rounded-full text-ink transition-colors hover:bg-hover",
        className
      )}
    >
      <Icon name={isDark ? "sun" : "moon"} size="md" />
    </button>
  );
}
