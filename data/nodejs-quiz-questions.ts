import type { LocalizedText } from "@/i18n/localized-text";

import type { QuestionCategory } from "./nodejs-questions";

export type QuizQuestion = {
  id: string;
  category: QuestionCategory;
  question: LocalizedText;
  options: readonly [LocalizedText, LocalizedText, LocalizedText, LocalizedText];
  correctOption: 0 | 1 | 2 | 3;
};

export const NODEJS_QUIZ_QUESTIONS: readonly QuizQuestion[] = [
  {
    id: "quiz-nodejs-runtime",
    category: "fundamentals",
    question: {
      en: "What is Node.js primarily used as?",
      pt: "O Node.js é usado principalmente como o quê?",
    },
    options: [
      {
        en: "A browser engine for rendering HTML",
        pt: "Um motor de browser para renderizar HTML",
      },
      {
        en: "A JavaScript runtime for running JavaScript outside the browser",
        pt: "Um runtime de JavaScript para executar JavaScript fora do browser",
      },
      {
        en: "A relational database for JavaScript applications",
        pt: "Um banco relacional para aplicações JavaScript",
      },
      {
        en: "A CSS preprocessor for backend templates",
        pt: "Um preprocessador CSS para templates de backend",
      },
    ],
    correctOption: 1,
  },
  {
    id: "quiz-v8-libuv",
    category: "fundamentals",
    question: {
      en: "Which pair best describes the roles of V8 and libuv in Node.js?",
      pt: "Qual par descreve melhor os papéis do V8 e do libuv no Node.js?",
    },
    options: [
      {
        en: "V8 serves HTTP requests; libuv compiles JavaScript",
        pt: "V8 atende requests HTTP; libuv compila JavaScript",
      },
      {
        en: "V8 stores files on disk; libuv renders the UI",
        pt: "V8 guarda arquivos em disco; libuv renderiza a UI",
      },
      {
        en: "V8 executes JavaScript; libuv provides the event loop and async I/O",
        pt: "V8 executa JavaScript; libuv fornece o Event Loop e I/O assíncrono",
      },
      {
        en: "V8 manages npm packages; libuv types TypeScript",
        pt: "V8 gerencia pacotes npm; libuv tipa TypeScript",
      },
    ],
    correctOption: 2,
  },
  {
    id: "quiz-event-loop-purpose",
    category: "async",
    question: {
      en: "Why does the Node.js event loop matter for servers?",
      pt: "Por que o Event Loop do Node.js importa para servidores?",
    },
    options: [
      {
        en: "It starts a new operating-system process for every incoming request",
        pt: "Ele inicia um novo processo do sistema operacional para cada request que chega",
      },
      {
        en: "It lets one thread schedule callbacks so slow I/O does not block other work",
        pt: "Ele permite que uma thread agende callbacks para I/O lento não bloquear outro trabalho",
      },
      {
        en: "It compiles TypeScript before each request reaches a handler",
        pt: "Ele compila TypeScript antes de cada request chegar a um handler",
      },
      {
        en: "It guarantees every callback runs in a dedicated worker thread",
        pt: "Ele garante que todo callback rode em uma worker thread dedicada",
      },
    ],
    correctOption: 1,
  },
  {
    id: "quiz-blocking-work",
    category: "async",
    question: {
      en: "Which kind of work is most likely to block the Node.js event loop?",
      pt: "Que tipo de trabalho tem mais chance de bloquear o Event Loop do Node.js?",
    },
    options: [
      {
        en: "Awaiting a network response with an async HTTP client",
        pt: "Esperar uma response de rede com um HTTP client assíncrono",
      },
      {
        en: "Listening for a timer with setTimeout",
        pt: "Escutar um timer com setTimeout",
      },
      {
        en: "A long synchronous CPU loop on the main thread",
        pt: "Um loop síncrono longo de CPU na thread principal",
      },
      {
        en: "Reading a file with fs.promises.readFile",
        pt: "Ler um arquivo com fs.promises.readFile",
      },
    ],
    correctOption: 2,
  },
  {
    id: "quiz-async-await-errors",
    category: "async",
    question: {
      en: "How should a rejected promise from an async function be handled?",
      pt: "Como uma promise rejeitada de uma função async deve ser tratada?",
    },
    options: [
      {
        en: "Ignore it; Node converts every rejection into a successful empty result",
        pt: "Ignore; o Node converte toda rejection em um resultado vazio de sucesso",
      },
      {
        en: "Catch it with try/catch or attach a rejection handler so the failure is observed",
        pt: "Capture com try/catch ou anexe um handler de rejection para a falha ser observada",
      },
      {
        en: "Call process.exit immediately from inside the async function",
        pt: "Chame process.exit imediatamente de dentro da função async",
      },
      {
        en: "Wrap the function in JSON.stringify so errors become strings",
        pt: "Envolva a função em JSON.stringify para os erros virarem strings",
      },
    ],
    correctOption: 1,
  },
  {
    id: "quiz-nexttick-microtasks",
    category: "async",
    question: {
      en: "What can happen if process.nextTick or promise microtasks are scheduled recursively without bound?",
      pt: "O que pode acontecer se process.nextTick ou microtasks de promise forem agendados de forma recursiva sem limite?",
    },
    options: [
      {
        en: "I/O callbacks can be starved because those queues run before later event-loop phases",
        pt: "Callbacks de I/O podem ser famintos porque essas filas rodam antes das fases posteriores do Event Loop",
      },
      {
        en: "Node automatically moves the work onto the GPU",
        pt: "O Node move o trabalho automaticamente para a GPU",
      },
      {
        en: "The event loop skips timers forever and then shuts down cleanly",
        pt: "O Event Loop pula timers para sempre e depois encerra de forma limpa",
      },
      {
        en: "Libuv converts the callbacks into synchronous file writes",
        pt: "O libuv converte os callbacks em escritas síncronas de arquivo",
      },
    ],
    correctOption: 0,
  },
  {
    id: "quiz-cjs-esm",
    category: "modules",
    question: {
      en: "How do CommonJS and ES Modules typically load in Node.js?",
      pt: "Como CommonJS e ES Modules costumam carregar no Node.js?",
    },
    options: [
      {
        en: "Both always load asynchronously through HTTP",
        pt: "Os dois sempre carregam de forma assíncrona via HTTP",
      },
      {
        en: "CommonJS uses require and loads synchronously; ES Modules use import/export",
        pt: "CommonJS usa require e carrega de forma síncrona; ES Modules usam import/export",
      },
      {
        en: "ES Modules use require; CommonJS uses import only",
        pt: "ES Modules usam require; CommonJS usa só import",
      },
      {
        en: "Neither system caches modules after the first load",
        pt: "Nenhum dos dois sistemas coloca módulos em cache depois do primeiro load",
      },
    ],
    correctOption: 1,
  },
  {
    id: "quiz-module-cache",
    category: "modules",
    question: {
      en: "What is a practical consequence of Node.js module caching?",
      pt: "Qual é uma consequência prática do cache de módulos no Node.js?",
    },
    options: [
      {
        en: "Every import re-executes the module from disk",
        pt: "Todo import reexecuta o módulo a partir do disco",
      },
      {
        en: "Later imports of the same resolved module reuse one instance, so module-level state can be shared",
        pt: "Imports posteriores do mesmo módulo resolvido reutilizam uma instância, então estado no nível do módulo pode ser compartilhado",
      },
      {
        en: "Cached modules cannot export functions",
        pt: "Módulos em cache não podem exportar funções",
      },
      {
        en: "Caching only applies to JSON files, not JavaScript",
        pt: "O cache vale só para arquivos JSON, não para JavaScript",
      },
    ],
    correctOption: 1,
  },
  {
    id: "quiz-http-handler",
    category: "http",
    question: {
      en: "In a basic Node.js HTTP server, what does the request handler receive for each request?",
      pt: "Em um servidor HTTP básico de Node.js, o que o request handler recebe em cada request?",
    },
    options: [
      {
        en: "A database transaction and a CSS stylesheet",
        pt: "Uma transaction de banco e uma stylesheet CSS",
      },
      {
        en: "Request and response objects used to inspect the request and send a response",
        pt: "Objetos request e response usados para inspecionar a request e enviar uma response",
      },
      {
        en: "A compiled WebAssembly module and a thread pool",
        pt: "Um módulo WebAssembly compilado e um thread pool",
      },
      {
        en: "Only a numeric status code with no headers or body",
        pt: "Só um status code numérico, sem headers nem body",
      },
    ],
    correctOption: 1,
  },
  {
    id: "quiz-http-idempotency",
    category: "http",
    question: {
      en: "Which statement about HTTP idempotency is correct?",
      pt: "Qual afirmação sobre idempotência HTTP está correta?",
    },
    options: [
      {
        en: "POST is always idempotent; GET is never idempotent",
        pt: "POST é sempre idempotente; GET nunca é idempotente",
      },
      {
        en: "Repeating GET, PUT, or DELETE should have the same intended effect as sending the request once",
        pt: "Repetir GET, PUT ou DELETE deve ter o mesmo efeito pretendido de enviar a request uma vez",
      },
      {
        en: "Idempotency means the response body must be empty",
        pt: "Idempotência significa que o body da response precisa estar vazio",
      },
      {
        en: "Only WebSocket upgrade requests can be idempotent",
        pt: "Só requests de upgrade WebSocket podem ser idempotentes",
      },
    ],
    correctOption: 1,
  },
  {
    id: "quiz-http-status-errors",
    category: "http",
    question: {
      en: "Which status-code family should a Node.js API use for unexpected server failures?",
      pt: "Qual família de status code uma API Node.js deve usar para falhas inesperadas do servidor?",
    },
    options: [
      { en: "2xx", pt: "2xx" },
      { en: "3xx", pt: "3xx" },
      { en: "4xx", pt: "4xx" },
      { en: "5xx", pt: "5xx" },
    ],
    correctOption: 3,
  },
  {
    id: "quiz-express-middleware",
    category: "express",
    question: {
      en: "What is Express middleware?",
      pt: "O que é middleware do Express?",
    },
    options: [
      {
        en: "A function with access to the request, response, and next callback in the request pipeline",
        pt: "Uma função com acesso a request, response e ao callback next no pipeline da request",
      },
      {
        en: "A SQL migration that Express runs before listening",
        pt: "Uma migration SQL que o Express roda antes de escutar",
      },
      {
        en: "A browser plugin required to call an Express API",
        pt: "Um plugin de browser necessário para chamar uma API Express",
      },
      {
        en: "A Node.js core module that replaces http.createServer",
        pt: "Um módulo core do Node.js que substitui http.createServer",
      },
    ],
    correctOption: 0,
  },
  {
    id: "quiz-express-error-middleware",
    category: "express",
    question: {
      en: "How should unexpected errors be handled in Express?",
      pt: "Como erros inesperados devem ser tratados no Express?",
    },
    options: [
      {
        en: "Swallow them in each route and return 200 with an empty body",
        pt: "Engolir o erro em cada rota e devolver 200 com body vazio",
      },
      {
        en: "Propagate them to centralized error-handling middleware and avoid leaking stack traces to clients",
        pt: "Propagá-los para um middleware centralizado de error handling e evitar vazar stack traces para os clients",
      },
      {
        en: "Restart the whole operating system from the route handler",
        pt: "Reiniciar o sistema operacional inteiro a partir do route handler",
      },
      {
        en: "Convert every error into a 301 redirect",
        pt: "Converter todo erro em um redirect 301",
      },
    ],
    correctOption: 1,
  },
  {
    id: "quiz-stream-types",
    category: "streams",
    question: {
      en: "Which description of Node.js stream types is accurate?",
      pt: "Qual descrição dos tipos de stream do Node.js está correta?",
    },
    options: [
      {
        en: "Readable produces data, writable consumes it, duplex does both, and transform modifies data in transit",
        pt: "Readable produz dados, writable consome, duplex faz os dois, e transform modifica dados em trânsito",
      },
      {
        en: "All streams can only move strings encoded as UTF-32",
        pt: "Todos os streams só conseguem mover strings em UTF-32",
      },
      {
        en: "Duplex streams can only write; transform streams can only read",
        pt: "Duplex streams só escrevem; transform streams só leem",
      },
      {
        en: "Streams load the entire payload into memory before emitting any data",
        pt: "Streams carregam o payload inteiro na memória antes de emitir qualquer dado",
      },
    ],
    correctOption: 0,
  },
  {
    id: "quiz-stream-pipeline",
    category: "streams",
    question: {
      en: "Why prefer stream.pipeline() when connecting streams?",
      pt: "Por que preferir stream.pipeline() ao conectar streams?",
    },
    options: [
      {
        en: "It disables backpressure so producers never pause",
        pt: "Ele desativa backpressure para producers nunca pausarem",
      },
      {
        en: "It coordinates backpressure, forwards errors, and cleans up streams when one fails",
        pt: "Ele coordena backpressure, encaminha erros e faz cleanup dos streams quando um falha",
      },
      {
        en: "It converts every stream into a Promise that never settles",
        pt: "Ele converte todo stream em uma Promise que nunca settled",
      },
      {
        en: "It only works for TCP sockets, not files",
        pt: "Ele só funciona para sockets TCP, não para arquivos",
      },
    ],
    correctOption: 1,
  },
  {
    id: "quiz-unit-vs-integration",
    category: "testing",
    question: {
      en: "What is the main difference between unit and integration tests for a Node.js service?",
      pt: "Qual é a principal diferença entre testes unitários e de integração para um serviço Node.js?",
    },
    options: [
      {
        en: "Unit tests always hit a production database; integration tests never do",
        pt: "Testes unitários sempre batem em um banco de produção; testes de integração nunca fazem isso",
      },
      {
        en: "Unit tests exercise a small behavior with controlled dependencies; integration tests check real boundaries working together",
        pt: "Testes unitários exercitam um comportamento pequeno com dependências controladas; testes de integração verificam fronteiras reais trabalhando juntas",
      },
      {
        en: "Integration tests cannot assert HTTP status codes",
        pt: "Testes de integração não conseguem fazer assert de HTTP status codes",
      },
      {
        en: "Unit tests must sleep for a fixed number of seconds",
        pt: "Testes unitários precisam dormir um número fixo de segundos",
      },
    ],
    correctOption: 1,
  },
  {
    id: "quiz-testing-async",
    category: "testing",
    question: {
      en: "How should asynchronous Node.js code be tested reliably?",
      pt: "Como código Node.js assíncrono deve ser testado de forma confiável?",
    },
    options: [
      {
        en: "Return or await the promise so the runner knows when work finishes, and assert success and rejection paths",
        pt: "Retorne ou faça await da promise para o runner saber quando o trabalho termina, e faça assert dos caminhos de sucesso e rejection",
      },
      {
        en: "Use arbitrary sleeps and ignore rejected promises",
        pt: "Use sleeps arbitrários e ignore promises rejeitadas",
      },
      {
        en: "Never wait for promises; assert immediately after calling the function",
        pt: "Nunca espere promises; faça assert imediatamente depois de chamar a função",
      },
      {
        en: "Mock Date.now in every test even when time is unused",
        pt: "Mocke Date.now em todo teste mesmo quando o tempo não é usado",
      },
    ],
    correctOption: 0,
  },
  {
    id: "quiz-input-validation",
    category: "security",
    question: {
      en: "Why must a Node.js API validate untrusted input?",
      pt: "Por que uma API Node.js precisa validar input não confiável?",
    },
    options: [
      {
        en: "TypeScript types already enforce runtime request bodies",
        pt: "Tipos do TypeScript já impõem bodies de request em runtime",
      },
      {
        en: "Runtime input can be malformed or malicious, so shape, type, size, and allowed values must be checked at trust boundaries",
        pt: "Input em runtime pode vir malformado ou malicioso, então formato, tipo, tamanho e valores permitidos precisam ser checados nas fronteiras de confiança",
      },
      {
        en: "Validation is only needed for GET query strings, never JSON bodies",
        pt: "Validação só é necessária para query strings de GET, nunca para bodies JSON",
      },
      {
        en: "Validating input makes HTTPS unnecessary",
        pt: "Validar input torna HTTPS desnecessário",
      },
    ],
    correctOption: 1,
  },
  {
    id: "quiz-authn-authz",
    category: "security",
    question: {
      en: "What is the difference between authentication and authorization?",
      pt: "Qual é a diferença entre authentication e authorization?",
    },
    options: [
      {
        en: "They are two names for TLS certificate pinning",
        pt: "São dois nomes para TLS certificate pinning",
      },
      {
        en: "Authentication establishes who the caller is; authorization decides what that identity may do",
        pt: "Authentication estabelece quem é o caller; authorization decide o que aquela identidade pode fazer",
      },
      {
        en: "Authorization proves identity; authentication assigns HTTP status codes",
        pt: "Authorization prova identidade; authentication atribui HTTP status codes",
      },
      {
        en: "Neither is needed if the API uses JSON",
        pt: "Nenhum dos dois é necessário se a API usa JSON",
      },
    ],
    correctOption: 1,
  },
  {
    id: "quiz-api-security-baseline",
    category: "security",
    question: {
      en: "Which set is a reasonable baseline for a public Node.js API?",
      pt: "Qual conjunto é uma baseline razoável para uma API Node.js pública?",
    },
    options: [
      {
        en: "Plain HTTP only, unlimited request bodies, and secrets committed to git",
        pt: "Só HTTP puro, bodies de request ilimitados e secrets commitados no git",
      },
      {
        en: "TLS, input limits, authn/authz, rate limiting, and errors that omit internal details",
        pt: "TLS, limites de input, authn/authz, rate limiting e erros que omitem detalhes internos",
      },
      {
        en: "Disable all logging so attackers cannot be observed",
        pt: "Desligar todo logging para atacantes não serem observados",
      },
      {
        en: "Trust every Origin header and skip CORS rules",
        pt: "Confiar em todo header Origin e pular regras de CORS",
      },
    ],
    correctOption: 1,
  },
];
