import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { NODEJS_TOPIC } from "@/data/nodejs-questions";
import { readQuestionProgress } from "@/domain/local-storage-progress";
import CategoryStudyPage from "./page";

describe("CategoryStudyPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("studies and persists only questions from the selected category", async () => {
    const user = userEvent.setup();
    const fundamentalsQuestions = NODEJS_TOPIC.questions.filter(
      (question) => question.category === "fundamentals",
    );

    render(
      await CategoryStudyPage({
        params: Promise.resolve({
          topic: "nodejs",
          category: "fundamentals",
        }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: "Node.js — Fundamentals" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to Node.js" })).toHaveAttribute(
      "href",
      "/topics/nodejs",
    );
    expect(
      screen.getByText(fundamentalsQuestions[0]!.question.en),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "What is the event loop in Node.js, and why does it matter?",
      ),
    ).not.toBeInTheDocument();

    for (let index = 0; index < fundamentalsQuestions.length; index += 1) {
      await user.click(screen.getByRole("button", { name: "Show answer" }));
      await user.click(screen.getByRole("button", { name: "Good" }));
    }

    expect(
      screen.getByText(`${fundamentalsQuestions.length} questions reviewed`),
    ).toBeInTheDocument();
    expect(Object.keys(readQuestionProgress())).toEqual(
      fundamentalsQuestions.map(({ id }) => id),
    );
  });

  it("returns not found for an unknown category", async () => {
    await expect(
      CategoryStudyPage({
        params: Promise.resolve({
          topic: "nodejs",
          category: "unknown",
        }),
      }),
    ).rejects.toThrow();
  });

  it.each(["react", "angular"])(
    "returns not found when %s has no category bank",
    async (topic) => {
      await expect(
        CategoryStudyPage({
          params: Promise.resolve({
            topic,
            category: "fundamentals",
          }),
        }),
      ).rejects.toThrow();
    },
  );
});
