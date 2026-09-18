import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { QuizQuestion } from "@/data/nodejs-quiz-questions";
import {
  QUIZ_PERFORMANCE_STORAGE_KEY,
  readQuizPerformance,
} from "@/domain/local-storage-quiz-performance";
import { QUIZ_DURATION_MS } from "@/domain/quiz";
import { NodejsQuiz } from "@/components/NodejsQuiz";
import { renderWithLocale } from "@/i18n/render-with-locale";

function question(
  overrides: Partial<QuizQuestion> & Pick<QuizQuestion, "id">,
): QuizQuestion {
  return {
    category: "fundamentals",
    question: `${overrides.id} prompt`,
    options: [
      `${overrides.id} A`,
      `${overrides.id} B`,
      `${overrides.id} C`,
      `${overrides.id} D`,
    ],
    correctOption: 0,
    ...overrides,
  };
}

const questions: QuizQuestion[] = [
  question({ id: "q1", category: "async" }),
  question({ id: "q2", category: "async" }),
  question({ id: "q3", category: "modules" }),
  question({ id: "q4", category: "http" }),
  question({ id: "q5", category: "express" }),
  question({ id: "q6", category: "streams" }),
  question({ id: "q7", category: "testing" }),
  question({ id: "q8", category: "security" }),
  question({ id: "q9", category: "fundamentals" }),
  question({ id: "q10", category: "http" }),
];

const stableRandom = () => 0.999;

const backLink = {
  href: "/topics/nodejs",
};

function createUser() {
  return userEvent.setup({ delay: null });
}

async function startQuiz(user: ReturnType<typeof userEvent.setup>) {
  render(
    <NodejsQuiz
      questions={questions}
      randomSource={stableRandom}
      topicName="Node.js"
      backLink={backLink}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Start quiz" }));
}

async function answerAndAdvance(
  user: ReturnType<typeof userEvent.setup>,
  optionLabel: string,
  action = "Next",
) {
  await user.click(screen.getByRole("radio", { name: optionLabel }));
  await user.click(screen.getByRole("button", { name: action }));
}

describe("NodejsQuiz", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("shows the intro with duration and question count", () => {
    render(
      <NodejsQuiz
        questions={questions}
        randomSource={stableRandom}
        topicName="Node.js"
        backLink={backLink}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Node.js Proficiency Quiz" }),
    ).toBeInTheDocument();
    expect(screen.getByText("10 questions")).toBeInTheDocument();
    expect(screen.getByText("8 minutes")).toBeInTheDocument();
    expect(screen.queryByText("Time remaining: 08:00")).not.toBeInTheDocument();
  });

  it("starts the first question and timer after Start quiz", async () => {
    const user = createUser();

    await startQuiz(user);

    expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
    expect(screen.getByText("q1 prompt")).toBeInTheDocument();
    expect(screen.getByText("Time remaining: 08:00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("advances after a selected answer and Next", async () => {
    const user = createUser();

    await startQuiz(user);
    await answerAndAdvance(user, "q1 A");

    expect(screen.getByText("Question 2 of 10")).toBeInTheDocument();
    expect(screen.getByText("q2 prompt")).toBeInTheDocument();
  });

  it("finishes on the last question and shows the score", async () => {
    const user = createUser();
    const storageSpy = vi.spyOn(Storage.prototype, "setItem");

    await startQuiz(user);

    for (let index = 1; index <= 9; index += 1) {
      await answerAndAdvance(user, `q${index} A`);
    }

    await answerAndAdvance(user, "q10 A", "Finish quiz");

    expect(screen.getByText("10 / 10")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("Event Loop & Async: 2 / 2")).toBeInTheDocument();
    expect(screen.getByText("HTTP & APIs: 2 / 2")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to Node.js" }),
    ).toHaveAttribute("href", "/topics/nodejs");
    expect(readQuizPerformance()).toEqual({
      fundamentals: { correct: 1, total: 1 },
      async: { correct: 2, total: 2 },
      http: { correct: 2, total: 2 },
      modules: { correct: 1, total: 1 },
      express: { correct: 1, total: 1 },
      streams: { correct: 1, total: 1 },
      testing: { correct: 1, total: 1 },
      security: { correct: 1, total: 1 },
    });
    expect(storageSpy).toHaveBeenCalledTimes(1);
    expect(storageSpy).toHaveBeenCalledWith(
      QUIZ_PERFORMANCE_STORAGE_KEY,
      expect.any(String),
    );
  });

  it("ends when the timer reaches zero and counts a selected unanswered advance as answered", () => {
    const startedAt = new Date("2026-09-18T00:00:00.000Z").getTime();
    let currentTime = startedAt;
    const storageSpy = vi.spyOn(Storage.prototype, "setItem");

    const quizProps = {
      questions,
      randomSource: stableRandom,
      topicName: "Node.js",
      backLink,
    };

    const { rerender } = render(
      <NodejsQuiz {...quizProps} now={() => currentTime} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Start quiz" }));
    fireEvent.click(screen.getByRole("radio", { name: "q1 A" }));

    currentTime = startedAt + 1000;
    rerender(<NodejsQuiz {...quizProps} now={() => currentTime} />);
    expect(screen.getByText("Time remaining: 07:59")).toBeInTheDocument();

    currentTime = startedAt + QUIZ_DURATION_MS;
    rerender(<NodejsQuiz {...quizProps} now={() => currentTime} />);

    expect(screen.getByText("1 / 10")).toBeInTheDocument();
    expect(screen.getByText("10%")).toBeInTheDocument();
    expect(readQuizPerformance()).toEqual({
      fundamentals: { correct: 0, total: 1 },
      async: { correct: 1, total: 2 },
      modules: { correct: 0, total: 1 },
      http: { correct: 0, total: 2 },
      express: { correct: 0, total: 1 },
      streams: { correct: 0, total: 1 },
      testing: { correct: 0, total: 1 },
      security: { correct: 0, total: 1 },
    });
    expect(storageSpy).toHaveBeenCalledTimes(1);
  });

  it("starts a new attempt from Try again", async () => {
    const user = createUser();
    const storageSpy = vi.spyOn(Storage.prototype, "setItem");

    await startQuiz(user);

    for (let index = 1; index <= 9; index += 1) {
      await answerAndAdvance(user, `q${index} A`);
    }

    await answerAndAdvance(user, "q10 A", "Finish quiz");
    expect(storageSpy).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
    expect(screen.getByText("Time remaining: 08:00")).toBeInTheDocument();
    expect(screen.queryByText("10 / 10")).not.toBeInTheDocument();
    expect(storageSpy).toHaveBeenCalledTimes(1);
  });

  it("translates quiz chrome while keeping question content in English", async () => {
    const user = createUser();

    renderWithLocale(
      <NodejsQuiz
        questions={questions}
        randomSource={stableRandom}
        topicName="Node.js"
        backLink={backLink}
      />,
      "pt",
    );

    expect(
      await screen.findByRole("heading", {
        name: "Quiz de Proficiência em Node.js",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("10 perguntas")).toBeInTheDocument();
    expect(screen.getByText("8 minutos")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Começar quiz" }));

    expect(screen.getByText("q1 prompt")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "q1 A" })).toBeInTheDocument();
    expect(screen.getByText("Pergunta 1 de 10")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Próxima" })).toBeDisabled();
  });
});
