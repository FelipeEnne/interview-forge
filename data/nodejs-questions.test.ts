import { describe, expect, it } from "vitest";

import { NODEJS_TOPIC } from "./nodejs-questions";

describe("NODEJS_TOPIC", () => {
  it("has slug nodejs", () => {
    expect(NODEJS_TOPIC.slug).toBe("nodejs");
  });

  it("has display name Node.js", () => {
    expect(NODEJS_TOPIC.displayName).toBe("Node.js");
  });

  it("has exactly 5 questions", () => {
    expect(NODEJS_TOPIC.questions).toHaveLength(5);
  });

  it("each question has non-empty id, question, and answer", () => {
    for (const item of NODEJS_TOPIC.questions) {
      expect(item.id.trim()).not.toBe("");
      expect(item.question.trim()).not.toBe("");
      expect(item.answer.trim()).not.toBe("");
    }
  });
});
