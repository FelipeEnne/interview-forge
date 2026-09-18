"use client";

import Link from "next/link";

import { LanguageSelector } from "./LanguageSelector";
import { useTranslations } from "./LocaleProvider";
import styles from "./AppHeader.module.css";

export function AppHeader() {
  const { t } = useTranslations();

  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/">
        {t("appName")}
      </Link>
      <LanguageSelector />
    </header>
  );
}
