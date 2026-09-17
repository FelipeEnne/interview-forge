import Link from "next/link";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>InterviewForge</h1>
      <p className={styles.lead}>
        Practice technical interview questions one topic at a time.
      </p>
      <Link className={styles.link} href="/topics/nodejs">
        Study Node.js questions
      </Link>
    </main>
  );
}
