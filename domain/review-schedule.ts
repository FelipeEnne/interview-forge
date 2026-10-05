import type { RecallRating } from "./recall-rating";

const MINUTE_IN_MILLISECONDS = 60 * 1000;
const DAY_IN_MILLISECONDS = 24 * 60 * MINUTE_IN_MILLISECONDS;

const AGAIN_INTERVAL_MINUTES = 10;
const HARD_INTERVAL_DAYS = 1;
const GOOD_INTERVAL_DAYS = 3;
const EASY_INTERVAL_DAYS = 7;

const REVIEW_INTERVAL_MILLISECONDS: Record<RecallRating, number> = {
  again: AGAIN_INTERVAL_MINUTES * MINUTE_IN_MILLISECONDS,
  hard: HARD_INTERVAL_DAYS * DAY_IN_MILLISECONDS,
  good: GOOD_INTERVAL_DAYS * DAY_IN_MILLISECONDS,
  easy: EASY_INTERVAL_DAYS * DAY_IN_MILLISECONDS,
};

export function calculateNextReviewAt(
  rating: RecallRating,
  reviewedAt: Date,
): string {
  return new Date(
    reviewedAt.getTime() + REVIEW_INTERVAL_MILLISECONDS[rating],
  ).toISOString();
}
