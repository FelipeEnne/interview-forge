"use client";

import Link from "next/link";

import { useTranslations } from "@/components/LocaleProvider";
import { TOPICS } from "@/data/topic-registry";
import styles from "./page.module.css";

export function HomePage() {
  const { t, localize } = useTranslations();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{t("technicalInterviewPreparation")}</h1>
      <p className={styles.lead}>{t("homeTagline")}</p>
      <ul className={styles.topicList}>
        {TOPICS.map((topic) => (
          <li className={styles.topic} key={topic.id}>
            <Link className={styles.link} href={`/topics/${topic.id}`}>
              {localize(topic.displayName)}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
