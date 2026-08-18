"use client";

import { useState } from "react";
import { GalleryCard } from "./GalleryCard";
import { Lightbox } from "./Lightbox";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { maskReveal } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types";

/**
 * components/shared/gallery/GalleryGrid.tsx
 * ----------------------------------------------------------------------------
 * `layout="masonry"` uses a plain CSS multi-column layout (`columns-*` +
 * `break-inside-avoid`) rather than a JS masonry library — no measurement,
 * no reflow-on-resize logic, and it degrades to a perfectly normal reading
 * order if CSS columns aren't supported (they are, everywhere that
 * matters). `layout="grid"` is a standard even-row CSS grid for a more
 * uniform look. Both share the same lightbox-opening behavior.
 */
export interface GalleryGridProps {
  images: GalleryImage[];
  layout?: "grid" | "masonry";
  className?: string;
}

export function GalleryGrid({ images, layout = "grid", className }: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <StaggerGroup
        className={cn(
          layout === "grid"
            ? "grid grid-cols-2 gap-4 md:grid-cols-3"
            : "columns-2 gap-4 md:columns-3 [&>*]:mb-4",
          className
        )}
        staggerDelay={0.06}
      >
        {images.map((image, index) => (
          <StaggerItem key={image.id} variants={maskReveal} className={layout === "masonry" ? "break-inside-avoid" : undefined}>
            <GalleryCard
              image={image}
              onOpen={() => setOpenIndex(index)}
              aspectRatio={layout === "masonry" ? (index % 3 === 0 ? "portrait" : "landscape") : "square"}
            />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Lightbox images={images} index={openIndex} onIndexChange={setOpenIndex} />
    </>
  );
}
