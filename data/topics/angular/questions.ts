import type { AngularQuestionCategory } from "./categories";
import type { InterviewQuestion } from "@/data/study-types";

export {
  ANGULAR_CATEGORIES,
  ANGULAR_QUESTION_CATEGORIES,
  type AngularQuestionCategory,
} from "./categories";
export type { InterviewQuestion } from "@/data/study-types";

export const ANGULAR_QUESTIONS: readonly InterviewQuestion<AngularQuestionCategory>[] =
  [
    {
      id: "angular-signals-and-computed",
      category: "components",
      question: {
        en: "How do signals and computed values fit reactive local state in Angular?",
        pt: "Como signals e computed se encaixam no state reativo local no Angular?",
      },
      answer: {
        en: "A signal holds a reactive value you read by calling it as a function; updates notify dependents. computed derives a read-only value from other signals and tracks dependencies automatically. Prefer computed for derived data instead of copying signals into another signal with an effect—effects are for side effects and external sync, not simple derivation.",
        pt: "Um signal guarda um valor reativo que você lê chamando-o como função; updates notificam dependentes. computed deriva um valor somente leitura de outros signals e rastreia dependências automaticamente. Prefira computed para dados derivados em vez de copiar signals para outro signal com um effect—effects servem para side effects e sync externo, não derivação simples.",
      },
    },
    {
      id: "angular-standalone-components",
      category: "components",
      question: {
        en: "What are standalone components in Angular?",
        pt: "O que são standalone components no Angular?",
      },
      answer: {
        en: "A standalone component declares its own dependencies in an imports array instead of belonging to an NgModule. You can bootstrap the app or lazy routes with standalone components directly. That is the modern default for new features because it keeps dependency graphs local and explicit.",
        pt: "Um standalone component declara suas dependências em um array imports em vez de pertencer a um NgModule. Você pode fazer bootstrap do app ou lazy routes com standalone components diretamente. Esse é o default moderno para features novas porque mantém grafos de dependência locais e explícitos.",
      },
    },
    {
      id: "angular-input-output-contract",
      category: "components",
      question: {
        en: "How do @Input and @Output define parent–child communication?",
        pt: "Como @Input e @Output definem comunicação pai–filho?",
      },
      answer: {
        en: "Inputs pass data down from a parent template binding; outputs expose EventEmitter or output() streams the parent listens to. The child should treat inputs as configuration and emit outputs for user actions or internal events the parent must handle. That one-way-down, events-up flow keeps data flow predictable.",
        pt: "Inputs passam dados do template do pai; outputs expõem EventEmitter ou streams de output() que o pai escuta. O filho deve tratar inputs como configuração e emitir outputs para ações do usuário ou eventos internos que o pai precisa tratar. Esse fluxo para baixo e eventos para cima mantém o fluxo de dados previsível.",
      },
    },
    {
      id: "angular-change-detection",
      category: "components",
      question: {
        en: "What is change detection in Angular?",
        pt: "O que é change detection no Angular?",
      },
      answer: {
        en: "Change detection walks the component tree to see whether bindings need updating after asynchronous work, DOM events, or other triggers. Default strategy checks components broadly; OnPush narrows when a component is checked. Understanding when a view refreshes helps explain performance and why immutable patterns matter for inputs.",
        pt: "Change detection percorre a árvore de componentes para ver se bindings precisam atualizar após trabalho assíncrono, eventos de DOM ou outros gatilhos. A estratégia default verifica componentes de forma ampla; OnPush restringe quando um componente é checado. Entender quando a view atualiza ajuda a explicar performance e por que padrões imutáveis importam para inputs.",
      },
    },
    {
      id: "angular-onpush-strategy",
      category: "components",
      question: {
        en: "When does a component with OnPush update its view?",
        pt: "Quando um componente com OnPush atualiza sua view?",
      },
      answer: {
        en: "OnPush still runs change detection when an @Input reference changes, an event originates in the component or its subtree, an async pipe receives a new value, or a bound signal updates. It does not mean the view never updates without a new input object—context matters. OnPush reduces redundant checks when inputs and templates are stable.",
        pt: "OnPush ainda roda change detection quando uma referência de @Input muda, um evento se origina no componente ou subárvore, um async pipe recebe valor novo, ou um signal ligado atualiza. Não significa que a view nunca atualiza sem objeto input novo—o contexto importa. OnPush reduz checagens redundantes quando inputs e templates são estáveis.",
      },
    },
    {
      id: "angular-lifecycle-and-cleanup",
      category: "components",
      question: {
        en: "How should you clean up subscriptions and resources when a component is destroyed?",
        pt: "Como você deve fazer cleanup de subscriptions e recursos quando um componente é destruído?",
      },
      answer: {
        en: "Prefer takeUntilDestroyed with an injected DestroyRef so subscriptions end when the component is destroyed without manual unsubscribe boilerplate. ngOnDestroy remains valid for other teardown. Leaked subscriptions keep handlers alive and can update a destroyed view indirectly through shared services.",
        pt: "Prefira takeUntilDestroyed com DestroyRef injetado para subscriptions terminarem quando o componente é destruído, sem boilerplate manual de unsubscribe. ngOnDestroy continua válido para outro teardown. Subscriptions vazadas mantêm handlers vivos e podem atualizar uma view destruída indiretamente via services compartilhados.",
      },
    },
    {
      id: "angular-property-binding",
      category: "templates",
      question: {
        en: "What is property binding in Angular templates?",
        pt: "O que é property binding em templates Angular?",
      },
      answer: {
        en: "Property binding sets a DOM or component property from an expression using square brackets, for example [disabled] or [value]. It targets the element or component property, not always the HTML attribute with the same name. Use it when the bound side is a property API rather than a static attribute string.",
        pt: "Property binding define uma propriedade de DOM ou componente a partir de uma expressão com colchetes, por exemplo [disabled] ou [value]. Ele mira a propriedade do elemento ou componente, não sempre o atributo HTML com o mesmo nome. Use quando o lado ligado é API de propriedade, não string de atributo estático.",
      },
    },
    {
      id: "angular-event-binding",
      category: "templates",
      question: {
        en: "How does event binding work in templates?",
        pt: "Como event binding funciona em templates?",
      },
      answer: {
        en: "Event binding listens to DOM or component output events with parentheses, such as (click) or (selectionChange). The handler runs in the component zone and can update state that change detection will reflect. Keep handlers focused; heavy work may belong in a service or async flow.",
        pt: "Event binding escuta eventos de DOM ou output de componente com parênteses, como (click) ou (selectionChange). O handler roda na zone do componente e pode atualizar state que change detection refletirá. Mantenha handlers focados; trabalho pesado pode pertencer a um service ou fluxo assíncrono.",
      },
    },
    {
      id: "angular-two-way-binding",
      category: "templates",
      question: {
        en: "What is two-way binding and when is it appropriate?",
        pt: "O que é two-way binding e quando é apropriado?",
      },
      answer: {
        en: "Two-way binding combines property and event binding, often with [(ngModel)] on supported controls. The template and component stay in sync for that field. It is convenient for simple forms but couples the view tightly; reactive forms or explicit bindings give more control for complex validation and state.",
        pt: "Two-way binding combina property e event binding, muitas vezes com [(ngModel)] em controles suportados. Template e componente ficam em sync para aquele campo. É conveniente em formulários simples, mas acopla a view; reactive forms ou bindings explícitos dão mais controle para validação e state complexos.",
      },
    },
    {
      id: "angular-if-control-flow",
      category: "templates",
      question: {
        en: "How does @if control flow replace older conditional directives?",
        pt: "Como o control flow @if substitui diretivas condicionais antigas?",
      },
      answer: {
        en: "The @if block renders its template when the condition is truthy, with optional @else branches, using native template syntax instead of a structural directive attribute. It improves readability and type narrowing inside blocks. Conditions should stay simple; complex logic belongs in the component class.",
        pt: "O bloco @if renderiza seu template quando a condição é truthy, com ramos @else opcionais, usando sintaxe nativa de template em vez de atributo de diretiva estrutural. Melhora legibilidade e type narrowing dentro dos blocos. Condições devem permanecer simples; lógica complexa pertence à classe do componente.",
      },
    },
    {
      id: "angular-for-track",
      category: "templates",
      question: {
        en: "Why does @for require a track expression?",
        pt: "Por que @for exige uma expressão track?",
      },
      answer: {
        en: "@for repeats a template for each item and uses track to identify row identity across collection changes. A stable unique key lets Angular reuse DOM and component state correctly when items move, insert, or delete. Avoid tracking only by index when the list can be reordered or filtered.",
        pt: "@for repete um template para cada item e usa track para identificar a identidade da linha em mudanças da coleção. Uma chave única estável deixa o Angular reutilizar DOM e state do componente corretamente quando itens movem, inserem ou removem. Evite track só por índice quando a lista pode ser reordenada ou filtrada.",
      },
    },
    {
      id: "angular-pipes-and-template-expressions",
      category: "templates",
      question: {
        en: "What are pipes and what limits apply to template expressions?",
        pt: "O que são pipes e quais limites se aplicam a expressões de template?",
      },
      answer: {
        en: "Pipes transform displayed values in the template, such as date or currency formatting; pure pipes run only when inputs change. Template expressions should stay side-effect free and simple—no assignments or heavy logic. Complex formatting or business rules belong in the component or a pipe you can test.",
        pt: "Pipes transformam valores exibidos no template, como formatação de data ou moeda; pipes pure rodam só quando inputs mudam. Expressões de template devem ser sem side effects e simples—sem atribuições ou lógica pesada. Formatação complexa ou regras de negócio pertencem ao componente ou a um pipe testável.",
      },
    },
    {
      id: "angular-service-responsibilities",
      category: "services-di",
      question: {
        en: "What belongs in an Angular service?",
        pt: "O que pertence a um service Angular?",
      },
      answer: {
        en: "Services encapsulate logic and state that is not tied to a single template—HTTP access, caching, facades, or shared application behavior. Components should stay thin and delegate to services for reuse and testing. A service is a plain injectable class; it is not automatically a singleton unless provided that way.",
        pt: "Services encapsulam lógica e state não ligados a um único template—acesso HTTP, cache, facades ou comportamento compartilhado da aplicação. Componentes devem permanecer finos e delegar a services para reuso e testes. Um service é uma classe injectable comum; não é singleton automaticamente a menos que seja provided assim.",
      },
    },
    {
      id: "angular-dependency-injection",
      category: "services-di",
      question: {
        en: "How does dependency injection work in Angular?",
        pt: "Como dependency injection funciona no Angular?",
      },
      answer: {
        en: "The injector resolves a token to an instance based on provider configuration when a class requests dependencies in its constructor or via inject(). Angular builds a tree of injectors aligned with the component hierarchy. DI enables testability by swapping implementations without changing consumers.",
        pt: "O injector resolve um token para uma instância conforme a configuração de providers quando uma classe pede dependências no constructor ou via inject(). Angular monta uma árvore de injectors alinhada à hierarquia de componentes. DI habilita testabilidade ao trocar implementações sem mudar consumidores.",
      },
    },
    {
      id: "angular-provider-registration",
      category: "services-di",
      question: {
        en: "Where can you register providers in Angular?",
        pt: "Onde você pode registrar providers no Angular?",
      },
      answer: {
        en: "providedIn: 'root' registers a tree-shakable app-wide singleton. Component or route providers scope instances to that subtree. Environment providers in bootstrap or route config attach services to specific contexts. Choose scope based on lifetime and isolation, not convenience alone.",
        pt: "providedIn: 'root' registra singleton tree-shakable em todo o app. Providers de componente ou rota limitam instâncias à subárvore. Environment providers no bootstrap ou config de rota anexam services a contextos específicos. Escolha escopo por lifetime e isolamento, não só conveniência.",
      },
    },
    {
      id: "angular-hierarchical-injectors",
      category: "services-di",
      question: {
        en: "How do hierarchical injectors resolve a token?",
        pt: "Como injectors hierárquicos resolvem um token?",
      },
      answer: {
        en: "When a component asks for a dependency, Angular searches from the element injector up through parent injectors until it finds a matching provider. A provider on a child component can shadow a parent registration for that subtree. That model supports shared defaults with local overrides.",
        pt: "Quando um componente pede uma dependência, Angular busca do injector do elemento para cima pelos injectors pais até encontrar um provider correspondente. Um provider no filho pode sombrear um registro do pai para aquela subárvore. Esse modelo suporta defaults compartilhados com overrides locais.",
      },
    },
    {
      id: "angular-injection-tokens",
      category: "services-di",
      question: {
        en: "When do you use InjectionToken?",
        pt: "Quando você usa InjectionToken?",
      },
      answer: {
        en: "InjectionToken provides a typed key for values that are not classes—configuration objects, API base URLs, or feature flags. Consumers inject the token instead of a string key that collides easily. It keeps DI explicit and works with multi providers when several values share a token.",
        pt: "InjectionToken fornece uma chave tipada para valores que não são classes—objetos de configuração, URLs base de API ou feature flags. Consumidores injetam o token em vez de uma string que colide facilmente. Mantém DI explícita e funciona com multi providers quando vários valores compartilham um token.",
      },
    },
    {
      id: "angular-provider-scope",
      category: "services-di",
      question: {
        en: "What is the difference between a root singleton and a scoped provider?",
        pt: "Qual a diferença entre singleton de root e provider com escopo?",
      },
      answer: {
        en: "A root-provided service shares one instance for the whole application. A provider on a component creates a new instance per component instance (or per injector boundary), useful for per-route state or isolated facades. Mis-scoped singletons hide bugs when mutable state leaks across unrelated features.",
        pt: "Um service providedIn root compartilha uma instância para todo o app. Um provider no componente cria instância nova por instância de componente (ou por fronteira de injector), útil para state por rota ou facades isoladas. Singletons com escopo errado escondem bugs quando state mutável vaza entre features não relacionadas.",
      },
    },
    {
      id: "angular-observable-subscriptions",
      category: "observables",
      question: {
        en: "What is an Observable subscription contract in Angular apps?",
        pt: "Qual é o contrato de subscription de Observable em apps Angular?",
      },
      answer: {
        en: "Subscribing starts the stream and delivers next, error, and complete notifications to your handler. Until something subscribes, many cold Observables do nothing. You must end subscriptions when the consumer no longer needs updates—DestroyRef patterns, async pipe, or finite streams—to avoid leaks and stray UI updates.",
        pt: "Subscribe inicia o stream e entrega notificações next, error e complete ao seu handler. Até algo assinar, muitos Observables cold não fazem nada. Você deve encerrar subscriptions quando o consumidor não precisa mais de updates—padrões com DestroyRef, async pipe ou streams finitos—para evitar vazamentos e updates de UI perdidos.",
      },
    },
    {
      id: "angular-subject-multicast",
      category: "observables",
      question: {
        en: "When is a Subject appropriate compared with a plain Observable?",
        pt: "Quando um Subject é apropriado em comparação com um Observable simples?",
      },
      answer: {
        en: "A Subject multicasts values to current subscribers and is both an observer and observable—useful for event buses in a service. It is not a drop-in replacement for every Observable factory. Hot sources need careful subscription timing; prefer cold HttpClient Observables or explicit factories when each subscriber should get its own execution.",
        pt: "Um Subject multicast valores para assinantes atuais e é observer e observable—útil para event buses em um service. Não substitui toda factory de Observable. Fontes hot exigem timing cuidadoso de subscription; prefira Observables cold do HttpClient ou factories explícitas quando cada assinante deve ter sua própria execução.",
      },
    },
    {
      id: "angular-async-pipe",
      category: "observables",
      question: {
        en: "What does the async pipe do in templates?",
        pt: "O que o async pipe faz em templates?",
      },
      answer: {
        en: "The async pipe subscribes to an Observable or Promise, exposes the latest emitted value to the template, and unsubscribes when the view is destroyed. It triggers change detection when new values arrive, which matters for OnPush components. It reduces manual subscribe and unsubscribe in simple read-only bindings.",
        pt: "O async pipe assina um Observable ou Promise, expõe o último valor emitido ao template e cancela subscription quando a view é destruída. Dispara change detection quando valores novos chegam, o que importa para componentes OnPush. Reduz subscribe e unsubscribe manual em bindings somente leitura simples.",
      },
    },
    {
      id: "angular-switch-map",
      category: "observables",
      question: {
        en: "What problem does switchMap solve?",
        pt: "Que problema switchMap resolve?",
      },
      answer: {
        en: "switchMap maps each outer emission to an inner Observable and switches to the newest inner stream, unsubscribing from the previous inner subscription. That cancels stale work such as outdated HTTP responses when the user types a new search term. It is not always the right operator when you need every inner result to complete.",
        pt: "switchMap mapeia cada emissão externa para um Observable interno e troca para o stream interno mais novo, cancelando a subscription interna anterior. Isso cancela trabalho obsoleto como respostas HTTP antigas quando o usuário digita um novo termo de busca. Não é sempre o operador certo quando você precisa que todo resultado interno complete.",
      },
    },
    {
      id: "angular-map-and-combine-latest",
      category: "observables",
      question: {
        en: "How do map and combineLatest differ in typical UI use?",
        pt: "Como map e combineLatest diferem em uso típico de UI?",
      },
      answer: {
        en: "map transforms each value on a single stream without changing the subscription count. combineLatest waits for each source to have emitted at least once, then emits an array or projected object whenever any source updates—handy for dashboards built from several inputs. combineLatest can fire often; design streams to avoid redundant work.",
        pt: "map transforma cada valor em um único stream sem mudar a contagem de subscriptions. combineLatest espera cada fonte ter emitido ao menos uma vez, depois emite array ou objeto projetado quando qualquer fonte atualiza—útil para dashboards de várias entradas. combineLatest pode disparar muito; desenhe streams para evitar trabalho redundante.",
      },
    },
    {
      id: "angular-rxjs-error-handling",
      category: "observables",
      question: {
        en: "How should you handle errors in RxJS pipelines?",
        pt: "Como você deve tratar erros em pipelines RxJS?",
      },
      answer: {
        en: "Use catchError to recover or substitute a fallback Observable so the stream can continue or complete gracefully. Handle errors at a boundary that understands user impact—often in the service or component subscription, not buried in every map. Rethrow or return EMPTY when the UI should show a dedicated error state.",
        pt: "Use catchError para recuperar ou substituir um Observable de fallback para o stream continuar ou completar com graça. Trate erros em uma fronteira que entenda impacto no usuário—muitas vezes no service ou na subscription do componente, não escondido em todo map. Relance ou retorne EMPTY quando a UI deve mostrar estado de erro dedicado.",
      },
    },
    {
      id: "angular-reactive-vs-template-forms",
      category: "forms",
      question: {
        en: "When do you choose reactive forms over template-driven forms?",
        pt: "Quando você escolhe reactive forms em vez de template-driven forms?",
      },
      answer: {
        en: "Reactive forms model the form in the component with FormControl and FormGroup, which scales to dynamic fields, validators, and unit tests. Template-driven forms bind with directives and suit simple screens quickly. Reactive forms give explicit, immutable-style updates; template-driven keeps more logic in the template.",
        pt: "Reactive forms modelam o formulário no componente com FormControl e FormGroup, o que escala para campos dinâmicos, validators e testes unitários. Template-driven forms ligam com diretivas e servem para telas simples rápido. Reactive forms dão updates explícitos em estilo imutável; template-driven mantém mais lógica no template.",
      },
    },
    {
      id: "angular-form-control-and-group",
      category: "forms",
      question: {
        en: "What are FormControl and FormGroup?",
        pt: "O que são FormControl e FormGroup?",
      },
      answer: {
        en: "FormControl tracks value, validation status, and user interaction for one field. FormGroup aggregates named controls into one object with a combined value and status. Nested FormGroups and FormArrays model complex shapes. You read value and errors from the group when submitting or displaying validation messages.",
        pt: "FormControl rastreia valor, status de validação e interação do usuário para um campo. FormGroup agrega controles nomeados em um objeto com valor e status combinados. FormGroups e FormArrays aninhados modelam formas complexas. Você lê value e errors do group no submit ou ao exibir mensagens de validação.",
      },
    },
    {
      id: "angular-form-validation",
      category: "forms",
      question: {
        en: "How does built-in form validation surface in the UI?",
        pt: "Como a validação built-in de formulário aparece na UI?",
      },
      answer: {
        en: "Validators attach to controls and set errors on the control state when rules fail. The template checks invalid, touched, or errors to show messages. Async validators can pend while a server check runs. Keep messages accessible and tied to the control that failed, not only a generic banner.",
        pt: "Validators se anexam a controles e setam errors no state do controle quando regras falham. O template checa invalid, touched ou errors para mostrar mensagens. Validators assíncronos podem ficar pending enquanto checagem no servidor roda. Mantenha mensagens acessíveis e ligadas ao controle que falhou, não só um banner genérico.",
      },
    },
    {
      id: "angular-custom-validators",
      category: "forms",
      question: {
        en: "How do you implement a custom validator?",
        pt: "Como você implementa um validator customizado?",
      },
      answer: {
        en: "A validator is a function that receives the control and returns null when valid or an error object when invalid. Register it on the control or group in reactive forms, or via directives in template-driven setups. Keep validators pure and fast; async rules use AsyncValidatorFn with Observable results.",
        pt: "Um validator é uma função que recebe o controle e retorna null quando válido ou objeto de erro quando inválido. Registre no controle ou group em reactive forms, ou via diretivas em setups template-driven. Mantenha validators puros e rápidos; regras assíncronas usam AsyncValidatorFn com resultados Observable.",
      },
    },
    {
      id: "angular-route-parameters",
      category: "routing",
      question: {
        en: "How do you read route parameters in Angular?",
        pt: "Como você lê route parameters no Angular?",
      },
      answer: {
        en: "Route params identify a resource segment in the path, exposed via ActivatedRoute paramMap or input bindings on routed components in newer APIs. Subscribe or use signals/observables to react when the user navigates to a different id. Load data based on the current param, not a stale closure from an old navigation.",
        pt: "Route params identificam um segmento de recurso no path, expostos via paramMap do ActivatedRoute ou input bindings em componentes roteados em APIs mais novas. Subscribe ou use signals/observables para reagir quando o usuário navega para outro id. Carregue dados pelo param atual, não por closure obsoleta de navegação antiga.",
      },
    },
    {
      id: "angular-query-parameters",
      category: "routing",
      question: {
        en: "What are query parameters used for?",
        pt: "Para que servem query parameters?",
      },
      answer: {
        en: "Query params decorate the URL with optional filters, tabs, or pagination without changing the route config shape. Read them from queryParamMap on ActivatedRoute. They are useful for shareable URLs and shallow state, but sensitive authorization should not rely on query strings alone.",
        pt: "Query params decoram a URL com filtros, abas ou paginação opcionais sem mudar a forma da route config. Leia-os de queryParamMap no ActivatedRoute. São úteis para URLs compartilháveis e state raso, mas autorização sensível não deve depender só de query strings.",
      },
    },
    {
      id: "angular-route-guards",
      category: "routing",
      question: {
        en: "What do route guards do?",
        pt: "O que route guards fazem?",
      },
      answer: {
        en: "Guards run during navigation to allow, redirect, or cancel a route change—common patterns check authentication flags or feature toggles on the client. They improve UX by blocking invalid routes early. They do not replace server-side authorization; a user can still call APIs directly without the router.",
        pt: "Guards rodam durante a navegação para permitir, redirecionar ou cancelar mudança de rota—padrões comuns checam flags de autenticação ou feature toggles no client. Melhoram UX bloqueando rotas inválidas cedo. Não substituem autorização no servidor; o usuário ainda pode chamar APIs diretamente sem o router.",
      },
    },
    {
      id: "angular-child-and-lazy-routes",
      category: "routing",
      question: {
        en: "How do child routes and lazy loading structure an app?",
        pt: "Como child routes e lazy loading estruturam um app?",
      },
      answer: {
        en: "Child routes nest outlets under a parent path, often with their own components and guards. Lazy loading uses loadComponent or loadChildren so feature code downloads only when the user enters that route. That shrinks the initial bundle; preloading strategies can fetch lazy chunks in the background when appropriate.",
        pt: "Child routes aninham outlets sob um path pai, muitas vezes com componentes e guards próprios. Lazy loading usa loadComponent ou loadChildren para o código da feature baixar só quando o usuário entra na rota. Isso reduz o bundle inicial; estratégias de preload podem buscar chunks lazy em background quando apropriado.",
      },
    },
    {
      id: "angular-http-client",
      category: "http",
      question: {
        en: "How does HttpClient fit Angular applications?",
        pt: "Como HttpClient se encaixa em aplicações Angular?",
      },
      answer: {
        en: "HttpClient sends HTTP requests and returns Observables of the response body or events. You configure JSON parsing, headers, and params in a fluent API. Typing the expected response improves safety. One subscription triggers one request for typical get calls; share replay operators only when you intentionally multicast.",
        pt: "HttpClient envia requests HTTP e retorna Observables do body da response ou eventos. Você configura parse JSON, headers e params em API fluente. Tipar a response esperada melhora segurança. Uma subscription dispara um request em gets típicos; operadores de share replay só quando você multicast intencionalmente.",
      },
    },
    {
      id: "angular-http-observables",
      category: "http",
      question: {
        en: "Why does HttpClient return Observables instead of Promises?",
        pt: "Por que HttpClient retorna Observables em vez de Promises?",
      },
      answer: {
        en: "Observables can emit multiple values, support cancellation when unsubscribed, and compose with RxJS operators for retries and switching. A single HTTP response is still often one emission, but the contract matches other async streams in Angular. Unsubscribing can abort the request when using appropriate APIs, avoiding wasted work.",
        pt: "Observables podem emitir vários valores, suportam cancelamento ao cancelar subscription e compõem com operadores RxJS para retries e switching. Uma única response HTTP ainda é muitas vezes uma emissão, mas o contrato combina com outros streams assíncronos no Angular. Cancelar subscription pode abortar o request com APIs apropriadas, evitando trabalho desperdiçado.",
      },
    },
    {
      id: "angular-http-interceptors",
      category: "http",
      question: {
        en: "What are HTTP interceptors responsible for?",
        pt: "Do que HTTP interceptors são responsáveis?",
      },
      answer: {
        en: "Interceptors sit in the HttpClient pipeline to read or modify outgoing requests and incoming responses—adding auth headers, logging, or error normalization. HttpRequest is immutable; interceptors clone it to change headers or body. Functional interceptors are the modern style registered with provideHttpClient and withInterceptors.",
        pt: "Interceptors ficam no pipeline do HttpClient para ler ou modificar requests de saída e responses de entrada—adicionar headers de auth, logging ou normalização de erro. HttpRequest é imutável; interceptors clonam para mudar headers ou body. Interceptors funcionais são o estilo moderno registrados com provideHttpClient e withInterceptors.",
      },
    },
    {
      id: "angular-http-error-handling",
      category: "http",
      question: {
        en: "How should HTTP errors be handled in the client?",
        pt: "Como erros HTTP devem ser tratados no client?",
      },
      answer: {
        en: "HttpClient surfaces failures as error notifications on the Observable. Map status codes to user-visible messages in a service or interceptor, and use catchError to return a fallback or rethrow for the component. Distinguish network errors from 4xx/5xx responses so the UI can retry or sign out appropriately.",
        pt: "HttpClient expõe falhas como notificações de erro no Observable. Mapeie status codes para mensagens visíveis ao usuário em service ou interceptor, e use catchError para retornar fallback ou relançar para o componente. Distinga erros de rede de responses 4xx/5xx para a UI poder retry ou sign out adequadamente.",
      },
    },
    {
      id: "angular-component-testing",
      category: "testing",
      question: {
        en: "How do you test an Angular component's behavior?",
        pt: "Como você testa o comportamento de um componente Angular?",
      },
      answer: {
        en: "Configure TestBed with the standalone component and its imports, then create a fixture and detectChanges. Query the DOM as a user would—text, roles, buttons—and trigger events. Assert rendered output and emitted outputs rather than private fields. Keep tests focused on one behavior per spec when possible.",
        pt: "Configure TestBed com o standalone component e seus imports, depois crie fixture e detectChanges. Consulte o DOM como um usuário—texto, roles, botões—e dispare eventos. Faça assert de saída renderizada e outputs emitidos, não de campos privados. Mantenha testes focados em um comportamento por spec quando possível.",
      },
    },
    {
      id: "angular-service-testing",
      category: "testing",
      question: {
        en: "How do you unit test a service with dependencies?",
        pt: "Como você testa unitariamente um service com dependências?",
      },
      answer: {
        en: "Provide the service under test in TestBed along with mock providers for its tokens—other services or configuration. Call public methods and assert return values or side effects on mocks. Prefer testing through the service API instead of reaching into private implementation details.",
        pt: "Forneça o service sob teste no TestBed junto com providers mock para seus tokens—outros services ou configuração. Chame métodos públicos e faça assert de valores retornados ou side effects nos mocks. Prefira testar pela API do service em vez de alcançar detalhes privados de implementação.",
      },
    },
    {
      id: "angular-http-testing",
      category: "testing",
      question: {
        en: "How does HttpTestingController help test HTTP code?",
        pt: "Como HttpTestingController ajuda a testar código HTTP?",
      },
      answer: {
        en: "Import HttpClientTestingModule or provide the testing setup so requests never hit the network. After the code under test runs, expectOne or match verifies URL, method, and body, then flush a mock response. That keeps tests fast and deterministic while still exercising interceptors and services.",
        pt: "Importe HttpClientTestingModule ou forneça setup de teste para requests nunca irem à rede. Depois que o código sob teste roda, expectOne ou match verifica URL, method e body, depois flush de response mock. Isso mantém testes rápidos e determinísticos ainda exercitando interceptors e services.",
      },
    },
    {
      id: "angular-observable-testing",
      category: "testing",
      question: {
        en: "How do you test Observable-based logic without flaky timing?",
        pt: "Como você testa lógica baseada em Observable sem timing flaky?",
      },
      answer: {
        en: "Subscribe in the test and assert on emitted values with explicit expectations, or use firstValueFrom or lastValueFrom on finite streams. fakeAsync and tick help when code depends on schedulers or delayed operators. Avoid arbitrary setTimeout; prefer controlling the Observable source or using marble diagrams only when complexity demands it.",
        pt: "Subscribe no teste e faça assert nos valores emitidos com expectations explícitas, ou use firstValueFrom ou lastValueFrom em streams finitos. fakeAsync e tick ajudam quando o código depende de schedulers ou operadores com delay. Evite setTimeout arbitrário; prefira controlar a fonte Observable ou usar marble diagrams só quando a complexidade exige.",
      },
    },
  ];
