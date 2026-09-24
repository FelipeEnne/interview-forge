/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import type { QuestionProgressState } from "@/domain/question-progress";
import type { StudyProgress } from "@/domain/study-progress";
import { getStudyProgress } from "@/domain/study-progress";

const questions = [
  { id: "q1" },
  { id: "q2" },
  { id: "q3" },
  { id: "q4" },
  { id: "q5" },
];

const zeroRatings = {
  again: 0,
  hard: 0,
  good: 0,
  easy: 0,
  unreviewed: 0,
};

function expectStudyProgressInvariants(result: StudyProgress): void {
  const { ratings, total, memorized, remaining } = result;
  expect(
    ratings.again +
      ratings.hard +
      ratings.good +
      ratings.easy +
      ratings.unreviewed,
  ).toBe(total);
  expect(memorized).toBe(ratings.good + ratings.easy);
  expect(remaining).toBe(ratings.again + ratings.hard + ratings.unreviewed);
  expect(remaining).toBe(total - memorized);
}

describe("getStudyProgress", () => {
  it("reports zero memorized and all unreviewed when nothing has been studied", () => {
    const result = getStudyProgress(questions, {});
    expect(result).toEqual({
      total: 5,
      memorized: 0,
      remaining: 5,
      percentage: 0,
      ratings: { ...zeroRatings, unreviewed: 5 },
    });
    expectStudyProgressInvariants(result);
  });

  it.each([
    ["again", { again: 1 }, 0, 5],
    ["hard", { hard: 1 }, 0, 5],
    ["good", { good: 1 }, 1, 4],
    ["easy", { easy: 1 }, 1, 4],
  ] as const)(
    "counts lastRating %s in the correct bucket",
    (rating, expectedBucket, memorized, remaining) => {
      const progress: QuestionProgressState = {
        q1: { lastRating: rating, reviewCount: 1 },
      };

      const result = getStudyProgress(questions, progress);

      expect(result.ratings).toEqual({
        ...zeroRatings,
        ...expectedBucket,
        unreviewed: 4,
      });
      expect(result.memorized).toBe(memorized);
      expect(result.remaining).toBe(remaining);
      expectStudyProgressInvariants(result);
    },
  );

  it("aggregates mixed ratings, rounds percentage, and ignores unknown progress ids", () => {
    const progress: QuestionProgressState = {
      q1: { lastRating: "good", reviewCount: 1 },
      q2: { lastRating: "easy", reviewCount: 2 },
      q3: { lastRating: "hard", reviewCount: 1 },
      q4: { lastRating: "again", reviewCount: 1 },
      removed: { lastRating: "easy", reviewCount: 5 },
    };

    const result = getStudyProgress(questions, progress);
    expect(result).toEqual({
      total: 5,
      memorized: 2,
      remaining: 3,
      percentage: 40,
      ratings: {
        again: 1,
        hard: 1,
        good: 1,
        easy: 1,
        unreviewed: 1,
      },
    });
    expectStudyProgressInvariants(result);
  });

  it("rounds percentage to the nearest integer", () => {
    const six = Array.from({ length: 6 }, (_, i) => ({ id: `q${i + 1}` }));
    const progress: QuestionProgressState = {
      q1: { lastRating: "good", reviewCount: 1 },
      q2: { lastRating: "good", reviewCount: 1 },
    };

    const result = getStudyProgress(six, progress);
    expect(result.percentage).toBe(33);
    expectStudyProgressInvariants(result);
  });

  it("returns zero totals when the question list is empty", () => {
    const result = getStudyProgress([], {
      orphan: { lastRating: "good", reviewCount: 1 },
    });
    expect(result).toEqual({
      total: 0,
      memorized: 0,
      remaining: 0,
      percentage: 0,
      ratings: zeroRatings,
    });
    expectStudyProgressInvariants(result);
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
