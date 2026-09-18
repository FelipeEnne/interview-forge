import type { QuestionProgressState } from "./question-progress";
import { RECALL_RATING_OPTIONS, type RecallRating } from "./recall-rating";

export const QUESTION_PROGRESS_STORAGE_KEY = "interview-forge:question-progress";

const VALID_RATINGS = new Set<string>(RECALL_RATING_OPTIONS);

function isRecallRating(value: unknown): value is RecallRating {
  return typeof value === "string" && VALID_RATINGS.has(value);
}

function isValidQuestionProgress(value: unknown): boolean {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const record = value as Record<string, unknown>;
  const reviewCount = record.reviewCount;
  const lastRating = record.lastRating;

  return (
    typeof reviewCount === "number" &&
    Number.isInteger(reviewCount) &&
    reviewCount >= 1 &&
    isRecallRating(lastRating)
  );
}

function parseQuestionProgressState(raw: string): QuestionProgressState {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }

  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {};
  }

  const entries = Object.entries(parsed as Record<string, unknown>);
  const state: QuestionProgressState = {};

  for (const [questionId, progress] of entries) {
    if (questionId.length === 0 || !isValidQuestionProgress(progress)) {
      return {};
    }

    const { lastRating, reviewCount } = progress as {
      lastRating: RecallRating;
      reviewCount: number;
    };
    state[questionId] = { lastRating, reviewCount };
  }

  return state;
}

function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

export function readQuestionProgress(): QuestionProgressState {
  const storage = getStorage();
  if (!storage) {
    return {};
  }

  const raw = storage.getItem(QUESTION_PROGRESS_STORAGE_KEY);
  if (raw === null) {
    return {};
  }

  return parseQuestionProgressState(raw);
}

export function saveQuestionProgress(state: QuestionProgressState): void {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  storage.setItem(QUESTION_PROGRESS_STORAGE_KEY, JSON.stringify(state));
}
