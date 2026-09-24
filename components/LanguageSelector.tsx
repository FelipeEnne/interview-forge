"use client";

import { LOCALES } from "@/i18n/locale";
import { useLocale, useTranslations } from "./LocaleProvider";
import styles from "./LanguageSelector.module.css";

export function LanguageSelector() {
  const { locale, setLocale } = useLocale();
  const { t } = useTranslations();

  return (
    <div
      className={styles.group}
      role="group"
      aria-label={t("languageSelector")}
    >
      {LOCALES.map((option, index) => (
        <span key={option} className={styles.option}>
          {index > 0 ? (
            <span className={styles.separator} aria-hidden="true">
              |
            </span>
          ) : null}
          <button
            type="button"
            className={styles.button}
            aria-pressed={locale === option}
            onClick={() => setLocale(option)}
          >
            {option.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
