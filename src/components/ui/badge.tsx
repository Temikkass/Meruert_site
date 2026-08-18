import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * components/ui/badge.tsx
 * ----------------------------------------------------------------------------
 * Covers both "Badge" and "Tag" from the brief — the same small pill shape
 * serves a status indicator (`variant="success"`) and a content tag
 * (`variant="outline"`); splitting them into two components would just be
 * the same markup with a different name.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-caption font-medium leading-none w-fit",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        accent: "bg-accent-tint text-accent",
        outline: "border border-border text-ink-muted",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        error: "bg-error/10 text-error",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
