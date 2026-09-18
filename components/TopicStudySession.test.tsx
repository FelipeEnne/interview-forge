import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { InterviewQuestion } from "@/data/nodejs-questions";
import {
  QUESTION_PROGRESS_STORAGE_KEY,
  readQuestionProgress,
} from "@/domain/local-storage-progress";
import type { RecallRating } from "@/domain/recall-rating";
import { TopicStudySession } from "./TopicStudySession";

const sampleQuestions: InterviewQuestion[] = [
  {
    id: "q1",
    category: "fundamentals",
    question: "First question text?",
    answer: "First answer text.",
  },
  {
    id: "q2",
    category: "async",
    question: "Second question text?",
    answer: "Second answer text.",
  },
  {
    id: "q3",
    category: "modules",
    question: "Third question text?",
    answer: "Third answer text.",
  },
];

const RATING_BUTTON_NAMES: Record<RecallRating, string> = {
  again: "Again",
  hard: "Hard",
  good: "Good",
  easy: "Easy",
};

function ratingButtons() {
  return {
    again: screen.queryByRole("button", { name: "Again" }),
    hard: screen.queryByRole("button", { name: "Hard" }),
    good: screen.queryByRole("button", { name: "Good" }),
    easy: screen.queryByRole("button", { name: "Easy" }),
  };
}

async function completeSession(
  user: ReturnType<typeof userEvent.setup>,
  ratings: RecallRating[],
) {
  for (const rating of ratings) {
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(
      screen.getByRole("button", { name: RATING_BUTTON_NAMES[rating] }),
    );
  }
}

describe("TopicStudySession", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the topic name Node.js", () => {
    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    expect(screen.getByRole("heading", { name: "Node.js" })).toBeInTheDocument();
  });

  it("shows the first question and hides its answer initially", () => {
    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    expect(screen.getByText("First question text?")).toBeInTheDocument();
    expect(screen.queryByText("First answer text.")).not.toBeInTheDocument();
  });

  it("shows the category and updates it when the current question changes", async () => {
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    expect(screen.getByText("Fundamentals")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("Event Loop & Async")).toBeInTheDocument();
    expect(screen.queryByText("Fundamentals")).not.toBeInTheDocument();
  });

  it("starts a new session with weaker questions prioritized", async () => {
    localStorage.setItem(
      QUESTION_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        q1: { lastRating: "good", reviewCount: 1 },
        q2: { lastRating: "again", reviewCount: 1 },
      }),
    );

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    expect(await screen.findByText("Second question text?")).toBeInTheDocument();
  });

  it("starts with only due questions ordered by recall priority", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-09-18T03:15:00.000Z"));
    localStorage.setItem(
      QUESTION_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        q1: {
          lastRating: "good",
          reviewCount: 1,
          lastReviewedAt: "2026-09-15T03:15:00.000Z",
          nextReviewAt: "2026-09-18T03:15:00.000Z",
        },
        q2: {
          lastRating: "again",
          reviewCount: 1,
          lastReviewedAt: "2026-09-18T03:00:00.000Z",
          nextReviewAt: "2026-09-18T03:10:00.000Z",
        },
        q3: {
          lastRating: "easy",
          reviewCount: 1,
          lastReviewedAt: "2026-09-17T03:15:00.000Z",
          nextReviewAt: "2026-09-24T03:15:00.000Z",
        },
      }),
    );
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    expect(await screen.findByText("Second question text?")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("First question text?")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("2 questions reviewed")).toBeInTheDocument();
    expect(screen.queryByText("Third question text?")).not.toBeInTheDocument();
  });

  it("keeps the due queue fixed when time passes during a session", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-09-18T03:15:00.000Z"));
    localStorage.setItem(
      QUESTION_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        q2: {
          lastRating: "again",
          reviewCount: 1,
          lastReviewedAt: "2026-09-18T03:10:00.000Z",
          nextReviewAt: "2026-09-18T03:20:00.000Z",
        },
        q3: {
          lastRating: "easy",
          reviewCount: 1,
          lastReviewedAt: "2026-09-17T03:15:00.000Z",
          nextReviewAt: "2026-09-24T03:15:00.000Z",
        },
      }),
    );
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    expect(await screen.findByText("First question text?")).toBeInTheDocument();
    vi.setSystemTime(new Date("2026-09-18T03:21:00.000Z"));

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("1 question reviewed")).toBeInTheDocument();
    expect(screen.queryByText("Second question text?")).not.toBeInTheDocument();
  });

  it("recalculates due questions with a new time on Study again", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-09-18T03:15:00.000Z"));
    localStorage.setItem(
      QUESTION_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        q2: {
          lastRating: "again",
          reviewCount: 1,
          lastReviewedAt: "2026-09-18T03:10:00.000Z",
          nextReviewAt: "2026-09-18T03:20:00.000Z",
        },
        q3: {
          lastRating: "easy",
          reviewCount: 1,
          lastReviewedAt: "2026-09-17T03:15:00.000Z",
          nextReviewAt: "2026-09-24T03:15:00.000Z",
        },
      }),
    );
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );
    await screen.findByText("First question text?");
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    vi.setSystemTime(new Date("2026-09-18T03:20:00.000Z"));
    await user.click(screen.getByRole("button", { name: "Study again" }));

    expect(screen.getByText("Second question text?")).toBeInTheDocument();
  });

  it("shows an empty state when no questions are due", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-09-18T03:15:00.000Z"));
    localStorage.setItem(
      QUESTION_PROGRESS_STORAGE_KEY,
      JSON.stringify(
        Object.fromEntries(
          sampleQuestions.map(({ id }) => [
            id,
            {
              lastRating: "good",
              reviewCount: 1,
              lastReviewedAt: "2026-09-18T03:00:00.000Z",
              nextReviewAt: "2026-09-21T03:00:00.000Z",
            },
          ]),
        ),
      ),
    );

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    expect(await screen.findByText("You're all caught up")).toBeInTheDocument();
    expect(
      screen.getByText("No questions are due for review right now."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Study all questions" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Show answer" }),
    ).not.toBeInTheDocument();
  });

  it("studies all questions in priority order for one voluntary session", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-09-18T03:15:00.000Z"));
    localStorage.setItem(
      QUESTION_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        q1: {
          lastRating: "good",
          reviewCount: 1,
          lastReviewedAt: "2026-09-18T03:00:00.000Z",
          nextReviewAt: "2026-09-21T03:00:00.000Z",
        },
        q2: {
          lastRating: "again",
          reviewCount: 1,
          lastReviewedAt: "2026-09-18T03:00:00.000Z",
          nextReviewAt: "2026-09-18T03:25:00.000Z",
        },
        q3: {
          lastRating: "easy",
          reviewCount: 1,
          lastReviewedAt: "2026-09-18T03:00:00.000Z",
          nextReviewAt: "2026-09-25T03:00:00.000Z",
        },
      }),
    );
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );
    await screen.findByText("You're all caught up");
    await user.click(
      screen.getByRole("button", { name: "Study all questions" }),
    );

    expect(screen.getByText("Second question text?")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));
    expect(screen.getByText("First question text?")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));
    expect(screen.getByText("Third question text?")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("3 questions reviewed")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Study again" }));

    expect(screen.getByText("You're all caught up")).toBeInTheDocument();
  });

  it("does not show recall rating buttons before the answer is revealed", () => {
    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    const ratings = ratingButtons();
    expect(ratings.again).not.toBeInTheDocument();
    expect(ratings.hard).not.toBeInTheDocument();
    expect(ratings.good).not.toBeInTheDocument();
    expect(ratings.easy).not.toBeInTheDocument();
  });

  it("reveals the answer when Show answer is clicked", async () => {
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));

    expect(screen.getByText("First answer text.")).toBeInTheDocument();
  });

  it("shows recall rating buttons after the answer is revealed", async () => {
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));

    const ratings = ratingButtons();
    expect(ratings.again).toBeInTheDocument();
    expect(ratings.hard).toBeInTheDocument();
    expect(ratings.good).toBeInTheDocument();
    expect(ratings.easy).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show answer" })).toBeDisabled();
  });

  it("advances to the next question when Good is selected and hides the new answer", async () => {
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("Second question text?")).toBeInTheDocument();
    expect(screen.queryByText("Second answer text.")).not.toBeInTheDocument();
  });

  it("shows recall counts in the summary after ratings are recorded", async () => {
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={[sampleQuestions[0]]} />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("1 question reviewed")).toBeInTheDocument();
    expect(screen.getByText("Good: 1")).toBeInTheDocument();
    expect(screen.getByText("Again: 0")).toBeInTheDocument();
  });

  it("completes the session on the last question after a rating", async () => {
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await completeSession(user, ["good", "good", "easy"]);

    expect(screen.getByText("Session complete")).toBeInTheDocument();
    expect(screen.getByText("3 questions reviewed")).toBeInTheDocument();
    expect(screen.queryByText("Third question text?")).not.toBeInTheDocument();
    expect(screen.queryByText("Third answer text.")).not.toBeInTheDocument();

    const ratings = ratingButtons();
    expect(ratings.again).not.toBeInTheDocument();
    expect(ratings.hard).not.toBeInTheDocument();
    expect(ratings.good).not.toBeInTheDocument();
    expect(ratings.easy).not.toBeInTheDocument();
  });

  it("shows correct Again, Hard, Good, and Easy counts in the summary", async () => {
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await completeSession(user, ["again", "hard", "easy"]);

    expect(screen.getByText("Again: 1")).toBeInTheDocument();
    expect(screen.getByText("Hard: 1")).toBeInTheDocument();
    expect(screen.getByText("Good: 0")).toBeInTheDocument();
    expect(screen.getByText("Easy: 1")).toBeInTheDocument();
  });

  it("hides all study content after the session is complete", async () => {
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await completeSession(user, ["good", "good", "good"]);

    for (const question of sampleQuestions) {
      expect(screen.queryByText(question.question)).not.toBeInTheDocument();
      expect(screen.queryByText(question.answer)).not.toBeInTheDocument();
    }

    expect(
      screen.queryByRole("button", { name: "Show answer" }),
    ).not.toBeInTheDocument();
  });

  it("starts a new session when Study again is clicked", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-09-18T03:15:00.000Z"));
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await completeSession(user, ["good", "good", "good"]);
    vi.setSystemTime(new Date("2026-09-21T03:15:00.000Z"));
    await user.click(screen.getByRole("button", { name: "Study again" }));

    expect(screen.queryByText("Session complete")).not.toBeInTheDocument();
    expect(screen.getByText("First question text?")).toBeInTheDocument();
    expect(screen.queryByText("First answer text.")).not.toBeInTheDocument();
  });

  it("recalculates question priority when Study again is clicked", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-09-18T03:15:00.000Z"));
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await completeSession(user, ["easy", "again", "good"]);
    vi.setSystemTime(new Date("2026-09-18T03:25:00.000Z"));
    await user.click(screen.getByRole("button", { name: "Study again" }));

    expect(screen.getByText("Second question text?")).toBeInTheDocument();
    expect(screen.queryByText("Second answer text.")).not.toBeInTheDocument();
  });

  it("clears previous ratings when Study again is clicked", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-09-18T03:15:00.000Z"));
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await completeSession(user, ["again", "hard", "easy"]);
    vi.setSystemTime(new Date("2026-09-25T03:15:00.000Z"));
    await user.click(screen.getByRole("button", { name: "Study again" }));

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("Second question text?")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("Good: 3")).toBeInTheDocument();
    expect(screen.getByText("Again: 0")).toBeInTheDocument();
    expect(screen.getByText("Hard: 0")).toBeInTheDocument();
    expect(screen.getByText("Easy: 0")).toBeInTheDocument();
  });

  it("persists question progress to localStorage when a question is rated", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-09-18T03:15:00.000Z"));
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(readQuestionProgress()).toEqual({
      q1: {
        lastRating: "good",
        reviewCount: 1,
        lastReviewedAt: "2026-09-18T03:15:00.000Z",
        nextReviewAt: "2026-09-21T03:15:00.000Z",
      },
    });
    expect(localStorage.getItem(QUESTION_PROGRESS_STORAGE_KEY)).not.toBeNull();
  });

  it("preserves persisted progress when Study again is clicked", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-09-18T03:15:00.000Z"));
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await completeSession(user, ["good", "good", "good"]);
    vi.setSystemTime(new Date("2026-09-21T03:15:00.000Z"));
    await user.click(screen.getByRole("button", { name: "Study again" }));

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(readQuestionProgress()).toMatchObject({
      q1: { lastRating: "good", reviewCount: 2 },
      q2: { lastRating: "good", reviewCount: 1 },
      q3: { lastRating: "good", reviewCount: 1 },
    });
  });
});
