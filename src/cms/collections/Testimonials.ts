import type { CollectionConfig } from "payload";
import { imageField, localizedText, localizedTextarea, orderField, projectScopeField } from "../fields/shared";

/**
 * cms/collections/Testimonials.ts
 * ----------------------------------------------------------------------------
 * Client reviews. Mirrors `Testimonial` (src/types/content.ts).
 *
 * `authorName` is a plain string, not localized — a person's name is the same
 * in every language. `authorRole` IS localized, because "Client, Cohort 3"
 * is a description rather than a name.
 */
export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    group: "Контент",
    useAsTitle: "authorName",
    defaultColumns: ["authorName", "project", "rating", "order"],
    description: "Отзывы клиентов.",
  },
  labels: { singular: "Отзыв", plural: "Отзывы" },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: "order",
  fields: [
    {
      name: "authorName",
      type: "text",
      required: true,
      label: "Имя автора",
      admin: { description: "Не переводится — имя пишется одинаково на всех языках." },
    },
    localizedText("authorRole", "Кем является", {
      description: "Например: «Участница курса по финансовой грамотности». Необязательно.",
    }),
    localizedTextarea("quote", "Текст отзыва", { required: true, rows: 5 }),
    imageField("avatar", "Фото автора", { dimensions: "200×200" }),
    {
      name: "rating",
      type: "number",
      label: "Оценка",
      min: 1,
      max: 5,
      admin: {
        description: "От 1 до 5 звёзд. Необязательно — без оценки звёзды не показываются.",
        position: "sidebar",
      },
    },
    projectScopeField,
    orderField,
  ],
};
