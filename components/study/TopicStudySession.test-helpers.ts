import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type {
  InterviewQuestion,
  StudyCategoryDefinition,
} from "@/data/study-types";
import type { RecallRating } from "@/domain/recall-rating";

export const sampleQuestions: InterviewQuestion[] = [
  {
    id: "q1",
    category: "fundamentals",
    question: {
      en: "First question text?",
      pt: "Texto da primeira pergunta?",
    },
    answer: {
      en: "First answer text.",
      pt: "Texto da primeira resposta.",
    },
  },
  {
    id: "q2",
    category: "async",
    question: {
      en: "Second question text?",
      pt: "Texto da segunda pergunta?",
    },
    answer: {
      en: "Second answer text.",
      pt: "Texto da segunda resposta.",
    },
  },
  {
    id: "q3",
    category: "modules",
    question: {
      en: "Third question text?",
      pt: "Texto da terceira pergunta?",
    },
    answer: {
      en: "Third answer text.",
      pt: "Texto da terceira resposta.",
    },
  },
];

export const sampleCategories: readonly StudyCategoryDefinition[] = [
  {
    id: "fundamentals",
    displayName: { en: "Fundamentals", pt: "Fundamentos" },
  },
  {
    id: "async",
    displayName: {
      en: "Event Loop & Async",
      pt: "Event Loop e Assincronismo",
    },
  },
  {
    id: "modules",
    displayName: { en: "Modules", pt: "Módulos" },
  },
];

const RATING_BUTTON_NAMES: Record<RecallRating, string> = {
  again: "Again",
  hard: "Hard",
  good: "Good",
  easy: "Easy",
};

export function ratingButtons() {
  return {
    again: screen.queryByRole("button", { name: "Again" }),
    hard: screen.queryByRole("button", { name: "Hard" }),
    good: screen.queryByRole("button", { name: "Good" }),
    easy: screen.queryByRole("button", { name: "Easy" }),
  };
}

export function createClock(iso = "2026-09-18T03:15:00.000Z") {
  let currentMs = new Date(iso).getTime();

  return {
    now: () => new Date(currentMs),
    set: (nextIso: string) => {
      currentMs = new Date(nextIso).getTime();
    },
  };
}

export function createUser() {
  return userEvent.setup({ delay: null });
}

export async function completeSession(
  user: ReturnType<typeof userEvent.setup>,
  ratings: RecallRating[],
) {
  for (const rating of ratings) {
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(
      screen.getByRole("button", { name: RATING_BUTTON_NAMES[rating] }),
    );
  }
}
