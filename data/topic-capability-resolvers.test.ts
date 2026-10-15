/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { getChallengeTopicById } from "./challenge-topics";
import {
  getQuizTopicById,
  QUIZ_DURATION_MINUTES,
  QUIZ_QUESTIONS_PER_ATTEMPT,
} from "./quiz-topics";
import { getStudyTopicById } from "./study-topics";
import { getTopicById } from "./topic-registry";

describe("topic capability resolvers", () => {
  it("resolves every current Node.js capability", () => {
    expect(getStudyTopicById("nodejs")).toBeDefined();
    expect(getQuizTopicById("nodejs")).toMatchObject({
      questionsPerAttempt: QUIZ_QUESTIONS_PER_ATTEMPT,
      durationMinutes: QUIZ_DURATION_MINUTES,
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
      questionsPerAttempt: QUIZ_QUESTIONS_PER_ATTEMPT,
      durationMinutes: QUIZ_DURATION_MINUTES,
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
      questionsPerAttempt: QUIZ_QUESTIONS_PER_ATTEMPT,
      durationMinutes: QUIZ_DURATION_MINUTES,
    });
    expect(getChallengeTopicById("angular")).toBeUndefined();
  });

  it("returns undefined for unknown topic ids", () => {
    expect(getStudyTopicById("unknown")).toBeUndefined();
    expect(getQuizTopicById("unknown")).toBeUndefined();
    expect(getChallengeTopicById("unknown")).toBeUndefined();
  });

  it("aligns capability display names with the topic registry", () => {
    for (const topicId of ["nodejs", "react", "angular"] as const) {
      const definition = getTopicById(topicId)!;

      expect(getStudyTopicById(topicId)?.displayName).toEqual(
        definition.displayName,
      );
      expect(getQuizTopicById(topicId)?.displayName).toEqual(
        definition.displayName,
      );
    }

    expect(getChallengeTopicById("nodejs")?.displayName).toEqual(
      getTopicById("nodejs")!.displayName,
    );
  });
});
