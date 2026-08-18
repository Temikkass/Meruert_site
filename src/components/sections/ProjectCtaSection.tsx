import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Reveal } from "@/components/animations/Reveal";
import { SocialButton } from "@/components/shared/buttons/SocialButton";
import { WhatsAppButton } from "@/components/shared/buttons/WhatsAppButton";
import { fadeUp } from "@/lib/animations/variants";
import type { Locale, Project, SectionCopy } from "@/types";

/**
 * components/sections/ProjectCtaSection.tsx
 * ----------------------------------------------------------------------------
 * The project-page equivalent of the homepage's `<CtaSection>` — but where
 * that one routes between the two projects (there's nowhere more specific
 * to send a homepage visitor), this one goes straight to the point: THIS
 * project's own Instagram/Telegram/WhatsApp, since the visitor is already
 * here. Reused by both project pages.
 */
export function ProjectCtaSection({
  project,
  content,
  locale = "en",
}: {
  project: Project;
  content: SectionCopy;
  locale?: Locale;
}) {
  const { instagram, telegram, whatsapp } = project.contacts;

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
            <p className="mt-4 text-body-lg leading-body text-ink-muted">{content.subtitle[locale]}</p>
          )}

          <Stack direction="row" gap={4} justify="center" className="mt-8 flex-wrap">
            {instagram && <SocialButton platform="instagram" href={instagram.url} />}
            {telegram && (
              <SocialButton platform="telegram" href={telegram.url ?? `https://t.me/${telegram.username}`} />
            )}
            {whatsapp && <WhatsAppButton channel={whatsapp} locale={locale} />}
          </Stack>
        </Reveal>
      </Container>
    </AnimatedSection>
  );
}
