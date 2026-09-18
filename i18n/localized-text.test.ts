/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { getLocalizedText } from "./localized-text";

describe("getLocalizedText", () => {
  const value = {
    en: "What is the purpose of the Node.js Event Loop?",
    pt: "Qual é o papel do Event Loop no Node.js?",
  };

  it("returns English for the en locale", () => {
    expect(getLocalizedText(value, "en")).toBe(
      "What is the purpose of the Node.js Event Loop?",
    );
  });

  it("returns Portuguese for the pt locale", () => {
    expect(getLocalizedText(value, "pt")).toBe(
      "Qual é o papel do Event Loop no Node.js?",
    );
  });

  it("falls back to English when Portuguese is missing", () => {
    expect(getLocalizedText({ en: "Event Loop" }, "pt")).toBe("Event Loop");
  });
});
