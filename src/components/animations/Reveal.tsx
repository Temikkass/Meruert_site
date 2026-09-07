"use client";

/**
 * components/animations/Reveal.tsx
 * ----------------------------------------------------------------------------
 * The single wrapper every section/card/image in the site should reach for
 * to animate in on scroll. Takes any preset from lib/animations/variants.ts
 * (defaults to `reveal`, the "house style" entrance) so a section author
 * writes `<Reveal><SomeCard /></Reveal>` rather than repeating
 * `whileInView`/`viewport`/`variants` wiring in every component.
 *
 * `once` defaults to true — sections should reveal a single time as the
 * user scrolls down, not re-trigger every time they scroll back up past
 * it, which reads as glitchy rather than premium.
 *
 * `immediate` opts a block OUT of the entrance entirely: it renders visible
 * from the first frame. Use it for anything above the fold. A reveal only
 * means something for content the reader scrolls *to*; on a hero it fires the
 * instant the page mounts, so on every client-side navigation the page
 * appeared and then its heading animated in after it — which readers read as
 * the page loading a second time, not as a flourish. It also stops the
 * largest text on the page waiting for JavaScript before it can be painted.
 */

import { motion, type Variants } from "framer-motion";
import { reveal as revealVariants } from "@/lib/animations/variants";
import { REVEAL_VIEWPORT_MARGIN } from "@/lib/constants";

export interface RevealProps {
  children: React.ReactNode;
  variants?: Variants;
  /** Stagger index — set on children of a <StaggerGroup> so each one
   * inherits the group's stagger timing via Framer's variant propagation.
   * Left undefined for a standalone <Reveal>. */
  className?: string;
  once?: boolean;
  /** Delay, in seconds, before this element's entrance starts — useful for
   * hand-offset entrances outside a <StaggerGroup>. */
  delay?: number;
  /** Render visible immediately, with no entrance. For above-the-fold content. */
  immediate?: boolean;
  as?: keyof typeof motion;
}

export function Reveal({
  children,
  variants = revealVariants,
  className,
  once = true,
  delay,
  immediate = false,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;

  if (immediate) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: REVEAL_VIEWPORT_MARGIN }}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
