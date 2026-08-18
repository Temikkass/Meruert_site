import type { GlobalConfig } from "payload";
import { localizedText, localizedTextarea, sectionCopy } from "../fields/shared";

/**
 * cms/globals/HomePage.ts
 * ----------------------------------------------------------------------------
 * Every heading and label on the homepage. Mirrors `HomeContent`
 * (src/types/home.ts).
 *
 * This is `sectionCopy()` doing its job: eight sections, one field
 * definition. Tabs mirror the order the sections appear on the page, so the
 * client edits top-to-bottom in the order they scroll.
 *
 * The sections' CONTENT (reviews, gallery photos, statistics, FAQs) lives in
 * its own collections — this global is only the framing text around them.
 */
export const HomePage: GlobalConfig = {
  slug: "home-page",
  admin: {
    group: "Страницы",
    description: "Заголовки и подписи на главной странице.",
  },
  label: "Главная страница",
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
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
                localizedTextarea("headline", "Главный заголовок", {
                  required: true,
                  rows: 2,
                  description: "Крупная фраза на первом экране. Лучше всего читается до 60 символов.",
                }),
                localizedTextarea("intro", "Вступление", {
                  required: true,
                  description: "1–2 предложения под заголовком.",
                }),
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
            sectionCopy("aboutPreview", "Блок «Обо мне»"),
            sectionCopy("projects", "Блок «Проекты»"),
            {
              name: "projectsCardCtaLabel",
              type: "text",
              localized: true,
              required: true,
              label: "Текст ссылки на карточке проекта",
              admin: { description: "Например: «Подробнее» — далее подставляется название проекта." },
            },
            sectionCopy("whyChooseMe", "Блок «Почему я»"),
            sectionCopy("statistics", "Блок «В цифрах»"),
            sectionCopy("testimonials", "Блок «Отзывы»"),
            sectionCopy("galleryPreview", "Блок «Галерея»"),
            sectionCopy("faqPreview", "Блок «Частые вопросы»"),
            sectionCopy("cta", "Блок «Связаться»"),
          ],
        },
      ],
    },
  ],
};
