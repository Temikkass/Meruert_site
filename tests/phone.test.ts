import { describe, expect, it } from "vitest";
import { createWhatsappLink, formatPhone } from "@/lib/phone";
import type { WhatsAppChannel } from "@/types";

const channel: WhatsAppChannel = {
  phone: "77010000001",
  prefilledMessage: { en: "Hello!", ru: "Здравствуйте!", kk: "Сәлеметсіз бе!" },
};

describe("formatPhone", () => {
  it("groups a KZ/RU-style number for display", () => {
    expect(formatPhone("77011234567")).toBe("+7 701 123 45 67");
  });

  it("falls back to raw digits rather than throwing on an unexpected length", () => {
    expect(formatPhone("12345")).toBe("+12345");
  });

  it("strips non-digits the client may have typed", () => {
    expect(formatPhone("+7 (701) 123-45-67")).toBe("+7 701 123 45 67");
  });
});

describe("createWhatsappLink", () => {
  it("builds a wa.me link with the message for the requested locale", () => {
    const link = createWhatsappLink(channel, "ru");
    expect(link.startsWith("https://wa.me/77010000001?text=")).toBe(true);
    expect(decodeURIComponent(link.split("text=")[1] ?? "")).toBe("Здравствуйте!");
  });

  it("uses each locale's own message", () => {
    for (const [locale, expected] of [["en", "Hello!"], ["kk", "Сәлеметсіз бе!"]] as const) {
      const link = createWhatsappLink(channel, locale);
      expect(decodeURIComponent(link.split("text=")[1] ?? "")).toBe(expected);
    }
  });
});
