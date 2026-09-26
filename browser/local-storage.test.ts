import { describe, expect, it } from "vitest";

import { getLocalStorage } from "./local-storage";

describe("getLocalStorage", () => {
  it("returns the browser localStorage", () => {
    expect(getLocalStorage()).toBe(window.localStorage);
  });
});
