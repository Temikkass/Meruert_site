import { cn } from "@/lib/utils";

/**
 * components/shared/content/Eyebrow.tsx
 * ----------------------------------------------------------------------------
 * The small, tracked-out label above a section heading ("OUR APPROACH",
 * "FINANCIAL LITERACY") — uses the dedicated `--text-eyebrow` token and
 * `--tracking-eyebrow` letter-spacing (globals.css) rather than a generic
 * `text-xs uppercase tracking-wide`, so this specific editorial detail is
 * controlled from one token pair.
 */
export function Eyebrow({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-eyebrow font-data font-semibold uppercase tracking-eyebrow text-accent",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
