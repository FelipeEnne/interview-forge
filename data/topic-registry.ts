import type { LocalizedText } from "@/i18n/localized-text";

export type TopicId = "nodejs" | "react" | "angular";

export type TopicStatus = "available" | "coming-soon";

export type TopicDefinition = {
  id: TopicId;
  displayName: LocalizedText;
  status: TopicStatus;
};

export const TOPICS: readonly TopicDefinition[] = [
  {
    id: "nodejs",
    displayName: { en: "Node.js", pt: "Node.js" },
    status: "available",
  },
  {
    id: "react",
    displayName: { en: "React", pt: "React" },
    status: "available",
  },
  {
    id: "angular",
    displayName: { en: "Angular", pt: "Angular" },
    status: "available",
  },
];

export function getTopicById(id: string): TopicDefinition | undefined {
  return TOPICS.find((topic) => topic.id === id);
}
