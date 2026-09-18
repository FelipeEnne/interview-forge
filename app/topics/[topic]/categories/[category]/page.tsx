import { notFound } from "next/navigation";

import { TopicStudySession } from "@/components/TopicStudySession";
import {
  isQuestionCategory,
  NODEJS_TOPIC,
} from "@/data/nodejs-questions";

type CategoryStudyPageProps = {
  params: Promise<{ topic: string; category: string }>;
};

export default async function CategoryStudyPage({
  params,
}: CategoryStudyPageProps) {
  const { topic, category } = await params;

  if (topic !== NODEJS_TOPIC.slug || !isQuestionCategory(category)) {
    notFound();
  }

  const questions = NODEJS_TOPIC.questions.filter(
    (question) => question.category === category,
  );

  return (
    <TopicStudySession
      topicName={NODEJS_TOPIC.displayName}
      category={category}
      questions={questions}
      sessionMode="practice"
      backLink={{
        href: `/topics/${NODEJS_TOPIC.slug}`,
      }}
    />
  );
}
