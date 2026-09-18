"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { QUESTION_CATEGORY_LABELS } from "@/data/nodejs-questions";
import {
  QUIZ_PERFORMANCE_STORAGE_KEY,
  readQuizPerformance,
} from "@/domain/local-storage-quiz-performance";
import {
  getLowestCategoryPerformance,
  type CategoryPerformance,
} from "@/domain/quiz-performance";

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
        Performance
      </h2>
      <ul className={styles.list}>
        {categories.map(({ category, correct, total, percentage }) => {
          const label = QUESTION_CATEGORY_LABELS[category];

          return (
            <li key={category} className={styles.item}>
              <div>
                <h3 className={styles.category}>{label}</h3>
                <p className={styles.score}>
                  <strong>{percentage}%</strong>
                  <span>
                    {correct} / {total} correct
                  </span>
                </p>
              </div>
              <Link
                className={styles.link}
                href={`/topics/nodejs/categories/${category}`}
              >
                Study {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
