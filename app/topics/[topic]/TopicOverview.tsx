"use client";

import Link from "next/link";

import { NodejsCategoryPerformance } from "@/components/NodejsCategoryPerformance";
import { NodejsStudyProgress } from "@/components/NodejsStudyProgress";
import { useTranslations } from "@/components/LocaleProvider";
import {
  NODEJS_TOPIC,
  QUESTION_CATEGORIES,
} from "@/data/nodejs-questions";
import styles from "./page.module.css";

export function TopicOverview() {
  const { t, categoryLabel } = useTranslations();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{NODEJS_TOPIC.displayName}</h1>
      <NodejsStudyProgress />
      <Link
        className={`${styles.link} ${styles.primaryLink}`}
        href={`/topics/${NODEJS_TOPIC.slug}/study`}
      >
        {t("studyDueQuestions")}
      </Link>
      <Link
        className={styles.link}
        href={`/topics/${NODEJS_TOPIC.slug}/quiz`}
      >
        {t("takeProficiencyQuiz")}
      </Link>
      <Link
        className={styles.link}
        href={`/topics/${NODEJS_TOPIC.slug}/challenges`}
      >
        {t("practiceCodingChallenges")}
      </Link>
      <section className={styles.categories} aria-labelledby="categories-title">
        <h2 id="categories-title" className={styles.subtitle}>
          {t("categories")}
        </h2>
        <ul className={styles.categoryList}>
          {QUESTION_CATEGORIES.map((category) => (
            <li key={category}>
              <Link
                className={styles.link}
                href={`/topics/${NODEJS_TOPIC.slug}/categories/${category}`}
              >
                {categoryLabel(category)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <NodejsCategoryPerformance />
    </main>
  );
}
