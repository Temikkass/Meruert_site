import { cn } from "@/lib/utils";

const gapClass = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  12: "gap-12",
  16: "gap-16",
} as const;

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  /** Gap, in the same steps as Tailwind's default spacing scale — kept to a
   * fixed set (rather than an arbitrary number) so spacing across the
   * component library stays on-rhythm. */
  gap?: keyof typeof gapClass;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
}

const alignClass = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" };
const justifyClass = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" };

/**
 * components/layout/Stack.tsx
 * ----------------------------------------------------------------------------
 * A flex wrapper for the extremely common "row/column of things with
 * consistent gap" layout — exists so that pattern is `<Stack gap={4}>`
 * instead of `flex flex-col gap-4` repeated at every call site (and so a
 * future global gap-scale change is one file).
 */
export function Stack({
  direction = "column",
  gap = 4,
  align,
  justify,
  wrap = false,
  className,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        gapClass[gap],
        align && alignClass[align],
        justify && justifyClass[justify],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    />
  );
}
