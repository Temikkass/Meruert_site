import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

/**
 * components/shared/content/SectionHeading.tsx
 * ----------------------------------------------------------------------------
 * The eyebrow + heading + subtitle grouping that opens nearly every
 * section — offered as one component (rather than three separately
 * composed every time) so the spacing between them is consistent
 * everywhere it appears. A section that needs only the heading can still
 * omit `eyebrow`/`subtitle` individually.
 *
 * `align` defaults to "left" (the editorial reading pattern most sections
 * use); pass "center" for section types that read better balanced, like a
 * pricing/FAQ intro.
 */
export interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  headingAs?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  heading,
  subtitle,
  align = "left",
  className,
  headingAs = "h2",
}: SectionHeadingProps) {
  const HeadingTag = headingAs;

  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <HeadingTag className="text-display-md font-display font-semibold leading-display tracking-display text-ink">
        {heading}
      </HeadingTag>
      {subtitle && (
        <p className={cn("text-body-lg text-ink-muted leading-body", align === "left" && "text-measure")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
