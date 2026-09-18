/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import {
  countSessionRatings,
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

describe("countSessionRatings", () => {
  it("returns zero total and zero counts for an empty map", () => {
    expect(countSessionRatings({})).toEqual({
      total: 0,
      again: 0,
      hard: 0,
      good: 0,
      easy: 0,
    });
  });

  it("counts one rating per type", () => {
    expect(
      countSessionRatings({
        q1: "again",
        q2: "hard",
        q3: "good",
        q4: "easy",
      }),
    ).toEqual({
      total: 4,
      again: 1,
      hard: 1,
      good: 1,
      easy: 1,
    });
  });

  it("aggregates mixed ratings including duplicates", () => {
    expect(
      countSessionRatings({
        q1: "good",
        q2: "again",
        q3: "good",
      }),
    ).toEqual({
      total: 3,
      again: 1,
      hard: 0,
      good: 2,
      easy: 0,
    });
  });
});
