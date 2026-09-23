/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { getChallengeTopicById } from "./challenge-topics";
import { getQuizTopicById } from "./quiz-topics";
import { getStudyTopicById } from "./study-topics";

describe("topic capability resolvers", () => {
  it("resolves every current Node.js capability", () => {
    expect(getStudyTopicById("nodejs")).toBeDefined();
    expect(getQuizTopicById("nodejs")).toMatchObject({
      questionsPerAttempt: 10,
      durationMinutes: 8,
    });
    expect(getChallengeTopicById("nodejs")?.challenges).toHaveLength(6);
  });

  it.each(["react", "angular"])("does not resolve unavailable %s content", (topicId) => {
    expect(getStudyTopicById(topicId)).toBeUndefined();
    expect(getQuizTopicById(topicId)).toBeUndefined();
    expect(getChallengeTopicById(topicId)).toBeUndefined();
  });
});
