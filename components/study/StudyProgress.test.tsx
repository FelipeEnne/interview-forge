import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { StudyProgress } from "@/components/study/StudyProgress";
import { saveQuestionProgress } from "@/domain/local-storage-progress";

function expectRatingCountInSection(
  sectionHeading: string,
  label: string,
  count: number,
) {
  const title = screen.getByRole("heading", { level: 3, name: sectionHeading });
  const section = title.parentElement as HTMLElement;
  const row = within(section)
    .getAllByRole("listitem")
    .find((item) => within(item).queryByText(label) !== null);

  expect(row).toBeDefined();
  expect(within(row!).getByText(String(count))).toBeInTheDocument();
}

describe("StudyProgress", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("derives progress from the questions supplied by its topic", async () => {
    saveQuestionProgress({
      "event-loop": { lastRating: "good", reviewCount: 3 },
      "react-use-state": { lastRating: "easy", reviewCount: 1 },
    });

    render(
      <StudyProgress
        questions={[{ id: "event-loop" }, { id: "v8-and-libuv" }]}
      />,
    );

    expect(
      await screen.findByRole("heading", { name: "Progress" }),
    ).toBeInTheDocument();
    expect(screen.getByText("1 / 2 memorized")).toBeInTheDocument();
    expect(screen.getByText("1 question remaining")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("shows rating breakdown groups and a progress bar", async () => {
    saveQuestionProgress({
      q1: { lastRating: "again", reviewCount: 1 },
      q2: { lastRating: "hard", reviewCount: 1 },
      q3: { lastRating: "good", reviewCount: 2 },
      q4: { lastRating: "easy", reviewCount: 1 },
    });

    render(
      <StudyProgress
        questions={[
          { id: "q1" },
          { id: "q2" },
          { id: "q3" },
          { id: "q4" },
          { id: "q5" },
        ]}
      />,
    );

    expect(
      await screen.findByRole("heading", { name: "Progress" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("progressbar", { name: "Progress" }),
    ).toHaveAttribute("value", "40");
    expectRatingCountInSection("Needs attention", "Again", 1);
    expectRatingCountInSection("Needs attention", "Hard", 1);
    expectRatingCountInSection("Needs attention", "Unreviewed", 1);
    expectRatingCountInSection("Memorized", "Good", 1);
    expectRatingCountInSection("Memorized", "Easy", 1);
  });
});
