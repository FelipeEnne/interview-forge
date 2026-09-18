export const QUESTION_CATEGORIES = [
  "fundamentals",
  "async",
  "modules",
  "http",
  "express",
  "streams",
  "testing",
  "security",
  "production",
] as const;

export type QuestionCategory = (typeof QUESTION_CATEGORIES)[number];

export function isQuestionCategory(value: string): value is QuestionCategory {
  return (QUESTION_CATEGORIES as readonly string[]).includes(value);
}

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
      id: "v8-optimization-and-gc",
      category: "fundamentals",
      question:
        "How can V8 optimization and garbage collection affect Node.js latency?",
      answer:
        "V8 speeds up hot functions with just-in-time compilation, but sudden type changes can deoptimize that code and make the same request path slower. Garbage collection pauses also compete with JavaScript on the main thread, so large object graphs and short-lived allocations can create latency spikes even when the application is not doing obvious CPU work. Keeping data shapes stable and avoiding huge temporary objects helps keep both optimized code and GC pauses predictable.",
    },
    {
      id: "environment-configuration",
      category: "fundamentals",
      question:
        "How should a Node.js service validate environment-based configuration at startup?",
      answer:
        "Read configuration from the environment once at boot, then validate required keys, types, and allowed values before accepting traffic. Fail fast on missing ports, URLs, or feature flags rather than discovering them on the first request. Keep ordinary settings separate from secrets, and avoid silent defaults that hide a misconfigured production environment.",
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
      id: "event-emitter",
      category: "async",
      question:
        "How should EventEmitter listeners be used, including error events and cleanup?",
      answer:
        "EventEmitter lets objects publish named events and let callers subscribe with on() or once(). An error event with no listener can crash the process, so long-lived emitters should handle errors explicitly. Remove listeners when the subscriber is done; otherwise retained callbacks keep objects alive and can duplicate work on later events.",
    },
    {
      id: "event-loop-phases",
      category: "async",
      question:
        "What are the main phases of the Node.js event loop, and where do timers, I/O, and immediates run?",
      answer:
        "Each loop iteration walks timers, pending callbacks, poll, check, and close callbacks. setTimeout and setInterval callbacks become due in the timers phase, most completed I/O callbacks run in poll, and setImmediate runs in check. process.nextTick and promise microtasks drain between phases, so they are not a substitute for those queues.",
    },
    {
      id: "nexttick-vs-setimmediate",
      category: "async",
      question:
        "When should you use process.nextTick() instead of setImmediate()?",
      answer:
        "process.nextTick() runs after the current JavaScript turn and before the event loop continues, which is useful for finishing local cleanup or emitting errors before other listeners run. setImmediate() waits until the check phase, so it yields back to I/O more readily. Recursively scheduling nextTick can starve timers and I/O, so it should stay short and bounded.",
    },
    {
      id: "libuv-thread-pool",
      category: "async",
      question:
        "Which Node.js operations use the libuv thread pool, and what happens when that pool saturates?",
      answer:
        "Libuv's thread pool handles work that is not truly asynchronous in the OS, such as most file-system calls, dns.lookup(), and some crypto and compression operations. Network sockets generally do not use it. The default pool is small, so a burst of heavy fs or crypto work can delay unrelated pooled operations even while JavaScript looks idle; size the pool and avoid doing that work on every request.",
    },
    {
      id: "workers-vs-child-processes",
      category: "async",
      question:
        "When should you choose worker threads instead of child processes?",
      answer:
        "Worker threads are a good fit for CPU-heavy JavaScript that should stay in-process and can share memory through SharedArrayBuffer or a message channel. Child processes provide stronger isolation, can run non-Node binaries, and survive a worker crash without taking down the parent. fork() is the Node-specific child-process helper with an IPC channel; spawn() is the general way to launch another program.",
    },
    {
      id: "bounded-concurrency",
      category: "async",
      question:
        "Why should large asynchronous workloads use bounded concurrency instead of unbounded Promise.all()?",
      answer:
        "Promise.all() starts every task immediately, which can open too many sockets, exhaust a database pool, or allocate more memory than the process can hold. A queue or pool with a fixed concurrency limit keeps throughput high without collapsing dependencies. Prefer allSettled when you need every outcome, and still cap how many operations run at once.",
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
      id: "npm-lockfiles",
      category: "modules",
      question:
        "How do lockfiles and npm ci keep Node.js installs reproducible?",
      answer:
        "A lockfile records the exact resolved dependency tree, not just the ranges in package.json. npm ci installs from that lockfile, fails if it is missing or out of date, and is the usual choice in CI because it will not silently rewrite the tree. Production and local installs should commit the lockfile so every environment gets the same packages.",
    },
    {
      id: "semver-ranges",
      category: "modules",
      question:
        "How do SemVer ranges affect Node.js dependency upgrades?",
      answer:
        "Caret and tilde ranges let compatible minor or patch releases install automatically, while an exact version pins a package until you choose to move. That flexibility speeds routine fixes but can still pull in unexpected behavior, so lockfiles and reviewed upgrades matter before production. Treat major bumps as breaking and verify tests rather than relying on range syntax alone.",
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
      id: "cors",
      category: "http",
      question:
        "How should CORS and preflight requests be configured for a Node.js API?",
      answer:
        "CORS is enforced by browsers, not by Node itself, so it does not protect the API from non-browser clients. Allow only the origins, methods, and headers the frontend actually needs, and answer OPTIONS preflights for requests that are not simple. Never combine Access-Control-Allow-Origin: * with credentials; echo a specific origin when cookies or client certificates are involved.",
    },
    {
      id: "websockets",
      category: "http",
      question:
        "When are WebSockets a better fit than ordinary HTTP request-response?",
      answer:
        "WebSockets keep a full-duplex connection, which suits chat, live dashboards, and other flows that push many small updates in both directions. HTTP remains better for cacheable reads, file downloads, and one-off commands. Production WebSocket services still need heartbeats, reconnection, and a shared pub/sub or sticky routing story behind more than one instance.",
    },
    {
      id: "rest-vs-graphql",
      category: "http",
      question:
        "How should you choose between REST and GraphQL for a Node.js API?",
      answer:
        "REST maps resources to HTTP methods and status codes, which makes caching, authorization, and debugging straightforward. GraphQL lets clients ask for exactly the fields they need, which can reduce over-fetching, but it complicates caching, authorization per field, and N+1 data loading. Choose GraphQL when many clients need different shapes of the same graph; otherwise a well-designed REST API is often simpler to operate.",
    },
    {
      id: "api-performance",
      category: "http",
      question:
        "How would you diagnose and improve a high-traffic Node.js API?",
      answer:
        "Start with measurements: p95 latency, event-loop delay, garbage collection, and slow dependency calls. Remove synchronous or CPU-heavy work from the request path, add caching and pagination for hot reads, and keep database and HTTP pools sized with timeouts. Scale out only after a single instance is healthy; more processes will not hide a blocking handler or an N+1 query.",
    },
    {
      id: "sessions-vs-tokens",
      category: "http",
      question:
        "When should a Node.js API use server-side sessions instead of signed access tokens?",
      answer:
        "Server-side sessions are easier to revoke and keep less sensitive data on the client, but they need a shared store once you run more than one process. Signed tokens avoid that lookup and travel well across services, yet revocation, secret rotation, and oversized payloads become your problem. Pick sessions when logout and short-lived server control matter most; pick tokens when independent services must authenticate without a shared session database.",
    },
    {
      id: "rate-limiting",
      category: "http",
      question:
        "How should rate limiting work across multiple Node.js instances?",
      answer:
        "Limit by a trusted identity such as an authenticated user or API key before falling back to IP address, because NAT can share one address among many clients. In-memory counters fail as soon as you have more than one process, so the limit state belongs in a shared store. Apply stricter limits to expensive endpoints and fail closed with a clear 429 rather than letting one client starve everyone else.",
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
      id: "fs-sync-async-streams",
      category: "streams",
      question:
        "When should you use synchronous fs APIs, asynchronous fs APIs, or streams?",
      answer:
        "Synchronous fs calls block the event loop and belong in short startup or CLI paths, not in request handlers. Asynchronous fs APIs are the default for modest files that fit comfortably in memory. Streams are the right tool for large files or unbounded uploads because they process chunks under backpressure instead of buffering the whole payload.",
    },
    {
      id: "buffer-encodings",
      category: "streams",
      question:
        "What should you watch for when converting Buffers and allocating binary data in Node.js?",
      answer:
        "UTF-8 byte length is not the same as JavaScript string length, so slicing or limiting by characters can cut a multibyte character in half. Convert with an explicit encoding, and prefer Buffer.alloc() over allocUnsafe() unless you immediately fill every byte. Never concatenate untrusted chunks without a size cap, because a Buffer is a real memory allocation.",
    },
    {
      id: "streaming-uploads",
      category: "streams",
      question:
        "How should a Node.js service accept large file uploads safely?",
      answer:
        "Parse the upload as a stream, enforce size and content-type limits before the body is fully buffered, and use pipeline so failed transfers close file handles. Reject or pause extra data as soon as the limit is crossed rather than writing an unbounded temp file. Store the result outside the request process when possible, and treat the raw bytes as untrusted until validated.",
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
      id: "cicd-quality-gates",
      category: "testing",
      question:
        "What quality gates should a Node.js CI/CD pipeline enforce before production?",
      answer:
        "Install from the lockfile, then run lint, tests, and a production build so broken types or missing files never ship. Promote an immutable artifact through staging rather than rebuilding on the production host. Keep secrets in the pipeline's secret store, and stop the deploy automatically when any required check fails.",
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
    {
      id: "password-hashing",
      category: "security",
      question:
        "Why should passwords be hashed rather than encrypted, and what makes a hash suitable?",
      answer:
        "Encryption is reversible with a key, so a stolen ciphertext can still become passwords. A password hash is one-way: verification recomputes the hash, and a unique salt stops rainbow tables. Use a slow, memory-hard algorithm such as Argon2, bcrypt, or scrypt with a work factor; fast hashes like SHA-256 are the wrong tool for password storage.",
    },
    {
      id: "crypto-primitives",
      category: "security",
      question:
        "When should a Node.js service use hashing, HMAC, encryption, signatures, or secure randomness?",
      answer:
        "A hash checks integrity, HMAC proves a shared secret produced the message, encryption hides confidentiality, and a signature proves a private key holder authored the data. Generate tokens, IDs, and keys with a cryptographically secure generator such as crypto.randomBytes, never Math.random. Choose the primitive that matches the threat; hashing a secret does not encrypt it, and encrypting it does not authenticate the sender.",
    },
    {
      id: "secret-management",
      category: "security",
      question:
        "How should application secrets be managed differently from ordinary configuration?",
      answer:
        "Secrets such as database passwords and API keys should live in a secret manager or tightly scoped environment variables, never in git, images, or client bundles. Rotate them, grant least privilege, and keep local .env files uncommitted. Ordinary config like log level can be more visible; mixing the two makes accidental leaks and overly broad access more likely.",
    },
    {
      id: "database-connection-pooling",
      category: "production",
      question:
        "How should a Node.js service size and protect a database connection pool?",
      answer:
        "A pool reuses a small set of open connections so each request does not pay handshake cost. Size it so instance count times pool size stays under the database's max connections, and set idle and acquire timeouts so a slow query cannot exhaust the pool. Do not hold a connection while waiting on unrelated I/O; checkout, query, and release quickly.",
    },
    {
      id: "caching",
      category: "production",
      question:
        "How should a Node.js service choose cache boundaries and handle invalidation?",
      answer:
        "Cache expensive, repeatable reads at a clear boundary such as a computed response or a database lookup, with a TTL that matches how stale the data may be. Invalidate on writes or use short TTLs when correctness is strict, and prevent stampedes so many processes do not rebuild the same key at once. Skip caching for per-user secrets unless the entry is isolated and encrypted or short-lived.",
    },
    {
      id: "observability-opentelemetry",
      category: "production",
      question:
        "How do logs, metrics, traces, and OpenTelemetry help diagnose a Node.js request?",
      answer:
        "Logs capture discrete events, metrics show aggregate health, and traces follow one request across services. OpenTelemetry is a vendor-neutral way to create that telemetry and propagate context such as a trace id. Instrument handlers and outbound calls, keep high-cardinality labels under control, and use the shared context to jump from a slow trace to the matching logs.",
    },
    {
      id: "message-queues",
      category: "production",
      question:
        "How should a Node.js consumer process queue messages reliably?",
      answer:
        "Acknowledge a message only after the side effect succeeds, and retry with backoff when the worker fails. Consumers should be idempotent because at-least-once delivery can replay a message, and poison messages belong in a dead-letter queue instead of blocking the stream. Queues decouple producers from slow work so the HTTP event loop is not waiting on that job.",
    },
    {
      id: "docker-nodejs",
      category: "production",
      question:
        "What matters when packaging a Node.js service in Docker for production?",
      answer:
        "Build from a small image, copy lockfile and package manifest first, and install with npm ci so the image is reproducible. Run as a non-root user, set NODE_ENV to production, keep secrets out of layers, and use .dockerignore so local files never enter the build. Forward OS signals and add a health check so orchestration can replace an unhealthy container.",
    },
    {
      id: "clustering-and-scaling",
      category: "production",
      question:
        "How should you scale a Node.js service across CPU cores and hosts?",
      answer:
        "The cluster module can run one worker per core on a single machine, but those workers still share that host's failure domain. Horizontal replicas behind a load balancer provide capacity and availability, and they need shared stores for sessions or rate limits instead of in-process memory. Sticky sessions are a workaround for WebSockets, not a substitute for designing stateless HTTP handlers.",
    },
    {
      id: "monolith-vs-microservices",
      category: "production",
      question:
        "When is a modular monolith a better Node.js architecture than microservices?",
      answer:
        "A modular monolith keeps one deployable while enforcing module boundaries, which is usually faster to build, debug, and operate for a small team. Microservices help when teams and scale need independent deploys, but they add network failure, data consistency, and operational cost. Split a service when a concrete bottleneck or ownership boundary appears, not because Node.js is event-driven.",
    },
  ],
};
