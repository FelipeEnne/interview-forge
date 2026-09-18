"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { NODEJS_TOPIC } from "@/data/nodejs-questions";
import {
  QUIZ_PERFORMANCE_STORAGE_KEY,
  readQuizPerformance,
} from "@/domain/local-storage-quiz-performance";
import {
  getLowestCategoryPerformance,
  type CategoryPerformance,
} from "@/domain/quiz-performance";
import { useTranslations } from "./LocaleProvider";

import styles from "./NodejsCategoryPerformance.module.css";

function subscribeToPerformance() {
  return () => {};
}

function getStoredPerformance() {
  return window.localStorage.getItem(QUIZ_PERFORMANCE_STORAGE_KEY);
}

function getServerPerformance() {
  return null;
}

export function NodejsCategoryPerformance() {
  const { t, categoryLabel } = useTranslations();
  const storedPerformance = useSyncExternalStore(
    subscribeToPerformance,
    getStoredPerformance,
    getServerPerformance,
  );
  const categories: CategoryPerformance[] =
    storedPerformance === null
      ? []
      : getLowestCategoryPerformance(readQuizPerformance());

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className={styles.performance} aria-labelledby="performance-title">
      <h2 id="performance-title" className={styles.title}>
        {t("performance")}
      </h2>
      <ul className={styles.list}>
        {categories.map(({ category, correct, total, percentage }) => {
          const label = categoryLabel(category);

          return (
            <li key={category} className={styles.item}>
              <div>
                <h3 className={styles.category}>{label}</h3>
                <p className={styles.score}>
                  <strong>{percentage}%</strong>
                  <span>
                    {t("correctCount", { correct, total })}
                  </span>
                </p>
              </div>
              <Link
                className={styles.link}
                href={`/topics/${NODEJS_TOPIC.slug}/categories/${category}`}
              >
                {t("studyCategory", { label })}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
