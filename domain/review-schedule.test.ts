/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { calculateNextReviewAt } from "@/domain/review-schedule";
import type { RecallRating } from "./recall-rating";

describe("calculateNextReviewAt", () => {
  it.each([
    ["again", "2026-09-18T03:25:00.000Z"],
    ["hard", "2026-09-19T03:15:00.000Z"],
    ["good", "2026-09-21T03:15:00.000Z"],
    ["easy", "2026-09-25T03:15:00.000Z"],
  ] satisfies [RecallRating, string][])(
    "schedules %s at the expected time",
    (rating, expected) => {
      const reviewedAt = new Date("2026-09-18T03:15:00.000Z");

      expect(calculateNextReviewAt(rating, reviewedAt)).toBe(expected);
      expect(reviewedAt.toISOString()).toBe("2026-09-18T03:15:00.000Z");
    },
  );
});
