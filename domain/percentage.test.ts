/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { calculatePercentage } from "./percentage";

describe("calculatePercentage", () => {
  it("rounds a ratio to the nearest whole percentage", () => {
    expect(calculatePercentage(1, 3)).toBe(33);
    expect(calculatePercentage(2, 3)).toBe(67);
  });

  it("returns zero when the total is zero", () => {
    expect(calculatePercentage(0, 0)).toBe(0);
  });
});
