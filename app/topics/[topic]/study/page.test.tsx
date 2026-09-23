import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { NODEJS_QUESTIONS } from "@/data/topics/nodejs/questions";
import TopicStudyPage from "./page";

describe("TopicStudyPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts the existing Node.js study flow", async () => {
    render(
      await TopicStudyPage({
        params: Promise.resolve({ topic: "nodejs" }),
      }),
    );

    expect(screen.getByRole("heading", { name: "Node.js" })).toBeInTheDocument();
    expect(
      await screen.findByText(NODEJS_QUESTIONS[0]!.question.en),
    ).toBeInTheDocument();
  });

  it.each(["react", "angular", "unknown"])(
    "returns not found when %s has no study bank",
    async (topic) => {
      await expect(
        TopicStudyPage({
          params: Promise.resolve({ topic }),
        }),
      ).rejects.toThrow();
    },
  );
});
