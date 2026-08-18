/**
 * components/sections/CtaSection.tsx
 * ----------------------------------------------------------------------------
 * The closing CTA deliberately does NOT invent a generic "contact us" form
 * or a shared WhatsApp number — the architecture's contacts are per-project
 * by design (see config/contacts.ts's header comment), and there is no
 * homepage-level contact channel to point to. Instead this CTA does the
 * honest thing for a two-project personal brand: it asks the visitor to
 * pick a project, each button routing straight into that project's own
 * page (and, eventually, that project's own contact channels).
 */

import Link from "next/link";
import type { Route } from "next";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Reveal } from "@/components/animations/Reveal";
import { Magnetic } from "@/components/animations/Magnetic";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations/variants";
import { financialProject } from "@/config/financial";
import { travelProject } from "@/config/travel";
import type { Locale, SectionCopy } from "@/types";

export function CtaSection({ content, locale = "en" }: { content: SectionCopy; locale?: Locale }) {
  return (
    <AnimatedSection id="contact" background="gradient">
      <Container className="max-w-2xl text-center">
        <Reveal variants={fadeUp}>
          <p className="text-eyebrow font-data font-semibold uppercase tracking-eyebrow text-accent">
            {content.eyebrow?.[locale]}
          </p>
          <h2 className="mt-3 text-display-md font-display font-semibold leading-display text-ink">
            {content.heading[locale]}
          </h2>
          {content.subtitle && (
            <p className="mt-4 text-body-lg text-ink-muted leading-body">{content.subtitle[locale]}</p>
          )}

          <Stack direction="row" gap={4} justify="center" className="mt-8 flex-wrap">
            <Magnetic strength={10}>
              <Button asChild size="lg" variant="cta">
                <Link href={`/${financialProject.slug}` as Route}>{financialProject.name[locale]}</Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="outline">
              <Link href={`/${travelProject.slug}` as Route}>{travelProject.name[locale]}</Link>
            </Button>
          </Stack>
        </Reveal>
      </Container>
    </AnimatedSection>
  );
}
