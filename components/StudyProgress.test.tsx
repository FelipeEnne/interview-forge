import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { StudyProgress } from "@/components/StudyProgress";
import { saveQuestionProgress } from "@/domain/local-storage-progress";

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
});
