import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { StatCard } from "@/components/shared/stats/StatCard";
import type { Locale, SectionCopy, Statistic } from "@/types";

/**
 * components/sections/StatisticsSection.tsx
 * ----------------------------------------------------------------------------
 * Renders every entry in config/statistics.ts regardless of `project` tag
 * — the homepage is neutral ground between both projects, so a stat
 * belonging to either one is still fair to show here (each project's own
 * page, built in a later phase, would filter to just its own).
 */
export function StatisticsSection({
  content,
  statistics,
  locale = "en",
}: {
  content: SectionCopy;
  statistics: Statistic[];
  locale?: Locale;
}) {
  return (
    <AnimatedSection background="gradient">
      <Container>
        {content.heading && (
          <SectionHeading
            eyebrow={content.eyebrow?.[locale]}
            heading={content.heading[locale]}
            align="center"
          />
        )}

        <StaggerGroup className="mt-10" staggerDelay={0.1}>
          <Grid cols={3} className="text-center">
            {statistics.map((statistic) => (
              <StaggerItem key={statistic.id} className="flex flex-col items-center">
                <StatCard statistic={statistic} locale={locale} />
              </StaggerItem>
            ))}
          </Grid>
        </StaggerGroup>
      </Container>
    </AnimatedSection>
  );
}
