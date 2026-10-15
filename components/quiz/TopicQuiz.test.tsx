import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  QUIZ_DURATION_MINUTES,
  QUIZ_QUESTIONS_PER_ATTEMPT,
} from "@/data/quiz-topics";
import type { QuizQuestion, QuizTopicData } from "@/data/quiz-types";
import { readQuizPerformance } from "@/domain/local-storage-quiz-performance";
import { minutesToMilliseconds } from "@/domain/quiz-timer";
import { LanguageSelector } from "@/components/LanguageSelector";
import { LocaleProvider } from "@/components/LocaleProvider";
import { renderWithLocale } from "@/i18n/render-with-locale";
import { TopicQuiz } from "./TopicQuiz";

function question(id: string, category: string): QuizQuestion {
  return {
    id,
    category,
    question: { en: `${id} prompt`, pt: `${id} pergunta` },
    options: [
      { en: `${id} A`, pt: `${id} A PT` },
      { en: `${id} B`, pt: `${id} B PT` },
      { en: `${id} C`, pt: `${id} C PT` },
      { en: `${id} D`, pt: `${id} D PT` },
    ],
    correctOption: 0,
  };
}

const topic: QuizTopicData = {
  id: "react-fixture",
  displayName: { en: "React fixture", pt: "Fixture React" },
  categories: [
    { id: "hooks", displayName: { en: "Hooks", pt: "Hooks" } },
    { id: "state", displayName: { en: "State", pt: "Estado" } },
  ],
  questions: Array.from({ length: QUIZ_QUESTIONS_PER_ATTEMPT }, (_, index) =>
    question(
      `q${index + 1}`,
      index < QUIZ_QUESTIONS_PER_ATTEMPT / 2 ? "hooks" : "state",
    ),
  ),
  questionsPerAttempt: QUIZ_QUESTIONS_PER_ATTEMPT,
  durationMinutes: QUIZ_DURATION_MINUTES,
};

const stableRandom = () => 0.999;

async function startQuiz(user: ReturnType<typeof userEvent.setup>) {
  render(<TopicQuiz topic={topic} randomSource={stableRandom} />);
  await user.click(screen.getByRole("button", { name: "Start quiz" }));
}

describe("TopicQuiz", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("shows topic configuration and starts a generic category fixture", async () => {
    const user = userEvent.setup({ delay: null });
    render(<TopicQuiz topic={topic} randomSource={stableRandom} />);

    expect(
      screen.getByRole("heading", { name: "React fixture Proficiency Quiz" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${QUIZ_QUESTIONS_PER_ATTEMPT} questions`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${QUIZ_DURATION_MINUTES} minutes`),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Start quiz" }));
    expect(
      screen.getByText(`Question 1 of ${QUIZ_QUESTIONS_PER_ATTEMPT}`),
    ).toBeInTheDocument();
    expect(screen.getByText("q1 prompt")).toBeInTheDocument();
    expect(screen.getByText("Time remaining: 08:00")).toBeInTheDocument();
  });

  it("scores, persists once, and displays category results", async () => {
    const user = userEvent.setup({ delay: null });
    const spy = vi.spyOn(Storage.prototype, "setItem");
    await startQuiz(user);
    for (let index = 1; index <= 9; index += 1) {
      await user.click(screen.getByRole("radio", { name: `q${index} A` }));
      await user.click(screen.getByRole("button", { name: "Next" }));
    }
    await user.click(screen.getByRole("radio", { name: "q10 A" }));
    await user.click(screen.getByRole("button", { name: "Finish quiz" }));

    expect(screen.getByText("10 / 10")).toBeInTheDocument();
    expect(screen.getByText("Hooks: 5 / 5")).toBeInTheDocument();
    expect(readQuizPerformance(topic.id, ["hooks", "state"])).toEqual({
      hooks: { correct: 5, total: 5 },
      state: { correct: 5, total: 5 },
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("requires an answer before advancing through a generic attempt", async () => {
    const user = userEvent.setup({ delay: null });
    await startQuiz(user);

    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    await user.click(screen.getByRole("radio", { name: "q1 B" }));
    await user.click(screen.getByRole("button", { name: "Next" }));

    expect(screen.getByText("Question 2 of 10")).toBeInTheDocument();
  });

  it("ends automatically at the deadline and counts selected answers", () => {
    const startedAt = new Date("2026-09-18T00:00:00.000Z").getTime();
    let currentTime = startedAt;
    const { rerender } = render(
      <TopicQuiz
        topic={topic}
        randomSource={stableRandom}
        now={() => currentTime}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Start quiz" }));
    fireEvent.click(screen.getByRole("radio", { name: "q1 A" }));
    currentTime += minutesToMilliseconds(QUIZ_DURATION_MINUTES);
    rerender(
      <TopicQuiz
        topic={topic}
        randomSource={stableRandom}
        now={() => currentTime}
      />,
    );
    expect(
      screen.getByText(`1 / ${QUIZ_QUESTIONS_PER_ATTEMPT}`),
    ).toBeInTheDocument();
  });

  it("starts a fresh attempt from Try again", async () => {
    const user = userEvent.setup({ delay: null });
    await startQuiz(user);
    for (let index = 1; index <= 9; index += 1) {
      await user.click(screen.getByRole("radio", { name: `q${index} A` }));
      await user.click(screen.getByRole("button", { name: "Next" }));
    }
    await user.click(screen.getByRole("radio", { name: "q10 A" }));
    await user.click(screen.getByRole("button", { name: "Finish quiz" }));
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
  });

  it("accumulates persisted performance across Try again attempts", async () => {
    const user = userEvent.setup({ delay: null });
    await startQuiz(user);
    for (let index = 1; index <= 9; index += 1) {
      await user.click(screen.getByRole("radio", { name: `q${index} A` }));
      await user.click(screen.getByRole("button", { name: "Next" }));
    }
    await user.click(screen.getByRole("radio", { name: "q10 A" }));
    await user.click(screen.getByRole("button", { name: "Finish quiz" }));
    await user.click(screen.getByRole("button", { name: "Try again" }));
    for (let index = 1; index <= 9; index += 1) {
      await user.click(screen.getByRole("radio", { name: `q${index} A` }));
      await user.click(screen.getByRole("button", { name: "Next" }));
    }
    await user.click(screen.getByRole("radio", { name: "q10 A" }));
    await user.click(screen.getByRole("button", { name: "Finish quiz" }));

    expect(readQuizPerformance(topic.id, ["hooks", "state"])).toEqual({
      hooks: { correct: 10, total: 10 },
      state: { correct: 10, total: 10 },
    });
  });

  it("persists performance only once when Finish and the deadline overlap", () => {
    const startedAt = new Date("2026-09-18T00:00:00.000Z").getTime();
    let currentTime = startedAt;
    const spy = vi.spyOn(Storage.prototype, "setItem");
    const { rerender } = render(
      <TopicQuiz
        topic={topic}
        randomSource={stableRandom}
        now={() => currentTime}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Start quiz" }));
    for (let index = 1; index <= 9; index += 1) {
      fireEvent.click(screen.getByRole("radio", { name: `q${index} A` }));
      fireEvent.click(screen.getByRole("button", { name: "Next" }));
    }
    fireEvent.click(screen.getByRole("radio", { name: "q10 A" }));
    currentTime += minutesToMilliseconds(QUIZ_DURATION_MINUTES);
    fireEvent.click(screen.getByRole("button", { name: "Finish quiz" }));
    rerender(
      <TopicQuiz
        topic={topic}
        randomSource={stableRandom}
        now={() => currentTime}
      />,
    );

    expect(screen.getByText("10 / 10")).toBeInTheDocument();
    const quizWrites = spy.mock.calls.filter(([key]) =>
      String(key).includes("quiz-attempts"),
    );
    expect(quizWrites).toHaveLength(1);
  });

  it("localizes a generic topic without resetting the current attempt", async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <LocaleProvider>
        <LanguageSelector />
        <TopicQuiz topic={topic} randomSource={stableRandom} />
      </LocaleProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Start quiz" }));
    await user.click(screen.getByRole("radio", { name: "q1 B" }));
    await user.click(screen.getByRole("button", { name: "PT" }));
    expect(screen.getByText("Pergunta 1 de 10")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "q1 B PT" })).toBeChecked();
  });

  it("renders Portuguese topic chrome", async () => {
    renderWithLocale(
      <TopicQuiz topic={topic} randomSource={stableRandom} />,
      "pt",
    );
    expect(
      await screen.findByRole("heading", {
        name: "Quiz de Proficiência em Fixture React",
      }),
    ).toBeInTheDocument();
  });
});
