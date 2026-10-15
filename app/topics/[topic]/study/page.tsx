import { notFound } from "next/navigation";

import { TopicStudySession } from "@/components/study/TopicStudySession";
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
      topicDisplayName={studyTopic.displayName}
      categories={studyTopic.categories}
      questions={studyTopic.questions}
      backLink={{
        href: `/topics/${studyTopic.id}`,
      }}
    />
  );
}
