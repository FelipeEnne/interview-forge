import { notFound } from "next/navigation";

import { getTopicById } from "@/data/topic-registry";
import { ChallengesList } from "./ChallengesList";

type TopicChallengesPageProps = {
  params: Promise<{ topic: string }>;
};

export default async function TopicChallengesPage({
  params,
}: TopicChallengesPageProps) {
  const { topic } = await params;
  const topicDefinition = getTopicById(topic);

  if (!topicDefinition || topicDefinition.id !== "nodejs") {
    notFound();
  }

  return <ChallengesList />;
}
