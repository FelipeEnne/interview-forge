import { describe, expect, it } from "vitest";

import { QUESTION_CATEGORY_LABELS } from "./nodejs-questions";
import { NODEJS_QUIZ_QUESTIONS } from "./nodejs-quiz-questions";

describe("NODEJS_QUIZ_QUESTIONS", () => {
  it("has exactly 20 questions", () => {
    expect(NODEJS_QUIZ_QUESTIONS).toHaveLength(20);
  });

  it("has unique question ids", () => {
    const ids = NODEJS_QUIZ_QUESTIONS.map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("each question has valid content, four options, and a valid correct option", () => {
    const validCategories = Object.keys(QUESTION_CATEGORY_LABELS);

    for (const item of NODEJS_QUIZ_QUESTIONS) {
      expect(item.id.trim()).not.toBe("");
      expect(validCategories).toContain(item.category);
      expect(item.question.trim()).not.toBe("");
      expect(item.options).toHaveLength(4);

      for (const option of item.options) {
        expect(option.trim()).not.toBe("");
      }

      expect(item.correctOption).toBeGreaterThanOrEqual(0);
      expect(item.correctOption).toBeLessThan(item.options.length);
    }
  });
});
