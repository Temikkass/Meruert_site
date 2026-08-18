import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { GalleryPreviewGallery } from "./GalleryPreviewGallery";
import { gallery } from "@/config/gallery";
import type { Locale, ProjectId, SectionCopy } from "@/types";

/**
 * components/sections/GalleryPreviewSection.tsx
 * ----------------------------------------------------------------------------
 * Reused by the homepage (no `project` — shows only "shared"-tagged
 * images) and by both project pages (`project` set — shows that project's
 * images plus any "shared" ones), same filtering convention as FaqAccordion.
 */
export function GalleryPreviewSection({
  content,
  project,
  id = "gallery",
  locale = "en",
}: {
  content: SectionCopy;
  project?: ProjectId;
  id?: string;
  locale?: Locale;
}) {
  const images = project ? gallery.filter((image) => image.project === "shared" || image.project === project) : gallery;
  if (images.length === 0) return null;

  return (
    <AnimatedSection id={id}>
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow?.[locale]}
          heading={content.heading[locale]}
          subtitle={content.subtitle?.[locale]}
          align="center"
        />

        <div className="mt-12">
          <GalleryPreviewGallery images={images} />
        </div>
      </Container>
    </AnimatedSection>
  );
}
