"use client";

/**
 * components/ui/button.tsx
 * ----------------------------------------------------------------------------
 * Ten variants, five sizes (plus an icon-square size), all defined through
 * one `cva()` call — see the rationale for centralizing variants this way
 * in the comment just above `buttonVariants`. Every variant reads its
 * colors from the semantic tokens (`bg-primary`, `bg-secondary`, etc.) so a
 * future rebrand is a `config/theme.ts` edit, never a find-and-replace
 * across this file.
 *
 * MOTION: built on `motion.button` (not a plain `<button>`) so every
 * variant gets a consistent whileHover lift (scale 1.02) and whileTap press
 * (scale 0.97) for free — the "Hover"/"Press" states from the brief,
 * applied once rather than per-variant. `magnetic` is opt-in (see
 * hooks/use-magnetic.ts) — most buttons in a layout shouldn't all be
 * magnetic at once, or the page starts to feel restless rather than
 * premium.
 *
 * ACCESSIBILITY: disabled buttons use the native `disabled` attribute (not
 * just a visual style), so they're correctly skipped by keyboard nav and
 * announced as unavailable by screen readers. Loading state keeps the
 * button focusable but swaps its content for a spinner + `aria-busy`.
 */

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/use-magnetic";
import { transitions } from "@/lib/animations/transitions";
import { Icon } from "./icon";
import type { IconKey } from "@/types";

/**
 * WHY ONE cva() CALL INSTEAD OF TEN COMPONENTS
 * `<Button variant="glass" size="lg" />` is one mental model for every
 * button in the app. Ten separate components (`<GlassButton>`,
 * `<GradientButton>`...) would fragment that into ten APIs to remember and
 * ten places a shared fix (e.g. the focus ring) would need repeating.
 */
const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-display font-medium rounded-lg",
    "transition-colors duration-fast ease-standard",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-sm hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-hover",
        ghost: "bg-transparent text-ink hover:bg-hover",
        outline: "bg-transparent text-ink border border-border hover:bg-hover",
        glass: "glass text-ink hover:shadow-md",
        gradient: "bg-gradient-brand text-primary-foreground shadow-sm hover:shadow-glow",
        text: "bg-transparent text-accent underline-offset-4 hover:underline px-1",
        icon: "bg-transparent text-ink hover:bg-hover rounded-full",
        social: "bg-secondary text-secondary-foreground rounded-full hover:bg-accent hover:text-accent-foreground",
        cta: "bg-primary text-primary-foreground rounded-full shadow-glow hover:brightness-110",
      },
      size: {
        xs: "h-button-xs px-3 text-caption",
        sm: "h-button-sm px-4 text-body-sm",
        md: "h-button-md px-6 text-body-md",
        lg: "h-button-lg px-8 text-body-lg",
        xl: "h-button-xl px-10 text-display-sm",
        icon: "size-button-md p-0",
      },
    },
    compoundVariants: [
      // The `text` variant carries its own tight padding regardless of size
      // — a text-style button (e.g. "See all projects →") shouldn't inherit
      // a filled button's horizontal padding.
      { variant: "text", size: ["xs", "sm", "md", "lg", "xl"], class: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  /** Opt-in pointer-following hover effect — see hooks/use-magnetic.ts */
  magnetic?: boolean;
  leadingIcon?: IconKey;
  trailingIcon?: IconKey;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      magnetic = false,
      leadingIcon,
      trailingIcon,
      disabled,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const { ref: magneticRef, x, y, handlers, enabled: magneticEnabled } = useMagnetic({ strength: 10 });
    const iconSize = size === "xs" || size === "sm" ? "xs" : "sm";

    if (asChild) {
      // Slot path: no motion/magnetic wrapper, and leadingIcon/trailingIcon/
      // loading are NOT rendered here — Radix's Slot merges props onto a
      // single child element rather than composing extra sibling nodes
      // around it, so an icon for an asChild button must be included in
      // `children` directly by the caller (see ProjectCard for an example).
      // asChild is for rendering a Button-styled <Link>, and Next's <Link>
      // already handles its own interaction model. Consumers that want
      // motion on a link should wrap it in <Reveal> instead (see
      // components/animations).
      return (
        <Slot
          className={cn(buttonVariants({ variant, size }), className)}
          {...(props as React.ComponentProps<typeof Slot>)}
        >
          {children}
        </Slot>
      );
    }

    const content = (
      <>
        {loading ? (
          <Icon name="spinner" size={iconSize} className="animate-spin" decorative />
        ) : (
          leadingIcon && <Icon name={leadingIcon} size={iconSize} decorative />
        )}
        {size !== "icon" && children}
        {!loading && trailingIcon && <Icon name={trailingIcon} size={iconSize} decorative />}
        {size === "icon" && !loading && !leadingIcon && !trailingIcon && children}
      </>
    );

    return (
      <motion.button
        ref={(node) => {
          magneticRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={transitions.fast}
        style={magnetic && magneticEnabled ? { x, y } : undefined}
        onMouseMove={magnetic ? handlers.onMouseMove : undefined}
        onMouseLeave={magnetic ? handlers.onMouseLeave : undefined}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
