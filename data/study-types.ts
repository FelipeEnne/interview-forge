import type { LocalizedText } from "@/i18n/localized-text";

export type StudyCategoryDefinition<CategoryId extends string = string> = {
  id: CategoryId;
  displayName: LocalizedText;
};

export type InterviewQuestion<CategoryId extends string = string> = {
  id: string;
  category: CategoryId;
  question: LocalizedText;
  answer: LocalizedText;
};

export type StudyTopicData<CategoryId extends string = string> = {
  id: string;
  displayName: LocalizedText;
  categories: readonly StudyCategoryDefinition<CategoryId>[];
  questions: readonly InterviewQuestion<CategoryId>[];
};
