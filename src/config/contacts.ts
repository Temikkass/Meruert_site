/**
 * config/contacts.ts
 * ----------------------------------------------------------------------------
 * WHY THIS FILE EXISTS SEPARATELY FROM financial.ts / travel.ts
 * Contact details are the fields a client edits most often and with the
 * least patience for hunting through prose — a phone number changes far
 * more often than a project's biography copy. Isolating every WhatsApp
 * number, Telegram handle, Instagram link and email in one short file means
 * "update the WhatsApp number" is always a one-file, one-line edit,
 * regardless of how large financial.ts or travel.ts grow.
 *
 * financial.ts and travel.ts import their `contacts` object from here rather
 * than inlining it — so there is exactly one place that defines "what is
 * the Financial project's WhatsApp number", never two.
 */

import type { ContactChannels } from "@/types";

export const financialContacts: ContactChannels = {
  whatsapp: {
    // Replace with the Financial Literacy project's WhatsApp number (E.164, digits only)
    phone: "77010000001",
    prefilledMessage: {
      en: "Hi! I'd like to learn more about your financial literacy program.",
      ru: "Здравствуйте! Хочу узнать больше о программе по финансовой грамотности.",
      kk: "Сәлеметсіз бе! Қаржылық сауаттылық бағдарламасы туралы көбірек білгім келеді.",
    },
  },
  telegram: {
    // Replace with the Financial Literacy project's Telegram username (no @)
    username: "financeliteracy_placeholder",
  },
  instagram: {
    // Replace with the Financial Literacy project's Instagram
    username: "financeliteracy_placeholder",
    url: "https://instagram.com/financeliteracy_placeholder",
  },
  email: {
    // Replace with the Financial Literacy project's contact email
    address: "hello@financeliteracy.example",
  },
};

export const travelContacts: ContactChannels = {
  whatsapp: {
    // Replace with the Tours/Courses/Camps project's WhatsApp number (E.164, digits only)
    phone: "77010000002",
    prefilledMessage: {
      en: "Hi! I'd like to know more about upcoming tours and courses.",
      ru: "Здравствуйте! Хочу узнать больше о турах и курсах.",
      kk: "Сәлеметсіз бе! Турлар мен курстар туралы көбірек білгім келеді.",
    },
  },
  telegram: {
    // Replace with the Travel/Courses project's Telegram username (no @)
    username: "toursandcourses_placeholder",
  },
  instagram: {
    // Replace with the Travel/Courses project's Instagram
    username: "toursandcourses_placeholder",
    url: "https://instagram.com/toursandcourses_placeholder",
  },
  email: {
    // Replace with the Travel/Courses project's contact email
    address: "hello@toursandcourses.example",
  },
};
