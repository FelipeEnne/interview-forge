import Link from "next/link";
import { notFound } from "next/navigation";

import { NODEJS_CODING_CHALLENGES } from "@/data/nodejs-coding-challenges";
import {
  NODEJS_TOPIC,
  QUESTION_CATEGORY_LABELS,
} from "@/data/nodejs-questions";
import styles from "./page.module.css";

type TopicChallengesPageProps = {
  params: Promise<{ topic: string }>;
};

export default async function TopicChallengesPage({
  params,
}: TopicChallengesPageProps) {
  const { topic } = await params;

  if (topic !== NODEJS_TOPIC.slug) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <Link className={styles.backLink} href={`/topics/${NODEJS_TOPIC.slug}`}>
        Back to {NODEJS_TOPIC.displayName}
      </Link>
      <h1 className={styles.title}>Node.js Coding Challenges</h1>
      <ul className={styles.list}>
        {NODEJS_CODING_CHALLENGES.map((challenge) => (
          <li key={challenge.id} className={styles.item}>
            <Link
              className={styles.link}
              href={`/topics/${NODEJS_TOPIC.slug}/challenges/${challenge.id}`}
            >
              {challenge.title}
            </Link>
            <p className={styles.category}>
              {QUESTION_CATEGORY_LABELS[challenge.category]}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
