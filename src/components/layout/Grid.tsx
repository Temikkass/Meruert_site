import { cn } from "@/lib/utils";

const colsClass = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
} as const;

const gapClass = { 4: "gap-4", 6: "gap-6", 8: "gap-8", 12: "gap-12" } as const;

/**
 * components/layout/Grid.tsx
 * ----------------------------------------------------------------------------
 * `cols` takes the FINAL (desktop) column count; the responsive step-down
 * for smaller viewports is baked into `colsClass` per the brief's
 * mobile-first requirement — a 3-column desktop grid is intentionally
 * 1-column on mobile and 2-column on tablet, not a naive `grid-cols-3`
 * that would cram three columns into a 360px viewport.
 */
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: keyof typeof colsClass;
  gap?: keyof typeof gapClass;
}

export function Grid({ cols = 3, gap = 6, className, ...props }: GridProps) {
  return <div className={cn("grid", colsClass[cols], gapClass[gap], className)} {...props} />;
}
