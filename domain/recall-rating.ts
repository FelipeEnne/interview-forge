export type RecallRating = "again" | "hard" | "good" | "easy";

export type SessionRatings = Record<string, RecallRating>;

export const RECALL_RATING_OPTIONS: readonly RecallRating[] = [
  "again",
  "hard",
  "good",
  "easy",
] as const;

export const RECALL_RATING_LABELS: Record<RecallRating, string> = {
  again: "Again",
  hard: "Hard",
  good: "Good",
  easy: "Easy",
};

export function recordSessionRating(
  ratings: SessionRatings,
  questionId: string,
  rating: RecallRating,
): SessionRatings {
  return { ...ratings, [questionId]: rating };
}
