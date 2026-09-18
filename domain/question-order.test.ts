import { describe, expect, it } from "vitest";

import { orderQuestionsForStudy } from "@/domain/question-order";

describe("orderQuestionsForStudy", () => {
  it("keeps the original order when there is no progress and returns a new array", () => {
    const questions = [{ id: "q1" }, { id: "q2" }, { id: "q3" }];

    const ordered = orderQuestionsForStudy(questions, {});

    expect(ordered).toEqual(questions);
    expect(ordered).not.toBe(questions);
  });

  it("orders questions by recall priority and preserves order within a priority", () => {
    const questions = [
      { id: "good-1" },
      { id: "unreviewed" },
      { id: "easy" },
      { id: "hard-1" },
      { id: "again" },
      { id: "hard-2" },
      { id: "good-2" },
    ];

    const ordered = orderQuestionsForStudy(questions, {
      "good-1": { lastRating: "good", reviewCount: 1 },
      easy: { lastRating: "easy", reviewCount: 1 },
      "hard-1": { lastRating: "hard", reviewCount: 1 },
      again: { lastRating: "again", reviewCount: 1 },
      "hard-2": { lastRating: "hard", reviewCount: 2 },
      "good-2": { lastRating: "good", reviewCount: 2 },
    });

    expect(ordered.map(({ id }) => id)).toEqual([
      "again",
      "hard-1",
      "hard-2",
      "unreviewed",
      "good-1",
      "good-2",
      "easy",
    ]);
  });

  it("ignores unknown progress and does not modify its arguments", () => {
    const questions = [{ id: "q1" }, { id: "q2" }];
    const progress = {
      removed: { lastRating: "again" as const, reviewCount: 3 },
    };
    const originalQuestions = structuredClone(questions);
    const originalProgress = structuredClone(progress);

    const ordered = orderQuestionsForStudy(questions, progress);

    expect(ordered).toEqual(originalQuestions);
    expect(questions).toEqual(originalQuestions);
    expect(progress).toEqual(originalProgress);
  });
});
