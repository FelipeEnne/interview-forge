"use client";

import { useSyncExternalStore } from "react";

import { NODEJS_TOPIC } from "@/data/nodejs-questions";
import {
  QUESTION_PROGRESS_STORAGE_KEY,
  readQuestionProgress,
} from "@/domain/local-storage-progress";
import { getStudyProgress } from "@/domain/study-progress";
import { formatStudyQuestionsRemaining } from "@/i18n/translations";
import { useTranslations } from "./LocaleProvider";

import styles from "./NodejsStudyProgress.module.css";

function subscribeToProgress() {
  return () => {};
}

function getStoredProgressSnapshot(): string | null {
  return window.localStorage.getItem(QUESTION_PROGRESS_STORAGE_KEY);
}

function getServerProgressSnapshot(): null {
  return null;
}

export function NodejsStudyProgress() {
  const { locale, t } = useTranslations();
  const storedProgressRaw = useSyncExternalStore(
    subscribeToProgress,
    getStoredProgressSnapshot,
    getServerProgressSnapshot,
  );
  const progress =
    storedProgressRaw === null ? {} : readQuestionProgress();
  const { total, memorized, remaining, percentage } = getStudyProgress(
    NODEJS_TOPIC.questions,
    progress,
  );

  return (
    <section className={styles.progress} aria-labelledby="study-progress-title">
      <h2 id="study-progress-title" className={styles.title}>
        {t("progress")}
      </h2>
      <p className={styles.memorized}>
        {t("studyProgressMemorized", { memorized, total })}
      </p>
      <p className={styles.percentage}>
        <strong>{percentage}%</strong>
      </p>
      <progress
        className={styles.bar}
        max={100}
        value={percentage}
        aria-label={t("progress")}
      />
      <p className={styles.remaining}>
        {formatStudyQuestionsRemaining(locale, remaining)}
      </p>
    </section>
  );
}
