import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { QuizQuestion, QuizTopicData } from "@/data/quiz-types";
import { readQuizPerformance } from "@/domain/local-storage-quiz-performance";
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
  questions: Array.from({ length: 10 }, (_, index) =>
    question(`q${index + 1}`, index < 5 ? "hooks" : "state"),
  ),
  questionsPerAttempt: 10,
  durationMinutes: 8,
};

const stableRandom = () => 0.999;

async function startQuiz(user: ReturnType<typeof userEvent.setup>) {
  render(<TopicQuiz topic={topic} randomSource={stableRandom} />);
  await user.click(screen.getByRole("button", { name: "Start quiz" }));
}

describe("TopicQuiz", () => {
  beforeEach(() => localStorage.clear());

  it("shows topic configuration and starts a generic category fixture", async () => {
    const user = userEvent.setup({ delay: null });
    render(<TopicQuiz topic={topic} randomSource={stableRandom} />);

    expect(
      screen.getByRole("heading", { name: "React fixture Proficiency Quiz" }),
    ).toBeInTheDocument();
    expect(screen.getByText("10 questions")).toBeInTheDocument();
    expect(screen.getByText("8 minutes")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Start quiz" }));
    expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
    expect(screen.getByText("q1 prompt")).toBeInTheDocument();
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
    currentTime += 8 * 60 * 1000;
    rerender(
      <TopicQuiz
        topic={topic}
        randomSource={stableRandom}
        now={() => currentTime}
      />,
    );
    expect(screen.getByText("1 / 10")).toBeInTheDocument();
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
