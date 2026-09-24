import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TopicOverview } from "./TopicOverview";

describe("TopicOverview", () => {
  it("omits links for capabilities that are not provided", () => {
    render(
      <TopicOverview
        topic={{
          id: "react",
          displayName: { en: "React", pt: "React" },
          status: "available",
        }}
      />,
    );

    expect(screen.getByRole("heading", { name: "React" })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Study due questions" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Take proficiency quiz" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Practice coding challenges" }),
    ).not.toBeInTheDocument();
  });
});
