/**
 * components/sections/Hero.tsx
 * ----------------------------------------------------------------------------
 * A Server Component — the only Client Components in this tree are the two
 * small islands that genuinely need interactivity: `HeroBackground`
 * (looping animation) and `HeroCtaButtons` (smooth-scroll click handling).
 * Everything else — the copy, the portrait, the layout — renders on the
 * server, per the brief's Server-Components-by-default requirement.
 *
 * MOBILE VS. DESKTOP LAYOUT: one JSX tree, not two components — mobile
 * stacks the portrait above the copy, centered; `lg:` reorders it beside
 * the copy instead (`order-*` + `grid-cols-[1.1fr_0.9fr]`). This keeps the
 * content identical (so there's exactly one source of truth for what the
 * hero says) while the *arrangement* genuinely differs, which is what the
 * brief actually asks for — a mobile hero that isn't just a shrunk desktop
 * one.
 *
 * The portrait uses `priority` (not lazy) — it's the largest above-the-fold
 * image and almost certainly the page's LCP element.
 */

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { HeroCtaButtons } from "./HeroCtaButtons";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Floating } from "@/components/animations/Floating";
import { Parallax } from "@/components/animations/Parallax";
import { TextReveal } from "@/components/animations/TextReveal";
import { Eyebrow } from "@/components/shared/content/Eyebrow";
import { fadeUp, imageReveal } from "@/lib/animations/variants";
import type { HeroContent, Locale, Person } from "@/types";

export function Hero({
  content,
  person,
  locale = "en",
}: {
  content: HeroContent;
  person: Person;
  locale?: Locale;
}) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[calc(env(safe-area-inset-top)+6rem)] pb-20"
    >
      <HeroBackground />

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Portrait — first on mobile (stacked), second on desktop (side-by-side) */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <Parallax strength={48} className="w-56 sm:w-72 lg:w-full lg:max-w-md">
              <Reveal variants={imageReveal}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-xl">
                  <Image
                    src={person.photo.src}
                    alt={person.photo.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 28rem, (min-width: 640px) 18rem, 14rem"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </Parallax>
          </div>

          {/* Copy */}
          <div className="order-2 flex flex-col items-center gap-6 text-center lg:order-1 lg:items-start lg:text-left">
            <Reveal variants={fadeUp}>
              <Eyebrow>{content.eyebrow[locale]}</Eyebrow>
            </Reveal>

            <TextReveal
              text={content.headline[locale]}
              as="h1"
              className="text-display-xl font-display font-semibold leading-display tracking-display text-ink"
            />

            <Reveal variants={fadeUp} delay={0.15}>
              <p className="text-body-lg text-ink-muted leading-body text-measure">{content.intro[locale]}</p>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <HeroCtaButtons primaryCta={content.primaryCta} secondaryCta={content.secondaryCta} locale={locale} />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      <div className="absolute inset-x-0 bottom-8 hidden flex-col items-center gap-2 sm:flex">
        <Floating>
          <ChevronDown className="size-icon-md text-ink-muted" aria-hidden />
        </Floating>
        <span className="text-caption uppercase tracking-eyebrow text-ink-muted">
          {content.scrollIndicatorLabel[locale]}
        </span>
      </div>
    </section>
  );
}
