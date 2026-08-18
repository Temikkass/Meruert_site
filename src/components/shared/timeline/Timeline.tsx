import { Reveal } from "@/components/animations/Reveal";
import { fadeRight } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";
import type { Locale, TimelineEntry } from "@/types";

/**
 * components/shared/timeline/Timeline.tsx
 * ----------------------------------------------------------------------------
 * A vertical rail with a dot per entry — used for the owner's career/
 * milestone story, or a project's history. Each entry reveals via
 * `fadeRight` individually as it scrolls into view (not a single
 * <StaggerGroup>, since a timeline is typically tall enough that entries
 * enter the viewport one at a time rather than together).
 *
 * `TimelineEntry` itself now lives in types/content.ts (localized
 * title/description) rather than being defined in this file, so config
 * files can construct typed entries — this is a pure type relocation, the
 * rendering here is unchanged.
 */
export function Timeline({
  entries,
  locale = "en",
  className,
}: {
  entries: TimelineEntry[];
  locale?: Locale;
  className?: string;
}) {
  return (
    <ol className={cn("relative border-l border-border pl-8", className)}>
      {entries.map((entry) => (
        <Reveal key={entry.id} variants={fadeRight} as="li" className="relative pb-10 last:pb-0">
          <span className="absolute -left-[calc(2rem+4.5px)] top-1.5 size-2.5 rounded-full bg-accent" />
          <p className="font-data text-caption font-semibold uppercase tracking-eyebrow text-ink-muted">
            {entry.date}
          </p>
          <h3 className="mt-1 font-display text-body-lg font-semibold text-ink">{entry.title[locale]}</h3>
          {entry.description && (
            <p className="mt-1 text-body-md text-ink-muted leading-body">{entry.description[locale]}</p>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
