"use client";

/**
 * hooks/use-active-section.ts
 * ----------------------------------------------------------------------------
 * Drives the nav's "current section" highlight state via IntersectionObserver
 * rather than scroll-position math — cheaper (no scroll-event thrashing),
 * and naturally correct regardless of section height. Built now, ahead of
 * the nav component itself, because the navigation feature depends on it
 * and it has no dependency on any not-yet-built component.
 */

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
