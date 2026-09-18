import { describe, expect, it } from "vitest";

import {
  recordSessionRating,
  type SessionRatings,
} from "./recall-rating";

describe("recordSessionRating", () => {
  it("stores a rating keyed by question id", () => {
    const ratings: SessionRatings = {};

    const next = recordSessionRating(ratings, "q1", "good");

    expect(next).toEqual({ q1: "good" });
    expect(ratings).toEqual({});
  });

  it("overwrites an existing rating for the same question id", () => {
    const ratings: SessionRatings = { q1: "hard" };

    const next = recordSessionRating(ratings, "q1", "easy");

    expect(next).toEqual({ q1: "easy" });
  });

  it("preserves ratings for other questions", () => {
    const ratings: SessionRatings = { q1: "good" };

    const next = recordSessionRating(ratings, "q2", "again");

    expect(next).toEqual({ q1: "good", q2: "again" });
  });
});
