/**
 * components/sections/ProjectHero.tsx
 * ----------------------------------------------------------------------------
 * Reused by both the Financial Literacy and Tours/Courses pages — same
 * structure and motion, different `project`/`content` props. Where the
 * homepage's `<Hero>` introduces the PERSON, this introduces the PROJECT:
 * `project.heroImage` instead of a portrait, and the contact channel
 * buttons (Instagram/Telegram/WhatsApp) right in the hero rather than
 * generic CTAs — a visitor who lands directly on a project page (from a
 * social bio link, say) can act immediately without hunting for contact
 * info.
 *
 * Each project page wraps its `<main>` in `data-project={project.id}`
 * (done once, at the page level — see app/financial-literacy/page.tsx),
 * so every `accent`-based color in this component and everything below it
 * automatically resolves to that project's tint (see globals.css's
 * `[data-project]` utilities). This component itself does no per-project
 * color branching.
 */

import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import { Parallax } from "@/components/animations/Parallax";
import { TextReveal } from "@/components/animations/TextReveal";
import { Eyebrow } from "@/components/shared/content/Eyebrow";
import { SocialButton } from "@/components/shared/buttons/SocialButton";
import { socialLabel } from "@/lib/social";
import { WhatsAppButton } from "@/components/shared/buttons/WhatsAppButton";
import { fadeUp, imageReveal } from "@/lib/animations/variants";
import { Container } from "@/components/layout/Container";
import type { Locale, Project, SectionCopy } from "@/types";

export function ProjectHero({
  project,
  content,
  locale = "en",
}: {
  project: Project;
  content: SectionCopy & { intro: import("@/types").LocalizedText };
  locale?: Locale;
}) {
  const { instagram, telegram, whatsapp } = project.contacts;

  return (
    <section className="relative overflow-hidden pb-16 pt-[calc(env(safe-area-inset-top)+7rem)] sm:pb-20 sm:pt-[calc(env(safe-area-inset-top)+8rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-subtle opacity-70" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="order-2 flex flex-col gap-6 lg:order-1">
            <Reveal variants={fadeUp}>
              <Eyebrow>{content.eyebrow?.[locale]}</Eyebrow>
            </Reveal>

            <TextReveal
              text={content.heading[locale]}
              as="h1"
              className="text-display-lg font-display font-semibold leading-display tracking-display text-ink"
            />

            <Reveal variants={fadeUp} delay={0.15}>
              <p className="text-body-lg leading-body text-ink-muted text-measure">{content.intro[locale]}</p>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.3}>
              <div className="flex flex-wrap items-center gap-3">
                {instagram && (
                  <SocialButton
                    platform="instagram"
                    href={instagram.url}
                    label={socialLabel("instagram", locale)}
                  />
                )}
                {telegram && (
                  <SocialButton
                    platform="telegram"
                    href={telegram.url ?? `https://t.me/${telegram.username}`}
                    label={socialLabel("telegram", locale)}
                  />
                )}
                {whatsapp && <WhatsAppButton channel={whatsapp} locale={locale} />}
              </div>
            </Reveal>
          </div>

          <Reveal variants={imageReveal} className="order-1 lg:order-2">
            <Parallax strength={40}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                <Image
                  src={project.heroImage.src}
                  alt={project.heroImage.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Parallax>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
