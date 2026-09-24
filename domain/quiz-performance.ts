import type { CategoryScore } from "./quiz";

export const MIN_CATEGORY_QUESTIONS = 2;
export const LOWEST_CATEGORY_LIMIT = 3;

export type QuizPerformance<CategoryId extends string = string> = Partial<
  Record<CategoryId, CategoryScore>
>;

export type CategoryPerformanceEntry<CategoryId extends string = string> =
  CategoryScore & {
    category: CategoryId;
    percentage: number;
  };

export function recordQuizPerformance<CategoryId extends string>(
  current: QuizPerformance<CategoryId>,
  attemptByCategory: QuizPerformance<CategoryId>,
): QuizPerformance<CategoryId> {
  const updated: QuizPerformance<CategoryId> = { ...current };

  for (const [category, attemptScore] of Object.entries(attemptByCategory) as [
    CategoryId,
    CategoryScore,
  ][]) {
    const storedScore = updated[category] ?? { correct: 0, total: 0 };

    updated[category] = {
      correct: storedScore.correct + attemptScore.correct,
      total: storedScore.total + attemptScore.total,
    };
  }

  return updated;
}

export function getLowestCategoryPerformance<CategoryId extends string>(
  performance: QuizPerformance<CategoryId>,
  categoryOrder: readonly CategoryId[],
): CategoryPerformanceEntry<CategoryId>[] {
  return categoryOrder
    .flatMap((category) => {
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
        categoryOrder.indexOf(first.category) -
        categoryOrder.indexOf(second.category)
      );
    })
    .slice(0, LOWEST_CATEGORY_LIMIT);
}
