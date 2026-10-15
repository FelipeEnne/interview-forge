"use client";

import Link from "next/link";

import { getCategoryLabel } from "@/data/category-label";
import type { ChallengeTopicData } from "@/data/challenge-types";
import { useTranslations } from "../LocaleProvider";
import styles from "./ChallengesList.module.css";

type ChallengesListProps = { topic: ChallengeTopicData };

export function ChallengesList({ topic }: ChallengesListProps) {
  const { t, localize } = useTranslations();

  return (
    <main className={styles.container}>
      <Link className={styles.backLink} href={`/topics/${topic.id}`}>
        {t("backToTopic", { topic: localize(topic.displayName) })}
      </Link>
      <h1 className={styles.title}>
        {t("challengesTitle", { topic: localize(topic.displayName) })}
      </h1>
      <ul className={styles.list}>
        {topic.challenges.map((challenge) => (
          <li key={challenge.id} className={styles.item}>
            <Link
              className={styles.link}
              href={`/topics/${topic.id}/challenges/${challenge.id}`}
            >
              {localize(challenge.title)}
            </Link>
            <p className={styles.category}>
              {getCategoryLabel(topic.categories, challenge.category, localize)}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
