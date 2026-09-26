/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import {
  formatQuizTime,
  getRemainingQuizSeconds,
  minutesToMilliseconds,
  minutesToSeconds,
} from "./quiz-timer";

describe("quiz timer", () => {
  it("converts configured minutes to milliseconds", () => {
    expect(minutesToMilliseconds(8)).toBe(480_000);
    expect(minutesToSeconds(8)).toBe(480);
  });

  it("formats a duration as a zero-padded clock", () => {
    expect(formatQuizTime(0)).toBe("00:00");
    expect(formatQuizTime(65)).toBe("01:05");
  });

  it("rounds partial remaining seconds up", () => {
    expect(getRemainingQuizSeconds(2_001, 1_000)).toBe(2);
  });

  it("does not return negative remaining time", () => {
    expect(getRemainingQuizSeconds(1_000, 2_000)).toBe(0);
  });
});
