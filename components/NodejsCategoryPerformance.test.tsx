import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { NodejsCategoryPerformance } from "@/components/NodejsCategoryPerformance";
import { saveQuizPerformance } from "@/domain/local-storage-quiz-performance";

describe("NodejsCategoryPerformance", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows the three lowest eligible categories with study links", async () => {
    saveQuizPerformance({
      fundamentals: { correct: 4, total: 5 },
      async: { correct: 3, total: 5 },
      http: { correct: 6, total: 8 },
      streams: { correct: 2, total: 5 },
      security: { correct: 0, total: 1 },
    });

    render(<NodejsCategoryPerformance />);

    expect(
      await screen.findByRole("heading", { name: "Performance" }),
    ).toBeInTheDocument();

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("Streams & Buffers");
    expect(items[0]).toHaveTextContent("40%");
    expect(items[0]).toHaveTextContent("2 / 5 correct");
    expect(items[1]).toHaveTextContent("Event Loop & Async");
    expect(items[2]).toHaveTextContent("HTTP & APIs");
    expect(
      within(items[0]).getByRole("link", {
        name: "Study Streams & Buffers",
      }),
    ).toHaveAttribute("href", "/topics/nodejs/categories/streams");
  });

  it("renders no performance block without enough evidence", () => {
    saveQuizPerformance({
      async: { correct: 0, total: 1 },
    });

    render(<NodejsCategoryPerformance />);

    expect(
      screen.queryByRole("heading", { name: "Performance" }),
    ).not.toBeInTheDocument();
  });
});
