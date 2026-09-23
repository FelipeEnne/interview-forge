"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { RecallRating } from "@/domain/recall-rating";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/locale";
import { getLocalizedText, type LocalizedTextSource } from "@/i18n/localized-text";
import { readLocale, saveLocale } from "@/i18n/local-storage-locale";
import {
  formatQuestionsReviewed,
  getRatingLabel,
  translate,
  type MessageKey,
} from "@/i18n/translations";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function applyDocumentLang(locale: Locale) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.lang = locale;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const storedLocale = readLocale();
    // LocalStorage is client-only, so the saved locale is restored after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocaleState(storedLocale);
    applyDocumentLang(storedLocale);
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    saveLocale(nextLocale);
    applyDocumentLang(nextLocale);
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);

  if (context) {
    return context;
  }

  return {
    locale: DEFAULT_LOCALE,
    setLocale: () => {},
  };
}

export function useTranslations() {
  const { locale } = useLocale();

  return {
    locale,
    t: (key: MessageKey, vars?: Record<string, string | number>) =>
      translate(locale, key, vars),
    localize: (value: LocalizedTextSource) => getLocalizedText(value, locale),
    ratingLabel: (rating: RecallRating) => getRatingLabel(locale, rating),
    questionsReviewed: (count: number) =>
      formatQuestionsReviewed(locale, count),
  };
}
