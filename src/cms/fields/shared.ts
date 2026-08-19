import type { Field, GroupField } from "payload";

/**
 * cms/fields/shared.ts
 * ----------------------------------------------------------------------------
 * Field factories for the shapes this site repeats. The point is the same as
 * the component library's: define a repeated structure once so the ~30 places
 * that use it cannot drift apart, and so a change to how (say) a section
 * heading is edited happens in one file.
 *
 * Every text field here is `localized: true`, which is what makes Payload
 * store { en, ru, kk } — the exact shape `LocalizedText` (src/types/common.ts)
 * has always had. That correspondence is why the component layer needs no
 * changes at all.
 */

/** A localized single-line string. */
export function localizedText(
  name: string,
  label: string,
  options: { required?: boolean; description?: string } = {}
): Field {
  return {
    name,
    type: "text",
    localized: true,
    required: options.required ?? false,
    label,
    ...(options.description ? { admin: { description: options.description } } : {}),
  };
}

/** A localized multi-line string, for anything longer than a headline. */
export function localizedTextarea(
  name: string,
  label: string,
  options: { required?: boolean; description?: string; rows?: number } = {}
): Field {
  return {
    name,
    type: "textarea",
    localized: true,
    required: options.required ?? false,
    label,
    admin: {
      rows: options.rows ?? 3,
      ...(options.description ? { description: options.description } : {}),
    },
  };
}

/**
 * The eyebrow + heading + subtitle grouping that opens nearly every section —
 * mirrors `SectionCopy` (src/types/content.ts) and the props of
 * <SectionHeading>. Used ~30 times across the globals below.
 *
 * `eyebrow` and `subtitle` are optional here for the same reason they are
 * optional in the type: several sections deliberately show only a heading.
 */
export function sectionCopy(
  name: string,
  label: string,
  options: { description?: string } = {}
): GroupField {
  return {
    name,
    type: "group",
    label,
    admin: options.description ? { description: options.description } : {},
    fields: [
      localizedText("eyebrow", "Надзаголовок", {
        description: "Короткая метка над заголовком, например «Обо мне». Необязательно.",
      }),
      localizedText("heading", "Заголовок", { required: true }),
      localizedTextarea("subtitle", "Подзаголовок", {
        description: "1–2 предложения под заголовком. Необязательно.",
      }),
    ],
  };
}

/**
 * A reference to an image in the Media collection.
 *
 * Alt text is NOT repeated here — it lives on the media item itself
 * (cms/collections/Media.ts), so one photo used in three places cannot end up
 * with three different descriptions, one of them blank.
 */
export function imageField(
  name: string,
  label: string,
  options: { required?: boolean; description?: string; dimensions?: string } = {}
): Field {
  const notes = [options.description, options.dimensions ? `Рекомендуемый размер: ${options.dimensions}.` : null]
    .filter(Boolean)
    .join(" ");

  return {
    name,
    type: "upload",
    relationTo: "media",
    required: options.required ?? false,
    label,
    ...(notes ? { admin: { description: notes } } : {}),
  };
}

/**
 * Which project a piece of content belongs to. Mirrors `ProjectId | "shared"`
 * (src/types/common.ts) — the tag components already filter on, so gallery
 * images, FAQs, reviews and statistics can live in one list each rather than
 * parallel per-project collections.
 */
export const projectScopeField: Field = {
  name: "project",
  type: "select",
  required: true,
  defaultValue: "shared",
  label: "Относится к",
  options: [
    { label: "Общее (главная страница)", value: "shared" },
    { label: "Финансовая грамотность", value: "financial" },
    { label: "Туры и курсы", value: "travel" },
  ],
  admin: {
    description: "Определяет, на какой странице показывается эта запись.",
  },
};

/**
 * Manual ordering. Payload sorts by this ascending, so the client can
 * reorder content without deleting and re-creating it. Lower numbers first.
 */
export const orderField: Field = {
  name: "order",
  type: "number",
  required: true,
  defaultValue: 0,
  label: "Порядок",
  admin: {
    description: "Чем меньше число, тем выше запись в списке.",
    position: "sidebar",
  },
};
