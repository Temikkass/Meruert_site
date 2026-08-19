import type { TravelPageContent } from "@/types";
import { travelProject } from "./travel";

export const travelPageContent: TravelPageContent = {
  hero: {
    eyebrow: { en: "Tours, Courses & Camps", ru: "Туры, курсы и лагеря", kk: "Турлар, курстар және лагерьлер" },
    heading: travelProject.tagline,
    intro: {
      en: "Replace with a short 1–2 sentence introduction shown under the hero heading.",
      ru: "Замените коротким введением на 1–2 предложения.",
      kk: "Қысқаша кіріспемен ауыстырыңыз.",
    },
  },
  about: {
    eyebrow: { en: "About the project", ru: "О проекте", kk: "Жоба туралы" },
    heading: {
      en: "Learning that happens somewhere unforgettable.",
      ru: "Обучение, которое происходит в незабываемом месте.",
      kk: "Ұмытылмас жерде өтетін оқу.",
    },
  },
  programs: {
    eyebrow: { en: "Programs", ru: "Программы", kk: "Бағдарламалар" },
    heading: {
      en: "Three ways to take part.",
      ru: "Три способа принять участие.",
      kk: "Қатысудың үш жолы.",
    },
  },
  tours: {
    eyebrow: { en: "Tours", ru: "Туры", kk: "Турлар" },
    heading: {
      en: "Guided author tours.",
      ru: "Авторские туры с гидом.",
      kk: "Гидпен авторлық турлар.",
    },
  },
  languageCourses: {
    eyebrow: { en: "Language Courses", ru: "Языковые курсы", kk: "Тіл курстары" },
    heading: {
      en: "Immersion, not memorization.",
      ru: "Погружение, а не зубрёжка.",
      kk: "Жаттау емес, ену.",
    },
  },
  camps: {
    eyebrow: { en: "Camps", ru: "Лагеря", kk: "Лагерьлер" },
    heading: {
      en: "Educational camps for a different kind of summer.",
      ru: "Образовательные лагеря для особенного лета.",
      kk: "Ерекше жазға арналған білім лагерьлері.",
    },
  },
  gallery: {
    eyebrow: { en: "Gallery", ru: "Галерея", kk: "Галерея" },
    heading: {
      en: "Moments from the road.",
      ru: "Моменты в пути.",
      kk: "Жолдағы сәттер.",
    },
  },
  reviews: {
    eyebrow: { en: "Reviews", ru: "Отзывы", kk: "Пікірлер" },
    heading: {
      en: "What travelers say.",
      ru: "Что говорят путешественники.",
      kk: "Саяхатшылар не дейді.",
    },
  },
  faq: {
    eyebrow: { en: "FAQ", ru: "Вопросы", kk: "Сұрақтар" },
    heading: {
      en: "Common questions about tours & courses.",
      ru: "Частые вопросы о турах и курсах.",
      kk: "Турлар мен курстар туралы жиі қойылатын сұрақтар.",
    },
  },
  cta: {
    eyebrow: { en: "Get started", ru: "Начать", kk: "Бастау" },
    heading: {
      en: "Ready for what's next?",
      ru: "Готовы к новому?",
      kk: "Жаңалыққа дайынсыз ба?",
    },
    subtitle: {
      en: "Reach out on your preferred channel — a first conversation costs nothing.",
      ru: "Напишите в удобном канале — первый разговор ничего не стоит.",
      kk: "Ыңғайлы арна арқылы хабарласыңыз — алғашқы әңгіме тегін.",
    },
  },
};
