import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { renderWithLocale } from "@/i18n/render-with-locale";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to English chrome", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: "Technical Interview Preparation",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Node.js" })).toHaveAttribute(
      "href",
      "/topics/nodejs",
    );
    expect(screen.getByRole("link", { name: "React" })).toHaveAttribute(
      "href",
      "/topics/react",
    );
    expect(screen.getByRole("link", { name: "Angular" })).toHaveAttribute(
      "href",
      "/topics/angular",
    );
    expect(screen.queryByText("Coming soon")).not.toBeInTheDocument();
  });

  it("translates the home chrome in Portuguese", async () => {
    renderWithLocale(<HomePage />, "pt");

    expect(
      await screen.findByRole("heading", {
        name: "Preparação para Entrevistas Técnicas",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Node.js" })).toHaveAttribute(
      "href",
      "/topics/nodejs",
    );
    expect(screen.queryByText("Em breve")).not.toBeInTheDocument();
  });
});
