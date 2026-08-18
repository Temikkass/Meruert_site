"use client";

/**
 * components/navigation/LanguageSwitcher.tsx
 * ----------------------------------------------------------------------------
 * The control the trilingual content model was always missing: every string
 * in /config has carried `en`/`ru`/`kk` from the start, but until locale
 * routing existed there was no way for a visitor to reach any of it but the
 * one the page hardcoded.
 *
 * Switching preserves the current route (`swapLocale`, lib/routes.ts), so a
 * visitor reading /ru/tours-and-courses lands on /en/tours-and-courses and
 * not back at the homepage — losing someone's place is the fastest way to
 * make a language switch feel like a mistake they have to undo.
 *
 * Each option is a real <Link>, not an onClick handler, so the alternate
 * language versions are crawlable from every page and open-in-new-tab works.
 * `scroll={false}` keeps the reading position across the swap.
 *
 * Rendered as a plain button row rather than a dropdown: three options fit,
 * and a menu would add a Radix popover, a focus trap and an extra click to
 * choose between three items that are each two characters wide.
 */

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { languageSwitcherLabel } from "@/config/system";
import { localeNames, localeShortNames, locales } from "@/lib/locale";
import { swapLocale } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function LanguageSwitcher({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="group"
      aria-label={languageSwitcherLabel[locale]}
    >
      {locales.map((option) => {
        const isActive = option === locale;
        return (
          <Link
            key={option}
            href={swapLocale(pathname, option) as Route}
            hrefLang={option}
            lang={option}
            scroll={false}
            aria-current={isActive ? "true" : undefined}
            title={localeNames[option]}
            className={cn(
              "rounded-full px-2 py-1 text-caption font-semibold uppercase tracking-eyebrow transition-colors duration-fast ease-standard",
              isActive ? "bg-accent-tint text-ink" : "text-ink-muted hover:bg-hover hover:text-ink"
            )}
          >
            {localeShortNames[option]}
            <span className="sr-only"> — {localeNames[option]}</span>
          </Link>
        );
      })}
    </div>
  );
}
