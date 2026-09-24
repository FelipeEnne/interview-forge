/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { getStudyTopicById } from "./study-topics";

describe("active recall question ids", () => {
  it("are globally unique across Node.js, React, and Angular study banks", () => {
    const ids = ["nodejs", "react", "angular"].flatMap((topicId) => {
      const topic = getStudyTopicById(topicId);
      expect(topic).toBeDefined();
      return topic!.questions.map(({ id }) => id);
    });

    expect(new Set(ids).size).toBe(ids.length);
  });
});
