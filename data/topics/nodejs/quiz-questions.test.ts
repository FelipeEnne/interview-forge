/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import {
  expectEvenCorrectOptionSpread,
  expectNoCorrectOptionLengthOutliers,
  expectQuizQuestionBankShape,
  expectUniqueIds,
} from "@/data/topic-content-test-helpers";
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

describe("NODEJS_QUIZ_QUESTIONS", () => {
  it("has exactly 20 questions", () => {
    expect(NODEJS_QUIZ_QUESTIONS).toHaveLength(20);
  });

  it("has unique question ids", () => {
    expectUniqueIds(NODEJS_QUIZ_QUESTIONS.map(({ id }) => id));
  });

  it("preserves the original question ids", () => {
    expect(NODEJS_QUIZ_QUESTIONS.map(({ id }) => id)).toEqual([
      ...ORIGINAL_QUIZ_QUESTION_IDS,
    ]);
  });

  it("each question has bilingual content, four bilingual options, and a valid correct option", () => {
    expectQuizQuestionBankShape(NODEJS_QUIZ_QUESTIONS, QUESTION_CATEGORIES);
  });

  it("spreads correctOption evenly across the four indices", () => {
    expectEvenCorrectOptionSpread(NODEJS_QUIZ_QUESTIONS);
  });

  it("does not make the correct option a clear length outlier in English or Portuguese", () => {
    expectNoCorrectOptionLengthOutliers(NODEJS_QUIZ_QUESTIONS);
  });
});
