/**
 * config/faq.ts
 * ----------------------------------------------------------------------------
 * Same tagged-array pattern as gallery.ts — see that file's comment.
 */

import type { FaqItem } from "@/types";

export const faq: FaqItem[] = [
  {
    id: "faq-shared-01",
    question: {
      en: "Replace with a real frequently asked question.",
      ru: "Замените реальным частым вопросом.",
      kk: "Нақты жиі қойылатын сұрақпен ауыстырыңыз.",
    },
    answer: {
      en: "Replace with the real answer.",
      ru: "Замените реальным ответом.",
      kk: "Нақты жауаппен ауыстырыңыз.",
    },
    project: "shared",
  },
  {
    id: "faq-financial-01",
    question: {
      en: "Replace with a Financial Literacy specific question.",
      ru: "Замените вопросом о финансовой грамотности.",
      kk: "Қаржылық сауаттылыққа қатысты сұрақпен ауыстырыңыз.",
    },
    answer: {
      en: "Replace with the real answer.",
      ru: "Замените реальным ответом.",
      kk: "Нақты жауаппен ауыстырыңыз.",
    },
    project: "financial",
  },
  {
    id: "faq-travel-01",
    question: {
      en: "Replace with a Tours/Courses specific question.",
      ru: "Замените вопросом о турах и курсах.",
      kk: "Турлар мен курстарға қатысты сұрақпен ауыстырыңыз.",
    },
    answer: {
      en: "Replace with the real answer.",
      ru: "Замените реальным ответом.",
      kk: "Нақты жауаппен ауыстырыңыз.",
    },
    project: "travel",
  },
];
