"use client";

import { useState } from "react";

import type { InterviewQuestion } from "@/data/nodejs-questions";

import styles from "./TopicStudySession.module.css";

type TopicStudySessionProps = {
  topicName: string;
  questions: InterviewQuestion[];
};

export function TopicStudySession({
  topicName,
  questions,
}: TopicStudySessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;

  function handleShowAnswer() {
    setIsAnswerVisible(true);
  }

  function handleNextQuestion() {
    if (isLastQuestion) {
      return;
    }
    setCurrentIndex((index) => index + 1);
    setIsAnswerVisible(false);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{topicName}</h1>
      <article className={styles.card} aria-live="polite">
        <p className={styles.question}>{currentQuestion.question}</p>
        {isAnswerVisible ? (
          <p className={styles.answer}>{currentQuestion.answer}</p>
        ) : null}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.buttonPrimary}
            onClick={handleShowAnswer}
            disabled={isAnswerVisible}
          >
            Show answer
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={handleNextQuestion}
            disabled={isLastQuestion}
          >
            Next question
          </button>
        </div>
      </article>
    </div>
  );
}
