/**
 * config/why-choose-me.ts
 * ----------------------------------------------------------------------------
 * Feeds the homepage's "Why Choose Me" section — rendered through the
 * existing `FeatureCard` component (components/shared/cards/FeatureCard.tsx),
 * so this section introduces no new card type, just new content.
 */

import type { ValueProposition } from "@/types";

export const whyChooseMe: ValueProposition[] = [
  // Replace with the real value propositions, or add/remove entries freely
  {
    id: "experience",
    icon: "star",
    title: { en: "Years of hands-on experience", ru: "Годы практического опыта", kk: "Жылдар бойы тәжірибе" },
    description: {
      en: "Replace with a short description of this value proposition.",
      ru: "Замените коротким описанием.",
      kk: "Қысқаша сипаттамамен ауыстырыңыз.",
    },
  },
  {
    id: "personal-approach",
    icon: "check",
    title: { en: "A personal, considered approach", ru: "Личный, продуманный подход", kk: "Жеке, ойластырылған көзқарас" },
    description: {
      en: "Replace with a short description of this value proposition.",
      ru: "Замените коротким описанием.",
      kk: "Қысқаша сипаттамамен ауыстырыңыз.",
    },
  },
  {
    id: "two-worlds",
    icon: "compass",
    title: { en: "Two disciplines, one standard", ru: "Две дисциплины, один стандарт", kk: "Екі сала, бір стандарт" },
    description: {
      en: "Replace with a short description of this value proposition.",
      ru: "Замените коротким описанием.",
      kk: "Қысқаша сипаттамамен ауыстырыңыз.",
    },
  },
];
