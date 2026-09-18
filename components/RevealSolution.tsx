"use client";

import { useState } from "react";

import styles from "./RevealSolution.module.css";

type RevealSolutionProps = {
  code: string;
};

export function RevealSolution({ code }: RevealSolutionProps) {
  const [isSolutionVisible, setIsSolutionVisible] = useState(false);

  if (isSolutionVisible) {
    return (
      <section aria-labelledby="reference-solution-title">
        <h2 id="reference-solution-title" className={styles.sectionTitle}>
          Reference solution
        </h2>
        <pre className={styles.code}>
          <code>{code}</code>
        </pre>
      </section>
    );
  }

  return (
    <button
      className={`${styles.button} ${styles.buttonPrimary}`}
      type="button"
      onClick={() => setIsSolutionVisible(true)}
    >
      Reveal solution
    </button>
  );
}
