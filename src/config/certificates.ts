/**
 * config/certificates.ts
 * ----------------------------------------------------------------------------
 * Placeholder entries, per the brief — swap `image.src` for real scanned
 * certificates/credentials in /public/images/certificates when available.
 *
 * These deliberately do NOT share files with config/gallery.ts. They used to
 * point at /images/gallery/placeholder-0N.jpg while declaring 800x600, but
 * gallery.ts declares the same files as 1600x2000 / 1600x1067 — one intrinsic
 * size per file, two different declarations, so whichever section rendered
 * second got a distorted box from next/image. Certificates now own their own
 * directory.
 */

import type { Certificate } from "@/types";

export const certificates: Certificate[] = [
  {
    id: "certificate-01",
    title: { en: "Replace with certificate name", ru: "Замените названием сертификата", kk: "Сертификат атауымен ауыстырыңыз" },
    issuer: { en: "Issuing organization", ru: "Организация, выдавшая сертификат", kk: "Берген ұйым" },
    image: {
      src: "/images/certificates/placeholder-01.jpg",
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
      src: "/images/certificates/placeholder-02.jpg",
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
      src: "/images/certificates/placeholder-03.jpg",
      alt: "Certificate placeholder",
      width: 800,
      height: 600,
    },
  },
];
