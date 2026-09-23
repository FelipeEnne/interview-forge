import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TopicQuizPage from "./page";

describe("TopicQuizPage", () => {
  it("renders the Node.js proficiency quiz intro", async () => {
    render(
      await TopicQuizPage({
        params: Promise.resolve({ topic: "nodejs" }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: "Node.js Proficiency Quiz" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start quiz" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to Node.js" })).toHaveAttribute(
      "href",
      "/topics/nodejs",
    );
  });

  it("returns not found for an unknown topic", async () => {
    await expect(
      TopicQuizPage({
        params: Promise.resolve({ topic: "unknown" }),
      }),
    ).rejects.toThrow();
  });

  it("renders the React proficiency quiz intro", async () => {
    render(
      await TopicQuizPage({
        params: Promise.resolve({ topic: "react" }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: "React Proficiency Quiz" }),
    ).toBeInTheDocument();
    expect(screen.getByText("10 questions")).toBeInTheDocument();
    expect(screen.getByText("8 minutes")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to React" })).toHaveAttribute(
      "href",
      "/topics/react",
    );
  });

  it("returns not found because Angular has no quiz", async () => {
    await expect(
      TopicQuizPage({
        params: Promise.resolve({ topic: "angular" }),
      }),
    ).rejects.toThrow();
  });
});
