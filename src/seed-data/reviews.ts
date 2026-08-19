/**
 * config/reviews.ts
 * ----------------------------------------------------------------------------
 * Named "reviews" (not "testimonials") to match the brief's file list
 * exactly, even though the exported type is `Testimonial` — keeps the
 * config filename brief-compliant while the underlying type stays generic
 * and reusable (see /types/content.ts).
 */

import type { Testimonial } from "@/types";

export const reviews: Testimonial[] = [
  {
    id: "review-01",
    authorName: "Replace with real name",
    authorRole: {
      en: "Replace with role, e.g. Financial Coaching Cohort 3",
      ru: "Замените ролью",
      kk: "Рөлмен ауыстырыңыз",
    },
    quote: {
      en: "Replace with a real testimonial quote.",
      ru: "Замените реальным отзывом.",
      kk: "Нақты пікірмен ауыстырыңыз.",
    },
    avatar: {
      src: "/images/testimonials/placeholder-01.jpg",
      alt: "Replace with real name",
      width: 200,
      height: 200,
    },
    project: "financial",
    rating: 5,
  },
  {
    id: "review-02",
    authorName: "Replace with real name",
    authorRole: {
      en: "Replace with role, e.g. Summer Camp 2025 Participant",
      ru: "Замените ролью",
      kk: "Рөлмен ауыстырыңыз",
    },
    quote: {
      en: "Replace with a real testimonial quote.",
      ru: "Замените реальным отзывом.",
      kk: "Нақты пікірмен ауыстырыңыз.",
    },
    avatar: {
      src: "/images/testimonials/placeholder-02.jpg",
      alt: "Replace with real name",
      width: 200,
      height: 200,
    },
    project: "travel",
    rating: 5,
  },
];
