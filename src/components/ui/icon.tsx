/**
 * components/ui/icon.tsx
 * ----------------------------------------------------------------------------
 * Config files store icons as a plain string (`IconKey`, see types/common.ts)
 * so config stays pure data with zero React imports — see that file's
 * header comment. This is the one place a string like "wallet" gets turned
 * into an actual `<Wallet />` component. Add to `iconMap` as new icons are
 * needed; unknown keys render nothing rather than throwing, so a client
 * typo in a config file degrades gracefully instead of crashing the page.
 *
 * Sizing goes through the `--spacing-icon-*` tokens (config/theme.ts#iconSize
 * / globals.css) via the `size` prop — never a raw Tailwind `size-6`, so
 * every icon in the system resizes from one place.
 */

import {
  Wallet,
  TrendingUp,
  Compass,
  Languages,
  Tent,
  Instagram,
  Send,
  Mail,
  Phone,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  Menu,
  Star,
  Quote,
  Play,
  Pause,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Info,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { IconKey } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  wallet: Wallet,
  "trending-up": TrendingUp,
  compass: Compass,
  languages: Languages,
  tent: Tent,
  instagram: Instagram,
  telegram: Send,
  mail: Mail,
  phone: Phone,
  whatsapp: MessageCircle,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  check: Check,
  close: X,
  menu: Menu,
  star: Star,
  quote: Quote,
  play: Play,
  pause: Pause,
  spinner: Loader2,
  error: AlertCircle,
  success: CheckCircle2,
  info: Info,
};

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeClass: Record<IconSize, string> = {
  xs: "size-icon-xs",
  sm: "size-icon-sm",
  md: "size-icon-md",
  lg: "size-icon-lg",
  xl: "size-icon-xl",
};

export interface IconProps {
  name: IconKey;
  size?: IconSize;
  className?: string;
  strokeWidth?: number;
  /** Purely decorative icons (most icons paired with visible text) should
   * be hidden from assistive tech — set false only for an icon-only
   * control that has its own aria-label elsewhere. */
  decorative?: boolean;
}

export function Icon({ name, size = "md", className, strokeWidth = 1.75, decorative = true }: IconProps) {
  const LucideIcon = iconMap[name];
  if (!LucideIcon) return null;

  return (
    <LucideIcon
      className={cn(sizeClass[size], className)}
      strokeWidth={strokeWidth}
      aria-hidden={decorative}
    />
  );
}
