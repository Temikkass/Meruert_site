/**
 * components/shared/cards/PricingCard.tsx
 * ----------------------------------------------------------------------------
 * FUTURE-READY, per the brief — neither project currently sells fixed-price
 * tiers, so there's no config file feeding this yet (no `config/pricing.ts`
 * exists). Built now, ahead of need, so that if/when a pricing tier is
 * added to either project, it's a config object shaped like `PricingTier`
 * below plus this card — not a new component built from scratch.
 */

import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
}

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <Card
      surface={tier.highlighted ? "elevated" : "default"}
      hover="lift"
      className={cn("flex flex-col gap-6", tier.highlighted && "border-accent")}
    >
      <div>
        <CardTitle>{tier.name}</CardTitle>
        {tier.description && <p className="mt-1 text-body-sm text-ink-muted">{tier.description}</p>}
      </div>

      <div className="flex items-baseline gap-1">
        <span className="font-display text-display-md font-semibold text-ink">{tier.price}</span>
        {tier.period && <span className="text-body-sm text-ink-muted">/{tier.period}</span>}
      </div>

      <ul className="flex flex-col gap-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-body-sm text-ink-muted">
            <Icon name="check" size="sm" className="shrink-0 text-accent" />
            {feature}
          </li>
        ))}
      </ul>

      <Button asChild variant={tier.highlighted ? "primary" : "outline"} className="mt-auto">
        <a href={tier.ctaHref}>{tier.ctaLabel}</a>
      </Button>
    </Card>
  );
}
