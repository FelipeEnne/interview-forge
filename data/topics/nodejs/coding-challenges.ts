import type { CodingChallenge } from "@/data/challenge-types";

import type { QuestionCategory } from "./categories";

export const NODEJS_CODING_CHALLENGES: readonly CodingChallenge<QuestionCategory>[] =
  [
    {
      id: "retry-async-operation",
      title: {
        en: "Retry an async operation",
        pt: "Retentar uma operação async",
      },
      category: "async",
      prompt: {
        en: "Implement retry(fn, { attempts, delayMs }) so an async operation can be retried a limited number of times. Wait delayMs between attempts. If every attempt fails, reject with the last error.",
        pt: "Implemente retry(fn, { attempts, delayMs }) para que uma operação async possa ser retentada um número limitado de vezes. Espere delayMs entre as tentativas. Se todas falharem, rejeite com o último erro.",
      },
      requirements: [
        {
          en: "Call fn at most attempts times.",
          pt: "Chame fn no máximo attempts vezes.",
        },
        {
          en: "Await the delay between failed attempts; do not delay after a success or after the final failure.",
          pt: "Faça await do delay entre tentativas que falharam; não espere depois de um sucesso nem depois da falha final.",
        },
        {
          en: "Return the resolved value from the first successful attempt.",
          pt: "Retorne o valor resolvido da primeira tentativa bem-sucedida.",
        },
        {
          en: "If every attempt fails, reject with the last error.",
          pt: "Se todas as tentativas falharem, rejeite com o último erro.",
        },
        {
          en: "Do not swallow non-Error rejections; propagate the original rejection value.",
          pt: "Não engula rejections que não sejam Error; propague o valor original da rejection.",
        },
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
        {
          en: "Uses async/await instead of nested .then() chains.",
          pt: "Usa async/await em vez de cadeias aninhadas de .then().",
        },
        {
          en: "Does not busy-wait or block the event loop while delaying.",
          pt: "Não faz busy-wait nem bloqueia o Event Loop enquanto espera.",
        },
        {
          en: "Stops retrying immediately after a successful call.",
          pt: "Para de retentar imediatamente depois de uma chamada bem-sucedida.",
        },
        {
          en: "Preserves the last error instead of wrapping it in a generic message.",
          pt: "Preserva o último erro em vez de envelopá-lo em uma mensagem genérica.",
        },
      ],
    },
    {
      id: "aggregate-provider-results",
      title: {
        en: "Aggregate provider results",
        pt: "Agregar resultados de providers",
      },
      category: "async",
      prompt: {
        en: "Implement collectProviderResults(providers) so several independent async providers can run together. Return both successful values and failures. One rejected provider must not reject the whole collection.",
        pt: "Implemente collectProviderResults(providers) para vários providers async independentes rodarem juntos. Devolva tanto valores de sucesso quanto falhas. Um provider rejeitado não pode rejeitar a coleção inteira.",
      },
      requirements: [
        {
          en: "Run every provider without short-circuiting on the first rejection.",
          pt: "Rode todos os providers sem interromper na primeira rejection.",
        },
        {
          en: "Preserve input order in the returned results.",
          pt: "Preserve a ordem de entrada nos resultados devolvidos.",
        },
        {
          en: "Successful providers contribute { status: 'fulfilled', value }.",
          pt: "Providers bem-sucedidos contribuem { status: 'fulfilled', value }.",
        },
        {
          en: "Failed providers contribute { status: 'rejected', reason }.",
          pt: "Providers com falha contribuem { status: 'rejected', reason }.",
        },
        {
          en: "An empty providers array returns an empty array.",
          pt: "Um array vazio de providers devolve um array vazio.",
        },
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
        {
          en: "Uses Promise.allSettled rather than Promise.all so partial failures survive.",
          pt: "Usa Promise.allSettled em vez de Promise.all para falhas parciais sobreviverem.",
        },
        {
          en: "Does not wrap providers in an extra try/catch that hides rejection reasons.",
          pt: "Não envolve providers em um try/catch extra que esconda reasons de rejection.",
        },
        {
          en: "Does not mutate the original providers array.",
          pt: "Não muta o array original de providers.",
        },
        {
          en: "Keeps the function async only because it awaits the collection.",
          pt: "Mantém a função async só porque faz await da coleção.",
        },
      ],
    },
    {
      id: "get-user-by-id",
      title: {
        en: "GET /users/:id",
        pt: "GET /users/:id",
      },
      category: "http",
      prompt: {
        en: "Implement getUserById(req, users) as an async HTTP handler for GET /users/:id. users.findById(id) is injected and may resolve a user, resolve null, or reject. Return JSON responses with the correct status codes.",
        pt: "Implemente getUserById(req, users) como um HTTP handler async para GET /users/:id. users.findById(id) é injetado e pode resolver um user, resolver null ou rejeitar. Devolva responses JSON com os status codes corretos.",
      },
      requirements: [
        {
          en: "Respond 200 with the user object when findById resolves a user.",
          pt: "Responda 200 com o objeto user quando findById resolver um user.",
        },
        {
          en: "Respond 404 with { error: 'User not found' } when findById resolves null.",
          pt: "Responda 404 com { error: 'User not found' } quando findById resolver null.",
        },
        {
          en: "Respond 500 with { error: 'Internal server error' } when findById rejects.",
          pt: "Responda 500 com { error: 'Internal server error' } quando findById rejeitar.",
        },
        {
          en: "Do not leak the underlying error message in the 500 body.",
          pt: "Não vaze a mensagem interna de erro no body do 500.",
        },
        {
          en: "Read the id from req.params.id.",
          pt: "Leia o id em req.params.id.",
        },
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
        {
          en: "Awaits the repository instead of treating it as synchronous.",
          pt: "Faz await do repository em vez de tratá-lo como síncrono.",
        },
        {
          en: "Distinguishes missing resources (404) from unexpected failures (500).",
          pt: "Distingue recursos ausentes (404) de falhas inesperadas (500).",
        },
        {
          en: "Keeps 500 responses generic so internal details stay off the wire.",
          pt: "Mantém responses 500 genéricas para detalhes internos não saírem no fio.",
        },
        {
          en: "Does not throw from the handler after a repository rejection.",
          pt: "Não dá throw no handler depois de uma rejection do repository.",
        },
      ],
    },
    {
      id: "create-user",
      title: {
        en: "POST /users",
        pt: "POST /users",
      },
      category: "http",
      prompt: {
        en: "Implement createUser(req, users) as an async HTTP handler for POST /users. Validate the JSON body, reject duplicate emails, and create the user through the injected repository.",
        pt: "Implemente createUser(req, users) como um HTTP handler async para POST /users. Valide o body JSON, rejeite emails duplicados e crie o user pelo repository injetado.",
      },
      requirements: [
        {
          en: "Respond 400 with { error: 'Invalid user' } when email is missing, not a string, or empty after trim, or when name is missing or not a non-empty string.",
          pt: "Responda 400 com { error: 'Invalid user' } quando email estiver ausente, não for string ou ficar vazio depois do trim, ou quando name estiver ausente ou não for uma string não vazia.",
        },
        {
          en: "Respond 409 with { error: 'Email already exists' } when users.existsByEmail(email) resolves true.",
          pt: "Responda 409 com { error: 'Email already exists' } quando users.existsByEmail(email) resolver true.",
        },
        {
          en: "Respond 201 with the created user when users.create({ email, name }) succeeds.",
          pt: "Responda 201 com o user criado quando users.create({ email, name }) tiver sucesso.",
        },
        {
          en: "Trim email before lookup and create.",
          pt: "Faça trim do email antes do lookup e do create.",
        },
        {
          en: "Do not call create when validation fails or the email already exists.",
          pt: "Não chame create quando a validação falhar ou o email já existir.",
        },
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
        {
          en: "Validates the payload before touching persistence.",
          pt: "Valida o payload antes de tocar a persistência.",
        },
        {
          en: "Uses 400 for malformed input and 409 for a real conflict.",
          pt: "Usa 400 para input malformado e 409 para um conflito real.",
        },
        {
          en: "Creates the user only after uniqueness is confirmed.",
          pt: "Cria o user só depois de confirmar unicidade.",
        },
        {
          en: "Normalizes email with trim so 'a@b.com ' and 'a@b.com' collide.",
          pt: "Normaliza o email com trim para 'a@b.com ' e 'a@b.com' colidirem.",
        },
      ],
    },
    {
      id: "api-key-and-error-middleware",
      title: {
        en: "API key and error middleware",
        pt: "API key e middleware de erro",
      },
      category: "express",
      prompt: {
        en: "Implement requireApiKey and errorHandler as Express-style middleware. requireApiKey reads x-api-key and forwards unexpected errors with next(err). errorHandler must send a safe 500 response and must not leak internal error details.",
        pt: "Implemente requireApiKey e errorHandler como middleware no estilo Express. requireApiKey lê x-api-key e encaminha erros inesperados com next(err). errorHandler deve enviar uma response 500 segura e não pode vazar detalhes internos de erro.",
      },
      requirements: [
        {
          en: "requireApiKey calls next() when req.headers['x-api-key'] matches process.env.API_KEY.",
          pt: "requireApiKey chama next() quando req.headers['x-api-key'] coincide com process.env.API_KEY.",
        },
        {
          en: "requireApiKey responds 401 with { error: 'Unauthorized' } when the header is missing or wrong, and does not call next().",
          pt: "requireApiKey responde 401 com { error: 'Unauthorized' } quando o header está ausente ou errado, e não chama next().",
        },
        {
          en: "If comparing keys throws, requireApiKey calls next(err).",
          pt: "Se a comparação das keys der throw, requireApiKey chama next(err).",
        },
        {
          en: "errorHandler responds 500 with { error: 'Internal server error' } and does not include err.message or a stack.",
          pt: "errorHandler responde 500 com { error: 'Internal server error' } e não inclui err.message nem stack.",
        },
        {
          en: "errorHandler has the Express error-middleware signature (err, req, res, next).",
          pt: "errorHandler tem a assinatura de error middleware do Express (err, req, res, next).",
        },
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
        {
          en: "Keeps auth middleware thin: either next(), 401, or next(err).",
          pt: "Mantém o middleware de auth enxuto: next(), 401 ou next(err).",
        },
        {
          en: "Does not put stack traces or internal messages in the client body.",
          pt: "Não coloca stack traces nem mensagens internas no body do client.",
        },
        {
          en: "Uses four arguments on errorHandler so Express treats it as error middleware.",
          pt: "Usa quatro argumentos em errorHandler para o Express tratá-lo como error middleware.",
        },
        {
          en: "Does not attempt to authenticate again inside errorHandler.",
          pt: "Não tenta autenticar de novo dentro de errorHandler.",
        },
      ],
    },
    {
      id: "parse-ndjson-stream",
      title: {
        en: "Parse an NDJSON stream",
        pt: "Fazer parse de um stream NDJSON",
      },
      category: "streams",
      prompt: {
        en: "Implement parseNdjson(readable) so a newline-delimited JSON stream can be parsed without buffering the entire payload. Chunks may split a line. Use a Transform and pipeline, honor backpressure, and propagate read or parse errors.",
        pt: "Implemente parseNdjson(readable) para um stream JSON delimitado por newline ser parseado sem bufferizar o payload inteiro. Chunks podem partir uma linha. Use um Transform e pipeline, respeite backpressure e propague erros de leitura ou parse.",
      },
      requirements: [
        {
          en: "Yield one parsed object per complete newline-delimited line.",
          pt: "Produza um objeto parseado por linha completa delimitada por newline.",
        },
        {
          en: "Carry leftover bytes when a chunk splits a line across reads.",
          pt: "Carregue leftover bytes quando um chunk partir uma linha entre reads.",
        },
        {
          en: "Ignore empty lines.",
          pt: "Ignore linhas vazias.",
        },
        {
          en: "Reject when JSON.parse fails on a complete line.",
          pt: "Rejeite quando JSON.parse falhar em uma linha completa.",
        },
        {
          en: "Propagate errors from the readable source.",
          pt: "Propague erros da fonte readable.",
        },
        {
          en: "Do not concatenate the whole stream into one string before parsing.",
          pt: "Não concatene o stream inteiro em uma string antes do parse.",
        },
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
        {
          en: "Keeps a leftover buffer so split chunks still form valid lines.",
          pt: "Mantém um leftover buffer para chunks partidos ainda formarem linhas válidas.",
        },
        {
          en: "Uses pipeline so source errors and transform errors propagate.",
          pt: "Usa pipeline para erros da fonte e do transform se propagarem.",
        },
        {
          en: "Relies on stream backpressure instead of loading the file into memory first.",
          pt: "Confia no backpressure do stream em vez de carregar o arquivo inteiro na memória primeiro.",
        },
        {
          en: "Treats JSON parse failures as stream errors rather than silently skipping bad lines.",
          pt: "Trata falhas de JSON parse como erros de stream em vez de pular linhas ruins em silêncio.",
        },
      ],
    },
  ];
