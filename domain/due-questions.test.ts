import { describe, expect, it } from "vitest";

import { getDueQuestions } from "@/domain/due-questions";
import type { QuestionProgressState } from "./question-progress";

const CURRENT_TIME = new Date("2026-09-18T03:15:00.000Z");

describe("getDueQuestions", () => {
  it("includes unreviewed questions", () => {
    const questions = [{ id: "q1" }, { id: "q2" }];

    const dueQuestions = getDueQuestions(questions, {}, CURRENT_TIME);

    expect(dueQuestions).toEqual(questions);
    expect(dueQuestions).not.toBe(questions);
  });

  it("includes questions with legacy progress without nextReviewAt", () => {
    const questions = [{ id: "q1" }];
    const progress: QuestionProgressState = {
      q1: { lastRating: "good", reviewCount: 2 },
    };

    expect(getDueQuestions(questions, progress, CURRENT_TIME)).toEqual(
      questions,
    );
  });

  it("includes past and exactly due reviews but excludes future reviews", () => {
    const questions = [
      { id: "past" },
      { id: "exact" },
      { id: "future" },
    ];
    const progress: QuestionProgressState = {
      past: {
        lastRating: "again",
        reviewCount: 1,
        lastReviewedAt: "2026-09-18T03:00:00.000Z",
        nextReviewAt: "2026-09-18T03:10:00.000Z",
      },
      exact: {
        lastRating: "hard",
        reviewCount: 1,
        lastReviewedAt: "2026-09-17T03:15:00.000Z",
        nextReviewAt: "2026-09-18T03:15:00.000Z",
      },
      future: {
        lastRating: "good",
        reviewCount: 1,
        lastReviewedAt: "2026-09-18T03:00:00.000Z",
        nextReviewAt: "2026-09-21T03:00:00.000Z",
      },
    };

    expect(
      getDueQuestions(questions, progress, CURRENT_TIME).map(({ id }) => id),
    ).toEqual(["past", "exact"]);
  });

  it("preserves input order, ignores unknown progress, and does not modify inputs", () => {
    const questions = [{ id: "q3" }, { id: "q1" }, { id: "q2" }];
    const progress: QuestionProgressState = {
      q1: { lastRating: "good", reviewCount: 1 },
      q2: {
        lastRating: "easy",
        reviewCount: 1,
        lastReviewedAt: "2026-09-17T03:15:00.000Z",
        nextReviewAt: "2026-09-24T03:15:00.000Z",
      },
      removed: { lastRating: "again", reviewCount: 3 },
    };
    const originalQuestions = structuredClone(questions);
    const originalProgress = structuredClone(progress);

    const dueQuestions = getDueQuestions(questions, progress, CURRENT_TIME);

    expect(dueQuestions.map(({ id }) => id)).toEqual(["q3", "q1"]);
    expect(questions).toEqual(originalQuestions);
    expect(progress).toEqual(originalProgress);
  });
});
