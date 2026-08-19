import type { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";
import { orderField, projectScopeField } from "../fields/shared";

/**
 * cms/collections/SocialLinks.ts
 * ----------------------------------------------------------------------------
 * The social icon row in the footer and mobile menu. Mirrors
 * `config/social.ts`.
 *
 * These are separate from a project's own `contacts` (see Projects.ts): those
 * are "how do I reach the Financial Literacy programme", these are "where does
 * this person publish". The footer shows the latter.
 */
export const SocialLinks: CollectionConfig = {
  slug: "social-links",
  admin: {
    group: "Контакты",
    useAsTitle: "title",
    defaultColumns: ["title", "platform", "project", "order"],
    description: "Ссылки на соцсети в подвале сайта.",
  },
  labels: { singular: "Ссылка", plural: "Соцсети" },
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
      name: "platform",
      type: "select",
      required: true,
      label: "Платформа",
      options: [
        { label: "Instagram", value: "instagram" },
        { label: "Telegram", value: "telegram" },
        { label: "WhatsApp", value: "whatsapp" },
        { label: "Электронная почта", value: "email" },
        { label: "Телефон", value: "phone" },
      ],
    },
    {
      name: "url",
      type: "text",
      required: true,
      label: "Ссылка",
      admin: {
        description:
          "Полный адрес, начиная с https:// — например https://instagram.com/имя. Для почты: mailto:адрес",
      },
    },
    projectScopeField,
    orderField,
  ],
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
};
