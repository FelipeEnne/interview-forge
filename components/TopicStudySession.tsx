"use client";

import { useState } from "react";

import type { InterviewQuestion } from "@/data/nodejs-questions";
import {
  RECALL_RATING_LABELS,
  RECALL_RATING_OPTIONS,
  recordSessionRating,
  type RecallRating,
  type SessionRatings,
} from "@/domain/recall-rating";

import styles from "./TopicStudySession.module.css";

type TopicStudySessionProps = {
  topicName: string;
  questions: InterviewQuestion[];
  onRatingRecorded?: (questionId: string, rating: RecallRating) => void;
};

export function TopicStudySession({
  topicName,
  questions,
  onRatingRecorded,
}: TopicStudySessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [sessionRatings, setSessionRatings] = useState<SessionRatings>({});
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;
  const showRatings = isAnswerVisible && !isSessionComplete;

  function handleShowAnswer() {
    setIsAnswerVisible(true);
  }

  function handleRating(rating: RecallRating) {
    const questionId = currentQuestion.id;
    const nextRatings = recordSessionRating(sessionRatings, questionId, rating);
    setSessionRatings(nextRatings);
    onRatingRecorded?.(questionId, rating);

    if (isLastQuestion) {
      setIsSessionComplete(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setIsAnswerVisible(false);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{topicName}</h1>
      <article className={styles.card} aria-live="polite">
        <p className={styles.question}>{currentQuestion.question}</p>
        {isAnswerVisible ? (
          <p className={styles.answer}>{currentQuestion.answer}</p>
        ) : null}
        {isSessionComplete ? (
          <p className={styles.sessionComplete}>Session complete</p>
        ) : null}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.buttonPrimary}
            onClick={handleShowAnswer}
            disabled={isAnswerVisible || isSessionComplete}
          >
            Show answer
          </button>
          {showRatings ? (
            <div className={styles.ratings}>
              {RECALL_RATING_OPTIONS.map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className={styles.button}
                  onClick={() => handleRating(rating)}
                >
                  {RECALL_RATING_LABELS[rating]}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </div>
  );
}
