import type { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";
import { imageField, localizedText, orderField } from "../fields/shared";

/**
 * cms/collections/Certificates.ts
 * ----------------------------------------------------------------------------
 * Scanned credentials shown on the About page. Mirrors `Certificate`
 * (src/types/content.ts).
 */
export const Certificates: CollectionConfig = {
  slug: "certificates",
  admin: {
    group: "Обо мне",
    useAsTitle: "title",
    defaultColumns: ["title", "order"],
    description: "Сертификаты и дипломы.",
  },
  labels: { singular: "Сертификат", plural: "Сертификаты" },
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
      admin: { position: "sidebar", description: "Видно только в админ-панели." },
    },
    localizedText("name", "Название сертификата", { required: true }),
    localizedText("issuer", "Кем выдан", { description: "Необязательно." }),
    imageField("image", "Скан или фото", { required: true, dimensions: "800×600" }),
    orderField,
  ],
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
};
