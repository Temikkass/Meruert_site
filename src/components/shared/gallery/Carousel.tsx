"use client";

/**
 * components/shared/gallery/Carousel.tsx
 * ----------------------------------------------------------------------------
 * ONE Embla carousel, generic over its slide content — per the brief,
 * Embla backs testimonials, gallery, projects, and articles alike, and
 * those are just different children passed in (`<Carousel><ReviewCard />
 * <ReviewCard />...</Carousel>`), not four different carousel
 * implementations. Touch swipe and keyboard arrow-key navigation are both
 * Embla's built-in behavior; this wrapper adds the prev/next buttons and
 * dot indicators on top, styled to the token system.
 */

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselProps {
  children: React.ReactNode[];
  /** How many slides show at once, by breakpoint tier */
  slidesPerView?: { base: number; md?: number; lg?: number };
  loop?: boolean;
  showControls?: boolean;
  showDots?: boolean;
  className?: string;
}

export function Carousel({
  children,
  slidesPerView = { base: 1, md: 2, lg: 3 },
  loop = false,
  showControls = true,
  showDots = true,
  className,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, align: "start", skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const basisClass = cn(
    slidesPerView.base === 1 && "flex-[0_0_100%]",
    slidesPerView.base === 2 && "flex-[0_0_50%]",
    slidesPerView.md === 2 && "md:flex-[0_0_50%]",
    slidesPerView.md === 3 && "md:flex-[0_0_33.333%]",
    slidesPerView.lg === 3 && "lg:flex-[0_0_33.333%]",
    slidesPerView.lg === 4 && "lg:flex-[0_0_25%]"
  );

  return (
    <div className={className}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex touch-pan-y">
          {children.map((child, index) => (
            <div key={index} className={cn("min-w-0 pl-4", basisClass)}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {(showControls || showDots) && (
        <div className="mt-6 flex items-center justify-between">
          {showDots && (
            <div className="flex gap-2" role="tablist" aria-label="Carousel pagination">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={index === selectedIndex}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-base ease-standard",
                    index === selectedIndex ? "w-6 bg-accent" : "w-1.5 bg-border"
                  )}
                />
              ))}
            </div>
          )}

          {showControls && (
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!loop && selectedIndex === 0}
                className="flex size-button-md items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-hover disabled:opacity-30"
              >
                <ChevronLeft className="size-icon-sm" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => emblaApi?.scrollNext()}
                disabled={!loop && selectedIndex === scrollSnaps.length - 1}
                className="flex size-button-md items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-hover disabled:opacity-30"
              >
                <ChevronRight className="size-icon-sm" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
