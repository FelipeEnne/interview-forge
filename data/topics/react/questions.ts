import type { ReactQuestionCategory } from "./categories";
import type { InterviewQuestion } from "@/data/study-types";

export {
  REACT_CATEGORIES,
  REACT_QUESTION_CATEGORIES,
  type ReactQuestionCategory,
} from "./categories";
export type { InterviewQuestion } from "@/data/study-types";

export const REACT_QUESTIONS: readonly InterviewQuestion<ReactQuestionCategory>[] =
  [
    {
      id: "react-declarative-ui",
      category: "fundamentals",
      question: {
        en: "What does it mean that React uses a declarative UI model?",
        pt: "O que significa dizer que React usa um modelo de UI declarativo?",
      },
      answer: {
        en: "You describe what the UI should look like for a given state instead of imperatively mutating the DOM step by step. React reconciles that description with the previous tree and applies the minimal DOM updates. That separation keeps view logic easier to reason about and test than manual DOM orchestration.",
        pt: "Você descreve como a UI deve ficar para um dado state em vez de mutar o DOM imperativamente passo a passo. React reconcilia essa descrição com a árvore anterior e aplica as atualizações mínimas no DOM. Essa separação deixa a lógica de view mais fácil de raciocinar e testar do que orquestrar o DOM manualmente.",
      },
    },
    {
      id: "react-jsx-rules",
      category: "fundamentals",
      question: {
        en: "What is JSX, and what practical rules should you remember when writing it?",
        pt: "O que é JSX e quais regras práticas vale lembrar ao escrever JSX?",
      },
      answer: {
        en: "JSX is syntax that looks like HTML but compiles to JavaScript expressions that create element objects. Use curly braces for JavaScript values, one parent element per return (or a fragment), and DOM attributes like className instead of class. Treat JSX as an expression: it must evaluate to something React can render.",
        pt: "JSX é sintaxe que parece HTML, mas compila para expressões JavaScript que criam objetos de elemento. Use chaves para valores JavaScript, um elemento pai por return (ou um fragment), e atributos de DOM como className em vez de class. Trate JSX como expressão: ela precisa avaliar para algo que React consiga renderizar.",
      },
    },
    {
      id: "react-function-components",
      category: "fundamentals",
      question: {
        en: "How do function components fit the React component model?",
        pt: "Como function components se encaixam no modelo de componentes do React?",
      },
      answer: {
        en: "A function component is a function that receives props and returns a React element tree describing the UI. React calls it during render, so the output should be a pure function of props and hook state for that render. Side effects belong in Effects or event handlers, not scattered through the render body.",
        pt: "Um function component é uma função que recebe props e retorna uma árvore de elementos React descrevendo a UI. React a chama durante o render, então a saída deve ser função pura de props e state dos Hooks naquele render. Side effects pertencem a Effects ou event handlers, não espalhados pelo corpo do render.",
      },
    },
    {
      id: "react-props-composition",
      category: "fundamentals",
      question: {
        en: "How do props, composition, and children work together in React?",
        pt: "Como props, composição e children funcionam juntos no React?",
      },
      answer: {
        en: "Props are read-only inputs from a parent; the child should not mutate them. Composition builds UIs by nesting components and passing elements via the children prop instead of subclassing or configuration-heavy APIs. That pattern keeps parents flexible and lets you reuse layout shells without baking specific content into the wrapper.",
        pt: "Props são entradas somente leitura do pai; o filho não deve mutá-las. Composição monta UIs aninhando componentes e passando elementos via prop children em vez de herança ou APIs cheias de configuração. Esse padrão mantém os pais flexíveis e permite reutilizar shells de layout sem fixar conteúdo específico no wrapper.",
      },
    },
    {
      id: "react-use-state-basics",
      category: "state",
      question: {
        en: "What does useState provide, and what happens when you call the setter?",
        pt: "O que useState fornece e o que acontece quando você chama o setter?",
      },
      answer: {
        en: "useState returns a state value and a setter function. Calling the setter schedules an update with the new value; React re-renders the component so the next render sees the updated state. The setter does not mutate the previous value in place—React treats state updates as replacements for the next render.",
        pt: "useState retorna um valor de state e uma função setter. Chamar o setter agenda uma atualização com o novo valor; React faz rerender do componente para o próximo render ver o state atualizado. O setter não muta o valor anterior no lugar—React trata updates de state como substituições para o próximo render.",
      },
    },
    {
      id: "react-functional-updates",
      category: "state",
      question: {
        en: "When should you pass a function to setState instead of a direct value?",
        pt: "Quando você deve passar uma função para setState em vez de um valor direto?",
      },
      answer: {
        en: "Use the functional form setState(prev => next) when the next state depends on the previous state, especially if several updates may be batched in one event. The updater receives the latest queued value for that state slot, which avoids stale closures from a captured variable. For independent replacements, a direct value is fine.",
        pt: "Use a forma funcional setState(prev => next) quando o próximo state depende do anterior, principalmente se vários updates podem ser batched em um evento. O updater recebe o último valor enfileirado para aquele slot de state, evitando closures obsoletas de uma variável capturada. Para substituições independentes, um valor direto serve.",
      },
    },
    {
      id: "react-state-batching",
      category: "state",
      question: {
        en: "What is state update batching in React, and why does it matter?",
        pt: "O que é batching de updates de state no React e por que importa?",
      },
      answer: {
        en: "React may group multiple setState calls from the same event or lifecycle into one re-render for performance. Reading state immediately after several direct setters in the same handler still sees the pre-update snapshot until the next render. Functional updaters still see the queued chain correctly within that batch.",
        pt: "React pode agrupar várias chamadas setState do mesmo evento ou ciclo em um rerender por performance. Ler o state logo após vários setters diretos no mesmo handler ainda vê o snapshot pré-update até o próximo render. Updaters funcionais ainda enxergam a cadeia enfileirada corretamente dentro desse batch.",
      },
    },
    {
      id: "react-immutable-state-updates",
      category: "state",
      question: {
        en: "Why should you update object and array state immutably in React?",
        pt: "Por que você deve atualizar state de objetos e arrays de forma imutável no React?",
      },
      answer: {
        en: "React compares state updates by reference for objects and arrays. Mutating nested fields in place keeps the same reference, so React may skip work you expected and descendants with memoization can miss changes. Create new objects or copies when updating so the next state is a distinct reference.",
        pt: "React compara updates de state por referência em objetos e arrays. Mutar campos aninhados no lugar mantém a mesma referência, então React pode pular trabalho que você esperava e descendentes com memoization podem não perceber mudanças. Crie novos objetos ou cópias ao atualizar para o próximo state ser uma referência distinta.",
      },
    },
    {
      id: "react-derived-state-and-lifting",
      category: "state",
      question: {
        en: "How should you handle derived values and lifting state up?",
        pt: "Como você deve tratar valores derivados e lifting state up?",
      },
      answer: {
        en: "Values you can compute from props or state during render should usually be derived in render, not copied into extra state with an Effect. When siblings need the same data, lift state to their closest common ancestor and pass props down. That avoids duplicated sources of truth and drift between stored and computed values.",
        pt: "Valores que você pode calcular a partir de props ou state durante o render em geral devem ser derivados no render, não copiados para state extra com um Effect. Quando irmãos precisam dos mesmos dados, eleve o state ao ancestral comum mais próximo e passe props para baixo. Isso evita fontes de verdade duplicadas e drift entre valores armazenados e calculados.",
      },
    },
    {
      id: "react-state-snapshots",
      category: "state",
      question: {
        en: "What is a state snapshot in a React render, and how do closures interact with it?",
        pt: "O que é um snapshot de state em um render do React e como closures interagem com isso?",
      },
      answer: {
        en: "Each render sees its own snapshot of state and props—values fixed for that render pass. Event handlers and effects created during that render close over those snapshot values. If you read state later inside a handler without a functional updater, you may see an older snapshot unless you depend on the value from the render that created the handler.",
        pt: "Cada render vê seu próprio snapshot de state e props—valores fixos para aquela passagem de render. Event handlers e effects criados nesse render fecham sobre esses valores do snapshot. Se você ler state depois dentro de um handler sem updater funcional, pode ver um snapshot mais antigo, a menos que dependa do valor do render que criou o handler.",
      },
    },
    {
      id: "react-rules-of-hooks",
      category: "hooks",
      question: {
        en: "What are the Rules of Hooks, and why do they exist?",
        pt: "Quais são as Rules of Hooks e por que elas existem?",
      },
      answer: {
        en: "Only call Hooks at the top level of React function components or custom Hooks—never inside loops, conditions, or nested functions. React relies on call order to associate state and effects with each Hook instance between renders. Breaking the order corrupts that mapping and leads to subtle bugs.",
        pt: "Chame Hooks apenas no topo de function components React ou custom Hooks—nunca dentro de loops, condições ou funções aninhadas. React depende da ordem das chamadas para associar state e effects a cada instância de Hook entre renders. Quebrar a ordem corrompe esse mapeamento e causa bugs sutis.",
      },
    },
    {
      id: "react-use-effect-dependencies",
      category: "hooks",
      question: {
        en: "What is useEffect for, and how should you think about the dependency array?",
        pt: "Para que serve useEffect e como pensar no array de dependências?",
      },
      answer: {
        en: "useEffect synchronizes your component with external systems—network, subscriptions, DOM APIs, or third-party widgets—after render. The dependency array declares which reactive values the effect reads; when they change, React re-runs the effect. Omitting a dependency risks stale closures; listing everything you use keeps the effect aligned with the latest render.",
        pt: "useEffect sincroniza seu componente com sistemas externos—rede, subscriptions, APIs de DOM ou widgets de terceiros—após o render. O array de dependências declara quais valores reativos o effect lê; quando mudam, React reexecuta o effect. Omitir uma dependência arrisca stale closures; listar tudo que você usa mantém o effect alinhado ao render mais recente.",
      },
    },
    {
      id: "react-effect-cleanup",
      category: "hooks",
      question: {
        en: "When does an Effect cleanup run, and what should it do?",
        pt: "Quando o cleanup de um Effect roda e o que ele deve fazer?",
      },
      answer: {
        en: "If your effect returns a cleanup function, React runs it before re-running the effect with new dependencies and when the component unmounts. Use cleanup to unsubscribe, abort fetches, clear timers, or detach listeners so work does not leak or apply to stale props. Keep cleanup symmetric to what the effect set up.",
        pt: "Se seu effect retorna uma função de cleanup, React a executa antes de reexecutar o effect com novas dependências e quando o componente desmonta. Use cleanup para cancelar subscription, abortar fetches, limpar timers ou remover listeners para o trabalho não vazar nem valer para props obsoletas. Mantenha o cleanup simétrico ao que o effect configurou.",
      },
    },
    {
      id: "react-when-not-to-use-effect",
      category: "hooks",
      question: {
        en: "When should you avoid useEffect?",
        pt: "Quando você deve evitar useEffect?",
      },
      answer: {
        en: "Do not use an Effect to derive data you can compute during render from props or state—that duplicates state and can loop. User actions should usually update state directly in event handlers rather than through an Effect that watches another field. Reserve Effects for syncing with something outside React's render output.",
        pt: "Não use Effect para derivar dados que você pode calcular no render a partir de props ou state—isso duplica state e pode gerar loop. Ações do usuário em geral devem atualizar state direto em event handlers em vez de um Effect que observa outro campo. Reserve Effects para sincronizar com algo fora da saída de render do React.",
      },
    },
    {
      id: "react-use-ref",
      category: "hooks",
      question: {
        en: "What is useRef used for in modern React?",
        pt: "Para que useRef é usado no React moderno?",
      },
      answer: {
        en: "useRef holds a mutable object whose .current field persists across renders without triggering a re-render when it changes. Use it for DOM node references, timer ids, or any imperative handle. It is also a way to keep mutable data that should not participate in the render snapshot the way state does.",
        pt: "useRef guarda um objeto mutável cujo campo .current persiste entre renders sem disparar rerender quando muda. Use para referências de nó DOM, ids de timer ou qualquer handle imperativo. Também é forma de manter dados mutáveis que não devem participar do snapshot de render como o state.",
      },
    },
    {
      id: "react-custom-hooks",
      category: "hooks",
      question: {
        en: "What is a custom Hook, and what constraints apply?",
        pt: "O que é um custom Hook e quais restrições se aplicam?",
      },
      answer: {
        en: "A custom Hook is a function whose name starts with use and that may call other Hooks to encapsulate reusable stateful logic. It is not a new component type—each call site gets its own Hook state. Follow the same Rules of Hooks inside custom Hooks so call order stays valid.",
        pt: "Um custom Hook é uma função cujo nome começa com use e que pode chamar outros Hooks para encapsular lógica stateful reutilizável. Não é um novo tipo de componente—cada call site tem seu próprio state de Hook. Siga as mesmas Rules of Hooks dentro de custom Hooks para a ordem das chamadas permanecer válida.",
      },
    },
    {
      id: "react-rerender-triggers",
      category: "rendering",
      question: {
        en: "What causes a React function component to re-render?",
        pt: "O que faz um function component React fazer rerender?",
      },
      answer: {
        en: "A component re-renders when its own state updates or when its parent re-renders and passes new props (or the parent re-rendered for any reason, so children run again by default). Consuming Context that changed also re-renders subscribers. React.memo can skip re-rendering a child when props are shallowly equal, but it does not stop the parent from rendering.",
        pt: "Um componente faz rerender quando seu próprio state atualiza ou quando o pai faz rerender e passa props novas (ou o pai rerenderizou por qualquer motivo, então filhos rodam de novo por padrão). Consumir Context que mudou também rerenderiza assinantes. React.memo pode pular rerender de um filho quando props são shallowly equal, mas não impede o pai de renderizar.",
      },
    },
    {
      id: "react-reconciliation",
      category: "rendering",
      question: {
        en: "What is reconciliation in React?",
        pt: "O que é reconciliation no React?",
      },
      answer: {
        en: "Reconciliation is React's process of comparing the new element tree from a render with the previous one and deciding which DOM nodes to create, update, or remove. It assumes elements of the same type at the same position can be updated in place. That diff keeps updates efficient without you manually patching the DOM.",
        pt: "Reconciliation é o processo do React de comparar a nova árvore de elementos de um render com a anterior e decidir quais nós DOM criar, atualizar ou remover. Ele assume que elementos do mesmo tipo na mesma posição podem ser atualizados no lugar. Esse diff mantém updates eficientes sem você patchar o DOM manualmente.",
      },
    },
    {
      id: "react-list-keys",
      category: "rendering",
      question: {
        en: "Why do lists need stable keys, and what goes wrong without them?",
        pt: "Por que listas precisam de keys estáveis e o que dá errado sem elas?",
      },
      answer: {
        en: "Keys tell React which item identity matches which child across reorders, inserts, and deletes. Without stable keys tied to your data ids, React may reuse the wrong component instance and preserve state that belongs to another row. Index keys break when the list is filtered or sorted—prefer a stable id from the domain.",
        pt: "Keys dizem ao React qual identidade de item corresponde a qual filho em reordenações, inserções e remoções. Sem keys estáveis ligadas aos ids dos dados, React pode reutilizar a instância errada e preservar state de outra linha. Keys por índice quebram quando a lista é filtrada ou ordenada—prefira um id estável do domínio.",
      },
    },
    {
      id: "react-component-identity",
      category: "rendering",
      question: {
        en: "How does React decide whether to preserve or reset local state?",
        pt: "Como React decide preservar ou resetar state local?",
      },
      answer: {
        en: "State is tied to a component instance identified by its position in the tree and the element type at that slot. Same component type in the same place keeps state across parent re-renders. Changing the type or moving the component to a different role creates a new instance with fresh state unless you explicitly carry data elsewhere.",
        pt: "State está ligado a uma instância de componente identificada pela posição na árvore e pelo tipo de elemento naquele slot. O mesmo tipo de componente no mesmo lugar mantém state entre rerenders do pai. Mudar o tipo ou mover o componente para outro papel cria instância nova com state zerado, a menos que você carregue dados explicitamente em outro lugar.",
      },
    },
    {
      id: "react-reset-state-with-key",
      category: "rendering",
      question: {
        en: "When should you reset component state with a key prop?",
        pt: "Quando você deve resetar state de componente com a prop key?",
      },
      answer: {
        en: "Changing key on a component tells React to treat it as a new instance, discarding local state—useful when switching between entities such as different chat threads or user profiles. Prefer key resets over Effects that manually rewrite state when the identity of what you are editing changes.",
        pt: "Mudar key em um componente diz ao React para tratá-lo como instância nova, descartando state local—útil ao alternar entre entidades como threads de chat ou perfis de usuário. Prefira reset por key a Effects que reescrevem state manualmente quando a identidade do que você edita muda.",
      },
    },
    {
      id: "react-conditional-rendering",
      category: "rendering",
      question: {
        en: "How can you render UI conditionally without breaking the Rules of Hooks?",
        pt: "Como renderizar UI condicionalmente sem quebrar as Rules of Hooks?",
      },
      answer: {
        en: "Use if statements, ternary operators, or logical && after all Hooks have been called at the top level—never call Hooks only on one branch of a condition. Early return is fine once Hooks ran. That way hook order stays consistent while the returned tree changes with your data.",
        pt: "Use if, operador ternário ou && lógico depois que todos os Hooks foram chamados no topo—nunca chame Hooks só em um ramo de uma condição. Early return é válido depois dos Hooks. Assim a ordem dos Hooks permanece consistente enquanto a árvore retornada muda com seus dados.",
      },
    },
    {
      id: "react-controlled-components",
      category: "forms",
      question: {
        en: "What is a controlled form input in React?",
        pt: "O que é um input de formulário controlado no React?",
      },
      answer: {
        en: "A controlled input stores its value in React state and passes value (or checked) plus an onChange handler that updates that state. The DOM reflects state on each render, so React remains the source of truth. That makes validation, formatting, and disabling fields straightforward in one place.",
        pt: "Um input controlado guarda seu valor no state do React e passa value (ou checked) mais um handler onChange que atualiza esse state. O DOM reflete o state em cada render, então React é a fonte da verdade. Isso simplifica validação, formatação e desabilitar campos em um só lugar.",
      },
    },
    {
      id: "react-uncontrolled-components",
      category: "forms",
      question: {
        en: "When are uncontrolled inputs appropriate?",
        pt: "Quando inputs não controlados são apropriados?",
      },
      answer: {
        en: "Uncontrolled inputs keep their value in the DOM; you read them via a ref or FormData on submit, often with defaultValue instead of value. They suit simple forms where you do not need live validation or per-keystroke state. Hybrid UIs sometimes mix controlled fields for critical paths and uncontrolled ones for rare inputs.",
        pt: "Inputs não controlados mantêm o valor no DOM; você lê via ref ou FormData no submit, muitas vezes com defaultValue em vez de value. Servem para formulários simples sem validação ao vivo ou state por tecla. UIs híbridas às vezes misturam campos controlados em caminhos críticos e não controlados em inputs raros.",
      },
    },
    {
      id: "react-form-validation",
      category: "forms",
      question: {
        en: "How do you typically handle form validation in React?",
        pt: "Como você costuma tratar validação de formulário no React?",
      },
      answer: {
        en: "Run validation on submit or on blur depending on UX needs, store error messages in state, and tie them to inputs with aria attributes for accessibility. Synchronous rules are enough for many apps; async server checks can set errors when the response returns. Block submit while errors exist or show inline feedback without losing field values.",
        pt: "Rode validação no submit ou no blur conforme a UX, guarde mensagens de erro no state e associe aos inputs com atributos aria para acessibilidade. Regras síncronas bastam para muitos apps; checagens assíncronas no servidor podem setar erros quando a resposta chega. Bloqueie submit com erros ou mostre feedback inline sem perder valores dos campos.",
      },
    },
    {
      id: "react-form-state-design",
      category: "forms",
      question: {
        en: "How should you shape form state for maintainability?",
        pt: "Como você deve modelar o state de formulário para manutenção?",
      },
      answer: {
        en: "One object in state works well for related fields; separate useState calls are fine for a few independent toggles. Avoid mirroring the same value in multiple state variables. Reset or initialize from props with keys or explicit handlers when the edited entity changes instead of copying props into state on every render via Effect.",
        pt: "Um objeto no state funciona bem para campos relacionados; useState separados servem para poucos toggles independentes. Evite espelhar o mesmo valor em várias variáveis de state. Resete ou inicialize a partir de props com keys ou handlers explícitos quando a entidade editada muda, em vez de copiar props para state em todo render via Effect.",
      },
    },
    {
      id: "react-context-when-to-use",
      category: "shared-state",
      question: {
        en: "When is React Context a good fit for sharing state?",
        pt: "Quando React Context é uma boa opção para compartilhar state?",
      },
      answer: {
        en: "Context passes data through the tree without threading props through every intermediate component. It fits theme, locale, or modestly updated shared settings consumed by many descendants. It is a poor default for high-frequency updates or large app-wide stores—prop drilling for shallow trees or external stores may scale better.",
        pt: "Context passa dados pela árvore sem enfiar props em cada intermediário. Combina com theme, locale ou settings compartilhados atualizados com moderação e consumidos por muitos descendentes. É mau default para updates de alta frequência ou stores enormes no app—prop drilling em árvores rasas ou external stores podem escalar melhor.",
      },
    },
    {
      id: "react-context-rerenders",
      category: "shared-state",
      question: {
        en: "Why can Context cause broad re-renders, and how can you reduce them?",
        pt: "Por que Context pode causar rerenders amplos e como reduzir?",
      },
      answer: {
        en: "When a Provider's value identity changes, every component that calls useContext for that context re-renders, even if it only uses part of the data. Splitting contexts by concern or memoizing the value object when contents are stable reduces noise. Heavy consumers can also subscribe to a narrower external store instead of one giant context.",
        pt: "Quando a identidade do value de um Provider muda, todo componente que chama useContext para aquele context rerenderiza, mesmo usando só parte dos dados. Dividir contexts por preocupação ou memoizar o objeto value quando o conteúdo é estável reduz ruído. Consumidores pesados também podem assinar um external store mais narrow em vez de um context gigante.",
      },
    },
    {
      id: "react-use-reducer",
      category: "shared-state",
      question: {
        en: "When does useReducer help compared with useState?",
        pt: "Quando useReducer ajuda em comparação com useState?",
      },
      answer: {
        en: "useReducer models state transitions with actions and a reducer function, which clarifies complex updates with several related fields. It helps when the next state depends on the previous in multiple ways or when you want to colocate update logic and test it separately. Simple scalar state rarely needs it.",
        pt: "useReducer modela transições de state com actions e uma função reducer, o que clarifica updates complexos com vários campos relacionados. Ajuda quando o próximo state depende do anterior de várias formas ou quando você quer colocar a lógica de update junto e testá-la à parte. State escalar simples raramente precisa.",
      },
    },
    {
      id: "react-local-vs-shared-state",
      category: "shared-state",
      question: {
        en: "How do you decide between local and shared state?",
        pt: "Como decidir entre state local e compartilhado?",
      },
      answer: {
        en: "Keep state as local as possible—colocate it with the component that owns the behavior. Lift or share only when multiple distant parts must stay in sync or when a parent must coordinate siblings. Premature global state increases coupling and re-render surface; shared state should have a clear owner and update path.",
        pt: "Mantenha state o mais local possível—coloque junto do componente que dona o comportamento. Eleve ou compartilhe só quando partes distantes precisam ficar em sync ou quando um pai deve coordenar irmãos. State global prematuro aumenta acoplamento e superfície de rerender; state compartilhado deve ter dono e caminho de update claros.",
      },
    },
    {
      id: "react-external-stores",
      category: "shared-state",
      question: {
        en: "What is an external store in React, and how does useSyncExternalStore relate?",
        pt: "O que é um external store no React e como useSyncExternalStore se relaciona?",
      },
      answer: {
        en: "An external store holds state outside React's tree—browser APIs, module singletons, or library caches—and notifies subscribers when it changes. useSyncExternalStore lets components read that store safely during render and subscribe for updates without tearing in concurrent rendering. It is the supported pattern for integrating non-React state sources.",
        pt: "Um external store guarda state fora da árvore do React—APIs do browser, singletons de módulo ou caches de biblioteca—e notifica assinantes quando muda. useSyncExternalStore deixa componentes ler esse store com segurança durante o render e assinar updates sem tearing em concurrent rendering. É o padrão suportado para integrar fontes de state fora do React.",
      },
    },
    {
      id: "react-memo",
      category: "performance",
      question: {
        en: "What does React.memo do, and when is it worth using?",
        pt: "O que React.memo faz e quando vale usar?",
      },
      answer: {
        en: "React.memo wraps a component and skips re-rendering when props are shallowly equal to the last render. It helps when a parent re-renders often but passes stable props to an expensive child. It is not free—comparison has cost—and useless if props are new objects every time; profile before sprinkling memo everywhere.",
        pt: "React.memo envolve um componente e pula rerender quando props são shallowly equal ao último render. Ajuda quando o pai rerenderiza muito mas passa props estáveis para um filho caro. Não é grátis—a comparação tem custo—e é inútil se props são objetos novos sempre; profile antes de espalhar memo.",
      },
    },
    {
      id: "react-use-memo-and-callback",
      category: "performance",
      question: {
        en: "What are useMemo and useCallback for?",
        pt: "Para que servem useMemo e useCallback?",
      },
      answer: {
        en: "useMemo caches a computed value between renders when dependencies are unchanged; useCallback caches a function reference for the same reason. They help when passing stable references to memoized children or avoiding expensive recalculations—not as a default on every render. Measure first; unnecessary memoization adds memory and dependency bookkeeping.",
        pt: "useMemo cacheia um valor calculado entre renders quando dependências não mudam; useCallback cacheia referência de função pelo mesmo motivo. Ajudam ao passar referências estáveis para filhos memoizados ou evitar recálculos caros—não como default em todo render. Meça primeiro; memoization desnecessária adiciona memória e bookkeeping de dependências.",
      },
    },
    {
      id: "react-unnecessary-rerenders",
      category: "performance",
      question: {
        en: "How do you approach unnecessary re-renders in React?",
        pt: "Como você aborda rerenders desnecessários no React?",
      },
      answer: {
        en: "Start by confirming the render is actually costly—many re-renders are cheap. Common causes are new object or function literals in props, oversized Context values, and state stored too high in the tree. Fix data flow and splitting before reaching for memo; use the React Profiler to see where time goes.",
        pt: "Comece confirmando se o render é realmente caro—muitos rerenders são baratos. Causas comuns são literais novos de objeto ou função em props, values de Context grandes e state guardado alto na árvore. Corrija fluxo de dados e divisão antes de memo; use o React Profiler para ver onde o tempo vai.",
      },
    },
    {
      id: "react-transitions",
      category: "performance",
      question: {
        en: "What problem do transitions solve in React?",
        pt: "Que problema transitions resolvem no React?",
      },
      answer: {
        en: "Transitions mark some state updates as non-urgent so React can keep showing the previous UI and remain responsive to typing or clicks while preparing the next view. useTransition and startTransition do not make slow work faster—they prioritize urgent updates. Use them when a heavy visual change should not block immediate feedback.",
        pt: "Transitions marcam alguns updates de state como não urgentes para React manter a UI anterior e continuar responsivo a digitação ou cliques enquanto prepara a próxima view. useTransition e startTransition não tornam trabalho lento mais rápido—priorizam updates urgentes. Use quando uma mudança visual pesada não deve bloquear feedback imediato.",
      },
    },
    {
      id: "react-lazy-loading",
      category: "performance",
      question: {
        en: "How do lazy loading and Suspense help performance?",
        pt: "Como lazy loading e Suspense ajudam na performance?",
      },
      answer: {
        en: "React.lazy loads a component's JavaScript when that component is first rendered, splitting your bundle by route or feature. Suspense shows a fallback while the chunk loads. That improves initial load time; it does not reduce work once the component mounts. Pair with meaningful fallbacks and error boundaries at route boundaries.",
        pt: "React.lazy carrega o JavaScript de um componente quando ele é renderizado pela primeira vez, dividindo o bundle por rota ou feature. Suspense mostra um fallback enquanto o chunk carrega. Isso melhora o tempo de carga inicial; não reduz trabalho depois que o componente monta. Combine com fallbacks úteis e error boundaries nas fronteiras de rota.",
      },
    },
    {
      id: "react-behavior-oriented-tests",
      category: "testing",
      question: {
        en: "What does behavior-oriented testing mean for React components?",
        pt: "O que significa teste orientado a comportamento para componentes React?",
      },
      answer: {
        en: "Assert what the user sees and can do—labels, roles, visible text, and outcomes after interaction—not internal state or private methods. Tests should survive refactors that keep behavior the same. That aligns with how React Testing Library encourages queries and expectations.",
        pt: "Faça assert do que o usuário vê e pode fazer—labels, roles, texto visível e resultados após interação—não de state interno ou métodos privados. Testes devem sobreviver a refactors que mantêm o comportamento. Isso alinha com como React Testing Library incentiva queries e expectations.",
      },
    },
    {
      id: "react-testing-library-queries",
      category: "testing",
      question: {
        en: "How should you choose queries in React Testing Library?",
        pt: "Como escolher queries no React Testing Library?",
      },
      answer: {
        en: "Prefer queries tied to accessibility: getByRole with a name, getByLabelText, or getByText for visible content. They reflect how assistive tech and users find elements. Avoid test ids unless no better option exists. Strong queries make tests resilient to markup changes that preserve meaning.",
        pt: "Prefira queries ligadas à acessibilidade: getByRole com nome, getByLabelText ou getByText para conteúdo visível. Elas refletem como tecnologia assistiva e usuários encontram elementos. Evite test ids a menos que não haja opção melhor. Queries fortes deixam testes resilientes a mudanças de markup que preservam significado.",
      },
    },
    {
      id: "react-user-interactions",
      category: "testing",
      question: {
        en: "Why use userEvent over fireEvent for interactions?",
        pt: "Por que usar userEvent em vez de fireEvent para interações?",
      },
      answer: {
        en: "userEvent simulates closer-to-real browser sequences—focus, pointer events, and keyboard—for clicks and typing. fireEvent dispatches a single low-level event, which can miss bugs that only appear with full interaction chains. Prefer userEvent for flows users actually perform.",
        pt: "userEvent simula sequências mais próximas do browser real—focus, eventos de ponteiro e teclado—para cliques e digitação. fireEvent dispara um único evento de baixo nível, o que pode perder bugs que só aparecem com cadeias completas de interação. Prefira userEvent para fluxos que usuários realmente fazem.",
      },
    },
    {
      id: "react-async-ui-and-mocking",
      category: "testing",
      question: {
        en: "How do you test async UI and where should you mock?",
        pt: "Como testar UI assíncrona e onde mockar?",
      },
      answer: {
        en: "Use findBy queries or waitFor to await elements that appear after fetches or timers. Mock at boundaries—fetch, router, or module imports—not every child component, so you still test your wiring. Assert loading, success, and error states the user would see rather than implementation details of hooks.",
        pt: "Use queries findBy ou waitFor para aguardar elementos que aparecem após fetches ou timers. Mock nas fronteiras—fetch, router ou imports de módulo—não em todo filho, para ainda testar seu wiring. Faça assert de estados de loading, sucesso e erro que o usuário veria, não de detalhes de implementação dos Hooks.",
      },
    },
  ];
