"use client";

/**
 * hooks/use-anchor-click.ts
 * ----------------------------------------------------------------------------
 * `NavLink` (components/navigation) has this same anchor-vs-route
 * distinction built in for the nav bar specifically. This hook extracts
 * just the "smooth-scroll if it's an in-page anchor" behavior so any other
 * CTA — the Hero's buttons, the homepage CTA section — gets the same
 * Lenis-eased scroll for `href="/#projects"` links without duplicating the
 * detection logic, and without forcing every button to adopt NavLink's
 * nav-specific styling.
 */

import { useCallback } from "react";
import { scrollToSection } from "@/lib/scroll";
import { HEADER_OFFSET } from "@/lib/constants";

export function useAnchorClick(href: string) {
  const isAnchor = href.startsWith("/#");

  const onClick = useCallback(
    (event: React.MouseEvent) => {
      if (!isAnchor) return;
      event.preventDefault();
      scrollToSection(href.replace("/#", ""), HEADER_OFFSET);
    },
    [href, isAnchor]
  );

  return isAnchor ? onClick : undefined;
}
