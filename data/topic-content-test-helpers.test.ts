/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { isCorrectOptionLengthOutlier } from "./topic-content-test-helpers";

describe("isCorrectOptionLengthOutlier", () => {
  it("flags a correct option that is dramatically longer than every distractor", () => {
    expect(
      isCorrectOptionLengthOutlier(
        [
          "short wrong A",
          "Waits for every promise to settle and returns detailed information about whether each individual promise fulfilled or rejected",
          "short wrong C",
          "short wrong D",
        ],
        1,
      ),
    ).toBe(true);
  });

  it("does not flag a large absolute gap when the ratio stays moderate", () => {
    expect(
      isCorrectOptionLengthOutlier(
        [
          "Stops when the first promise rejects and returns that rejection right away",
          "Executes each promise sequentially and stops after the first failure occurs",
          "Waits for every promise to settle and reports each individual outcome",
          "Waits only for fulfilled promises and discards rejected outcomes after that",
        ],
        2,
      ),
    ).toBe(false);
  });

  it("does not flag short options with a high ratio but a tiny character gap", () => {
    expect(isCorrectOptionLengthOutlier(["2xx", "3xx", "4xx", "5xx"], 3)).toBe(
      false,
    );
  });
});
