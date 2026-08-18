import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import type { Locale, Project, SectionCopy } from "@/types";

/**
 * components/sections/ProjectAboutSection.tsx
 * ----------------------------------------------------------------------------
 * Renders `project.description` (already on the shared `Project` type —
 * see types/project.ts) under section-level heading copy. Reused by both
 * project pages, differing only in which `project`/`content` they pass.
 */
export function ProjectAboutSection({
  project,
  content,
  locale = "en",
}: {
  project: Project;
  content: SectionCopy;
  locale?: Locale;
}) {
  return (
    <AnimatedSection id="about" background="card">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow={content.eyebrow?.[locale]}
          heading={content.heading[locale]}
          subtitle={content.subtitle?.[locale]}
          align="center"
        />

        <div className="mt-8 flex flex-col gap-5">
          {project.description.map((paragraph, index) => (
            <p key={index} className="text-body-md leading-body text-ink-muted">
              {paragraph[locale]}
            </p>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
