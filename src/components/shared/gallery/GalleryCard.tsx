"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types";

/**
 * components/shared/gallery/GalleryCard.tsx
 * ----------------------------------------------------------------------------
 * A plain `<button>` (not a link) rendering one gallery tile — clicking it
 * opens the Lightbox at this image's index. `aspectRatio` lets the grid
 * mix orientations (a masonry-like feel) while every image still uses
 * Next's `fill` + explicit `sizes`, avoiding layout shift.
 */
export interface GalleryCardProps {
  image: GalleryImage;
  onOpen: () => void;
  aspectRatio?: "square" | "portrait" | "landscape";
  className?: string;
}

const aspectClass = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
};

export function GalleryCard({ image, onOpen, aspectRatio = "square", className }: GalleryCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative overflow-hidden rounded-md bg-muted",
        aspectClass[aspectRatio],
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        className
      )}
      aria-label={image.image.alt}
    >
      <Image
        src={image.image.src}
        alt={image.image.alt}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        loading="lazy"
        className="object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-ink/0 transition-colors duration-base group-hover:bg-ink/10" />
    </button>
  );
}
