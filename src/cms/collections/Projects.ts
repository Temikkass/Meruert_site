import type { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";
import { imageField, localizedText, localizedTextarea, orderField } from "../fields/shared";

/**
 * cms/collections/Projects.ts
 * ----------------------------------------------------------------------------
 * The two businesses the site introduces: Financial Literacy, and Tours /
 * Language Courses / Educational Camps. Mirrors the `Project` type
 * (src/types/project.ts), which both already satisfy — one shape, two records,
 * shared components.
 *
 * `offerings` is the array the client asked for by name: THIS IS WHERE NEW
 * TOURS, COURSES AND CAMPS GET ADDED. Adding one is a row in this list, and it
 * appears on that project's page and nowhere else, automatically.
 *
 * `slug` and `accent` are intentionally NOT editable. The slug is a live URL —
 * changing it silently breaks every link anyone has shared, and the route
 * itself is defined in code. The accent colors are design tokens tuned for
 * contrast (see config/theme.ts). Both are set once, in the seed.
 */
export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    group: "Проекты",
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
    description: "Два направления работы. Здесь добавляются новые туры, курсы и лагеря.",
  },
  labels: { singular: "Проект", plural: "Проекты" },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: () => false, // The site renders exactly these two; deleting one breaks a page.
  },
  fields: [
    {
      name: "projectId",
      type: "select",
      required: true,
      unique: true,
      label: "Проект",
      options: [
        { label: "Финансовая грамотность", value: "financial" },
        { label: "Туры и курсы", value: "travel" },
      ],
      admin: {
        readOnly: true,
        description: "Задаётся один раз. Связывает запись со страницей сайта.",
        position: "sidebar",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
      label: "Служебное название",
      admin: {
        position: "sidebar",
        description: "Видно только в админ-панели, чтобы отличать записи в списке.",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Основное",
          fields: [
            localizedText("name", "Название проекта", { required: true }),
            localizedTextarea("tagline", "Короткое описание", {
              required: true,
              description: "Одно предложение. Показывается на карточке проекта на главной.",
            }),
            {
              name: "description",
              type: "array",
              label: "Описание проекта",
              labels: { singular: "Абзац", plural: "Абзацы" },
              admin: {
                description: "Каждая запись — отдельный абзац на странице проекта.",
              },
              fields: [localizedTextarea("text", "Текст абзаца", { required: true, rows: 5 })],
            },
          ],
        },
        {
          label: "Изображения",
          fields: [
            imageField("heroImage", "Главное изображение", {
              required: true,
              dimensions: "1920×1080",
              description: "Крупное фото в шапке страницы проекта.",
            }),
            imageField("logo", "Логотип проекта", {
              dimensions: "240×80",
              description: "Необязательно.",
            }),
          ],
        },
        {
          label: "Услуги и программы",
          description:
            "Туры, курсы, лагеря и другие направления этого проекта. Добавляйте, удаляйте и меняйте порядок свободно.",
          fields: [
            {
              name: "offerings",
              type: "array",
              label: "Программы",
              labels: { singular: "Программа", plural: "Программы" },
              minRows: 1,
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: "@/cms/components/OfferingRowLabel#OfferingRowLabel",
                },
              },
              fields: [
                localizedText("title", "Название", { required: true }),
                localizedTextarea("description", "Описание", { required: true, rows: 4 }),
                {
                  name: "icon",
                  type: "select",
                  label: "Иконка",
                  defaultValue: "compass",
                  options: [
                    { label: "Компас (путешествия)", value: "compass" },
                    { label: "Язык (курсы)", value: "languages" },
                    { label: "Палатка (лагеря)", value: "tent" },
                    { label: "Кошелёк (финансы)", value: "wallet" },
                    { label: "График роста", value: "trending-up" },
                    { label: "Звезда", value: "star" },
                  ],
                  admin: {
                    description: "Небольшой значок рядом с названием программы.",
                  },
                },
                imageField("image", "Изображение", { dimensions: "1200×900" }),
              ],
            },
          ],
        },
        {
          label: "Контакты",
          description: "Каналы связи именно для этого проекта.",
          fields: [
            {
              name: "contacts",
              type: "group",
              label: "Каналы связи",
              fields: [
                {
                  name: "whatsappPhone",
                  type: "text",
                  label: "WhatsApp — номер",
                  admin: {
                    description:
                      "Только цифры, в международном формате, без «+» и пробелов. Например: 77011234567",
                  },
                },
                localizedTextarea("whatsappMessage", "WhatsApp — текст сообщения", {
                  description:
                    "Этот текст автоматически подставляется в поле ввода, когда человек нажимает кнопку WhatsApp.",
                }),
                {
                  name: "telegramUsername",
                  type: "text",
                  label: "Telegram — имя пользователя",
                  admin: { description: "Без символа «@». Например: meruert_tours" },
                },
                {
                  name: "instagramUsername",
                  type: "text",
                  label: "Instagram — имя пользователя",
                  admin: { description: "Без символа «@»." },
                },
                {
                  name: "email",
                  type: "email",
                  label: "Электронная почта",
                },
              ],
            },
          ],
        },
      ],
    },
    orderField,
  ],
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
};
