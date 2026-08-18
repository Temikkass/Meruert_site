/**
 * components/layout/StickySection.tsx
 * ----------------------------------------------------------------------------
 * A taller outer element (`height` prop, e.g. "200vh") containing a
 * `position: sticky` inner panel — the standard technique for "content
 * stays pinned while the user scrolls through a longer moment" (e.g. a
 * project's story unfolding as supporting stats/imagery cross-fade in
 * beside it via <Reveal>/<Parallax> children). Plain CSS position:sticky,
 * not a scroll-jacking library — this keeps native scroll (and Lenis)
 * behavior completely intact.
 */

import { cn } from "@/lib/utils";

export interface StickySectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Total scrollable height of the outer wrapper — must exceed 100vh for
   * the sticky effect to have room to play out. */
  height?: string;
  /** Distance from the top of the viewport the inner panel sticks to —
   * typically the fixed header's height (see lib/constants.ts#HEADER_OFFSET). */
  topOffset?: string;
}

export function StickySection({
  height = "200vh",
  topOffset = "0px",
  className,
  children,
  ...props
}: StickySectionProps) {
  return (
    <div style={{ height }} className="relative" {...props}>
      <div className={cn("sticky flex min-h-screen items-center", className)} style={{ top: topOffset }}>
        {children}
      </div>
    </div>
  );
}
