/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import {
  getLowestCategoryPerformance,
  recordQuizPerformance,
  type QuizPerformance,
} from "@/domain/quiz-performance";

describe("recordQuizPerformance", () => {
  it("records a first result and accumulates later category results", () => {
    const initial: QuizPerformance = {
      hooks: { correct: 1, total: 2 },
      state: { correct: 1, total: 1 },
    };

    const updated = recordQuizPerformance(initial, {
      hooks: { correct: 2, total: 3 },
      effects: { correct: 0, total: 2 },
    });

    expect(updated).toEqual({
      hooks: { correct: 3, total: 5 },
      state: { correct: 1, total: 1 },
      effects: { correct: 0, total: 2 },
    });
    expect(initial).toEqual({
      hooks: { correct: 1, total: 2 },
      state: { correct: 1, total: 1 },
    });
  });
});

describe("getLowestCategoryPerformance", () => {
  const categories = ["hooks", "state", "effects", "context", "refs"] as const;

  it("returns up to three eligible categories ordered by exact accuracy", () => {
    const performance: QuizPerformance = {
      hooks: { correct: 1, total: 2 },
      state: { correct: 2, total: 3 },
      effects: { correct: 1, total: 3 },
      context: { correct: 3, total: 4 },
      refs: { correct: 0, total: 1 },
    };

    expect(getLowestCategoryPerformance(performance, categories)).toEqual([
      { category: "effects", correct: 1, total: 3, percentage: 33 },
      { category: "hooks", correct: 1, total: 2, percentage: 50 },
      { category: "state", correct: 2, total: 3, percentage: 67 },
    ]);
  });

  it("excludes categories with fewer than two encountered questions", () => {
    expect(
      getLowestCategoryPerformance(
        { hooks: { correct: 0, total: 1 } },
        categories,
      ),
    ).toEqual([]);
  });

  it("uses supplied category order to break exact ties", () => {
    const performance: QuizPerformance = {
      refs: { correct: 1, total: 2 },
      effects: { correct: 2, total: 4 },
      state: { correct: 3, total: 6 },
      hooks: { correct: 1, total: 2 },
    };

    expect(
      getLowestCategoryPerformance(performance, categories).map(
        ({ category }) => category,
      ),
    ).toEqual(["hooks", "state", "effects"]);
  });
});
