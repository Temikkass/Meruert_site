import { cache } from "react";
import {
  getPayloadClient,
  toImageAsset,
  toLocalizedText,
  toOptionalLocalizedText,
  toParagraphs,
  toRequiredImageAsset,
} from "./client";
import { theme } from "@/config/theme";
import { defaultLocale } from "@/lib/locale";
import type {
  AboutContent,
  Certificate,
  ContactPageContent,
  FaqItem,
  FinancialPageContent,
  GalleryImage,
  HomeContent,
  LegalPageContent,
  Locale,
  LocalizedText,
  Person,
  Project,
  ProjectId,
  SectionCopy,
  SocialLink,
  Statistic,
  Testimonial,
  TimelineEntry,
  TravelPageContent,
  ValueProposition,
} from "@/types";

/**
 * lib/content/index.ts
 * ----------------------------------------------------------------------------
 * Every read the site makes against the CMS. One function per thing a page
 * needs, each returning the SAME type the matching `src/config/*.ts` file used
 * to export — which is why swapping the source of truth left the components
 * alone.
 *
 * Each is wrapped in `cache()`, so a page and the layout asking for the same
 * content in one render share a single query.
 *
 * These run at BUILD time for the statically generated pages, and again
 * whenever a revalidation is triggered by an edit in the admin. They are never
 * called from a Client Component: content is fetched on the server and passed
 * down as props, exactly as it was when it came from config files.
 */

type Row = Record<string, unknown>;

/** Reads a `sectionCopy()` group back into `SectionCopy`. */
function toSectionCopy(group: Row | null | undefined): SectionCopy {
  return {
    eyebrow: toOptionalLocalizedText(group?.eyebrow as never),
    heading: toLocalizedText(group?.heading as never),
    subtitle: toOptionalLocalizedText(group?.subtitle as never),
  };
}

/** Project slugs are fixed in code — they are live URLs, not content. */
const PROJECT_SLUGS: Record<ProjectId, string> = {
  financial: "financial-literacy",
  travel: "tours-and-courses",
};

/**
 * Names shown for a project that has no record in the database yet. The site
 * has two fixed project pages whether or not anyone has filled them in, so
 * these keep the navigation and page titles readable on a fresh install.
 */
const PROJECT_FALLBACK_NAMES: Record<ProjectId, LocalizedText> = {
  financial: {
    ru: "Финансовая грамотность",
    en: "Financial Literacy",
    kk: "Қаржылық сауаттылық",
  },
  travel: {
    ru: "Туры и курсы",
    en: "Tours and Courses",
    kk: "Турлар мен курстар",
  },
};

/** Accent tints are contrast-tuned design tokens, not editable content. */
const PROJECT_ACCENTS: Record<ProjectId, { primary: string; tint: string }> = {
  financial: {
    primary: "var(--project-financial-accent)",
    tint: "var(--project-financial-accent-tint)",
  },
  travel: {
    primary: "var(--project-travel-accent)",
    tint: "var(--project-travel-accent-tint)",
  },
};

// ---------------------------------------------------------------------------
// Globals
// ---------------------------------------------------------------------------

export const getPerson = cache(async (): Promise<Person> => {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({ slug: "person", locale: "all", depth: 1 });

  return {
    fullName: doc.fullName ?? "",
    tagline: toLocalizedText(doc.tagline as never),
    biography: toParagraphs(doc.biography as never),
    photo: toRequiredImageAsset(doc.photo, defaultLocale, doc.fullName ?? ""),
    credentials: (doc.credentials ?? []).map((credential) => ({
      label: toLocalizedText(credential.label as never),
      year: credential.year ?? undefined,
    })),
    location: toLocalizedText(doc.location as never),
  };
});

export const getHomeContent = cache(async (): Promise<HomeContent> => {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({ slug: "home-page", locale: "all", depth: 0 });
  const hero = (doc.hero ?? {}) as Row;

  return {
    hero: {
      eyebrow: toLocalizedText(hero.eyebrow as never),
      headline: toLocalizedText(hero.headline as never),
      intro: toLocalizedText(hero.intro as never),
      // Hero CTA targets are in-page anchors defined in code; only their
      // labels are editable.
      primaryCta: { label: toLocalizedText(hero.primaryCtaLabel as never), href: "/#projects" },
      secondaryCta: { label: toLocalizedText(hero.secondaryCtaLabel as never), href: "/#contact" },
      scrollIndicatorLabel: toLocalizedText(hero.scrollIndicatorLabel as never),
    },
    aboutPreview: toSectionCopy(doc.aboutPreview as Row),
    projects: {
      ...toSectionCopy(doc.projects as Row),
      cardCtaLabel: toLocalizedText(doc.projectsCardCtaLabel as never),
    },
    whyChooseMe: toSectionCopy(doc.whyChooseMe as Row),
    statistics: toSectionCopy(doc.statistics as Row),
    testimonials: toSectionCopy(doc.testimonials as Row),
    galleryPreview: toSectionCopy(doc.galleryPreview as Row),
    faqPreview: toSectionCopy(doc.faqPreview as Row),
    cta: toSectionCopy(doc.cta as Row),
  };
});

export const getAboutContent = cache(async (): Promise<AboutContent> => {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({ slug: "about-page", locale: "all", depth: 0 });
  const hero = (doc.hero ?? {}) as Row;

  return {
    hero: {
      eyebrow: toLocalizedText(hero.eyebrow as never),
      headline: toLocalizedText(hero.headline as never),
      intro: toLocalizedText(hero.intro as never),
      primaryCta: { label: toLocalizedText(hero.primaryCtaLabel as never), href: "/#projects" },
      secondaryCta: { label: toLocalizedText(hero.secondaryCtaLabel as never), href: "/contact" },
      scrollIndicatorLabel: toLocalizedText(hero.scrollIndicatorLabel as never),
    },
    biography: toSectionCopy(doc.biography as Row),
    missionValues: toSectionCopy(doc.missionValues as Row),
    timeline: toSectionCopy(doc.timeline as Row),
    achievements: toSectionCopy(doc.achievements as Row),
    certificates: toSectionCopy(doc.certificates as Row),
    gallery: toSectionCopy(doc.gallery as Row),
    cta: toSectionCopy(doc.cta as Row),
  };
});

export const getFinancialPageContent = cache(async (): Promise<FinancialPageContent> => {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({ slug: "financial-page", locale: "all", depth: 0 });
  const hero = (doc.hero ?? {}) as Row;

  return {
    hero: { ...toSectionCopy(hero), intro: toLocalizedText(hero.intro as never) },
    about: toSectionCopy(doc.about as Row),
    services: toSectionCopy(doc.services as Row),
    learningFormats: toSectionCopy(doc.learningFormats as Row),
    benefits: toSectionCopy(doc.benefits as Row),
    successStories: toSectionCopy(doc.successStories as Row),
    gallery: toSectionCopy(doc.gallery as Row),
    faq: toSectionCopy(doc.faq as Row),
    cta: toSectionCopy(doc.cta as Row),
  };
});

export const getTravelPageContent = cache(async (): Promise<TravelPageContent> => {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({ slug: "travel-page", locale: "all", depth: 0 });
  const hero = (doc.hero ?? {}) as Row;

  return {
    hero: { ...toSectionCopy(hero), intro: toLocalizedText(hero.intro as never) },
    about: toSectionCopy(doc.about as Row),
    programs: toSectionCopy(doc.programs as Row),
    tours: toSectionCopy(doc.tours as Row),
    languageCourses: toSectionCopy(doc.languageCourses as Row),
    camps: toSectionCopy(doc.camps as Row),
    gallery: toSectionCopy(doc.gallery as Row),
    reviews: toSectionCopy(doc.reviews as Row),
    faq: toSectionCopy(doc.faq as Row),
    cta: toSectionCopy(doc.cta as Row),
  };
});

export const getContactPageContent = cache(async (): Promise<ContactPageContent> => {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({ slug: "contact-page", locale: "all", depth: 0 });

  return {
    hero: toSectionCopy(doc.hero as Row),
    channelsHeading: toSectionCopy(doc.channelsHeading as Row),
    primaryActionLabel: toLocalizedText(doc.primaryActionLabel as never),
    locationLabel: toLocalizedText(doc.locationLabel as never),
    workingHoursLabel: toLocalizedText(doc.workingHoursLabel as never),
    workingHours: toLocalizedText(doc.workingHours as never),
  };
});

export const getLegalContent = cache(async (): Promise<LegalPageContent> => {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({ slug: "legal-page", locale: "all", depth: 0 });

  return {
    title: toLocalizedText(doc.title as never),
    lastUpdatedLabel: toLocalizedText(doc.lastUpdatedLabel as never),
    lastUpdated: doc.lastUpdated ?? new Date().toISOString(),
    intro: toLocalizedText(doc.intro as never),
    sections: (doc.sections ?? []).map((section, index) => ({
      id: section.id ?? `section-${index}`,
      heading: toLocalizedText(section.heading as never),
      body: toParagraphs(section.body as never),
    })),
  };
});

export interface SiteSettings {
  defaultTitle: LocalizedText;
  defaultDescription: LocalizedText;
  defaultOgImage: ReturnType<typeof toRequiredImageAsset>;
  footerOwnerName: string;
  footerCopyrightNotice: LocalizedText;
  footerColumns: { title: LocalizedText; links: { label: LocalizedText; href: string }[] }[];
  navAboutLabel: LocalizedText;
  navContactLabel: LocalizedText;
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({ slug: "site-settings", locale: "all", depth: 1 });

  return {
    defaultTitle: toLocalizedText(doc.defaultTitle as never),
    defaultDescription: toLocalizedText(doc.defaultDescription as never),
    defaultOgImage: toRequiredImageAsset(doc.defaultOgImage, defaultLocale),
    footerOwnerName: doc.footerOwnerName ?? "",
    footerCopyrightNotice: toLocalizedText(doc.footerCopyrightNotice as never),
    footerColumns: (doc.footerColumns ?? []).map((column) => ({
      title: toLocalizedText(column.title as never),
      links: (column.links ?? []).map((link) => ({
        label: toLocalizedText(link.label as never),
        href: link.href ?? "/",
      })),
    })),
    navAboutLabel: toLocalizedText(doc.navAboutLabel as never),
    navContactLabel: toLocalizedText(doc.navContactLabel as never),
  };
});

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

/** A project that exists as a page but has no content yet. See getProjects. */
function emptyProject(id: ProjectId): Project {
  const blank: LocalizedText = { ru: "", en: "", kk: "" };
  return {
    id,
    slug: PROJECT_SLUGS[id],
    accent: PROJECT_ACCENTS[id],
    name: PROJECT_FALLBACK_NAMES[id],
    tagline: blank,
    description: [],
    heroImage: toRequiredImageAsset(null, defaultLocale),
    offerings: [],
    contacts: {},
  };
}

export const getProjects = cache(async (): Promise<Record<ProjectId, Project>> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "projects",
    locale: "all",
    depth: 2,
    limit: 0,
    pagination: false,
    sort: "order",
  });

  /**
   * Start from a complete record rather than an empty object.
   *
   * The return type promises BOTH projects, and eleven call sites rely on that
   * — `projects.financial.slug` in lib/seo.ts, the nav builder below, the
   * layout, every project page. Building up from `{}` made that promise a lie
   * the moment the database had no rows, and `{} as Record<...>` hid it from
   * the compiler. On a freshly migrated production database that is exactly
   * the state, so the very first deploy crashed during prerender with
   * "Cannot read properties of undefined (reading 'slug')".
   *
   * A site backed by a CMS has to build on an empty database: the alternative
   * is that no deployment works until someone manually seeds it, and the
   * failure says nothing about why. Missing projects now render as empty
   * pages that fill in the moment content is added.
   */
  const byId: Record<ProjectId, Project> = {
    financial: emptyProject("financial"),
    travel: emptyProject("travel"),
  };

  for (const doc of result.docs) {
    const id = doc.projectId as ProjectId;
    const contacts = (doc.contacts ?? {}) as Row;
    const whatsappPhone = contacts.whatsappPhone as string | undefined;
    const telegramUsername = contacts.telegramUsername as string | undefined;
    const instagramUsername = contacts.instagramUsername as string | undefined;
    const email = contacts.email as string | undefined;

    byId[id] = {
      id,
      slug: PROJECT_SLUGS[id],
      accent: PROJECT_ACCENTS[id],
      name: toLocalizedText(doc.name as never),
      tagline: toLocalizedText(doc.tagline as never),
      description: toParagraphs(doc.description as never),
      heroImage: toRequiredImageAsset(doc.heroImage, defaultLocale),
      logo: toImageAsset(doc.logo, defaultLocale),
      offerings: (doc.offerings ?? []).map((offering, index) => ({
        id: offering.id ?? `offering-${index}`,
        title: toLocalizedText(offering.title as never),
        description: toLocalizedText(offering.description as never),
        icon: offering.icon ?? undefined,
        image: toImageAsset(offering.image, defaultLocale),
      })),
      contacts: {
        ...(whatsappPhone
          ? {
              whatsapp: {
                phone: whatsappPhone,
                prefilledMessage: toLocalizedText(contacts.whatsappMessage as never),
              },
            }
          : {}),
        ...(telegramUsername ? { telegram: { username: telegramUsername } } : {}),
        ...(instagramUsername
          ? {
              instagram: {
                username: instagramUsername,
                url: `https://instagram.com/${instagramUsername}`,
              },
            }
          : {}),
        ...(email ? { email: { address: email } } : {}),
      },
    };
  }

  return byId;
});

export const getGallery = cache(async (): Promise<GalleryImage[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "gallery",
    locale: "all",
    depth: 1,
    limit: 0,
    pagination: false,
    sort: "order",
  });

  return result.docs.flatMap((doc, index) => {
    const image = toImageAsset(doc.image, defaultLocale);
    if (!image) return [];
    return [
      {
        id: String(doc.id ?? index),
        image,
        caption: toOptionalLocalizedText(doc.caption as never),
        project: (doc.project ?? "shared") as GalleryImage["project"],
      },
    ];
  });
});

export const getFaq = cache(async (): Promise<FaqItem[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "faq",
    locale: "all",
    depth: 0,
    limit: 0,
    pagination: false,
    sort: "order",
  });

  return result.docs.map((doc, index) => ({
    id: String(doc.id ?? index),
    question: toLocalizedText(doc.question as never),
    answer: toLocalizedText(doc.answer as never),
    project: (doc.project ?? "shared") as FaqItem["project"],
  }));
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "testimonials",
    locale: "all",
    depth: 1,
    limit: 0,
    pagination: false,
    sort: "order",
  });

  return result.docs.map((doc, index) => ({
    id: String(doc.id ?? index),
    authorName: doc.authorName ?? "",
    authorRole: toOptionalLocalizedText(doc.authorRole as never),
    quote: toLocalizedText(doc.quote as never),
    avatar: toImageAsset(doc.avatar, defaultLocale),
    rating: doc.rating ?? undefined,
    project: (doc.project ?? "shared") as Testimonial["project"],
  }));
});

/** `placement` separates the homepage band from the About page's grid. */
async function getStatisticsFor(placement: "home" | "about"): Promise<Statistic[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "statistics",
    locale: "all",
    depth: 0,
    limit: 0,
    pagination: false,
    sort: "order",
    where: { placement: { equals: placement } },
  });

  return result.docs.map((doc, index) => ({
    id: String(doc.id ?? index),
    value: doc.value ?? 0,
    prefix: doc.prefix ?? undefined,
    suffix: doc.suffix ?? undefined,
    label: toLocalizedText(doc.label as never),
    project: (doc.project ?? "shared") as Statistic["project"],
  }));
}

export const getStatistics = cache(() => getStatisticsFor("home"));
export const getAchievements = cache(() => getStatisticsFor("about"));

/** `placement` separates "Why work with me" from "Mission & values". */
async function getValuePropositionsFor(
  placement: "why-choose-me" | "mission-values" | "financial-formats" | "financial-benefits"
): Promise<ValueProposition[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "value-propositions",
    locale: "all",
    depth: 0,
    limit: 0,
    pagination: false,
    sort: "order",
    where: { placement: { equals: placement } },
  });

  return result.docs.map((doc, index) => ({
    id: String(doc.id ?? index),
    icon: doc.icon ?? "star",
    title: toLocalizedText(doc.heading as never),
    description: toLocalizedText(doc.description as never),
  }));
}

export const getWhyChooseMe = cache(() => getValuePropositionsFor("why-choose-me"));
export const getMissionValues = cache(() => getValuePropositionsFor("mission-values"));
export const getFinancialLearningFormats = cache(() => getValuePropositionsFor("financial-formats"));
export const getFinancialBenefits = cache(() => getValuePropositionsFor("financial-benefits"));

export const getTimeline = cache(async (): Promise<TimelineEntry[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "timeline",
    locale: "all",
    depth: 0,
    limit: 0,
    pagination: false,
    sort: "order",
  });

  return result.docs.map((doc, index) => ({
    id: String(doc.id ?? index),
    date: doc.date ?? "",
    title: toLocalizedText(doc.title as never),
    description: toOptionalLocalizedText(doc.description as never),
  }));
});

export const getCertificates = cache(async (): Promise<Certificate[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "certificates",
    locale: "all",
    depth: 1,
    limit: 0,
    pagination: false,
    sort: "order",
  });

  return result.docs.flatMap((doc, index) => {
    const image = toImageAsset(doc.image, defaultLocale);
    if (!image) return [];
    return [
      {
        id: String(doc.id ?? index),
        title: toLocalizedText(doc.name as never),
        issuer: toOptionalLocalizedText(doc.issuer as never),
        image,
      },
    ];
  });
});

export const getSocialLinks = cache(async (): Promise<SocialLink[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "social-links",
    locale: "all",
    depth: 0,
    limit: 0,
    pagination: false,
    sort: "order",
  });

  return result.docs.map((doc) => ({
    platform: doc.platform as SocialLink["platform"],
    url: doc.url ?? "",
    project: (doc.project ?? "shared") as SocialLink["project"],
  }));
});

/**
 * The main nav. Routes are defined here, in code, because they are real pages
 * — only the labels come from the CMS. The two project entries take their
 * labels from the projects themselves, so renaming a project in the admin
 * renames its nav item automatically.
 */
export const getPrimaryNav = cache(async () => {
  const [settings, projects] = await Promise.all([getSiteSettings(), getProjects()]);

  return [
    { label: settings.navAboutLabel, href: "/about", project: "shared" as const },
    {
      label: projects.financial.name,
      href: `/${projects.financial.slug}`,
      project: "financial" as const,
    },
    { label: projects.travel.name, href: `/${projects.travel.slug}`, project: "travel" as const },
    { label: settings.navContactLabel, href: "/contact", project: "shared" as const },
  ];
});

/** Re-exported so callers do not need a second import for accent tokens. */
export { theme };
export type { Locale };
