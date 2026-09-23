/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { NODEJS_QUESTIONS } from "./topics/nodejs/questions";
import { REACT_QUESTIONS } from "./topics/react/questions";

describe("active recall question ids", () => {
  it("are globally unique across Node.js and React study banks", () => {
    const ids = [
      ...NODEJS_QUESTIONS.map(({ id }) => id),
      ...REACT_QUESTIONS.map(({ id }) => id),
    ];

    expect(new Set(ids).size).toBe(ids.length);
  });
});
