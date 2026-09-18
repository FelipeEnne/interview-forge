import { notFound } from "next/navigation";

import { TopicStudySession } from "@/components/TopicStudySession";
import {
  NODEJS_TOPIC,
  QUESTION_CATEGORY_LABELS,
  type QuestionCategory,
} from "@/data/nodejs-questions";

type CategoryStudyPageProps = {
  params: Promise<{ topic: string; category: string }>;
};

export default async function CategoryStudyPage({
  params,
}: CategoryStudyPageProps) {
  const { topic, category } = await params;

  if (
    topic !== NODEJS_TOPIC.slug ||
    !Object.hasOwn(QUESTION_CATEGORY_LABELS, category)
  ) {
    notFound();
  }

  const questionCategory = category as QuestionCategory;
  const questions = NODEJS_TOPIC.questions.filter(
    (question) => question.category === questionCategory,
  );

  return (
    <TopicStudySession
      topicName={`${NODEJS_TOPIC.displayName} — ${QUESTION_CATEGORY_LABELS[questionCategory]}`}
      questions={questions}
      sessionMode="practice"
      backLink={{
        href: `/topics/${NODEJS_TOPIC.slug}`,
        label: `Back to ${NODEJS_TOPIC.displayName}`,
      }}
    />
  );
}
