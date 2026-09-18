/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { QUESTION_CATEGORIES } from "./nodejs-questions";
import { NODEJS_QUIZ_QUESTIONS } from "./nodejs-quiz-questions";

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
});
