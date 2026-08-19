import type { CollectionConfig } from "payload";
import { localizedText, localizedTextarea, orderField } from "../fields/shared";

/**
 * cms/collections/ValuePropositions.ts
 * ----------------------------------------------------------------------------
 * The icon + title + description cards. Mirrors `ValueProposition`
 * (src/types/content.ts), which served FOUR separate config exports: the
 * homepage's "Why work with me", the About page's "Mission & Values", and the
 * Financial page's "Learning formats" and "Benefits". All four are the same
 * shape rendered by the same <FeatureGridSection>, so `placement` keeps them
 * in one collection rather than four near-identical ones — the same reasoning
 * as `project` on the tagged content lists.
 */
export const ValuePropositions: CollectionConfig = {
  slug: "value-propositions",
  admin: {
    group: "Контент",
    useAsTitle: "title",
    defaultColumns: ["title", "placement", "order"],
    description: "Карточки с иконкой и описанием. Поле «Где показывать» определяет раздел сайта.",
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
        { label: "Финансовая грамотность — «Форматы обучения»", value: "financial-formats" },
        { label: "Финансовая грамотность — «Что вы получите»", value: "financial-benefits" },
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
