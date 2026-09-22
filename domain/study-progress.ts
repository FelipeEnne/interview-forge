import type { QuestionProgressState } from "./question-progress";

export type StudyProgress = {
  total: number;
  memorized: number;
  remaining: number;
  percentage: number;
};

function isMemorizedRating(lastRating: string): boolean {
  return lastRating === "good" || lastRating === "easy";
}

export function getStudyProgress<Question extends { id: string }>(
  questions: readonly Question[],
  questionProgress: QuestionProgressState,
): StudyProgress {
  const total = questions.length;
  let memorized = 0;

  for (const question of questions) {
    const progress = questionProgress[question.id];
    if (progress !== undefined && isMemorizedRating(progress.lastRating)) {
      memorized += 1;
    }
  }

  const remaining = total - memorized;
  const percentage =
    total === 0 ? 0 : Math.round((memorized / total) * 100);

  return {
    total,
    memorized,
    remaining,
    percentage,
  };
}
