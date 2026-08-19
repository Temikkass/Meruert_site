/**
 * config/home.ts
 * ----------------------------------------------------------------------------
 * Every heading, subtitle, and CTA label on the homepage lives here — the
 * homepage's section components (components/sections/) only ever read from
 * this object, never hardcode copy. Replace the placeholder strings below;
 * no component code needs to change when you do.
 */

import type { HomeContent } from "@/types";
import { financialProject } from "./financial";
import { travelProject } from "./travel";

export const homeContent: HomeContent = {
  hero: {
    eyebrow: {
      en: "Financial Educator & Travel Author",
      ru: "Финансовый педагог и автор путешествий",
      kk: "Қаржы білімгері және саяхат авторы",
    },
    // Replace with the real headline — the large display statement of the hero
    headline: {
      en: "Building financial confidence and journeys worth remembering.",
      ru: "Формирую финансовую уверенность и запоминающиеся путешествия.",
      kk: "Қаржылық сенімділік пен есте қаларлық саяхаттар қалыптастырамын.",
    },
    intro: {
      en: "Replace with a short 1–2 sentence introduction shown under the headline.",
      ru: "Замените коротким введением на 1–2 предложения.",
      kk: "Тақырыпшаның астында көрсетілетін қысқаша кіріспемен ауыстырыңыз.",
    },
    primaryCta: {
      label: { en: "Explore my projects", ru: "Мои проекты", kk: "Менің жобаларым" },
      href: "/#projects",
    },
    secondaryCta: {
      label: { en: "Get in touch", ru: "Связаться", kk: "Хабарласу" },
      href: "/#contact",
    },
    scrollIndicatorLabel: { en: "Scroll", ru: "Прокрутите", kk: "Айналдырыңыз" },
  },

  aboutPreview: {
    eyebrow: { en: "About", ru: "Обо мне", kk: "Мен туралы" },
    heading: {
      en: "Two paths, one philosophy.",
      ru: "Два пути, одна философия.",
      kk: "Екі жол, бір философия.",
    },
    subtitle: {
      en: "Replace with a short subtitle connecting the person's story to both projects.",
      ru: "Замените коротким подзаголовком.",
      kk: "Қысқаша субтитрмен ауыстырыңыз.",
    },
  },

  projects: {
    eyebrow: { en: "Projects", ru: "Проекты", kk: "Жобалар" },
    heading: {
      en: "Two independent projects, one standard of care.",
      ru: "Два независимых проекта, один стандарт качества.",
      kk: "Екі тәуелсіз жоба, бір сапа стандарты.",
    },
    cardCtaLabel: { en: "Explore", ru: "Смотреть", kk: "Қарау" },
  },

  whyChooseMe: {
    eyebrow: { en: "Why work with me", ru: "Почему со мной", kk: "Неге менімен" },
    heading: {
      en: `What ${financialProject.name.en} and ${travelProject.name.en} share`,
      ru: "Что объединяет оба проекта",
      kk: "Екі жобаны не біріктіреді",
    },
  },

  statistics: {
    heading: {
      en: "In numbers.",
      ru: "В цифрах.",
      kk: "Сандармен.",
    },
  },

  testimonials: {
    eyebrow: { en: "Testimonials", ru: "Отзывы", kk: "Пікірлер" },
    heading: {
      en: "What people say after working together.",
      ru: "Что говорят после совместной работы.",
      kk: "Бірге жұмыс істегеннен кейін не дейді.",
    },
  },

  galleryPreview: {
    eyebrow: { en: "Moments", ru: "Моменты", kk: "Сәттер" },
    heading: {
      en: "A look inside both worlds.",
      ru: "Взгляд изнутри обоих миров.",
      kk: "Екі әлемнің де ішкі көрінісі.",
    },
  },

  faqPreview: {
    eyebrow: { en: "FAQ", ru: "Вопросы", kk: "Сұрақтар" },
    heading: {
      en: "Common questions.",
      ru: "Частые вопросы.",
      kk: "Жиі қойылатын сұрақтар.",
    },
  },

  cta: {
    eyebrow: { en: "Get started", ru: "Начать", kk: "Бастау" },
    heading: {
      en: "Ready to begin?",
      ru: "Готовы начать?",
      kk: "Бастауға дайынсыз ба?",
    },
    subtitle: {
      en: "Choose the path that fits you — both start with a single conversation.",
      ru: "Выберите подходящий путь — оба начинаются с одного разговора.",
      kk: "Өзіңізге сай жолды таңдаңыз — екеуі де бір әңгімеден басталады.",
    },
  },
};
