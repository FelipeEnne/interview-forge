/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { REACT_QUESTION_CATEGORIES } from "./categories";
import { REACT_QUESTIONS } from "./questions";

const EXPECTED_DISTRIBUTION: Record<string, number> = {
  fundamentals: 4,
  state: 6,
  hooks: 6,
  rendering: 6,
  forms: 4,
  "shared-state": 5,
  performance: 5,
  testing: 4,
};

const APPROVED_QUESTION_IDS = [
  "react-declarative-ui",
  "react-jsx-rules",
  "react-function-components",
  "react-props-composition",
  "react-use-state-basics",
  "react-functional-updates",
  "react-state-batching",
  "react-immutable-state-updates",
  "react-derived-state-and-lifting",
  "react-state-snapshots",
  "react-rules-of-hooks",
  "react-use-effect-dependencies",
  "react-effect-cleanup",
  "react-when-not-to-use-effect",
  "react-use-ref",
  "react-custom-hooks",
  "react-rerender-triggers",
  "react-reconciliation",
  "react-list-keys",
  "react-component-identity",
  "react-reset-state-with-key",
  "react-conditional-rendering",
  "react-controlled-components",
  "react-uncontrolled-components",
  "react-form-validation",
  "react-form-state-design",
  "react-context-when-to-use",
  "react-context-rerenders",
  "react-use-reducer",
  "react-local-vs-shared-state",
  "react-external-stores",
  "react-memo",
  "react-use-memo-and-callback",
  "react-unnecessary-rerenders",
  "react-transitions",
  "react-lazy-loading",
  "react-behavior-oriented-tests",
  "react-testing-library-queries",
  "react-user-interactions",
  "react-async-ui-and-mocking",
] as const;

function expectNonEmptyLocalizedText(value: { en: string; pt: string }) {
  expect(value.en.trim()).not.toBe("");
  expect(value.pt.trim()).not.toBe("");
}

describe("REACT_QUESTIONS", () => {
  it("has exactly 40 questions", () => {
    expect(REACT_QUESTIONS).toHaveLength(40);
  });

  it("uses approved react-* ids in order", () => {
    expect(REACT_QUESTIONS.map(({ id }) => id)).toEqual([
      ...APPROVED_QUESTION_IDS,
    ]);
    expect(
      REACT_QUESTIONS.every((question) => question.id.startsWith("react-")),
    ).toBe(true);
  });

  it("has unique question ids locally", () => {
    const ids = REACT_QUESTIONS.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("matches the approved category distribution", () => {
    for (const category of REACT_QUESTION_CATEGORIES) {
      const count = REACT_QUESTIONS.filter(
        (question) => question.category === category,
      ).length;
      expect(count).toBe(EXPECTED_DISTRIBUTION[category]);
    }
  });

  it("each question has a valid category and bilingual content", () => {
    const validCategories = REACT_QUESTION_CATEGORIES;

    for (const item of REACT_QUESTIONS) {
      expect(item.id.trim()).not.toBe("");
      expect(validCategories).toContain(item.category);
      expectNonEmptyLocalizedText(item.question);
      expectNonEmptyLocalizedText(item.answer);
    }
  });
});
