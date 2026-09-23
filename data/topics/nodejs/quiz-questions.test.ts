/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { QUESTION_CATEGORIES } from "./categories";
import { NODEJS_QUIZ_QUESTIONS } from "./quiz-questions";

const ORIGINAL_QUIZ_QUESTION_IDS = [
  "quiz-nodejs-runtime",
  "quiz-v8-libuv",
  "quiz-event-loop-purpose",
  "quiz-blocking-work",
  "quiz-async-await-errors",
  "quiz-nexttick-microtasks",
  "quiz-cjs-esm",
  "quiz-module-cache",
  "quiz-http-handler",
  "quiz-http-idempotency",
  "quiz-http-status-errors",
  "quiz-express-middleware",
  "quiz-express-error-middleware",
  "quiz-stream-types",
  "quiz-stream-pipeline",
  "quiz-unit-vs-integration",
  "quiz-testing-async",
  "quiz-input-validation",
  "quiz-authn-authz",
  "quiz-api-security-baseline",
] as const;

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

describe("NODEJS_QUIZ_QUESTIONS", () => {
  it("has exactly 20 questions", () => {
    expect(NODEJS_QUIZ_QUESTIONS).toHaveLength(20);
  });

  it("has unique question ids", () => {
    const ids = NODEJS_QUIZ_QUESTIONS.map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("preserves the original question ids", () => {
    expect(NODEJS_QUIZ_QUESTIONS.map(({ id }) => id)).toEqual([
      ...ORIGINAL_QUIZ_QUESTION_IDS,
    ]);
  });

  it("each question has bilingual content, four bilingual options, and a valid correct option", () => {
    const validCategories = QUESTION_CATEGORIES;

    for (const item of NODEJS_QUIZ_QUESTIONS) {
      expect(item.id.trim()).not.toBe("");
      expect(validCategories).toContain(item.category);
      expectNonEmptyLocalizedText(item.question);
      expect(item.options).toHaveLength(4);

      for (const option of item.options) {
        expectNonEmptyLocalizedText(option);
      }

      expect(item.correctOption).toBeGreaterThanOrEqual(0);
      expect(item.correctOption).toBeLessThan(item.options.length);
    }
  });

  it("spreads correctOption evenly across the four indices", () => {
    const counts = [0, 0, 0, 0];

    for (const item of NODEJS_QUIZ_QUESTIONS) {
      counts[item.correctOption] += 1;
    }

    expect(counts).toEqual([5, 5, 5, 5]);
  });

  it("does not make the correct option a clear length outlier in English or Portuguese", () => {
    for (const item of NODEJS_QUIZ_QUESTIONS) {
      for (const locale of ["en", "pt"] as const) {
        const optionTexts = item.options.map((option) => option[locale]);

        expect(isCorrectOptionLengthOutlier(optionTexts, item.correctOption)).toBe(
          false,
        );
      }
    }
  });
});

describe("isCorrectOptionLengthOutlier", () => {
  it("flags a correct option that is dramatically longer than every distractor", () => {
    expect(
      isCorrectOptionLengthOutlier(
        [
          "short wrong A",
          "Waits for every promise to settle and returns detailed information about whether each individual promise fulfilled or rejected",
          "short wrong C",
          "short wrong D",
        ],
        1,
      ),
    ).toBe(true);
  });

  it("does not flag a large absolute gap when the ratio stays moderate", () => {
    expect(
      isCorrectOptionLengthOutlier(
        [
          "Stops when the first promise rejects and returns that rejection right away",
          "Executes each promise sequentially and stops after the first failure occurs",
          "Waits for every promise to settle and reports each individual outcome",
          "Waits only for fulfilled promises and discards rejected outcomes after that",
        ],
        2,
      ),
    ).toBe(false);
  });

  it("does not flag short options with a high ratio but a tiny character gap", () => {
    expect(isCorrectOptionLengthOutlier(["2xx", "3xx", "4xx", "5xx"], 3)).toBe(
      false,
    );
  });
});
