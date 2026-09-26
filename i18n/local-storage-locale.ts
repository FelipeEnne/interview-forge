import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  parseLocale,
  type Locale,
} from "./locale";
import { getLocalStorage } from "@/browser/local-storage";

export function readLocale(): Locale {
  const storage = getLocalStorage();
  if (!storage) {
    return DEFAULT_LOCALE;
  }

  return parseLocale(storage.getItem(LOCALE_STORAGE_KEY));
}

export function saveLocale(locale: Locale): void {
  const storage = getLocalStorage();
  if (!storage) {
    return;
  }

  storage.setItem(LOCALE_STORAGE_KEY, locale);
}
