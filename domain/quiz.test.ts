/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import type { QuizQuestion } from "@/data/quiz-types";
import { calculateQuizResult, selectQuizQuestions } from "./quiz";

function question(
  overrides: Partial<QuizQuestion> & Pick<QuizQuestion, "id">,
): QuizQuestion {
  return {
    category: "fundamentals",
    question: {
      en: `${overrides.id}?`,
      pt: `${overrides.id}?`,
    },
    options: [
      { en: "A", pt: "A" },
      { en: "B", pt: "B" },
      { en: "C", pt: "C" },
      { en: "D", pt: "D" },
    ],
    correctOption: 0,
    ...overrides,
  };
}

const bank: QuizQuestion[] = [
  question({ id: "q1", category: "hooks" }),
  question({ id: "q2", category: "hooks" }),
  question({ id: "q3", category: "state" }),
  question({ id: "q4", category: "state" }),
  question({ id: "q5", category: "effects" }),
  question({ id: "q6", category: "effects" }),
  question({ id: "q7", category: "context" }),
  question({ id: "q8", category: "context" }),
  question({ id: "q9", category: "hooks" }),
  question({ id: "q10", category: "state" }),
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
    question({ id: "a", category: "hooks", correctOption: 1 }),
    question({ id: "b", category: "hooks", correctOption: 2 }),
    question({ id: "c", category: "state", correctOption: 0 }),
    question({ id: "d", category: "effects", correctOption: 3 }),
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
      hooks: { correct: 1, total: 2 },
      state: { correct: 1, total: 1 },
      effects: { correct: 1, total: 1 },
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
