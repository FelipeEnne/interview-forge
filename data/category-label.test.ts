/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { getCategoryLabel } from "./category-label";

const categories = [
  { id: "hooks", displayName: { en: "Hooks", pt: "Hooks" } },
] as const;

describe("getCategoryLabel", () => {
  it("localizes a known category display name", () => {
    expect(getCategoryLabel(categories, "hooks", (text) => text.en)).toBe(
      "Hooks",
    );
  });

  it("falls back to the raw category id when unknown", () => {
    expect(getCategoryLabel(categories, "missing", (text) => text.en)).toBe(
      "missing",
    );
  });
});
