"use client";

import type { QuizQuestion } from "@/data/quiz-types";
import { formatQuizTime } from "@/domain/quiz-timer";
import { useTranslations } from "../LocaleProvider";

import styles from "./TopicQuiz.module.css";

type QuizActiveQuestionProps = {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  remainingSeconds: number;
  selectedOption: number | undefined;
  isLastQuestion: boolean;
  onSelectOption: (optionIndex: number) => void;
  onAdvance: () => void;
};

export function QuizActiveQuestion({
  question,
  currentIndex,
  totalQuestions,
  remainingSeconds,
  selectedOption,
  isLastQuestion,
  onSelectOption,
  onAdvance,
}: QuizActiveQuestionProps) {
  const { t, localize } = useTranslations();
  const hasAnswer = selectedOption !== undefined;

  return (
    <>
      <p className={styles.timer}>
        {t("timeRemaining", { time: formatQuizTime(remainingSeconds) })}
      </p>
      <p className={styles.progress}>
        {t("questionProgress", {
          current: currentIndex + 1,
          total: totalQuestions,
        })}
      </p>
      <p className={styles.question}>{localize(question.question)}</p>
      <fieldset className={styles.options}>
        <legend className={styles.legend}>{t("chooseAnswer")}</legend>
        {question.options.map((option, optionIndex) => (
          <label
            key={`${question.id}-${optionIndex}`}
            className={styles.option}
          >
            <input
              type="radio"
              name={question.id}
              checked={selectedOption === optionIndex}
              onChange={() => onSelectOption(optionIndex)}
            />
            {localize(option)}
          </label>
        ))}
      </fieldset>
      <button
        type="button"
        className={`${styles.button} ${styles.buttonPrimary}`}
        onClick={onAdvance}
        disabled={!hasAnswer}
      >
        {isLastQuestion ? t("finishQuiz") : t("next")}
      </button>
    </>
  );
}
