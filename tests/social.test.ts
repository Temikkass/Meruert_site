import { describe, expect, it } from "vitest";
import { socialLabel } from "@/lib/social";
import { socialPlatformLabels } from "@/config/system";
import { locales } from "@/lib/locale";

/**
 * These labels are invisible unless you use a screen reader, which is exactly
 * why they need a test: nothing on screen changes when they regress. They were
 * hardcoded English on a trilingual site for the whole of the project's life
 * before this, and nobody noticed.
 */

describe("socialLabel", () => {
  it("returns the platform name in the requested locale", () => {
    expect(socialLabel("email", "ru")).toBe("Электронная почта");
    expect(socialLabel("email", "kk")).toBe("Электрондық пошта");
    expect(socialLabel("email", "en")).toBe("Email");
  });

  it("appends a qualifier when one is given", () => {
    expect(socialLabel("instagram", "ru", "Туры и курсы")).toBe("Instagram — Туры и курсы");
  });

  it("omits the separator when no qualifier is given", () => {
    expect(socialLabel("instagram", "ru")).toBe("Instagram");
  });

  it("distinguishes two icons of the same platform", () => {
    // The footer case: both projects have an Instagram, and a screen reader
    // must not announce them identically.
    const financial = socialLabel("instagram", "ru", "Финансовая грамотность");
    const travel = socialLabel("instagram", "ru", "Туры и курсы");
    expect(financial).not.toBe(travel);
  });

  it("has a non-empty label for every platform in every locale", () => {
    for (const platform of Object.keys(socialPlatformLabels) as (keyof typeof socialPlatformLabels)[]) {
      for (const locale of locales) {
        expect(socialLabel(platform, locale), `${platform}/${locale}`).toBeTruthy();
      }
    }
  });

  it("never leaks English into the Russian or Kazakh generic channels", () => {
    // Brand names (Instagram, WhatsApp) are the same everywhere and are
    // deliberately untranslated; the generic ones must not be.
    for (const platform of ["email", "phone"] as const) {
      expect(socialLabel(platform, "ru")).not.toBe(socialLabel(platform, "en"));
      expect(socialLabel(platform, "kk")).not.toBe(socialLabel(platform, "en"));
    }
  });
});
