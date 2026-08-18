/**
 * lib/utils.ts
 * ----------------------------------------------------------------------------
 * `cn()` combines clsx (conditional class logic) with tailwind-merge
 * (resolves conflicting Tailwind classes, e.g. `p-4` vs `p-2`, keeping the
 * last one) into the single helper every component needs. This is the
 * standard shadcn/ui pattern — kept here rather than reinvented so
 * shadcn-generated components drop in without modification.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
