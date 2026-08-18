import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { IconBox } from "@/components/shared/content/IconBox";
import { whyChooseMe } from "@/config/why-choose-me";
import type { Locale, SectionCopy } from "@/types";

/**
 * components/sections/WhyChooseMe.tsx
 * ----------------------------------------------------------------------------
 * Deliberately NOT a 3-column boxed card grid — that's the one arrangement
 * on this page that read as a generic "SaaS features" template on review.
 * Instead: a numbered editorial list, divided by hairlines, with a large
 * ghost index numeral per row (the Stripe/Linear "why us" pattern) — same
 * underlying data (config/why-choose-me.ts), same IconBox primitive from
 * the design system, just composed differently at the section level
 * rather than reaching for FeatureCard's boxed layout here.
 */
export function WhyChooseMe({ content, locale = "en" }: { content: SectionCopy; locale?: Locale }) {
  return (
    <AnimatedSection id="why-choose-me">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow={content.eyebrow?.[locale]}
          heading={content.heading[locale]}
          subtitle={content.subtitle?.[locale]}
          align="center"
        />

        <StaggerGroup className="mt-12 flex flex-col divide-y divide-border" staggerDelay={0.1}>
          {whyChooseMe.map((item, index) => (
            <StaggerItem key={item.id}>
              <div className="group flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:gap-8 lg:py-10">
                <span
                  aria-hidden
                  className="w-16 shrink-0 font-data text-display-md font-semibold text-border transition-colors duration-base ease-standard group-hover:text-accent-tint sm:w-24"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <IconBox icon={item.icon} className="shrink-0" />
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-body-lg font-semibold text-ink">{item.title[locale]}</h3>
                  <p className="max-w-xl text-body-md leading-body text-ink-muted">{item.description[locale]}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </AnimatedSection>
  );
}
