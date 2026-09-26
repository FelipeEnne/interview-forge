import type { LocalizedText } from "@/i18n/localized-text";

type TopicId = "nodejs" | "react" | "angular";

export type TopicDefinition = {
  id: TopicId;
  displayName: LocalizedText;
};

export const TOPICS: readonly TopicDefinition[] = [
  {
    id: "nodejs",
    displayName: { en: "Node.js", pt: "Node.js" },
  },
  {
    id: "react",
    displayName: { en: "React", pt: "React" },
  },
  {
    id: "angular",
    displayName: { en: "Angular", pt: "Angular" },
  },
];

export function getTopicById(id: string): TopicDefinition | undefined {
  return TOPICS.find((topic) => topic.id === id);
}
