/**
 * config/contact-page.ts
 * ----------------------------------------------------------------------------
 * Location reuses `person.location` (already in config/person.ts) rather
 * than duplicating it — only "working hours" is genuinely new content,
 * since nothing existing covers it. Contact CHANNELS themselves (WhatsApp/
 * Telegram/Instagram/Email) are read directly from config/contacts.ts by
 * the Contact page — this file is only the page's own copy and form
 * labels, not another place channel data lives.
 */

import type { ContactPageContent } from "@/types";

export const contactPageContent: ContactPageContent = {
  hero: {
    eyebrow: { en: "Contact", ru: "Контакты", kk: "Байланыс" },
    heading: {
      en: "Let's start a conversation.",
      ru: "Давайте начнём разговор.",
      kk: "Әңгімені бастайық.",
    },
    subtitle: {
      en: "Replace with a short subtitle inviting people to reach out.",
      ru: "Замените коротким подзаголовком.",
      kk: "Қысқаша субтитрмен ауыстырыңыз.",
    },
  },

  channelsHeading: {
    eyebrow: { en: "Reach out directly", ru: "Свяжитесь напрямую", kk: "Тікелей хабарласыңыз" },
    heading: {
      en: "Pick the channel that fits your project.",
      ru: "Выберите удобный канал связи.",
      kk: "Жобаңызға сай арнаны таңдаңыз.",
    },
  },

  locationLabel: { en: "Location", ru: "Локация", kk: "Орналасқан жері" },
  workingHoursLabel: { en: "Working Hours", ru: "Часы работы", kk: "Жұмыс уақыты" },
  workingHours: {
    en: "Mon–Fri, 10:00–18:00",
    ru: "Пн–Пт, 10:00–18:00",
    kk: "Дс–Жм, 10:00–18:00",
  },

  formSection: {
    eyebrow: { en: "Send a message", ru: "Отправить сообщение", kk: "Хабарлама жіберу" },
    heading: {
      en: "Prefer to write it out?",
      ru: "Хотите написать напрямую?",
      kk: "Тікелей жазғыңыз келе ме?",
    },
    subtitle: {
      en: "This form is a template — it validates your message but isn't wired to a backend yet. Use WhatsApp, Telegram, or email above for now.",
      ru: "Эта форма — шаблон: она проверяет сообщение, но пока не подключена к серверу. Пока используйте WhatsApp, Telegram или email выше.",
      kk: "Бұл форма — үлгі: хабарламаны тексереді, бірақ серверге әлі қосылмаған. Әзірге жоғарыдағы WhatsApp, Telegram немесе email пайдаланыңыз.",
    },
  },

  form: {
    nameLabel: { en: "Name", ru: "Имя", kk: "Аты" },
    namePlaceholder: { en: "Your name", ru: "Ваше имя", kk: "Атыңыз" },
    emailLabel: { en: "Email", ru: "Email", kk: "Email" },
    emailPlaceholder: { en: "you@example.com", ru: "you@example.com", kk: "you@example.com" },
    projectLabel: { en: "Which project is this about?", ru: "О каком проекте вопрос?", kk: "Қай жоба туралы?" },
    messageLabel: { en: "Message", ru: "Сообщение", kk: "Хабарлама" },
    messagePlaceholder: {
      en: "Tell me a little about what you're looking for...",
      ru: "Расскажите немного о том, что вы ищете...",
      kk: "Не іздеп жүргеніңіз туралы қысқаша айтыңыз...",
    },
    submitLabel: { en: "Send message", ru: "Отправить", kk: "Жіберу" },
    submittingLabel: { en: "Sending...", ru: "Отправка...", kk: "Жіберілуде..." },
    successMessage: {
      en: "Thanks — this is a template form, so nothing was actually sent yet.",
      ru: "Спасибо — это форма-шаблон, поэтому сообщение пока не отправлено.",
      kk: "Рахмет — бұл үлгі форма, сондықтан хабарлама әлі жіберілген жоқ.",
    },
    errorMessage: {
      en: "Something looks off — please check the form and try again.",
      ru: "Что-то не так — проверьте форму и попробуйте снова.",
      kk: "Бірдеңе дұрыс емес — форманы тексеріп, қайталап көріңіз.",
    },
    validation: {
      nameRequired: { en: "Please enter your name.", ru: "Пожалуйста, введите имя.", kk: "Атыңызды енгізіңіз." },
      emailInvalid: { en: "Please enter a valid email.", ru: "Введите корректный email.", kk: "Жарамды email енгізіңіз." },
      messageRequired: { en: "Please enter a message.", ru: "Пожалуйста, введите сообщение.", kk: "Хабарлама енгізіңіз." },
      messageTooShort: {
        en: "Please write a bit more so it's clear what you need.",
        ru: "Напишите чуть больше, чтобы было понятно, что вам нужно.",
        kk: "Не қажет екені түсінікті болу үшін толығырақ жазыңыз.",
      },
    },
  },
};
