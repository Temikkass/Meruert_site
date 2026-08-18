import { AnimatedCounter } from "./AnimatedCounter";
import type { Locale, Statistic } from "@/types";

export interface StatCardProps {
  statistic: Statistic;
  locale?: Locale;
  className?: string;
}

/**
 * components/shared/stats/StatCard.tsx
 * ----------------------------------------------------------------------------
 * Deliberately NOT wrapped in `<Card>` — stats read best sitting directly
 * on the section background as a plain number, not boxed. If a bordered
 * treatment is wanted in a given layout, wrap the call site's grid item in
 * `<Card>` there rather than baking a border into every stat.
 */
export function StatCard({ statistic, locale = "en", className }: StatCardProps) {
  return (
    <div className={className}>
      <AnimatedCounter
        value={statistic.value}
        prefix={statistic.prefix}
        suffix={statistic.suffix}
        className="font-data text-display-md font-semibold text-ink"
      />
      <p className="mt-2 text-body-sm text-ink-muted">{statistic.label[locale]}</p>
    </div>
  );
}
