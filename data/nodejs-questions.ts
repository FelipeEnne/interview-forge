import type { LocalizedText } from "@/i18n/localized-text";

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
  question: LocalizedText;
  answer: LocalizedText;
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
      question: {
        en: "What is Node.js, and what is it commonly used for in backend development?",
        pt: "O que é o Node.js, e para que ele costuma ser usado no desenvolvimento backend?",
      },
      answer: {
        en: "Node.js is a JavaScript runtime built on Chrome's V8 engine. It runs JavaScript outside the browser and is commonly used to build APIs, web servers, CLIs, and real-time services using a non-blocking, event-driven model.",
        pt: "Node.js é um runtime de JavaScript construído sobre o motor V8 do Chrome. Ele executa JavaScript fora do browser e costuma ser usado para APIs, servidores web, CLIs e serviços em tempo real, com um modelo event-driven e non-blocking.",
      },
    },
    {
      id: "v8-and-libuv",
      category: "fundamentals",
      question: {
        en: "What roles do V8 and libuv play in Node.js?",
        pt: "Qual é o papel do V8 e do libuv no Node.js?",
      },
      answer: {
        en: "V8 compiles and executes JavaScript and manages its memory and garbage collection. Libuv provides the event loop and cross-platform asynchronous I/O, using operating-system facilities and a worker pool for operations that cannot be handled asynchronously by the OS.",
        pt: "O V8 compila e executa JavaScript e gerencia memória e garbage collection. O libuv fornece o Event Loop e I/O assíncrono multiplataforma, usando recursos do sistema operacional e um worker pool para operações que o SO não consegue tratar de forma assíncrona.",
      },
    },
    {
      id: "single-threaded-nodejs",
      category: "fundamentals",
      question: {
        en: "What does it mean to say that Node.js is single-threaded?",
        pt: "O que significa dizer que o Node.js é single-threaded?",
      },
      answer: {
        en: "JavaScript for a Node.js process normally runs on one main thread, so only one JavaScript callback executes there at a time. Node can still handle concurrent work because the OS, libuv worker pool, and optional worker threads perform or wait for work outside that main JavaScript thread.",
        pt: "O JavaScript de um processo Node.js normalmente roda em uma thread principal, então só um callback JavaScript executa ali por vez. O Node ainda lida com trabalho concorrente porque o SO, o worker pool do libuv e, opcionalmente, worker threads executam ou esperam trabalho fora dessa thread principal de JavaScript.",
      },
    },
    {
      id: "graceful-shutdown",
      category: "fundamentals",
      question: {
        en: "How should a Node.js service perform a graceful shutdown?",
        pt: "Como um serviço Node.js deve fazer um graceful shutdown?",
      },
      answer: {
        en: "It should listen for termination signals, stop accepting new requests, allow in-flight work to finish within a deadline, and close resources such as database connections. It should then exit cleanly, while retaining a forced-exit timeout so shutdown cannot hang forever.",
        pt: "Ele deve escutar sinais de término, parar de aceitar novas requisições, deixar o trabalho em andamento terminar dentro de um prazo e fechar recursos como conexões de banco. Depois encerra de forma limpa, mantendo um timeout de saída forçada para o shutdown não ficar pendurado para sempre.",
      },
    },
    {
      id: "v8-optimization-and-gc",
      category: "fundamentals",
      question: {
        en: "How can V8 optimization and garbage collection affect Node.js latency?",
        pt: "Como a otimização do V8 e o garbage collection podem afetar a latência no Node.js?",
      },
      answer: {
        en: "V8 speeds up hot functions with just-in-time compilation, but sudden type changes can deoptimize that code and make the same request path slower. Garbage collection pauses also compete with JavaScript on the main thread, so large object graphs and short-lived allocations can create latency spikes even when the application is not doing obvious CPU work. Keeping data shapes stable and avoiding huge temporary objects helps keep both optimized code and GC pauses predictable.",
        pt: "O V8 acelera funções quentes com compilação just-in-time, mas mudanças bruscas de tipo podem desotimizar esse código e deixar o mesmo caminho de request mais lento. Pausas de garbage collection também competem com o JavaScript na thread principal, então grafos grandes de objetos e alocações de curta duração podem gerar picos de latência mesmo sem trabalho óbvio de CPU. Manter o formato dos dados estável e evitar objetos temporários enormes ajuda a deixar o código otimizado e as pausas de GC mais previsíveis.",
      },
    },
    {
      id: "environment-configuration",
      category: "fundamentals",
      question: {
        en: "How should a Node.js service validate environment-based configuration at startup?",
        pt: "Como um serviço Node.js deve validar a configuração baseada em environment no startup?",
      },
      answer: {
        en: "Read configuration from the environment once at boot, then validate required keys, types, and allowed values before accepting traffic. Fail fast on missing ports, URLs, or feature flags rather than discovering them on the first request. Keep ordinary settings separate from secrets, and avoid silent defaults that hide a misconfigured production environment.",
        pt: "Leia a configuração do environment uma vez no boot, depois valide chaves obrigatórias, tipos e valores permitidos antes de aceitar tráfego. Falhe cedo se faltar porta, URL ou feature flag, em vez de descobrir isso na primeira request. Separe settings comuns de secrets e evite defaults silenciosos que escondem um ambiente de produção mal configurado.",
      },
    },
    {
      id: "event-loop",
      category: "async",
      question: {
        en: "What is the event loop in Node.js, and why does it matter?",
        pt: "O que é o Event Loop no Node.js, e por que ele importa?",
      },
      answer: {
        en: "The event loop is the mechanism that lets Node.js handle many concurrent operations on a single thread. It polls the callback queue and runs callbacks when the call stack is empty, which enables non-blocking I/O instead of waiting on slow operations like network or disk.",
        pt: "O Event Loop é o mecanismo que permite ao Node.js lidar com muitas operações concorrentes em uma única thread. Ele consulta a fila de callbacks e os executa quando a call stack está vazia, o que habilita I/O non-blocking em vez de esperar operações lentas de rede ou disco.",
      },
    },
    {
      id: "sync-vs-async",
      category: "async",
      question: {
        en: "What is the difference between synchronous and asynchronous code in Node.js?",
        pt: "Qual é a diferença entre código síncrono e assíncrono no Node.js?",
      },
      answer: {
        en: "Synchronous code blocks the current thread until it finishes, which can hurt throughput under load. Asynchronous code schedules work and continues; when the operation completes, its callback or promise handler runs later via the event loop, keeping the server responsive.",
        pt: "Código síncrono bloqueia a thread atual até terminar, o que prejudica throughput sob carga. Código assíncrono agenda o trabalho e segue; quando a operação termina, o callback ou o handler da promise roda depois pelo Event Loop, mantendo o servidor responsivo.",
      },
    },
    {
      id: "promises-and-async-await",
      category: "async",
      question: {
        en: "How do promises and async/await help manage asynchronous work in Node.js?",
        pt: "Como promises e async/await ajudam a gerenciar trabalho assíncrono no Node.js?",
      },
      answer: {
        en: "Promises represent a future result and allow success and failure to be composed without deeply nested callbacks. Async/await is syntax over promises that makes sequential asynchronous code easier to read; rejected promises should still be handled with try/catch or an explicit rejection handler.",
        pt: "Promises representam um resultado futuro e permitem compor sucesso e falha sem callbacks profundamente aninhados. Async/await é sintaxe sobre promises que deixa código assíncrono sequencial mais fácil de ler; promises rejeitadas ainda precisam de try/catch ou de um handler explícito de rejection.",
      },
    },
    {
      id: "microtasks-and-nexttick",
      category: "async",
      question: {
        en: "How do promise microtasks and process.nextTick affect the Node.js event loop?",
        pt: "Como as microtasks de promise e o process.nextTick afetam o Event Loop do Node.js?",
      },
      answer: {
        en: "After the current JavaScript operation, Node drains the nextTick queue and then promise microtasks before continuing to later event-loop work such as timers and I/O callbacks. Recursively scheduling either can starve I/O, so they should be used for short, bounded work.",
        pt: "Depois da operação JavaScript atual, o Node esvazia a fila de nextTick e em seguida as microtasks de promise antes de seguir para trabalho posterior do Event Loop, como timers e callbacks de I/O. Agendar qualquer uma das duas de forma recursiva pode famintar I/O, então elas devem ser usadas para trabalho curto e limitado.",
      },
    },
    {
      id: "blocking-the-event-loop",
      category: "async",
      question: {
        en: "What kinds of work block the Node.js event loop, and why is that a problem?",
        pt: "Que tipos de trabalho bloqueiam o Event Loop do Node.js, e por que isso é um problema?",
      },
      answer: {
        en: "Long CPU calculations, synchronous I/O, very large JSON operations, and poorly bounded loops keep the main thread busy. While blocked, the process cannot run other request callbacks, which increases latency and reduces throughput for every client sharing that event loop.",
        pt: "Cálculos longos de CPU, I/O síncrono, operações JSON muito grandes e loops mal limitados mantêm a thread principal ocupada. Enquanto está bloqueado, o processo não consegue rodar outros callbacks de request, o que aumenta latência e reduz throughput para todo cliente que compartilha aquele Event Loop.",
      },
    },
    {
      id: "worker-threads",
      category: "async",
      question: {
        en: "When should you use worker threads in Node.js?",
        pt: "Quando você deve usar worker threads no Node.js?",
      },
      answer: {
        en: "Worker threads are useful for CPU-intensive JavaScript that would otherwise block the event loop, such as heavy computation or data transformation. They do not usually improve ordinary I/O-bound work, which Node already handles efficiently through asynchronous APIs.",
        pt: "Worker threads são úteis para JavaScript intensivo de CPU que bloquearia o Event Loop, como computação pesada ou transformação de dados. Em geral elas não melhoram trabalho I/O-bound comum, que o Node já trata bem com APIs assíncronas.",
      },
    },
    {
      id: "event-emitter",
      category: "async",
      question: {
        en: "How should EventEmitter listeners be used, including error events and cleanup?",
        pt: "Como listeners de EventEmitter devem ser usados, incluindo eventos de error e cleanup?",
      },
      answer: {
        en: "EventEmitter lets objects publish named events and let callers subscribe with on() or once(). An error event with no listener can crash the process, so long-lived emitters should handle errors explicitly. Remove listeners when the subscriber is done; otherwise retained callbacks keep objects alive and can duplicate work on later events.",
        pt: "EventEmitter permite que objetos publiquem eventos nomeados e que callers se inscrevam com on() ou once(). Um evento error sem listener pode derrubar o processo, então emitters de longa duração devem tratar erros de forma explícita. Remova listeners quando o subscriber terminar; senão callbacks retidos mantêm objetos vivos e podem duplicar trabalho em eventos posteriores.",
      },
    },
    {
      id: "event-loop-phases",
      category: "async",
      question: {
        en: "What are the main phases of the Node.js event loop, and where do timers, I/O, and immediates run?",
        pt: "Quais são as fases principais do Event Loop do Node.js, e onde rodam timers, I/O e immediates?",
      },
      answer: {
        en: "Each loop iteration walks timers, pending callbacks, poll, check, and close callbacks. setTimeout and setInterval callbacks become due in the timers phase, most completed I/O callbacks run in poll, and setImmediate runs in check. process.nextTick and promise microtasks drain between phases, so they are not a substitute for those queues.",
        pt: "Cada iteração do loop percorre timers, pending callbacks, poll, check e close callbacks. Callbacks de setTimeout e setInterval ficam prontos na fase de timers, a maior parte dos callbacks de I/O concluído roda em poll, e setImmediate roda em check. process.nextTick e microtasks de promise esvaziam entre as fases, então não substituem essas filas.",
      },
    },
    {
      id: "nexttick-vs-setimmediate",
      category: "async",
      question: {
        en: "When should you use process.nextTick() instead of setImmediate()?",
        pt: "Quando você deve usar process.nextTick() em vez de setImmediate()?",
      },
      answer: {
        en: "process.nextTick() runs after the current JavaScript turn and before the event loop continues, which is useful for finishing local cleanup or emitting errors before other listeners run. setImmediate() waits until the check phase, so it yields back to I/O more readily. Recursively scheduling nextTick can starve timers and I/O, so it should stay short and bounded.",
        pt: "process.nextTick() roda depois do turno atual de JavaScript e antes de o Event Loop continuar, o que é útil para terminar cleanup local ou emitir erros antes de outros listeners. setImmediate() espera a fase check, então devolve o controle para I/O com mais facilidade. Agendar nextTick de forma recursiva pode famintar timers e I/O, então o uso deve ser curto e limitado.",
      },
    },
    {
      id: "libuv-thread-pool",
      category: "async",
      question: {
        en: "Which Node.js operations use the libuv thread pool, and what happens when that pool saturates?",
        pt: "Quais operações do Node.js usam o thread pool do libuv, e o que acontece quando esse pool satura?",
      },
      answer: {
        en: "Libuv's thread pool handles work that is not truly asynchronous in the OS, such as most file-system calls, dns.lookup(), and some crypto and compression operations. Network sockets generally do not use it. The default pool is small, so a burst of heavy fs or crypto work can delay unrelated pooled operations even while JavaScript looks idle; size the pool and avoid doing that work on every request.",
        pt: "O thread pool do libuv trata trabalho que não é realmente assíncrono no SO, como a maior parte das chamadas de file system, dns.lookup() e algumas operações de crypto e compressão. Sockets de rede em geral não o usam. O pool padrão é pequeno, então um pico de fs ou crypto pesado pode atrasar outras operações do pool mesmo com o JavaScript aparentemente ocioso; dimensione o pool e evite esse trabalho em toda request.",
      },
    },
    {
      id: "workers-vs-child-processes",
      category: "async",
      question: {
        en: "When should you choose worker threads instead of child processes?",
        pt: "Quando você deve escolher worker threads em vez de child processes?",
      },
      answer: {
        en: "Worker threads are a good fit for CPU-heavy JavaScript that should stay in-process and can share memory through SharedArrayBuffer or a message channel. Child processes provide stronger isolation, can run non-Node binaries, and survive a worker crash without taking down the parent. fork() is the Node-specific child-process helper with an IPC channel; spawn() is the general way to launch another program.",
        pt: "Worker threads combinam bem com JavaScript pesado de CPU que deve permanecer in-process e pode compartilhar memória via SharedArrayBuffer ou um canal de mensagens. Child processes oferecem isolamento mais forte, conseguem rodar binários que não são Node e sobrevivem à queda de um worker sem derrubar o parent. fork() é o helper específico do Node com canal IPC; spawn() é a forma geral de lançar outro programa.",
      },
    },
    {
      id: "bounded-concurrency",
      category: "async",
      question: {
        en: "Why should large asynchronous workloads use bounded concurrency instead of unbounded Promise.all()?",
        pt: "Por que workloads assíncronos grandes devem usar concorrência limitada em vez de Promise.all() sem limite?",
      },
      answer: {
        en: "Promise.all() starts every task immediately, which can open too many sockets, exhaust a database pool, or allocate more memory than the process can hold. A queue or pool with a fixed concurrency limit keeps throughput high without collapsing dependencies. Prefer allSettled when you need every outcome, and still cap how many operations run at once.",
        pt: "Promise.all() dispara toda tarefa imediatamente, o que pode abrir sockets demais, esgotar um pool de banco ou alocar mais memória do que o processo aguenta. Uma fila ou pool com limite fixo de concorrência mantém throughput alto sem derrubar as dependências. Prefira allSettled quando você precisa de todos os resultados, e mesmo assim limite quantas operações rodam ao mesmo tempo.",
      },
    },
    {
      id: "cjs-vs-esm",
      category: "modules",
      question: {
        en: "How do CommonJS and ES Modules differ in Node.js?",
        pt: "Como CommonJS e ES Modules diferem no Node.js?",
      },
      answer: {
        en: 'CommonJS uses require() and module.exports, loads modules synchronously, and has been the historical default. ES Modules use import/export, support static analysis and tree shaking, and are the standard ECMAScript module system; in Node you enable them via .mjs files or "type": "module" in package.json.',
        pt: 'CommonJS usa require() e module.exports, carrega módulos de forma síncrona e foi o default histórico. ES Modules usam import/export, suportam análise estática e tree shaking, e são o sistema padrão de módulos do ECMAScript; no Node você habilita isso com arquivos .mjs ou "type": "module" no package.json.',
      },
    },
    {
      id: "module-caching",
      category: "modules",
      question: {
        en: "How does module caching work in Node.js?",
        pt: "Como funciona o cache de módulos no Node.js?",
      },
      answer: {
        en: "After a module is loaded, Node normally caches it by its resolved location, so later imports or requires reuse the same module instance. This improves performance but also means module-level mutable state can be shared across consumers and can complicate tests.",
        pt: "Depois que um módulo é carregado, o Node normalmente o coloca em cache pelo caminho resolvido, então imports ou requires posteriores reutilizam a mesma instância. Isso melhora performance, mas também significa que estado mutável no nível do módulo pode ser compartilhado entre consumidores e complicar testes.",
      },
    },
    {
      id: "package-json-role",
      category: "modules",
      question: {
        en: "What important roles does package.json have in a Node.js project?",
        pt: "Quais papéis importantes o package.json tem em um projeto Node.js?",
      },
      answer: {
        en: "It describes the package and defines scripts, dependencies, entry points, and module behavior such as the type field or exports map. Keeping runtime and development dependencies accurate also makes installs, publishing, and production deployments more predictable.",
        pt: "Ele descreve o pacote e define scripts, dependências, entry points e o comportamento de módulos, como o campo type ou o exports map. Manter dependências de runtime e de desenvolvimento precisas também deixa installs, publish e deploys de produção mais previsíveis.",
      },
    },
    {
      id: "npm-lockfiles",
      category: "modules",
      question: {
        en: "How do lockfiles and npm ci keep Node.js installs reproducible?",
        pt: "Como lockfiles e npm ci mantêm installs de Node.js reproduzíveis?",
      },
      answer: {
        en: "A lockfile records the exact resolved dependency tree, not just the ranges in package.json. npm ci installs from that lockfile, fails if it is missing or out of date, and is the usual choice in CI because it will not silently rewrite the tree. Production and local installs should commit the lockfile so every environment gets the same packages.",
        pt: "Um lockfile registra a árvore exata de dependências resolvidas, não só os ranges do package.json. npm ci instala a partir desse lockfile, falha se ele estiver ausente ou desatualizado, e é a escolha usual em CI porque não reescreve a árvore em silêncio. Installs locais e de produção devem commitar o lockfile para todo ambiente receber os mesmos pacotes.",
      },
    },
    {
      id: "semver-ranges",
      category: "modules",
      question: {
        en: "How do SemVer ranges affect Node.js dependency upgrades?",
        pt: "Como ranges de SemVer afetam upgrades de dependências no Node.js?",
      },
      answer: {
        en: "Caret and tilde ranges let compatible minor or patch releases install automatically, while an exact version pins a package until you choose to move. That flexibility speeds routine fixes but can still pull in unexpected behavior, so lockfiles and reviewed upgrades matter before production. Treat major bumps as breaking and verify tests rather than relying on range syntax alone.",
        pt: "Ranges com caret e tilde deixam releases compatíveis de minor ou patch instalarem automaticamente, enquanto uma versão exata fixa o pacote até você decidir mudar. Essa flexibilidade acelera correções rotineiras, mas ainda pode puxar comportamento inesperado, então lockfiles e upgrades revisados importam antes de produção. Trate bumps major como breaking e verifique os testes em vez de confiar só na sintaxe do range.",
      },
    },
    {
      id: "node-http-server",
      category: "http",
      question: {
        en: "How does a basic HTTP server handle requests and responses in Node.js?",
        pt: "Como um servidor HTTP básico trata requests e responses no Node.js?",
      },
      answer: {
        en: "A server registers a request handler that receives request and response objects for each incoming request. The handler inspects method, URL, headers, and body, then sets a status and headers and ends or streams the response; both request and response are stream-based.",
        pt: "O servidor registra um request handler que recebe os objetos request e response para cada requisição. O handler inspeciona method, URL, headers e body, depois define status e headers e encerra ou faz stream da response; tanto request quanto response são baseados em stream.",
      },
    },
    {
      id: "http-methods-idempotency",
      category: "http",
      question: {
        en: "What is HTTP idempotency, and which common methods should be idempotent?",
        pt: "O que é idempotência HTTP, e quais métodos comuns devem ser idempotentes?",
      },
      answer: {
        en: "An operation is idempotent when repeating the same request has the same intended effect as sending it once. GET, PUT, and DELETE should be idempotent, while POST usually is not; APIs can add idempotency keys when retries of non-idempotent operations must be safe.",
        pt: "Uma operação é idempotente quando repetir a mesma request tem o mesmo efeito pretendido de enviá-la uma vez. GET, PUT e DELETE devem ser idempotentes, enquanto POST em geral não é; APIs podem adicionar idempotency keys quando retries de operações não idempotentes precisam ser seguros.",
      },
    },
    {
      id: "api-status-codes",
      category: "http",
      question: {
        en: "How should a Node.js API choose HTTP status codes?",
        pt: "Como uma API Node.js deve escolher HTTP status codes?",
      },
      answer: {
        en: "Use 2xx for successful outcomes, 4xx when the client's request is invalid or unauthorized, and 5xx for unexpected server failures. Choose the most specific useful code, keep the response body consistent, and do not expose sensitive internal error details.",
        pt: "Use 2xx para sucesso, 4xx quando a request do client é inválida ou não autorizada, e 5xx para falhas inesperadas do servidor. Escolha o código específico mais útil, mantenha o body da response consistente e não exponha detalhes internos sensíveis de erro.",
      },
    },
    {
      id: "http-keep-alive",
      category: "http",
      question: {
        en: "Why do HTTP keep-alive and connection pooling matter in Node.js services?",
        pt: "Por que HTTP keep-alive e connection pooling importam em serviços Node.js?",
      },
      answer: {
        en: "Reusing connections avoids repeated TCP and TLS setup, reducing latency and resource usage for outgoing requests. Pools still need sensible limits and timeouts so idle or slow connections do not exhaust sockets or keep a process alive unexpectedly.",
        pt: "Reutilizar conexões evita o setup repetido de TCP e TLS, reduzindo latência e uso de recursos em requests de saída. Pools ainda precisam de limites e timeouts razoáveis para conexões ociosas ou lentas não esgotarem sockets nem manterem um processo vivo sem necessidade.",
      },
    },
    {
      id: "cors",
      category: "http",
      question: {
        en: "How should CORS and preflight requests be configured for a Node.js API?",
        pt: "Como CORS e preflight requests devem ser configurados em uma API Node.js?",
      },
      answer: {
        en: "CORS is enforced by browsers, not by Node itself, so it does not protect the API from non-browser clients. Allow only the origins, methods, and headers the frontend actually needs, and answer OPTIONS preflights for requests that are not simple. Never combine Access-Control-Allow-Origin: * with credentials; echo a specific origin when cookies or client certificates are involved.",
        pt: "CORS é imposto pelos browsers, não pelo Node em si, então não protege a API de clients que não são browser. Permita só origins, methods e headers que o frontend realmente precisa, e responda preflights OPTIONS para requests que não são simple. Nunca combine Access-Control-Allow-Origin: * com credentials; devolva um origin específico quando cookies ou certificados de client estiverem envolvidos.",
      },
    },
    {
      id: "websockets",
      category: "http",
      question: {
        en: "When are WebSockets a better fit than ordinary HTTP request-response?",
        pt: "Quando WebSockets combinam melhor do que o request-response HTTP comum?",
      },
      answer: {
        en: "WebSockets keep a full-duplex connection, which suits chat, live dashboards, and other flows that push many small updates in both directions. HTTP remains better for cacheable reads, file downloads, and one-off commands. Production WebSocket services still need heartbeats, reconnection, and a shared pub/sub or sticky routing story behind more than one instance.",
        pt: "WebSockets mantêm uma conexão full-duplex, o que combina com chat, dashboards ao vivo e outros fluxos que empurram muitas atualizações pequenas nos dois sentidos. HTTP continua melhor para reads cacheáveis, download de arquivos e comandos pontuais. Serviços WebSocket em produção ainda precisam de heartbeats, reconexão e uma história compartilhada de pub/sub ou sticky routing atrás de mais de uma instância.",
      },
    },
    {
      id: "rest-vs-graphql",
      category: "http",
      question: {
        en: "How should you choose between REST and GraphQL for a Node.js API?",
        pt: "Como você deve escolher entre REST e GraphQL para uma API Node.js?",
      },
      answer: {
        en: "REST maps resources to HTTP methods and status codes, which makes caching, authorization, and debugging straightforward. GraphQL lets clients ask for exactly the fields they need, which can reduce over-fetching, but it complicates caching, authorization per field, and N+1 data loading. Choose GraphQL when many clients need different shapes of the same graph; otherwise a well-designed REST API is often simpler to operate.",
        pt: "REST mapeia recursos para HTTP methods e status codes, o que deixa cache, authorization e debugging mais diretos. GraphQL deixa o client pedir exatamente os campos de que precisa, o que pode reduzir over-fetching, mas complica cache, authorization por campo e carregamento N+1. Escolha GraphQL quando muitos clients precisam de formatos diferentes do mesmo grafo; caso contrário, uma API REST bem desenhada costuma ser mais simples de operar.",
      },
    },
    {
      id: "api-performance",
      category: "http",
      question: {
        en: "How would you diagnose and improve a high-traffic Node.js API?",
        pt: "Como você diagnosticaria e melhoraria uma API Node.js de alto tráfego?",
      },
      answer: {
        en: "Start with measurements: p95 latency, event-loop delay, garbage collection, and slow dependency calls. Remove synchronous or CPU-heavy work from the request path, add caching and pagination for hot reads, and keep database and HTTP pools sized with timeouts. Scale out only after a single instance is healthy; more processes will not hide a blocking handler or an N+1 query.",
        pt: "Comece pelas medições: latência p95, delay do Event Loop, garbage collection e chamadas lentas de dependência. Tire trabalho síncrono ou pesado de CPU do caminho da request, adicione cache e paginação para reads quentes, e mantenha pools de banco e HTTP dimensionados com timeouts. Faça scale out só depois que uma instância estiver saudável; mais processos não escondem um handler bloqueante nem uma query N+1.",
      },
    },
    {
      id: "sessions-vs-tokens",
      category: "http",
      question: {
        en: "When should a Node.js API use server-side sessions instead of signed access tokens?",
        pt: "Quando uma API Node.js deve usar sessions no servidor em vez de access tokens assinados?",
      },
      answer: {
        en: "Server-side sessions are easier to revoke and keep less sensitive data on the client, but they need a shared store once you run more than one process. Signed tokens avoid that lookup and travel well across services, yet revocation, secret rotation, and oversized payloads become your problem. Pick sessions when logout and short-lived server control matter most; pick tokens when independent services must authenticate without a shared session database.",
        pt: "Sessions no servidor são mais fáceis de revogar e deixam menos dados sensíveis no client, mas precisam de um store compartilhado quando há mais de um processo. Tokens assinados evitam essa consulta e viajam bem entre serviços, porém revogação, rotação de secret e payloads grandes viram o seu problema. Escolha sessions quando logout e controle de curta duração no servidor importam mais; escolha tokens quando serviços independentes precisam autenticar sem um banco compartilhado de session.",
      },
    },
    {
      id: "rate-limiting",
      category: "http",
      question: {
        en: "How should rate limiting work across multiple Node.js instances?",
        pt: "Como o rate limiting deve funcionar entre várias instâncias Node.js?",
      },
      answer: {
        en: "Limit by a trusted identity such as an authenticated user or API key before falling back to IP address, because NAT can share one address among many clients. In-memory counters fail as soon as you have more than one process, so the limit state belongs in a shared store. Apply stricter limits to expensive endpoints and fail closed with a clear 429 rather than letting one client starve everyone else.",
        pt: "Limite por uma identidade confiável, como um usuário autenticado ou API key, antes de cair para o IP, porque NAT pode compartilhar um endereço entre muitos clients. Contadores em memória falham assim que existe mais de um processo, então o estado do limite pertence a um store compartilhado. Aplique limites mais rígidos em endpoints caros e falhe fechado com um 429 claro, em vez de deixar um client famintar os demais.",
      },
    },
    {
      id: "middleware",
      category: "express",
      question: {
        en: "What is middleware in a Node.js web framework such as Express?",
        pt: "O que é middleware em um framework web Node.js como o Express?",
      },
      answer: {
        en: "Middleware is a function with access to the request, response, and next callback. It runs in order in the request pipeline to parse bodies, log, authenticate, or handle routes; calling next() passes control to the next middleware, or you end the response.",
        pt: "Middleware é uma função com acesso a request, response e ao callback next. Ele roda em ordem no pipeline da request para parsear bodies, logar, autenticar ou tratar rotas; chamar next() passa o controle para o próximo middleware, ou você encerra a response.",
      },
    },
    {
      id: "express-routers",
      category: "express",
      question: {
        en: "Why use Express routers in a larger application?",
        pt: "Por que usar Express routers em uma aplicação maior?",
      },
      answer: {
        en: "Routers group related routes and middleware behind a common path, keeping the main application setup small. They make ownership and testing clearer, but route handlers should still delegate substantial business logic to focused modules rather than becoming large controllers.",
        pt: "Routers agrupam rotas e middleware relacionados atrás de um path comum, mantendo o setup principal da aplicação pequeno. Eles deixam ownership e testes mais claros, mas os route handlers ainda devem delegar lógica de negócio relevante para módulos focados, em vez de virarem controllers grandes.",
      },
    },
    {
      id: "express-error-middleware",
      category: "express",
      question: {
        en: "How should errors be handled in an Express application?",
        pt: "Como erros devem ser tratados em uma aplicação Express?",
      },
      answer: {
        en: "Expected failures should be propagated to centralized error-handling middleware, which maps them to consistent HTTP responses. Async rejections must reach that middleware, and unexpected errors should be logged with useful context without leaking stack traces or sensitive details to clients.",
        pt: "Falhas esperadas devem ser propagadas para um middleware centralizado de error handling, que as mapeia para HTTP responses consistentes. Rejections assíncronas precisam chegar nesse middleware, e erros inesperados devem ser logados com contexto útil, sem vazar stack traces ou detalhes sensíveis para os clients.",
      },
    },
    {
      id: "stream-types",
      category: "streams",
      question: {
        en: "What are the main types of streams in Node.js?",
        pt: "Quais são os principais tipos de stream no Node.js?",
      },
      answer: {
        en: "Readable streams produce data, writable streams consume it, duplex streams do both independently, and transform streams modify data as it passes through. Streams process data incrementally, which is useful for files, network traffic, compression, and other large payloads.",
        pt: "Readable streams produzem dados, writable streams os consomem, duplex streams fazem os dois de forma independente, e transform streams modificam os dados no caminho. Streams processam dados de forma incremental, o que é útil para arquivos, tráfego de rede, compressão e outros payloads grandes.",
      },
    },
    {
      id: "stream-backpressure",
      category: "streams",
      question: {
        en: "What is backpressure in Node.js streams?",
        pt: "O que é backpressure em streams do Node.js?",
      },
      answer: {
        en: "Backpressure occurs when a producer sends data faster than a consumer can process it. Stream APIs signal when the producer should pause and resume, preventing unbounded buffering, excessive memory use, and unstable performance under load.",
        pt: "Backpressure acontece quando um producer envia dados mais rápido do que o consumer consegue processar. As APIs de stream sinalizam quando o producer deve pausar e retomar, evitando buffer ilimitado, uso excessivo de memória e performance instável sob carga.",
      },
    },
    {
      id: "stream-pipeline",
      category: "streams",
      question: {
        en: "Why prefer stream.pipeline() when connecting streams?",
        pt: "Por que preferir stream.pipeline() ao conectar streams?",
      },
      answer: {
        en: "Pipeline connects streams while coordinating backpressure and forwarding errors across the chain. It also cleans up the participating streams when one fails, avoiding much of the manual error handling and resource leakage that can occur with simple pipe chains.",
        pt: "Pipeline conecta streams coordenando backpressure e encaminhando erros pela cadeia. Também faz cleanup dos streams participantes quando um falha, evitando boa parte do error handling manual e do vazamento de recursos que pode ocorrer com encadeamentos simples de pipe.",
      },
    },
    {
      id: "buffers",
      category: "streams",
      question: {
        en: "What is a Buffer in Node.js, and when is it used?",
        pt: "O que é um Buffer no Node.js, e quando ele é usado?",
      },
      answer: {
        en: "A Buffer represents a fixed-size sequence of bytes outside normal JavaScript string storage. It is used for binary data from files, sockets, cryptography, and protocols, and requires an explicit character encoding when converting to or from text.",
        pt: "Um Buffer representa uma sequência de bytes de tamanho fixo fora do armazenamento normal de string do JavaScript. Ele é usado para dados binários de arquivos, sockets, criptografia e protocolos, e exige um encoding explícito ao converter para texto ou a partir dele.",
      },
    },
    {
      id: "fs-sync-async-streams",
      category: "streams",
      question: {
        en: "When should you use synchronous fs APIs, asynchronous fs APIs, or streams?",
        pt: "Quando você deve usar APIs síncronas de fs, APIs assíncronas de fs ou streams?",
      },
      answer: {
        en: "Synchronous fs calls block the event loop and belong in short startup or CLI paths, not in request handlers. Asynchronous fs APIs are the default for modest files that fit comfortably in memory. Streams are the right tool for large files or unbounded uploads because they process chunks under backpressure instead of buffering the whole payload.",
        pt: "Chamadas síncronas de fs bloqueiam o Event Loop e cabem em caminhos curtos de startup ou CLI, não em request handlers. APIs assíncronas de fs são o default para arquivos modestos que cabem confortavelmente na memória. Streams são a ferramenta certa para arquivos grandes ou uploads sem limite, porque processam chunks sob backpressure em vez de bufferizar o payload inteiro.",
      },
    },
    {
      id: "buffer-encodings",
      category: "streams",
      question: {
        en: "What should you watch for when converting Buffers and allocating binary data in Node.js?",
        pt: "O que você deve observar ao converter Buffers e alocar dados binários no Node.js?",
      },
      answer: {
        en: "UTF-8 byte length is not the same as JavaScript string length, so slicing or limiting by characters can cut a multibyte character in half. Convert with an explicit encoding, and prefer Buffer.alloc() over allocUnsafe() unless you immediately fill every byte. Never concatenate untrusted chunks without a size cap, because a Buffer is a real memory allocation.",
        pt: "O comprimento em bytes UTF-8 não é o mesmo que o length de uma string JavaScript, então fatiar ou limitar por caracteres pode cortar um caractere multibyte no meio. Converta com um encoding explícito e prefira Buffer.alloc() a allocUnsafe(), a menos que você preencha imediatamente cada byte. Nunca concatene chunks não confiáveis sem um limite de tamanho, porque um Buffer é uma alocação real de memória.",
      },
    },
    {
      id: "streaming-uploads",
      category: "streams",
      question: {
        en: "How should a Node.js service accept large file uploads safely?",
        pt: "Como um serviço Node.js deve aceitar uploads grandes de arquivo com segurança?",
      },
      answer: {
        en: "Parse the upload as a stream, enforce size and content-type limits before the body is fully buffered, and use pipeline so failed transfers close file handles. Reject or pause extra data as soon as the limit is crossed rather than writing an unbounded temp file. Store the result outside the request process when possible, and treat the raw bytes as untrusted until validated.",
        pt: "Faça parse do upload como stream, aplique limites de tamanho e content-type antes de o body ser totalmente bufferizado, e use pipeline para transfers com falha fecharem file handles. Rejeite ou pause dados extras assim que o limite for cruzado, em vez de escrever um arquivo temporário sem limite. Guarde o resultado fora do processo da request quando possível, e trate os bytes crus como não confiáveis até validar.",
      },
    },
    {
      id: "unit-vs-integration-tests",
      category: "testing",
      question: {
        en: "What is the difference between unit and integration tests for a Node.js service?",
        pt: "Qual é a diferença entre testes unitários e de integração para um serviço Node.js?",
      },
      answer: {
        en: "Unit tests exercise a small behavior with fast, controlled dependencies. Integration tests verify that real boundaries such as HTTP handlers, databases, or modules work together; a useful suite has many focused unit tests plus enough integration tests to catch wiring and contract problems.",
        pt: "Testes unitários exercitam um comportamento pequeno com dependências rápidas e controladas. Testes de integração verificam se fronteiras reais como HTTP handlers, bancos ou módulos funcionam juntos; uma suíte útil tem muitos testes unitários focados e testes de integração suficientes para pegar problemas de wiring e de contrato.",
      },
    },
    {
      id: "testing-async-code",
      category: "testing",
      question: {
        en: "How should asynchronous Node.js code be tested reliably?",
        pt: "Como código Node.js assíncrono deve ser testado de forma confiável?",
      },
      answer: {
        en: "Return or await the promise so the test runner knows when work finishes, and assert both success and rejection paths. Control time and external I/O where necessary, clean up handles after each test, and avoid arbitrary sleeps that make tests slow and flaky.",
        pt: "Retorne ou faça await da promise para o test runner saber quando o trabalho termina, e faça assert tanto do caminho de sucesso quanto do de rejection. Controle tempo e I/O externo quando necessário, faça cleanup de handles depois de cada teste e evite sleeps arbitrários que deixam testes lentos e flaky.",
      },
    },
    {
      id: "test-mocking-boundaries",
      category: "testing",
      question: {
        en: "What should you mock in Node.js tests?",
        pt: "O que você deve mockar em testes Node.js?",
      },
      answer: {
        en: "Mock slow, nondeterministic, or external boundaries such as third-party APIs when testing local behavior. Avoid mocking every internal function, because that couples tests to implementation details; use integration tests where confidence depends on the real collaboration.",
        pt: "Mocke fronteiras lentas, não determinísticas ou externas, como APIs de terceiros, ao testar comportamento local. Evite mockar cada função interna, porque isso acopla o teste a detalhes de implementação; use testes de integração quando a confiança depende da colaboração real.",
      },
    },
    {
      id: "cicd-quality-gates",
      category: "testing",
      question: {
        en: "What quality gates should a Node.js CI/CD pipeline enforce before production?",
        pt: "Quais quality gates um pipeline de CI/CD Node.js deve exigir antes de produção?",
      },
      answer: {
        en: "Install from the lockfile, then run lint, tests, and a production build so broken types or missing files never ship. Promote an immutable artifact through staging rather than rebuilding on the production host. Keep secrets in the pipeline's secret store, and stop the deploy automatically when any required check fails.",
        pt: "Instale a partir do lockfile, depois rode lint, testes e um build de produção para tipos quebrados ou arquivos faltando nunca irem para frente. Promova um artefato imutável pelo staging, em vez de rebuildar no host de produção. Mantenha secrets no secret store do pipeline e interrompa o deploy automaticamente quando qualquer check obrigatório falhar.",
      },
    },
    {
      id: "input-validation",
      category: "security",
      question: {
        en: "Why must a Node.js API validate and sanitize untrusted input?",
        pt: "Por que uma API Node.js precisa validar e sanitizar input não confiável?",
      },
      answer: {
        en: "Runtime input can violate TypeScript types and may contain values intended for injection or resource abuse. Validate shape, type, size, and allowed values at trust boundaries, and use parameterized database queries or context-aware escaping instead of building commands from strings.",
        pt: "Input em runtime pode violar tipos do TypeScript e conter valores pensados para injection ou abuso de recursos. Valide formato, tipo, tamanho e valores permitidos nas fronteiras de confiança, e use queries parametrizadas no banco ou escaping consciente do contexto, em vez de montar comandos a partir de strings.",
      },
    },
    {
      id: "authentication-vs-authorization",
      category: "security",
      question: {
        en: "What is the difference between authentication and authorization in an API?",
        pt: "Qual é a diferença entre authentication e authorization em uma API?",
      },
      answer: {
        en: "Authentication establishes who the caller is, while authorization decides what that identity may do. A Node.js API should verify credentials securely and then enforce permission checks on every protected resource, rather than relying only on a successful login.",
        pt: "Authentication estabelece quem é o caller, enquanto authorization decide o que aquela identidade pode fazer. Uma API Node.js deve verificar credenciais com segurança e depois aplicar checagens de permissão em todo recurso protegido, em vez de confiar só em um login bem-sucedido.",
      },
    },
    {
      id: "api-security-baseline",
      category: "security",
      question: {
        en: "What baseline protections should a public Node.js API have?",
        pt: "Quais proteções básicas uma API Node.js pública deve ter?",
      },
      answer: {
        en: "Use TLS, secure headers, strict input limits, appropriate CORS rules, authentication and authorization, and rate limiting on abuse-prone endpoints. Keep secrets out of source control, update and audit dependencies, log security-relevant failures, and return errors without internal details.",
        pt: "Use TLS, headers seguros, limites rígidos de input, regras CORS adequadas, authentication e authorization, e rate limiting em endpoints propensos a abuso. Mantenha secrets fora do source control, atualize e audite dependências, logue falhas relevantes de segurança e devolva erros sem detalhes internos.",
      },
    },
    {
      id: "password-hashing",
      category: "security",
      question: {
        en: "Why should passwords be hashed rather than encrypted, and what makes a hash suitable?",
        pt: "Por que senhas devem ser hashed em vez de criptografadas, e o que torna um hash adequado?",
      },
      answer: {
        en: "Encryption is reversible with a key, so a stolen ciphertext can still become passwords. A password hash is one-way: verification recomputes the hash, and a unique salt stops rainbow tables. Use a slow, memory-hard algorithm such as Argon2, bcrypt, or scrypt with a work factor; fast hashes like SHA-256 are the wrong tool for password storage.",
        pt: "Criptografia é reversível com uma chave, então um ciphertext roubado ainda pode virar senhas. Um hash de senha é unidirecional: a verificação recomputa o hash, e um salt único impede rainbow tables. Use um algoritmo lento e memory-hard como Argon2, bcrypt ou scrypt com um work factor; hashes rápidos como SHA-256 são a ferramenta errada para guardar senhas.",
      },
    },
    {
      id: "crypto-primitives",
      category: "security",
      question: {
        en: "When should a Node.js service use hashing, HMAC, encryption, signatures, or secure randomness?",
        pt: "Quando um serviço Node.js deve usar hashing, HMAC, criptografia, signatures ou aleatoriedade segura?",
      },
      answer: {
        en: "A hash checks integrity, HMAC proves a shared secret produced the message, encryption hides confidentiality, and a signature proves a private key holder authored the data. Generate tokens, IDs, and keys with a cryptographically secure generator such as crypto.randomBytes, never Math.random. Choose the primitive that matches the threat; hashing a secret does not encrypt it, and encrypting it does not authenticate the sender.",
        pt: "Um hash verifica integridade, HMAC prova que um shared secret produziu a mensagem, criptografia protege confidencialidade, e uma signature prova que o dono de uma private key assinou os dados. Gere tokens, IDs e keys com um gerador criptograficamente seguro como crypto.randomBytes, nunca Math.random. Escolha a primitiva que combina com a ameaça; hashear um secret não o criptografa, e criptografá-lo não autentica o sender.",
      },
    },
    {
      id: "secret-management",
      category: "security",
      question: {
        en: "How should application secrets be managed differently from ordinary configuration?",
        pt: "Como secrets da aplicação devem ser gerenciados de forma diferente da configuração comum?",
      },
      answer: {
        en: "Secrets such as database passwords and API keys should live in a secret manager or tightly scoped environment variables, never in git, images, or client bundles. Rotate them, grant least privilege, and keep local .env files uncommitted. Ordinary config like log level can be more visible; mixing the two makes accidental leaks and overly broad access more likely.",
        pt: "Secrets como senhas de banco e API keys devem viver em um secret manager ou em environment variables bem delimitadas, nunca em git, imagens ou bundles de client. Rotacione-os, conceda least privilege e mantenha arquivos .env locais fora do commit. Config comum como log level pode ser mais visível; misturar os dois aumenta o risco de vazamento acidental e de acesso amplo demais.",
      },
    },
    {
      id: "database-connection-pooling",
      category: "production",
      question: {
        en: "How should a Node.js service size and protect a database connection pool?",
        pt: "Como um serviço Node.js deve dimensionar e proteger um connection pool de banco?",
      },
      answer: {
        en: "A pool reuses a small set of open connections so each request does not pay handshake cost. Size it so instance count times pool size stays under the database's max connections, and set idle and acquire timeouts so a slow query cannot exhaust the pool. Do not hold a connection while waiting on unrelated I/O; checkout, query, and release quickly.",
        pt: "Um pool reutiliza um conjunto pequeno de conexões abertas para cada request não pagar o custo do handshake. Dimensione para que quantidade de instâncias vezes o tamanho do pool fique abaixo do máximo de conexões do banco, e configure timeouts de idle e acquire para uma query lenta não esgotar o pool. Não segure uma conexão enquanto espera I/O não relacionado; faça checkout, query e release rápido.",
      },
    },
    {
      id: "caching",
      category: "production",
      question: {
        en: "How should a Node.js service choose cache boundaries and handle invalidation?",
        pt: "Como um serviço Node.js deve escolher as fronteiras de cache e tratar invalidation?",
      },
      answer: {
        en: "Cache expensive, repeatable reads at a clear boundary such as a computed response or a database lookup, with a TTL that matches how stale the data may be. Invalidate on writes or use short TTLs when correctness is strict, and prevent stampedes so many processes do not rebuild the same key at once. Skip caching for per-user secrets unless the entry is isolated and encrypted or short-lived.",
        pt: "Faça cache de reads caros e repetíveis em uma fronteira clara, como uma response computada ou um lookup de banco, com um TTL compatível com o quanto o dado pode ficar stale. Invalide em writes ou use TTLs curtos quando a correção for rígida, e evite stampedes para muitos processos não reconstruírem a mesma key ao mesmo tempo. Pule cache de secrets por usuário, a menos que a entrada esteja isolada e criptografada ou tenha vida curta.",
      },
    },
    {
      id: "observability-opentelemetry",
      category: "production",
      question: {
        en: "How do logs, metrics, traces, and OpenTelemetry help diagnose a Node.js request?",
        pt: "Como logs, metrics, traces e OpenTelemetry ajudam a diagnosticar uma request Node.js?",
      },
      answer: {
        en: "Logs capture discrete events, metrics show aggregate health, and traces follow one request across services. OpenTelemetry is a vendor-neutral way to create that telemetry and propagate context such as a trace id. Instrument handlers and outbound calls, keep high-cardinality labels under control, and use the shared context to jump from a slow trace to the matching logs.",
        pt: "Logs capturam eventos discretos, metrics mostram saúde agregada, e traces acompanham uma request entre serviços. OpenTelemetry é uma forma vendor-neutral de criar essa telemetria e propagar contexto como um trace id. Instrumente handlers e chamadas de saída, controle labels de alta cardinalidade e use o contexto compartilhado para ir de um trace lento aos logs correspondentes.",
      },
    },
    {
      id: "message-queues",
      category: "production",
      question: {
        en: "How should a Node.js consumer process queue messages reliably?",
        pt: "Como um consumer Node.js deve processar mensagens de fila de forma confiável?",
      },
      answer: {
        en: "Acknowledge a message only after the side effect succeeds, and retry with backoff when the worker fails. Consumers should be idempotent because at-least-once delivery can replay a message, and poison messages belong in a dead-letter queue instead of blocking the stream. Queues decouple producers from slow work so the HTTP event loop is not waiting on that job.",
        pt: "Faça acknowledge da mensagem só depois que o side effect der certo, e faça retry com backoff quando o worker falhar. Consumers devem ser idempotentes porque entrega at-least-once pode repetir uma mensagem, e poison messages pertencem a uma dead-letter queue em vez de bloquear o stream. Filas desacoplam producers de trabalho lento para o Event Loop HTTP não ficar esperando esse job.",
      },
    },
    {
      id: "docker-nodejs",
      category: "production",
      question: {
        en: "What matters when packaging a Node.js service in Docker for production?",
        pt: "O que importa ao empacotar um serviço Node.js em Docker para produção?",
      },
      answer: {
        en: "Build from a small image, copy lockfile and package manifest first, and install with npm ci so the image is reproducible. Run as a non-root user, set NODE_ENV to production, keep secrets out of layers, and use .dockerignore so local files never enter the build. Forward OS signals and add a health check so orchestration can replace an unhealthy container.",
        pt: "Faça build a partir de uma imagem pequena, copie lockfile e o manifesto do pacote primeiro, e instale com npm ci para a imagem ser reproduzível. Rode como usuário non-root, defina NODE_ENV como production, mantenha secrets fora das layers e use .dockerignore para arquivos locais não entrarem no build. Encaminhe sinais do SO e adicione health check para a orquestração substituir um container não saudável.",
      },
    },
    {
      id: "clustering-and-scaling",
      category: "production",
      question: {
        en: "How should you scale a Node.js service across CPU cores and hosts?",
        pt: "Como você deve fazer scale de um serviço Node.js entre núcleos de CPU e hosts?",
      },
      answer: {
        en: "The cluster module can run one worker per core on a single machine, but those workers still share that host's failure domain. Horizontal replicas behind a load balancer provide capacity and availability, and they need shared stores for sessions or rate limits instead of in-process memory. Sticky sessions are a workaround for WebSockets, not a substitute for designing stateless HTTP handlers.",
        pt: "O módulo cluster pode rodar um worker por core em uma única máquina, mas esses workers ainda compartilham o domínio de falha daquele host. Réplicas horizontais atrás de um load balancer dão capacidade e disponibilidade, e precisam de stores compartilhados para sessions ou rate limits em vez de memória in-process. Sticky sessions são um workaround para WebSockets, não um substituto para desenhar HTTP handlers stateless.",
      },
    },
    {
      id: "monolith-vs-microservices",
      category: "production",
      question: {
        en: "When is a modular monolith a better Node.js architecture than microservices?",
        pt: "Quando um modular monolith é uma arquitetura Node.js melhor do que microservices?",
      },
      answer: {
        en: "A modular monolith keeps one deployable while enforcing module boundaries, which is usually faster to build, debug, and operate for a small team. Microservices help when teams and scale need independent deploys, but they add network failure, data consistency, and operational cost. Split a service when a concrete bottleneck or ownership boundary appears, not because Node.js is event-driven.",
        pt: "Um modular monolith mantém um único deployable e ainda impõe fronteiras de módulo, o que em geral é mais rápido de construir, debugar e operar para um time pequeno. Microservices ajudam quando times e escala precisam de deploys independentes, mas acrescentam falha de rede, consistência de dados e custo operacional. Separe um serviço quando aparecer um gargalo concreto ou uma fronteira de ownership, não porque o Node.js é event-driven.",
      },
    },
  ],
};
