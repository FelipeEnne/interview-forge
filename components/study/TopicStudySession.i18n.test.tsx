import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { readQuestionProgress } from "@/domain/local-storage-progress";
import { renderWithLocale } from "@/i18n/render-with-locale";
import { LanguageSelector } from "../LanguageSelector";
import { LocaleProvider } from "../LocaleProvider";
import { TopicStudySession } from "./TopicStudySession";
import {
  createClock,
  createUser,
  sampleCategories,
  sampleQuestions,
} from "./TopicStudySession.test-helpers";

describe("TopicStudySession localization", () => {
  const clock = createClock();

  beforeEach(() => {
    localStorage.clear();
  });

  it("translates study chrome, ratings, and question content to Portuguese", async () => {
    const user = createUser();

    renderWithLocale(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={[sampleQuestions[0]!]}
        now={clock.now}
      />,
      "pt",
    );

    expect(
      await screen.findByRole("button", { name: "Mostrar resposta" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Fundamentos")).toBeInTheDocument();
    expect(screen.getByText("Texto da primeira pergunta?")).toBeInTheDocument();
    expect(screen.queryByText("First question text?")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Mostrar resposta" }));
    expect(screen.getByText("Texto da primeira resposta.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Bom" }));

    expect(readQuestionProgress().q1?.lastRating).toBe("good");
    expect(screen.getByText("1 pergunta revisada")).toBeInTheDocument();
    expect(screen.getByText("Bom: 1")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Estudar novamente" }),
    ).toBeInTheDocument();
  });

  it("keeps the current question and revealed answer when switching language", async () => {
    const user = createUser();

    render(
      <LocaleProvider>
        <LanguageSelector />
        <TopicStudySession
          topicName="Node.js"
          categories={sampleCategories}
          questions={sampleQuestions}
          now={clock.now}
        />
      </LocaleProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));
    await user.click(screen.getByRole("button", { name: "Show answer" }));

    expect(screen.getByText("Second question text?")).toBeInTheDocument();
    expect(screen.getByText("Second answer text.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "PT" }));

    expect(screen.getByText("Texto da segunda pergunta?")).toBeInTheDocument();
    expect(screen.getByText("Texto da segunda resposta.")).toBeInTheDocument();
    expect(screen.queryByText("First question text?")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Texto da primeira pergunta?"),
    ).not.toBeInTheDocument();
    expect(readQuestionProgress().q1?.lastRating).toBe("good");
    expect(
      screen.getByRole("button", { name: "Mostrar resposta" }),
    ).toBeDisabled();
  });
});
