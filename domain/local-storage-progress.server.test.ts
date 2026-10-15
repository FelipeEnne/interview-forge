/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import {
  readQuestionProgress,
  saveQuestionProgress,
} from "./local-storage-progress";

describe("local-storage-progress without window", () => {
  it("reads an empty state when localStorage is unavailable", () => {
    expect(readQuestionProgress()).toEqual({});
  });

  it("does not throw when saving without localStorage", () => {
    expect(() =>
      saveQuestionProgress({
        q1: { lastRating: "good", reviewCount: 1 },
      }),
    ).not.toThrow();
  });
});
