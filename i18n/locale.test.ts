/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_STORAGE_KEY,
  parseLocale,
} from "./locale";

describe("locale", () => {
  it("accepts valid locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("pt")).toBe(true);
  });

  it("rejects invalid locales", () => {
    expect(isLocale("es")).toBe(false);
    expect(isLocale("EN")).toBe(false);
    expect(isLocale(null)).toBe(false);
    expect(isLocale(undefined)).toBe(false);
    expect(isLocale(1)).toBe(false);
  });

  it("parses a valid locale as itself", () => {
    expect(parseLocale("en")).toBe("en");
    expect(parseLocale("pt")).toBe("pt");
  });

  it("falls back to English for invalid values", () => {
    expect(parseLocale("es")).toBe(DEFAULT_LOCALE);
    expect(parseLocale("")).toBe("en");
    expect(parseLocale(null)).toBe("en");
  });

  it("uses a dedicated LocalStorage key", () => {
    expect(LOCALE_STORAGE_KEY).toBe("interview-forge:locale");
  });
});
