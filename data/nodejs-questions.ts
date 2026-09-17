export type InterviewQuestion = {
  id: string;
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
      question:
        "What is Node.js, and what is it commonly used for in backend development?",
      answer:
        "Node.js is a JavaScript runtime built on Chrome's V8 engine. It runs JavaScript outside the browser and is commonly used to build APIs, web servers, CLIs, and real-time services using a non-blocking, event-driven model.",
    },
    {
      id: "event-loop",
      question:
        "What is the event loop in Node.js, and why does it matter?",
      answer:
        "The event loop is the mechanism that lets Node.js handle many concurrent operations on a single thread. It polls the callback queue and runs callbacks when the call stack is empty, which enables non-blocking I/O instead of waiting on slow operations like network or disk.",
    },
    {
      id: "sync-vs-async",
      question:
        "What is the difference between synchronous and asynchronous code in Node.js?",
      answer:
        "Synchronous code blocks the current thread until it finishes, which can hurt throughput under load. Asynchronous code schedules work and continues; when the operation completes, its callback or promise handler runs later via the event loop, keeping the server responsive.",
    },
    {
      id: "cjs-vs-esm",
      question:
        "How do CommonJS and ES Modules differ in Node.js?",
      answer:
        "CommonJS uses require() and module.exports, loads modules synchronously, and has been the historical default. ES Modules use import/export, support static analysis and tree shaking, and are the standard ECMAScript module system; in Node you enable them via .mjs files or \"type\": \"module\" in package.json.",
    },
    {
      id: "middleware",
      question:
        "What is middleware in a Node.js web framework such as Express?",
      answer:
        "Middleware is a function with access to the request, response, and next callback. It runs in order in the request pipeline to parse bodies, log, authenticate, or handle routes; calling next() passes control to the next middleware, or you end the response.",
    },
  ],
};
