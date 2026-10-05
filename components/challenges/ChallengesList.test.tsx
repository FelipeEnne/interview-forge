import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ChallengeTopicData } from "@/data/challenge-types";
import { ChallengesList } from "./ChallengesList";

const baseTopic: ChallengeTopicData = {
  id: "nodejs",
  displayName: { en: "Node.js", pt: "Node.js" },
  categories: [{ id: "async", displayName: { en: "Async", pt: "Assíncrono" } }],
  challenges: [
    {
      id: "challenge-1",
      title: { en: "Known category challenge", pt: "Desafio conhecido" },
      category: "async",
      prompt: { en: "Prompt", pt: "Prompt" },
      requirements: [],
      starterCode: "",
      referenceSolution: "",
      reviewChecklist: [],
    },
  ],
};

describe("ChallengesList", () => {
  it("falls back to the raw category id when the category is unknown", () => {
    const topic: ChallengeTopicData = {
      ...baseTopic,
      challenges: [
        {
          ...baseTopic.challenges[0]!,
          id: "orphan",
          title: { en: "Orphan challenge", pt: "Desafio órfão" },
          category: "unknown-category",
        },
      ],
    };

    render(<ChallengesList topic={topic} />);

    expect(screen.getByText("unknown-category")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Orphan challenge" }),
    ).toBeInTheDocument();
  });

  it("renders an empty list when the topic has no challenges", () => {
    render(<ChallengesList topic={{ ...baseTopic, challenges: [] }} />);

    expect(
      screen.getByRole("heading", { name: "Node.js Coding Challenges" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
