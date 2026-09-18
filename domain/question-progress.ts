import type { RecallRating } from "./recall-rating";
import { calculateNextReviewAt } from "./review-schedule";

export type QuestionProgress = {
  lastRating: RecallRating;
  reviewCount: number;
  lastReviewedAt?: string;
  nextReviewAt?: string;
};

export type QuestionProgressState = Record<string, QuestionProgress>;

export function recordQuestionProgress(
  state: QuestionProgressState,
  questionId: string,
  rating: RecallRating,
  reviewedAt: Date,
): QuestionProgressState {
  const existing = state[questionId];

  return {
    ...state,
    [questionId]: {
      lastRating: rating,
      reviewCount: (existing?.reviewCount ?? 0) + 1,
      lastReviewedAt: reviewedAt.toISOString(),
      nextReviewAt: calculateNextReviewAt(rating, reviewedAt),
    },
  };
}
