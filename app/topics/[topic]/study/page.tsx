import { notFound } from "next/navigation";

import { TopicStudySession } from "@/components/TopicStudySession";
import { getStudyTopicById } from "@/data/study-topics";

type TopicStudyPageProps = {
  params: Promise<{ topic: string }>;
};

export default async function TopicStudyPage({ params }: TopicStudyPageProps) {
  const { topic } = await params;
  const studyTopic = getStudyTopicById(topic);

  if (!studyTopic) {
    notFound();
  }

  return (
    <TopicStudySession
      topicName={studyTopic.displayName.en}
      categories={studyTopic.categories}
      questions={studyTopic.questions}
      backLink={{
        href: `/topics/${studyTopic.id}`,
      }}
    />
  );
}
