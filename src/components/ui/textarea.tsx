import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  state?: "default" | "error" | "success";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, state = "default", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-32 w-full rounded-md border bg-surface px-4 py-3 text-body-md text-ink",
          "placeholder:text-ink-muted leading-body",
          "transition-colors duration-fast ease-standard",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          state === "default" && "border-border",
          state === "error" && "border-error",
          state === "success" && "border-success",
          className
        )}
        aria-invalid={state === "error"}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
