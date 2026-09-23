"use client";

import Link from "next/link";

import { NodejsCategoryPerformance } from "@/components/NodejsCategoryPerformance";
import { StudyProgress } from "@/components/StudyProgress";
import { useTranslations } from "@/components/LocaleProvider";
import type { StudyTopicData } from "@/data/study-types";
import styles from "./page.module.css";

type TopicOverviewProps = {
  topic: StudyTopicData;
};

export function TopicOverview({ topic }: TopicOverviewProps) {
  const { t, localize } = useTranslations();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{localize(topic.displayName)}</h1>
      <StudyProgress questions={topic.questions} />
      <Link
        className={`${styles.link} ${styles.primaryLink}`}
        href={`/topics/${topic.id}/study`}
      >
        {t("studyDueQuestions")}
      </Link>
      <Link
        className={styles.link}
        href={`/topics/${topic.id}/quiz`}
      >
        {t("takeProficiencyQuiz")}
      </Link>
      <Link
        className={styles.link}
        href={`/topics/${topic.id}/challenges`}
      >
        {t("practiceCodingChallenges")}
      </Link>
      <section className={styles.categories} aria-labelledby="categories-title">
        <h2 id="categories-title" className={styles.subtitle}>
          {t("categories")}
        </h2>
        <ul className={styles.categoryList}>
          {topic.categories.map((category) => (
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
      <NodejsCategoryPerformance />
    </main>
  );
}
