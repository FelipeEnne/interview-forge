"use client";

import { useState } from "react";

import { useTranslations } from "../LocaleProvider";
import styles from "./RevealSolution.module.css";

type RevealSolutionProps = {
  code: string;
};

export function RevealSolution({ code }: RevealSolutionProps) {
  const { t } = useTranslations();
  const [isSolutionVisible, setIsSolutionVisible] = useState(false);

  if (isSolutionVisible) {
    return (
      <section aria-labelledby="reference-solution-title">
        <h2 id="reference-solution-title" className={styles.sectionTitle}>
          {t("referenceSolution")}
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
      {t("revealSolution")}
    </button>
  );
}
