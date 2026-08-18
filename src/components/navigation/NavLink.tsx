"use client";

/**
 * components/navigation/NavLink.tsx
 * ----------------------------------------------------------------------------
 * Config-driven nav items (config/navigation.ts) mix two kinds of href:
 * in-page anchors ("/#about") and real routes ("/financial-literacy"). This
 * component is the one place that distinguishes them — anchors scroll via
 * lib/scroll.ts#scrollToSection (so they respect Lenis + reduced motion),
 * routes go through Next's <Link> for prefetching and client-side
 * navigation. Callers never need to know which kind of href they were
 * given.
 *
 * `active` drives the underline treatment and is computed by the parent
 * Navbar from the current route, so this component stays a plain,
 * cheap-to-render item.
 *
 * Route hrefs are run through `localizedPath` — config stores locale-free
 * paths ("/about"), and every real URL carries a `/{locale}` prefix.
 */

import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/scroll";
import { localizedPath } from "@/lib/routes";
import { HEADER_OFFSET } from "@/lib/constants";
import type { NavItem, Locale } from "@/types";

export interface NavLinkProps {
  item: NavItem;
  locale: Locale;
  active?: boolean;
  className?: string;
  onNavigate?: () => void;
}

export function NavLink({ item, locale, active = false, className, onNavigate }: NavLinkProps) {
  const isAnchor = item.href.startsWith("/#");

  const sharedClassName = cn(
    "relative text-body-sm font-medium text-ink-muted transition-colors duration-fast ease-standard hover:text-ink",
    "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-base after:ease-standard",
    "hover:after:w-full",
    active && "text-ink after:w-full",
    className
  );

  if (isAnchor) {
    const sectionId = item.href.replace("/#", "");
    return (
      <button
        type="button"
        className={sharedClassName}
        onClick={() => {
          scrollToSection(sectionId, HEADER_OFFSET);
          onNavigate?.();
        }}
      >
        {item.label[locale]}
      </button>
    );
  }

  return (
    <Link href={localizedPath(item.href, locale) as Route} className={sharedClassName} onClick={onNavigate}>
      {item.label[locale]}
    </Link>
  );
}
