/**
 * config/system.ts
 * ----------------------------------------------------------------------------
 * Copy for the framework-level pages a visitor only ever sees when something
 * has gone wrong — 404 and the error boundary. Kept in config alongside every
 * other user-facing string (rather than inline in app/not-found.tsx) so the
 * client can translate or reword them without touching a component, same rule
 * as the rest of the site.
 */

import type { LocalizedText } from "@/types";

export interface SystemPageCopy {
  eyebrow: LocalizedText;
  heading: LocalizedText;
  body: LocalizedText;
  action: LocalizedText;
}

export const notFoundCopy: SystemPageCopy = {
  eyebrow: { en: "404", ru: "404", kk: "404" },
  heading: {
    en: "This page doesn't exist",
    ru: "Такой страницы не существует",
    kk: "Мұндай бет жоқ",
  },
  body: {
    en: "The link may be out of date, or the address mistyped. Everything else is still where you left it.",
    ru: "Возможно, ссылка устарела или в адресе опечатка. Всё остальное на месте.",
    kk: "Сілтеме ескірген немесе мекенжайда қате болуы мүмкін. Қалғанының бәрі орнында.",
  },
  action: { en: "Back to home", ru: "На главную", kk: "Басты бетке" },
};

export const errorCopy: SystemPageCopy = {
  eyebrow: { en: "Error", ru: "Ошибка", kk: "Қате" },
  heading: {
    en: "Something went wrong",
    ru: "Что-то пошло не так",
    kk: "Бірдеңе дұрыс болмады",
  },
  body: {
    en: "An unexpected error interrupted this page. Trying again usually resolves it.",
    ru: "Непредвиденная ошибка прервала загрузку страницы. Обычно помогает повторная попытка.",
    kk: "Күтпеген қате бетті үзді. Әдетте қайталап көру көмектеседі.",
  },
  action: { en: "Try again", ru: "Попробовать снова", kk: "Қайталап көру" },
};

/** Label for the keyboard skip link (components/navigation/SkipLink.tsx). */
export const skipLinkLabel: LocalizedText = {
  en: "Skip to content",
  ru: "Перейти к содержимому",
  kk: "Мазмұнға өту",
};

/** Accessible labels for the theme toggle (components/navigation/ThemeToggle.tsx). */
export const themeToggleLabels: Record<"toLight" | "toDark", LocalizedText> = {
  toLight: {
    en: "Switch to light theme",
    ru: "Переключить на светлую тему",
    kk: "Ашық тақырыпқа ауысу",
  },
  toDark: {
    en: "Switch to dark theme",
    ru: "Переключить на тёмную тему",
    kk: "Күңгірт тақырыпқа ауысу",
  },
};

/** Accessible label for the language switcher's trigger. */
export const languageSwitcherLabel: LocalizedText = {
  en: "Change language",
  ru: "Сменить язык",
  kk: "Тілді ауыстыру",
};
