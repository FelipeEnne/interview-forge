import { describe, expect, it } from "vitest";

import {
  recordQuestionProgress,
  type QuestionProgressState,
} from "./question-progress";

describe("recordQuestionProgress", () => {
  it("creates progress for a question that has not been reviewed", () => {
    const next = recordQuestionProgress(
      {},
      "q1",
      "good",
      new Date("2026-09-18T03:15:00.000Z"),
    );

    expect(next).toEqual({
      q1: {
        lastRating: "good",
        reviewCount: 1,
        lastReviewedAt: "2026-09-18T03:15:00.000Z",
        nextReviewAt: "2026-09-21T03:15:00.000Z",
      },
    });
  });

  it("updates progress and replaces timestamps when a question is rated again", () => {
    const state: QuestionProgressState = {
      q1: {
        lastRating: "hard",
        reviewCount: 1,
        lastReviewedAt: "2026-09-10T03:15:00.000Z",
        nextReviewAt: "2026-09-11T03:15:00.000Z",
      },
    };

    const next = recordQuestionProgress(
      state,
      "q1",
      "easy",
      new Date("2026-09-18T03:15:00.000Z"),
    );

    expect(next.q1).toEqual({
      lastRating: "easy",
      reviewCount: 2,
      lastReviewedAt: "2026-09-18T03:15:00.000Z",
      nextReviewAt: "2026-09-25T03:15:00.000Z",
    });
  });

  it("keeps progress for different questions separate", () => {
    const state: QuestionProgressState = {
      q1: { lastRating: "good", reviewCount: 1 },
    };

    const next = recordQuestionProgress(
      state,
      "q2",
      "again",
      new Date("2026-09-18T03:15:00.000Z"),
    );

    expect(next).toEqual({
      q1: { lastRating: "good", reviewCount: 1 },
      q2: {
        lastRating: "again",
        reviewCount: 1,
        lastReviewedAt: "2026-09-18T03:15:00.000Z",
        nextReviewAt: "2026-09-18T03:25:00.000Z",
      },
    });
  });
});
