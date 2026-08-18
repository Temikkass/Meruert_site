"use client";

/**
 * components/ui/card.tsx
 * ----------------------------------------------------------------------------
 * One base `<Card>` plus composable `<CardHeader> <CardTitle> <CardContent>
 * <CardFooter>` — the same shadcn-style composition pattern as the rest of
 * this system, so a specialized card (ProjectCard, ReviewCard, etc. — see
 * components/shared/cards) is this primitive plus content, never a
 * reimplementation of padding/radius/shadow from scratch.
 *
 * The brief's per-card feature list (hover, animated border, glow,
 * elevation, tilt-on-desktop, touch-friendly-on-mobile) is implemented as
 * PROPS on this one primitive rather than as separate card components —
 * `<Card glow tilt spotlight>` composes; `<GlowCard>`/`<TiltCard>` as
 * separate components would not.
 *
 * TILT and SPOTLIGHT are both disabled on touch automatically (via
 * useMediaQuery("(pointer: coarse)")) and under prefers-reduced-motion —
 * neither a 3D pointer-tilt nor a cursor-following light has meaning
 * without a mouse, and forcing either via touch would fight the page's
 * own scroll gesture.
 *
 * SPOTLIGHT PERFORMANCE: the cursor-follow light (`spotlight` prop) updates
 * via Framer Motion values + `useMotionTemplate`, not React state — the
 * radial-gradient position updates on every mousemove frame without ever
 * triggering a React re-render of this component or its children. Card is
 * used in high-multiplicity contexts (gallery grids, stat grids), so a
 * naive `useState`-per-mousemove implementation here would add up fast.
 */

import { forwardRef, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import { transitions } from "@/lib/animations/transitions";

const cardVariants = cva(["rounded-lg border transition-shadow duration-base ease-standard"], {
  variants: {
    surface: {
      default: "bg-card border-border shadow-xs",
      elevated: "bg-surface border-border shadow-md",
      glass: "glass border-transparent",
      outline: "bg-transparent border-border shadow-none",
    },
    padding: {
      sm: "p-card-sm",
      md: "p-card-md",
      lg: "p-card-lg",
    },
    hover: {
      none: "",
      lift: "hover:-translate-y-1 hover:shadow-lg",
      glow: "hover:shadow-glow",
      border: "hover:border-accent",
    },
  },
  defaultVariants: {
    surface: "default",
    padding: "md",
    hover: "none",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Subtle 3D pointer-tilt, desktop/mouse only — see file header comment */
  tilt?: boolean;
  /** Cursor-following soft light, desktop/mouse only — see file header comment */
  spotlight?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, surface, padding, hover, tilt = false, spotlight = false, children, ...props }, forwardedRef) => {
    const localRef = useRef<HTMLDivElement>(null);
    const isCoarsePointer = useMediaQuery("(pointer: coarse)");
    const prefersReducedMotion = useReducedMotionPreference();
    const tiltEnabled = tilt && !isCoarsePointer && !prefersReducedMotion;
    const spotlightEnabled = spotlight && !isCoarsePointer && !prefersReducedMotion;
    const trackingEnabled = tiltEnabled || spotlightEnabled;

    const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
    const spotlightX = useMotionValue(50);
    const spotlightY = useMotionValue(50);
    const spotlightBackground = useMotionTemplate`radial-gradient(28rem circle at ${spotlightX}% ${spotlightY}%, oklch(100% 0 0 / 0.08), transparent 70%)`;

    function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
      if (!trackingEnabled || !localRef.current) return;
      const bounds = localRef.current.getBoundingClientRect();
      const px = (event.clientX - bounds.left) / bounds.width - 0.5;
      const py = (event.clientY - bounds.top) / bounds.height - 0.5;

      if (tiltEnabled) {
        rotateY.set(px * 8); // max 4deg either way — subtle, never gimmicky
        rotateX.set(py * -8);
      }
      if (spotlightEnabled) {
        spotlightX.set((px + 0.5) * 100);
        spotlightY.set((py + 0.5) * 100);
      }
    }

    function onMouseLeave() {
      rotateX.set(0);
      rotateY.set(0);
    }

    return (
      <motion.div
        ref={(node) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={cn(cardVariants({ surface, padding, hover }), spotlightEnabled && "relative overflow-hidden", className)}
        style={tiltEnabled ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
        onMouseMove={trackingEnabled ? onMouseMove : undefined}
        onMouseLeave={tiltEnabled ? onMouseLeave : undefined}
        transition={transitions.fast}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        {spotlightEnabled && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-base ease-standard hover:opacity-100"
            style={{ background: spotlightBackground }}
          />
        )}
        <div className={spotlightEnabled ? "relative z-10" : undefined}>{children}</div>
      </motion.div>
    );
  }
);
Card.displayName = "Card";

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 mb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display text-body-lg font-semibold leading-heading text-ink", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-body-sm text-ink-muted leading-body", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-body-md text-ink-muted", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-3 mt-6", className)} {...props} />;
}

/** Optional decorative element for the "animated border" request — an
 * absolutely positioned gradient ring that fades in on hover via the
 * parent's `group` class (apply `group` on the <Card> using this). */
export function CardAnimatedBorder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-base group-hover:opacity-100",
        "bg-gradient-brand p-px [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude]",
        className
      )}
    />
  );
}
