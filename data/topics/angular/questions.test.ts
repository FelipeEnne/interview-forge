/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { ANGULAR_QUESTION_CATEGORIES } from "./categories";
import { ANGULAR_QUESTIONS } from "./questions";

const EXPECTED_DISTRIBUTION: Record<string, number> = {
  components: 6,
  templates: 6,
  "services-di": 6,
  observables: 6,
  forms: 4,
  routing: 4,
  http: 4,
  testing: 4,
};

const APPROVED_QUESTION_IDS = [
  "angular-signals-and-computed",
  "angular-standalone-components",
  "angular-input-output-contract",
  "angular-change-detection",
  "angular-onpush-strategy",
  "angular-lifecycle-and-cleanup",
  "angular-property-binding",
  "angular-event-binding",
  "angular-two-way-binding",
  "angular-if-control-flow",
  "angular-for-track",
  "angular-pipes-and-template-expressions",
  "angular-service-responsibilities",
  "angular-dependency-injection",
  "angular-provider-registration",
  "angular-hierarchical-injectors",
  "angular-injection-tokens",
  "angular-provider-scope",
  "angular-observable-subscriptions",
  "angular-subject-multicast",
  "angular-async-pipe",
  "angular-switch-map",
  "angular-map-and-combine-latest",
  "angular-rxjs-error-handling",
  "angular-reactive-vs-template-forms",
  "angular-form-control-and-group",
  "angular-form-validation",
  "angular-custom-validators",
  "angular-route-parameters",
  "angular-query-parameters",
  "angular-route-guards",
  "angular-child-and-lazy-routes",
  "angular-http-client",
  "angular-http-observables",
  "angular-http-interceptors",
  "angular-http-error-handling",
  "angular-component-testing",
  "angular-service-testing",
  "angular-http-testing",
  "angular-observable-testing",
] as const;

function expectNonEmptyLocalizedText(value: { en: string; pt: string }) {
  expect(value.en.trim()).not.toBe("");
  expect(value.pt.trim()).not.toBe("");
}

describe("ANGULAR_QUESTIONS", () => {
  it("has exactly 40 questions", () => {
    expect(ANGULAR_QUESTIONS).toHaveLength(40);
  });

  it("uses approved angular-* ids in order", () => {
    expect(ANGULAR_QUESTIONS.map(({ id }) => id)).toEqual([
      ...APPROVED_QUESTION_IDS,
    ]);
    expect(
      ANGULAR_QUESTIONS.every((question) => question.id.startsWith("angular-")),
    ).toBe(true);
  });

  it("has unique question ids locally", () => {
    const ids = ANGULAR_QUESTIONS.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("matches the approved category distribution", () => {
    for (const category of ANGULAR_QUESTION_CATEGORIES) {
      const count = ANGULAR_QUESTIONS.filter(
        (question) => question.category === category,
      ).length;
      expect(count).toBe(EXPECTED_DISTRIBUTION[category]);
    }
  });

  it("each question has a valid category and bilingual content", () => {
    const validCategories = ANGULAR_QUESTION_CATEGORIES;

    for (const item of ANGULAR_QUESTIONS) {
      expect(item.id.trim()).not.toBe("");
      expect(validCategories).toContain(item.category);
      expectNonEmptyLocalizedText(item.question);
      expectNonEmptyLocalizedText(item.answer);
    }
  });
});
