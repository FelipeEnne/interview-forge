import { notFound } from "next/navigation";

import { NodejsQuiz } from "@/components/NodejsQuiz";
import { NODEJS_QUIZ_QUESTIONS } from "@/data/nodejs-quiz-questions";
import { NODEJS_TOPIC } from "@/data/nodejs-questions";
import { getTopicById } from "@/data/topic-registry";

type TopicQuizPageProps = {
  params: Promise<{ topic: string }>;
};

export default async function TopicQuizPage({ params }: TopicQuizPageProps) {
  const { topic } = await params;
  const topicDefinition = getTopicById(topic);

  if (!topicDefinition || topicDefinition.id !== "nodejs") {
    notFound();
  }

  return (
    <NodejsQuiz
      questions={NODEJS_QUIZ_QUESTIONS}
      topicName={NODEJS_TOPIC.displayName}
      backLink={{
        href: `/topics/${NODEJS_TOPIC.slug}`,
      }}
    />
  );
}
