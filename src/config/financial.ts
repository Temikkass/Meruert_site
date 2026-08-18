/**
 * config/financial.ts
 * ----------------------------------------------------------------------------
 * Project 1: Financial Literacy.
 * Satisfies the shared `Project` interface (see /types/project.ts) — the
 * same shape `travel.ts` satisfies — so both can flow through identical
 * components (<ProjectHero>, <ProjectPage>, etc.) in the build phase.
 */

import type { Project, ValueProposition } from "@/types";
import { financialContacts } from "./contacts";

export const financialProject: Project = {
  id: "financial",
  slug: "financial-literacy",

  name: {
    en: "Financial Literacy",
    ru: "Финансовая грамотность",
    kk: "Қаржылық сауаттылық",
  },

  // Replace with the project's real positioning statement
  tagline: {
    en: "Practical money skills for real life — budgeting, investing, and long-term thinking.",
    ru: "Практические финансовые навыки для реальной жизни.",
    kk: "Нақты өмірге арналған практикалық қаржы дағдылары.",
  },

  // Replace with the project's full description (renders on its own page)
  description: [
    {
      en: "Replace with an overview paragraph of the Financial Literacy project.",
      ru: "Замените обзорным абзацем о проекте финансовой грамотности.",
      kk: "Қаржылық сауаттылық жобасына шолу абзацымен ауыстырыңыз.",
    },
  ],

  heroImage: {
    src: "/images/projects/financial-hero-placeholder.jpg",
    alt: "Financial Literacy program",
    width: 1920,
    height: 1080,
  },

  logo: {
    src: "/images/projects/financial-logo-placeholder.svg",
    alt: "Financial Literacy logo",
    width: 240,
    height: 80,
  },

  offerings: [
    // Replace with the real course/service list, or add/remove entries freely
    {
      id: "budgeting-fundamentals",
      title: { en: "Budgeting Fundamentals", ru: "Основы бюджетирования", kk: "Бюджеттеу негіздері" },
      description: {
        en: "Replace with a short description of this offering.",
        ru: "Замените коротким описанием.",
        kk: "Қысқаша сипаттамамен ауыстырыңыз.",
      },
      icon: "wallet",
    },
    {
      id: "investing-101",
      title: { en: "Investing 101", ru: "Инвестиции 101", kk: "Инвестиция 101" },
      description: {
        en: "Replace with a short description of this offering.",
        ru: "Замените коротким описанием.",
        kk: "Қысқаша сипаттамамен ауыстырыңыз.",
      },
      icon: "trending-up",
    },
  ],

  // Accent pulled from the shared theme tokens — do not hardcode a color
  // here; edit config/theme.ts#projects instead so light/dark mode and this
  // project stay in sync.
  accent: {
    primary: "var(--project-financial-accent)",
    tint: "var(--project-financial-accent-tint)",
  },

  // The predefined WhatsApp message lives at `financialContacts.whatsapp
  // .prefilledMessage` (config/contacts.ts) — that's the single source of
  // truth for it (see that file's header comment on why contacts are
  // isolated there), not a second `whatsappMessage` field on this object.
  // `<ProjectHero>`/`<ProjectCtaSection>` build the WhatsApp link via
  // `createWhatsappLink(financialProject.contacts.whatsapp, locale)`.
  contacts: financialContacts,
};

/**
 * Learning Formats — how a student can take part (online, in-person,
 * self-paced, etc.). A separate export, not a field on `financialProject`,
 * because `Project` (types/project.ts) is the shared shape both this
 * project and the travel project satisfy — a Financial-only field doesn't
 * belong on that shared interface. Reuses the `ValueProposition` shape
 * (icon + title + description), rendered with the same `FeatureCard` the
 * homepage already uses.
 */
export const financialLearningFormats: ValueProposition[] = [
  {
    id: "one-on-one",
    icon: "wallet",
    title: { en: "One-on-one coaching", ru: "Индивидуальный коучинг", kk: "Жеке коучинг" },
    description: {
      en: "Replace with a short description of this learning format.",
      ru: "Замените коротким описанием этого формата.",
      kk: "Осы оқу форматының қысқаша сипаттамасымен ауыстырыңыз.",
    },
  },
  {
    id: "group-cohort",
    icon: "trending-up",
    title: { en: "Group cohort program", ru: "Групповая программа", kk: "Топтық бағдарлама" },
    description: {
      en: "Replace with a short description of this learning format.",
      ru: "Замените коротким описанием этого формата.",
      kk: "Осы оқу форматының қысқаша сипаттамасымен ауыстырыңыз.",
    },
  },
  {
    id: "self-paced",
    icon: "compass",
    title: { en: "Self-paced modules", ru: "Самостоятельные модули", kk: "Өз қарқынымен модульдер" },
    description: {
      en: "Replace with a short description of this learning format.",
      ru: "Замените коротким описанием этого формата.",
      kk: "Осы оқу форматының қысқаша сипаттамасымен ауыстырыңыз.",
    },
  },
];

/** Benefits list — same shape/rationale as `financialLearningFormats` above. */
export const financialBenefits: ValueProposition[] = [
  {
    id: "confidence",
    icon: "check",
    title: { en: "Confidence with money decisions", ru: "Уверенность в финансовых решениях", kk: "Қаржы шешімдеріне сенімділік" },
    description: {
      en: "Replace with a short description of this benefit.",
      ru: "Замените коротким описанием этой пользы.",
      kk: "Осы пайданың қысқаша сипаттамасымен ауыстырыңыз.",
    },
  },
  {
    id: "long-term-thinking",
    icon: "star",
    title: { en: "Long-term financial thinking", ru: "Долгосрочное финансовое мышление", kk: "Ұзақ мерзімді қаржылық ойлау" },
    description: {
      en: "Replace with a short description of this benefit.",
      ru: "Замените коротким описанием этой пользы.",
      kk: "Осы пайданың қысқаша сипаттамасымен ауыстырыңыз.",
    },
  },
  {
    id: "practical-tools",
    icon: "check",
    title: { en: "Practical, reusable tools", ru: "Практичные, многоразовые инструменты", kk: "Тәжірибелік, қайта пайдаланылатын құралдар" },
    description: {
      en: "Replace with a short description of this benefit.",
      ru: "Замените коротким описанием этой пользы.",
      kk: "Осы пайданың қысқаша сипаттамасымен ауыстырыңыз.",
    },
  },
];
