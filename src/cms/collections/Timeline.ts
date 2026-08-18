import type { CollectionConfig } from "payload";
import { localizedText, localizedTextarea, orderField } from "../fields/shared";

/**
 * cms/collections/Timeline.ts
 * ----------------------------------------------------------------------------
 * The career timeline on the About page. Mirrors `TimelineEntry`
 * (src/types/content.ts).
 *
 * `date` is a plain string, not localized and not a date picker: entries are
 * labels like "2019" or "2019–2021", which are language-invariant and not
 * always a single calendar date.
 */
export const Timeline: CollectionConfig = {
  slug: "timeline",
  admin: {
    group: "Обо мне",
    useAsTitle: "date",
    defaultColumns: ["date", "order"],
    description: "Ключевые этапы пути. Показываются на странице «Обо мне».",
  },
  labels: { singular: "Этап", plural: "История" },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: "order",
  fields: [
    {
      name: "date",
      type: "text",
      required: true,
      label: "Год или период",
      admin: { description: "Например: «2019» или «2019–2021». Не переводится." },
    },
    localizedText("title", "Заголовок", { required: true }),
    localizedTextarea("description", "Описание", { rows: 4, description: "Необязательно." }),
    orderField,
  ],
};
