export const QUESTION_CATEGORY_LABELS = {
  fundamentals: "Fundamentals",
  async: "Event Loop & Async",
  modules: "Modules",
  http: "HTTP & APIs",
  express: "Express",
  streams: "Streams & Buffers",
  testing: "Testing",
  security: "Security",
} as const;

export type QuestionCategory = keyof typeof QUESTION_CATEGORY_LABELS;

export type InterviewQuestion = {
  id: string;
  category: QuestionCategory;
  question: string;
  answer: string;
};

export type TopicData = {
  slug: string;
  displayName: string;
  questions: InterviewQuestion[];
};

export const NODEJS_TOPIC: TopicData = {
  slug: "nodejs",
  displayName: "Node.js",
  questions: [
    {
      id: "nodejs-fundamentals",
      category: "fundamentals",
      question:
        "What is Node.js, and what is it commonly used for in backend development?",
      answer:
        "Node.js is a JavaScript runtime built on Chrome's V8 engine. It runs JavaScript outside the browser and is commonly used to build APIs, web servers, CLIs, and real-time services using a non-blocking, event-driven model.",
    },
    {
      id: "v8-and-libuv",
      category: "fundamentals",
      question: "What roles do V8 and libuv play in Node.js?",
      answer:
        "V8 compiles and executes JavaScript and manages its memory and garbage collection. Libuv provides the event loop and cross-platform asynchronous I/O, using operating-system facilities and a worker pool for operations that cannot be handled asynchronously by the OS.",
    },
    {
      id: "single-threaded-nodejs",
      category: "fundamentals",
      question:
        "What does it mean to say that Node.js is single-threaded?",
      answer:
        "JavaScript for a Node.js process normally runs on one main thread, so only one JavaScript callback executes there at a time. Node can still handle concurrent work because the OS, libuv worker pool, and optional worker threads perform or wait for work outside that main JavaScript thread.",
    },
    {
      id: "graceful-shutdown",
      category: "fundamentals",
      question: "How should a Node.js service perform a graceful shutdown?",
      answer:
        "It should listen for termination signals, stop accepting new requests, allow in-flight work to finish within a deadline, and close resources such as database connections. It should then exit cleanly, while retaining a forced-exit timeout so shutdown cannot hang forever.",
    },
    {
      id: "event-loop",
      category: "async",
      question:
        "What is the event loop in Node.js, and why does it matter?",
      answer:
        "The event loop is the mechanism that lets Node.js handle many concurrent operations on a single thread. It polls the callback queue and runs callbacks when the call stack is empty, which enables non-blocking I/O instead of waiting on slow operations like network or disk.",
    },
    {
      id: "sync-vs-async",
      category: "async",
      question:
        "What is the difference between synchronous and asynchronous code in Node.js?",
      answer:
        "Synchronous code blocks the current thread until it finishes, which can hurt throughput under load. Asynchronous code schedules work and continues; when the operation completes, its callback or promise handler runs later via the event loop, keeping the server responsive.",
    },
    {
      id: "promises-and-async-await",
      category: "async",
      question:
        "How do promises and async/await help manage asynchronous work in Node.js?",
      answer:
        "Promises represent a future result and allow success and failure to be composed without deeply nested callbacks. Async/await is syntax over promises that makes sequential asynchronous code easier to read; rejected promises should still be handled with try/catch or an explicit rejection handler.",
    },
    {
      id: "microtasks-and-nexttick",
      category: "async",
      question:
        "How do promise microtasks and process.nextTick affect the Node.js event loop?",
      answer:
        "After the current JavaScript operation, Node drains the nextTick queue and then promise microtasks before continuing to later event-loop work such as timers and I/O callbacks. Recursively scheduling either can starve I/O, so they should be used for short, bounded work.",
    },
    {
      id: "blocking-the-event-loop",
      category: "async",
      question:
        "What kinds of work block the Node.js event loop, and why is that a problem?",
      answer:
        "Long CPU calculations, synchronous I/O, very large JSON operations, and poorly bounded loops keep the main thread busy. While blocked, the process cannot run other request callbacks, which increases latency and reduces throughput for every client sharing that event loop.",
    },
    {
      id: "worker-threads",
      category: "async",
      question: "When should you use worker threads in Node.js?",
      answer:
        "Worker threads are useful for CPU-intensive JavaScript that would otherwise block the event loop, such as heavy computation or data transformation. They do not usually improve ordinary I/O-bound work, which Node already handles efficiently through asynchronous APIs.",
    },
    {
      id: "cjs-vs-esm",
      category: "modules",
      question:
        "How do CommonJS and ES Modules differ in Node.js?",
      answer:
        "CommonJS uses require() and module.exports, loads modules synchronously, and has been the historical default. ES Modules use import/export, support static analysis and tree shaking, and are the standard ECMAScript module system; in Node you enable them via .mjs files or \"type\": \"module\" in package.json.",
    },
    {
      id: "module-caching",
      category: "modules",
      question: "How does module caching work in Node.js?",
      answer:
        "After a module is loaded, Node normally caches it by its resolved location, so later imports or requires reuse the same module instance. This improves performance but also means module-level mutable state can be shared across consumers and can complicate tests.",
    },
    {
      id: "package-json-role",
      category: "modules",
      question: "What important roles does package.json have in a Node.js project?",
      answer:
        "It describes the package and defines scripts, dependencies, entry points, and module behavior such as the type field or exports map. Keeping runtime and development dependencies accurate also makes installs, publishing, and production deployments more predictable.",
    },
    {
      id: "node-http-server",
      category: "http",
      question:
        "How does a basic HTTP server handle requests and responses in Node.js?",
      answer:
        "A server registers a request handler that receives request and response objects for each incoming request. The handler inspects method, URL, headers, and body, then sets a status and headers and ends or streams the response; both request and response are stream-based.",
    },
    {
      id: "http-methods-idempotency",
      category: "http",
      question:
        "What is HTTP idempotency, and which common methods should be idempotent?",
      answer:
        "An operation is idempotent when repeating the same request has the same intended effect as sending it once. GET, PUT, and DELETE should be idempotent, while POST usually is not; APIs can add idempotency keys when retries of non-idempotent operations must be safe.",
    },
    {
      id: "api-status-codes",
      category: "http",
      question: "How should a Node.js API choose HTTP status codes?",
      answer:
        "Use 2xx for successful outcomes, 4xx when the client's request is invalid or unauthorized, and 5xx for unexpected server failures. Choose the most specific useful code, keep the response body consistent, and do not expose sensitive internal error details.",
    },
    {
      id: "http-keep-alive",
      category: "http",
      question:
        "Why do HTTP keep-alive and connection pooling matter in Node.js services?",
      answer:
        "Reusing connections avoids repeated TCP and TLS setup, reducing latency and resource usage for outgoing requests. Pools still need sensible limits and timeouts so idle or slow connections do not exhaust sockets or keep a process alive unexpectedly.",
    },
    {
      id: "middleware",
      category: "express",
      question:
        "What is middleware in a Node.js web framework such as Express?",
      answer:
        "Middleware is a function with access to the request, response, and next callback. It runs in order in the request pipeline to parse bodies, log, authenticate, or handle routes; calling next() passes control to the next middleware, or you end the response.",
    },
    {
      id: "express-routers",
      category: "express",
      question: "Why use Express routers in a larger application?",
      answer:
        "Routers group related routes and middleware behind a common path, keeping the main application setup small. They make ownership and testing clearer, but route handlers should still delegate substantial business logic to focused modules rather than becoming large controllers.",
    },
    {
      id: "express-error-middleware",
      category: "express",
      question: "How should errors be handled in an Express application?",
      answer:
        "Expected failures should be propagated to centralized error-handling middleware, which maps them to consistent HTTP responses. Async rejections must reach that middleware, and unexpected errors should be logged with useful context without leaking stack traces or sensitive details to clients.",
    },
    {
      id: "stream-types",
      category: "streams",
      question: "What are the main types of streams in Node.js?",
      answer:
        "Readable streams produce data, writable streams consume it, duplex streams do both independently, and transform streams modify data as it passes through. Streams process data incrementally, which is useful for files, network traffic, compression, and other large payloads.",
    },
    {
      id: "stream-backpressure",
      category: "streams",
      question: "What is backpressure in Node.js streams?",
      answer:
        "Backpressure occurs when a producer sends data faster than a consumer can process it. Stream APIs signal when the producer should pause and resume, preventing unbounded buffering, excessive memory use, and unstable performance under load.",
    },
    {
      id: "stream-pipeline",
      category: "streams",
      question: "Why prefer stream.pipeline() when connecting streams?",
      answer:
        "Pipeline connects streams while coordinating backpressure and forwarding errors across the chain. It also cleans up the participating streams when one fails, avoiding much of the manual error handling and resource leakage that can occur with simple pipe chains.",
    },
    {
      id: "buffers",
      category: "streams",
      question: "What is a Buffer in Node.js, and when is it used?",
      answer:
        "A Buffer represents a fixed-size sequence of bytes outside normal JavaScript string storage. It is used for binary data from files, sockets, cryptography, and protocols, and requires an explicit character encoding when converting to or from text.",
    },
    {
      id: "unit-vs-integration-tests",
      category: "testing",
      question:
        "What is the difference between unit and integration tests for a Node.js service?",
      answer:
        "Unit tests exercise a small behavior with fast, controlled dependencies. Integration tests verify that real boundaries such as HTTP handlers, databases, or modules work together; a useful suite has many focused unit tests plus enough integration tests to catch wiring and contract problems.",
    },
    {
      id: "testing-async-code",
      category: "testing",
      question: "How should asynchronous Node.js code be tested reliably?",
      answer:
        "Return or await the promise so the test runner knows when work finishes, and assert both success and rejection paths. Control time and external I/O where necessary, clean up handles after each test, and avoid arbitrary sleeps that make tests slow and flaky.",
    },
    {
      id: "test-mocking-boundaries",
      category: "testing",
      question: "What should you mock in Node.js tests?",
      answer:
        "Mock slow, nondeterministic, or external boundaries such as third-party APIs when testing local behavior. Avoid mocking every internal function, because that couples tests to implementation details; use integration tests where confidence depends on the real collaboration.",
    },
    {
      id: "input-validation",
      category: "security",
      question:
        "Why must a Node.js API validate and sanitize untrusted input?",
      answer:
        "Runtime input can violate TypeScript types and may contain values intended for injection or resource abuse. Validate shape, type, size, and allowed values at trust boundaries, and use parameterized database queries or context-aware escaping instead of building commands from strings.",
    },
    {
      id: "authentication-vs-authorization",
      category: "security",
      question:
        "What is the difference between authentication and authorization in an API?",
      answer:
        "Authentication establishes who the caller is, while authorization decides what that identity may do. A Node.js API should verify credentials securely and then enforce permission checks on every protected resource, rather than relying only on a successful login.",
    },
    {
      id: "api-security-baseline",
      category: "security",
      question: "What baseline protections should a public Node.js API have?",
      answer:
        "Use TLS, secure headers, strict input limits, appropriate CORS rules, authentication and authorization, and rate limiting on abuse-prone endpoints. Keep secrets out of source control, update and audit dependencies, log security-relevant failures, and return errors without internal details.",
    },
  ],
};
