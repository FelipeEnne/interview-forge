/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import type { QuestionProgressState } from "./question-progress";
import { getStudyProgress } from "./study-progress";

const questions = [
  { id: "q1" },
  { id: "q2" },
  { id: "q3" },
  { id: "q4" },
  { id: "q5" },
];

describe("getStudyProgress", () => {
  it("reports zero memorized and all remaining when nothing has been studied", () => {
    expect(getStudyProgress(questions, {})).toEqual({
      total: 5,
      memorized: 0,
      remaining: 5,
      percentage: 0,
    });
  });

  it.each([
    ["good", true],
    ["easy", true],
    ["again", false],
    ["hard", false],
  ] as const)("treats lastRating %s as memorized=%s", (rating, memorized) => {
    const progress: QuestionProgressState = {
      q1: { lastRating: rating, reviewCount: 1 },
    };

    const result = getStudyProgress(questions, progress);

    expect(result.memorized).toBe(memorized ? 1 : 0);
    expect(result.remaining).toBe(memorized ? 4 : 5);
  });

  it("aggregates mixed ratings, rounds percentage, and ignores unknown progress ids", () => {
    const progress: QuestionProgressState = {
      q1: { lastRating: "good", reviewCount: 1 },
      q2: { lastRating: "easy", reviewCount: 2 },
      q3: { lastRating: "hard", reviewCount: 1 },
      q4: { lastRating: "again", reviewCount: 1 },
      removed: { lastRating: "easy", reviewCount: 5 },
    };

    expect(getStudyProgress(questions, progress)).toEqual({
      total: 5,
      memorized: 2,
      remaining: 3,
      percentage: 40,
    });
  });

  it("rounds percentage to the nearest integer", () => {
    const six = Array.from({ length: 6 }, (_, i) => ({ id: `q${i + 1}` }));
    const progress: QuestionProgressState = {
      q1: { lastRating: "good", reviewCount: 1 },
      q2: { lastRating: "good", reviewCount: 1 },
    };

    expect(getStudyProgress(six, progress).percentage).toBe(33);
  });

  it("returns zero totals when the question list is empty", () => {
    expect(getStudyProgress([], { orphan: { lastRating: "good", reviewCount: 1 } })).toEqual({
      total: 0,
      memorized: 0,
      remaining: 0,
      percentage: 0,
    });
  });

  it("does not mutate questions or progress", () => {
    const qs = [{ id: "q1" }];
    const progress: QuestionProgressState = {
      q1: { lastRating: "good", reviewCount: 1 },
    };
    const originalQs = structuredClone(qs);
    const originalProgress = structuredClone(progress);

    getStudyProgress(qs, progress);

    expect(qs).toEqual(originalQs);
    expect(progress).toEqual(originalProgress);
  });
});
