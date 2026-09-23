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
    expect(screen.getByText("Angular")).toBeInTheDocument();
    expect(screen.getAllByText("Coming soon")).toHaveLength(1);
    expect(
      screen.queryByRole("link", { name: "Angular" }),
    ).not.toBeInTheDocument();
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
    expect(screen.getAllByText("Em breve")).toHaveLength(1);
  });
});
