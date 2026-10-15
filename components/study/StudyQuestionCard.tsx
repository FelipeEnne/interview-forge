"use client";

import type { InterviewQuestion } from "@/data/study-types";
import {
  RECALL_RATING_OPTIONS,
  type RecallRating,
} from "@/domain/recall-rating";
import { useTranslations } from "../LocaleProvider";

import styles from "./TopicStudySession.module.css";

type StudyQuestionCardProps = {
  question: InterviewQuestion;
  categoryLabel: string;
  isAnswerVisible: boolean;
  showRatings: boolean;
  onShowAnswer: () => void;
  onRate: (rating: RecallRating) => void;
};

export function StudyQuestionCard({
  question,
  categoryLabel,
  isAnswerVisible,
  showRatings,
  onShowAnswer,
  onRate,
}: StudyQuestionCardProps) {
  const { t, localize, ratingLabel } = useTranslations();

  return (
    <>
      <p className={styles.category}>{categoryLabel}</p>
      <p className={styles.question}>{localize(question.question)}</p>
      {isAnswerVisible ? (
        <p className={styles.answer}>{localize(question.answer)}</p>
      ) : null}
      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonPrimary}`}
          onClick={onShowAnswer}
          disabled={isAnswerVisible}
        >
          {t("showAnswer")}
        </button>
        {showRatings ? (
          <div className={styles.ratings}>
            {RECALL_RATING_OPTIONS.map((rating) => (
              <button
                key={rating}
                type="button"
                className={styles.button}
                onClick={() => onRate(rating)}
              >
                {ratingLabel(rating)}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
