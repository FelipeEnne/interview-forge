/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import {
  NODEJS_TOPIC,
  QUESTION_CATEGORY_LABELS,
} from "./nodejs-questions";

describe("NODEJS_TOPIC", () => {
  it("has slug nodejs", () => {
    expect(NODEJS_TOPIC.slug).toBe("nodejs");
  });

  it("has display name Node.js", () => {
    expect(NODEJS_TOPIC.displayName).toBe("Node.js");
  });

  it("has exactly 60 questions", () => {
    expect(NODEJS_TOPIC.questions).toHaveLength(60);
  });

  it("each question has a valid category and non-empty content", () => {
    const validCategories = Object.keys(QUESTION_CATEGORY_LABELS);

    for (const item of NODEJS_TOPIC.questions) {
      expect(item.id.trim()).not.toBe("");
      expect(validCategories).toContain(item.category);
      expect(item.question.trim()).not.toBe("");
      expect(item.answer.trim()).not.toBe("");
    }
  });

  it("has unique question ids", () => {
    const ids = NODEJS_TOPIC.questions.map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("preserves the original question ids", () => {
    const ids = NODEJS_TOPIC.questions.map(({ id }) => id);

    expect(ids).toEqual(
      expect.arrayContaining([
        "nodejs-fundamentals",
        "v8-and-libuv",
        "single-threaded-nodejs",
        "graceful-shutdown",
        "event-loop",
        "sync-vs-async",
        "promises-and-async-await",
        "microtasks-and-nexttick",
        "blocking-the-event-loop",
        "worker-threads",
        "cjs-vs-esm",
        "module-caching",
        "package-json-role",
        "node-http-server",
        "http-methods-idempotency",
        "api-status-codes",
        "http-keep-alive",
        "middleware",
        "express-routers",
        "express-error-middleware",
        "stream-types",
        "stream-backpressure",
        "stream-pipeline",
        "buffers",
        "unit-vs-integration-tests",
        "testing-async-code",
        "test-mocking-boundaries",
        "input-validation",
        "authentication-vs-authorization",
        "api-security-baseline",
      ]),
    );
  });
});
