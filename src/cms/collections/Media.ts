import type { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

/**
 * cms/collections/Media.ts
 * ----------------------------------------------------------------------------
 * Every image on the site. This collection exists to produce exactly the
 * `ImageAsset` shape the components already consume (src/types/common.ts):
 * `src`, `alt`, `width`, `height`.
 *
 * WHY `alt` IS REQUIRED, NOT OPTIONAL
 * The site currently has zero missing alt text, and an admin panel is
 * precisely where that quietly regresses — the first time someone uploads a
 * photo in a hurry. Making it a required field means the CMS cannot produce
 * an inaccessible image at all. `alt` is localized because the same photo
 * needs a different description in Russian and English.
 *
 * `width`/`height` are recorded by Payload automatically on upload, which is
 * what lets `next/image` reserve the correct box and keeps the layout from
 * shifting — the same reason those fields were required in ImageAsset.
 */
export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Медиа",
    description: "Все изображения сайта. Загрузите файл и добавьте описание.",
    useAsTitle: "filename",
  },
  labels: {
    singular: "Изображение",
    plural: "Изображения",
  },
  access: {
    // Images are shown on the public site, so anyone may read them.
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
      label: "Описание изображения (alt)",
      admin: {
        description:
          "Коротко опишите, что на фото. Это читают программы для незрячих и поисковые системы. Например: «Меруерт проводит урок финансовой грамотности».",
      },
    },
  ],
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
};
