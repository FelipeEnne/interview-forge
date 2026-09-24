import type { CategoryDefinition } from "./category-types";
import type { LocalizedText } from "@/i18n/localized-text";

export type QuizQuestion<CategoryId extends string = string> = {
  id: string;
  category: CategoryId;
  question: LocalizedText;
  options: readonly [
    LocalizedText,
    LocalizedText,
    LocalizedText,
    LocalizedText,
  ];
  correctOption: 0 | 1 | 2 | 3;
};

export type QuizTopicData<CategoryId extends string = string> = {
  id: string;
  displayName: LocalizedText;
  categories: readonly CategoryDefinition<CategoryId>[];
  questions: readonly QuizQuestion<CategoryId>[];
  questionsPerAttempt: number;
  durationMinutes: number;
};
