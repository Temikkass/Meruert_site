"use client";

/**
 * components/shared/gallery/Lightbox.tsx
 * ----------------------------------------------------------------------------
 * Built on Radix Dialog (via ui/dialog.tsx's Root/Portal, custom full-
 * bleed content here) for focus trap + Escape-to-close + scroll lock.
 * Arrow-key navigation is added on top for keyboard users; touch users get
 * native horizontal swipe via `overflow-x` + `scroll-snap`, so no gesture
 * library is needed for "touch gestures" — the platform primitive already
 * does it accessibly.
 */

import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { VisuallyHiddenTitle } from "@/components/ui/dialog";
import type { GalleryImage } from "@/types";

export interface LightboxProps {
  images: GalleryImage[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
}

export function Lightbox({ images, index, onIndexChange }: LightboxProps) {
  const open = index !== null;
  const current = index !== null ? images[index] : undefined;

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (index === null) return;
      if (event.key === "ArrowRight") onIndexChange((index + 1) % images.length);
      if (event.key === "ArrowLeft") onIndexChange((index - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, index, images.length, onIndexChange]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !next && onIndexChange(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in" />
        <DialogPrimitive.Content className="fixed inset-0 z-50 flex items-center justify-center p-gutter">
          <VisuallyHiddenTitle>Image gallery</VisuallyHiddenTitle>

          <DialogPrimitive.Close className="absolute right-4 top-[calc(env(safe-area-inset-top)+1rem)] flex size-button-md items-center justify-center rounded-full text-surface transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <X className="size-icon-md" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {current && (
            <div className="relative aspect-[4/3] w-full max-w-4xl">
              <Image
                src={current.image.src}
                alt={current.image.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
          )}

          {images.length > 1 && index !== null && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => onIndexChange((index - 1 + images.length) % images.length)}
                className="absolute left-2 top-1/2 flex size-button-md -translate-y-1/2 items-center justify-center rounded-full text-surface transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-6"
              >
                <ChevronLeft className="size-icon-md" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => onIndexChange((index + 1) % images.length)}
                className="absolute right-2 top-1/2 flex size-button-md -translate-y-1/2 items-center justify-center rounded-full text-surface transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-6"
              >
                <ChevronRight className="size-icon-md" />
              </button>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
