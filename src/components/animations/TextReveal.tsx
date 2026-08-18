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
 */

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
    <Tag className={cn("flex flex-wrap", className)}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: REVEAL_VIEWPORT_MARGIN }}
        transition={{ staggerChildren: staggerDelay }}
        className="flex flex-wrap"
        aria-label={text}
      >
        {words.map((word, index) => (
          <span key={index} className="overflow-hidden pb-1 pr-[0.25em]" aria-hidden>
            <motion.span variants={textReveal} className={cn("inline-block", wordClassName)}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
