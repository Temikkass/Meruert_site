import type { GlobalConfig } from "payload";
import { revalidateGlobalAfterChange } from "../hooks/revalidate";
import { localizedText, sectionCopy } from "../fields/shared";

/**
 * cms/globals/ContactPage.ts
 * ----------------------------------------------------------------------------
 * Mirrors `ContactPageContent` (src/types/contact-page.ts).
 *
 * The contact CHANNELS themselves are not here — they belong to each project
 * (see Projects.ts#contacts), because a visitor picks the project they are
 * writing about. This global holds only the page's own framing text.
 */
export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  admin: { group: "Страницы", description: "Тексты на странице «Контакты»." },
  label: "Страница «Контакты»",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    sectionCopy("hero", "Первый экран"),
    sectionCopy("channelsHeading", "Блок «Каналы связи»"),
    localizedText("primaryActionLabel", "Текст главной кнопки", {
      required: true,
      description: "Кнопка WhatsApp на карточке каждого проекта. Например: «Написать в WhatsApp».",
    }),
    localizedText("locationLabel", "Подпись «Локация»", { required: true }),
    localizedText("workingHoursLabel", "Подпись «Часы работы»", { required: true }),
    localizedText("workingHours", "Часы работы", {
      required: true,
      description: "Например: «Пн–Пт, 10:00–18:00».",
    }),
  ],
};
