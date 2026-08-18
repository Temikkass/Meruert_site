import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { Carousel } from "@/components/shared/gallery/Carousel";
import { ReviewCard } from "@/components/shared/cards/ReviewCard";
import { reviews } from "@/config/reviews";
import type { Locale, ProjectId, SectionCopy } from "@/types";

/**
 * components/sections/TestimonialsSection.tsx
 * ----------------------------------------------------------------------------
 * Reused by the homepage (no `project` — shows every review) and by both
 * project pages as their "Success Stories"/"Reviews" section (`project`
 * set, so only that project's tagged reviews from config/reviews.ts show).
 */
export function TestimonialsSection({
  content,
  project,
  id = "testimonials",
  locale = "en",
}: {
  content: SectionCopy;
  project?: ProjectId;
  id?: string;
  locale?: Locale;
}) {
  const items = project ? reviews.filter((review) => review.project === project) : reviews;
  if (items.length === 0) return null;

  return (
    <AnimatedSection id={id} background="card">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow?.[locale]}
          heading={content.heading[locale]}
          subtitle={content.subtitle?.[locale]}
          align="center"
        />

        <div className="mt-12">
          <Carousel slidesPerView={{ base: 1, md: 2 }}>
            {items.map((testimonial) => (
              <ReviewCard key={testimonial.id} testimonial={testimonial} locale={locale} />
            ))}
          </Carousel>
        </div>
      </Container>
    </AnimatedSection>
  );
}
