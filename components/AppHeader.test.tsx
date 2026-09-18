import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppHeader } from "./AppHeader";
import { LocaleProvider } from "./LocaleProvider";

describe("AppHeader", () => {
  it("shows the brand and language selector in the shared shell", () => {
    render(
      <LocaleProvider>
        <AppHeader />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("link", { name: "InterviewForge" }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "PT" })).toBeInTheDocument();
  });
});
