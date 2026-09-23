import type { QuestionCategory } from "@/data/nodejs-categories";
import type { QuizQuestion } from "@/data/nodejs-quiz-questions";

export const QUIZ_QUESTION_COUNT = 10;
export const QUIZ_DURATION_MS = 8 * 60 * 1000;

export type QuizAnswers = Readonly<Record<string, number>>;

export type CategoryScore = {
  correct: number;
  total: number;
};

export type QuizResult = {
  correct: number;
  total: number;
  percentage: number;
  byCategory: Partial<Record<QuestionCategory, CategoryScore>>;
};

export function selectQuizQuestions(
  questionBank: readonly QuizQuestion[],
  count: number,
  randomSource: () => number = Math.random,
): QuizQuestion[] {
  const shuffled = [...questionBank];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(randomSource() * (index + 1));
    const current = shuffled[index];
    shuffled[index] = shuffled[swapIndex];
    shuffled[swapIndex] = current;
  }

  return shuffled.slice(0, count);
}

export function calculateQuizResult(
  attemptQuestions: readonly QuizQuestion[],
  answers: QuizAnswers,
): QuizResult {
  const byCategory: Partial<Record<QuestionCategory, CategoryScore>> = {};
  let correct = 0;

  for (const item of attemptQuestions) {
    const isCorrect = answers[item.id] === item.correctOption;

    if (isCorrect) {
      correct += 1;
    }

    const categoryScore = byCategory[item.category] ?? { correct: 0, total: 0 };
    byCategory[item.category] = {
      correct: categoryScore.correct + (isCorrect ? 1 : 0),
      total: categoryScore.total + 1,
    };
  }

  const total = attemptQuestions.length;

  return {
    correct,
    total,
    percentage: total === 0 ? 0 : Math.round((correct / total) * 100),
    byCategory,
  };
}
