import type { GlobalConfig } from "payload";
import { revalidateGlobalAfterChange } from "../hooks/revalidate";
import { imageField, localizedText, localizedTextarea } from "../fields/shared";

/**
 * cms/globals/Person.ts
 * ----------------------------------------------------------------------------
 * The site owner. Mirrors `Person` (src/types/person.ts).
 *
 * A global rather than a collection because there is exactly one of her, and
 * a collection would imply otherwise — the client should edit this page, not
 * pick a record from a list of one.
 *
 * `fullName` is not localized: a name is spelled the same in every language
 * here, and localizing it would ask the client to fill the same value three
 * times. It flows into the navbar, the footer, every page title and the
 * Person JSON-LD.
 */
export const Person: GlobalConfig = {
  slug: "person",
  admin: {
    group: "Обо мне",
    description: "Имя, биография, портрет и город. Используется по всему сайту.",
  },
  label: "Личные данные",
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
      label: "Имя и фамилия",
      admin: {
        description:
          "Показывается в шапке, подвале, заголовках вкладок и в данных для поисковых систем. Не переводится.",
      },
    },
    localizedText("tagline", "Краткое описание", {
      required: true,
      description: "Одна строка под именем. Например: «Финансовый педагог и автор путешествий».",
    }),
    {
      name: "biography",
      type: "array",
      label: "Биография",
      labels: { singular: "Абзац", plural: "Абзацы" },
      minRows: 1,
      admin: { description: "Каждая запись — отдельный абзац." },
      fields: [localizedTextarea("text", "Текст абзаца", { required: true, rows: 5 })],
    },
    imageField("photo", "Портрет", {
      required: true,
      dimensions: "1200×1500 (вертикальный)",
      description: "Главное фото на первом экране.",
    }),
    {
      name: "credentials",
      type: "array",
      label: "Регалии",
      labels: { singular: "Регалия", plural: "Регалии" },
      admin: { description: "Короткие строки рядом с биографией. Например: «500+ учеников»." },
      fields: [
        localizedText("label", "Текст", { required: true }),
        { name: "year", type: "text", label: "Год", admin: { description: "Например: «2019». Необязательно." } },
      ],
    },
    localizedText("location", "Город", { required: true, description: "Например: «Астана, Казахстан»." }),
  ],
};
