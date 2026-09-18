"use client";

import { useState } from "react";

import type { InterviewQuestion } from "@/data/nodejs-questions";
import {
  countSessionRatings,
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
};

export function TopicStudySession({
  topicName,
  questions,
}: TopicStudySessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [sessionRatings, setSessionRatings] = useState<SessionRatings>({});
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;
  const showRatings = isAnswerVisible && !isSessionComplete;
  const ratingCounts = countSessionRatings(sessionRatings);

  function handleShowAnswer() {
    setIsAnswerVisible(true);
  }

  function handleRating(rating: RecallRating) {
    const questionId = currentQuestion.id;
    const nextRatings = recordSessionRating(sessionRatings, questionId, rating);
    setSessionRatings(nextRatings);

    if (isLastQuestion) {
      setIsSessionComplete(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setIsAnswerVisible(false);
  }

  function handleStudyAgain() {
    setCurrentIndex(0);
    setIsAnswerVisible(false);
    setSessionRatings({});
    setIsSessionComplete(false);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{topicName}</h1>
      <article className={styles.card} aria-live="polite">
        {isSessionComplete ? (
          <div className={styles.summary}>
            <p className={styles.sessionComplete}>Session complete</p>
            <p className={styles.summaryTotal}>
              {ratingCounts.total} questions reviewed
            </p>
            <ul className={styles.summaryCounts}>
              {RECALL_RATING_OPTIONS.map((rating) => (
                <li key={rating}>
                  {RECALL_RATING_LABELS[rating]}: {ratingCounts[rating]}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={styles.buttonPrimary}
              onClick={handleStudyAgain}
            >
              Study again
            </button>
          </div>
        ) : (
          <>
            <p className={styles.question}>{currentQuestion.question}</p>
            {isAnswerVisible ? (
              <p className={styles.answer}>{currentQuestion.answer}</p>
            ) : null}
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.buttonPrimary}
                onClick={handleShowAnswer}
                disabled={isAnswerVisible}
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
          </>
        )}
      </article>
    </div>
  );
}
