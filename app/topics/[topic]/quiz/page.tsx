import { notFound } from "next/navigation";

import { NodejsQuiz } from "@/components/NodejsQuiz";
import { NODEJS_QUIZ_QUESTIONS } from "@/data/nodejs-quiz-questions";
import { NODEJS_TOPIC } from "@/data/nodejs-questions";

type TopicQuizPageProps = {
  params: Promise<{ topic: string }>;
};

export default async function TopicQuizPage({ params }: TopicQuizPageProps) {
  const { topic } = await params;

  if (topic !== NODEJS_TOPIC.slug) {
    notFound();
  }

  return (
    <NodejsQuiz
      questions={NODEJS_QUIZ_QUESTIONS}
      backLink={{
        href: `/topics/${NODEJS_TOPIC.slug}`,
        label: `Back to ${NODEJS_TOPIC.displayName}`,
      }}
    />
  );
}
