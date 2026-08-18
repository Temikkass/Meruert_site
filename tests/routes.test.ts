import { describe, expect, it } from "vitest";
import { localizedPath, swapLocale } from "@/lib/routes";

/**
 * Every internal href on the site goes through these two functions, so a
 * regression here is a site-wide broken-link event rather than one bad page.
 */
describe("localizedPath", () => {
  it("prefixes an internal path with the locale", () => {
    expect(localizedPath("/about", "ru")).toBe("/ru/about");
    expect(localizedPath("/tours-and-courses", "kk")).toBe("/kk/tours-and-courses");
  });

  it("maps the site root to the locale root, not a trailing slash", () => {
    expect(localizedPath("/", "en")).toBe("/en");
  });

  it("is idempotent — a path that already carries a locale is untouched", () => {
    expect(localizedPath("/ru/about", "ru")).toBe("/ru/about");
    // Guards the "/ru/ru/about" class of bug when a link is wrapped twice.
    expect(localizedPath(localizedPath("/about", "ru"), "ru")).toBe("/ru/about");
  });

  it("keeps in-page anchors attached to the localized path", () => {
    expect(localizedPath("/#projects", "ru")).toBe("/ru#projects");
    expect(localizedPath("/about#timeline", "en")).toBe("/en/about#timeline");
  });

  it("leaves anything that is not an internal path alone", () => {
    expect(localizedPath("https://wa.me/7701", "ru")).toBe("https://wa.me/7701");
    expect(localizedPath("mailto:hi@example.com", "ru")).toBe("mailto:hi@example.com");
    expect(localizedPath("#faq", "ru")).toBe("#faq");
  });
});

describe("swapLocale", () => {
  it("preserves the current route when changing language", () => {
    expect(swapLocale("/ru/tours-and-courses", "en")).toBe("/en/tours-and-courses");
    expect(swapLocale("/en/about", "kk")).toBe("/kk/about");
  });

  it("handles the locale root", () => {
    expect(swapLocale("/ru", "en")).toBe("/en");
  });

  it("adds a locale to a path that has none", () => {
    expect(swapLocale("/about", "en")).toBe("/en/about");
  });
});
