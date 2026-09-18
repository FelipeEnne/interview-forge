import { beforeEach, describe, expect, it } from "vitest";

import { LOCALE_STORAGE_KEY } from "./locale";
import { readLocale, saveLocale } from "./local-storage-locale";

describe("local-storage-locale", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns English when the storage key is missing", () => {
    expect(readLocale()).toBe("en");
  });

  it("returns English when the stored value is invalid", () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, "es");
    expect(readLocale()).toBe("en");

    localStorage.setItem(LOCALE_STORAGE_KEY, "EN");
    expect(readLocale()).toBe("en");
  });

  it("persists a Portuguese selection", () => {
    saveLocale("pt");

    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("pt");
    expect(readLocale()).toBe("pt");
  });

  it("persists an English selection", () => {
    saveLocale("pt");
    saveLocale("en");

    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("en");
    expect(readLocale()).toBe("en");
  });

  it("does not write other LocalStorage keys", () => {
    localStorage.setItem("interview-forge:question-progress", '{"q1":{}}');
    saveLocale("pt");

    expect(localStorage.getItem("interview-forge:question-progress")).toBe(
      '{"q1":{}}',
    );
  });
});
