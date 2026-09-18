"use client";

import Link from "next/link";

import { useTranslations } from "@/components/LocaleProvider";
import { NODEJS_CODING_CHALLENGES } from "@/data/nodejs-coding-challenges";
import { NODEJS_TOPIC } from "@/data/nodejs-questions";
import styles from "./page.module.css";

export function ChallengesList() {
  const { t, categoryLabel } = useTranslations();

  return (
    <main className={styles.container}>
      <Link className={styles.backLink} href={`/topics/${NODEJS_TOPIC.slug}`}>
        {t("backToTopic", { topic: NODEJS_TOPIC.displayName })}
      </Link>
      <h1 className={styles.title}>{t("challengesTitle")}</h1>
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
              {categoryLabel(challenge.category)}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
