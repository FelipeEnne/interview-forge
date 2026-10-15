"use client";

import {
  RECALL_RATING_OPTIONS,
  type SessionRatingCounts,
} from "@/domain/recall-rating";
import { useTranslations } from "../LocaleProvider";

import styles from "./TopicStudySession.module.css";

type StudySessionCompleteSummaryProps = {
  ratingCounts: SessionRatingCounts;
  onStudyAgain: () => void;
};

export function StudySessionCompleteSummary({
  ratingCounts,
  onStudyAgain,
}: StudySessionCompleteSummaryProps) {
  const { t, ratingLabel, questionsReviewed } = useTranslations();

  return (
    <div className={styles.summary}>
      <p className={styles.sessionComplete}>{t("sessionComplete")}</p>
      <p className={styles.summaryTotal}>
        {questionsReviewed(ratingCounts.total)}
      </p>
      <ul className={styles.summaryCounts}>
        {RECALL_RATING_OPTIONS.map((rating) => (
          <li key={rating}>
            {ratingLabel(rating)}: {ratingCounts[rating]}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={`${styles.button} ${styles.buttonPrimary}`}
        onClick={onStudyAgain}
      >
        {t("studyAgain")}
      </button>
    </div>
  );
}
