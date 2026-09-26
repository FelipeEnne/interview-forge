import type { QuestionProgressState } from "./question-progress";
import { calculatePercentage } from "./percentage";

type StudyProgressRatings = {
  again: number;
  hard: number;
  good: number;
  easy: number;
  unreviewed: number;
};

export type StudyProgress = {
  total: number;
  memorized: number;
  remaining: number;
  percentage: number;
  ratings: StudyProgressRatings;
};

const emptyRatings = (): StudyProgressRatings => ({
  again: 0,
  hard: 0,
  good: 0,
  easy: 0,
  unreviewed: 0,
});

export function getStudyProgress<Question extends { id: string }>(
  questions: readonly Question[],
  questionProgress: QuestionProgressState,
): StudyProgress {
  const ratings = emptyRatings();

  for (const question of questions) {
    const progress = questionProgress[question.id];
    if (progress === undefined) {
      ratings.unreviewed += 1;
      continue;
    }

    ratings[progress.lastRating] += 1;
  }

  const total = questions.length;
  const memorized = ratings.good + ratings.easy;
  const remaining = ratings.again + ratings.hard + ratings.unreviewed;
  const percentage = calculatePercentage(memorized, total);

  return {
    total,
    memorized,
    remaining,
    percentage,
    ratings,
  };
}
