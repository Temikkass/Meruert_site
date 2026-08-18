import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import type { LegalPageContent, Locale } from "@/types";

/**
 * components/sections/LegalContent.tsx
 * ----------------------------------------------------------------------------
 * Deliberately plain — a legal/policy page's job is to be read quickly and
 * trusted, not to showcase motion or imagery. No reveal animations beyond
 * the section's own fade-in, no cards; just generous type and hairline
 * dividers between sections. This is what the brief's "clean, reusable
 * template page" instruction means in practice: reusable because
 * `LegalPageContent` (types/legal.ts) isn't Privacy-Policy-specific, so a
 * Terms of Service page could reuse this exact component with a second
 * config object.
 */
export function LegalContent({ content, locale = "en" }: { content: LegalPageContent; locale?: Locale }) {
  const formattedDate = new Date(content.lastUpdated).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <AnimatedSection>
      <Container className="max-w-2xl">
        <p className="text-body-sm text-ink-muted">
          {content.lastUpdatedLabel[locale]}: {formattedDate}
        </p>
        <p className="mt-4 text-body-lg leading-body text-ink-muted">{content.intro[locale]}</p>

        <div className="mt-10 flex flex-col divide-y divide-border">
          {content.sections.map((section) => (
            <div key={section.id} className="py-8 first:pt-0 last:pb-0">
              <h2 className="font-display text-body-lg font-semibold text-ink">{section.heading[locale]}</h2>
              <div className="mt-3 flex flex-col gap-3">
                {section.body.map((paragraph, index) => (
                  <p key={index} className="text-body-md leading-body text-ink-muted">
                    {paragraph[locale]}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
