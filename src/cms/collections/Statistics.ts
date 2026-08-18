import type { CollectionConfig } from "payload";
import { localizedText, orderField, projectScopeField } from "../fields/shared";

/**
 * cms/collections/Statistics.ts
 * ----------------------------------------------------------------------------
 * The animated counters ("500+ students mentored"). Mirrors `Statistic`
 * (src/types/content.ts).
 *
 * `value` is a NUMBER, with prefix/suffix as separate fields, because the
 * counter animates from zero up to it — storing "500+" as text would leave
 * nothing to count. That split already existed in the type; it is preserved
 * here so the client cannot accidentally break the animation by typing a
 * symbol into the number.
 */
export const Statistics: CollectionConfig = {
  slug: "statistics",
  admin: {
    group: "Контент",
    useAsTitle: "title",
    defaultColumns: ["title", "value", "project", "order"],
    description: "Цифры, которые считаются вверх при прокрутке.",
  },
  labels: { singular: "Показатель", plural: "Показатели" },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: "order",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Служебное название",
      admin: { position: "sidebar", description: "Видно только в админ-панели." },
    },
    {
      name: "value",
      type: "number",
      required: true,
      label: "Число",
      admin: { description: "Только цифры. Знаки «+» или «%» добавьте в полях ниже." },
    },
    { name: "prefix", type: "text", label: "Символ перед числом", admin: { description: "Например: «≈». Необязательно." } },
    { name: "suffix", type: "text", label: "Символ после числа", admin: { description: "Например: «+» или «%». Необязательно." } },
    localizedText("label", "Подпись", { required: true, description: "Что означает это число. Например: «учеников»." }),
    projectScopeField,
    orderField,
  ],
};
