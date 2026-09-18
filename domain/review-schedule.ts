import type { RecallRating } from "./recall-rating";

const MINUTE_IN_MILLISECONDS = 60 * 1000;
const DAY_IN_MILLISECONDS = 24 * 60 * MINUTE_IN_MILLISECONDS;

const REVIEW_INTERVAL_MILLISECONDS: Record<RecallRating, number> = {
  again: 10 * MINUTE_IN_MILLISECONDS,
  hard: DAY_IN_MILLISECONDS,
  good: 3 * DAY_IN_MILLISECONDS,
  easy: 7 * DAY_IN_MILLISECONDS,
};

export function calculateNextReviewAt(
  rating: RecallRating,
  reviewedAt: Date,
): string {
  return new Date(
    reviewedAt.getTime() + REVIEW_INTERVAL_MILLISECONDS[rating],
  ).toISOString();
}
