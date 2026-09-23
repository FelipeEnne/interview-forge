import { notFound } from "next/navigation";

import { TopicStudySession } from "@/components/study/TopicStudySession";
import { getStudyTopicById } from "@/data/study-topics";

type CategoryStudyPageProps = {
  params: Promise<{ topic: string; category: string }>;
};

export default async function CategoryStudyPage({
  params,
}: CategoryStudyPageProps) {
  const { topic, category } = await params;
  const studyTopic = getStudyTopicById(topic);
  const categoryDefinition = studyTopic?.categories.find(
    ({ id }) => id === category,
  );

  if (!studyTopic || !categoryDefinition) {
    notFound();
  }

  const questions = studyTopic.questions.filter(
    (question) => question.category === category,
  );

  return (
    <TopicStudySession
      topicName={studyTopic.displayName.en}
      category={category}
      categories={studyTopic.categories}
      questions={questions}
      sessionMode="practice"
      backLink={{
        href: `/topics/${studyTopic.id}`,
      }}
    />
  );
}
