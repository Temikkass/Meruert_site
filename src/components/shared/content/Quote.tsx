import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

/**
 * components/shared/content/Quote.tsx
 * ----------------------------------------------------------------------------
 * A large, editorial pull-quote treatment — distinct from ReviewCard
 * (components/shared/cards), which is a compact testimonial-in-a-card.
 * This is for a single, standalone quote used as its own section moment
 * (e.g. a quote from the owner, not a client testimonial).
 */
export interface QuoteProps {
  children: string;
  attribution?: string;
  className?: string;
}

export function Quote({ children, attribution, className }: QuoteProps) {
  return (
    <blockquote className={cn("flex flex-col gap-6", className)}>
      <Icon name="quote" size="xl" className="text-accent-tint" />
      <p className="text-display-sm font-display font-medium leading-heading text-ink text-measure">
        &ldquo;{children}&rdquo;
      </p>
      {attribution && <footer className="text-body-sm text-ink-muted">— {attribution}</footer>}
    </blockquote>
  );
}
