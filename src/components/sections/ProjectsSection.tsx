/**
 * components/sections/ProjectsSection.tsx
 * ----------------------------------------------------------------------------
 * Two `<ProjectCard>`s (see components/shared/cards/ProjectCard.tsx) fed
 * directly by `financialProject`/`travelProject` — this section adds no
 * new card logic, it only decides layout and heading copy.
 */

import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { ProjectCard } from "@/components/shared/cards/ProjectCard";
import { scaleIn } from "@/lib/animations/variants";
import { financialProject } from "@/config/financial";
import { travelProject } from "@/config/travel";
import type { HomeContent, Locale } from "@/types";

export function ProjectsSection({
  content,
  locale = "en",
}: {
  content: HomeContent["projects"];
  locale?: Locale;
}) {
  return (
    <AnimatedSection id="projects" background="card">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow?.[locale]}
          heading={content.heading[locale]}
          subtitle={content.subtitle?.[locale]}
          align="center"
        />

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2" staggerDelay={0.12}>
          <StaggerItem variants={scaleIn}>
            <ProjectCard project={financialProject} ctaLabel={content.cardCtaLabel[locale]} locale={locale} />
          </StaggerItem>
          <StaggerItem variants={scaleIn}>
            <ProjectCard project={travelProject} ctaLabel={content.cardCtaLabel[locale]} locale={locale} />
          </StaggerItem>
        </StaggerGroup>
      </Container>
    </AnimatedSection>
  );
}
