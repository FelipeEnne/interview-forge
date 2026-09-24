import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { NODEJS_QUESTIONS } from "@/data/topics/nodejs/questions";
import { readQuestionProgress } from "@/domain/local-storage-progress";
import CategoryStudyPage from "./page";

describe("CategoryStudyPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("studies and persists only questions from the selected category", async () => {
    const user = userEvent.setup();
    const fundamentalsQuestions = NODEJS_QUESTIONS.filter(
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
    expect(
      screen.getByRole("link", { name: "Back to Node.js" }),
    ).toHaveAttribute("href", "/topics/nodejs");
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

  it("studies React fundamentals without mixing other categories", async () => {
    const { REACT_QUESTIONS } = await import("@/data/topics/react/questions");
    const fundamentalsQuestions = REACT_QUESTIONS.filter(
      (question) => question.category === "fundamentals",
    );

    render(
      await CategoryStudyPage({
        params: Promise.resolve({
          topic: "react",
          category: "fundamentals",
        }),
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: "React — Fundamentals & Composition",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(fundamentalsQuestions[0]!.question.en),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        REACT_QUESTIONS.find((q) => q.category === "hooks")!.question.en,
      ),
    ).not.toBeInTheDocument();
  });

  it("returns not found for an invalid React category", async () => {
    await expect(
      CategoryStudyPage({
        params: Promise.resolve({
          topic: "react",
          category: "unknown",
        }),
      }),
    ).rejects.toThrow();
  });

  it("studies Angular components without mixing other categories", async () => {
    const { ANGULAR_QUESTIONS } =
      await import("@/data/topics/angular/questions");
    const componentQuestions = ANGULAR_QUESTIONS.filter(
      (question) => question.category === "components",
    );

    render(
      await CategoryStudyPage({
        params: Promise.resolve({
          topic: "angular",
          category: "components",
        }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: "Angular — Components & Rendering" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(componentQuestions[0]!.question.en),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        ANGULAR_QUESTIONS.find((q) => q.category === "templates")!.question.en,
      ),
    ).not.toBeInTheDocument();
  });

  it("returns not found for an invalid Angular category", async () => {
    await expect(
      CategoryStudyPage({
        params: Promise.resolve({
          topic: "angular",
          category: "unknown",
        }),
      }),
    ).rejects.toThrow();
  });
});
