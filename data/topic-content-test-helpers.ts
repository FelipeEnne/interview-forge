import { expect } from "vitest";

import type { CategoryDefinition } from "@/data/category-types";
import type { QuizQuestion } from "@/data/quiz-types";
import type { InterviewQuestion } from "@/data/study-types";
import type { LocalizedText } from "@/i18n/localized-text";

const CORRECT_OPTION_LENGTH_RATIO_LIMIT = 1.6;
const CORRECT_OPTION_LENGTH_GAP_LIMIT = 25;
const QUIZ_OPTION_COUNT = 4;
const EXPECTED_CORRECT_OPTION_SPREAD = [5, 5, 5, 5] as const;

export function expectNonEmptyLocalizedText(value: LocalizedText): void {
  expect(value.en.trim()).not.toBe("");
  expect(value.pt.trim()).not.toBe("");
}

export function isCorrectOptionLengthOutlier(
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
    correctLength > longestDistractor * CORRECT_OPTION_LENGTH_RATIO_LIMIT &&
    correctLength - longestDistractor >= CORRECT_OPTION_LENGTH_GAP_LIMIT
  );
}

export function expectUniqueIds(ids: readonly string[]): void {
  expect(new Set(ids).size).toBe(ids.length);
}

export function expectStudyQuestionBankShape(
  questions: readonly InterviewQuestion[],
  validCategories: readonly string[],
): void {
  for (const item of questions) {
    expect(item.id.trim()).not.toBe("");
    expect(validCategories).toContain(item.category);
    expectNonEmptyLocalizedText(item.question);
    expectNonEmptyLocalizedText(item.answer);
  }
}

export function expectQuizQuestionBankShape(
  questions: readonly QuizQuestion[],
  validCategories: readonly string[],
): void {
  for (const question of questions) {
    expect(question.id.trim()).not.toBe("");
    expect(validCategories).toContain(question.category);
    expectNonEmptyLocalizedText(question.question);
    expect(question.options).toHaveLength(QUIZ_OPTION_COUNT);

    for (const option of question.options) {
      expectNonEmptyLocalizedText(option);
    }

    expect(question.correctOption).toBeGreaterThanOrEqual(0);
    expect(question.correctOption).toBeLessThan(question.options.length);
  }
}

export function expectEvenCorrectOptionSpread(
  questions: readonly QuizQuestion[],
): void {
  const counts = [0, 0, 0, 0];

  for (const question of questions) {
    counts[question.correctOption] += 1;
  }

  expect(counts).toEqual([...EXPECTED_CORRECT_OPTION_SPREAD]);
}

export function expectNoCorrectOptionLengthOutliers(
  questions: readonly QuizQuestion[],
): void {
  for (const question of questions) {
    for (const locale of ["en", "pt"] as const) {
      expect(
        isCorrectOptionLengthOutlier(
          question.options.map((option) => option[locale]),
          question.correctOption,
        ),
      ).toBe(false);
    }
  }
}

export function expectCategoryDefinitionsMatchIds(
  categories: readonly CategoryDefinition[],
  categoryIds: readonly string[],
): void {
  expect(categories.map(({ id }) => id)).toEqual([...categoryIds]);

  for (const category of categories) {
    expectNonEmptyLocalizedText(category.displayName);
  }
}
