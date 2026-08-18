import type { CollectionConfig } from "payload";
import { localizedText, localizedTextarea, orderField } from "../fields/shared";

/**
 * cms/collections/ValuePropositions.ts
 * ----------------------------------------------------------------------------
 * The icon + title + description cards. Mirrors `ValueProposition`
 * (src/types/content.ts), which already served two sections: the homepage's
 * "Why work with me" and the About page's "Mission & Values". `placement`
 * keeps them in one collection rather than two near-identical ones — the same
 * reasoning as `project` on the tagged content lists.
 */
export const ValuePropositions: CollectionConfig = {
  slug: "value-propositions",
  admin: {
    group: "Контент",
    useAsTitle: "title",
    defaultColumns: ["title", "placement", "order"],
    description: "Карточки с иконкой: «Почему я» на главной и «Миссия и ценности» на странице «Обо мне».",
  },
  labels: { singular: "Карточка", plural: "Карточки с иконками" },
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
    {
      name: "placement",
      type: "select",
      required: true,
      defaultValue: "why-choose-me",
      label: "Где показывать",
      options: [
        { label: "Главная — «Почему я»", value: "why-choose-me" },
        { label: "Обо мне — «Миссия и ценности»", value: "mission-values" },
      ],
    },
    {
      name: "icon",
      type: "select",
      required: true,
      defaultValue: "star",
      label: "Иконка",
      options: [
        { label: "Звезда", value: "star" },
        { label: "Компас", value: "compass" },
        { label: "Кошелёк", value: "wallet" },
        { label: "График роста", value: "trending-up" },
        { label: "Язык", value: "languages" },
        { label: "Палатка", value: "tent" },
        { label: "Галочка", value: "check" },
        { label: "Информация", value: "info" },
      ],
    },
    localizedText("heading", "Заголовок", { required: true }),
    localizedTextarea("description", "Описание", { required: true, rows: 4 }),
    orderField,
  ],
};
