import type { CategoryDefinition } from "./category-types";
import type { LocalizedText } from "@/i18n/localized-text";

export function getCategoryLabel(
  categories: readonly CategoryDefinition[],
  categoryId: string,
  localize: (value: LocalizedText) => string,
): string {
  const definition = categories.find(({ id }) => id === categoryId);

  return definition ? localize(definition.displayName) : categoryId;
}
