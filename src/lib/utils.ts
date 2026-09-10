/**
 * lib/utils.ts
 * ----------------------------------------------------------------------------
 * `cn()` combines clsx (conditional class logic) with tailwind-merge
 * (resolves conflicting Tailwind classes, e.g. `p-4` vs `p-2`, keeping the
 * last one) into the single helper every component needs. This is the
 * standard shadcn/ui pattern — kept here rather than reinvented so
 * shadcn-generated components drop in without modification.
 *
 * THE CUSTOM TYPE SCALE HAS TO BE DECLARED, or tailwind-merge deletes it.
 *
 * Tailwind's `text-*` prefix means two unrelated things: a font size
 * (`text-sm`) and a text colour (`text-red-500`). tailwind-merge tells them
 * apart from a built-in list of known values — and this project's type scale
 * (`text-body-sm`, `text-display-lg`, ... from the `@theme` block in
 * globals.css) is not on it. Faced with `text-body-sm text-ink-muted`, it
 * classified BOTH as colour, decided they conflicted, and kept the last one.
 *
 * The size was silently dropped from the rendered markup. Nothing failed: the
 * element simply inherited 16px from `body` and looked plausible. The site's
 * nav rendered at 16px instead of 14px this way, and so did every eyebrow,
 * section subtitle, card title and FAQ row — anywhere a size token shared a
 * `cn()` call with a colour.
 *
 * Registering the scale as `font-size` restores the distinction. The list is
 * asserted against globals.css by tests/type-scale.test.ts, because a token
 * added there and forgotten here fails exactly this silently again.
 */

import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Every `--text-*` token in the `@theme` block of globals.css. */
export const TYPE_SCALE = [
  "display-xl",
  "display-lg",
  "display-md",
  "display-sm",
  "body-lg",
  "body-md",
  "body-sm",
  "caption",
  "eyebrow",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...TYPE_SCALE] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
