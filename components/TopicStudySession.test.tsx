import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { InterviewQuestion } from "@/data/nodejs-questions";
import { TopicStudySession } from "./TopicStudySession";

const sampleQuestions: InterviewQuestion[] = [
  {
    id: "q1",
    question: "First question text?",
    answer: "First answer text.",
  },
  {
    id: "q2",
    question: "Second question text?",
    answer: "Second answer text.",
  },
  {
    id: "q3",
    question: "Third question text?",
    answer: "Third answer text.",
  },
];

describe("TopicStudySession", () => {
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

  it("reveals the answer when Show answer is clicked", async () => {
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));

    expect(screen.getByText("First answer text.")).toBeInTheDocument();
  });

  it("shows the second question after Next question and hides the new answer", async () => {
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Next question" }));

    expect(screen.getByText("Second question text?")).toBeInTheDocument();
    expect(screen.queryByText("Second answer text.")).not.toBeInTheDocument();
  });

  it("disables Next question on the last question", () => {
    const singleQuestion: InterviewQuestion[] = [
      {
        id: "only",
        question: "Only question?",
        answer: "Only answer.",
      },
    ];

    render(
      <TopicStudySession topicName="Node.js" questions={singleQuestion} />,
    );

    expect(screen.getByRole("button", { name: "Next question" })).toBeDisabled();
  });

  it("disables Next question when viewing the last item in a longer list", async () => {
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await user.click(screen.getByRole("button", { name: "Next question" }));
    await user.click(screen.getByRole("button", { name: "Next question" }));

    expect(screen.getByText("Third question text?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next question" })).toBeDisabled();
  });
});
