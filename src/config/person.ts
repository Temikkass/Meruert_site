/**
 * config/person.ts
 * ----------------------------------------------------------------------------
 * The homepage introduces the person before either project. Every field
 * below is what the "intro" section reads from — replace the placeholders,
 * nothing else needs to change.
 */

import type { Person } from "@/types";

export const person: Person = {
  // Replace with the client's full name
  fullName: "Firstname Lastname",

  // Replace with a short positioning line (rendered directly under the name)
  tagline: {
    en: "Financial Educator & Travel Author",
    ru: "Финансовый педагог и автор путешествий",
    kk: "Қаржы білімгері және саяхат авторы",
  },

  // Replace with the real biography. Each array item renders as its own
  // paragraph — split by natural paragraph breaks, not by sentence.
  biography: [
    {
      en: "Replace biography paragraph one — who they are and what drives their work.",
      ru: "Замените первый абзац биографии — кто они и что движет их работой.",
      kk: "Өмірбаянның бірінші абзацын ауыстырыңыз.",
    },
    {
      en: "Replace biography paragraph two — the throughline between financial literacy and travel/education.",
      ru: "Замените второй абзац биографии.",
      kk: "Өмірбаянның екінші абзацын ауыстырыңыз.",
    },
  ],

  // Replace with the client's photo (place the file in /public/images/profile)
  photo: {
    src: "/images/profile/portrait-placeholder.jpg",
    alt: "Portrait of Firstname Lastname",
    width: 1200,
    height: 1500,
  },

  credentials: [
    // Replace with real credentials/milestones, or remove entries
    { label: { en: "Author, 3 published guides", ru: "Автор 3 книг", kk: "3 кітаптың авторы" } },
    { label: { en: "500+ students mentored", ru: "500+ учеников", kk: "500+ студент" } },
  ],

  location: {
    // Replace with the client's base location
    en: "Astana, Kazakhstan",
    ru: "Астана, Казахстан",
    kk: "Астана, Қазақстан",
  },
};
