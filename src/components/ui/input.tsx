import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

/**
 * components/ui/input.tsx
 * ----------------------------------------------------------------------------
 * `state` drives both the border color AND the small status icon (rather
 * than a component consumer manually placing an icon next to every input)
 * so error/success states are visually consistent everywhere a form is
 * built — react-hook-form's `formState.errors` maps directly to
 * `state="error"` at the call site.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: "default" | "error" | "success" | "loading";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, state = "default", disabled, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          disabled={disabled || state === "loading"}
          className={cn(
            "flex h-button-md w-full rounded-md border bg-surface px-4 text-body-md text-ink",
            "placeholder:text-ink-muted",
            "transition-colors duration-fast ease-standard",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            state === "default" && "border-border",
            state === "error" && "border-error pr-10",
            state === "success" && "border-success pr-10",
            state === "loading" && "border-border pr-10",
            className
          )}
          aria-invalid={state === "error"}
          {...props}
        />
        {state === "error" && (
          <Icon name="error" size="sm" className="absolute right-3 top-1/2 -translate-y-1/2 text-error" />
        )}
        {state === "success" && (
          <Icon name="success" size="sm" className="absolute right-3 top-1/2 -translate-y-1/2 text-success" />
        )}
        {state === "loading" && (
          <Icon name="spinner" size="sm" className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-ink-muted" />
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
