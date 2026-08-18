/**
 * config/footer.ts
 * ----------------------------------------------------------------------------
 */

import type { FooterColumn } from "@/types";
import { financialProject } from "./financial";
import { travelProject } from "./travel";

export const footerColumns: FooterColumn[] = [
  {
    title: { en: "Projects", ru: "Проекты", kk: "Жобалар" },
    links: [
      { label: financialProject.name, href: `/${financialProject.slug}` },
      { label: travelProject.name, href: `/${travelProject.slug}` },
    ],
  },
  {
    title: { en: "Site", ru: "Сайт", kk: "Сайт" },
    links: [
      { label: { en: "About", ru: "Обо мне", kk: "Мен туралы" }, href: "/about" },
      { label: { en: "Contact", ru: "Контакты", kk: "Байланыс" }, href: "/contact" },
    ],
  },
  {
    title: { en: "Legal", ru: "Правовая информация", kk: "Құқықтық ақпарат" },
    links: [{ label: { en: "Privacy Policy", ru: "Политика конфиденциальности", kk: "Құпиялылық саясаты" }, href: "/privacy-policy" }],
  },
];

// Replace with the real copyright name; the year is computed at render time
// in the footer component via new Date().getFullYear(), never hardcoded.
export const footerOwnerName = "Firstname Lastname";

// The text shown after "© {year} {name}" in the footer — kept localized
// like every other piece of copy, rather than hardcoded in Footer.tsx.
export const footerCopyrightNotice = {
  en: "All rights reserved.",
  ru: "Все права защищены.",
  kk: "Барлық құқықтар қорғалған.",
};
