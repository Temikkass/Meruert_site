import type { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";
import { localizedText, localizedTextarea, orderField, projectScopeField } from "../fields/shared";

/**
 * cms/collections/Faq.ts
 * ----------------------------------------------------------------------------
 * Questions and answers. Mirrors `FaqItem` (src/types/content.ts).
 * `useAsTitle` is the Russian question itself, so the admin list reads as the
 * FAQ rather than as a list of ids.
 */
export const Faq: CollectionConfig = {
  slug: "faq",
  admin: {
    group: "Контент",
    useAsTitle: "questionTitle",
    defaultColumns: ["questionTitle", "project", "order"],
    description: "Частые вопросы. Показываются на главной и на страницах проектов.",
  },
  labels: { singular: "Вопрос", plural: "Частые вопросы" },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: "order",
  fields: [
    {
      name: "questionTitle",
      type: "text",
      required: true,
      label: "Вопрос (для списка)",
      admin: {
        description: "Короткая версия вопроса — видна только в админ-панели.",
        position: "sidebar",
      },
    },
    localizedText("question", "Вопрос", { required: true }),
    localizedTextarea("answer", "Ответ", { required: true, rows: 5 }),
    projectScopeField,
    orderField,
  ],
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
};
