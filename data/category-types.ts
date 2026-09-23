import type { LocalizedText } from "@/i18n/localized-text";

export type CategoryDefinition<CategoryId extends string = string> = {
  id: CategoryId;
  displayName: LocalizedText;
};
