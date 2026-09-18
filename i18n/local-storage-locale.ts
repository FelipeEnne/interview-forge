import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, parseLocale, type Locale } from "./locale";

function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

export function readLocale(): Locale {
  const storage = getStorage();
  if (!storage) {
    return DEFAULT_LOCALE;
  }

  return parseLocale(storage.getItem(LOCALE_STORAGE_KEY));
}

export function saveLocale(locale: Locale): void {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  storage.setItem(LOCALE_STORAGE_KEY, locale);
}
