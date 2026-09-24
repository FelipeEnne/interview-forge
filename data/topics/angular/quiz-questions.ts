import type { QuizQuestion } from "@/data/quiz-types";

import type { AngularQuestionCategory } from "./categories";

export const ANGULAR_QUIZ_QUESTIONS: readonly QuizQuestion<AngularQuestionCategory>[] =
  [
    {
      id: "angular-quiz-standalone-imports",
      category: "components",
      question: {
        en: "A standalone UserProfile component renders the standalone AvatarComponent in its template. How should UserProfile declare this template dependency?",
        pt: "Um UserProfile standalone renderiza o AvatarComponent standalone em seu template. Como UserProfile deve declarar essa dependência do template?",
      },
      options: [
        {
          en: "Add AvatarComponent to the providers array of UserProfile",
          pt: "Adicionar AvatarComponent ao array providers de UserProfile",
        },
        {
          en: "Add AvatarComponent to the imports array of UserProfile metadata",
          pt: "Adicionar AvatarComponent ao array imports dos metadados de UserProfile",
        },
        {
          en: "Inject AvatarComponent through the UserProfile constructor",
          pt: "Injetar AvatarComponent pelo construtor de UserProfile",
        },
        {
          en: "Register AvatarComponent as a global application provider",
          pt: "Registrar AvatarComponent como provider global da aplicação",
        },
      ],
      correctOption: 1,
    },
    {
      id: "angular-quiz-onpush-input-reference",
      category: "components",
      question: {
        en: "An OnPush child receives a settings object through an input. The parent mutates settings.theme but keeps the same object reference. What should the parent do to reliably update the child from that input change?",
        pt: "Um filho OnPush recebe um objeto settings por input. O pai muta settings.theme, mas mantém a mesma referência de objeto. O que o pai deve fazer para atualizar o filho de modo confiável por essa mudança de input?",
      },
      options: [
        {
          en: "Call detectChanges on every child after mutating the object",
          pt: "Chamar detectChanges em todo filho depois de mutar o objeto",
        },
        {
          en: "Change the input decorator to an output so the child receives events",
          pt: "Trocar o decorator input por output para que o filho receba eventos",
        },
        {
          en: "Create and pass a new settings object with the changed theme",
          pt: "Criar e passar um novo objeto settings com o theme alterado",
        },
        {
          en: "Remove OnPush so Angular always checks every component",
          pt: "Remover OnPush para que o Angular sempre verifique todo componente",
        },
      ],
      correctOption: 2,
    },
    {
      id: "angular-quiz-lifecycle-cleanup",
      category: "components",
      question: {
        en: "A component starts a notification subscription from a click handler, outside an injection context. Which modern approach automatically cleans it up when the component is destroyed without maintaining a destroy Subject?",
        pt: "Um componente inicia uma subscription de notificações a partir de um click handler, fora de um injection context. Qual abordagem moderna faz cleanup automaticamente quando o componente é destruído, sem manter um Subject de destruição?",
      },
      options: [
        {
          en: "Use async pipe in the click handler to own the subscription",
          pt: "Usar async pipe no click handler para possuir a subscription",
        },
        {
          en: "Store every Subscription in an array and loop over it on each render",
          pt: "Guardar toda Subscription em um array e percorrê-lo em todo render",
        },
        {
          en: "Create a Subject and emit from every route navigation event",
          pt: "Criar um Subject e emitir a partir de todo evento de navegação de rota",
        },
        {
          en: "Inject DestroyRef and pipe the stream through takeUntilDestroyed(destroyRef)",
          pt: "Injetar DestroyRef e passar o stream por takeUntilDestroyed(destroyRef)",
        },
      ],
      correctOption: 3,
    },
    {
      id: "angular-quiz-property-event-binding",
      category: "templates",
      question: {
        en: "A component must display a photo URL from avatarUrl and notify saveProfile when a button is clicked. Which binding combination is correct?",
        pt: "Um componente precisa exibir uma URL de foto vinda de avatarUrl e notificar saveProfile quando um botão é clicado. Qual combinação de bindings está correta?",
      },
      options: [
        {
          en: 'Use [src]="avatarUrl" and (click)="saveProfile()"',
          pt: 'Usar [src]="avatarUrl" e (click)="saveProfile()"',
        },
        {
          en: 'Use (src)="avatarUrl" and [click]="saveProfile()"',
          pt: 'Usar (src)="avatarUrl" e [click]="saveProfile()"',
        },
        {
          en: 'Use {{ src }}="avatarUrl" and {{ click }}="saveProfile()"',
          pt: 'Usar {{ src }}="avatarUrl" e {{ click }}="saveProfile()"',
        },
        {
          en: 'Use #src="avatarUrl" and #click="saveProfile()"',
          pt: 'Usar #src="avatarUrl" e #click="saveProfile()"',
        },
      ],
      correctOption: 0,
    },
    {
      id: "angular-quiz-for-track-identity",
      category: "templates",
      question: {
        en: "A dynamic @for list of editable orders can be sorted and filtered. Which track expression best preserves each order's identity?",
        pt: "Uma lista dinâmica @for de pedidos editáveis pode ser ordenada e filtrada. Qual expressão track preserva melhor a identidade de cada pedido?",
      },
      options: [
        {
          en: "track $index, because it follows the order currently displayed",
          pt: "track $index, porque ele segue a ordem exibida atualmente",
        },
        {
          en: "track order.id, because it is stable for the same order",
          pt: "track order.id, porque ele é estável para o mesmo pedido",
        },
        {
          en: "track Math.random(), because each row should get a fresh identity",
          pt: "track Math.random(), porque cada linha deve receber uma identidade nova",
        },
        {
          en: "track order.status, because orders in the same state look alike",
          pt: "track order.status, porque pedidos no mesmo estado se parecem",
        },
      ],
      correctOption: 1,
    },
    {
      id: "angular-quiz-pipe-presentation",
      category: "templates",
      question: {
        en: "A report stores prices as numbers and only needs currency formatting in the template. What is the appropriate choice?",
        pt: "Um relatório guarda preços como números e precisa apenas de formatação monetária no template. Qual é a escolha apropriada?",
      },
      options: [
        {
          en: "Mutate every price in the service into a formatted string",
          pt: "Mutar todo preço no service para uma string formatada",
        },
        {
          en: "Format the price inside a click handler before each render",
          pt: "Formatar o preço dentro de um click handler antes de cada render",
        },
        {
          en: "Apply the currency pipe where the price is displayed",
          pt: "Aplicar o currency pipe onde o preço é exibido",
        },
        {
          en: "Replace the numeric price with a DOM attribute after rendering",
          pt: "Substituir o preço numérico por um atributo do DOM depois de renderizar",
        },
      ],
      correctOption: 2,
    },
    {
      id: "angular-quiz-service-injection",
      category: "services-di",
      question: {
        en: "Two unrelated components need the same API access and caching behavior. Which design best shares that responsibility?",
        pt: "Dois componentes não relacionados precisam do mesmo acesso à API e comportamento de cache. Qual design compartilha melhor essa responsabilidade?",
      },
      options: [
        {
          en: "Duplicate the HTTP calls in both components to keep them independent",
          pt: "Duplicar as chamadas HTTP nos dois componentes para mantê-los independentes",
        },
        {
          en: "Put the cache in a global variable and read it directly from both templates",
          pt: "Colocar o cache em uma variável global e lê-lo diretamente de ambos os templates",
        },
        {
          en: "Pass one component instance to the other through an input",
          pt: "Passar uma instância de componente para o outro por meio de um input",
        },
        {
          en: "Provide an API service and inject it into both components",
          pt: "Fornecer um API service e injetá-lo nos dois componentes",
        },
      ],
      correctOption: 3,
    },
    {
      id: "angular-quiz-provider-scope",
      category: "services-di",
      question: {
        en: "Every instance of an editable dashboard needs its own DraftService state, shared only by descendants of that dashboard. Where should the provider be declared?",
        pt: "Cada instância de um dashboard editável precisa de seu próprio state de DraftService, compartilhado apenas pelos descendentes daquele dashboard. Onde o provider deve ser declarado?",
      },
      options: [
        {
          en: "In the dashboard component's providers so each dashboard subtree gets an instance",
          pt: "Nos providers do componente dashboard para que cada subárvore de dashboard receba uma instância",
        },
        {
          en: "With providedIn: 'root' so the entire application shares one instance",
          pt: "Com providedIn: 'root' para que toda a aplicação compartilhe uma instância",
        },
        {
          en: "In every descendant template so each view can create the service",
          pt: "Em todo template descendente para que cada view possa criar o service",
        },
        {
          en: "In a route parameter so Angular recreates the service on navigation",
          pt: "Em um parâmetro de rota para que o Angular recrie o service na navegação",
        },
      ],
      correctOption: 0,
    },
    {
      id: "angular-quiz-provider-resolution",
      category: "services-di",
      question: {
        en: "The same token is provided by a child component and by an ancestor. When the child requests that token, which provider is used first?",
        pt: "O mesmo token é fornecido por um componente filho e por um ancestral. Quando o filho solicita esse token, qual provider é usado primeiro?",
      },
      options: [
        {
          en: "The root provider always wins because it was created at bootstrap",
          pt: "O provider raiz sempre vence porque foi criado no bootstrap",
        },
        {
          en: "The closest matching provider in the injector hierarchy is used",
          pt: "O provider correspondente mais próximo na hierarquia de injectors é usado",
        },
        {
          en: "Angular combines both providers into one shared service instance",
          pt: "O Angular combina ambos os providers em uma instância de service compartilhada",
        },
        {
          en: "The provider declared last in source code is always used",
          pt: "O provider declarado por último no código-fonte é sempre usado",
        },
      ],
      correctOption: 1,
    },
    {
      id: "angular-quiz-switchmap-search",
      category: "observables",
      question: {
        en: "A search box emits terms rapidly, and an older HTTP response must not replace newer results. Which RxJS operator fits this stream?",
        pt: "Uma caixa de busca emite termos rapidamente, e uma resposta HTTP antiga não pode substituir resultados mais novos. Qual operador RxJS se encaixa nesse stream?",
      },
      options: [
        {
          en: "concatMap, so every search waits for all earlier searches to finish",
          pt: "concatMap, para que toda busca espere todas as buscas anteriores terminarem",
        },
        {
          en: "mergeMap, so all searches keep emitting results independently",
          pt: "mergeMap, para que todas as buscas continuem emitindo resultados independentemente",
        },
        {
          en: "switchMap, so a new term switches away from the previous inner stream",
          pt: "switchMap, para que um novo termo troque o stream interno anterior",
        },
        {
          en: "tap, so search terms are logged before every HTTP request",
          pt: "tap, para que termos de busca sejam registrados antes de cada request HTTP",
        },
      ],
      correctOption: 2,
    },
    {
      id: "angular-quiz-subject-multicast",
      category: "observables",
      question: {
        en: "A service must imperatively publish refresh events to several components that subscribe to it. Which construct directly supports this role?",
        pt: "Um service precisa publicar imperativamente eventos de atualização para vários componentes que fazem subscription. Qual construct suporta diretamente esse papel?",
      },
      options: [
        {
          en: "A plain Observable, by calling next on the value returned from subscribe",
          pt: "Um Observable simples, chamando next no valor retornado de subscribe",
        },
        {
          en: "A Promise, by resolving it repeatedly for every refresh event",
          pt: "Uma Promise, resolvendo-a repetidamente para todo evento de atualização",
        },
        {
          en: "A template variable, by assigning the latest event to its value",
          pt: "Uma variável de template, atribuindo o evento mais recente ao seu valor",
        },
        {
          en: "A Subject, because it can emit values and multicast them to subscribers",
          pt: "Um Subject, porque ele pode emitir valores e distribuí-los a subscribers",
        },
      ],
      correctOption: 3,
    },
    {
      id: "angular-quiz-async-pipe",
      category: "observables",
      question: {
        en: "A template displays values from a user$ Observable. What does async pipe provide for this use case?",
        pt: "Um template exibe valores de um Observable user$. O que async pipe fornece nesse caso de uso?",
      },
      options: [
        {
          en: "It subscribes, exposes emitted values to the template, and cleans up automatically",
          pt: "Ele faz subscription, expõe valores emitidos ao template e faz cleanup automaticamente",
        },
        {
          en: "It converts the Observable into a synchronous value that never changes",
          pt: "Ele converte o Observable em um valor síncrono que nunca muda",
        },
        {
          en: "It caches every emission globally for all components in the application",
          pt: "Ele armazena toda emissão globalmente para todos os componentes da aplicação",
        },
        {
          en: "It sends each emitted value back to the service as a new request",
          pt: "Ele envia cada valor emitido de volta ao service como uma nova request",
        },
      ],
      correctOption: 0,
    },
    {
      id: "angular-quiz-reactive-validation",
      category: "forms",
      question: {
        en: "A checkout form has cross-field rules and explicit validation logic that must be unit tested. How should its validation be defined?",
        pt: "Um formulário de checkout tem regras entre campos e lógica explícita de validação que precisa de teste unitário. Como sua validação deve ser definida?",
      },
      options: [
        {
          en: "Add validation messages only after the form is submitted",
          pt: "Adicionar mensagens de validação apenas depois que o formulário for enviado",
        },
        {
          en: "Use Reactive Forms with validators on the form control model",
          pt: "Usar Reactive Forms com validators no modelo de controles do formulário",
        },
        {
          en: "Store validation errors in DOM attributes outside the form model",
          pt: "Guardar erros de validação em atributos do DOM fora do modelo do formulário",
        },
        {
          en: "Use a pipe that changes invalid input values during rendering",
          pt: "Usar um pipe que muda valores de input inválidos durante a renderização",
        },
      ],
      correctOption: 1,
    },
    {
      id: "angular-quiz-form-approach",
      category: "forms",
      question: {
        en: "A multi-step form has dynamic controls, complex validation, and business logic that needs predictable tests. Which approach is the best fit?",
        pt: "Um formulário de múltiplas etapas tem controles dinâmicos, validação complexa e lógica de negócio que precisa de testes previsíveis. Qual abordagem é a mais adequada?",
      },
      options: [
        {
          en: "Template-driven forms, because templates are the only place validators can run",
          pt: "Formulários template-driven, porque templates são o único lugar onde validators podem rodar",
        },
        {
          en: "Unbound HTML inputs, because dynamic controls should avoid Angular form APIs",
          pt: "Inputs HTML sem binding, porque controles dinâmicos devem evitar APIs de formulário do Angular",
        },
        {
          en: "Reactive Forms, because their explicit model supports dynamic controls and testing",
          pt: "Reactive Forms, porque seu modelo explícito suporta controles dinâmicos e testes",
        },
        {
          en: "A shared service with mutable fields instead of a form model",
          pt: "Um service compartilhado com campos mutáveis em vez de um modelo de formulário",
        },
      ],
      correctOption: 2,
    },
    {
      id: "angular-quiz-route-parameters",
      category: "routing",
      question: {
        en: "A ProductPage stays instantiated while navigation changes /products/1 to /products/2. How should it load the product for the new route parameter?",
        pt: "Uma ProductPage permanece instanciada enquanto a navegação muda /products/1 para /products/2. Como ela deve carregar o produto para o novo parâmetro de rota?",
      },
      options: [
        {
          en: "Read ActivatedRoute.snapshot once because route parameters never change in a component",
          pt: "Ler ActivatedRoute.snapshot uma vez porque parâmetros de rota nunca mudam em um componente",
        },
        {
          en: "Reload the entire browser page whenever the product id changes",
          pt: "Recarregar toda a página do browser sempre que o id do produto mudar",
        },
        {
          en: "Store the first product id in a module variable for later navigation",
          pt: "Guardar o primeiro id do produto em uma variável de módulo para navegação posterior",
        },
        {
          en: "React to ActivatedRoute.paramMap emissions and load for each new id",
          pt: "Reagir às emissões de ActivatedRoute.paramMap e carregar para cada novo id",
        },
      ],
      correctOption: 3,
    },
    {
      id: "angular-quiz-route-guard-boundary",
      category: "routing",
      question: {
        en: "A route requires an authenticated user, while its API returns private data. What is the correct security boundary?",
        pt: "Uma rota exige um usuário autenticado, enquanto sua API retorna dados privados. Qual é a fronteira de segurança correta?",
      },
      options: [
        {
          en: "Use a guard for navigation and enforce authentication and authorization in the API",
          pt: "Usar um guard para navegação e impor authentication e authorization na API",
        },
        {
          en: "Use only a guard because blocked navigation protects every API request",
          pt: "Usar apenas um guard porque bloquear a navegação protege toda request da API",
        },
        {
          en: "Use only hidden links because users cannot request routes they cannot see",
          pt: "Usar apenas links ocultos porque usuários não conseguem requisitar rotas que não veem",
        },
        {
          en: "Use a pipe to remove private data after the API returns it",
          pt: "Usar um pipe para remover dados privados depois que a API os retorna",
        },
      ],
      correctOption: 0,
    },
    {
      id: "angular-quiz-http-error-handling",
      category: "http",
      question: {
        en: "An HttpClient request can fail, and the UI needs a recoverable error state. Which observable path should handle that failure?",
        pt: "Uma request de HttpClient pode falhar, e a UI precisa de um estado de erro recuperável. Qual caminho do Observable deve tratar essa falha?",
      },
      options: [
        {
          en: "Ignore the error because HttpClient retries every failed request automatically",
          pt: "Ignorar o erro porque HttpClient tenta novamente toda request com falha automaticamente",
        },
        {
          en: "Use catchError to map the failure to an error state or fallback result",
          pt: "Usar catchError para mapear a falha a um estado de erro ou resultado de fallback",
        },
        {
          en: "Use tap alone because it converts HTTP errors into successful values",
          pt: "Usar apenas tap porque ele converte erros HTTP em valores de sucesso",
        },
        {
          en: "Mutate the HttpResponse body before the request reaches the server",
          pt: "Mutar o body de HttpResponse antes de a request chegar ao servidor",
        },
      ],
      correctOption: 1,
    },
    {
      id: "angular-quiz-http-interceptor",
      category: "http",
      question: {
        en: "Every outgoing request needs the same authentication header. How should a functional interceptor add it?",
        pt: "Toda request de saída precisa do mesmo header de autenticação. Como um interceptor funcional deve adicioná-lo?",
      },
      options: [
        {
          en: "Mutate the incoming request headers and return the original request",
          pt: "Mutar os headers da request recebida e retornar a request original",
        },
        {
          en: "Add the header in every component before it calls HttpClient",
          pt: "Adicionar o header em todo componente antes de ele chamar HttpClient",
        },
        {
          en: "Clone the request with the header and pass the clone to next",
          pt: "Clonar a request com o header e passar o clone para next",
        },
        {
          en: "Change the response headers after the server receives the request",
          pt: "Alterar os headers da response depois que o servidor recebe a request",
        },
      ],
      correctOption: 2,
    },
    {
      id: "angular-quiz-component-testing",
      category: "testing",
      question: {
        en: "A button increments a visible count in a component. What should its component test verify?",
        pt: "Um botão incrementa um contador visível em um componente. O que seu teste de componente deve verificar?",
      },
      options: [
        {
          en: "The exact order of private field assignments inside the component class",
          pt: "A ordem exata de atribuições de campos privados dentro da classe do componente",
        },
        {
          en: "The number of change-detection passes Angular ran after the click",
          pt: "O número de passagens de change detection que o Angular executou após o clique",
        },
        {
          en: "The component's private methods without rendering its template",
          pt: "Os métodos privados do componente sem renderizar seu template",
        },
        {
          en: "The rendered count after triggering the button interaction",
          pt: "O contador renderizado depois de disparar a interação do botão",
        },
      ],
      correctOption: 3,
    },
    {
      id: "angular-quiz-http-service-testing",
      category: "testing",
      question: {
        en: "A service loads a profile through HttpClient. How should a unit test verify the HTTP boundary and supply a response?",
        pt: "Um service carrega um perfil por HttpClient. Como um teste unitário deve verificar a fronteira HTTP e fornecer uma response?",
      },
      options: [
        {
          en: "Use HttpTestingController to expect the request and flush a test response",
          pt: "Usar HttpTestingController para esperar a request e fazer flush de uma response de teste",
        },
        {
          en: "Call the production API and assert the response from its live database",
          pt: "Chamar a API de produção e verificar a response de seu banco de dados real",
        },
        {
          en: "Replace HttpClient with a timer and wait for an arbitrary delay",
          pt: "Substituir HttpClient por um timer e esperar um atraso arbitrário",
        },
        {
          en: "Inspect the service source code without making or flushing a request",
          pt: "Inspecionar o código-fonte do service sem fazer ou responder uma request",
        },
      ],
      correctOption: 0,
    },
  ];
