"use client";

/**
 * components/sections/HeroCtaButtons.tsx
 * ----------------------------------------------------------------------------
 * Split out from Hero.tsx (a Server Component) purely because
 * `useAnchorClick` is a hook — this is the one interactive sliver of the
 * hero, everything else in Hero.tsx renders on the server.
 */

import Link from "next/link";
import type { Route } from "next";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/animations/Magnetic";
import { useAnchorClick } from "@/hooks/use-anchor-click";
import { localizedPath } from "@/lib/routes";
import type { Link as ConfigLink, Locale } from "@/types";

export function HeroCtaButtons({
  primaryCta,
  secondaryCta,
  locale,
}: {
  primaryCta: ConfigLink;
  secondaryCta: ConfigLink;
  locale: Locale;
}) {
  const onPrimaryClick = useAnchorClick(primaryCta.href);
  const onSecondaryClick = useAnchorClick(secondaryCta.href);

  return (
    <>
      <Magnetic strength={10}>
        <Button asChild size="lg" variant="cta">
          <Link href={localizedPath(primaryCta.href, locale) as Route} onClick={onPrimaryClick}>
            {primaryCta.label[locale]}
          </Link>
        </Button>
      </Magnetic>
      <Button asChild size="lg" variant="outline">
        <Link href={localizedPath(secondaryCta.href, locale) as Route} onClick={onSecondaryClick}>
          {secondaryCta.label[locale]}
        </Link>
      </Button>
    </>
  );
}
