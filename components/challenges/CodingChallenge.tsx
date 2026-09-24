"use client";

import Link from "next/link";

import type { CategoryDefinition } from "@/data/category-types";
import type { CodingChallenge as CodingChallengeData } from "@/data/challenge-types";
import { useTranslations } from "../LocaleProvider";
import { RevealSolution } from "./RevealSolution";
import styles from "./CodingChallenge.module.css";

type CodingChallengeProps = {
  challenge: CodingChallengeData;
  category: CategoryDefinition;
  backLink: { href: string };
};

export function CodingChallenge({
  challenge,
  category,
  backLink,
}: CodingChallengeProps) {
  const { t, localize } = useTranslations();

  return (
    <main className={styles.container}>
      <Link className={styles.backLink} href={backLink.href}>
        {t("backToChallenges")}
      </Link>
      <h1 className={styles.title}>{localize(challenge.title)}</h1>
      <p className={styles.category}>{localize(category.displayName)}</p>
      <p className={styles.prompt}>{localize(challenge.prompt)}</p>
      <section aria-labelledby="requirements-title">
        <h2 id="requirements-title" className={styles.sectionTitle}>
          {t("requirements")}
        </h2>
        <ul className={styles.list}>
          {challenge.requirements.map((requirement, index) => (
            <li key={`${challenge.id}-requirement-${index}`}>
              {localize(requirement)}
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="starter-code-title">
        <h2 id="starter-code-title" className={styles.sectionTitle}>
          {t("starterCode")}
        </h2>
        <pre className={styles.code}>
          <code>{challenge.starterCode}</code>
        </pre>
      </section>
      <section aria-labelledby="review-checklist-title">
        <h2 id="review-checklist-title" className={styles.sectionTitle}>
          {t("reviewChecklist")}
        </h2>
        <ul className={styles.list}>
          {challenge.reviewChecklist.map((item, index) => (
            <li key={`${challenge.id}-checklist-${index}`}>{localize(item)}</li>
          ))}
        </ul>
      </section>
      <RevealSolution code={challenge.referenceSolution} />
    </main>
  );
}
