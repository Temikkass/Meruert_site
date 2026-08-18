import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { FaqAccordion } from "@/components/shared/faq/FaqAccordion";
import { faq } from "@/config/faq";
import type { Locale, ProjectId, SectionCopy } from "@/types";

/**
 * components/sections/FaqPreviewSection.tsx
 * ----------------------------------------------------------------------------
 * Passes `project` straight through to `<FaqAccordion>`, which already
 * filters to `project: "shared"` entries plus that project's own (see that
 * component's header comment) — the homepage passes no `project` (only
 * "shared" questions show); each project page passes its own id.
 */
export function FaqPreviewSection({
  content,
  project,
  id = "faq",
  locale = "en",
}: {
  content: SectionCopy;
  project?: ProjectId;
  id?: string;
  locale?: Locale;
}) {
  return (
    <AnimatedSection id={id} background="card">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow={content.eyebrow?.[locale]}
          heading={content.heading[locale]}
          subtitle={content.subtitle?.[locale]}
          align="center"
        />

        <div className="mt-10">
          <FaqAccordion items={faq} project={project} locale={locale} />
        </div>
      </Container>
    </AnimatedSection>
  );
}
