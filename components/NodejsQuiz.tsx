"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  QUESTION_CATEGORY_LABELS,
  type QuestionCategory,
} from "@/data/nodejs-questions";
import type { QuizQuestion } from "@/data/nodejs-quiz-questions";
import {
  calculateQuizResult,
  QUIZ_DURATION_MS,
  QUIZ_QUESTION_COUNT,
  selectQuizQuestions,
  type QuizAnswers,
} from "@/domain/quiz";

import styles from "./NodejsQuiz.module.css";

type QuizPhase = "intro" | "active" | "result";

type NodejsQuizProps = {
  questions: readonly QuizQuestion[];
  randomSource?: () => number;
  backLink: {
    href: string;
    label: string;
  };
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function remainingSecondsFrom(deadline: number) {
  return Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
}

export function NodejsQuiz({
  questions,
  randomSource,
  backLink,
}: NodejsQuizProps) {
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [attemptQuestions, setAttemptQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [deadline, setDeadline] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(
    QUIZ_DURATION_MS / 1000,
  );

  useEffect(() => {
    if (phase !== "active" || deadline === null) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const remaining = remainingSecondsFrom(deadline);
      setRemainingSeconds(remaining);

      if (remaining === 0) {
        window.clearInterval(intervalId);
        setPhase("result");
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [phase, deadline]);

  const currentQuestion = attemptQuestions[currentIndex];
  const isLastQuestion = currentIndex === attemptQuestions.length - 1;
  const hasCurrentAnswer =
    currentQuestion !== undefined && answers[currentQuestion.id] !== undefined;
  const result =
    phase === "result"
      ? calculateQuizResult(attemptQuestions, answers)
      : null;

  function startAttempt() {
    setAttemptQuestions(
      selectQuizQuestions(questions, QUIZ_QUESTION_COUNT, randomSource),
    );
    setCurrentIndex(0);
    setAnswers({});
    setDeadline(Date.now() + QUIZ_DURATION_MS);
    setRemainingSeconds(QUIZ_DURATION_MS / 1000);
    setPhase("active");
  }

  function handleSelectOption(optionIndex: number) {
    if (!currentQuestion) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: optionIndex,
    }));
  }

  function handleAdvance() {
    if (!hasCurrentAnswer) {
      return;
    }

    if (isLastQuestion) {
      setPhase("result");
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  return (
    <div className={styles.container}>
      <Link className={styles.backLink} href={backLink.href}>
        {backLink.label}
      </Link>
      <h1 className={styles.title}>Node.js Proficiency Quiz</h1>
      <article className={styles.card} aria-live="polite">
        {phase === "intro" ? (
          <div className={styles.summary}>
            <p className={styles.meta}>10 questions</p>
            <p className={styles.meta}>8 minutes</p>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={startAttempt}
            >
              Start quiz
            </button>
          </div>
        ) : null}
        {phase === "active" && currentQuestion ? (
          <>
            <p className={styles.timer}>
              Time remaining: {formatTime(remainingSeconds)}
            </p>
            <p className={styles.progress}>
              Question {currentIndex + 1} of {attemptQuestions.length}
            </p>
            <p className={styles.question}>{currentQuestion.question}</p>
            <fieldset className={styles.options}>
              <legend className={styles.legend}>Choose an answer</legend>
              {currentQuestion.options.map((option, optionIndex) => (
                <label key={option} className={styles.option}>
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    checked={answers[currentQuestion.id] === optionIndex}
                    onChange={() => handleSelectOption(optionIndex)}
                  />
                  {option}
                </label>
              ))}
            </fieldset>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={handleAdvance}
              disabled={!hasCurrentAnswer}
            >
              {isLastQuestion ? "Finish quiz" : "Next"}
            </button>
          </>
        ) : null}
        {phase === "result" && result ? (
          <div className={styles.summary}>
            <p className={styles.score}>
              {result.correct} / {result.total}
            </p>
            <p className={styles.percentage}>{result.percentage}%</p>
            <ul className={styles.summaryCounts}>
              {Object.entries(result.byCategory).map(([category, score]) =>
                score ? (
                  <li key={category}>
                    {QUESTION_CATEGORY_LABELS[category as QuestionCategory]}:{" "}
                    {score.correct} / {score.total}
                  </li>
                ) : null,
              )}
            </ul>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={startAttempt}
            >
              Try again
            </button>
          </div>
        ) : null}
      </article>
    </div>
  );
}
