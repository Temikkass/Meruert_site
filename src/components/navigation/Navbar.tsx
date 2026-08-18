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
 * ACTIVE LINK: highlighted by route match via `usePathname`.
 *
 * This used to also run a scroll-spy (`useActiveSection`) over any nav item
 * whose href started with "/#". No item in config/navigation.ts has ever
 * been an anchor — the nav is four real routes — so the filter always
 * produced an empty array and the hook observed nothing. Removed rather
 * than left in place looking load-bearing. In-page anchors elsewhere on the
 * site (the Hero CTAs' /#projects and /#contact) are unaffected: those go
 * through useAnchorClick + lib/scroll.ts, not through this.
 */

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import { primaryNav } from "@/config/navigation";
import { person } from "@/config/person";
import { useScrolled } from "@/hooks/use-scrolled";
import { NavLink } from "./NavLink";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { localizedPath } from "@/lib/routes";
import type { Locale } from "@/types";

export function Navbar({ locale = "en" }: { locale?: Locale }) {
  const scrolled = useScrolled();
  const pathname = usePathname();

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
          <Link href={localizedPath("/", locale) as Route} className="font-display text-body-lg font-semibold text-ink">
            {person.fullName}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {primaryNav.map((item) => (
              <NavLink key={item.href} item={item} locale={locale} active={pathname === item.href} />
            ))}
          </div>

          {/* Controls sit together on the right at every breakpoint; only the
              menu trigger itself is mobile-only. */}
          <div className="flex items-center gap-1">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle locale={locale} />
            <MobileMenu locale={locale} />
          </div>
        </nav>
      </Container>
    </header>
  );
}
