"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getCategoryLabel } from "@/data/category-label";
import type { CategoryDefinition } from "@/data/category-types";
import type { InterviewQuestion } from "@/data/study-types";
import {
  readQuestionProgress,
  saveQuestionProgress,
} from "@/domain/local-storage-progress";
import { orderQuestionsForStudy } from "@/domain/question-order";
import { recordQuestionProgress } from "@/domain/question-progress";
import {
  countSessionRatings,
  recordSessionRating,
  type RecallRating,
  type SessionRatings,
} from "@/domain/recall-rating";
import {
  createStudyQueue,
  type StudySessionMode,
} from "@/domain/study-session";
import type { LocalizedText } from "@/i18n/localized-text";
import { useTranslations } from "../LocaleProvider";
import { StudyCaughtUpSummary } from "./StudyCaughtUpSummary";
import { StudyQuestionCard } from "./StudyQuestionCard";
import { StudySessionCompleteSummary } from "./StudySessionCompleteSummary";

import styles from "./TopicStudySession.module.css";

type TopicStudySessionProps = {
  topicDisplayName: LocalizedText;
  questions: readonly InterviewQuestion[];
  categories: readonly CategoryDefinition[];
  sessionMode?: StudySessionMode;
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
  topicDisplayName,
  questions,
  categories,
  sessionMode = "due-review",
  category,
  now = currentTime,
  backLink,
}: TopicStudySessionProps) {
  const { t, localize } = useTranslations();
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionQuestions(
      createStudyQueue(questions, progress, sessionMode, now()),
    );
  }, [now, questions, sessionMode]);

  const topicName = localize(topicDisplayName);
  const currentQuestion = sessionQuestions?.[currentIndex];
  const isLastQuestion =
    sessionQuestions !== null && currentIndex >= sessionQuestions.length - 1;
  const showRatings = isAnswerVisible && !isSessionComplete;
  const ratingCounts = countSessionRatings(sessionRatings);
  const categoryLabelFor = (categoryId: string) =>
    getCategoryLabel(categories, categoryId, localize);

  const title = category
    ? t("topicCategoryTitle", {
        topic: topicName,
        category: categoryLabelFor(category),
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
    startSession(createStudyQueue(questions, progress, sessionMode, now()));
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
          <StudySessionCompleteSummary
            ratingCounts={ratingCounts}
            onStudyAgain={handleStudyAgain}
          />
        ) : sessionMode === "due-review" && sessionQuestions.length === 0 ? (
          <StudyCaughtUpSummary onStudyAllQuestions={handleStudyAllQuestions} />
        ) : currentQuestion ? (
          <StudyQuestionCard
            question={currentQuestion}
            categoryLabel={categoryLabelFor(currentQuestion.category)}
            isAnswerVisible={isAnswerVisible}
            showRatings={showRatings}
            onShowAnswer={handleShowAnswer}
            onRate={handleRating}
          />
        ) : null}
      </article>
    </div>
  );
}
