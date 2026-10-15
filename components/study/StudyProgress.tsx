"use client";

import {
  QUESTION_PROGRESS_STORAGE_KEY,
  readQuestionProgress,
} from "@/domain/local-storage-progress";
import { getStudyProgress } from "@/domain/study-progress";
import { PERCENTAGE_MAX } from "@/domain/percentage";
import { formatStudyQuestionsRemaining } from "@/i18n/translations";
import { useLocalStorageSnapshot } from "@/browser/use-local-storage-snapshot";
import { useTranslations } from "../LocaleProvider";

import styles from "./StudyProgress.module.css";

type RatingRowProps = {
  label: string;
  count: number;
};

function RatingRow({ label, count }: RatingRowProps) {
  return (
    <li className={styles.ratingRow}>
      <span>{label}</span>
      <span>{count}</span>
    </li>
  );
}

type StudyProgressProps = {
  questions: readonly { id: string }[];
};

export function StudyProgress({ questions }: StudyProgressProps) {
  const { locale, t, ratingLabel } = useTranslations();
  const storedProgressRaw = useLocalStorageSnapshot(
    QUESTION_PROGRESS_STORAGE_KEY,
  );
  const progress = storedProgressRaw === null ? {} : readQuestionProgress();
  const { total, memorized, remaining, percentage, ratings } = getStudyProgress(
    questions,
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
        max={PERCENTAGE_MAX}
        value={percentage}
        aria-label={t("progress")}
      />
      <p className={styles.remaining}>
        {formatStudyQuestionsRemaining(locale, remaining)}
      </p>

      <div className={styles.breakdown}>
        <section aria-labelledby="study-progress-needs-attention">
          <h3 id="study-progress-needs-attention" className={styles.groupTitle}>
            {t("studyProgressNeedsAttention")}
          </h3>
          <ul className={styles.ratingList}>
            <RatingRow label={ratingLabel("again")} count={ratings.again} />
            <RatingRow label={ratingLabel("hard")} count={ratings.hard} />
            <RatingRow
              label={t("studyProgressUnreviewed")}
              count={ratings.unreviewed}
            />
          </ul>
        </section>

        <section aria-labelledby="study-progress-memorized-group">
          <h3 id="study-progress-memorized-group" className={styles.groupTitle}>
            {t("studyProgressMemorizedGroup")}
          </h3>
          <ul className={styles.ratingList}>
            <RatingRow label={ratingLabel("good")} count={ratings.good} />
            <RatingRow label={ratingLabel("easy")} count={ratings.easy} />
          </ul>
        </section>
      </div>
    </section>
  );
}
