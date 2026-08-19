import type { CollectionConfig } from "payload";
import { localizedText, orderField, projectScopeField } from "../fields/shared";

/**
 * cms/collections/Statistics.ts
 * ----------------------------------------------------------------------------
 * The animated counters ("500+ students mentored"). Mirrors `Statistic`
 * (src/types/content.ts).
 *
 * `value` is a NUMBER, with prefix/suffix as separate fields, because the
 * counter animates from zero up to it — storing "500+" as text would leave
 * nothing to count. That split already existed in the type; it is preserved
 * here so the client cannot accidentally break the animation by typing a
 * symbol into the number.
 *
 * `placement` covers BOTH the homepage "In numbers" band and the About page's
 * "Achievements" grid. Those looked like two different things and were two
 * config files, but config/achievements.ts exported `Statistic[]` and
 * <AchievementsSection> renders it through the same <StatCard> as the
 * homepage band — same shape, same component, different position. Modelling
 * them separately would have meant an "achievements" collection that dropped
 * the numbers on the floor.
 */
export const Statistics: CollectionConfig = {
  slug: "statistics",
  admin: {
    group: "Контент",
    useAsTitle: "title",
    defaultColumns: ["title", "value", "placement", "project", "order"],
    description: "Цифры, которые считаются вверх при прокрутке.",
  },
  labels: { singular: "Показатель", plural: "Показатели" },
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
      name: "value",
      type: "number",
      required: true,
      label: "Число",
      admin: { description: "Только цифры. Знаки «+» или «%» добавьте в полях ниже." },
    },
    { name: "prefix", type: "text", label: "Символ перед числом", admin: { description: "Например: «≈». Необязательно." } },
    { name: "suffix", type: "text", label: "Символ после числа", admin: { description: "Например: «+» или «%». Необязательно." } },
    localizedText("label", "Подпись", { required: true, description: "Что означает это число. Например: «учеников»." }),
    {
      name: "placement",
      type: "select",
      required: true,
      defaultValue: "home",
      label: "Где показывать",
      options: [
        { label: "Главная — «В цифрах»", value: "home" },
        { label: "Обо мне — «Достижения»", value: "about" },
      ],
    },
    projectScopeField,
    orderField,
  ],
};
