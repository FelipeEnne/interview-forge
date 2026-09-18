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

  it("has exactly 30 questions", () => {
    expect(NODEJS_TOPIC.questions).toHaveLength(30);
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
        "event-loop",
        "sync-vs-async",
        "cjs-vs-esm",
        "middleware",
      ]),
    );
  });
});
