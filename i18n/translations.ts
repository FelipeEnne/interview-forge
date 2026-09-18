import type { QuestionCategory } from "@/data/nodejs-questions";
import type { RecallRating } from "@/domain/recall-rating";

import type { Locale } from "./locale";

const englishMessages = {
  appName: "InterviewForge",
  languageSelector: "Language",
  homeTagline: "Practice technical interview questions one topic at a time.",
  studyNodejsQuestions: "Study Node.js questions",
  studyDueQuestions: "Study due questions",
  takeProficiencyQuiz: "Take proficiency quiz",
  practiceCodingChallenges: "Practice coding challenges",
  categories: "Categories",
  performance: "Performance",
  studyCategory: "Study {label}",
  correctCount: "{correct} / {total} correct",
  preparingStudySession: "Preparing study session...",
  sessionComplete: "Session complete",
  studyAgain: "Study again",
  allCaughtUp: "You're all caught up",
  noQuestionsDue: "No questions are due for review right now.",
  studyAllQuestions: "Study all questions",
  showAnswer: "Show answer",
  topicCategoryTitle: "{topic} — {category}",
  backToTopic: "Back to {topic}",
  backToChallenges: "Back to challenges",
  quizTitle: "Node.js Proficiency Quiz",
  quizQuestionCount: "{count} questions",
  quizDuration: "{minutes} minutes",
  startQuiz: "Start quiz",
  timeRemaining: "Time remaining: {time}",
  questionProgress: "Question {current} of {total}",
  chooseAnswer: "Choose an answer",
  next: "Next",
  finishQuiz: "Finish quiz",
  tryAgain: "Try again",
  challengesTitle: "Node.js Coding Challenges",
  requirements: "Requirements",
  starterCode: "Starter code",
  reviewChecklist: "Review checklist",
  revealSolution: "Reveal solution",
  referenceSolution: "Reference solution",
} as const;

type MessageKey = keyof typeof englishMessages;
type Messages = Record<MessageKey, string>;

const portugueseMessages: Messages = {
  appName: "InterviewForge",
  languageSelector: "Idioma",
  homeTagline: "Pratique perguntas de entrevista técnica um tópico de cada vez.",
  studyNodejsQuestions: "Estudar perguntas de Node.js",
  studyDueQuestions: "Estudar perguntas pendentes",
  takeProficiencyQuiz: "Fazer quiz de proficiência",
  practiceCodingChallenges: "Praticar desafios de código",
  categories: "Categorias",
  performance: "Desempenho",
  studyCategory: "Estudar {label}",
  correctCount: "{correct} / {total} corretas",
  preparingStudySession: "Preparando sessão de estudo...",
  sessionComplete: "Sessão concluída",
  studyAgain: "Estudar novamente",
  allCaughtUp: "Você está em dia",
  noQuestionsDue: "Nenhuma pergunta está pendente de revisão agora.",
  studyAllQuestions: "Estudar todas as perguntas",
  showAnswer: "Mostrar resposta",
  topicCategoryTitle: "{topic} — {category}",
  backToTopic: "Voltar para {topic}",
  backToChallenges: "Voltar para os desafios",
  quizTitle: "Quiz de Proficiência em Node.js",
  quizQuestionCount: "{count} perguntas",
  quizDuration: "{minutes} minutos",
  startQuiz: "Começar quiz",
  timeRemaining: "Tempo restante: {time}",
  questionProgress: "Pergunta {current} de {total}",
  chooseAnswer: "Escolha uma resposta",
  next: "Próxima",
  finishQuiz: "Finalizar quiz",
  tryAgain: "Tentar novamente",
  challengesTitle: "Desafios de Código em Node.js",
  requirements: "Requisitos",
  starterCode: "Código inicial",
  reviewChecklist: "Checklist de revisão",
  revealSolution: "Revelar solução",
  referenceSolution: "Solução de referência",
};

const messages: Record<Locale, Messages> = {
  en: englishMessages,
  pt: portugueseMessages,
};

const categoryLabels: Record<Locale, Record<QuestionCategory, string>> = {
  en: {
    fundamentals: "Fundamentals",
    async: "Event Loop & Async",
    modules: "Modules",
    http: "HTTP & APIs",
    express: "Express",
    streams: "Streams & Buffers",
    testing: "Testing",
    security: "Security",
    production: "Production & Architecture",
  },
  pt: {
    fundamentals: "Fundamentos",
    async: "Event Loop e Assincronismo",
    modules: "Módulos",
    http: "HTTP e APIs",
    express: "Express",
    streams: "Streams e Buffers",
    testing: "Testes",
    security: "Segurança",
    production: "Produção e Arquitetura",
  },
};

const ratingLabels: Record<Locale, Record<RecallRating, string>> = {
  en: {
    again: "Again",
    hard: "Hard",
    good: "Good",
    easy: "Easy",
  },
  pt: {
    again: "Novamente",
    hard: "Difícil",
    good: "Bom",
    easy: "Fácil",
  },
};

export type { MessageKey };

export function translate(
  locale: Locale,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  const template = messages[locale][key];

  if (!vars) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (placeholder, name: string) => {
    const value = vars[name];
    return value === undefined ? placeholder : String(value);
  });
}

export function getCategoryLabel(
  locale: Locale,
  category: QuestionCategory,
): string {
  return categoryLabels[locale][category];
}

export function getRatingLabel(locale: Locale, rating: RecallRating): string {
  return ratingLabels[locale][rating];
}

export function formatQuestionsReviewed(locale: Locale, count: number): string {
  if (locale === "pt") {
    return count === 1 ? "1 pergunta revisada" : `${count} perguntas revisadas`;
  }

  return count === 1 ? "1 question reviewed" : `${count} questions reviewed`;
}
