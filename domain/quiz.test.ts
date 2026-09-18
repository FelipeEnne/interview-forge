/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import type { QuizQuestion } from "@/data/nodejs-quiz-questions";
import { calculateQuizResult, selectQuizQuestions } from "./quiz";

function question(
  overrides: Partial<QuizQuestion> & Pick<QuizQuestion, "id">,
): QuizQuestion {
  return {
    category: "fundamentals",
    question: `${overrides.id}?`,
    options: ["A", "B", "C", "D"],
    correctOption: 0,
    ...overrides,
  };
}

const bank: QuizQuestion[] = [
  question({ id: "q1", category: "fundamentals" }),
  question({ id: "q2", category: "async" }),
  question({ id: "q3", category: "modules" }),
  question({ id: "q4", category: "http" }),
  question({ id: "q5", category: "express" }),
  question({ id: "q6", category: "streams" }),
  question({ id: "q7", category: "testing" }),
  question({ id: "q8", category: "security" }),
  question({ id: "q9", category: "fundamentals" }),
  question({ id: "q10", category: "async" }),
  question({ id: "q11", category: "http" }),
  question({ id: "q12", category: "security" }),
];

describe("selectQuizQuestions", () => {
  it("returns exactly the requested count without duplicates", () => {
    const selected = selectQuizQuestions(bank, 10, () => 0);

    expect(selected).toHaveLength(10);
    expect(new Set(selected.map(({ id }) => id)).size).toBe(10);
  });

  it("is reproducible when randomSource is controlled", () => {
    const first = selectQuizQuestions(bank, 10, () => 0.3);
    const second = selectQuizQuestions(bank, 10, () => 0.3);

    expect(first.map(({ id }) => id)).toEqual(second.map(({ id }) => id));
  });

  it("does not mutate the question bank", () => {
    const originalIds = bank.map(({ id }) => id);

    selectQuizQuestions(bank, 10, () => 0.9);

    expect(bank.map(({ id }) => id)).toEqual(originalIds);
  });
});

describe("calculateQuizResult", () => {
  const attempt = [
    question({ id: "a", category: "async", correctOption: 1 }),
    question({ id: "b", category: "async", correctOption: 2 }),
    question({ id: "c", category: "modules", correctOption: 0 }),
    question({ id: "d", category: "http", correctOption: 3 }),
  ];

  it("counts matching answers as correct", () => {
    const result = calculateQuizResult(attempt, {
      a: 1,
      b: 2,
      c: 0,
      d: 3,
    });

    expect(result.correct).toBe(4);
    expect(result.total).toBe(4);
    expect(result.percentage).toBe(100);
  });

  it("treats wrong and unanswered questions as incorrect", () => {
    const result = calculateQuizResult(attempt, {
      a: 1,
      b: 0,
    });

    expect(result.correct).toBe(1);
    expect(result.total).toBe(4);
    expect(result.percentage).toBe(25);
  });

  it("aggregates results by category present in the attempt", () => {
    const result = calculateQuizResult(attempt, {
      a: 1,
      b: 0,
      c: 0,
      d: 3,
    });

    expect(result.byCategory).toEqual({
      async: { correct: 1, total: 2 },
      modules: { correct: 1, total: 1 },
      http: { correct: 1, total: 1 },
    });
  });

  it("returns a zero percentage for an empty attempt", () => {
    expect(calculateQuizResult([], {})).toEqual({
      correct: 0,
      total: 0,
      percentage: 0,
      byCategory: {},
    });
  });
});
