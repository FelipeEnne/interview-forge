import { describe, expect, it } from "vitest";

import {
  getLowestCategoryPerformance,
  recordQuizPerformance,
  type QuizPerformance,
} from "@/domain/quiz-performance";

describe("recordQuizPerformance", () => {
  it("records a first result and accumulates later category results", () => {
    const initial: QuizPerformance = {
      async: { correct: 1, total: 2 },
      modules: { correct: 1, total: 1 },
    };

    const updated = recordQuizPerformance(initial, {
      async: { correct: 2, total: 3 },
      streams: { correct: 0, total: 2 },
    });

    expect(updated).toEqual({
      async: { correct: 3, total: 5 },
      modules: { correct: 1, total: 1 },
      streams: { correct: 0, total: 2 },
    });
    expect(initial).toEqual({
      async: { correct: 1, total: 2 },
      modules: { correct: 1, total: 1 },
    });
  });
});

describe("getLowestCategoryPerformance", () => {
  it("returns up to three eligible categories ordered by exact accuracy", () => {
    const performance: QuizPerformance = {
      fundamentals: { correct: 1, total: 2 },
      async: { correct: 2, total: 3 },
      modules: { correct: 1, total: 3 },
      http: { correct: 3, total: 4 },
      streams: { correct: 0, total: 1 },
    };

    expect(getLowestCategoryPerformance(performance)).toEqual([
      {
        category: "modules",
        correct: 1,
        total: 3,
        percentage: 33,
      },
      {
        category: "fundamentals",
        correct: 1,
        total: 2,
        percentage: 50,
      },
      {
        category: "async",
        correct: 2,
        total: 3,
        percentage: 67,
      },
    ]);
  });

  it("excludes categories with fewer than two encountered questions", () => {
    expect(
      getLowestCategoryPerformance({
        async: { correct: 0, total: 1 },
      }),
    ).toEqual([]);
  });

  it("uses canonical category order to break exact ties", () => {
    const performance: QuizPerformance = {
      security: { correct: 1, total: 2 },
      streams: { correct: 2, total: 4 },
      async: { correct: 3, total: 6 },
      fundamentals: { correct: 1, total: 2 },
    };

    expect(
      getLowestCategoryPerformance(performance).map(({ category }) => category),
    ).toEqual(["fundamentals", "async", "streams"]);
  });
});
