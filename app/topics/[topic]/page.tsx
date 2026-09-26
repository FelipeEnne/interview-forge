import { notFound } from "next/navigation";

import { getStudyTopicById } from "@/data/study-topics";
import { getQuizTopicById } from "@/data/quiz-topics";
import { getChallengeTopicById } from "@/data/challenge-topics";
import { getTopicById } from "@/data/topic-registry";
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

  return (
    <TopicOverview
      topic={topicDefinition}
      studyTopic={getStudyTopicById(topicDefinition.id)}
      quizTopic={getQuizTopicById(topicDefinition.id)}
      challengeTopic={getChallengeTopicById(topicDefinition.id)}
    />
  );
}
