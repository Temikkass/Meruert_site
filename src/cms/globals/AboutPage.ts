import type { GlobalConfig } from "payload";
import { revalidateGlobalAfterChange } from "../hooks/revalidate";
import { localizedText, localizedTextarea, sectionCopy } from "../fields/shared";

/**
 * cms/globals/AboutPage.ts
 * ----------------------------------------------------------------------------
 * Section framing for the About page. Mirrors `AboutContent`
 * (src/types/about.ts).
 *
 * The biography itself is NOT here — it lives on the Person global, so the
 * homepage teaser and this page read the same source and cannot drift apart.
 * This global only holds the headings around it.
 */
export const AboutPage: GlobalConfig = {
  slug: "about-page",
  admin: { group: "Страницы", description: "Заголовки на странице «Обо мне»." },
  label: "Страница «Обо мне»",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Первый экран",
          fields: [
            {
              name: "hero",
              type: "group",
              label: "Первый экран",
              fields: [
                localizedText("eyebrow", "Надзаголовок", { required: true }),
                localizedTextarea("headline", "Главный заголовок", { required: true, rows: 2 }),
                localizedTextarea("intro", "Вступление", { required: true }),
                localizedText("primaryCtaLabel", "Кнопка 1 — текст", { required: true }),
                localizedText("secondaryCtaLabel", "Кнопка 2 — текст", { required: true }),
                localizedText("scrollIndicatorLabel", "Подпись «прокрутите»", { required: true }),
              ],
            },
          ],
        },
        {
          label: "Разделы",
          fields: [
            sectionCopy("biography", "Блок «Биография»"),
            sectionCopy("missionValues", "Блок «Миссия и ценности»"),
            sectionCopy("timeline", "Блок «История»"),
            sectionCopy("achievements", "Блок «Достижения»"),
            sectionCopy("certificates", "Блок «Сертификаты»"),
            sectionCopy("gallery", "Блок «Галерея»"),
            sectionCopy("cta", "Блок «Связаться»"),
          ],
        },
      ],
    },
  ],
};
