import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { getCategoryLabel } from "@/i18n/translations";
import { renderWithLocale } from "@/i18n/render-with-locale";
import type { CodingChallenge } from "@/data/nodejs-coding-challenges";
import { NodejsCodingChallenge } from "./NodejsCodingChallenge";

const challenge: CodingChallenge = {
  id: "sample-challenge",
  title: "Sample challenge",
  category: "async",
  prompt: "Write a function that retries a failed async call.",
  requirements: ["Retry a limited number of times.", "Reject with the last error."],
  starterCode: "export async function retry(fn) {}",
  referenceSolution: "export async function retry(fn) { return fn(); }",
  reviewChecklist: ["Uses async/await.", "Does not block the event loop."],
};

describe("NodejsCodingChallenge", () => {
  it("shows the prompt, starter code, and checklist before revealing the solution", () => {
    render(
      <NodejsCodingChallenge
        challenge={challenge}
        backLink={{ href: "/topics/nodejs/challenges" }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Sample challenge" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(getCategoryLabel("en", challenge.category)),
    ).toBeInTheDocument();
    expect(screen.getByText(challenge.prompt)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Requirements" })).toBeInTheDocument();
    expect(screen.getByText("Retry a limited number of times.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Starter code" })).toBeInTheDocument();
    expect(screen.getByText(challenge.starterCode)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Review checklist" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Uses async/await.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reveal solution" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Reference solution" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(challenge.referenceSolution),
    ).not.toBeInTheDocument();
  });

  it("reveals the reference solution when requested", async () => {
    const user = userEvent.setup();

    render(
      <NodejsCodingChallenge
        challenge={challenge}
        backLink={{ href: "/topics/nodejs/challenges" }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Reveal solution" }));

    expect(
      screen.getByRole("heading", { name: "Reference solution" }),
    ).toBeInTheDocument();
    expect(screen.getByText(challenge.referenceSolution)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Reveal solution" }),
    ).not.toBeInTheDocument();
  });

  it("translates challenge chrome while keeping technical content in English", async () => {
    renderWithLocale(
      <NodejsCodingChallenge
        challenge={challenge}
        backLink={{ href: "/topics/nodejs/challenges" }}
      />,
      "pt",
    );

    expect(
      await screen.findByRole("heading", { name: "Requisitos" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Voltar para os desafios" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Event Loop e Assincronismo")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Código inicial" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Checklist de revisão" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Revelar solução" }),
    ).toBeInTheDocument();
    expect(screen.getByText(challenge.prompt)).toBeInTheDocument();
    expect(screen.getByText("Retry a limited number of times.")).toBeInTheDocument();
    expect(screen.getByText(challenge.starterCode)).toBeInTheDocument();
    expect(screen.getByText("Uses async/await.")).toBeInTheDocument();
  });
});
