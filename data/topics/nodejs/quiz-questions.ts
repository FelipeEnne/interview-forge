import type { QuizQuestion } from "@/data/quiz-types";

import type { QuestionCategory } from "./categories";

export const NODEJS_QUIZ_QUESTIONS: readonly QuizQuestion<QuestionCategory>[] = [
  {
    id: "quiz-nodejs-runtime",
    category: "fundamentals",
    question: {
      en: "What is Node.js primarily used as?",
      pt: "O Node.js é usado principalmente como o quê?",
    },
    options: [
      {
        en: "A JavaScript runtime for running JavaScript outside the browser",
        pt: "Um runtime de JavaScript para executar JavaScript fora do browser",
      },
      {
        en: "A JavaScript engine used only to render pages inside a browser",
        pt: "Um engine de JavaScript usado só para renderizar páginas dentro de um browser",
      },
      {
        en: "A JavaScript package manager for installing libraries from a registry",
        pt: "Um gerenciador de pacotes JavaScript para instalar bibliotecas de um registry",
      },
      {
        en: "A JavaScript compiler that turns TypeScript into browser bundles",
        pt: "Um compilador JavaScript que transforma TypeScript em bundles de browser",
      },
    ],
    correctOption: 0,
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
        en: "V8 compiles JavaScript; libuv executes it on a dedicated thread",
        pt: "V8 compila JavaScript; libuv executa em uma thread dedicada",
      },
      {
        en: "V8 manages worker threads; libuv executes JavaScript on the main thread",
        pt: "V8 gerencia worker threads; libuv executa JavaScript na thread principal",
      },
      {
        en: "V8 executes JavaScript; libuv provides the event loop and async I/O",
        pt: "V8 executa JavaScript; libuv fornece o Event Loop e I/O assíncrono",
      },
      {
        en: "V8 provides the event loop; libuv executes JavaScript on worker threads",
        pt: "V8 fornece o Event Loop; libuv executa JavaScript em worker threads",
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
        en: "It runs each callback on a dedicated worker thread to isolate failures",
        pt: "Ele roda cada callback em uma worker thread dedicada para isolar falhas",
      },
      {
        en: "It lets one thread schedule I/O callbacks without blocking other work",
        pt: "Ele permite que uma thread agende callbacks de I/O sem bloquear outro trabalho",
      },
      {
        en: "It waits until every request finishes before accepting another connection",
        pt: "Ele espera cada request terminar antes de aceitar outra conexão",
      },
    ],
    correctOption: 2,
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
        en: "Leave it unhandled so Node converts the rejection into a successful result",
        pt: "Deixe sem tratamento para o Node converter a rejection em um resultado de sucesso",
      },
      {
        en: "Attach only a then() fulfillment handler and skip any catch() path",
        pt: "Anexe só um handler then() de fulfillment e pule qualquer caminho catch()",
      },
      {
        en: "Replace the rejection with process.nextTick so the error is deferred forever",
        pt: "Troque a rejection por process.nextTick para o erro ficar adiado para sempre",
      },
      {
        en: "Catch it with try/catch or attach a rejection handler so the failure is observed",
        pt: "Capture com try/catch ou anexe um handler de rejection para a falha ser observada",
      },
    ],
    correctOption: 3,
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
        en: "Timer callbacks run first, so nextTick work is delayed until after all I/O",
        pt: "Callbacks de timer rodam primeiro, então nextTick só ocorre depois de todo I/O",
      },
      {
        en: "Worker threads drain the queue, so the main thread skips I/O until shutdown",
        pt: "Worker threads drenam a fila, então a thread principal pula I/O até o shutdown",
      },
      {
        en: "setImmediate callbacks run first and prevent microtasks from running at all",
        pt: "Callbacks de setImmediate rodam primeiro e impedem microtasks de rodarem",
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
        en: "CommonJS uses import/export asynchronously; ES Modules use require synchronously",
        pt: "CommonJS usa import/export de forma assíncrona; ES Modules usam require de forma síncrona",
      },
      {
        en: "CommonJS uses require over HTTP; ES Modules use import only from JSON files",
        pt: "CommonJS usa require via HTTP; ES Modules usam import só a partir de arquivos JSON",
      },
      {
        en: "CommonJS uses require and loads synchronously; ES Modules use import/export",
        pt: "CommonJS usa require e carrega de forma síncrona; ES Modules usam import/export",
      },
      {
        en: "CommonJS uses import only; ES Modules use require and never cache after load",
        pt: "CommonJS usa só import; ES Modules usam require e nunca colocam em cache depois do load",
      },
    ],
    correctOption: 2,
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
        en: "Every later import re-executes the module from disk and isolates its state",
        pt: "Todo import posterior reexecuta o módulo a partir do disco e isola o estado",
      },
      {
        en: "Cached modules reuse the file path but create a new instance on every import",
        pt: "Módulos em cache reutilizam o caminho do arquivo, mas criam uma instância nova em cada import",
      },
      {
        en: "Caching applies only to JSON, so JavaScript modules reload and isolate state",
        pt: "O cache vale só para JSON, então módulos JavaScript recarregam e isolam o estado",
      },
      {
        en: "Later imports of the same resolved module reuse one instance, sharing its state",
        pt: "Imports posteriores do mesmo módulo resolvido reutilizam uma instância, compartilhando o estado",
      },
    ],
    correctOption: 3,
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
        en: "Only a numeric status code used to inspect the request and send a response",
        pt: "Só um status code numérico usado para inspecionar a request e enviar uma response",
      },
      {
        en: "A raw TCP socket pair used to inspect the request and send a response",
        pt: "Um par de sockets TCP crus usado para inspecionar a request e enviar uma response",
      },
      {
        en: "Request and response objects used to inspect the request and send a response",
        pt: "Objetos request e response usados para inspecionar a request e enviar uma response",
      },
      {
        en: "A single IncomingMessage used to inspect the request and send a response",
        pt: "Um único IncomingMessage usado para inspecionar a request e enviar uma response",
      },
    ],
    correctOption: 2,
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
        en: "Repeating POST should have the same intended effect; repeating GET should not",
        pt: "Repetir POST deve ter o mesmo efeito pretendido; repetir GET não deve",
      },
      {
        en: "Repeating GET, PUT, or DELETE is allowed only when the response body is empty",
        pt: "Repetir GET, PUT ou DELETE só é permitido quando o body da response está vazio",
      },
      {
        en: "Repeating GET, PUT, or DELETE applies only to WebSocket upgrade requests",
        pt: "Repetir GET, PUT ou DELETE vale só para requests de upgrade WebSocket",
      },
      {
        en: "Repeating GET, PUT, or DELETE should have the same intended effect as one request",
        pt: "Repetir GET, PUT ou DELETE deve ter o mesmo efeito pretendido de uma request",
      },
    ],
    correctOption: 3,
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
        en: "A function with access to request, response, and next in the request pipeline",
        pt: "Uma função com acesso a request, response e next no pipeline da request",
      },
      {
        en: "A four-argument function used only for errors, with err before request and response",
        pt: "Uma função de quatro argumentos usada só para erros, com err antes de request e response",
      },
      {
        en: "A route handler with request and response only, and no next callback to call",
        pt: "Um route handler só com request e response, e sem callback next para chamar",
      },
      {
        en: "A replacement for http.createServer that skips the request pipeline entirely",
        pt: "Um substituto de http.createServer que ignora o pipeline da request por completo",
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
        en: "Swallow them in each route and return 200 without telling the client what failed",
        pt: "Engoli-los em cada rota e devolver 200 sem dizer ao client o que falhou",
      },
      {
        en: "Convert them in each route to a 301 redirect that hides the original error",
        pt: "Convertê-los em cada rota em um redirect 301 que esconde o erro original",
      },
      {
        en: "Send the full stack trace on every 200 response so clients can debug the failure",
        pt: "Enviar o stack trace completo em toda response 200 para clients debugarem a falha",
      },
      {
        en: "Propagate them to centralized error-handling middleware without leaking stack traces",
        pt: "Propagá-los para um middleware centralizado de error handling sem vazar stack traces",
      },
    ],
    correctOption: 3,
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
        en: "Readable consumes data, writable produces it, duplex only writes, and transform only reads",
        pt: "Readable consome dados, writable produz, duplex só escreve, e transform só lê",
      },
      {
        en: "Readable buffers everything first, writable never pauses, duplex only reads, and transform only writes",
        pt: "Readable bufferiza tudo primeiro, writable nunca pausa, duplex só lê, e transform só escreve",
      },
      {
        en: "Readable and writable only move UTF-32 text, duplex only writes, and transform only reads",
        pt: "Readable e writable só movem texto UTF-32, duplex só escreve, e transform só lê",
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
        en: "It disables backpressure, swallows errors, and keeps streams open after a failure",
        pt: "Ele desativa backpressure, engole erros e mantém streams abertos depois de uma falha",
      },
      {
        en: "It coordinates backpressure, forwards errors, and cleans up streams when one fails",
        pt: "Ele coordena backpressure, encaminha erros e faz cleanup dos streams quando um falha",
      },
      {
        en: "It ignores backpressure, converts errors into empty chunks, and never destroys streams",
        pt: "Ele ignora backpressure, converte erros em chunks vazios e nunca destrói streams",
      },
      {
        en: "It only works for TCP sockets, skips error forwarding, and leaves failed files open",
        pt: "Ele só funciona para sockets TCP, pula o encaminhamento de erros e deixa arquivos falhos abertos",
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
        en: "Unit tests always hit a live production database; integration tests never use real boundaries",
        pt: "Testes unitários sempre batem em um banco de produção ao vivo; testes de integração nunca usam fronteiras reais",
      },
      {
        en: "Unit tests cover one behavior with controlled dependencies; integration tests check real boundaries together",
        pt: "Testes unitários cobrem um comportamento com dependências controladas; testes de integração checam fronteiras reais juntas",
      },
      {
        en: "Unit tests must sleep for a fixed timeout; integration tests cannot assert HTTP status codes",
        pt: "Testes unitários precisam dormir um timeout fixo; testes de integração não conseguem fazer assert de HTTP status codes",
      },
      {
        en: "Unit tests replace the whole process with mocks; integration tests avoid any real boundaries",
        pt: "Testes unitários substituem o processo inteiro por mocks; testes de integração evitam qualquer fronteira real",
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
        en: "Use arbitrary sleeps instead of awaiting completion, and skip assertions on rejected promises",
        pt: "Use sleeps arbitrários em vez de await da conclusão, e pule asserts em promises rejeitadas",
      },
      {
        en: "Assert immediately after calling the function, and never wait for the returned promise to settle",
        pt: "Faça assert imediatamente depois de chamar a função, e nunca espere a promise retornada settled",
      },
      {
        en: "Mock Date.now in every async test, and ignore rejected promises that fail after the test returns",
        pt: "Mocke Date.now em todo teste async, e ignore promises rejeitadas que falham depois do teste retornar",
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
        en: "TypeScript types already enforce request bodies at runtime, so shape and size checks are redundant at trust boundaries",
        pt: "Tipos do TypeScript já impõem bodies de request em runtime, então checagens de formato e tamanho são redundantes nas fronteiras de confiança",
      },
      {
        en: "Runtime input can be malformed or malicious, so shape, type, size, and allowed values must be checked at trust boundaries",
        pt: "Input em runtime pode vir malformado ou malicioso, então formato, tipo, tamanho e valores permitidos precisam ser checados nas fronteiras de confiança",
      },
      {
        en: "Validation is only needed for GET query strings, so JSON bodies can skip shape, type, and size checks at trust boundaries",
        pt: "Validação só é necessária para query strings de GET, então bodies JSON podem pular checagens de formato, tipo e tamanho nas fronteiras de confiança",
      },
      {
        en: "Validating input makes HTTPS unnecessary, so type, size, and allowed values can skip checks at trust boundaries",
        pt: "Validar input torna HTTPS desnecessário, então tipo, tamanho e valores permitidos podem pular checagens nas fronteiras de confiança",
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
        en: "Authentication decides what the caller may do; authorization establishes who that identity is",
        pt: "Authentication decide o que o caller pode fazer; authorization estabelece quem é aquela identidade",
      },
      {
        en: "Authentication establishes who the caller is; authorization decides what that identity may do",
        pt: "Authentication estabelece quem é o caller; authorization decide o que aquela identidade pode fazer",
      },
      {
        en: "Authentication assigns HTTP status codes; authorization proves identity with a TLS certificate",
        pt: "Authentication atribui HTTP status codes; authorization prova identidade com um certificado TLS",
      },
      {
        en: "Authentication and authorization both mean encryption, so JSON APIs can skip identity checks",
        pt: "Authentication e authorization significam criptografia, então APIs JSON podem pular checagens de identidade",
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
        en: "Plain HTTP, unlimited request bodies, optional authn, and errors that include stack traces",
        pt: "HTTP puro, bodies de request ilimitados, authn opcional e erros que incluem stack traces",
      },
      {
        en: "TLS, input limits, authn/authz, rate limiting, and errors that omit internal details",
        pt: "TLS, limites de input, authn/authz, rate limiting e erros que omitem detalhes internos",
      },
      {
        en: "TLS without authn/authz, unlimited bodies, no rate limiting, and detailed internal errors",
        pt: "TLS sem authn/authz, bodies ilimitados, sem rate limiting e erros internos detalhados",
      },
      {
        en: "TLS and input limits only, trusting every Origin header, and errors that include stack traces",
        pt: "Só TLS e limites de input, confiando em todo header Origin, e erros que incluem stack traces",
      },
    ],
    correctOption: 1,
  },
];
