/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { parseJsonObject } from "./parse-json-object";

describe("parseJsonObject", () => {
  it("returns a plain object for valid JSON objects", () => {
    expect(parseJsonObject('{"a":1}')).toEqual({ a: 1 });
  });

  it("returns null for invalid JSON, arrays, and null", () => {
    expect(parseJsonObject("not-json{")).toBeNull();
    expect(parseJsonObject("[]")).toBeNull();
    expect(parseJsonObject("null")).toBeNull();
  });
});
