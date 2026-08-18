import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { ServiceCard } from "@/components/shared/cards/FeatureCard";
import type { Locale, ProjectOffering, SectionCopy } from "@/types";

/**
 * components/sections/OfferingsSection.tsx
 * ----------------------------------------------------------------------------
 * Renders a project's `offerings` (types/project.ts) as a `ServiceCard`
 * list — Financial's "Services" section and Travel's "Programs" overview
 * are the same shape (a project's offerings, browsed at a glance before
 * any detail sections), so both reuse this one component with different
 * `offerings`/`content`.
 */
export function OfferingsSection({
  offerings,
  content,
  id,
  locale = "en",
}: {
  offerings: ProjectOffering[];
  content: SectionCopy;
  id?: string;
  locale?: Locale;
}) {
  return (
    <AnimatedSection id={id}>
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow={content.eyebrow?.[locale]}
          heading={content.heading[locale]}
          subtitle={content.subtitle?.[locale]}
          align="center"
        />

        <StaggerGroup className="mt-12 flex flex-col gap-4" staggerDelay={0.1}>
          {offerings.map((offering) => (
            <StaggerItem key={offering.id}>
              <ServiceCard
                icon={offering.icon}
                title={offering.title[locale]}
                description={offering.description[locale]}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </AnimatedSection>
  );
}
