import Image from "next/image";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { Card } from "@/components/ui/card";
import { certificates } from "@/config/certificates";
import type { Locale, SectionCopy } from "@/types";

/**
 * components/sections/CertificatesSection.tsx
 * ----------------------------------------------------------------------------
 * Placeholder content, per the brief (see config/certificates.ts) — built
 * on the base `<Card>` primitive rather than a new certificate-specific
 * component, since a certificate tile is just an image + two lines of
 * text, not different enough from a plain card to justify one.
 */
export function CertificatesSection({ content, locale = "en" }: { content: SectionCopy; locale?: Locale }) {
  return (
    <AnimatedSection id="certificates">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow?.[locale]}
          heading={content.heading[locale]}
          subtitle={content.subtitle?.[locale]}
          align="center"
        />

        <StaggerGroup className="mt-12" staggerDelay={0.1}>
          <Grid cols={3}>
            {certificates.map((certificate) => (
              <StaggerItem key={certificate.id}>
                <Card surface="default" padding="sm" hover="lift" className="overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      src={certificate.image.src}
                      alt={certificate.image.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 flex flex-col gap-1">
                    <p className="font-display text-body-md font-semibold text-ink">
                      {certificate.title[locale]}
                    </p>
                    {certificate.issuer && (
                      <p className="text-body-sm text-ink-muted">{certificate.issuer[locale]}</p>
                    )}
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Grid>
        </StaggerGroup>
      </Container>
    </AnimatedSection>
  );
}
