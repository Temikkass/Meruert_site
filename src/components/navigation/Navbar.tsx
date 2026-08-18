"use client";

/**
 * components/navigation/Navbar.tsx
 * ----------------------------------------------------------------------------
 * ONE navbar, not separate desktop/mobile components — `<MobileMenu>`
 * (hidden `md:hidden`) and the inline link row (hidden below `md`) are two
 * branches of the same component so header height, logo, and scroll-blur
 * state never have to be kept in sync across two files.
 *
 * TRANSPARENT → GLASS ON SCROLL: `useScrolled()` flips a boolean once past
 * a small threshold; below it the bar is fully transparent (reads well
 * over a hero image), above it it becomes a glass surface with a hairline
 * border — the "Transparent/Blur Navigation" pairing from the brief,
 * implemented as two states of one bar rather than two components.
 *
 * ACTIVE SECTION INDICATOR / SCROLL SPY: `useActiveSection` (built in the
 * architecture phase) drives which NavLink shows the active underline.
 * Only anchor-style items participate in scroll-spy — project page links
 * are highlighted by route match instead, via `usePathname`.
 */

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { primaryNav } from "@/config/navigation";
import { person } from "@/config/person";
import { useScrolled } from "@/hooks/use-scrolled";
import { useActiveSection } from "@/hooks/use-active-section";
import { NavLink } from "./NavLink";
import { MobileMenu } from "./MobileMenu";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function Navbar({ locale = "en" }: { locale?: Locale }) {
  const scrolled = useScrolled();
  const pathname = usePathname();

  const anchorSectionIds = useMemo(
    () => primaryNav.filter((item) => item.href.startsWith("/#")).map((item) => item.href.replace("/#", "")),
    []
  );
  const activeSectionId = useActiveSection(anchorSectionIds);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-base ease-standard",
        "pt-[env(safe-area-inset-top)]",
        scrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex h-button-lg items-center justify-between" aria-label="Primary">
          <Link href="/" className="font-display text-body-lg font-semibold text-ink">
            {person.fullName}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {primaryNav.map((item) => {
              const isAnchor = item.href.startsWith("/#");
              const active = isAnchor
                ? activeSectionId === item.href.replace("/#", "")
                : pathname === item.href;
              return <NavLink key={item.href} item={item} locale={locale} active={active} />;
            })}
          </div>

          <MobileMenu locale={locale} />
        </nav>
      </Container>
    </header>
  );
}
