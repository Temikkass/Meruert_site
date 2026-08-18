import { cn } from "@/lib/utils";

/**
 * components/layout/Section.tsx
 * ----------------------------------------------------------------------------
 * Vertical rhythm between major page sections comes from ONE set of
 * responsive tokens (`--spacing-section-{sm,md,lg}`, config/theme.ts) via
 * this wrapper, so every section on every page shares the same editorial
 * whitespace rather than each section author picking their own `py-24`.
 *
 * Renders a semantic `<section>` by default — pass `as="div"` for the rare
 * non-landmark case.
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  /** Background: "canvas" (default, blends into the page) or "card" (a
   * subtly distinct panel — used to break up long homepage scroll into
   * visually separated zones without a hard divider line). */
  background?: "canvas" | "card" | "gradient";
}

export function Section({ as = "section", background = "canvas", className, children, ...props }: SectionProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "py-section-sm md:py-section-md lg:py-section-lg",
        background === "card" && "bg-card",
        background === "gradient" && "bg-gradient-subtle",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
