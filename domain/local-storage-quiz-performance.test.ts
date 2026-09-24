import { beforeEach, describe, expect, it } from "vitest";

import {
  QUIZ_PERFORMANCE_STORAGE_KEY,
  getQuizPerformanceStorageKey,
  readQuizPerformance,
  saveQuizPerformance,
} from "@/domain/local-storage-quiz-performance";
import type { QuizPerformance } from "@/domain/quiz-performance";

const nodejsCategories = ["async", "streams"] as const;
const reactCategories = ["hooks", "state", "async"] as const;

const samplePerformance: QuizPerformance = {
  async: { correct: 3, total: 5 },
  streams: { correct: 1, total: 4 },
};

describe("local-storage-quiz-performance", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty performance when the storage key is missing", () => {
    expect(readQuizPerformance("nodejs", nodejsCategories)).toEqual({});
  });

  it("reads existing Node.js performance from the historical storage key", () => {
    localStorage.setItem(
      QUIZ_PERFORMANCE_STORAGE_KEY,
      JSON.stringify(samplePerformance),
    );

    expect(readQuizPerformance("nodejs", nodejsCategories)).toEqual(
      samplePerformance,
    );
  });

  it("continues writing Node.js performance to the historical storage key", () => {
    saveQuizPerformance("nodejs", samplePerformance);

    expect(localStorage.getItem(QUIZ_PERFORMANCE_STORAGE_KEY)).toBe(
      JSON.stringify(samplePerformance),
    );
  });

  it("uses React's topic-specific key for its performance", () => {
    expect(getQuizPerformanceStorageKey("react")).toBe(
      "interview-forge:quiz-attempts:react",
    );

    saveQuizPerformance("react", { hooks: { correct: 1, total: 2 } });

    expect(localStorage.getItem("interview-forge:quiz-attempts:react")).toBe(
      JSON.stringify({ hooks: { correct: 1, total: 2 } }),
    );
  });

  it("uses Angular's topic-specific key for its performance", () => {
    expect(getQuizPerformanceStorageKey("angular")).toBe(
      "interview-forge:quiz-attempts:angular",
    );

    saveQuizPerformance("angular", { observables: { correct: 1, total: 2 } });

    expect(localStorage.getItem("interview-forge:quiz-attempts:angular")).toBe(
      JSON.stringify({ observables: { correct: 1, total: 2 } }),
    );
  });

  it("keeps matching category ids isolated between topics", () => {
    saveQuizPerformance("nodejs", { async: { correct: 3, total: 5 } });
    saveQuizPerformance("react", { async: { correct: 1, total: 2 } });

    expect(readQuizPerformance("nodejs", nodejsCategories)).toEqual({
      async: { correct: 3, total: 5 },
    });
    expect(readQuizPerformance("react", reactCategories)).toEqual({
      async: { correct: 1, total: 2 },
    });
  });

  it.each([
    ["invalid JSON", "not-json{"],
    ["a non-object root", "[]"],
    [
      "an unknown category",
      JSON.stringify({ databases: { correct: 1, total: 2 } }),
    ],
    ["incoherent counts", JSON.stringify({ async: { correct: 3, total: 2 } })],
    [
      "non-integer counts",
      JSON.stringify({ async: { correct: 0.5, total: 2 } }),
    ],
  ])("returns empty performance for %s", (_description, raw) => {
    localStorage.setItem(QUIZ_PERFORMANCE_STORAGE_KEY, raw);

    expect(readQuizPerformance("nodejs", nodejsCategories)).toEqual({});
  });

  it("invalidates the whole blob when one category is invalid", () => {
    localStorage.setItem(
      QUIZ_PERFORMANCE_STORAGE_KEY,
      JSON.stringify({
        async: { correct: 1, total: 2 },
        streams: { correct: -1, total: 2 },
      }),
    );

    expect(readQuizPerformance("nodejs", nodejsCategories)).toEqual({});
  });
});
