/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { NODEJS_TOPIC, QUESTION_CATEGORIES } from "./nodejs-questions";

const ORIGINAL_QUESTION_IDS = [
  "nodejs-fundamentals",
  "v8-and-libuv",
  "single-threaded-nodejs",
  "graceful-shutdown",
  "v8-optimization-and-gc",
  "environment-configuration",
  "event-loop",
  "sync-vs-async",
  "promises-and-async-await",
  "microtasks-and-nexttick",
  "blocking-the-event-loop",
  "worker-threads",
  "event-emitter",
  "event-loop-phases",
  "nexttick-vs-setimmediate",
  "libuv-thread-pool",
  "workers-vs-child-processes",
  "bounded-concurrency",
  "cjs-vs-esm",
  "module-caching",
  "package-json-role",
  "npm-lockfiles",
  "semver-ranges",
  "node-http-server",
  "http-methods-idempotency",
  "api-status-codes",
  "http-keep-alive",
  "cors",
  "websockets",
  "rest-vs-graphql",
  "api-performance",
  "sessions-vs-tokens",
  "rate-limiting",
  "middleware",
  "express-routers",
  "express-error-middleware",
  "stream-types",
  "stream-backpressure",
  "stream-pipeline",
  "buffers",
  "fs-sync-async-streams",
  "buffer-encodings",
  "streaming-uploads",
  "unit-vs-integration-tests",
  "testing-async-code",
  "test-mocking-boundaries",
  "cicd-quality-gates",
  "input-validation",
  "authentication-vs-authorization",
  "api-security-baseline",
  "password-hashing",
  "crypto-primitives",
  "secret-management",
  "database-connection-pooling",
  "caching",
  "observability-opentelemetry",
  "message-queues",
  "docker-nodejs",
  "clustering-and-scaling",
  "monolith-vs-microservices",
] as const;

function expectNonEmptyLocalizedText(value: { en: string; pt: string }) {
  expect(value.en.trim()).not.toBe("");
  expect(value.pt.trim()).not.toBe("");
}

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

  it("each question has a valid category and bilingual content", () => {
    const validCategories = QUESTION_CATEGORIES;

    for (const item of NODEJS_TOPIC.questions) {
      expect(item.id.trim()).not.toBe("");
      expect(validCategories).toContain(item.category);
      expectNonEmptyLocalizedText(item.question);
      expectNonEmptyLocalizedText(item.answer);
    }
  });

  it("has unique question ids", () => {
    const ids = NODEJS_TOPIC.questions.map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("preserves the original question ids", () => {
    expect(NODEJS_TOPIC.questions.map(({ id }) => id)).toEqual([
      ...ORIGINAL_QUESTION_IDS,
    ]);
  });
});
