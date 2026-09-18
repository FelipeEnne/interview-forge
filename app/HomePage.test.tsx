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
      screen.getByText("Practice technical interview questions one topic at a time."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Study Node.js questions" }),
    ).toHaveAttribute("href", "/topics/nodejs");
  });

  it("translates the home chrome in Portuguese", async () => {
    renderWithLocale(<HomePage />, "pt");

    expect(
      await screen.findByText(
        "Pratique perguntas de entrevista técnica um tópico de cada vez.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Estudar perguntas de Node.js" }),
    ).toHaveAttribute("href", "/topics/nodejs");
  });
});
