/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import {
  readQuizPerformance,
  saveQuizPerformance,
} from "./local-storage-quiz-performance";

describe("local-storage-quiz-performance without window", () => {
  it("reads empty performance when localStorage is unavailable", () => {
    expect(readQuizPerformance("react", ["hooks"])).toEqual({});
  });

  it("does not throw when saving without localStorage", () => {
    expect(() =>
      saveQuizPerformance("react", {
        hooks: { correct: 1, total: 2 },
      }),
    ).not.toThrow();
  });
});
