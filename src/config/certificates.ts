/**
 * config/certificates.ts
 * ----------------------------------------------------------------------------
 * Placeholder entries, per the brief — swap `image.src` for real scanned
 * certificates/credentials in /public/images/gallery (or a new
 * /public/images/certificates folder) when available.
 */

import type { Certificate } from "@/types";

export const certificates: Certificate[] = [
  {
    id: "certificate-01",
    title: { en: "Replace with certificate name", ru: "Замените названием сертификата", kk: "Сертификат атауымен ауыстырыңыз" },
    issuer: { en: "Issuing organization", ru: "Организация, выдавшая сертификат", kk: "Берген ұйым" },
    image: {
      src: "/images/gallery/placeholder-01.jpg",
      alt: "Certificate placeholder",
      width: 800,
      height: 600,
    },
  },
  {
    id: "certificate-02",
    title: { en: "Replace with certificate name", ru: "Замените названием сертификата", kk: "Сертификат атауымен ауыстырыңыз" },
    issuer: { en: "Issuing organization", ru: "Организация, выдавшая сертификат", kk: "Берген ұйым" },
    image: {
      src: "/images/gallery/placeholder-02.jpg",
      alt: "Certificate placeholder",
      width: 800,
      height: 600,
    },
  },
  {
    id: "certificate-03",
    title: { en: "Replace with certificate name", ru: "Замените названием сертификата", kk: "Сертификат атауымен ауыстырыңыз" },
    issuer: { en: "Issuing organization", ru: "Организация, выдавшая сертификат", kk: "Берген ұйым" },
    image: {
      src: "/images/gallery/placeholder-03.jpg",
      alt: "Certificate placeholder",
      width: 800,
      height: 600,
    },
  },
];
