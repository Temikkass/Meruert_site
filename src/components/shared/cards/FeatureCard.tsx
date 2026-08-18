/**
 * components/shared/cards/FeatureCard.tsx
 * ----------------------------------------------------------------------------
 * The icon-box + title + description card used for a project's offerings
 * list (config/financial.ts#offerings, config/travel.ts#offerings).
 *
 * `ServiceCard` below is the same content, laid out horizontally instead of
 * stacked — offered as a second export from this file (not a duplicate
 * component) because the two are genuinely the same data shape with a
 * different `flex-direction`, and keeping them together is what makes that
 * obvious to the next person who touches either one.
 */

import { Card, CardTitle } from "@/components/ui/card";
import { IconBox } from "@/components/shared/content/IconBox";
import { cn } from "@/lib/utils";
import type { IconKey } from "@/types";

export interface FeatureCardProps {
  icon?: IconKey;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card hover="lift" className={cn("flex flex-col gap-4", className)}>
      {icon && <IconBox icon={icon} />}
      <CardTitle>{title}</CardTitle>
      <p className="text-body-md text-ink-muted leading-body">{description}</p>
    </Card>
  );
}

/** Horizontal layout of the same content — a service/offering row rather
 * than a grid tile, e.g. for a longer list of offerings in a project page. */
export function ServiceCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card hover="border" className={cn("flex flex-row items-start gap-5", className)}>
      {icon && <IconBox icon={icon} />}
      <div className="flex flex-col gap-1.5">
        <CardTitle>{title}</CardTitle>
        <p className="text-body-md text-ink-muted leading-body">{description}</p>
      </div>
    </Card>
  );
}
