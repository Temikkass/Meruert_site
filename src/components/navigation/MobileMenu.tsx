"use client";

/**
 * components/navigation/MobileMenu.tsx
 * ----------------------------------------------------------------------------
 * Built directly on Radix's Dialog primitive (not the centered-modal
 * `ui/dialog.tsx`) because a full-screen nav overlay needs different
 * positioning, but the same accessibility guarantees: focus trap while
 * open, Escape to close, scroll lock, and focus returned to the trigger
 * button on close — all Radix behavior, not hand-rolled here.
 *
 * Large touch targets (each link is a full-width row, comfortably over the
 * 48px minimum) and safe-area padding for the notch/home-indicator area
 * are applied directly on this panel, per the brief's mobile requirements.
 */

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "./NavLink";
import { SocialIconRow } from "@/components/shared/buttons/SocialIconRow";
import { transitions } from "@/lib/animations/transitions";
import type { Locale, NavItem, SocialLink } from "@/types";

export function MobileMenu({
  items,
  socialLinks,
  locale = "en",
}: {
  items: NavItem[];
  socialLinks: SocialLink[];
  locale?: Locale;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="flex size-button-md items-center justify-center rounded-full text-ink transition-colors hover:bg-hover md:hidden"
        >
          <Menu className="size-icon-md" />
        </button>
      </DialogPrimitive.Trigger>

      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-canvas md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transitions.fast}
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="fixed inset-0 z-50 flex flex-col pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-[calc(env(safe-area-inset-bottom)+1.5rem)] px-gutter md:hidden"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={transitions.base}
              >
                <DialogPrimitive.Title className="sr-only">Navigation menu</DialogPrimitive.Title>

                <div className="flex items-center justify-end">
                  <DialogPrimitive.Close
                    aria-label="Close menu"
                    className="flex size-button-md items-center justify-center rounded-full text-ink transition-colors hover:bg-hover"
                  >
                    <X className="size-icon-md" />
                  </DialogPrimitive.Close>
                </div>

                <nav className="mt-8 flex flex-1 flex-col gap-2">
                  {items.map((item) => (
                    <NavLink
                      key={item.href}
                      item={item}
                      locale={locale}
                      onNavigate={() => setOpen(false)}
                      className="flex min-h-12 items-center text-display-sm after:hidden"
                    />
                  ))}
                </nav>

                <SocialIconRow links={socialLinks} className="justify-center pb-4" />
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
