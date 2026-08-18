"use client";

/**
 * components/animations/TextReveal.tsx
 * ----------------------------------------------------------------------------
 * Splits its text children into words, each wrapped in an `overflow-hidden`
 * span so the per-word `textReveal` variant (a vertical mask slide, see
 * lib/animations/variants.ts) reads as the word rising up from behind its
 * own baseline — the "editorial headline" treatment referenced in the
 * brief, rather than a generic fade-up applied to the whole heading at once.
 *
 * Takes a plain string only (not arbitrary JSX children) — splitting JSX
 * into words reliably would need a much heavier implementation, and every
 * real headline this wraps is plain text content from a config file.
 *
 * WHY INLINE FLOW AND NOT FLEX
 * This used to render the heading as `display: flex` with each word a flex
 * item spaced by `pr-[0.25em]`, and no real space characters anywhere — a
 * flex container discards whitespace-only text nodes between its items, so
 * the spaces could not survive. That produced three separate defects:
 *   1. The heading's accessible name computed from content as one run-on
 *      word ("Buildingfinancialconfidence..."). An `aria-label` on the inner
 *      wrapper was meant to cover this, but `aria-label` is ignored on a
 *      generic <span> with no role, so it never applied — the site's primary
 *      <h1> announced as gibberish.
 *   2. Selecting and copying a headline produced the same run-on string.
 *   3. `display: flex` on a heading opts it out of normal text layout, so
 *      `text-align`, `text-wrap`, and inherited leading stopped applying and
 *      every caller had to pass `justify-*` classes to compensate.
 * Inline-block words separated by real space text nodes fix all three at
 * once, and the per-word mask animation is unchanged. No `aria-hidden` or
 * `aria-label` is needed now: name-from-content is simply correct.
 */

import { Fragment } from "react";
import { motion } from "framer-motion";
import { textReveal } from "@/lib/animations/variants";
import { REVEAL_VIEWPORT_MARGIN } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  wordClassName?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function TextReveal({
  text,
  as = "h2",
  className,
  wordClassName,
  staggerDelay = 0.06,
  once = true,
}: TextRevealProps) {
  const Tag = as;
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: REVEAL_VIEWPORT_MARGIN }}
        transition={{ staggerChildren: staggerDelay }}
      >
        {words.map((word, index) => (
          <Fragment key={index}>
            {/* A real space, not padding — this is what makes the heading
                readable to assistive tech and copyable by hand. */}
            {index > 0 && " "}
            {/* `align-bottom` because `overflow: hidden` moves an inline-block's
                baseline to its bottom margin edge; without it every masked word
                would sit low against unmasked inline content on the same line. */}
            <span className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span variants={textReveal} className={cn("inline-block", wordClassName)}>
                {word}
              </motion.span>
            </span>
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
