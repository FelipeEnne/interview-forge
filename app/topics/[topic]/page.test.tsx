import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { QUESTION_CATEGORY_LABELS } from "@/data/nodejs-questions";
import TopicPage from "./page";

describe("TopicPage", () => {
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

    for (const [category, label] of Object.entries(
      QUESTION_CATEGORY_LABELS,
    )) {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute(
        "href",
        `/topics/nodejs/categories/${category}`,
      );
    }
  });

  it("returns not found for an unknown topic", async () => {
    await expect(
      TopicPage({
        params: Promise.resolve({ topic: "unknown" }),
      }),
    ).rejects.toThrow();
  });
});
