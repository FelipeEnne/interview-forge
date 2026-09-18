"use client";

import Link from "next/link";

import { NODEJS_TOPIC } from "@/data/nodejs-questions";
import { useTranslations } from "@/components/LocaleProvider";
import styles from "./page.module.css";

export function HomePage() {
  const { t } = useTranslations();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{t("appName")}</h1>
      <p className={styles.lead}>{t("homeTagline")}</p>
      <Link className={styles.link} href={`/topics/${NODEJS_TOPIC.slug}`}>
        {t("studyNodejsQuestions")}
      </Link>
    </main>
  );
}
