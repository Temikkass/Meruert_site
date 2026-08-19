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
import type { HomeContent, Locale, Project } from "@/types";

export function ProjectsSection({
  content,
  projects,
  locale = "en",
}: {
  content: HomeContent["projects"];
  projects: Project[];
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
          {projects.map((project) => (
            <StaggerItem key={project.id} variants={scaleIn}>
              <ProjectCard project={project} ctaLabel={content.cardCtaLabel[locale]} locale={locale} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </AnimatedSection>
  );
}
