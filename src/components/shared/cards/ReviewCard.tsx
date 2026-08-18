import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { Locale, Testimonial } from "@/types";

/**
 * components/shared/cards/ReviewCard.tsx
 * ----------------------------------------------------------------------------
 * A compact testimonial-in-a-card, for a grid or carousel of reviews (see
 * components/shared/gallery/Carousel.tsx, which any of these can be handed
 * to as slide content). Distinct from content/Quote.tsx, which is a single
 * large standalone pull-quote moment, not client-attributed content in a
 * repeatable card shape.
 */
export interface ReviewCardProps {
  testimonial: Testimonial;
  locale?: Locale;
  className?: string;
}

export function ReviewCard({ testimonial, locale = "en", className }: ReviewCardProps) {
  return (
    <Card surface="default" hover="lift" className={cn("flex h-full flex-col gap-5", className)}>
      {testimonial.rating && (
        <div className="flex gap-1 text-warning" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Icon
              key={index}
              name="star"
              size="sm"
              className={index < testimonial.rating! ? "fill-current" : "text-border"}
            />
          ))}
        </div>
      )}

      <p className="text-body-md leading-body text-ink">&ldquo;{testimonial.quote[locale]}&rdquo;</p>

      <div className="mt-auto flex items-center gap-3 pt-2">
        {testimonial.avatar && (
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
            <Image src={testimonial.avatar.src} alt={testimonial.avatar.alt} fill sizes="40px" className="object-cover" />
          </div>
        )}
        <div>
          <p className="text-body-sm font-medium text-ink">{testimonial.authorName}</p>
          {testimonial.authorRole && (
            <p className="text-caption text-ink-muted">{testimonial.authorRole[locale]}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
