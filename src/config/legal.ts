/**
 * config/legal.ts
 * ----------------------------------------------------------------------------
 * Placeholder legal copy — replace every section body with real,
 * lawyer-reviewed privacy policy text before this site goes live. Kept
 * structurally realistic (the section list a privacy policy actually
 * needs) rather than a single lorem-ipsum block, so swapping in real text
 * is a content edit, not a restructure.
 */

import type { LegalPageContent } from "@/types";

export const privacyPolicyContent: LegalPageContent = {
  title: { en: "Privacy Policy", ru: "Политика конфиденциальности", kk: "Құпиялылық саясаты" },
  lastUpdatedLabel: { en: "Last updated", ru: "Последнее обновление", kk: "Соңғы жаңарту" },
  lastUpdated: "2026-01-01", // Replace with the real effective date
  intro: {
    en: "Replace with a short introduction explaining what this policy covers and who it applies to.",
    ru: "Замените коротким введением о том, что охватывает эта политика.",
    kk: "Бұл саясаттың нені қамтитынын түсіндіретін қысқаша кіріспемен ауыстырыңыз.",
  },
  sections: [
    {
      id: "information-collected",
      heading: { en: "Information We Collect", ru: "Какую информацию мы собираем", kk: "Біз қандай ақпарат жинаймыз" },
      body: [
        {
          en: "Replace with real detail on what information is collected (e.g. contact form submissions, analytics).",
          ru: "Замените реальным описанием собираемой информации.",
          kk: "Жиналатын ақпарат туралы нақты сипаттамамен ауыстырыңыз.",
        },
      ],
    },
    {
      id: "how-we-use-it",
      heading: { en: "How We Use Information", ru: "Как мы используем информацию", kk: "Ақпаратты қалай пайдаланамыз" },
      body: [
        {
          en: "Replace with real detail on how the collected information is used.",
          ru: "Замените реальным описанием использования информации.",
          kk: "Жиналған ақпараттың қалай пайдаланылатыны туралы нақты сипаттамамен ауыстырыңыз.",
        },
      ],
    },
    {
      id: "cookies",
      heading: { en: "Cookies & Tracking", ru: "Файлы cookie и отслеживание", kk: "Cookie файлдары және бақылау" },
      body: [
        {
          en: "Replace with real detail on cookies or tracking technologies in use, if any.",
          ru: "Замените реальным описанием используемых cookie-файлов.",
          kk: "Пайдаланылатын cookie файлдары туралы нақты сипаттамамен ауыстырыңыз.",
        },
      ],
    },
    {
      id: "third-parties",
      heading: { en: "Third-Party Services", ru: "Сторонние сервисы", kk: "Үшінші тарап қызметтері" },
      body: [
        {
          en: "Replace with real detail on any third-party services data may be shared with.",
          ru: "Замените реальным описанием сторонних сервисов.",
          kk: "Деректер бөлісілуі мүмкін үшінші тарап қызметтері туралы ауыстырыңыз.",
        },
      ],
    },
    {
      id: "your-rights",
      heading: { en: "Your Rights", ru: "Ваши права", kk: "Сіздің құқықтарыңыз" },
      body: [
        {
          en: "Replace with real detail on the visitor's rights over their data (access, deletion, etc.).",
          ru: "Замените реальным описанием прав посетителя в отношении его данных.",
          kk: "Қонақтың өз деректеріне қатысты құқықтары туралы ауыстырыңыз.",
        },
      ],
    },
    {
      id: "contact",
      heading: { en: "Contact", ru: "Контакты", kk: "Байланыс" },
      body: [
        {
          en: "Replace with how a visitor can reach out with privacy-related questions.",
          ru: "Замените информацией о том, как связаться по вопросам конфиденциальности.",
          kk: "Құпиялылыққа қатысты сұрақтар бойынша хабарласу жолымен ауыстырыңыз.",
        },
      ],
    },
  ],
};
