/**
 * config/statistics.ts
 * ----------------------------------------------------------------------------
 * `value` is stored as a plain number (not a formatted string like "500+")
 * so a stat-counter component can animate the count-up; `prefix`/`suffix`
 * add the "+", "%", "K" etc. purely at render time.
 */

import type { Statistic } from "@/types";

export const statistics: Statistic[] = [
  {
    id: "stat-students",
    value: 500,
    suffix: "+",
    label: { en: "Students mentored", ru: "Учеников", kk: "Студент" },
    project: "financial",
  },
  {
    id: "stat-tours",
    value: 40,
    suffix: "+",
    label: { en: "Guided tours led", ru: "Проведённых туров", kk: "Өткізілген турлар" },
    project: "travel",
  },
  {
    id: "stat-years",
    value: 8,
    suffix: "+",
    label: { en: "Years of experience", ru: "Лет опыта", kk: "Жыл тәжірибе" },
    project: "shared",
  },
];
