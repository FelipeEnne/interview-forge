import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { NODEJS_TOPIC, QUESTION_CATEGORIES } from "@/data/nodejs-questions";
import { saveQuestionProgress } from "@/domain/local-storage-progress";
import type { QuestionProgressState } from "@/domain/question-progress";
import { getCategoryLabel } from "@/i18n/translations";
import { saveQuizPerformance } from "@/domain/local-storage-quiz-performance";
import { renderWithLocale } from "@/i18n/render-with-locale";
import TopicPage from "./page";

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
          name: getCategoryLabel("en", category),
        }),
      ).toHaveAttribute("href", `/topics/nodejs/categories/${category}`);
    }
  });

  it("shows derived study progress from persisted question progress", async () => {
    const progress: QuestionProgressState = {};
    for (let index = 0; index < 34; index += 1) {
      progress[NODEJS_TOPIC.questions[index].id] = {
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

  it("includes persisted quiz performance on the Node.js page", async () => {
    saveQuizPerformance({
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

  it("translates study progress labels in Portuguese", async () => {
    const progress: QuestionProgressState = {
      [NODEJS_TOPIC.questions[0].id]: { lastRating: "easy", reviewCount: 1 },
      [NODEJS_TOPIC.questions[1].id]: { lastRating: "again", reviewCount: 1 },
    };
    saveQuestionProgress(progress);

    renderWithLocale(
      await TopicPage({
        params: Promise.resolve({ topic: "nodejs" }),
      }),
      "pt",
    );

    expect(
      await screen.findByRole("heading", { name: "Progresso" }),
    ).toBeInTheDocument();
    expect(screen.getByText("1 / 60 decoradas")).toBeInTheDocument();
    expect(screen.getByText("59 perguntas faltando")).toBeInTheDocument();
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

  it("returns not found for an unknown topic", async () => {
    await expect(
      TopicPage({
        params: Promise.resolve({ topic: "unknown" }),
      }),
    ).rejects.toThrow();
  });
});
