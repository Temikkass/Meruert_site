"use client";

/**
 * components/shared/cards/ProjectCard.tsx
 * ----------------------------------------------------------------------------
 * The homepage's introduction to each of the two projects — the single
 * highest-stakes card in the system, since it's the pivot point from "the
 * person" to "the project" for both halves of the site. Takes a `Project`
 * directly (see types/project.ts) so it renders `financialProject` and
 * `travelProject` identically, per the architecture's one-type-two-configs
 * decision.
 *
 * `data-project` is set on the card root so it inherits that project's
 * accent tint (see the `[data-project]` utilities in globals.css) — this
 * is the one place in the design system that visual distinction actually
 * surfaces, deliberately.
 */

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { Locale, Project } from "@/types";

export interface ProjectCardProps {
  project: Project;
  /** Localized link label, e.g. "Explore" — sourced from config (see
   * config/home.ts#projects.cardCtaLabel), not hardcoded here, since a
   * shared card component has no business owning page copy. */
  ctaLabel: string;
  locale?: Locale;
}

export function ProjectCard({ project, ctaLabel, locale = "en" }: ProjectCardProps) {
  return (
    <Card
      data-project={project.id}
      surface="elevated"
      padding="lg"
      hover="lift"
      tilt
      spotlight
      className="group relative overflow-hidden"
    >
      <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-md">
        <Image
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
        />
      </div>

      <h3 className="font-display text-display-sm font-semibold leading-heading text-ink">
        {project.name[locale]}
      </h3>
      <p className="mt-2 text-body-md text-ink-muted leading-body">{project.tagline[locale]}</p>

      <Button asChild variant="text" className="mt-6">
        <Link href={`/${project.slug}` as Route}>
          {ctaLabel} {project.name[locale]}
          <Icon name="arrow-up-right" size="sm" />
        </Link>
      </Button>
    </Card>
  );
}
