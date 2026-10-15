/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { expectUniqueIds } from "./topic-content-test-helpers";
import { getQuizTopicById } from "./quiz-topics";

describe("quiz question ids", () => {
  it("are globally unique across Node.js, React, and Angular quiz banks", () => {
    const ids = ["nodejs", "react", "angular"].flatMap((topicId) => {
      const topic = getQuizTopicById(topicId);
      expect(topic).toBeDefined();
      return topic!.questions.map(({ id }) => id);
    });

    expectUniqueIds(ids);
  });
});
