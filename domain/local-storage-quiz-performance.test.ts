import { beforeEach, describe, expect, it } from "vitest";

import {
  QUIZ_PERFORMANCE_STORAGE_KEY,
  readQuizPerformance,
  saveQuizPerformance,
} from "@/domain/local-storage-quiz-performance";
import type { QuizPerformance } from "@/domain/quiz-performance";

const samplePerformance: QuizPerformance = {
  async: { correct: 3, total: 5 },
  streams: { correct: 1, total: 4 },
};

describe("local-storage-quiz-performance", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty performance when the storage key is missing", () => {
    expect(readQuizPerformance()).toEqual({});
  });

  it("round-trips performance through localStorage", () => {
    saveQuizPerformance(samplePerformance);

    expect(readQuizPerformance()).toEqual(samplePerformance);
  });

  it.each([
    ["invalid JSON", "not-json{"],
    ["a non-object root", "[]"],
    [
      "an unknown category",
      JSON.stringify({ databases: { correct: 1, total: 2 } }),
    ],
    [
      "incoherent counts",
      JSON.stringify({ async: { correct: 3, total: 2 } }),
    ],
    [
      "non-integer counts",
      JSON.stringify({ async: { correct: 0.5, total: 2 } }),
    ],
  ])("returns empty performance for %s", (_description, raw) => {
    localStorage.setItem(QUIZ_PERFORMANCE_STORAGE_KEY, raw);

    expect(readQuizPerformance()).toEqual({});
  });

  it("invalidates the whole blob when one category is invalid", () => {
    localStorage.setItem(
      QUIZ_PERFORMANCE_STORAGE_KEY,
      JSON.stringify({
        async: { correct: 1, total: 2 },
        streams: { correct: -1, total: 2 },
      }),
    );

    expect(readQuizPerformance()).toEqual({});
  });
});
