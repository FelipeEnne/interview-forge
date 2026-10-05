"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { QuizTopicData } from "@/data/quiz-types";
import {
  readQuizPerformance,
  saveQuizPerformance,
} from "@/domain/local-storage-quiz-performance";
import {
  calculateQuizResult,
  selectQuizQuestions,
  type QuizAnswers,
  type QuizResult,
} from "@/domain/quiz";
import { recordQuizPerformance } from "@/domain/quiz-performance";
import {
  getRemainingQuizSeconds,
  minutesToMilliseconds,
  minutesToSeconds,
  QUIZ_TIMER_TICK_MILLISECONDS,
} from "@/domain/quiz-timer";
import { useTranslations } from "../LocaleProvider";
import { QuizActiveQuestion } from "./QuizActiveQuestion";
import { QuizIntro } from "./QuizIntro";
import { QuizResultSummary } from "./QuizResultSummary";

import styles from "./TopicQuiz.module.css";

type QuizPhase = "intro" | "active" | "result";

type TopicQuizProps = {
  topic: QuizTopicData;
  randomSource?: () => number;
  now?: () => number;
};

export function TopicQuiz({
  topic,
  randomSource,
  now = Date.now,
}: TopicQuizProps) {
  const { t, localize } = useTranslations();
  const durationMs = minutesToMilliseconds(topic.durationMinutes);
  const durationSeconds = minutesToSeconds(topic.durationMinutes);
  const categoryIds = useMemo(
    () => topic.categories.map(({ id }) => id),
    [topic.categories],
  );
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [attemptQuestions, setAttemptQuestions] = useState<
    typeof topic.questions
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [deadline, setDeadline] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);
  const [result, setResult] = useState<QuizResult | null>(null);
  const isAttemptRecorded = useRef(false);

  const finishAttempt = useCallback(() => {
    if (isAttemptRecorded.current) {
      return;
    }

    isAttemptRecorded.current = true;
    const completedResult = calculateQuizResult(attemptQuestions, answers);
    const performance = recordQuizPerformance(
      readQuizPerformance(topic.id, categoryIds),
      completedResult.byCategory,
    );

    saveQuizPerformance(topic.id, performance);
    setResult(completedResult);
    setPhase("result");
  }, [answers, attemptQuestions, categoryIds, topic.id]);

  useEffect(() => {
    if (phase !== "active" || deadline === null) {
      return;
    }

    const updateRemaining = () => {
      const remaining = getRemainingQuizSeconds(deadline, now());
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
    }, QUIZ_TIMER_TICK_MILLISECONDS);

    return () => window.clearInterval(intervalId);
  }, [phase, deadline, finishAttempt, now]);

  const currentQuestion = attemptQuestions[currentIndex];
  const isLastQuestion = currentIndex === attemptQuestions.length - 1;
  const hasCurrentAnswer =
    currentQuestion !== undefined && answers[currentQuestion.id] !== undefined;

  function startAttempt() {
    isAttemptRecorded.current = false;
    setAttemptQuestions(
      selectQuizQuestions(
        topic.questions,
        topic.questionsPerAttempt,
        randomSource,
      ),
    );
    setCurrentIndex(0);
    setAnswers({});
    setDeadline(now() + durationMs);
    setRemainingSeconds(durationSeconds);
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
      <Link className={styles.backLink} href={`/topics/${topic.id}`}>
        {t("backToTopic", { topic: localize(topic.displayName) })}
      </Link>
      <h1 className={styles.title}>
        {t("quizTitle", { topic: localize(topic.displayName) })}
      </h1>
      <article className={styles.card} aria-live="polite">
        {phase === "intro" ? (
          <QuizIntro
            questionsPerAttempt={topic.questionsPerAttempt}
            durationMinutes={topic.durationMinutes}
            onStart={startAttempt}
          />
        ) : null}
        {phase === "active" && currentQuestion ? (
          <QuizActiveQuestion
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={attemptQuestions.length}
            remainingSeconds={remainingSeconds}
            selectedOption={answers[currentQuestion.id]}
            isLastQuestion={isLastQuestion}
            onSelectOption={handleSelectOption}
            onAdvance={handleAdvance}
          />
        ) : null}
        {phase === "result" && result ? (
          <QuizResultSummary
            result={result}
            categories={topic.categories}
            onTryAgain={startAttempt}
          />
        ) : null}
      </article>
    </div>
  );
}
