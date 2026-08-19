/**
 * components/sections/AboutPreview.tsx
 * ----------------------------------------------------------------------------
 * The homepage's introduction to the person — per the architecture's own
 * stated order ("The homepage introduces the person first"), this section
 * IS that introduction, not a teaser linking to a separate about page (none
 * exists). Reads person.biography/credentials/photo directly; no new
 * content type needed since person.ts already carries everything this
 * section shows.
 */

import Image from "next/image";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { fadeLeft, fadeRight } from "@/lib/animations/variants";
import type { Locale, Person, SectionCopy } from "@/types";

export function AboutPreview({
  content,
  person,
  locale = "en",
}: {
  content: SectionCopy;
  person: Person;
  locale?: Locale;
}) {
  return (
    <AnimatedSection id="about">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal variants={fadeRight} className="order-2 lg:order-1">
            <SectionHeading
              eyebrow={content.eyebrow?.[locale]}
              heading={content.heading[locale]}
              subtitle={content.subtitle?.[locale]}
            />

            <div className="mt-8 flex flex-col gap-5">
              {person.biography.map((paragraph, index) => (
                <p key={index} className="text-body-md leading-body text-ink-muted text-measure">
                  {paragraph[locale]}
                </p>
              ))}
            </div>

            <StaggerGroup className="mt-8 flex flex-wrap gap-2">
              {person.credentials.map((credential) => (
                <StaggerItem key={credential.label[locale]}>
                  <Badge variant="outline">
                    {credential.label[locale]}
                    {credential.year ? ` · ${credential.year}` : ""}
                  </Badge>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Reveal>

          <Reveal variants={fadeLeft} className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl shadow-md lg:max-w-none">
              <Image
                src={(person.photoAlt ?? person.photo).src}
                alt={(person.photoAlt ?? person.photo).alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </AnimatedSection>
  );
}
