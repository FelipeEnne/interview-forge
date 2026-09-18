/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { NODEJS_CODING_CHALLENGES } from "@/data/nodejs-coding-challenges";
import { QUESTION_CATEGORIES } from "@/data/nodejs-questions";

function expectNonEmptyLocalizedText(value: { en: string; pt: string }) {
  expect(value.en.trim()).not.toBe("");
  expect(value.pt.trim()).not.toBe("");
}

function englishList(items: readonly { en: string }[]) {
  return items.map((item) => item.en).join(" ");
}

describe("NODEJS_CODING_CHALLENGES", () => {
  it("has exactly 6 challenges in a fixed progression", () => {
    expect(NODEJS_CODING_CHALLENGES).toHaveLength(6);
    expect(NODEJS_CODING_CHALLENGES.map(({ id }) => id)).toEqual([
      "retry-async-operation",
      "aggregate-provider-results",
      "get-user-by-id",
      "create-user",
      "api-key-and-error-middleware",
      "parse-ndjson-stream",
    ]);
  });

  it("has unique challenge ids", () => {
    const ids = NODEJS_CODING_CHALLENGES.map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("each challenge has bilingual text, matching list lengths, and shared source code", () => {
    const validCategories = QUESTION_CATEGORIES;

    for (const challenge of NODEJS_CODING_CHALLENGES) {
      expect(challenge.id.trim()).not.toBe("");
      expect(validCategories).toContain(challenge.category);
      expectNonEmptyLocalizedText(challenge.title);
      expectNonEmptyLocalizedText(challenge.prompt);
      expect(typeof challenge.starterCode).toBe("string");
      expect(challenge.starterCode.trim()).not.toBe("");
      expect(typeof challenge.referenceSolution).toBe("string");
      expect(challenge.referenceSolution.trim()).not.toBe("");
      expect(challenge.requirements.length).toBeGreaterThan(0);
      expect(challenge.reviewChecklist.length).toBeGreaterThan(0);

      for (const requirement of challenge.requirements) {
        expectNonEmptyLocalizedText(requirement);
      }

      for (const item of challenge.reviewChecklist) {
        expectNonEmptyLocalizedText(item);
      }
    }
  });

  it("covers retry, settled aggregation, REST handlers, middleware, and streams", () => {
    const [retry, aggregate, getUser, createUser, middleware, streams] =
      NODEJS_CODING_CHALLENGES;

    expect(retry.category).toBe("async");
    expect(retry.prompt.en).toMatch(/retry/i);
    expect(retry.starterCode).toMatch(/async function retry/);
    expect(retry.referenceSolution).toMatch(/await/);
    expect(englishList(retry.requirements)).toMatch(/last error/i);

    expect(aggregate.category).toBe("async");
    expect(aggregate.prompt.en).toMatch(/allSettled|providers/i);
    expect(aggregate.starterCode).toMatch(/Promise/);
    expect(aggregate.referenceSolution).toMatch(/allSettled/);

    expect(getUser.category).toBe("http");
    expect(getUser.prompt.en).toMatch(/GET \/users\/:id/);
    expect(englishList(getUser.requirements)).toMatch(/404/);
    expect(englishList(getUser.requirements)).toMatch(/500/);

    expect(createUser.category).toBe("http");
    expect(createUser.prompt.en).toMatch(/POST \/users/);
    expect(englishList(createUser.requirements)).toMatch(/400/);
    expect(englishList(createUser.requirements)).toMatch(/409/);
    expect(englishList(createUser.requirements)).toMatch(/201/);

    expect(middleware.category).toBe("express");
    expect(middleware.prompt.en).toMatch(/API key|middleware/i);
    expect(middleware.starterCode).toMatch(/next\(/);
    expect(englishList(middleware.reviewChecklist)).toMatch(/internal/i);

    expect(streams.category).toBe("streams");
    expect(streams.prompt.en).toMatch(/NDJSON|newline-delimited/i);
    expect(streams.starterCode).toMatch(/Transform|pipeline/);
    expect(streams.referenceSolution).toMatch(/pipeline|Transform/);
    expect(englishList(streams.requirements)).toMatch(/chunk/i);
  });
});
