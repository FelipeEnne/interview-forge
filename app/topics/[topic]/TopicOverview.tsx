"use client";

import Link from "next/link";
import { useCallback, useSyncExternalStore } from "react";

import { CategoryPerformance } from "@/components/quiz/CategoryPerformance";
import { StudyProgress } from "@/components/study/StudyProgress";
import type { ChallengeTopicData } from "@/data/challenge-types";
import type { QuizTopicData } from "@/data/quiz-types";
import type { StudyTopicData } from "@/data/study-types";
import type { TopicDefinition } from "@/data/topic-registry";
import {
  getQuizPerformanceStorageKey,
  readQuizPerformance,
} from "@/domain/local-storage-quiz-performance";
import { useTranslations } from "@/components/LocaleProvider";
import styles from "./page.module.css";

type TopicOverviewProps = {
  topic: TopicDefinition;
  studyTopic?: StudyTopicData;
  quizTopic?: QuizTopicData;
  challengeTopic?: ChallengeTopicData;
};

function subscribeToPerformance() {
  return () => {};
}

function TopicQuizPerformance({
  topic,
  hasStudy,
}: {
  topic: QuizTopicData;
  hasStudy: boolean;
}) {
  const getSnapshot = useCallback(
    () => window.localStorage.getItem(getQuizPerformanceStorageKey(topic.id)),
    [topic.id],
  );
  const storedPerformance = useSyncExternalStore(
    subscribeToPerformance,
    getSnapshot,
    () => null,
  );
  const performance =
    storedPerformance === null
      ? {}
      : readQuizPerformance(
          topic.id,
          topic.categories.map(({ id }) => id),
        );

  return (
    <CategoryPerformance
      performance={performance}
      categories={topic.categories}
      studyCategoryBasePath={
        hasStudy ? `/topics/${topic.id}/categories` : undefined
      }
    />
  );
}

export function TopicOverview({
  topic,
  studyTopic,
  quizTopic,
  challengeTopic,
}: TopicOverviewProps) {
  const { t, localize } = useTranslations();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{localize(topic.displayName)}</h1>
      {studyTopic ? <StudyProgress questions={studyTopic.questions} /> : null}
      {studyTopic ? (
        <>
          <Link
            className={`${styles.link} ${styles.primaryLink}`}
            href={`/topics/${topic.id}/study`}
          >
            {t("studyDueQuestions")}
          </Link>
          <section
            className={styles.categories}
            aria-labelledby="categories-title"
          >
            <h2 id="categories-title" className={styles.subtitle}>
              {t("categories")}
            </h2>
            <ul className={styles.categoryList}>
              {studyTopic.categories.map((category) => (
                <li key={category.id}>
                  <Link
                    className={styles.link}
                    href={`/topics/${topic.id}/categories/${category.id}`}
                  >
                    {localize(category.displayName)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : null}
      {quizTopic ? (
        <Link className={styles.link} href={`/topics/${topic.id}/quiz`}>
          {t("takeProficiencyQuiz")}
        </Link>
      ) : null}
      {challengeTopic ? (
        <Link className={styles.link} href={`/topics/${topic.id}/challenges`}>
          {t("practiceCodingChallenges")}
        </Link>
      ) : null}
      {quizTopic ? (
        <TopicQuizPerformance
          topic={quizTopic}
          hasStudy={studyTopic !== undefined}
        />
      ) : null}
    </main>
  );
}
