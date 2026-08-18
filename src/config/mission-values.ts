/**
 * config/mission-values.ts
 * ----------------------------------------------------------------------------
 * Reuses the `ValueProposition` shape from config/why-choose-me.ts (see
 * that type's header comment in types/content.ts) — same data shape,
 * different content and a different section-level layout on the page.
 */

import type { ValueProposition } from "@/types";

export const missionValues: ValueProposition[] = [
  // Replace with the real mission/values statements, or add/remove entries freely
  {
    id: "clarity",
    icon: "check",
    title: { en: "Clarity over complexity", ru: "Ясность важнее сложности", kk: "Күрделіліктен гөрі анықтық" },
    description: {
      en: "Replace with a short description of this value.",
      ru: "Замените коротким описанием.",
      kk: "Қысқаша сипаттамамен ауыстырыңыз.",
    },
  },
  {
    id: "integrity",
    icon: "star",
    title: { en: "Honest, considered advice", ru: "Честный, продуманный совет", kk: "Адал, ойластырылған кеңес" },
    description: {
      en: "Replace with a short description of this value.",
      ru: "Замените коротким описанием.",
      kk: "Қысқаша сипаттамамен ауыстырыңыз.",
    },
  },
  {
    id: "curiosity",
    icon: "compass",
    title: { en: "Curiosity as a discipline", ru: "Любопытство как дисциплина", kk: "Тәртіп ретіндегі қызығушылық" },
    description: {
      en: "Replace with a short description of this value.",
      ru: "Замените коротким описанием.",
      kk: "Қысқаша сипаттамамен ауыстырыңыз.",
    },
  },
];
