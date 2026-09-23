import type { CategoryDefinition } from "./category-types";
import type { LocalizedText } from "@/i18n/localized-text";

export type CodingChallenge<CategoryId extends string = string> = {
  id: string;
  title: LocalizedText;
  category: CategoryId;
  prompt: LocalizedText;
  requirements: readonly LocalizedText[];
  starterCode: string;
  referenceSolution: string;
  reviewChecklist: readonly LocalizedText[];
};

export type ChallengeTopicData<CategoryId extends string = string> = {
  id: string;
  displayName: LocalizedText;
  categories: readonly CategoryDefinition<CategoryId>[];
  challenges: readonly CodingChallenge<CategoryId>[];
};
