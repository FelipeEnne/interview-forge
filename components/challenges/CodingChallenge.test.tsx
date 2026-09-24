import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { CodingChallenge as CodingChallengeData } from "@/data/challenge-types";
import { renderWithLocale } from "@/i18n/render-with-locale";
import { CodingChallenge } from "./CodingChallenge";

const challenge: CodingChallengeData = {
  id: "use-toggle",
  title: { en: "Build useToggle", pt: "Crie useToggle" },
  category: "hooks",
  prompt: {
    en: "Implement a toggle hook.",
    pt: "Implemente um hook de toggle.",
  },
  requirements: [
    { en: "Expose a toggle function.", pt: "Exponha uma função toggle." },
  ],
  starterCode: "export function useToggle() {}",
  referenceSolution:
    "export function useToggle() { return [false, () => {}]; }",
  reviewChecklist: [{ en: "Keeps state local.", pt: "Mantém estado local." }],
};

const category = { id: "hooks", displayName: { en: "Hooks", pt: "Hooks" } };

describe("CodingChallenge", () => {
  it("renders a generic challenge and hides its solution", () => {
    render(
      <CodingChallenge
        challenge={challenge}
        category={category}
        backLink={{ href: "/topics/react/challenges" }}
      />,
    );
    expect(
      screen.getByRole("heading", { name: "Build useToggle" }),
    ).toBeInTheDocument();
    expect(screen.getByText(challenge.starterCode)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reveal solution" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(challenge.referenceSolution),
    ).not.toBeInTheDocument();
  });

  it("reveals the reference solution on request", async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <CodingChallenge
        challenge={challenge}
        category={category}
        backLink={{ href: "/topics/react/challenges" }}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Reveal solution" }));
    expect(screen.getByText(challenge.referenceSolution)).toBeInTheDocument();
  });

  it("localizes content and category supplied by the topic", async () => {
    renderWithLocale(
      <CodingChallenge
        challenge={challenge}
        category={category}
        backLink={{ href: "/topics/react/challenges" }}
      />,
      "pt",
    );
    expect(
      await screen.findByRole("heading", { name: "Crie useToggle" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Implemente um hook de toggle."),
    ).toBeInTheDocument();
  });
});
