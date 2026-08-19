import type { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";
import { imageField, localizedText, orderField, projectScopeField } from "../fields/shared";

/**
 * cms/collections/Gallery.ts
 * ----------------------------------------------------------------------------
 * Photographs shown in the gallery strips and lightbox. Mirrors `GalleryImage`
 * (src/types/content.ts). One list, tagged by project — the same shape the
 * components already filter on.
 */
export const Gallery: CollectionConfig = {
  slug: "gallery",
  admin: {
    group: "Контент",
    useAsTitle: "title",
    defaultColumns: ["title", "project", "order"],
    description: "Фотографии для галереи на главной и на страницах проектов.",
  },
  labels: { singular: "Фотография", plural: "Галерея" },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: "order",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Служебное название",
      admin: { description: "Видно только в админ-панели, чтобы находить фото в списке." },
    },
    imageField("image", "Фотография", { required: true, dimensions: "не менее 1600px по длинной стороне" }),
    localizedText("caption", "Подпись", { description: "Необязательно. Показывается под фото." }),
    projectScopeField,
    orderField,
  ],
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
};
