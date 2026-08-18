import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import type { FaqItem, Locale, ProjectId } from "@/types";

/**
 * components/shared/faq/FaqAccordion.tsx
 * ----------------------------------------------------------------------------
 * Filters config/faq.ts by `project` before rendering — a project page
 * passes its own id and gets that project's questions plus every "shared"
 * one; the homepage passes nothing and sees only "shared" questions.
 * `type="single" collapsible` means opening one question closes any other
 * that was open, which reads calmer for a short FAQ list than an
 * accordion where multiple answers can be open at once.
 */
export interface FaqAccordionProps {
  items: FaqItem[];
  project?: ProjectId;
  locale?: Locale;
}

export function FaqAccordion({ items, project, locale = "en" }: FaqAccordionProps) {
  const filtered = items.filter((item) => item.project === "shared" || item.project === project);

  return (
    <Accordion type="single" collapsible className="w-full">
      {filtered.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.question[locale]}</AccordionTrigger>
          <AccordionContent>{item.answer[locale]}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
