import Link from "next/link";

import type { CodingChallenge } from "@/data/nodejs-coding-challenges";
import { QUESTION_CATEGORY_LABELS } from "@/data/nodejs-questions";
import { RevealSolution } from "./RevealSolution";
import styles from "./NodejsCodingChallenge.module.css";

type NodejsCodingChallengeProps = {
  challenge: CodingChallenge;
  backLink: {
    href: string;
    label: string;
  };
};

export function NodejsCodingChallenge({
  challenge,
  backLink,
}: NodejsCodingChallengeProps) {
  return (
    <main className={styles.container}>
      <Link className={styles.backLink} href={backLink.href}>
        {backLink.label}
      </Link>
      <h1 className={styles.title}>{challenge.title}</h1>
      <p className={styles.category}>
        {QUESTION_CATEGORY_LABELS[challenge.category]}
      </p>
      <p className={styles.prompt}>{challenge.prompt}</p>
      <section aria-labelledby="requirements-title">
        <h2 id="requirements-title" className={styles.sectionTitle}>
          Requirements
        </h2>
        <ul className={styles.list}>
          {challenge.requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="starter-code-title">
        <h2 id="starter-code-title" className={styles.sectionTitle}>
          Starter code
        </h2>
        <pre className={styles.code}>
          <code>{challenge.starterCode}</code>
        </pre>
      </section>
      <section aria-labelledby="review-checklist-title">
        <h2 id="review-checklist-title" className={styles.sectionTitle}>
          Review checklist
        </h2>
        <ul className={styles.list}>
          {challenge.reviewChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <RevealSolution code={challenge.referenceSolution} />
    </main>
  );
}
