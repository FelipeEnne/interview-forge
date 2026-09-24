import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithLocale } from "@/i18n/render-with-locale";
import { CategoryPerformance } from "./CategoryPerformance";

const categories = [
  { id: "hooks", displayName: { en: "Hooks", pt: "Hooks" } },
  { id: "state", displayName: { en: "State", pt: "Estado" } },
] as const;

describe("CategoryPerformance", () => {
  it("shows weakest generic categories with optional study links", () => {
    render(
      <CategoryPerformance
        categories={categories}
        performance={{
          hooks: { correct: 2, total: 5 },
          state: { correct: 3, total: 5 },
        }}
        studyCategoryBasePath="/topics/react/categories"
      />,
    );
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Hooks");
    expect(
      within(items[0]).getByRole("link", { name: "Study Hooks" }),
    ).toHaveAttribute("href", "/topics/react/categories/hooks");
  });

  it("localizes supplied category definitions", async () => {
    renderWithLocale(
      <CategoryPerformance
        categories={categories}
        performance={{ state: { correct: 1, total: 2 } }}
      />,
      "pt",
    );
    expect(
      await screen.findByRole("heading", { name: "Desempenho" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Estado", level: 3 }),
    ).toBeInTheDocument();
  });

  it("renders nothing without enough evidence", () => {
    render(
      <CategoryPerformance
        categories={categories}
        performance={{ hooks: { correct: 0, total: 1 } }}
      />,
    );
    expect(
      screen.queryByRole("heading", { name: "Performance" }),
    ).not.toBeInTheDocument();
  });
});
