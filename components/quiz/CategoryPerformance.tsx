"use client";

import Link from "next/link";

import type { CategoryDefinition } from "@/data/category-types";
import type { QuizPerformance } from "@/domain/quiz-performance";
import { getLowestCategoryPerformance } from "@/domain/quiz-performance";
import { useTranslations } from "../LocaleProvider";

import styles from "./CategoryPerformance.module.css";

type CategoryPerformanceProps = {
  performance: QuizPerformance;
  categories: readonly CategoryDefinition[];
  studyCategoryBasePath?: string;
};

export function CategoryPerformance({
  performance,
  categories,
  studyCategoryBasePath,
}: CategoryPerformanceProps) {
  const { t, localize } = useTranslations();
  const entries = getLowestCategoryPerformance(
    performance,
    categories.map(({ id }) => id),
  );

  if (entries.length === 0) {
    return null;
  }

  return (
    <section className={styles.performance} aria-labelledby="performance-title">
      <h2 id="performance-title" className={styles.title}>
        {t("performance")}
      </h2>
      <ul className={styles.list}>
        {entries.map(({ category, correct, total, percentage }) => {
          const definition = categories.find(({ id }) => id === category);
          const label = definition
            ? localize(definition.displayName)
            : category;

          return (
            <li key={category} className={styles.item}>
              <div>
                <h3 className={styles.category}>{label}</h3>
                <p className={styles.score}>
                  <strong>{percentage}%</strong>
                  <span>{t("correctCount", { correct, total })}</span>
                </p>
              </div>
              {studyCategoryBasePath ? (
                <Link
                  className={styles.link}
                  href={`${studyCategoryBasePath}/${category}`}
                >
                  {t("studyCategory", { label })}
                </Link>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
