/**
 * config/navigation.ts
 * ----------------------------------------------------------------------------
 * The global nav is intentionally shallow (no `children` dropdowns) because
 * the whole site is three destinations: the homepage intro, and each
 * project's own page. A mega-menu here would be structure invented to look
 * "enterprise," not structure the content actually needs — see the design
 * brief's instruction to avoid anything that reads as templated.
 */

import type { NavItem } from "@/types";
import { financialProject } from "./financial";
import { travelProject } from "./travel";

export const primaryNav: NavItem[] = [
  {
    label: { en: "About", ru: "Обо мне", kk: "Мен туралы" },
    href: "/about",
    project: "shared",
  },
  {
    label: financialProject.name,
    href: `/${financialProject.slug}`,
    project: "financial",
  },
  {
    label: travelProject.name,
    href: `/${travelProject.slug}`,
    project: "travel",
  },
  {
    label: { en: "Contact", ru: "Контакты", kk: "Байланыс" },
    href: "/contact",
    project: "shared",
  },
];
