import { useId } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * components/shared/forms/FormField.tsx
 * ----------------------------------------------------------------------------
 * Wraps any single input primitive (Input, Textarea, Select, ...) with a
 * consistent label + hint + error layout — built to pair with
 * react-hook-form (`formState.errors.fieldName?.message` passes straight
 * into the `error` prop) without importing react-hook-form here itself, so
 * this stays usable for a plain uncontrolled field too.
 *
 * Generates and wires the `id`/`aria-describedby` relationship between the
 * label, the control, and the error/hint text automatically via `useId` —
 * the caller doesn't manage id strings by hand.
 */
export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  /** Render-prop so the wrapped control receives the generated `id` and
   * `aria-describedby` without the caller wiring them manually. */
  children: (field: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean }) => React.ReactNode;
}

export function FormField({ label, htmlFor, hint, error, required, className, children }: FormFieldProps) {
  const generatedId = useId();
  const id = htmlFor ?? generatedId;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-error"> *</span>}
      </Label>

      {children({ id, "aria-describedby": describedBy, "aria-invalid": Boolean(error) })}

      {hint && !error && (
        <p id={hintId} className="text-caption text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-caption text-error">
          {error}
        </p>
      )}
    </div>
  );
}
