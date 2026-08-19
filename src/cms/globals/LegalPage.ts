import type { GlobalConfig } from "payload";
import { revalidateGlobalAfterChange } from "../hooks/revalidate";
import { localizedText, localizedTextarea } from "../fields/shared";

/**
 * cms/globals/LegalPage.ts
 * ----------------------------------------------------------------------------
 * The Privacy Policy. Mirrors `LegalPageContent` (src/types/legal.ts).
 *
 * `lastUpdated` is a real date field rather than free text, because the page
 * formats it per locale at render time — a typed string would have to be
 * written three times and would still format inconsistently.
 *
 * The shipped text is placeholder and must be replaced by the client or their
 * lawyer before launch. The admin description says so out loud: this is the
 * one piece of site copy where wrong content has legal consequences rather
 * than cosmetic ones.
 */
export const LegalPage: GlobalConfig = {
  slug: "legal-page",
  admin: {
    group: "Страницы",
    description:
      "Политика конфиденциальности. ВНИМАНИЕ: сейчас здесь шаблонный текст — замените его перед запуском сайта.",
  },
  label: "Политика конфиденциальности",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    localizedText("title", "Заголовок страницы", { required: true }),
    localizedText("lastUpdatedLabel", "Подпись «Обновлено»", { required: true }),
    {
      name: "lastUpdated",
      type: "date",
      required: true,
      label: "Дата обновления",
      admin: {
        description: "Показывается на странице и форматируется под язык посетителя.",
        date: { pickerAppearance: "dayOnly", displayFormat: "d MMMM yyyy" },
      },
    },
    localizedTextarea("intro", "Вступление", { required: true, rows: 4 }),
    {
      name: "sections",
      type: "array",
      label: "Разделы",
      labels: { singular: "Раздел", plural: "Разделы" },
      admin: { initCollapsed: true },
      fields: [
        localizedText("heading", "Заголовок раздела", { required: true }),
        {
          name: "body",
          type: "array",
          label: "Текст",
          labels: { singular: "Абзац", plural: "Абзацы" },
          minRows: 1,
          fields: [localizedTextarea("text", "Абзац", { required: true, rows: 4 })],
        },
      ],
    },
  ],
};
