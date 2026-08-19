"use client";

import { useRowLabel } from "@payloadcms/ui";

/**
 * cms/components/OfferingRowLabel.tsx
 * ----------------------------------------------------------------------------
 * Labels each collapsed row in the "Программы" array with its own Russian
 * title instead of Payload's default "Программа 01".
 *
 * Small, but it is the difference between a client scanning a list of five
 * collapsed rows and finding "Авторские туры", versus opening each one in turn
 * to work out which is which. Falls back to the numbered label while a row is
 * still empty.
 */
export function OfferingRowLabel() {
  const { data, rowNumber } = useRowLabel<{ title?: { ru?: string } | string }>();

  const title =
    typeof data?.title === "string" ? data.title : data?.title?.ru;

  return <span>{title || `Программа ${String((rowNumber ?? 0) + 1).padStart(2, "0")}`}</span>;
}
