import type { GlobalConfig } from "payload";
import { localizedText, localizedTextarea, sectionCopy } from "../fields/shared";

/**
 * cms/globals/ProjectPages.ts
 * ----------------------------------------------------------------------------
 * Section framing for the two project pages. Mirrors `FinancialPageContent`
 * and `TravelPageContent` (src/types/project-pages.ts).
 *
 * Two separate globals rather than one shared shape, for the same reason the
 * types are separate: the pages genuinely differ. Financial has "Learning
 * formats" and "Benefits"; Travel splits its programmes into Tours, Language
 * courses and Camps. Forcing both into one shape would pad each page with
 * sections it never renders.
 */

const heroGroup = {
  name: "hero",
  type: "group" as const,
  label: "Первый экран",
  fields: [
    localizedText("eyebrow", "Надзаголовок"),
    localizedTextarea("heading", "Заголовок", { required: true, rows: 2 }),
    localizedTextarea("subtitle", "Подзаголовок"),
    localizedTextarea("intro", "Вступление", { required: true }),
  ],
};

export const FinancialPage: GlobalConfig = {
  slug: "financial-page",
  admin: { group: "Страницы", description: "Заголовки на странице «Финансовая грамотность»." },
  label: "Страница «Финансовая грамотность»",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    heroGroup,
    sectionCopy("about", "Блок «О проекте»"),
    sectionCopy("services", "Блок «Программы»"),
    sectionCopy("learningFormats", "Блок «Форматы обучения»"),
    sectionCopy("benefits", "Блок «Что вы получите»"),
    sectionCopy("successStories", "Блок «Истории успеха»"),
    sectionCopy("gallery", "Блок «Галерея»"),
    sectionCopy("faq", "Блок «Частые вопросы»"),
    sectionCopy("cta", "Блок «Связаться»"),
  ],
};

export const TravelPage: GlobalConfig = {
  slug: "travel-page",
  admin: { group: "Страницы", description: "Заголовки на странице «Туры и курсы»." },
  label: "Страница «Туры и курсы»",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    heroGroup,
    sectionCopy("about", "Блок «О проекте»"),
    sectionCopy("programs", "Блок «Программы»"),
    sectionCopy("tours", "Блок «Туры»"),
    sectionCopy("languageCourses", "Блок «Языковые курсы»"),
    sectionCopy("camps", "Блок «Лагеря»"),
    sectionCopy("gallery", "Блок «Галерея»"),
    sectionCopy("reviews", "Блок «Отзывы»"),
    sectionCopy("faq", "Блок «Частые вопросы»"),
    sectionCopy("cta", "Блок «Связаться»"),
  ],
};
