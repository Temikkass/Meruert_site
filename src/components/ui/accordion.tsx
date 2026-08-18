"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * components/ui/accordion.tsx
 * ----------------------------------------------------------------------------
 * The expand/collapse animation uses Radix's own `--radix-accordion-content-height`
 * CSS variable driving a `grid-template-rows` transition (via tw-animate-css's
 * accordion-down/up keyframes, already imported in globals.css) rather than
 * a Framer Motion height animation — animating to an unknown content height
 * with Framer requires a measured-height workaround; Radix already exposes
 * the exact value as a CSS variable, so plain CSS is both simpler and
 * cheaper here. Keyboard support (arrow keys, Home/End, Enter/Space) and
 * `aria-expanded` are handled by Radix itself.
 */

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("border-b border-border", className)} {...props} />;
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center justify-between gap-4 py-5 text-left",
          "font-display text-body-lg font-medium text-ink",
          "transition-colors duration-fast ease-standard hover:text-accent",
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-icon-sm shrink-0 text-ink-muted transition-transform duration-base ease-standard" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-body-md text-ink-muted leading-body data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-5", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
