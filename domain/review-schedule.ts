import { daysToMilliseconds, minutesToMilliseconds } from "./duration";
import type { RecallRating } from "./recall-rating";

const AGAIN_INTERVAL_MINUTES = 10;
const HARD_INTERVAL_DAYS = 1;
const GOOD_INTERVAL_DAYS = 3;
const EASY_INTERVAL_DAYS = 7;

const REVIEW_INTERVAL_MILLISECONDS: Record<RecallRating, number> = {
  again: minutesToMilliseconds(AGAIN_INTERVAL_MINUTES),
  hard: daysToMilliseconds(HARD_INTERVAL_DAYS),
  good: daysToMilliseconds(GOOD_INTERVAL_DAYS),
  easy: daysToMilliseconds(EASY_INTERVAL_DAYS),
};

export function calculateNextReviewAt(
  rating: RecallRating,
  reviewedAt: Date,
): string {
  return new Date(
    reviewedAt.getTime() + REVIEW_INTERVAL_MILLISECONDS[rating],
  ).toISOString();
}
