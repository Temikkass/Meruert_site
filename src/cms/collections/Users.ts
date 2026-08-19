import type { CollectionConfig } from "payload";

/**
 * cms/collections/Users.ts
 * ----------------------------------------------------------------------------
 * Who can sign in to /admin. Deliberately minimal: this site has one editor
 * (the owner). There is no public signup — `create` is restricted to signed-in
 * users, so the only way a second account appears is an existing editor making
 * one on purpose.
 *
 * `auth: true` gives Payload's built-in email/password login, sessions,
 * password reset and rate limiting. Nothing here is hand-rolled.
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Система",
    description: "Пользователи, которые могут входить в админ-панель.",
  },
  labels: {
    singular: "Пользователь",
    plural: "Пользователи",
  },
  access: {
    // Only an authenticated editor can create, read, update or delete accounts.
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Имя",
      admin: { description: "Показывается в интерфейсе админ-панели." },
    },
  ],
};
