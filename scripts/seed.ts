import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload, type Payload } from "payload";

import config from "../src/payload.config.js";

import { person } from "../src/config/person.js";
import { homeContent } from "../src/config/home.js";
import { aboutContent } from "../src/config/about.js";
import { contactPageContent } from "../src/config/contact-page.js";
import { financialPageContent } from "../src/config/financial-page.js";
import { travelPageContent } from "../src/config/travel-page.js";
import { privacyPolicyContent } from "../src/config/legal.js";
import { siteSeo } from "../src/config/seo.js";
import { footerColumns, footerOwnerName, footerCopyrightNotice } from "../src/config/footer.js";
import { financialProject } from "../src/config/financial.js";
import { travelProject } from "../src/config/travel.js";
import { gallery as galleryImages } from "../src/config/gallery.js";
import { faq as faqItems } from "../src/config/faq.js";
import { reviews as testimonials } from "../src/config/reviews.js";
import { statistics } from "../src/config/statistics.js";
import { achievements } from "../src/config/achievements.js";
import { whyChooseMe } from "../src/config/why-choose-me.js";
import { missionValues } from "../src/config/mission-values.js";
import { timelineEntries } from "../src/config/timeline.js";
import { certificates } from "../src/config/certificates.js";
import { socialLinks } from "../src/config/social.js";
import { primaryNav } from "../src/config/navigation.js";

import { defaultLocale, locales } from "../src/lib/locale.js";
import type { ImageAsset, Locale, LocalizedText, SectionCopy } from "../src/types/index.js";

/**
 * scripts/seed.ts
 * ----------------------------------------------------------------------------
 * Copies everything in src/config/*.ts into the database, so the admin panel
 * starts populated rather than empty.
 *
 * WHY THIS EXISTS RATHER THAN "the client retypes it"
 * The config files carry all three translations of ~208 strings, the
 * relationships between them, and the dimensions each ImageAsset declares.
 * Retyping that by hand would lose translations silently, and nobody could
 * then tell whether a blank Kazakh field was a migration bug or simply not
 * written yet. Seeding makes the CMS a faithful copy of what the site already
 * renders, which is also the only way to prove the data-layer swap changed
 * nothing.
 *
 * HOW LOCALES ARE WRITTEN — the non-obvious part
 * Payload writes ONE locale per operation. `locale: "all"` exists for reads
 * only; on a write it is silently ignored, and passing a { ru, en, kk } object
 * as a field value JSON-stringifies the whole object into the current locale's
 * slot. Both failures are invisible in the admin list view and surface only as
 * mangled text on the page.
 *
 * So each document is written once per locale: created in the default locale,
 * then updated for the others. Array rows must carry their `id` on those
 * follow-up writes, or Payload appends new rows instead of translating the
 * existing ones — that is what `withRowIds` is for.
 *
 * DESTRUCTIVE AND IDEMPOTENT: clears the content it owns before writing, so
 * re-running gives the same result rather than duplicates. It never touches
 * `users` — re-seeding must not delete the account you are signed in with.
 *
 * Run with: npm run seed
 */

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../public");

const otherLocales = locales.filter((locale) => locale !== defaultLocale);

/** One locale's string out of a LocalizedText. */
const t = (text: LocalizedText, locale: Locale): string => text[locale];

/** SectionCopy -> the group shape `sectionCopy()` produces, for one locale. */
const copy = (section: SectionCopy, locale: Locale) => ({
  eyebrow: section.eyebrow ? t(section.eyebrow, locale) : undefined,
  heading: t(section.heading, locale),
  subtitle: section.subtitle ? t(section.subtitle, locale) : undefined,
});

type Doc = Record<string, unknown>;

/**
 * Copies `id` from an already-saved document onto the matching array rows of a
 * follow-up, different-locale write. Without the id Payload appends new rows
 * rather than translating the existing ones.
 */
function withRowIds(next: unknown, saved: unknown): unknown {
  if (Array.isArray(next)) {
    if (!Array.isArray(saved)) return next;
    return next.map((row, index) => {
      const savedRow = saved[index];
      if (row && typeof row === "object" && savedRow && typeof savedRow === "object") {
        const merged = withRowIds(row, savedRow) as Doc;
        const id = (savedRow as Doc).id;
        return id === undefined ? merged : { ...merged, id };
      }
      return row;
    });
  }

  if (next && typeof next === "object" && saved && typeof saved === "object" && !Array.isArray(saved)) {
    const out: Doc = {};
    for (const [key, value] of Object.entries(next as Doc)) {
      out[key] = withRowIds(value, (saved as Doc)[key]);
    }
    return out;
  }

  return next;
}

type CollectionSlug = Parameters<Payload["create"]>[0]["collection"];
type GlobalSlug = Parameters<Payload["updateGlobal"]>[0]["slug"];

/** Creates one document, in every locale. */
async function createLocalized(
  payload: Payload,
  collection: CollectionSlug,
  build: (locale: Locale) => Doc
) {
  const created = await payload.create({
    collection,
    locale: defaultLocale,
    data: build(defaultLocale) as never,
  });

  for (const locale of otherLocales) {
    await payload.update({
      collection,
      id: created.id,
      locale,
      data: withRowIds(build(locale), created) as never,
    });
  }

  return created;
}

/** Updates one global, in every locale. */
async function updateLocalizedGlobal(
  payload: Payload,
  slug: GlobalSlug,
  build: (locale: Locale) => Doc
) {
  const saved = await payload.updateGlobal({
    slug,
    locale: defaultLocale,
    data: build(defaultLocale) as never,
  });

  for (const locale of otherLocales) {
    await payload.updateGlobal({
      slug,
      locale,
      data: withRowIds(build(locale), saved) as never,
    });
  }
}

/**
 * Uploads one image and returns its Media id, cached by source path so a photo
 * referenced twice is stored once.
 *
 * Alt text is required by the Media collection. Config carries only an English
 * alt, so it is written to all three locales rather than left blank in two — a
 * blank required field would later block the client from saving an unrelated
 * edit to that image.
 */
async function uploadImage(
  payload: Payload,
  asset: ImageAsset,
  cache: Map<string, number | string>
): Promise<number | string> {
  const cached = cache.get(asset.src);
  if (cached !== undefined) return cached;

  const created = await payload.create({
    collection: "media",
    filePath: path.join(publicDir, asset.src.replace(/^\//, "")),
    locale: defaultLocale,
    data: { alt: asset.alt } as never,
  });

  for (const locale of otherLocales) {
    await payload.update({
      collection: "media",
      id: created.id,
      locale,
      data: { alt: asset.alt } as never,
    });
  }

  cache.set(asset.src, created.id);
  return created.id;
}

/**
 * Empties the content collections, one document at a time.
 *
 * NOT a bulk `delete({ where: { id: { exists: true } } })`. That issues a
 * cascading delete against payload_preferences while the same pg client is
 * still streaming the parent delete, and node-postgres rejects the second
 * query on a busy client ("client is already executing a query"). Deleting by
 * id keeps every statement sequential on that one connection.
 *
 * MEDIA IS NOT CLEARED HERE. Globals hold required (NOT NULL) references to
 * images — site-settings.defaultOgImage, person.photo — so deleting the rows
 * they point at fails on the foreign key before anything can be re-seeded.
 * Old media is removed at the END of the run instead, by `deleteStaleMedia`,
 * once every global has been repointed at freshly uploaded images.
 */
async function clearCollections(payload: Payload) {
  const slugs = [
    "gallery",
    "testimonials",
    "faq",
    "statistics",
    "value-propositions",
    "timeline",
    "certificates",
    "social-links",
    "projects",
  ] as const;

  for (const collection of slugs) {
    const existing = await payload.find({ collection, limit: 0, depth: 0, pagination: false });
    for (const doc of existing.docs) {
      await payload.delete({ collection, id: doc.id });
    }
  }
}

/** Ids of the media rows that existed before this run began. */
async function findExistingMediaIds(payload: Payload): Promise<(number | string)[]> {
  const existing = await payload.find({ collection: "media", limit: 0, depth: 0, pagination: false });
  return existing.docs.map((doc) => doc.id);
}

/**
 * Removes the media rows carried over from a previous seed, now that
 * everything points at this run's uploads. Runs last for the reason described
 * on `clearCollections`.
 */
async function deleteStaleMedia(payload: Payload, staleIds: (number | string)[]) {
  for (const id of staleIds) {
    await payload.delete({ collection: "media", id });
  }
}

async function main() {
  const payload = await getPayload({ config });
  const images = new Map<string, number | string>();

  console.log("Clearing existing content...");
  const staleMediaIds = await findExistingMediaIds(payload);
  await clearCollections(payload);

  console.log("Uploading images...");
  const personPhoto = await uploadImage(payload, person.photo, images);
  const ogImage = await uploadImage(payload, siteSeo.defaultOgImage, images);

  console.log("Seeding projects...");
  for (const [index, project] of [financialProject, travelProject].entries()) {
    const heroImage = await uploadImage(payload, project.heroImage, images);
    const logo = project.logo ? await uploadImage(payload, project.logo, images) : undefined;

    const offeringImages = new Map<string, number | string | undefined>();
    for (const offering of project.offerings) {
      offeringImages.set(
        offering.id,
        offering.image ? await uploadImage(payload, offering.image, images) : undefined
      );
    }

    await createLocalized(payload, "projects", (locale) => ({
      projectId: project.id,
      title: project.name.ru,
      name: t(project.name, locale),
      tagline: t(project.tagline, locale),
      description: project.description.map((paragraph) => ({ text: t(paragraph, locale) })),
      heroImage,
      logo,
      offerings: project.offerings.map((offering) => ({
        title: t(offering.title, locale),
        description: t(offering.description, locale),
        icon: offering.icon,
        image: offeringImages.get(offering.id),
      })),
      contacts: {
        whatsappPhone: project.contacts.whatsapp?.phone,
        whatsappMessage: project.contacts.whatsapp
          ? t(project.contacts.whatsapp.prefilledMessage, locale)
          : undefined,
        telegramUsername: project.contacts.telegram?.username,
        instagramUsername: project.contacts.instagram?.username,
        email: project.contacts.email?.address,
      },
      order: index,
    }));
  }

  console.log("Seeding content lists...");

  for (const [index, item] of galleryImages.entries()) {
    const image = await uploadImage(payload, item.image, images);
    await createLocalized(payload, "gallery", (locale) => ({
      title: item.caption?.ru ?? `Фото ${index + 1}`,
      image,
      caption: item.caption ? t(item.caption, locale) : undefined,
      project: item.project ?? "shared",
      order: index,
    }));
  }

  for (const [index, item] of faqItems.entries()) {
    await createLocalized(payload, "faq", (locale) => ({
      questionTitle: item.question.ru,
      question: t(item.question, locale),
      answer: t(item.answer, locale),
      project: item.project ?? "shared",
      order: index,
    }));
  }

  for (const [index, item] of testimonials.entries()) {
    const avatar = item.avatar ? await uploadImage(payload, item.avatar, images) : undefined;
    await createLocalized(payload, "testimonials", (locale) => ({
      authorName: item.authorName,
      authorRole: item.authorRole ? t(item.authorRole, locale) : undefined,
      quote: t(item.quote, locale),
      avatar,
      rating: item.rating,
      project: item.project ?? "shared",
      order: index,
    }));
  }

  // Homepage "In numbers" and About "Achievements" share one collection — see
  // cms/collections/Statistics.ts for why.
  for (const [placement, items] of [
    ["home", statistics],
    ["about", achievements],
  ] as const) {
    for (const [index, item] of items.entries()) {
      await createLocalized(payload, "statistics", (locale) => ({
        title: item.label.ru,
        value: item.value,
        prefix: item.prefix,
        suffix: item.suffix,
        label: t(item.label, locale),
        placement,
        project: item.project ?? "shared",
        order: index,
      }));
    }
  }

  // "Why work with me" and "Mission & values" are both ValueProposition[].
  for (const [placement, items] of [
    ["why-choose-me", whyChooseMe],
    ["mission-values", missionValues],
  ] as const) {
    for (const [index, item] of items.entries()) {
      await createLocalized(payload, "value-propositions", (locale) => ({
        title: item.title.ru,
        placement,
        icon: item.icon,
        heading: t(item.title, locale),
        description: t(item.description, locale),
        order: index,
      }));
    }
  }

  for (const [index, item] of timelineEntries.entries()) {
    await createLocalized(payload, "timeline", (locale) => ({
      date: item.date,
      title: t(item.title, locale),
      description: item.description ? t(item.description, locale) : undefined,
      order: index,
    }));
  }

  for (const [index, item] of certificates.entries()) {
    const image = await uploadImage(payload, item.image, images);
    await createLocalized(payload, "certificates", (locale) => ({
      title: item.title.ru,
      name: t(item.title, locale),
      issuer: item.issuer ? t(item.issuer, locale) : undefined,
      image,
      order: index,
    }));
  }

  for (const [index, link] of socialLinks.entries()) {
    await createLocalized(payload, "social-links", () => ({
      title: `${link.platform} — ${link.project}`,
      platform: link.platform,
      url: link.url,
      project: link.project ?? "shared",
      order: index,
    }));
  }

  console.log("Seeding pages...");

  await updateLocalizedGlobal(payload, "person", (locale) => ({
    fullName: person.fullName,
    tagline: t(person.tagline, locale),
    biography: person.biography.map((paragraph) => ({ text: t(paragraph, locale) })),
    photo: personPhoto,
    credentials: person.credentials.map((credential) => ({
      label: t(credential.label, locale),
      year: credential.year,
    })),
    location: t(person.location, locale),
  }));

  await updateLocalizedGlobal(payload, "home-page", (locale) => ({
    hero: {
      eyebrow: t(homeContent.hero.eyebrow, locale),
      headline: t(homeContent.hero.headline, locale),
      intro: t(homeContent.hero.intro, locale),
      primaryCtaLabel: t(homeContent.hero.primaryCta.label, locale),
      secondaryCtaLabel: t(homeContent.hero.secondaryCta.label, locale),
      scrollIndicatorLabel: t(homeContent.hero.scrollIndicatorLabel, locale),
    },
    aboutPreview: copy(homeContent.aboutPreview, locale),
    projects: copy(homeContent.projects, locale),
    projectsCardCtaLabel: t(homeContent.projects.cardCtaLabel, locale),
    whyChooseMe: copy(homeContent.whyChooseMe, locale),
    statistics: copy(homeContent.statistics, locale),
    testimonials: copy(homeContent.testimonials, locale),
    galleryPreview: copy(homeContent.galleryPreview, locale),
    faqPreview: copy(homeContent.faqPreview, locale),
    cta: copy(homeContent.cta, locale),
  }));

  await updateLocalizedGlobal(payload, "about-page", (locale) => ({
    hero: {
      eyebrow: t(aboutContent.hero.eyebrow, locale),
      headline: t(aboutContent.hero.headline, locale),
      intro: t(aboutContent.hero.intro, locale),
      primaryCtaLabel: t(aboutContent.hero.primaryCta.label, locale),
      secondaryCtaLabel: t(aboutContent.hero.secondaryCta.label, locale),
      scrollIndicatorLabel: t(aboutContent.hero.scrollIndicatorLabel, locale),
    },
    biography: copy(aboutContent.biography, locale),
    missionValues: copy(aboutContent.missionValues, locale),
    timeline: copy(aboutContent.timeline, locale),
    achievements: copy(aboutContent.achievements, locale),
    certificates: copy(aboutContent.certificates, locale),
    gallery: copy(aboutContent.gallery, locale),
    cta: copy(aboutContent.cta, locale),
  }));

  await updateLocalizedGlobal(payload, "financial-page", (locale) => ({
    hero: {
      ...copy(financialPageContent.hero, locale),
      intro: t(financialPageContent.hero.intro, locale),
    },
    about: copy(financialPageContent.about, locale),
    services: copy(financialPageContent.services, locale),
    learningFormats: copy(financialPageContent.learningFormats, locale),
    benefits: copy(financialPageContent.benefits, locale),
    successStories: copy(financialPageContent.successStories, locale),
    gallery: copy(financialPageContent.gallery, locale),
    faq: copy(financialPageContent.faq, locale),
    cta: copy(financialPageContent.cta, locale),
  }));

  await updateLocalizedGlobal(payload, "travel-page", (locale) => ({
    hero: {
      ...copy(travelPageContent.hero, locale),
      intro: t(travelPageContent.hero.intro, locale),
    },
    about: copy(travelPageContent.about, locale),
    programs: copy(travelPageContent.programs, locale),
    tours: copy(travelPageContent.tours, locale),
    languageCourses: copy(travelPageContent.languageCourses, locale),
    camps: copy(travelPageContent.camps, locale),
    gallery: copy(travelPageContent.gallery, locale),
    reviews: copy(travelPageContent.reviews, locale),
    faq: copy(travelPageContent.faq, locale),
    cta: copy(travelPageContent.cta, locale),
  }));

  await updateLocalizedGlobal(payload, "contact-page", (locale) => ({
    hero: copy(contactPageContent.hero, locale),
    channelsHeading: copy(contactPageContent.channelsHeading, locale),
    primaryActionLabel: t(contactPageContent.primaryActionLabel, locale),
    locationLabel: t(contactPageContent.locationLabel, locale),
    workingHoursLabel: t(contactPageContent.workingHoursLabel, locale),
    workingHours: t(contactPageContent.workingHours, locale),
  }));

  await updateLocalizedGlobal(payload, "legal-page", (locale) => ({
    title: t(privacyPolicyContent.title, locale),
    lastUpdatedLabel: t(privacyPolicyContent.lastUpdatedLabel, locale),
    lastUpdated: privacyPolicyContent.lastUpdated,
    intro: t(privacyPolicyContent.intro, locale),
    sections: privacyPolicyContent.sections.map((section) => ({
      heading: t(section.heading, locale),
      body: section.body.map((paragraph) => ({ text: t(paragraph, locale) })),
    })),
  }));

  const aboutNav = primaryNav.find((item) => item.href === "/about");
  const contactNav = primaryNav.find((item) => item.href === "/contact");

  await updateLocalizedGlobal(payload, "site-settings", (locale) => ({
    defaultTitle: t(siteSeo.defaultTitle, locale),
    defaultDescription: t(siteSeo.defaultDescription, locale),
    defaultOgImage: ogImage,
    footerOwnerName,
    footerCopyrightNotice: t(footerCopyrightNotice, locale),
    footerColumns: footerColumns.map((column) => ({
      title: t(column.title, locale),
      links: column.links.map((link) => ({
        label: t(link.label, locale),
        href: link.href,
      })),
    })),
    navAboutLabel: aboutNav ? t(aboutNav.label, locale) : undefined,
    navContactLabel: contactNav ? t(contactNav.label, locale) : undefined,
  }));

  console.log("Removing images from the previous run...");
  await deleteStaleMedia(payload, staleMediaIds);

  console.log("\nSeed complete.");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
