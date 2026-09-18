import { describe, expect, it, vi, afterEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { QuizQuestion } from "@/data/nodejs-quiz-questions";
import { QUIZ_DURATION_MS } from "@/domain/quiz";
import { NodejsQuiz } from "@/components/NodejsQuiz";

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
  label: "Back to Node.js",
};

async function startQuiz(user: ReturnType<typeof userEvent.setup>) {
  render(
    <NodejsQuiz
      questions={questions}
      randomSource={stableRandom}
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
  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the intro with duration and question count", () => {
    render(
      <NodejsQuiz
        questions={questions}
        randomSource={stableRandom}
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
    const user = userEvent.setup();

    await startQuiz(user);

    expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
    expect(screen.getByText("q1 prompt")).toBeInTheDocument();
    expect(screen.getByText("Time remaining: 08:00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("advances after a selected answer and Next", async () => {
    const user = userEvent.setup();

    await startQuiz(user);
    await answerAndAdvance(user, "q1 A");

    expect(screen.getByText("Question 2 of 10")).toBeInTheDocument();
    expect(screen.getByText("q2 prompt")).toBeInTheDocument();
  });

  it("finishes on the last question and shows the score", async () => {
    const user = userEvent.setup();

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
  });

  it("ends when the timer reaches zero and counts a selected unanswered advance as answered", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-18T00:00:00.000Z"));

    render(
      <NodejsQuiz
        questions={questions}
        randomSource={stableRandom}
        backLink={backLink}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Start quiz" }));
    fireEvent.click(screen.getByRole("radio", { name: "q1 A" }));

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("Time remaining: 07:59")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(QUIZ_DURATION_MS - 1000);
    });

    expect(screen.getByText("1 / 10")).toBeInTheDocument();
    expect(screen.getByText("10%")).toBeInTheDocument();
  });

  it("starts a new attempt from Try again", async () => {
    const user = userEvent.setup();

    await startQuiz(user);

    for (let index = 1; index <= 9; index += 1) {
      await answerAndAdvance(user, `q${index} A`);
    }

    await answerAndAdvance(user, "q10 A", "Finish quiz");
    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
    expect(screen.getByText("Time remaining: 08:00")).toBeInTheDocument();
    expect(screen.queryByText("10 / 10")).not.toBeInTheDocument();
  });
});
