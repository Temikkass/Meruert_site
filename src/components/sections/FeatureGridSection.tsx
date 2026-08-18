import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { FeatureCard } from "@/components/shared/cards/FeatureCard";
import type { Locale, SectionCopy, ValueProposition } from "@/types";

/**
 * components/sections/FeatureGridSection.tsx
 * ----------------------------------------------------------------------------
 * A boxed `FeatureCard` grid — reused across three different content lists
 * (Financial's Learning Formats and Benefits, About's Mission & Values), so
 * three sections share one layout implementation instead of three
 * near-duplicates. The homepage's own "Why Choose Me" deliberately uses a
 * DIFFERENT layout (a numbered editorial list — see WhyChooseMe.tsx's
 * header comment) precisely so every icon+title+description list on the
 * site doesn't look identical; this boxed-grid treatment is this system's
 * second, equally valid pattern for the same kind of content.
 */
export function FeatureGridSection({
  items,
  content,
  columns = 3,
  background = "canvas",
  id,
  locale = "en",
}: {
  items: ValueProposition[];
  content: SectionCopy;
  columns?: 2 | 3;
  background?: "canvas" | "card" | "gradient";
  id?: string;
  locale?: Locale;
}) {
  return (
    <AnimatedSection id={id} background={background}>
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow?.[locale]}
          heading={content.heading[locale]}
          subtitle={content.subtitle?.[locale]}
          align="center"
        />

        <StaggerGroup className="mt-12" staggerDelay={0.1}>
          <Grid cols={columns}>
            {items.map((item) => (
              <StaggerItem key={item.id}>
                <FeatureCard icon={item.icon} title={item.title[locale]} description={item.description[locale]} />
              </StaggerItem>
            ))}
          </Grid>
        </StaggerGroup>
      </Container>
    </AnimatedSection>
  );
}
