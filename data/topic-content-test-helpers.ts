import { expect } from "vitest";

import type { LocalizedText } from "@/i18n/localized-text";

const CORRECT_OPTION_LENGTH_RATIO_LIMIT = 1.6;
const CORRECT_OPTION_LENGTH_GAP_LIMIT = 25;

export function expectNonEmptyLocalizedText(value: LocalizedText): void {
  expect(value.en.trim()).not.toBe("");
  expect(value.pt.trim()).not.toBe("");
}

export function isCorrectOptionLengthOutlier(
  optionTexts: readonly string[],
  correctIndex: number,
): boolean {
  const correctLength = optionTexts[correctIndex]?.trim().length ?? 0;
  const longestDistractor = optionTexts.reduce((longest, text, index) => {
    if (index === correctIndex) {
      return longest;
    }

    return Math.max(longest, text.trim().length);
  }, 0);

  return (
    correctLength > longestDistractor * CORRECT_OPTION_LENGTH_RATIO_LIMIT &&
    correctLength - longestDistractor >= CORRECT_OPTION_LENGTH_GAP_LIMIT
  );
}
