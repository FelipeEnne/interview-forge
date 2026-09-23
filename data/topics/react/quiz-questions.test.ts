/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { NODEJS_QUIZ_QUESTIONS } from "../nodejs/quiz-questions";
import { REACT_CATEGORIES, REACT_QUESTION_CATEGORIES } from "./categories";
import { REACT_QUIZ_QUESTIONS } from "./quiz-questions";

function expectNonEmptyLocalizedText(value: { en: string; pt: string }) {
  expect(value.en.trim()).not.toBe("");
  expect(value.pt.trim()).not.toBe("");
}

function isCorrectOptionLengthOutlier(
  optionTexts: readonly string[],
  correctIndex: number,
): boolean {
  const correctLength = optionTexts[correctIndex]?.trim().length ?? 0;
  const longestDistractor = optionTexts.reduce((longest, text, index) => {
    if (index === correctIndex) {
      return longest;
    }

    return Math.max(longest, text.trim().length);
  }, 0);

  return (
    correctLength > longestDistractor * 1.6 &&
    correctLength - longestDistractor >= 25
  );
}

describe("REACT_QUIZ_QUESTIONS", () => {
  it("has the approved eight categories and 20 questions", () => {
    expect(REACT_QUESTION_CATEGORIES).toEqual([
      "fundamentals",
      "state",
      "hooks",
      "rendering",
      "forms",
      "shared-state",
      "performance",
      "testing",
    ]);
    expect(REACT_CATEGORIES).toHaveLength(8);
    expect(REACT_CATEGORIES.map(({ id }) => id)).toEqual(
      REACT_QUESTION_CATEGORIES,
    );
    for (const category of REACT_CATEGORIES) {
      expectNonEmptyLocalizedText(category.displayName);
    }
    expect(REACT_QUIZ_QUESTIONS).toHaveLength(20);
  });

  it("has at least two questions in every category", () => {
    for (const category of REACT_QUESTION_CATEGORIES) {
      const categoryQuestions = REACT_QUIZ_QUESTIONS.filter(
        (question) => question.category === category,
      );

      expect(categoryQuestions.length).toBeGreaterThanOrEqual(2);
      expect(categoryQuestions).toHaveLength(
        category === "state" || category === "rendering"
          ? 3
          : category === "hooks"
            ? 4
            : 2,
      );
    }
  });

  it("has unique React-prefixed question ids", () => {
    const ids = REACT_QUIZ_QUESTIONS.map(({ id }) => id);

    expect(ids.every((id) => id.startsWith("react-quiz-"))).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps quiz ids globally unique across current topic banks", () => {
    const ids = [
      ...NODEJS_QUIZ_QUESTIONS.map(({ id }) => id),
      ...REACT_QUIZ_QUESTIONS.map(({ id }) => id),
    ];

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has bilingual content, four bilingual options, valid categories, and valid correct options", () => {
    for (const question of REACT_QUIZ_QUESTIONS) {
      expect(REACT_QUESTION_CATEGORIES).toContain(question.category);
      expectNonEmptyLocalizedText(question.question);
      expect(question.options).toHaveLength(4);

      for (const option of question.options) {
        expectNonEmptyLocalizedText(option);
      }

      expect(question.correctOption).toBeGreaterThanOrEqual(0);
      expect(question.correctOption).toBeLessThan(question.options.length);
    }
  });

  it("spreads correct options evenly across the four indices", () => {
    const counts = [0, 0, 0, 0];

    for (const question of REACT_QUIZ_QUESTIONS) {
      counts[question.correctOption] += 1;
    }

    expect(counts).toEqual([5, 5, 5, 5]);
  });

  it("does not make a correct option a clear length outlier in either language", () => {
    for (const question of REACT_QUIZ_QUESTIONS) {
      for (const locale of ["en", "pt"] as const) {
        expect(
          isCorrectOptionLengthOutlier(
            question.options.map((option) => option[locale]),
            question.correctOption,
          ),
        ).toBe(false);
      }
    }
  });
});
