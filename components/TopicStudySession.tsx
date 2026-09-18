"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  QUESTION_CATEGORY_LABELS,
  type InterviewQuestion,
} from "@/data/nodejs-questions";
import {
  readQuestionProgress,
  saveQuestionProgress,
} from "@/domain/local-storage-progress";
import { getDueQuestions } from "@/domain/due-questions";
import { orderQuestionsForStudy } from "@/domain/question-order";
import { recordQuestionProgress } from "@/domain/question-progress";
import {
  countSessionRatings,
  RECALL_RATING_LABELS,
  RECALL_RATING_OPTIONS,
  recordSessionRating,
  type RecallRating,
  type SessionRatings,
} from "@/domain/recall-rating";

import styles from "./TopicStudySession.module.css";

type SessionMode = "due-review" | "practice";

type TopicStudySessionProps = {
  topicName: string;
  questions: InterviewQuestion[];
  sessionMode?: SessionMode;
  backLink?: {
    href: string;
    label: string;
  };
};

export function TopicStudySession({
  topicName,
  questions,
  sessionMode = "due-review",
  backLink,
}: TopicStudySessionProps) {
  const [sessionQuestions, setSessionQuestions] = useState<
    InterviewQuestion[] | null
  >(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [sessionRatings, setSessionRatings] = useState<SessionRatings>({});
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  useEffect(() => {
    // LocalStorage is client-only, so the session queue is initialized after hydration.
    const progress = readQuestionProgress();
    const selectedQuestions =
      sessionMode === "due-review"
        ? getDueQuestions(questions, progress, new Date())
        : questions;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionQuestions(orderQuestionsForStudy(selectedQuestions, progress));
  }, [questions, sessionMode]);

  const currentQuestion = sessionQuestions?.[currentIndex];
  const isLastQuestion =
    sessionQuestions !== null && currentIndex >= sessionQuestions.length - 1;
  const showRatings = isAnswerVisible && !isSessionComplete;
  const ratingCounts = countSessionRatings(sessionRatings);

  function handleShowAnswer() {
    setIsAnswerVisible(true);
  }

  function handleRating(rating: RecallRating) {
    if (!currentQuestion) {
      return;
    }

    const questionId = currentQuestion.id;
    const nextRatings = recordSessionRating(sessionRatings, questionId, rating);
    setSessionRatings(nextRatings);

    const nextProgress = recordQuestionProgress(
      readQuestionProgress(),
      questionId,
      rating,
      new Date(),
    );
    saveQuestionProgress(nextProgress);

    if (isLastQuestion) {
      setIsSessionComplete(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setIsAnswerVisible(false);
  }

  function startSession(nextQuestions: InterviewQuestion[]) {
    setSessionQuestions(nextQuestions);
    setCurrentIndex(0);
    setIsAnswerVisible(false);
    setSessionRatings({});
    setIsSessionComplete(false);
  }

  function handleStudyAgain() {
    const progress = readQuestionProgress();
    const selectedQuestions =
      sessionMode === "due-review"
        ? getDueQuestions(questions, progress, new Date())
        : questions;

    startSession(orderQuestionsForStudy(selectedQuestions, progress));
  }

  function handleStudyAllQuestions() {
    const progress = readQuestionProgress();

    startSession(orderQuestionsForStudy(questions, progress));
  }

  return (
    <div className={styles.container}>
      {backLink ? (
        <Link className={styles.backLink} href={backLink.href}>
          {backLink.label}
        </Link>
      ) : null}
      <h1 className={styles.title}>{topicName}</h1>
      <article className={styles.card} aria-live="polite">
        {sessionQuestions === null ? (
          <p className={styles.question}>Preparing study session...</p>
        ) : isSessionComplete ? (
          <div className={styles.summary}>
            <p className={styles.sessionComplete}>Session complete</p>
            <p className={styles.summaryTotal}>
              {ratingCounts.total}{" "}
              {ratingCounts.total === 1 ? "question" : "questions"} reviewed
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
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={handleStudyAgain}
            >
              Study again
            </button>
          </div>
        ) : sessionMode === "due-review" &&
          sessionQuestions.length === 0 ? (
          <div className={styles.summary}>
            <p className={styles.sessionComplete}>You&apos;re all caught up</p>
            <p className={styles.summaryTotal}>
              No questions are due for review right now.
            </p>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={handleStudyAllQuestions}
            >
              Study all questions
            </button>
          </div>
        ) : currentQuestion ? (
          <>
            <p className={styles.category}>
              {QUESTION_CATEGORY_LABELS[currentQuestion.category]}
            </p>
            <p className={styles.question}>{currentQuestion.question}</p>
            {isAnswerVisible ? (
              <p className={styles.answer}>{currentQuestion.answer}</p>
            ) : null}
            <div className={styles.actions}>
              <button
                type="button"
                className={`${styles.button} ${styles.buttonPrimary}`}
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
        ) : null}
      </article>
    </div>
  );
}
