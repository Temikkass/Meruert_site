"use client";

/**
 * components/sections/GalleryPreviewGallery.tsx
 * ----------------------------------------------------------------------------
 * "Gallery becomes carousel" on mobile, per the brief — implemented as two
 * responsive-toggled layouts of the SAME `GalleryCard` tiles sharing ONE
 * Lightbox instance (not two separate galleries with their own state),
 * so opening image 3 works identically regardless of which layout is
 * currently visible. Only one of the two layouts is ever visible at a
 * given viewport width (`hidden md:grid` / `md:hidden`), so there's no
 * duplicate visible content — just two arrangements of the same tiles,
 * matching how Hero.tsx handles its own mobile/desktop split.
 */

import { useState } from "react";
import { GalleryCard } from "@/components/shared/gallery/GalleryCard";
import { Carousel } from "@/components/shared/gallery/Carousel";
import { Lightbox } from "@/components/shared/gallery/Lightbox";
import type { GalleryImage } from "@/types";

export function GalleryPreviewGallery({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="hidden md:grid md:grid-cols-3 md:gap-4">
        {images.map((image, index) => (
          <GalleryCard key={image.id} image={image} onOpen={() => setOpenIndex(index)} aspectRatio="portrait" />
        ))}
      </div>

      <div className="md:hidden">
        <Carousel slidesPerView={{ base: 1 }} showControls={false}>
          {images.map((image, index) => (
            <GalleryCard key={image.id} image={image} onOpen={() => setOpenIndex(index)} aspectRatio="landscape" />
          ))}
        </Carousel>
      </div>

      <Lightbox images={images} index={openIndex} onIndexChange={setOpenIndex} />
    </>
  );
}
