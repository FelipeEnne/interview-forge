import type { QuestionCategory } from "./nodejs-questions";

export type CodingChallenge = {
  id: string;
  title: string;
  category: QuestionCategory;
  prompt: string;
  requirements: readonly string[];
  starterCode: string;
  referenceSolution: string;
  reviewChecklist: readonly string[];
};

export const NODEJS_CODING_CHALLENGES: readonly CodingChallenge[] = [
  {
    id: "retry-async-operation",
    title: "Retry an async operation",
    category: "async",
    prompt:
      "Implement retry(fn, { attempts, delayMs }) so an async operation can be retried a limited number of times. Wait delayMs between attempts. If every attempt fails, reject with the last error.",
    requirements: [
      "Call fn at most attempts times.",
      "Await the delay between failed attempts; do not delay after a success or after the final failure.",
      "Return the resolved value from the first successful attempt.",
      "If every attempt fails, reject with the last error.",
      "Do not swallow non-Error rejections; propagate the original rejection value.",
    ],
    starterCode: `export async function retry(fn, { attempts, delayMs }) {
  // Call fn, wait delayMs between failures, and reject with the last error.
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
`,
    referenceSolution: `export async function retry(fn, { attempts, delayMs }) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === attempts) {
        throw lastError;
      }

      await delay(delayMs);
    }
  }

  throw lastError;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
`,
    reviewChecklist: [
      "Uses async/await instead of nested .then() chains.",
      "Does not busy-wait or block the event loop while delaying.",
      "Stops retrying immediately after a successful call.",
      "Preserves the last error instead of wrapping it in a generic message.",
    ],
  },
  {
    id: "aggregate-provider-results",
    title: "Aggregate provider results",
    category: "async",
    prompt:
      "Implement collectProviderResults(providers) so several independent async providers can run together. Return both successful values and failures. One rejected provider must not reject the whole collection.",
    requirements: [
      "Run every provider without short-circuiting on the first rejection.",
      "Preserve input order in the returned results.",
      "Successful providers contribute { status: 'fulfilled', value }.",
      "Failed providers contribute { status: 'rejected', reason }.",
      "An empty providers array returns an empty array.",
    ],
    starterCode: `export async function collectProviderResults(providers) {
  // providers is an array of () => Promise<unknown>
}
`,
    referenceSolution: `export async function collectProviderResults(providers) {
  const settled = await Promise.allSettled(providers.map((provider) => provider()));

  return settled.map((result) =>
    result.status === "fulfilled"
      ? { status: "fulfilled", value: result.value }
      : { status: "rejected", reason: result.reason },
  );
}
`,
    reviewChecklist: [
      "Uses Promise.allSettled rather than Promise.all so partial failures survive.",
      "Does not wrap providers in an extra try/catch that hides rejection reasons.",
      "Does not mutate the original providers array.",
      "Keeps the function async only because it awaits the collection.",
    ],
  },
  {
    id: "get-user-by-id",
    title: "GET /users/:id",
    category: "http",
    prompt:
      "Implement getUserById(req, users) as an async HTTP handler for GET /users/:id. users.findById(id) is injected and may resolve a user, resolve null, or reject. Return JSON responses with the correct status codes.",
    requirements: [
      "Respond 200 with the user object when findById resolves a user.",
      "Respond 404 with { error: 'User not found' } when findById resolves null.",
      "Respond 500 with { error: 'Internal server error' } when findById rejects.",
      "Do not leak the underlying error message in the 500 body.",
      "Read the id from req.params.id.",
    ],
    starterCode: `export async function getUserById(req, users) {
  // Return { status, body } for GET /users/:id
}
`,
    referenceSolution: `export async function getUserById(req, users) {
  try {
    const user = await users.findById(req.params.id);

    if (user === null) {
      return { status: 404, body: { error: "User not found" } };
    }

    return { status: 200, body: user };
  } catch {
    return { status: 500, body: { error: "Internal server error" } };
  }
}
`,
    reviewChecklist: [
      "Awaits the repository instead of treating it as synchronous.",
      "Distinguishes missing resources (404) from unexpected failures (500).",
      "Keeps 500 responses generic so internal details stay off the wire.",
      "Does not throw from the handler after a repository rejection.",
    ],
  },
  {
    id: "create-user",
    title: "POST /users",
    category: "http",
    prompt:
      "Implement createUser(req, users) as an async HTTP handler for POST /users. Validate the JSON body, reject duplicate emails, and create the user through the injected repository.",
    requirements: [
      "Respond 400 with { error: 'Invalid user' } when email is missing, not a string, or empty after trim, or when name is missing or not a non-empty string.",
      "Respond 409 with { error: 'Email already exists' } when users.existsByEmail(email) resolves true.",
      "Respond 201 with the created user when users.create({ email, name }) succeeds.",
      "Trim email before lookup and create.",
      "Do not call create when validation fails or the email already exists.",
    ],
    starterCode: `export async function createUser(req, users) {
  // Return { status, body } for POST /users
}
`,
    referenceSolution: `export async function createUser(req, users) {
  const email =
    typeof req.body?.email === "string" ? req.body.email.trim() : "";
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";

  if (!email || !name) {
    return { status: 400, body: { error: "Invalid user" } };
  }

  if (await users.existsByEmail(email)) {
    return { status: 409, body: { error: "Email already exists" } };
  }

  const user = await users.create({ email, name });
  return { status: 201, body: user };
}
`,
    reviewChecklist: [
      "Validates the payload before touching persistence.",
      "Uses 400 for malformed input and 409 for a real conflict.",
      "Creates the user only after uniqueness is confirmed.",
      "Normalizes email with trim so 'a@b.com ' and 'a@b.com' collide.",
    ],
  },
  {
    id: "api-key-and-error-middleware",
    title: "API key and error middleware",
    category: "express",
    prompt:
      "Implement requireApiKey and errorHandler as Express-style middleware. requireApiKey reads x-api-key and forwards unexpected errors with next(err). errorHandler must send a safe 500 response and must not leak internal error details.",
    requirements: [
      "requireApiKey calls next() when req.headers['x-api-key'] matches process.env.API_KEY.",
      "requireApiKey responds 401 with { error: 'Unauthorized' } when the header is missing or wrong, and does not call next().",
      "If comparing keys throws, requireApiKey calls next(err).",
      "errorHandler responds 500 with { error: 'Internal server error' } and does not include err.message or a stack.",
      "errorHandler has the Express error-middleware signature (err, req, res, next).",
    ],
    starterCode: `export function requireApiKey(req, res, next) {
  // Authenticate with the x-api-key header, then next() or next(err)
}

export function errorHandler(err, req, res, next) {
  // Send a safe 500 response
}
`,
    referenceSolution: `export function requireApiKey(req, res, next) {
  try {
    const apiKey = req.headers["x-api-key"];

    if (apiKey !== process.env.API_KEY) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
}

export function errorHandler(err, req, res, next) {
  void err;
  void next;
  res.status(500).json({ error: "Internal server error" });
}
`,
    reviewChecklist: [
      "Keeps auth middleware thin: either next(), 401, or next(err).",
      "Does not put stack traces or internal messages in the client body.",
      "Uses four arguments on errorHandler so Express treats it as error middleware.",
      "Does not attempt to authenticate again inside errorHandler.",
    ],
  },
  {
    id: "parse-ndjson-stream",
    title: "Parse an NDJSON stream",
    category: "streams",
    prompt:
      "Implement parseNdjson(readable) so a newline-delimited JSON stream can be parsed without buffering the entire payload. Chunks may split a line. Use a Transform and pipeline, honor backpressure, and propagate read or parse errors.",
    requirements: [
      "Yield one parsed object per complete newline-delimited line.",
      "Carry leftover bytes when a chunk splits a line across reads.",
      "Ignore empty lines.",
      "Reject when JSON.parse fails on a complete line.",
      "Propagate errors from the readable source.",
      "Do not concatenate the whole stream into one string before parsing.",
    ],
    starterCode: `import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

export async function parseNdjson(readable) {
  const records = [];
  // Transform chunks into objects, then collect them.
  return records;
}
`,
    referenceSolution: `import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

export async function parseNdjson(readable) {
  const records = [];
  let leftover = "";

  const parseLines = new Transform({
    readableObjectMode: true,
    transform(chunk, _encoding, callback) {
      leftover += chunk.toString("utf8");
      const lines = leftover.split("\\n");
      leftover = lines.pop() ?? "";

      try {
        for (const line of lines) {
          if (line.trim() === "") {
            continue;
          }

          this.push(JSON.parse(line));
        }

        callback();
      } catch (error) {
        callback(error);
      }
    },
    flush(callback) {
      if (leftover.trim() === "") {
        callback();
        return;
      }

      try {
        this.push(JSON.parse(leftover));
        leftover = "";
        callback();
      } catch (error) {
        callback(error);
      }
    },
  });

  parseLines.on("data", (record) => {
    records.push(record);
  });

  await pipeline(readable, parseLines);
  return records;
}
`,
    reviewChecklist: [
      "Keeps a leftover buffer so split chunks still form valid lines.",
      "Uses pipeline so source errors and transform errors propagate.",
      "Relies on stream backpressure instead of loading the file into memory first.",
      "Treats JSON parse failures as stream errors rather than silently skipping bad lines.",
    ],
  },
];
