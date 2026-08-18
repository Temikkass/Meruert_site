/**
 * config/articles.ts
 * ----------------------------------------------------------------------------
 * `externalUrl` lets an article live on Medium/Telegraph/Instagram instead
 * of on-site — common for a personal-brand site where the owner already
 * publishes elsewhere and the site should link out rather than duplicate.
 * When `externalUrl` is present, the article card links out directly and
 * `slug` is only used as a stable React key.
 */

import type { Article } from "@/types";

export const articles: Article[] = [
  {
    id: "article-01",
    title: {
      en: "Replace with a real article title",
      ru: "Замените реальным заголовком статьи",
      kk: "Нақты мақала атауымен ауыстырыңыз",
    },
    excerpt: {
      en: "Replace with a one or two sentence excerpt.",
      ru: "Замените коротким описанием на одно-два предложения.",
      kk: "Бір-екі сөйлемдік үзіндімен ауыстырыңыз.",
    },
    slug: "replace-with-slug",
    cover: {
      src: "/images/articles/placeholder-01.jpg",
      alt: "Replace with a real article title",
      width: 1200,
      height: 800,
    },
    publishedAt: "2026-01-01",
    project: "shared",
  },
];
