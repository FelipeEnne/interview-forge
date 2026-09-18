import type { RecallRating } from "./recall-rating";

export type QuestionProgress = {
  lastRating: RecallRating;
  reviewCount: number;
};

export type QuestionProgressState = Record<string, QuestionProgress>;

export function recordQuestionProgress(
  state: QuestionProgressState,
  questionId: string,
  rating: RecallRating,
): QuestionProgressState {
  const existing = state[questionId];

  return {
    ...state,
    [questionId]: {
      lastRating: rating,
      reviewCount: (existing?.reviewCount ?? 0) + 1,
    },
  };
}
