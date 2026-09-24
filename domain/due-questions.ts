import type { QuestionProgressState } from "./question-progress";

export function getDueQuestions<Question extends { id: string }>(
  questions: readonly Question[],
  progress: Readonly<QuestionProgressState>,
  currentTime: Date,
): Question[] {
  const currentTimestamp = currentTime.getTime();

  return questions.filter((question) => {
    const nextReviewAt = progress[question.id]?.nextReviewAt;

    return (
      nextReviewAt === undefined || Date.parse(nextReviewAt) <= currentTimestamp
    );
  });
}
