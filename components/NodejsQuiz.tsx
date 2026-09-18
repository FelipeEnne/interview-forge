"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { QuestionCategory } from "@/data/nodejs-questions";
import type { QuizQuestion } from "@/data/nodejs-quiz-questions";
import {
  readQuizPerformance,
  saveQuizPerformance,
} from "@/domain/local-storage-quiz-performance";
import {
  calculateQuizResult,
  QUIZ_DURATION_MS,
  QUIZ_QUESTION_COUNT,
  selectQuizQuestions,
  type QuizAnswers,
  type QuizResult,
} from "@/domain/quiz";
import { recordQuizPerformance } from "@/domain/quiz-performance";
import { useTranslations } from "./LocaleProvider";

import styles from "./NodejsQuiz.module.css";

type QuizPhase = "intro" | "active" | "result";

type NodejsQuizProps = {
  questions: readonly QuizQuestion[];
  randomSource?: () => number;
  now?: () => number;
  backLink: {
    href: string;
  };
  topicName: string;
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function remainingSecondsFrom(deadline: number, now: number) {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}

export function NodejsQuiz({
  questions,
  randomSource,
  now = Date.now,
  backLink,
  topicName,
}: NodejsQuizProps) {
  const { t, localize, categoryLabel } = useTranslations();
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [attemptQuestions, setAttemptQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [deadline, setDeadline] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(
    QUIZ_DURATION_MS / 1000,
  );
  const [result, setResult] = useState<QuizResult | null>(null);
  const isAttemptRecorded = useRef(false);

  const finishAttempt = useCallback(() => {
    if (isAttemptRecorded.current) {
      return;
    }

    isAttemptRecorded.current = true;
    const completedResult = calculateQuizResult(attemptQuestions, answers);
    const performance = recordQuizPerformance(
      readQuizPerformance(),
      completedResult.byCategory,
    );

    saveQuizPerformance(performance);
    setResult(completedResult);
    setPhase("result");
  }, [answers, attemptQuestions]);

  useEffect(() => {
    if (phase !== "active" || deadline === null) {
      return;
    }

    const updateRemaining = () => {
      const remaining = remainingSecondsFrom(deadline, now());
      setRemainingSeconds(remaining);

      if (remaining === 0) {
        finishAttempt();
      }

      return remaining;
    };

    updateRemaining();

    const intervalId = window.setInterval(() => {
      if (updateRemaining() === 0) {
        window.clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [phase, deadline, finishAttempt, now]);

  const currentQuestion = attemptQuestions[currentIndex];
  const isLastQuestion = currentIndex === attemptQuestions.length - 1;
  const hasCurrentAnswer =
    currentQuestion !== undefined && answers[currentQuestion.id] !== undefined;
  function startAttempt() {
    isAttemptRecorded.current = false;
    setAttemptQuestions(
      selectQuizQuestions(questions, QUIZ_QUESTION_COUNT, randomSource),
    );
    setCurrentIndex(0);
    setAnswers({});
    setDeadline(now() + QUIZ_DURATION_MS);
    setRemainingSeconds(QUIZ_DURATION_MS / 1000);
    setResult(null);
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
      finishAttempt();
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  return (
    <div className={styles.container}>
      <Link className={styles.backLink} href={backLink.href}>
        {t("backToTopic", { topic: topicName })}
      </Link>
      <h1 className={styles.title}>{t("quizTitle")}</h1>
      <article className={styles.card} aria-live="polite">
        {phase === "intro" ? (
          <div className={styles.summary}>
            <p className={styles.meta}>
              {t("quizQuestionCount", { count: QUIZ_QUESTION_COUNT })}
            </p>
            <p className={styles.meta}>
              {t("quizDuration", { minutes: QUIZ_DURATION_MS / 60000 })}
            </p>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={startAttempt}
            >
              {t("startQuiz")}
            </button>
          </div>
        ) : null}
        {phase === "active" && currentQuestion ? (
          <>
            <p className={styles.timer}>
              {t("timeRemaining", { time: formatTime(remainingSeconds) })}
            </p>
            <p className={styles.progress}>
              {t("questionProgress", {
                current: currentIndex + 1,
                total: attemptQuestions.length,
              })}
            </p>
            <p className={styles.question}>
              {localize(currentQuestion.question)}
            </p>
            <fieldset className={styles.options}>
              <legend className={styles.legend}>{t("chooseAnswer")}</legend>
              {currentQuestion.options.map((option, optionIndex) => (
                <label
                  key={`${currentQuestion.id}-${optionIndex}`}
                  className={styles.option}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    checked={answers[currentQuestion.id] === optionIndex}
                    onChange={() => handleSelectOption(optionIndex)}
                  />
                  {localize(option)}
                </label>
              ))}
            </fieldset>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={handleAdvance}
              disabled={!hasCurrentAnswer}
            >
              {isLastQuestion ? t("finishQuiz") : t("next")}
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
                    {categoryLabel(category as QuestionCategory)}:{" "}
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
              {t("tryAgain")}
            </button>
          </div>
        ) : null}
      </article>
    </div>
  );
}
