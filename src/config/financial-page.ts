import type { FinancialPageContent } from "@/types";
import { financialProject } from "./financial";

export const financialPageContent: FinancialPageContent = {
  hero: {
    eyebrow: { en: "Financial Literacy", ru: "Финансовая грамотность", kk: "Қаржылық сауаттылық" },
    heading: financialProject.tagline,
    intro: {
      en: "Replace with a short 1–2 sentence introduction shown under the hero heading.",
      ru: "Замените коротким введением на 1–2 предложения.",
      kk: "Қысқаша кіріспемен ауыстырыңыз.",
    },
  },
  about: {
    eyebrow: { en: "About the project", ru: "О проекте", kk: "Жоба туралы" },
    heading: {
      en: "Money skills that actually stick.",
      ru: "Финансовые навыки, которые действительно остаются с вами.",
      kk: "Шынымен есте қалатын қаржы дағдылары.",
    },
  },
  services: {
    eyebrow: { en: "Services", ru: "Услуги", kk: "Қызметтер" },
    heading: {
      en: "Ways to work together.",
      ru: "Форматы совместной работы.",
      kk: "Бірге жұмыс істеу жолдары.",
    },
  },
  learningFormats: {
    eyebrow: { en: "Learning Formats", ru: "Форматы обучения", kk: "Оқу форматтары" },
    heading: {
      en: "Learn the way that fits your schedule.",
      ru: "Учитесь в удобном для вас формате.",
      kk: "Кестеңізге сай оқыңыз.",
    },
  },
  benefits: {
    eyebrow: { en: "Benefits", ru: "Преимущества", kk: "Артықшылықтар" },
    heading: {
      en: "What changes once the numbers make sense.",
      ru: "Что меняется, когда цифры становятся понятны.",
      kk: "Сандар түсінікті болғанда не өзгереді.",
    },
  },
  successStories: {
    eyebrow: { en: "Success Stories", ru: "Истории успеха", kk: "Табыс тарихтары" },
    heading: {
      en: "In their own words.",
      ru: "Их собственными словами.",
      kk: "Өз сөздерімен.",
    },
  },
  gallery: {
    eyebrow: { en: "Gallery", ru: "Галерея", kk: "Галерея" },
    heading: {
      en: "Inside the sessions.",
      ru: "Взгляд изнутри занятий.",
      kk: "Сабақтардың ішкі көрінісі.",
    },
  },
  faq: {
    eyebrow: { en: "FAQ", ru: "Вопросы", kk: "Сұрақтар" },
    heading: {
      en: "Common questions about the program.",
      ru: "Частые вопросы о программе.",
      kk: "Бағдарлама туралы жиі қойылатын сұрақтар.",
    },
  },
  cta: {
    eyebrow: { en: "Get started", ru: "Начать", kk: "Бастау" },
    heading: {
      en: "Ready to take control of your finances?",
      ru: "Готовы взять свои финансы под контроль?",
      kk: "Қаржыңызды бақылауға дайынсыз ба?",
    },
    subtitle: {
      en: "Reach out on your preferred channel — a first conversation costs nothing.",
      ru: "Напишите в удобном канале — первый разговор ничего не стоит.",
      kk: "Ыңғайлы арна арқылы хабарласыңыз — алғашқы әңгіме тегін.",
    },
  },
};
