/**
 * config/travel.ts
 * ----------------------------------------------------------------------------
 * Project 2: Author's Tours, Language Courses and Educational Camps.
 * Mirrors the structure of financial.ts exactly — see that file's header
 * comment for why both projects share one `Project` interface.
 */

import type { Project } from "@/types";
import { travelContacts } from "./contacts";

export const travelProject: Project = {
  id: "travel",
  slug: "tours-and-courses",

  name: {
    en: "Tours, Language Courses & Educational Camps",
    ru: "Туры, языковые курсы и образовательные лагеря",
    kk: "Турлар, тіл курстары және білім лагерьлері",
  },

  // Replace with the project's real positioning statement
  tagline: {
    en: "Guided journeys and immersive learning, built around real places and real language.",
    ru: "Путешествия и погружение в язык через реальные места.",
    kk: "Нақты орындар мен нақты тіл арқылы саяхат пен білім.",
  },

  description: [
    {
      en: "Replace with an overview paragraph of the Tours/Courses/Camps project.",
      ru: "Замените обзорным абзацем о турах, курсах и лагерях.",
      kk: "Турлар, курстар және лагерьлерге шолу абзацымен ауыстырыңыз.",
    },
  ],

  heroImage: {
    src: "/images/projects/travel-hero-placeholder.jpg",
    alt: "Guided tour and language course",
    width: 1920,
    height: 1080,
  },

  logo: {
    src: "/images/projects/travel-logo-placeholder.svg",
    alt: "Tours & Courses logo",
    width: 240,
    height: 80,
  },

  offerings: [
    // Replace with real tours/courses/camps, or add/remove entries freely
    {
      id: "guided-author-tours",
      title: { en: "Guided Author Tours", ru: "Авторские туры", kk: "Авторлық турлар" },
      description: {
        en: "Replace with a short description of this offering.",
        ru: "Замените коротким описанием.",
        kk: "Қысқаша сипаттамамен ауыстырыңыз.",
      },
      icon: "compass",
      image: {
        src: "/images/projects/travel-offering-tours-placeholder.jpg",
        alt: "Guided author tour",
        width: 1200,
        height: 900,
      },
    },
    {
      id: "language-immersion",
      title: { en: "Language Immersion Courses", ru: "Курсы языкового погружения", kk: "Тілге енген курстар" },
      description: {
        en: "Replace with a short description of this offering.",
        ru: "Замените коротким описанием.",
        kk: "Қысқаша сипаттамамен ауыстырыңыз.",
      },
      icon: "languages",
      image: {
        src: "/images/projects/travel-offering-language-placeholder.jpg",
        alt: "Language immersion course",
        width: 1200,
        height: 900,
      },
    },
    {
      id: "educational-camps",
      title: { en: "Educational Camps", ru: "Образовательные лагеря", kk: "Білім лагерьлері" },
      description: {
        en: "Replace with a short description of this offering.",
        ru: "Замените коротким описанием.",
        kk: "Қысқаша сипаттамамен ауыстырыңыз.",
      },
      icon: "tent",
      image: {
        src: "/images/projects/travel-offering-camps-placeholder.jpg",
        alt: "Educational camp",
        width: 1200,
        height: 900,
      },
    },
  ],

  accent: {
    primary: "var(--project-travel-accent)",
    tint: "var(--project-travel-accent-tint)",
  },

  // The predefined WhatsApp message lives at `travelContacts.whatsapp
  // .prefilledMessage` (config/contacts.ts) — see financial.ts's matching
  // comment for why it isn't duplicated as a second field here.
  contacts: travelContacts,
};
