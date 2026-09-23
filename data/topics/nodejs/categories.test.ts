/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { getLocalizedText } from "@/i18n/localized-text";
import { NODEJS_CATEGORIES, QUESTION_CATEGORIES } from "./categories";

describe("NODEJS_CATEGORIES", () => {
  it.each([
    ["fundamentals", "Fundamentals", "Fundamentos"],
    ["async", "Event Loop & Async", "Event Loop e Assincronismo"],
    ["modules", "Modules", "Módulos"],
    ["http", "HTTP & APIs", "HTTP e APIs"],
    ["express", "Express", "Express"],
    ["streams", "Streams & Buffers", "Streams e Buffers"],
    ["testing", "Testing", "Testes"],
    ["security", "Security", "Segurança"],
    ["production", "Production & Architecture", "Produção e Arquitetura"],
  ] as const)("localizes %s", (id, englishLabel, portugueseLabel) => {
    const category = NODEJS_CATEGORIES.find((item) => item.id === id)!;
    expect(getLocalizedText(category.displayName, "en")).toBe(englishLabel);
    expect(getLocalizedText(category.displayName, "pt")).toBe(portugueseLabel);
  });

  it("keeps the canonical category order", () => {
    expect(NODEJS_CATEGORIES.map(({ id }) => id)).toEqual(QUESTION_CATEGORIES);
  });
});
