/**
 * components/sections/PageHeader.tsx
 * ----------------------------------------------------------------------------
 * Not every page needs the full-viewport, portrait-and-parallax Hero — a
 * utilitarian page like Contact or Privacy Policy calling for the same
 * scale of opening moment as the homepage would read as over-produced.
 * This is the "quiet" opening: eyebrow + heading + subtitle, generous top
 * padding for the fixed nav, a hairline bottom border. Same typography
 * tokens as Hero (so it's recognizably the same site), much smaller
 * footprint.
 */

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Eyebrow } from "@/components/shared/content/Eyebrow";
import { fadeUp } from "@/lib/animations/variants";
import type { Locale, SectionCopy } from "@/types";

export function PageHeader({ content, locale = "en" }: { content: SectionCopy; locale?: Locale }) {
  return (
    <section className="border-b border-border pb-12 pt-[calc(env(safe-area-inset-top)+7rem)] sm:pb-16 sm:pt-[calc(env(safe-area-inset-top)+8rem)]">
      <Container>
        <Reveal variants={fadeUp}>
          {content.eyebrow && <Eyebrow>{content.eyebrow[locale]}</Eyebrow>}
          <h1 className="mt-3 text-display-lg font-display font-semibold leading-display tracking-display text-ink">
            {content.heading[locale]}
          </h1>
          {content.subtitle && (
            <p className="mt-4 max-w-2xl text-body-lg leading-body text-ink-muted">{content.subtitle[locale]}</p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
