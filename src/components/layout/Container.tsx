import { cn } from "@/lib/utils";

/**
 * components/layout/Container.tsx
 * ----------------------------------------------------------------------------
 * The ONE place page-width and horizontal gutter are decided
 * (`--container-max` / `--spacing-gutter`, config/theme.ts). Every section
 * wraps its content in this rather than repeating `max-w-[88rem] mx-auto
 * px-5` inline — a future width change is a token edit, not a find-and-
 * replace across every section component.
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rare escape hatch for a section that should bleed full-width (e.g. a
   * full-bleed gallery strip) while its inner content still aligns to the
   * standard container — wrap only the inner content in a nested
   * <Container> in that case. */
  fluid?: boolean;
}

export function Container({ className, fluid = false, ...props }: ContainerProps) {
  return (
    <div
      className={cn(!fluid && "mx-auto max-w-(--container-max) px-gutter", className)}
      {...props}
    />
  );
}
