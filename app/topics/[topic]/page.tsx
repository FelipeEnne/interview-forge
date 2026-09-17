import { notFound } from "next/navigation";

import { TopicStudySession } from "@/components/TopicStudySession";
import { NODEJS_TOPIC } from "@/data/nodejs-questions";

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;

  if (topic !== NODEJS_TOPIC.slug) {
    notFound();
  }

  return (
    <TopicStudySession
      topicName={NODEJS_TOPIC.displayName}
      questions={NODEJS_TOPIC.questions}
    />
  );
}
