import { getDueQuestions } from "./due-questions";
import { orderQuestionsForStudy } from "./question-order";
import type { QuestionProgressState } from "./question-progress";

export type StudySessionMode = "due-review" | "practice";

export function createStudyQueue<Question extends { id: string }>(
  questions: readonly Question[],
  progress: QuestionProgressState,
  mode: StudySessionMode,
  currentTime: Date,
): Question[] {
  const selectedQuestions =
    mode === "due-review"
      ? getDueQuestions(questions, progress, currentTime)
      : questions;

  return orderQuestionsForStudy(selectedQuestions, progress);
}
