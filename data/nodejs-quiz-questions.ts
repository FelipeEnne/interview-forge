import type { QuestionCategory } from "./nodejs-questions";

export type QuizQuestion = {
  id: string;
  category: QuestionCategory;
  question: string;
  options: readonly [string, string, string, string];
  correctOption: 0 | 1 | 2 | 3;
};

export const NODEJS_QUIZ_QUESTIONS: readonly QuizQuestion[] = [
  {
    id: "quiz-nodejs-runtime",
    category: "fundamentals",
    question: "What is Node.js primarily used as?",
    options: [
      "A browser engine for rendering HTML",
      "A JavaScript runtime for running JavaScript outside the browser",
      "A relational database for JavaScript applications",
      "A CSS preprocessor for backend templates",
    ],
    correctOption: 1,
  },
  {
    id: "quiz-v8-libuv",
    category: "fundamentals",
    question: "Which pair best describes the roles of V8 and libuv in Node.js?",
    options: [
      "V8 serves HTTP requests; libuv compiles JavaScript",
      "V8 stores files on disk; libuv renders the UI",
      "V8 executes JavaScript; libuv provides the event loop and async I/O",
      "V8 manages npm packages; libuv types TypeScript",
    ],
    correctOption: 2,
  },
  {
    id: "quiz-event-loop-purpose",
    category: "async",
    question: "Why does the Node.js event loop matter for servers?",
    options: [
      "It starts a new operating-system process for every incoming request",
      "It lets one thread schedule callbacks so slow I/O does not block other work",
      "It compiles TypeScript before each request reaches a handler",
      "It guarantees every callback runs in a dedicated worker thread",
    ],
    correctOption: 1,
  },
  {
    id: "quiz-blocking-work",
    category: "async",
    question: "Which kind of work is most likely to block the Node.js event loop?",
    options: [
      "Awaiting a network response with an async HTTP client",
      "Listening for a timer with setTimeout",
      "A long synchronous CPU loop on the main thread",
      "Reading a file with fs.promises.readFile",
    ],
    correctOption: 2,
  },
  {
    id: "quiz-async-await-errors",
    category: "async",
    question: "How should a rejected promise from an async function be handled?",
    options: [
      "Ignore it; Node converts every rejection into a successful empty result",
      "Catch it with try/catch or attach a rejection handler so the failure is observed",
      "Call process.exit immediately from inside the async function",
      "Wrap the function in JSON.stringify so errors become strings",
    ],
    correctOption: 1,
  },
  {
    id: "quiz-nexttick-microtasks",
    category: "async",
    question:
      "What can happen if process.nextTick or promise microtasks are scheduled recursively without bound?",
    options: [
      "I/O callbacks can be starved because those queues run before later event-loop phases",
      "Node automatically moves the work onto the GPU",
      "The event loop skips timers forever and then shuts down cleanly",
      "Libuv converts the callbacks into synchronous file writes",
    ],
    correctOption: 0,
  },
  {
    id: "quiz-cjs-esm",
    category: "modules",
    question: "How do CommonJS and ES Modules typically load in Node.js?",
    options: [
      "Both always load asynchronously through HTTP",
      "CommonJS uses require and loads synchronously; ES Modules use import/export",
      "ES Modules use require; CommonJS uses import only",
      "Neither system caches modules after the first load",
    ],
    correctOption: 1,
  },
  {
    id: "quiz-module-cache",
    category: "modules",
    question: "What is a practical consequence of Node.js module caching?",
    options: [
      "Every import re-executes the module from disk",
      "Later imports of the same resolved module reuse one instance, so module-level state can be shared",
      "Cached modules cannot export functions",
      "Caching only applies to JSON files, not JavaScript",
    ],
    correctOption: 1,
  },
  {
    id: "quiz-http-handler",
    category: "http",
    question:
      "In a basic Node.js HTTP server, what does the request handler receive for each request?",
    options: [
      "A database transaction and a CSS stylesheet",
      "Request and response objects used to inspect the request and send a response",
      "A compiled WebAssembly module and a thread pool",
      "Only a numeric status code with no headers or body",
    ],
    correctOption: 1,
  },
  {
    id: "quiz-http-idempotency",
    category: "http",
    question: "Which statement about HTTP idempotency is correct?",
    options: [
      "POST is always idempotent; GET is never idempotent",
      "Repeating GET, PUT, or DELETE should have the same intended effect as sending the request once",
      "Idempotency means the response body must be empty",
      "Only WebSocket upgrade requests can be idempotent",
    ],
    correctOption: 1,
  },
  {
    id: "quiz-http-status-errors",
    category: "http",
    question:
      "Which status-code family should a Node.js API use for unexpected server failures?",
    options: [
      "2xx",
      "3xx",
      "4xx",
      "5xx",
    ],
    correctOption: 3,
  },
  {
    id: "quiz-express-middleware",
    category: "express",
    question: "What is Express middleware?",
    options: [
      "A function with access to the request, response, and next callback in the request pipeline",
      "A SQL migration that Express runs before listening",
      "A browser plugin required to call an Express API",
      "A Node.js core module that replaces http.createServer",
    ],
    correctOption: 0,
  },
  {
    id: "quiz-express-error-middleware",
    category: "express",
    question: "How should unexpected errors be handled in Express?",
    options: [
      "Swallow them in each route and return 200 with an empty body",
      "Propagate them to centralized error-handling middleware and avoid leaking stack traces to clients",
      "Restart the whole operating system from the route handler",
      "Convert every error into a 301 redirect",
    ],
    correctOption: 1,
  },
  {
    id: "quiz-stream-types",
    category: "streams",
    question: "Which description of Node.js stream types is accurate?",
    options: [
      "Readable produces data, writable consumes it, duplex does both, and transform modifies data in transit",
      "All streams can only move strings encoded as UTF-32",
      "Duplex streams can only write; transform streams can only read",
      "Streams load the entire payload into memory before emitting any data",
    ],
    correctOption: 0,
  },
  {
    id: "quiz-stream-pipeline",
    category: "streams",
    question: "Why prefer stream.pipeline() when connecting streams?",
    options: [
      "It disables backpressure so producers never pause",
      "It coordinates backpressure, forwards errors, and cleans up streams when one fails",
      "It converts every stream into a Promise that never settles",
      "It only works for TCP sockets, not files",
    ],
    correctOption: 1,
  },
  {
    id: "quiz-unit-vs-integration",
    category: "testing",
    question:
      "What is the main difference between unit and integration tests for a Node.js service?",
    options: [
      "Unit tests always hit a production database; integration tests never do",
      "Unit tests exercise a small behavior with controlled dependencies; integration tests check real boundaries working together",
      "Integration tests cannot assert HTTP status codes",
      "Unit tests must sleep for a fixed number of seconds",
    ],
    correctOption: 1,
  },
  {
    id: "quiz-testing-async",
    category: "testing",
    question: "How should asynchronous Node.js code be tested reliably?",
    options: [
      "Return or await the promise so the runner knows when work finishes, and assert success and rejection paths",
      "Use arbitrary sleeps and ignore rejected promises",
      "Never wait for promises; assert immediately after calling the function",
      "Mock Date.now in every test even when time is unused",
    ],
    correctOption: 0,
  },
  {
    id: "quiz-input-validation",
    category: "security",
    question: "Why must a Node.js API validate untrusted input?",
    options: [
      "TypeScript types already enforce runtime request bodies",
      "Runtime input can be malformed or malicious, so shape, type, size, and allowed values must be checked at trust boundaries",
      "Validation is only needed for GET query strings, never JSON bodies",
      "Validating input makes HTTPS unnecessary",
    ],
    correctOption: 1,
  },
  {
    id: "quiz-authn-authz",
    category: "security",
    question:
      "What is the difference between authentication and authorization?",
    options: [
      "They are two names for TLS certificate pinning",
      "Authentication establishes who the caller is; authorization decides what that identity may do",
      "Authorization proves identity; authentication assigns HTTP status codes",
      "Neither is needed if the API uses JSON",
    ],
    correctOption: 1,
  },
  {
    id: "quiz-api-security-baseline",
    category: "security",
    question: "Which set is a reasonable baseline for a public Node.js API?",
    options: [
      "Plain HTTP only, unlimited request bodies, and secrets committed to git",
      "TLS, input limits, authn/authz, rate limiting, and errors that omit internal details",
      "Disable all logging so attackers cannot be observed",
      "Trust every Origin header and skip CORS rules",
    ],
    correctOption: 1,
  },
];
