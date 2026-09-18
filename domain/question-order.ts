import type { QuestionProgressState } from "./question-progress";
import type { RecallRating } from "./recall-rating";

const RATING_PRIORITY: Record<RecallRating, number> = {
  again: 0,
  hard: 1,
  good: 3,
  easy: 4,
};

const UNREVIEWED_PRIORITY = 2;

export function orderQuestionsForStudy<Question extends { id: string }>(
  questions: readonly Question[],
  progress: QuestionProgressState,
): Question[] {
  return questions
    .map((question, originalIndex) => ({
      question,
      originalIndex,
      priority:
        progress[question.id] === undefined
          ? UNREVIEWED_PRIORITY
          : RATING_PRIORITY[progress[question.id].lastRating],
    }))
    .sort(
      (left, right) =>
        left.priority - right.priority ||
        left.originalIndex - right.originalIndex,
    )
    .map(({ question }) => question);
}
