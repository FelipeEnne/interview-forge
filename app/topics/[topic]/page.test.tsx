import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { NODEJS_CATEGORIES, QUESTION_CATEGORIES } from "@/data/topics/nodejs/categories";
import { NODEJS_QUESTIONS } from "@/data/topics/nodejs/questions";
import { saveQuestionProgress } from "@/domain/local-storage-progress";
import type { QuestionProgressState } from "@/domain/question-progress";
import { getLocalizedText } from "@/i18n/localized-text";
import { saveQuizPerformance } from "@/domain/local-storage-quiz-performance";
import { renderWithLocale } from "@/i18n/render-with-locale";
import TopicPage from "./page";

function getProgressSectionByHeading(heading: string): HTMLElement {
  const title = screen.getByRole("heading", { level: 3, name: heading });
  const section = title.parentElement;
  expect(section?.tagName).toBe("SECTION");
  return section as HTMLElement;
}

function expectRatingCountInSection(
  sectionHeading: string,
  label: string,
  count: number,
): void {
  const section = getProgressSectionByHeading(sectionHeading);
  const row = within(section)
    .getAllByRole("listitem")
    .find((item) => within(item).queryByText(label) !== null);
  expect(row).toBeDefined();
  expect(within(row!).getByText(String(count))).toBeInTheDocument();
}

function saveBreakdownFixtureProgress(): void {
  const progress: QuestionProgressState = {
    [NODEJS_QUESTIONS[0].id]: { lastRating: "good", reviewCount: 1 },
    [NODEJS_QUESTIONS[1].id]: { lastRating: "good", reviewCount: 1 },
    [NODEJS_QUESTIONS[2].id]: { lastRating: "easy", reviewCount: 1 },
    [NODEJS_QUESTIONS[3].id]: { lastRating: "hard", reviewCount: 1 },
    [NODEJS_QUESTIONS[4].id]: { lastRating: "again", reviewCount: 1 },
  };
  saveQuestionProgress(progress);
}

describe("TopicPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows due review and every category as study choices", async () => {
    render(
      await TopicPage({
        params: Promise.resolve({ topic: "nodejs" }),
      }),
    );

    expect(screen.getByRole("heading", { name: "Node.js" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Study due questions" }),
    ).toHaveAttribute("href", "/topics/nodejs/study");
    expect(
      screen.getByRole("link", { name: "Take proficiency quiz" }),
    ).toHaveAttribute("href", "/topics/nodejs/quiz");
    expect(
      screen.getByRole("link", { name: "Practice coding challenges" }),
    ).toHaveAttribute("href", "/topics/nodejs/challenges");

    for (const category of QUESTION_CATEGORIES) {
      expect(
        screen.getByRole("link", {
          name: getLocalizedText(NODEJS_CATEGORIES.find(({ id }) => id === category)!.displayName, "en"),
        }),
      ).toHaveAttribute("href", `/topics/nodejs/categories/${category}`);
    }
  });

  it("shows derived study progress from persisted question progress", async () => {
    const progress: QuestionProgressState = {};
    for (let index = 0; index < 34; index += 1) {
      progress[NODEJS_QUESTIONS[index].id] = {
        lastRating: "good",
        reviewCount: 1,
      };
    }
    saveQuestionProgress(progress);

    render(
      await TopicPage({
        params: Promise.resolve({ topic: "nodejs" }),
      }),
    );

    expect(
      await screen.findByRole("heading", { name: "Progress" }),
    ).toBeInTheDocument();
    expect(screen.getByText("34 / 60 memorized")).toBeInTheDocument();
    expect(screen.getByText("57%")).toBeInTheDocument();
    expect(screen.getByText("26 questions remaining")).toBeInTheDocument();
  });

  it("shows study progress breakdown by last recall rating in English", async () => {
    saveBreakdownFixtureProgress();

    render(
      await TopicPage({
        params: Promise.resolve({ topic: "nodejs" }),
      }),
    );

    expect(
      await screen.findByRole("heading", { name: "Progress" }),
    ).toBeInTheDocument();
    expect(screen.getByText("3 / 60 memorized")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 3, name: "Needs attention" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Memorized" }),
    ).toBeInTheDocument();

    expectRatingCountInSection("Needs attention", "Again", 1);
    expectRatingCountInSection("Needs attention", "Hard", 1);
    expectRatingCountInSection("Needs attention", "Unreviewed", 55);
    expectRatingCountInSection("Memorized", "Good", 2);
    expectRatingCountInSection("Memorized", "Easy", 1);
  });

  it("includes persisted quiz performance on the Node.js page", async () => {
    saveQuizPerformance("nodejs", {
      streams: { correct: 1, total: 3 },
    });

    render(
      await TopicPage({
        params: Promise.resolve({ topic: "nodejs" }),
      }),
    );

    expect(
      await screen.findByRole("heading", { name: "Performance" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Streams & Buffers", level: 3 }),
    ).toBeInTheDocument();
  });

  it("translates study progress labels and breakdown in Portuguese", async () => {
    saveBreakdownFixtureProgress();

    renderWithLocale(
      await TopicPage({
        params: Promise.resolve({ topic: "nodejs" }),
      }),
      "pt",
    );

    expect(
      await screen.findByRole("heading", { name: "Progresso" }),
    ).toBeInTheDocument();
    expect(screen.getByText("3 / 60 decoradas")).toBeInTheDocument();
    expect(screen.getByText("57 perguntas faltando")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 3, name: "Precisa de atenção" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Decoradas" }),
    ).toBeInTheDocument();

    expectRatingCountInSection("Precisa de atenção", "Novamente", 1);
    expectRatingCountInSection("Precisa de atenção", "Difícil", 1);
    expectRatingCountInSection("Precisa de atenção", "Não estudadas", 55);
    expectRatingCountInSection("Decoradas", "Bom", 2);
    expectRatingCountInSection("Decoradas", "Fácil", 1);
  });

  it("translates topic chrome and category names in Portuguese", async () => {
    renderWithLocale(
      await TopicPage({
        params: Promise.resolve({ topic: "nodejs" }),
      }),
      "pt",
    );

    expect(
      await screen.findByRole("link", { name: "Estudar perguntas pendentes" }),
    ).toHaveAttribute("href", "/topics/nodejs/study");
    expect(
      screen.getByRole("link", { name: "Fazer quiz de proficiência" }),
    ).toHaveAttribute("href", "/topics/nodejs/quiz");
    expect(
      screen.getByRole("heading", { name: "Categorias" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Fundamentos" }),
    ).toHaveAttribute("href", "/topics/nodejs/categories/fundamentals");
    expect(
      screen.getByRole("link", { name: "Produção e Arquitetura" }),
    ).toHaveAttribute("href", "/topics/nodejs/categories/production");
  });

  it.each(["react", "angular"])(
    "shows a coming-soon page for the known %s topic",
    async (topic) => {
      render(
        await TopicPage({
          params: Promise.resolve({ topic }),
        }),
      );

      expect(
        screen.getByRole("heading", {
          name: topic === "react" ? "React" : "Angular",
        }),
      ).toBeInTheDocument();
      expect(screen.getByText("Coming soon")).toBeInTheDocument();
    },
  );

  it("translates the coming-soon page in Portuguese", async () => {
    renderWithLocale(
      await TopicPage({
        params: Promise.resolve({ topic: "react" }),
      }),
      "pt",
    );

    expect(await screen.findByText("Em breve")).toBeInTheDocument();
  });

  it("returns not found for an unknown topic", async () => {
    await expect(
      TopicPage({
        params: Promise.resolve({ topic: "unknown" }),
      }),
    ).rejects.toThrow();
  });
});
