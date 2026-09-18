import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NODEJS_CODING_CHALLENGES } from "@/data/nodejs-coding-challenges";
import { getCategoryLabel } from "@/i18n/translations";
import TopicChallengesPage from "./page";

describe("TopicChallengesPage", () => {
  it("lists every Node.js coding challenge", async () => {
    render(
      await TopicChallengesPage({
        params: Promise.resolve({ topic: "nodejs" }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: "Node.js Coding Challenges" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to Node.js" })).toHaveAttribute(
      "href",
      "/topics/nodejs",
    );

    for (const challenge of NODEJS_CODING_CHALLENGES) {
      const link = screen.getByRole("link", { name: challenge.title });

      expect(link).toHaveAttribute(
        "href",
        `/topics/nodejs/challenges/${challenge.id}`,
      );
      expect(link.parentElement).toHaveTextContent(
        getCategoryLabel("en", challenge.category),
      );
    }
  });

  it("returns not found for an unknown topic", async () => {
    await expect(
      TopicChallengesPage({
        params: Promise.resolve({ topic: "unknown" }),
      }),
    ).rejects.toThrow();
  });
});
