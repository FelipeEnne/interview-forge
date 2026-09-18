import {
  QUESTION_CATEGORY_LABELS,
  type QuestionCategory,
} from "@/data/nodejs-questions";
import type { CategoryScore } from "./quiz";

export const MIN_CATEGORY_QUESTIONS = 2;
export const LOWEST_CATEGORY_LIMIT = 3;

export type QuizPerformance = Partial<
  Record<QuestionCategory, CategoryScore>
>;

export type CategoryPerformance = CategoryScore & {
  category: QuestionCategory;
  percentage: number;
};

const CATEGORY_ORDER = Object.keys(
  QUESTION_CATEGORY_LABELS,
) as QuestionCategory[];

export function recordQuizPerformance(
  current: QuizPerformance,
  attemptByCategory: QuizPerformance,
): QuizPerformance {
  const updated: QuizPerformance = {};

  for (const category of CATEGORY_ORDER) {
    const storedScore = current[category];
    const attemptScore = attemptByCategory[category];

    if (!storedScore && !attemptScore) {
      continue;
    }

    updated[category] = {
      correct: (storedScore?.correct ?? 0) + (attemptScore?.correct ?? 0),
      total: (storedScore?.total ?? 0) + (attemptScore?.total ?? 0),
    };
  }

  return updated;
}

export function getLowestCategoryPerformance(
  performance: QuizPerformance,
): CategoryPerformance[] {
  return CATEGORY_ORDER.flatMap((category) => {
    const score = performance[category];

    if (!score || score.total < MIN_CATEGORY_QUESTIONS) {
      return [];
    }

    return [
      {
        category,
        ...score,
        percentage: Math.round((score.correct / score.total) * 100),
      },
    ];
  })
    .sort((first, second) => {
      const accuracyComparison =
        first.correct * second.total - second.correct * first.total;

      if (accuracyComparison !== 0) {
        return accuracyComparison;
      }

      return (
        CATEGORY_ORDER.indexOf(first.category) -
        CATEGORY_ORDER.indexOf(second.category)
      );
    })
    .slice(0, LOWEST_CATEGORY_LIMIT);
}
