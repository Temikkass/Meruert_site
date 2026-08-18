import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { IconKey } from "@/types";

/**
 * components/shared/content/IconBox.tsx
 * ----------------------------------------------------------------------------
 * The recurring "icon inside a soft tinted square" treatment — used by
 * FeatureCard/ServiceCard and the offerings list. Kept as its own component
 * rather than inlined in each card so the exact radius/tint/size stays
 * identical everywhere an offering's icon appears.
 */
export function IconBox({ icon, className }: { icon: IconKey; className?: string }) {
  return (
    <div
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-lg bg-accent-tint text-accent",
        className
      )}
    >
      <Icon name={icon} size="md" />
    </div>
  );
}
