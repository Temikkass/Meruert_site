import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { Timeline } from "@/components/shared/timeline/Timeline";
import type { Locale, SectionCopy, TimelineEntry } from "@/types";

export function TimelineSection({
  content,
  timelineEntries,
  locale = "en",
}: {
  content: SectionCopy;
  timelineEntries: TimelineEntry[];
  locale?: Locale;
}) {
  return (
    <AnimatedSection id="timeline" background="card">
      <Container className="max-w-2xl">
        <SectionHeading
          eyebrow={content.eyebrow?.[locale]}
          heading={content.heading[locale]}
          subtitle={content.subtitle?.[locale]}
          align="center"
        />

        <div className="mt-12">
          <Timeline entries={timelineEntries} locale={locale} />
        </div>
      </Container>
    </AnimatedSection>
  );
}
