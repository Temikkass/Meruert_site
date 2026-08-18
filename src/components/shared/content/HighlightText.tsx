import { cn } from "@/lib/utils";

/**
 * components/shared/content/HighlightText.tsx
 * ----------------------------------------------------------------------------
 * Inline emphasis for a key phrase inside a longer sentence — a soft
 * accent-tint underline rather than bold or a full background highlight,
 * matching the "quiet, editorial" visual language rather than shouting.
 * Use inline: `<p>Real <HighlightText>financial confidence</HighlightText>
 * starts here.</p>`
 */
export function HighlightText({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("text-ink underline decoration-accent-tint decoration-2 underline-offset-4", className)}>
      {children}
    </span>
  );
}
