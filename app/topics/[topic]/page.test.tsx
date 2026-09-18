import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { QUESTION_CATEGORY_LABELS } from "@/data/nodejs-questions";
import { saveQuizPerformance } from "@/domain/local-storage-quiz-performance";
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

    for (const [category, label] of Object.entries(
      QUESTION_CATEGORY_LABELS,
    )) {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute(
        "href",
        `/topics/nodejs/categories/${category}`,
      );
    }
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

  it("returns not found for an unknown topic", async () => {
    await expect(
      TopicPage({
        params: Promise.resolve({ topic: "unknown" }),
      }),
    ).rejects.toThrow();
  });
});
