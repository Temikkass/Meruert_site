"use client";

/**
 * components/sections/ContactFormSection.tsx
 * ----------------------------------------------------------------------------
 * A TEMPLATE form, per the brief — react-hook-form + zod give it real,
 * working client-side validation and a polished submit experience (a
 * sonner toast, matching the design system's ToastProvider), but there is
 * no backend call. `onSubmit` is the one place to wire a real API route or
 * email-sending provider later (see the comment inline) — everything else
 * here (validation rules, field labels, success/error copy) is ready to
 * ship as-is.
 *
 * Every validation message is localized from config/contact-page.ts
 * (`content.validation`), not hardcoded in the zod schema — the schema is
 * built inside the component so it can read the current `locale`.
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { FormField } from "@/components/shared/forms/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { ContactPageContent, Locale } from "@/types";

export function ContactFormSection({
  content,
  locale = "en",
}: {
  content: ContactPageContent;
  locale?: Locale;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const v = content.form.validation;

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, v.nameRequired[locale]),
        email: z.string().email(v.emailInvalid[locale]),
        message: z.string().min(1, v.messageRequired[locale]).min(10, v.messageTooShort[locale]),
      }),
    [v, locale]
  );

  type ContactFormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    setIsSubmitting(true);
    // TEMPLATE: replace this block with a real submission — e.g. a fetch()
    // to an API route that forwards to an email provider (see
    // .env.example's EMAIL_PROVIDER_API_KEY placeholder). Simulated here
    // with a short delay so the loading/success states are real to try.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    toast.success(content.form.successMessage[locale]);
    reset();
  }

  return (
    <AnimatedSection id="contact-form" background="card">
      <Container className="max-w-xl">
        <SectionHeading
          eyebrow={content.formSection.eyebrow?.[locale]}
          heading={content.formSection.heading[locale]}
          subtitle={content.formSection.subtitle?.[locale]}
          align="center"
        />

        <form
          onSubmit={handleSubmit(onSubmit, () => toast.error(content.form.errorMessage[locale]))}
          className="mt-10 flex flex-col gap-5"
          noValidate
        >
          <FormField label={content.form.nameLabel[locale]} error={errors.name?.message} required>
            {(field) => (
              <Input
                {...field}
                {...register("name")}
                autoComplete="name"
                placeholder={content.form.namePlaceholder[locale]}
                state={errors.name ? "error" : "default"}
              />
            )}
          </FormField>

          <FormField label={content.form.emailLabel[locale]} error={errors.email?.message} required>
            {(field) => (
              <Input
                {...field}
                {...register("email")}
                type="email"
                autoComplete="email"
                placeholder={content.form.emailPlaceholder[locale]}
                state={errors.email ? "error" : "default"}
              />
            )}
          </FormField>

          <FormField label={content.form.messageLabel[locale]} error={errors.message?.message} required>
            {(field) => (
              <Textarea
                {...field}
                {...register("message")}
                placeholder={content.form.messagePlaceholder[locale]}
                state={errors.message ? "error" : "default"}
                rows={5}
              />
            )}
          </FormField>

          <Button type="submit" size="lg" loading={isSubmitting} className="mt-2 self-start">
            {isSubmitting ? content.form.submittingLabel[locale] : content.form.submitLabel[locale]}
          </Button>
        </form>
      </Container>
    </AnimatedSection>
  );
}
