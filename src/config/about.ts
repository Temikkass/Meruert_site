/**
 * config/about.ts
 * ----------------------------------------------------------------------------
 * Section-level copy for the About page. The actual biography, photo, and
 * credentials still come from config/person.ts (this file doesn't
 * duplicate them) — this only covers the About page's own section framing.
 */

import type { AboutContent } from "@/types";
import { person } from "./person";

export const aboutContent: AboutContent = {
  hero: {
    eyebrow: person.tagline,
    headline: {
      en: "The story behind both projects.",
      ru: "История, стоящая за обоими проектами.",
      kk: "Екі жобаның артындағы оқиға.",
    },
    intro: {
      en: "Replace with a short 1–2 sentence introduction shown under the headline.",
      ru: "Замените коротким введением на 1–2 предложения.",
      kk: "Қысқаша кіріспемен ауыстырыңыз.",
    },
    primaryCta: {
      label: { en: "See my projects", ru: "Мои проекты", kk: "Менің жобаларым" },
      href: "/#projects",
    },
    secondaryCta: {
      label: { en: "Get in touch", ru: "Связаться", kk: "Хабарласу" },
      href: "/contact",
    },
    scrollIndicatorLabel: { en: "Scroll", ru: "Прокрутите", kk: "Айналдырыңыз" },
  },

  biography: {
    eyebrow: { en: "Biography", ru: "Биография", kk: "Өмірбаян" },
    heading: {
      en: "A path shaped by numbers and new places.",
      ru: "Путь, сформированный цифрами и новыми местами.",
      kk: "Сандар мен жаңа орындар қалыптастырған жол.",
    },
  },

  missionValues: {
    eyebrow: { en: "Mission & Values", ru: "Миссия и ценности", kk: "Миссия мен құндылықтар" },
    heading: {
      en: "What guides the work.",
      ru: "Что направляет работу.",
      kk: "Жұмысты не бағыттайды.",
    },
  },

  timeline: {
    eyebrow: { en: "Journey", ru: "Путь", kk: "Жол" },
    heading: {
      en: "Milestones along the way.",
      ru: "Основные вехи пути.",
      kk: "Жол бойындағы негізгі кезеңдер.",
    },
  },

  achievements: {
    eyebrow: { en: "Achievements", ru: "Достижения", kk: "Жетістіктер" },
    heading: {
      en: "Measured in people, not just numbers.",
      ru: "Измеряется людьми, а не только цифрами.",
      kk: "Тек сандармен емес, адамдармен өлшенеді.",
    },
  },

  certificates: {
    eyebrow: { en: "Certificates", ru: "Сертификаты", kk: "Сертификаттар" },
    heading: {
      en: "Formal training and credentials.",
      ru: "Формальное обучение и квалификации.",
      kk: "Ресми оқыту және біліктілік.",
    },
  },

  gallery: {
    eyebrow: { en: "Moments", ru: "Моменты", kk: "Сәттер" },
    heading: {
      en: "A closer look.",
      ru: "Ближе к деталям.",
      kk: "Жақынырақ көрініс.",
    },
  },

  cta: {
    eyebrow: { en: "Get started", ru: "Начать", kk: "Бастау" },
    heading: {
      en: "Ready to work together?",
      ru: "Готовы поработать вместе?",
      kk: "Бірге жұмыс істеуге дайынсыз ба?",
    },
    subtitle: {
      en: "Choose the path that fits you — both start with a single conversation.",
      ru: "Выберите подходящий путь — оба начинаются с одного разговора.",
      kk: "Өзіңізге сай жолды таңдаңыз — екеуі де бір әңгімеден басталады.",
    },
  },
};
