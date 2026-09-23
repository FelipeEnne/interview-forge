"use client";

import type { TopicDefinition } from "@/data/topic-registry";
import { useTranslations } from "@/components/LocaleProvider";
import styles from "./page.module.css";

type TopicComingSoonProps = {
  topic: TopicDefinition;
};

export function TopicComingSoon({ topic }: TopicComingSoonProps) {
  const { t, localize } = useTranslations();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{localize(topic.displayName)}</h1>
      <p>{t("comingSoon")}</p>
    </main>
  );
}
