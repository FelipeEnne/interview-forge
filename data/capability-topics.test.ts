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

  it("resolves React quiz content without study or challenge content", () => {
    expect(getStudyTopicById("react")).toBeUndefined();
    expect(getQuizTopicById("react")).toMatchObject({
      id: "react",
      questionsPerAttempt: 10,
      durationMinutes: 8,
    });
    expect(getChallengeTopicById("react")).toBeUndefined();
  });

  it("does not resolve unavailable Angular content", () => {
    expect(getStudyTopicById("angular")).toBeUndefined();
    expect(getQuizTopicById("angular")).toBeUndefined();
    expect(getChallengeTopicById("angular")).toBeUndefined();
  });
});
