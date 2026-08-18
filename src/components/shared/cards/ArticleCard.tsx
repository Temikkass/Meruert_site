import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Article, Locale } from "@/types";

/**
 * components/shared/cards/ArticleCard.tsx
 * ----------------------------------------------------------------------------
 * `article.externalUrl` (set when the piece lives on Medium/Telegraph
 * instead of on-site — see config/articles.ts) makes this card link out
 * directly; otherwise it links to the on-site `/articles/[slug]` route
 * that would be added in the pages-build phase.
 */
export interface ArticleCardProps {
  article: Article;
  locale?: Locale;
}

export function ArticleCard({ article, locale = "en" }: ArticleCardProps) {
  const href = article.externalUrl ?? `/articles/${article.slug}`;
  const isExternal = Boolean(article.externalUrl);

  return (
    <Card surface="default" padding="sm" hover="lift" className="overflow-hidden p-0">
      <Link
        href={href as Route}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="block focus-visible:outline-none"
      >
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={article.cover.src}
            alt={article.cover.alt}
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover transition-transform duration-slow ease-standard hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-2 p-card-sm">
          <Badge variant="outline" className="self-start">
            {new Date(article.publishedAt).toLocaleDateString(locale, { month: "short", year: "numeric" })}
          </Badge>
          <h3 className="font-display text-body-lg font-semibold leading-heading text-ink">
            {article.title[locale]}
          </h3>
          <p className="text-body-sm text-ink-muted leading-body">{article.excerpt[locale]}</p>
        </div>
      </Link>
    </Card>
  );
}
