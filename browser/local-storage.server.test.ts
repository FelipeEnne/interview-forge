/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { getLocalStorage } from "./local-storage";

describe("getLocalStorage on the server", () => {
  it("returns null", () => {
    expect(getLocalStorage()).toBeNull();
  });
});
