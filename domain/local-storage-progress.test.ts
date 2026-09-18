import { beforeEach, describe, expect, it } from "vitest";

import {
  QUESTION_PROGRESS_STORAGE_KEY,
  readQuestionProgress,
  saveQuestionProgress,
} from "./local-storage-progress";
import type { QuestionProgressState } from "./question-progress";

const sampleState: QuestionProgressState = {
  q1: { lastRating: "good", reviewCount: 2 },
  q2: { lastRating: "again", reviewCount: 1 },
};

describe("local-storage-progress", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("readQuestionProgress", () => {
    it("returns an empty state when the storage key is missing", () => {
      expect(readQuestionProgress()).toEqual({});
    });

    it("returns an empty state when stored JSON is invalid", () => {
      localStorage.setItem(QUESTION_PROGRESS_STORAGE_KEY, "not-json{");

      expect(readQuestionProgress()).toEqual({});
    });

    it("returns an empty state when the root value is not a plain object", () => {
      localStorage.setItem(QUESTION_PROGRESS_STORAGE_KEY, "[]");

      expect(readQuestionProgress()).toEqual({});
    });

    it("returns an empty state when any entry fails validation", () => {
      localStorage.setItem(
        QUESTION_PROGRESS_STORAGE_KEY,
        JSON.stringify({
          q1: { lastRating: "good", reviewCount: 1 },
          q2: { lastRating: "invalid", reviewCount: 1 },
        }),
      );

      expect(readQuestionProgress()).toEqual({});
    });

    it("returns an empty state when reviewCount is invalid", () => {
      localStorage.setItem(
        QUESTION_PROGRESS_STORAGE_KEY,
        JSON.stringify({
          q1: { lastRating: "good", reviewCount: 0 },
        }),
      );

      expect(readQuestionProgress()).toEqual({});
    });
  });

  describe("saveQuestionProgress and readQuestionProgress", () => {
    it("round-trips progress through localStorage", () => {
      saveQuestionProgress(sampleState);

      expect(readQuestionProgress()).toEqual(sampleState);
    });
  });
});
