import { notFound } from "next/navigation";

import { TopicStudySession } from "@/components/TopicStudySession";
import { NODEJS_TOPIC } from "@/data/nodejs-questions";

type TopicStudyPageProps = {
  params: Promise<{ topic: string }>;
};

export default async function TopicStudyPage({ params }: TopicStudyPageProps) {
  const { topic } = await params;

  if (topic !== NODEJS_TOPIC.slug) {
    notFound();
  }

  return (
    <TopicStudySession
      topicName={NODEJS_TOPIC.displayName}
      questions={NODEJS_TOPIC.questions}
      backLink={{
        href: `/topics/${NODEJS_TOPIC.slug}`,
        label: `Back to ${NODEJS_TOPIC.displayName}`,
      }}
    />
  );
}
