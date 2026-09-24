"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { InterviewQuestion } from "@/data/study-types";
import type { CategoryDefinition } from "@/data/category-types";
import {
  readQuestionProgress,
  saveQuestionProgress,
} from "@/domain/local-storage-progress";
import { getDueQuestions } from "@/domain/due-questions";
import { orderQuestionsForStudy } from "@/domain/question-order";
import { recordQuestionProgress } from "@/domain/question-progress";
import {
  countSessionRatings,
  RECALL_RATING_OPTIONS,
  recordSessionRating,
  type RecallRating,
  type SessionRatings,
} from "@/domain/recall-rating";
import { useTranslations } from "../LocaleProvider";

import styles from "./TopicStudySession.module.css";

type SessionMode = "due-review" | "practice";

type TopicStudySessionProps = {
  topicName: string;
  questions: readonly InterviewQuestion[];
  categories: readonly CategoryDefinition[];
  sessionMode?: SessionMode;
  category?: string;
  now?: () => Date;
  backLink?: {
    href: string;
  };
};

function currentTime() {
  return new Date();
}

export function TopicStudySession({
  topicName,
  questions,
  categories,
  sessionMode = "due-review",
  category,
  now = currentTime,
  backLink,
}: TopicStudySessionProps) {
  const { t, localize, ratingLabel, questionsReviewed } = useTranslations();
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
        ? getDueQuestions(questions, progress, now())
        : questions;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionQuestions(orderQuestionsForStudy(selectedQuestions, progress));
  }, [now, questions, sessionMode]);

  const currentQuestion = sessionQuestions?.[currentIndex];
  const isLastQuestion =
    sessionQuestions !== null && currentIndex >= sessionQuestions.length - 1;
  const showRatings = isAnswerVisible && !isSessionComplete;
  const ratingCounts = countSessionRatings(sessionRatings);
  function categoryLabel(categoryId: string): string {
    const definition = categories.find(({ id }) => id === categoryId);

    return definition ? localize(definition.displayName) : categoryId;
  }

  const title = category
    ? t("topicCategoryTitle", {
        topic: topicName,
        category: categoryLabel(category),
      })
    : topicName;

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
      now(),
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
        ? getDueQuestions(questions, progress, now())
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
          {t("backToTopic", { topic: topicName })}
        </Link>
      ) : null}
      <h1 className={styles.title}>{title}</h1>
      <article className={styles.card} aria-live="polite">
        {sessionQuestions === null ? (
          <p className={styles.question}>{t("preparingStudySession")}</p>
        ) : isSessionComplete ? (
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
              onClick={handleStudyAgain}
            >
              {t("studyAgain")}
            </button>
          </div>
        ) : sessionMode === "due-review" && sessionQuestions.length === 0 ? (
          <div className={styles.summary}>
            <p className={styles.sessionComplete}>{t("allCaughtUp")}</p>
            <p className={styles.summaryTotal}>{t("noQuestionsDue")}</p>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={handleStudyAllQuestions}
            >
              {t("studyAllQuestions")}
            </button>
          </div>
        ) : currentQuestion ? (
          <>
            <p className={styles.category}>
              {categoryLabel(currentQuestion.category)}
            </p>
            <p className={styles.question}>
              {localize(currentQuestion.question)}
            </p>
            {isAnswerVisible ? (
              <p className={styles.answer}>
                {localize(currentQuestion.answer)}
              </p>
            ) : null}
            <div className={styles.actions}>
              <button
                type="button"
                className={`${styles.button} ${styles.buttonPrimary}`}
                onClick={handleShowAnswer}
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
                      onClick={() => handleRating(rating)}
                    >
                      {ratingLabel(rating)}
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
