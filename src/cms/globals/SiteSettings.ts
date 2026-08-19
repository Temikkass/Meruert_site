import type { GlobalConfig } from "payload";
import { revalidateGlobalAfterChange } from "../hooks/revalidate";
import { imageField, localizedText, localizedTextarea } from "../fields/shared";

/**
 * cms/globals/SiteSettings.ts
 * ----------------------------------------------------------------------------
 * Site-wide SEO defaults, the footer, and the two editable nav labels.
 * Mirrors the editable parts of `config/seo.ts` and `config/footer.ts`.
 *
 * NOT here, deliberately:
 *  - `baseUrl`, which comes from the NEXT_PUBLIC_SITE_URL environment
 *    variable. It is deployment configuration, not content, and a typo in it
 *    would break every canonical URL, the sitemap and robots.txt at once.
 *  - Link TARGETS. The client edits the labels; the routes come from a fixed
 *    list, because a link to a page that does not exist is a 404 they cannot
 *    diagnose. The select below offers only routes that actually exist.
 */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: {
    group: "Система",
    description: "Название сайта в поиске, описание, картинка для соцсетей и подвал.",
  },
  label: "Настройки сайта",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Поиск и соцсети",
          description: "Как сайт выглядит в результатах поиска и при отправке ссылки в мессенджере.",
          fields: [
            localizedText("defaultTitle", "Заголовок сайта", {
              required: true,
              description:
                "Показывается во вкладке браузера и в результатах поиска. Оптимально до 60 символов.",
            }),
            localizedTextarea("defaultDescription", "Описание сайта", {
              required: true,
              rows: 3,
              description: "Текст под ссылкой в результатах поиска. Оптимально 120–160 символов.",
            }),
            imageField("defaultOgImage", "Картинка для соцсетей", {
              required: true,
              dimensions: "1200×630",
              description:
                "Показывается, когда ссылку на сайт отправляют в WhatsApp, Telegram или соцсети.",
            }),
          ],
        },
        {
          label: "Подвал",
          fields: [
            {
              name: "footerOwnerName",
              type: "text",
              required: true,
              label: "Имя в копирайте",
              admin: { description: "Год подставляется автоматически, его указывать не нужно." },
            },
            localizedText("footerCopyrightNotice", "Текст после копирайта", {
              required: true,
              description: "Например: «Все права защищены».",
            }),
            {
              name: "footerColumns",
              type: "array",
              label: "Колонки ссылок",
              labels: { singular: "Колонка", plural: "Колонки" },
              admin: {
                description:
                  "Заголовки колонок и подписи ссылок. Адреса страниц выбираются из готового списка.",
                initCollapsed: true,
              },
              fields: [
                localizedText("title", "Заголовок колонки", { required: true }),
                {
                  name: "links",
                  type: "array",
                  label: "Ссылки",
                  labels: { singular: "Ссылка", plural: "Ссылки" },
                  fields: [
                    localizedText("label", "Подпись", { required: true }),
                    {
                      name: "href",
                      type: "select",
                      required: true,
                      label: "Страница",
                      options: [
                        { label: "Главная", value: "/" },
                        { label: "Обо мне", value: "/about" },
                        { label: "Финансовая грамотность", value: "/financial-literacy" },
                        { label: "Туры и курсы", value: "/tours-and-courses" },
                        { label: "Контакты", value: "/contact" },
                        { label: "Политика конфиденциальности", value: "/privacy-policy" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Меню",
          description: "Подписи пунктов главного меню. Названия проектов берутся из самих проектов.",
          fields: [
            localizedText("navAboutLabel", "Пункт «Обо мне»", { required: true }),
            localizedText("navContactLabel", "Пункт «Контакты»", { required: true }),
          ],
        },
      ],
    },
  ],
};
