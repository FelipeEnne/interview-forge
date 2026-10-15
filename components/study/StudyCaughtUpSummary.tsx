"use client";

import { useTranslations } from "../LocaleProvider";

import styles from "./TopicStudySession.module.css";

type StudyCaughtUpSummaryProps = {
  onStudyAllQuestions: () => void;
};

export function StudyCaughtUpSummary({
  onStudyAllQuestions,
}: StudyCaughtUpSummaryProps) {
  const { t } = useTranslations();

  return (
    <div className={styles.summary}>
      <p className={styles.sessionComplete}>{t("allCaughtUp")}</p>
      <p className={styles.summaryTotal}>{t("noQuestionsDue")}</p>
      <button
        type="button"
        className={`${styles.button} ${styles.buttonPrimary}`}
        onClick={onStudyAllQuestions}
      >
        {t("studyAllQuestions")}
      </button>
    </div>
  );
}
