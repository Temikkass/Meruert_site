import type { CollectionConfig } from "payload";
import { localizedText, orderField } from "../fields/shared";

/**
 * cms/collections/Achievements.ts
 * ----------------------------------------------------------------------------
 * Short one-line accomplishments on the About page. Deliberately just a
 * localized label plus ordering — the section renders them as a simple list,
 * and giving each one a description field it does not render would invite the
 * client to write text nobody ever sees.
 */
export const Achievements: CollectionConfig = {
  slug: "achievements",
  admin: {
    group: "Обо мне",
    useAsTitle: "title",
    defaultColumns: ["title", "order"],
    description: "Короткие достижения — по одной строке каждое.",
  },
  labels: { singular: "Достижение", plural: "Достижения" },
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
    localizedText("label", "Текст достижения", { required: true }),
    orderField,
  ],
};
