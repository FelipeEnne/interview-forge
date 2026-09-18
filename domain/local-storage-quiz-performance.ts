import {
  QUESTION_CATEGORY_LABELS,
  type QuestionCategory,
} from "@/data/nodejs-questions";
import type { CategoryScore } from "./quiz";
import type { QuizPerformance } from "./quiz-performance";

export const QUIZ_PERFORMANCE_STORAGE_KEY =
  "interview-forge:quiz-attempts";

const VALID_CATEGORIES = new Set<string>(
  Object.keys(QUESTION_CATEGORY_LABELS),
);

function isQuestionCategory(value: string): value is QuestionCategory {
  return VALID_CATEGORIES.has(value);
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

function parseQuizPerformance(raw: string): QuizPerformance {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }

  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {};
  }

  const performance: QuizPerformance = {};

  for (const [category, score] of Object.entries(
    parsed as Record<string, unknown>,
  )) {
    if (!isQuestionCategory(category) || !isValidCategoryScore(score)) {
      return {};
    }

    performance[category] = {
      correct: score.correct,
      total: score.total,
    };
  }

  return performance;
}

function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

export function readQuizPerformance(): QuizPerformance {
  const storage = getStorage();
  if (!storage) {
    return {};
  }

  const raw = storage.getItem(QUIZ_PERFORMANCE_STORAGE_KEY);
  if (raw === null) {
    return {};
  }

  return parseQuizPerformance(raw);
}

export function saveQuizPerformance(performance: QuizPerformance): void {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  storage.setItem(
    QUIZ_PERFORMANCE_STORAGE_KEY,
    JSON.stringify(performance),
  );
}
