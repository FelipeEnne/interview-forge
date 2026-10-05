"use client";

import type { CategoryDefinition } from "@/data/category-types";
import type { QuizResult } from "@/domain/quiz";
import { useTranslations } from "../LocaleProvider";

import styles from "./TopicQuiz.module.css";

type QuizResultSummaryProps = {
  result: QuizResult;
  categories: readonly CategoryDefinition[];
  onTryAgain: () => void;
};

export function QuizResultSummary({
  result,
  categories,
  onTryAgain,
}: QuizResultSummaryProps) {
  const { t, localize } = useTranslations();

  return (
    <div className={styles.summary}>
      <p className={styles.score}>
        {result.correct} / {result.total}
      </p>
      <p className={styles.percentage}>{result.percentage}%</p>
      <ul className={styles.summaryCounts}>
        {categories.map((category) => {
          const score = result.byCategory[category.id];
          return score ? (
            <li key={category.id}>
              {localize(category.displayName)}: {score.correct} / {score.total}
            </li>
          ) : null;
        })}
      </ul>
      <button
        type="button"
        className={`${styles.button} ${styles.buttonPrimary}`}
        onClick={onTryAgain}
      >
        {t("tryAgain")}
      </button>
    </div>
  );
}
