import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NODEJS_CODING_CHALLENGES } from "@/data/nodejs-coding-challenges";
import TopicChallengePage from "./page";

describe("TopicChallengePage", () => {
  it("renders the selected Node.js coding challenge", async () => {
    const challenge = NODEJS_CODING_CHALLENGES[0];

    render(
      await TopicChallengePage({
        params: Promise.resolve({
          topic: "nodejs",
          challenge: challenge.id,
        }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: challenge.title.en }),
    ).toBeInTheDocument();
    expect(screen.getByText(challenge.prompt.en)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reveal solution" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to challenges" }),
    ).toHaveAttribute("href", "/topics/nodejs/challenges");
  });

  it("returns not found for an unknown topic", async () => {
    await expect(
      TopicChallengePage({
        params: Promise.resolve({
          topic: "unknown",
          challenge: NODEJS_CODING_CHALLENGES[0].id,
        }),
      }),
    ).rejects.toThrow();
  });

  it("returns not found for an unknown challenge", async () => {
    await expect(
      TopicChallengePage({
        params: Promise.resolve({
          topic: "nodejs",
          challenge: "unknown",
        }),
      }),
    ).rejects.toThrow();
  });
});
