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
import { REACT_CATEGORIES, REACT_QUESTION_CATEGORIES } from "./categories";
import { REACT_QUIZ_QUESTIONS } from "./quiz-questions";

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
    expectCategoryDefinitionsMatchIds(
      REACT_CATEGORIES,
      REACT_QUESTION_CATEGORIES,
    );
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
    expectUniqueIds(ids);
  });

  it("keeps quiz ids globally unique across current topic banks", () => {
    expectUniqueIds([
      ...NODEJS_QUIZ_QUESTIONS.map(({ id }) => id),
      ...REACT_QUIZ_QUESTIONS.map(({ id }) => id),
    ]);
  });

  it("has bilingual content, four bilingual options, valid categories, and valid correct options", () => {
    expectQuizQuestionBankShape(
      REACT_QUIZ_QUESTIONS,
      REACT_QUESTION_CATEGORIES,
    );
  });

  it("spreads correct options evenly across the four indices", () => {
    expectEvenCorrectOptionSpread(REACT_QUIZ_QUESTIONS);
  });

  it("does not make a correct option a clear length outlier in either language", () => {
    expectNoCorrectOptionLengthOutliers(REACT_QUIZ_QUESTIONS);
  });
});
