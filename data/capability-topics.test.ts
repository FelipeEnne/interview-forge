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

  it("resolves React study and quiz content without challenge content", () => {
    expect(getStudyTopicById("react")).toMatchObject({
      id: "react",
      questions: expect.any(Array),
    });
    expect(getStudyTopicById("react")?.questions).toHaveLength(40);
    expect(getQuizTopicById("react")).toMatchObject({
      id: "react",
      questionsPerAttempt: 10,
      durationMinutes: 8,
    });
    expect(getChallengeTopicById("react")).toBeUndefined();
  });

  it("resolves Angular study and quiz content without challenge content", () => {
    expect(getStudyTopicById("angular")).toMatchObject({
      id: "angular",
      questions: expect.any(Array),
    });
    expect(getStudyTopicById("angular")?.questions).toHaveLength(40);
    expect(getQuizTopicById("angular")).toMatchObject({
      id: "angular",
      questionsPerAttempt: 10,
      durationMinutes: 8,
    });
    expect(getChallengeTopicById("angular")).toBeUndefined();
  });
});
