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
  as?: keyof typeof motion;
}

export function Reveal({
  children,
  variants = revealVariants,
  className,
  once = true,
  delay,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;

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
