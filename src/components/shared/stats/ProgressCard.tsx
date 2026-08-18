"use client";

/**
 * components/shared/stats/ProgressCard.tsx
 * ----------------------------------------------------------------------------
 * The "Progress Cards / Achievement Cards" from the brief — a labeled
 * metric with a filled progress bar that animates to its target length
 * once in view.
 *
 * PERFORMANCE: the bar animates `scaleX`, not `width`. Animating `width`
 * forces the browser to recompute layout on every frame (it's a layout
 * property); `scaleX` is a transform, so the browser can run the whole
 * animation on the compositor thread without ever touching layout — the
 * same visual result, materially cheaper. `transform-origin: left` makes
 * the scale grow rightward from the bar's start instead of from its
 * center, which is what makes it read identically to a width animation.
 */

import { motion } from "framer-motion";
import { Card, CardTitle } from "@/components/ui/card";
import { REVEAL_VIEWPORT_MARGIN } from "@/lib/constants";
import { transitions } from "@/lib/animations/transitions";

export interface ProgressCardProps {
  title: string;
  description?: string;
  percentage: number; // 0-100
  className?: string;
}

export function ProgressCard({ title, description, percentage, className }: ProgressCardProps) {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <Card hover="lift" className={className}>
      <div className="flex items-baseline justify-between">
        <CardTitle>{title}</CardTitle>
        <span className="font-data text-body-lg font-semibold text-accent">{clamped}%</span>
      </div>
      {description && <p className="mt-1 text-body-sm text-ink-muted">{description}</p>}

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full w-full origin-left rounded-full bg-gradient-brand"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: clamped / 100 }}
          viewport={{ once: true, margin: REVEAL_VIEWPORT_MARGIN }}
          transition={transitions.slow}
        />
      </div>
    </Card>
  );
}
