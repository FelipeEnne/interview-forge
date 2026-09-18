import { describe, expect, it } from "vitest";

import {
  recordQuestionProgress,
  type QuestionProgressState,
} from "./question-progress";

describe("recordQuestionProgress", () => {
  it("creates progress for a question that has not been reviewed", () => {
    const next = recordQuestionProgress({}, "q1", "good");

    expect(next).toEqual({
      q1: { lastRating: "good", reviewCount: 1 },
    });
  });

  it("increments reviewCount when the same question is rated again", () => {
    const state: QuestionProgressState = {
      q1: { lastRating: "hard", reviewCount: 1 },
    };

    const next = recordQuestionProgress(state, "q1", "easy");

    expect(next.q1).toEqual({ lastRating: "easy", reviewCount: 2 });
  });

  it("keeps progress for different questions separate", () => {
    const state: QuestionProgressState = {
      q1: { lastRating: "good", reviewCount: 1 },
    };

    const next = recordQuestionProgress(state, "q2", "again");

    expect(next).toEqual({
      q1: { lastRating: "good", reviewCount: 1 },
      q2: { lastRating: "again", reviewCount: 1 },
    });
  });
});
