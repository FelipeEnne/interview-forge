import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { LanguageSelector } from "@/components/LanguageSelector";
import { LocaleProvider } from "@/components/LocaleProvider";
import { LOCALE_STORAGE_KEY } from "@/i18n/locale";
import { translate } from "@/i18n/translations";

function renderSelector() {
  return render(
    <LocaleProvider>
      <LanguageSelector />
    </LocaleProvider>,
  );
}

describe("LanguageSelector", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = "en";
  });

  it("defaults to English as the active language", () => {
    renderSelector();

    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "PT" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(
      screen.getByRole("group", { name: translate("en", "languageSelector") }),
    ).toBeInTheDocument();
  });

  it("switches to Portuguese immediately and persists the choice", async () => {
    const user = userEvent.setup({ delay: null });

    renderSelector();
    await user.click(screen.getByRole("button", { name: "PT" }));

    expect(screen.getByRole("button", { name: "PT" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(
      screen.getByRole("group", { name: translate("pt", "languageSelector") }),
    ).toBeInTheDocument();
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("pt");
    expect(document.documentElement.lang).toBe("pt");
  });

  it("restores the persisted Portuguese preference after remount", async () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, "pt");

    const { unmount } = renderSelector();

    expect(
      await screen.findByRole("group", {
        name: translate("pt", "languageSelector"),
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "PT" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(document.documentElement.lang).toBe("pt");

    unmount();
    renderSelector();

    expect(
      await screen.findByRole("button", { name: "PT" }),
    ).toHaveAttribute("aria-pressed", "true");
  });
});
