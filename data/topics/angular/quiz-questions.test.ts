/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import {
  expectCategoryDefinitionsMatchIds,
  expectEvenCorrectOptionSpread,
  expectNoCorrectOptionLengthOutliers,
  expectQuizQuestionBankShape,
  expectUniqueIds,
} from "@/data/topic-content-test-helpers";
import { NODEJS_QUIZ_QUESTIONS } from "../nodejs/quiz-questions";
import { REACT_QUIZ_QUESTIONS } from "../react/quiz-questions";
import { ANGULAR_CATEGORIES, ANGULAR_QUESTION_CATEGORIES } from "./categories";
import { ANGULAR_QUIZ_QUESTIONS } from "./quiz-questions";

describe("ANGULAR_QUIZ_QUESTIONS", () => {
  it("has the approved eight categories and 20 questions", () => {
    expect(ANGULAR_QUESTION_CATEGORIES).toEqual([
      "components",
      "templates",
      "services-di",
      "observables",
      "forms",
      "routing",
      "http",
      "testing",
    ]);
    expect(ANGULAR_CATEGORIES).toHaveLength(8);
    expectCategoryDefinitionsMatchIds(
      ANGULAR_CATEGORIES,
      ANGULAR_QUESTION_CATEGORIES,
    );
    expect(ANGULAR_QUIZ_QUESTIONS).toHaveLength(20);
  });

  it("has at least two questions in every category with the approved distribution", () => {
    for (const category of ANGULAR_QUESTION_CATEGORIES) {
      const categoryQuestions = ANGULAR_QUIZ_QUESTIONS.filter(
        (question) => question.category === category,
      );

      expect(categoryQuestions.length).toBeGreaterThanOrEqual(2);
      expect(categoryQuestions).toHaveLength(
        category === "components" ||
          category === "templates" ||
          category === "services-di" ||
          category === "observables"
          ? 3
          : 2,
      );
    }
  });

  it("has unique Angular-prefixed question ids", () => {
    const ids = ANGULAR_QUIZ_QUESTIONS.map(({ id }) => id);

    expect(ids.every((id) => id.startsWith("angular-quiz-"))).toBe(true);
    expectUniqueIds(ids);
  });

  it("keeps quiz ids globally unique across all topic banks", () => {
    expectUniqueIds([
      ...NODEJS_QUIZ_QUESTIONS.map(({ id }) => id),
      ...REACT_QUIZ_QUESTIONS.map(({ id }) => id),
      ...ANGULAR_QUIZ_QUESTIONS.map(({ id }) => id),
    ]);
  });

  it("has bilingual content, four bilingual options, valid categories, and valid correct options", () => {
    expectQuizQuestionBankShape(
      ANGULAR_QUIZ_QUESTIONS,
      ANGULAR_QUESTION_CATEGORIES,
    );
  });

  it("spreads correct options evenly across the four indices", () => {
    expectEvenCorrectOptionSpread(ANGULAR_QUIZ_QUESTIONS);
  });

  it("does not make a correct option a clear length outlier in either language", () => {
    expectNoCorrectOptionLengthOutliers(ANGULAR_QUIZ_QUESTIONS);
  });
});
