import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { StatCard } from "@/components/shared/stats/StatCard";
import { achievements } from "@/config/achievements";
import type { Locale, SectionCopy } from "@/types";

export function AchievementsSection({ content, locale = "en" }: { content: SectionCopy; locale?: Locale }) {
  return (
    <AnimatedSection id="achievements" background="gradient">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow?.[locale]}
          heading={content.heading[locale]}
          subtitle={content.subtitle?.[locale]}
          align="center"
        />

        <StaggerGroup className="mt-10" staggerDelay={0.1}>
          <Grid cols={4} className="text-center">
            {achievements.map((statistic) => (
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
