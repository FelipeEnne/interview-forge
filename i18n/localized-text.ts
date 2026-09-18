import type { Locale } from "./locale";

export type LocalizedText = Readonly<Record<Locale, string>>;

export type LocalizedTextSource = {
  en: string;
  pt?: string;
};

export function getLocalizedText(
  value: LocalizedTextSource,
  locale: Locale,
): string {
  return value[locale] ?? value.en;
}
