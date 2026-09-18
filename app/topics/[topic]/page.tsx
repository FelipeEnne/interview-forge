import Link from "next/link";
import { notFound } from "next/navigation";

import { NodejsCategoryPerformance } from "@/components/NodejsCategoryPerformance";
import {
  NODEJS_TOPIC,
  QUESTION_CATEGORY_LABELS,
} from "@/data/nodejs-questions";
import styles from "./page.module.css";

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;

  if (topic !== NODEJS_TOPIC.slug) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{NODEJS_TOPIC.displayName}</h1>
      <Link
        className={`${styles.link} ${styles.primaryLink}`}
        href={`/topics/${NODEJS_TOPIC.slug}/study`}
      >
        Study due questions
      </Link>
      <Link
        className={styles.link}
        href={`/topics/${NODEJS_TOPIC.slug}/quiz`}
      >
        Take proficiency quiz
      </Link>
      <Link
        className={styles.link}
        href={`/topics/${NODEJS_TOPIC.slug}/challenges`}
      >
        Practice coding challenges
      </Link>
      <section className={styles.categories} aria-labelledby="categories-title">
        <h2 id="categories-title" className={styles.subtitle}>
          Categories
        </h2>
        <ul className={styles.categoryList}>
          {Object.entries(QUESTION_CATEGORY_LABELS).map(([category, label]) => (
            <li key={category}>
              <Link
                className={styles.link}
                href={`/topics/${NODEJS_TOPIC.slug}/categories/${category}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <NodejsCategoryPerformance />
    </main>
  );
}
