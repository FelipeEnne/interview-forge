/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { NODEJS_CODING_CHALLENGES } from "@/data/nodejs-coding-challenges";
import { QUESTION_CATEGORIES } from "@/data/nodejs-questions";

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

  it("each challenge has valid category and non-empty content", () => {
    const validCategories = QUESTION_CATEGORIES;

    for (const challenge of NODEJS_CODING_CHALLENGES) {
      expect(challenge.id.trim()).not.toBe("");
      expect(validCategories).toContain(challenge.category);
      expect(challenge.title.trim()).not.toBe("");
      expect(challenge.prompt.trim()).not.toBe("");
      expect(challenge.starterCode.trim()).not.toBe("");
      expect(challenge.referenceSolution.trim()).not.toBe("");
      expect(challenge.requirements.length).toBeGreaterThan(0);
      expect(challenge.reviewChecklist.length).toBeGreaterThan(0);

      for (const requirement of challenge.requirements) {
        expect(requirement.trim()).not.toBe("");
      }

      for (const item of challenge.reviewChecklist) {
        expect(item.trim()).not.toBe("");
      }
    }
  });

  it("covers retry, settled aggregation, REST handlers, middleware, and streams", () => {
    const [retry, aggregate, getUser, createUser, middleware, streams] =
      NODEJS_CODING_CHALLENGES;

    expect(retry.category).toBe("async");
    expect(retry.prompt).toMatch(/retry/i);
    expect(retry.starterCode).toMatch(/async function retry/);
    expect(retry.referenceSolution).toMatch(/await/);
    expect(retry.requirements.join(" ")).toMatch(/last error/i);

    expect(aggregate.category).toBe("async");
    expect(aggregate.prompt).toMatch(/allSettled|providers/i);
    expect(aggregate.starterCode).toMatch(/Promise/);
    expect(aggregate.referenceSolution).toMatch(/allSettled/);

    expect(getUser.category).toBe("http");
    expect(getUser.prompt).toMatch(/GET \/users\/:id/);
    expect(getUser.requirements.join(" ")).toMatch(/404/);
    expect(getUser.requirements.join(" ")).toMatch(/500/);

    expect(createUser.category).toBe("http");
    expect(createUser.prompt).toMatch(/POST \/users/);
    expect(createUser.requirements.join(" ")).toMatch(/400/);
    expect(createUser.requirements.join(" ")).toMatch(/409/);
    expect(createUser.requirements.join(" ")).toMatch(/201/);

    expect(middleware.category).toBe("express");
    expect(middleware.prompt).toMatch(/API key|middleware/i);
    expect(middleware.starterCode).toMatch(/next\(/);
    expect(middleware.reviewChecklist.join(" ")).toMatch(/internal/i);

    expect(streams.category).toBe("streams");
    expect(streams.prompt).toMatch(/NDJSON|newline-delimited/i);
    expect(streams.starterCode).toMatch(/Transform|pipeline/);
    expect(streams.referenceSolution).toMatch(/pipeline|Transform/);
    expect(streams.requirements.join(" ")).toMatch(/chunk/i);
  });
});
