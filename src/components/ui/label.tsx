"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

/**
 * components/ui/label.tsx
 * ----------------------------------------------------------------------------
 * Thin styled wrapper over Radix's Label — Radix supplies the actual
 * accessibility behavior (clicking the label focuses/activates its paired
 * control via `htmlFor`), this file only supplies the visual language.
 */
export function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-body-sm font-medium text-ink leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
