/**
 * config/contact-page.ts
 * ----------------------------------------------------------------------------
 * Location reuses `person.location` (already in config/person.ts) rather
 * than duplicating it — only "working hours" is genuinely new content,
 * since nothing existing covers it. Contact CHANNELS themselves (WhatsApp/
 * Telegram/Instagram/Email) are read directly from config/contacts.ts by
 * the Contact page — this file is only the page's own copy, not another
 * place channel data lives.
 */

import type { ContactPageContent } from "@/types";

export const contactPageContent: ContactPageContent = {
  hero: {
    eyebrow: { en: "Contact", ru: "Контакты", kk: "Байланыс" },
    heading: {
      en: "Let's start a conversation.",
      ru: "Давайте начнём разговор.",
      kk: "Әңгімені бастайық.",
    },
    subtitle: {
      en: "Replace with a short subtitle inviting people to reach out.",
      ru: "Замените коротким подзаголовком.",
      kk: "Қысқаша субтитрмен ауыстырыңыз.",
    },
  },

  channelsHeading: {
    eyebrow: { en: "Reach out directly", ru: "Свяжитесь напрямую", kk: "Тікелей хабарласыңыз" },
    heading: {
      en: "Pick the channel that fits your project.",
      ru: "Выберите удобный канал связи.",
      kk: "Жобаңызға сай арнаны таңдаңыз.",
    },
  },

  locationLabel: { en: "Location", ru: "Локация", kk: "Орналасқан жері" },
  workingHoursLabel: { en: "Working Hours", ru: "Часы работы", kk: "Жұмыс уақыты" },
  workingHours: {
    en: "Mon–Fri, 10:00–18:00",
    ru: "Пн–Пт, 10:00–18:00",
    kk: "Дс–Жм, 10:00–18:00",
  },

  primaryActionLabel: {
    en: "Message on WhatsApp",
    ru: "Написать в WhatsApp",
    kk: "WhatsApp-та жазу",
  },
};
