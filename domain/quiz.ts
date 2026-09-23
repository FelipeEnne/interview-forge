import type { QuizQuestion } from "@/data/quiz-types";

export type QuizAnswers = Readonly<Record<string, number>>;

export type CategoryScore = {
  correct: number;
  total: number;
};

export type QuizResult<CategoryId extends string = string> = {
  correct: number;
  total: number;
  percentage: number;
  byCategory: Partial<Record<CategoryId, CategoryScore>>;
};

export function selectQuizQuestions<Question>(
  questionBank: readonly Question[],
  count: number,
  randomSource: () => number = Math.random,
): Question[] {
  const shuffled = [...questionBank];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(randomSource() * (index + 1));
    const current = shuffled[index];
    shuffled[index] = shuffled[swapIndex];
    shuffled[swapIndex] = current;
  }

  return shuffled.slice(0, count);
}

export function calculateQuizResult<CategoryId extends string>(
  attemptQuestions: readonly QuizQuestion<CategoryId>[],
  answers: QuizAnswers,
): QuizResult<CategoryId> {
  const byCategory: Partial<Record<CategoryId, CategoryScore>> = {};
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
