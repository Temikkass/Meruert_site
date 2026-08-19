/**
 * config/achievements.ts
 * ----------------------------------------------------------------------------
 * Reuses the `Statistic` type and `<StatCard>` component already built for
 * the homepage's Statistics section — the About page's "Achievements" is
 * the same kind of animated-number content, just a different, more
 * milestone-oriented set of numbers, so no new type or component needed.
 */

import type { Statistic } from "@/types";

export const achievements: Statistic[] = [
  // Replace with real achievement numbers, or add/remove entries freely
  { id: "achievement-students", value: 500, suffix: "+", label: { en: "Students mentored", ru: "Учеников", kk: "Студент" } },
  { id: "achievement-tours", value: 40, suffix: "+", label: { en: "Tours led", ru: "Проведённых туров", kk: "Өткізілген турлар" } },
  { id: "achievement-countries", value: 12, label: { en: "Countries visited", ru: "Посещённых стран", kk: "Барылған елдер" } },
  { id: "achievement-years", value: 8, suffix: "+", label: { en: "Years of experience", ru: "Лет опыта", kk: "Жыл тәжірибе" } },
];
