import Image from "next/image";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Eyebrow } from "@/components/shared/content/Eyebrow";
import { fadeLeft, fadeRight } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";
import type { Locale, ProjectOffering, SectionCopy } from "@/types";

/**
 * components/sections/ProjectOfferingDetail.tsx
 * ----------------------------------------------------------------------------
 * The Tours/Language Courses/Camps breakdown on the travel page is three
 * calls to this ONE component, each with a different `offering` and
 * `reverse` toggle — not three bespoke sections. `reverse` alternates
 * which side the image sits on, purely for visual rhythm across a run of
 * otherwise-identical section shapes (the same asymmetric-image technique
 * already used in AboutPreview).
 */
export function ProjectOfferingDetail({
  offering,
  content,
  reverse = false,
  locale = "en",
}: {
  offering: ProjectOffering;
  content: SectionCopy;
  reverse?: boolean;
  locale?: Locale;
}) {
  return (
    <AnimatedSection id={offering.id}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal
            variants={reverse ? fadeLeft : fadeRight}
            className={cn("order-2", reverse ? "lg:order-2" : "lg:order-1")}
          >
            <Eyebrow>{content.eyebrow?.[locale]}</Eyebrow>
            <h2 className="mt-3 text-display-sm font-display font-semibold leading-heading text-ink">
              {content.heading[locale]}
            </h2>
            <p className="mt-4 text-body-md leading-body text-ink-muted">{offering.description[locale]}</p>
          </Reveal>

          {offering.image && (
            <Reveal
              variants={reverse ? fadeRight : fadeLeft}
              className={cn("order-1", reverse ? "lg:order-1" : "lg:order-2")}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                <Image
                  src={offering.image.src}
                  alt={offering.image.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </AnimatedSection>
  );
}
