"use client";

import { useTranslations } from "../LocaleProvider";

import styles from "./TopicQuiz.module.css";

type QuizIntroProps = {
  questionsPerAttempt: number;
  durationMinutes: number;
  onStart: () => void;
};

export function QuizIntro({
  questionsPerAttempt,
  durationMinutes,
  onStart,
}: QuizIntroProps) {
  const { t } = useTranslations();

  return (
    <div className={styles.summary}>
      <p className={styles.meta}>
        {t("quizQuestionCount", { count: questionsPerAttempt })}
      </p>
      <p className={styles.meta}>
        {t("quizDuration", { minutes: durationMinutes })}
      </p>
      <button
        type="button"
        className={`${styles.button} ${styles.buttonPrimary}`}
        onClick={onStart}
      >
        {t("startQuiz")}
      </button>
    </div>
  );
}
