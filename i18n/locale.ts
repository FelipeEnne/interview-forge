export type Locale = "en" | "pt";

export const LOCALES = ["en", "pt"] as const;

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_STORAGE_KEY = "interview-forge:locale";

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "pt";
}

export function parseLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
