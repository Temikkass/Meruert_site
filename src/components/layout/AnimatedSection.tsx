"use client";

/**
 * components/layout/AnimatedSection.tsx
 * ----------------------------------------------------------------------------
 * `<Section>` plus the `sectionTransition` reveal, pre-wired — the default
 * choice for a top-level page section. Use plain `<Section>` directly only
 * when a section needs to skip the reveal entirely (e.g. content that must
 * be visible for an SEO crawler snapshot with no JS, though the reveal
 * already only hides content after hydration — see the note below).
 *
 * Server/Client note: this must be a Client Component (Framer Motion), but
 * the CONTENT passed as `children` can still be a Server Component — Next
 * allows passing Server Component output as `children` into a Client
 * Component boundary. Section authors don't lose server rendering by using
 * this wrapper.
 */

import { motion } from "framer-motion";
import { sectionTransition } from "@/lib/animations/variants";
import { REVEAL_VIEWPORT_MARGIN } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { SectionProps } from "./Section";

export function AnimatedSection({ as = "section", background = "canvas", className, children, ...props }: SectionProps) {
  const sharedClassName = cn(
    "py-section-sm md:py-section-md lg:py-section-lg",
    background === "card" && "bg-card",
    background === "gradient" && "bg-gradient-subtle",
    className
  );
  const sharedProps = {
    className: sharedClassName,
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, margin: REVEAL_VIEWPORT_MARGIN },
    variants: sectionTransition,
    ...(props as Omit<React.ComponentProps<typeof motion.div>, "className">),
  };

  // Explicit branch (rather than `motion[as]`) — indexing `motion` with a
  // union tag type collapses its ref type to `Ref<HTMLElement>`, which then
  // fails to satisfy either `<section>` or `<div>`'s own ref type.
  if (as === "div") {
    return <motion.div {...sharedProps}>{children}</motion.div>;
  }
  return <motion.section {...sharedProps}>{children}</motion.section>;
}
