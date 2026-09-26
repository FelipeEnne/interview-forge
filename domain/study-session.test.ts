/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import type { QuestionProgressState } from "./question-progress";
import { createStudyQueue } from "./study-session";

const currentTime = new Date("2026-09-18T03:15:00.000Z");
const questions = [{ id: "good" }, { id: "again" }, { id: "future" }];
const progress: QuestionProgressState = {
  good: { lastRating: "good", reviewCount: 1 },
  again: { lastRating: "again", reviewCount: 1 },
  future: {
    lastRating: "hard",
    reviewCount: 1,
    lastReviewedAt: "2026-09-18T03:00:00.000Z",
    nextReviewAt: "2026-09-19T03:00:00.000Z",
  },
};

describe("createStudyQueue", () => {
  it("keeps only due questions and orders them by recall priority", () => {
    expect(
      createStudyQueue(questions, progress, "due-review", currentTime).map(
        ({ id }) => id,
      ),
    ).toEqual(["again", "good"]);
  });

  it("includes every question in practice mode", () => {
    expect(
      createStudyQueue(questions, progress, "practice", currentTime).map(
        ({ id }) => id,
      ),
    ).toEqual(["again", "future", "good"]);
  });
});
