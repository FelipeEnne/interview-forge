import { notFound } from "next/navigation";

import { TopicQuiz } from "@/components/quiz/TopicQuiz";
import { getQuizTopicById } from "@/data/quiz-topics";

type TopicQuizPageProps = {
  params: Promise<{ topic: string }>;
};

export default async function TopicQuizPage({ params }: TopicQuizPageProps) {
  const { topic } = await params;
  const quizTopic = getQuizTopicById(topic);

  if (!quizTopic) {
    notFound();
  }

  return <TopicQuiz topic={quizTopic} />;
}
