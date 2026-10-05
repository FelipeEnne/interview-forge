import type { CategoryScore } from "./quiz";
import type { QuizPerformance } from "./quiz-performance";
import { getLocalStorage } from "@/browser/local-storage";

export const QUIZ_PERFORMANCE_STORAGE_KEY = "interview-forge:quiz-attempts";

const LEGACY_QUIZ_PERFORMANCE_TOPIC_ID = "nodejs";

export function getQuizPerformanceStorageKey(topicId: string): string {
  return topicId === LEGACY_QUIZ_PERFORMANCE_TOPIC_ID
    ? QUIZ_PERFORMANCE_STORAGE_KEY
    : `${QUIZ_PERFORMANCE_STORAGE_KEY}:${topicId}`;
}

function isValidCategoryScore(value: unknown): value is CategoryScore {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const { correct, total } = value as Record<string, unknown>;

  return (
    typeof correct === "number" &&
    Number.isInteger(correct) &&
    correct >= 0 &&
    typeof total === "number" &&
    Number.isInteger(total) &&
    total >= 1 &&
    correct <= total
  );
}

function parseQuizPerformance<CategoryId extends string>(
  raw: string,
  categoryIds: readonly CategoryId[],
): QuizPerformance<CategoryId> {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }

  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {};
  }

  const validCategories = new Set<string>(categoryIds);
  const performance: QuizPerformance<CategoryId> = {};

  for (const [category, score] of Object.entries(
    parsed as Record<string, unknown>,
  )) {
    if (!validCategories.has(category) || !isValidCategoryScore(score)) {
      return {};
    }

    performance[category as CategoryId] = {
      correct: score.correct,
      total: score.total,
    };
  }

  return performance;
}

export function readQuizPerformance<CategoryId extends string>(
  topicId: string,
  categoryIds: readonly CategoryId[],
): QuizPerformance<CategoryId> {
  const storage = getLocalStorage();
  if (!storage) {
    return {};
  }

  const raw = storage.getItem(getQuizPerformanceStorageKey(topicId));
  if (raw === null) {
    return {};
  }

  return parseQuizPerformance(raw, categoryIds);
}

export function saveQuizPerformance<CategoryId extends string>(
  topicId: string,
  performance: QuizPerformance<CategoryId>,
): void {
  const storage = getLocalStorage();
  if (!storage) {
    return;
  }

  storage.setItem(
    getQuizPerformanceStorageKey(topicId),
    JSON.stringify(performance),
  );
}
