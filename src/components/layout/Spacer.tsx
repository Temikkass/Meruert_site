const sizeClass = {
  xs: "h-2",
  sm: "h-4",
  md: "h-8",
  lg: "h-16",
  xl: "h-24",
} as const;

/**
 * components/layout/Spacer.tsx
 * ----------------------------------------------------------------------------
 * An explicit, named vertical gap for the rare case a margin utility on an
 * adjacent element would be ambiguous about which element "owns" the
 * spacing. Used sparingly — `<Stack gap={n}>` is preferred whenever the
 * gap is between a set of related siblings.
 */
export function Spacer({ size = "md" }: { size?: keyof typeof sizeClass }) {
  return <div aria-hidden className={sizeClass[size]} />;
}
