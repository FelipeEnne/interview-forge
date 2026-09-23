import { notFound } from "next/navigation";

import { getStudyTopicById } from "@/data/study-topics";
import { getTopicById } from "@/data/topic-registry";
import { TopicComingSoon } from "./TopicComingSoon";
import { TopicOverview } from "./TopicOverview";

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;
  const topicDefinition = getTopicById(topic);

  if (!topicDefinition) {
    notFound();
  }

  if (topicDefinition.status === "coming-soon") {
    return <TopicComingSoon topic={topicDefinition} />;
  }

  const studyTopic = getStudyTopicById(topicDefinition.id);

  if (!studyTopic) {
    notFound();
  }

  return <TopicOverview topic={studyTopic} />;
}
