"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * components/ui/dialog.tsx
 * ----------------------------------------------------------------------------
 * Backs the gallery Lightbox (see components/shared/gallery) and any
 * future modal — focus trap, Escape-to-close, and scroll lock are all
 * Radix behavior, not hand-rolled here.
 *
 * `DialogTitle` is required by Radix for accessibility (screen readers
 * announce it on open) even when a dialog is purely visual, like an image
 * lightbox — `VisuallyHiddenTitle` below wraps that pattern so callers
 * don't have to remember to add a visually-hidden title by hand every time.
 */

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { showCloseButton?: boolean }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
          "rounded-lg border border-border bg-surface p-card-md shadow-xl",
          "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-2 text-ink-muted transition-colors hover:bg-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <X className="size-icon-sm" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

/** For dialogs with no visible heading (e.g. the gallery lightbox) — keeps
 * the dialog accessible without adding a title on-screen. */
export function VisuallyHiddenTitle({ children }: { children: React.ReactNode }) {
  return (
    <DialogPrimitive.Title asChild>
      <VisuallyHidden>{children}</VisuallyHidden>
    </DialogPrimitive.Title>
  );
}
