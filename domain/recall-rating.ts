export type RecallRating = "again" | "hard" | "good" | "easy";

export type SessionRatings = Record<string, RecallRating>;

export const RECALL_RATING_OPTIONS: readonly RecallRating[] = [
  "again",
  "hard",
  "good",
  "easy",
] as const;

export function recordSessionRating(
  ratings: SessionRatings,
  questionId: string,
  rating: RecallRating,
): SessionRatings {
  return { ...ratings, [questionId]: rating };
}

export type SessionRatingCounts = {
  total: number;
  again: number;
  hard: number;
  good: number;
  easy: number;
};

export function countSessionRatings(
  ratings: SessionRatings,
): SessionRatingCounts {
  const counts: SessionRatingCounts = {
    total: Object.keys(ratings).length,
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
  };

  for (const rating of Object.values(ratings)) {
    counts[rating] += 1;
  }

  return counts;
}
