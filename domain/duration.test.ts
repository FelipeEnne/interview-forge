/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import {
  daysToMilliseconds,
  minutesToMilliseconds,
  minutesToSeconds,
} from "./duration";

describe("duration", () => {
  it("converts minutes to seconds and milliseconds", () => {
    expect(minutesToSeconds(8)).toBe(480);
    expect(minutesToMilliseconds(8)).toBe(480_000);
  });

  it("converts days to milliseconds", () => {
    expect(daysToMilliseconds(1)).toBe(86_400_000);
  });
});
