import type { QuizQuestion } from "@/data/quiz-types";

import type { ReactQuestionCategory } from "./categories";

export const REACT_QUIZ_QUESTIONS: readonly QuizQuestion<ReactQuestionCategory>[] = [
  {
    id: "react-quiz-declarative-jsx",
    category: "fundamentals",
    question: {
      en: "A status message depends on whether a request is pending. Which approach best follows React's declarative rendering model?",
      pt: "Uma mensagem de status depende de uma request estar pendente. Qual abordagem segue melhor o modelo declarativo de renderização do React?",
    },
    options: [
      {
        en: "Render the message conditionally from the pending state in JSX",
        pt: "Renderizar a mensagem condicionalmente a partir do state de pendência no JSX",
      },
      {
        en: "Find the message element and replace its text after every request",
        pt: "Encontrar o elemento da mensagem e substituir seu texto após cada request",
      },
      {
        en: "Store the rendered HTML string and insert it into the page manually",
        pt: "Guardar a string HTML renderizada e inseri-la manualmente na página",
      },
      {
        en: "Reload the component whenever the request status changes",
        pt: "Recarregar o componente sempre que o status da request mudar",
      },
    ],
    correctOption: 0,
  },
  {
    id: "react-quiz-props-composition",
    category: "fundamentals",
    question: {
      en: "Several pages need the same Card layout but supply different headings, actions, and content. What is the most appropriate design?",
      pt: "Várias páginas precisam do mesmo layout de Card, mas fornecem títulos, ações e conteúdos diferentes. Qual é o design mais apropriado?",
    },
    options: [
      {
        en: "Duplicate the Card markup in every page and customize each copy",
        pt: "Duplicar a marcação do Card em cada página e customizar cada cópia",
      },
      {
        en: "Expose slots through props and children so callers compose the Card content",
        pt: "Expor slots por props e children para que quem chama componha o conteúdo do Card",
      },
      {
        en: "Keep every page's content in the Card component's local state",
        pt: "Manter o conteúdo de todas as páginas no state local do componente Card",
      },
      {
        en: "Use one global variable to select the Card content for each page",
        pt: "Usar uma variável global para selecionar o conteúdo do Card de cada página",
      },
    ],
    correctOption: 1,
  },
  {
    id: "react-quiz-functional-state-update",
    category: "state",
    question: {
      en: "A click handler must increment a counter twice, with each update based on the previous queued value. Which update is correct?",
      pt: "Um handler de clique precisa incrementar um contador duas vezes, com cada update baseado no valor anterior da fila. Qual update está correto?",
    },
    options: [
      {
        en: "Call setCount(count + 1) twice using the captured count value",
        pt: "Chamar setCount(count + 1) duas vezes usando o valor de count capturado",
      },
      {
        en: "Mutate count with count += 2 before calling setCount once",
        pt: "Mutar count com count += 2 antes de chamar setCount uma vez",
      },
      {
        en: "Call setCount(current => current + 1) twice",
        pt: "Chamar setCount(current => current + 1) duas vezes",
      },
      {
        en: "Await the first setCount call before issuing the second update",
        pt: "Fazer await da primeira chamada a setCount antes de emitir o segundo update",
      },
    ],
    correctOption: 2,
  },
  {
    id: "react-quiz-immutable-state-update",
    category: "state",
    question: {
      en: "A component stores an array of todos in state and needs to mark one todo complete. Which approach is correct?",
      pt: "Um componente guarda um array de todos no state e precisa marcar um todo como concluído. Qual abordagem está correta?",
    },
    options: [
      {
        en: "Find the todo, mutate its completed field, and reuse the same array",
        pt: "Encontrar o todo, mutar seu campo completed e reutilizar o mesmo array",
      },
      {
        en: "Sort the existing array in place and pass it back to the setter",
        pt: "Ordenar o array existente in place e passá-lo de volta ao setter",
      },
      {
        en: "Push a changed todo into the existing array and set that array",
        pt: "Fazer push de um todo alterado no array existente e definir esse array",
      },
      {
        en: "Create a new array and replace only the matching todo with a new object",
        pt: "Criar um novo array e substituir apenas o todo correspondente por um novo objeto",
      },
    ],
    correctOption: 3,
  },
  {
    id: "react-quiz-batched-updates",
    category: "state",
    question: {
      en: "A handler calls setCount(count + 1) three times. Why does it usually increase the count by one rather than three?",
      pt: "Um handler chama setCount(count + 1) três vezes. Por que ele normalmente aumenta count em um, e não em três?",
    },
    options: [
      {
        en: "Each call reads the same render snapshot, and React batches the queued updates",
        pt: "Cada chamada lê o mesmo snapshot do render, e o React agrupa os updates enfileirados",
      },
      {
        en: "React ignores the second and third setters whenever an event is batched",
        pt: "O React ignora o segundo e o terceiro setter sempre que um evento é agrupado",
      },
      {
        en: "The setter changes count immediately, so later calls subtract earlier changes",
        pt: "O setter muda count imediatamente, então chamadas posteriores subtraem mudanças anteriores",
      },
      {
        en: "Only the first state update is allowed inside a browser event handler",
        pt: "Apenas o primeiro update de state é permitido dentro de um handler de evento do browser",
      },
    ],
    correctOption: 0,
  },
  {
    id: "react-quiz-effect-dependencies",
    category: "hooks",
    question: {
      en: "A chat component connects to the room identified by roomId. Its Effect must reconnect when roomId changes. Which dependency array is appropriate?",
      pt: "Um componente de chat se conecta à sala identificada por roomId. Seu Effect precisa reconectar quando roomId muda. Qual array de dependências é apropriado?",
    },
    options: [
      {
        en: "An empty array, because the component should connect only once",
        pt: "Um array vazio, porque o componente deve conectar apenas uma vez",
      },
      {
        en: "An array containing roomId, because the connection uses that value",
        pt: "Um array contendo roomId, porque a conexão usa esse valor",
      },
      {
        en: "An array containing only the connection result after it is created",
        pt: "Um array contendo apenas o resultado da conexão depois que ela é criada",
      },
      {
        en: "No dependency array, so React reconnects after every render",
        pt: "Nenhum array de dependências, para o React reconectar após todo render",
      },
    ],
    correctOption: 1,
  },
  {
    id: "react-quiz-effect-cleanup",
    category: "hooks",
    question: {
      en: "An Effect subscribes to notifications for a selected account. What should it do when the account changes or the component unmounts?",
      pt: "Um Effect faz subscription de notificações para uma conta selecionada. O que ele deve fazer quando a conta muda ou o componente desmonta?",
    },
    options: [
      {
        en: "Keep the old subscription because React removes listeners automatically",
        pt: "Manter a subscription antiga porque o React remove listeners automaticamente",
      },
      {
        en: "Reset the account prop to stop the existing notification stream",
        pt: "Resetar a prop account para interromper o stream de notificações existente",
      },
      {
        en: "Return a cleanup function that unsubscribes from the current subscription",
        pt: "Retornar uma função de cleanup que cancela a subscription atual",
      },
      {
        en: "Move the subscription into render so it follows the latest account",
        pt: "Mover a subscription para o render para ela seguir a conta mais recente",
      },
    ],
    correctOption: 2,
  },
  {
    id: "react-quiz-ref-vs-state",
    category: "hooks",
    question: {
      en: "A component needs to keep a timer identifier between renders, but changing it must not update the screen. Which Hook fits this value?",
      pt: "Um componente precisa manter um identificador de timer entre renders, mas mudá-lo não deve atualizar a tela. Qual Hook serve para esse valor?",
    },
    options: [
      {
        en: "useState, because every persistent value should trigger a rerender",
        pt: "useState, porque todo valor persistente deve provocar um rerender",
      },
      {
        en: "useEffect, because Effects retain mutable values between renders",
        pt: "useEffect, porque Effects retêm valores mutáveis entre renders",
      },
      {
        en: "useMemo, because memoized values are intended for timer identifiers",
        pt: "useMemo, porque valores memoizados são destinados a identificadores de timer",
      },
      {
        en: "useRef, because its current value persists without scheduling a rerender",
        pt: "useRef, porque seu valor current persiste sem agendar um rerender",
      },
    ],
    correctOption: 3,
  },
  {
    id: "react-quiz-custom-hook-rules",
    category: "hooks",
    question: {
      en: "A custom Hook uses useState and useEffect. How may a component call this custom Hook?",
      pt: "Um custom Hook usa useState e useEffect. Como um componente pode chamar esse custom Hook?",
    },
    options: [
      {
        en: "At the component's top level so calls occur in the same order on every render",
        pt: "No nível superior do componente para que as chamadas ocorram na mesma ordem em todo render",
      },
      {
        en: "Only inside an if branch when the feature that needs it is enabled",
        pt: "Apenas dentro de um ramo if quando a feature que precisa dele está habilitada",
      },
      {
        en: "Inside a click handler after the user requests the custom behavior",
        pt: "Dentro de um click handler depois que o usuário solicita o comportamento customizado",
      },
      {
        en: "Inside a loop once for every item that needs the custom behavior",
        pt: "Dentro de um loop uma vez para cada item que precisa do comportamento customizado",
      },
    ],
    correctOption: 0,
  },
  {
    id: "react-quiz-list-keys",
    category: "rendering",
    question: {
      en: "A list of editable contacts can be sorted and filtered. Which key should each contact row use?",
      pt: "Uma lista de contatos editáveis pode ser ordenada e filtrada. Qual key cada linha de contato deve usar?",
    },
    options: [
      {
        en: "The item's current array index, because it changes with the displayed order",
        pt: "O índice atual do item no array, porque ele muda com a ordem exibida",
      },
      {
        en: "The contact's stable database id, because it identifies the same contact",
        pt: "O id estável do contato no banco, porque ele identifica o mesmo contato",
      },
      {
        en: "A new random value on every render, because every row should be fresh",
        pt: "Um novo valor aleatório em todo render, porque toda linha deve ser nova",
      },
      {
        en: "The contact name, because names always remain unique in a contact list",
        pt: "O nome do contato, porque nomes sempre permanecem únicos em uma lista de contatos",
      },
    ],
    correctOption: 1,
  },
  {
    id: "react-quiz-reset-state-with-key",
    category: "rendering",
    question: {
      en: "An editor keeps local draft state. Selecting a different customer should intentionally discard the previous draft. What is an appropriate approach?",
      pt: "Um editor mantém state local de rascunho. Selecionar outro cliente deve descartar intencionalmente o rascunho anterior. Qual é uma abordagem apropriada?",
    },
    options: [
      {
        en: "Mutate the existing draft object during render whenever the customer changes",
        pt: "Mutar o objeto de rascunho existente durante o render sempre que o cliente mudar",
      },
      {
        en: "Use the array index of the selected customer as the editor's key",
        pt: "Usar o índice do cliente selecionado no array como key do editor",
      },
      {
        en: "Give the editor a key based on the selected customer's stable id",
        pt: "Dar ao editor uma key baseada no id estável do cliente selecionado",
      },
      {
        en: "Store all customer drafts in one ref and update its current value in render",
        pt: "Guardar todos os rascunhos de clientes em uma ref e atualizar current no render",
      },
    ],
    correctOption: 2,
  },
  {
    id: "react-quiz-derived-rendering",
    category: "rendering",
    question: {
      en: "A filtered list can be calculated from products and the selected filter during rendering. What should the component usually do?",
      pt: "Uma lista filtrada pode ser calculada a partir de products e do filtro selecionado durante o render. O que o componente normalmente deve fazer?",
    },
    options: [
      {
        en: "Store the filtered list in a ref and update it after every render",
        pt: "Guardar a lista filtrada em uma ref e atualizá-la depois de todo render",
      },
      {
        en: "Use an Effect to copy the filtered list into separate state",
        pt: "Usar um Effect para copiar a lista filtrada em um state separado",
      },
      {
        en: "Update the filtered list state directly while the component renders",
        pt: "Atualizar o state da lista filtrada diretamente enquanto o componente renderiza",
      },
      {
        en: "Calculate the list during render and memoize only if a measured cost requires it",
        pt: "Calcular a lista durante o render e memoizar apenas se um custo medido exigir isso",
      },
    ],
    correctOption: 3,
  },
  {
    id: "react-quiz-controlled-input",
    category: "forms",
    question: {
      en: "A search input must always display the query held in component state. How should it be implemented?",
      pt: "Um input de busca deve sempre exibir a query mantida no state do componente. Como ele deve ser implementado?",
    },
    options: [
      {
        en: "Pass value from state and update that state from the input change event",
        pt: "Passar value a partir do state e atualizar esse state pelo evento de mudança do input",
      },
      {
        en: "Set defaultValue once and never handle later input changes",
        pt: "Definir defaultValue uma vez e nunca tratar mudanças posteriores no input",
      },
      {
        en: "Read the input through a ref on every render and assign its DOM value",
        pt: "Ler o input por uma ref em todo render e atribuir seu valor do DOM",
      },
      {
        en: "Put the query in a module variable so every input shares the same value",
        pt: "Colocar a query em uma variável de módulo para que todo input compartilhe o mesmo valor",
      },
    ],
    correctOption: 0,
  },
  {
    id: "react-quiz-uncontrolled-input",
    category: "forms",
    question: {
      en: "A simple form only needs an input's value when it is submitted and does not need to render from that value. Which approach is suitable?",
      pt: "Um formulário simples precisa do valor de um input apenas quando é enviado e não precisa renderizar a partir desse valor. Qual abordagem é adequada?",
    },
    options: [
      {
        en: "Keep every keystroke in state and derive all form values from it",
        pt: "Manter cada tecla digitada no state e derivar todos os valores do formulário dele",
      },
      {
        en: "Use an uncontrolled input and read its value with a ref or FormData on submit",
        pt: "Usar um input não controlado e ler seu valor com uma ref ou FormData no envio",
      },
      {
        en: "Mutate the input's value prop directly from the submit handler",
        pt: "Mutar diretamente a prop value do input a partir do handler de envio",
      },
      {
        en: "Store the input element in Context so it can keep the latest value",
        pt: "Guardar o elemento input em Context para que ele mantenha o valor mais recente",
      },
    ],
    correctOption: 1,
  },
  {
    id: "react-quiz-context-rerenders",
    category: "shared-state",
    question: {
      en: "A frequently changing Context value causes many consumers to rerender. What is a useful response when only some consumers need that changing value?",
      pt: "Um valor de Context que muda frequentemente provoca rerender em muitos consumidores. Qual é uma resposta útil quando apenas alguns consumidores precisam desse valor que muda?",
    },
    options: [
      {
        en: "Put more unrelated values in the same Context to reduce provider nesting",
        pt: "Colocar mais valores não relacionados no mesmo Context para reduzir o aninhamento de providers",
      },
      {
        en: "Mutate the provided object in place so consumers keep its reference",
        pt: "Mutar o objeto fornecido in place para que os consumidores mantenham sua referência",
      },
      {
        en: "Split or scope Context so consumers subscribe only to values they need",
        pt: "Dividir ou delimitar o Context para que consumidores assinem apenas os valores de que precisam",
      },
      {
        en: "Move the Context read into useEffect so it no longer affects rendering",
        pt: "Mover a leitura do Context para useEffect para que ela não afete mais a renderização",
      },
    ],
    correctOption: 2,
  },
  {
    id: "react-quiz-reducer-transitions",
    category: "shared-state",
    question: {
      en: "A checkout flow has related state for items, shipping, and status, updated through named events. Which design best makes state transitions explicit?",
      pt: "Um fluxo de checkout tem state relacionado de itens, envio e status, atualizado por eventos nomeados. Qual design torna as transições de state mais explícitas?",
    },
    options: [
      {
        en: "Keep each event in a module variable and update it outside React",
        pt: "Manter cada evento em uma variável de módulo e atualizá-la fora do React",
      },
      {
        en: "Use one ref for the flow and mutate current for each event",
        pt: "Usar uma ref para o fluxo e mutar current a cada evento",
      },
      {
        en: "Add one Effect per event and synchronize separate state values afterward",
        pt: "Adicionar um Effect por evento e sincronizar valores de state separados depois",
      },
      {
        en: "Use useReducer with actions that describe the allowed transitions",
        pt: "Usar useReducer com actions que descrevem as transições permitidas",
      },
    ],
    correctOption: 3,
  },
  {
    id: "react-quiz-memoization-boundaries",
    category: "performance",
    question: {
      en: "An expensive child is wrapped in React.memo, but its parent recreates an onSelect callback on every render. When can useCallback help the child skip work?",
      pt: "Um filho custoso está envolvido em React.memo, mas seu pai recria um callback onSelect em todo render. Quando useCallback pode ajudar o filho a pular trabalho?",
    },
    options: [
      {
        en: "When its dependencies are stable, it can preserve the callback prop identity for React.memo",
        pt: "Quando suas dependências são estáveis, ele pode preservar a identidade da prop callback para React.memo",
      },
      {
        en: "Whenever the callback is expensive to execute, it makes that execution faster",
        pt: "Sempre que o callback é caro para executar, ele torna essa execução mais rápida",
      },
      {
        en: "It prevents the parent from rerendering whenever any of its state changes",
        pt: "Ele impede que o pai faça rerender sempre que qualquer state dele muda",
      },
      {
        en: "It should wrap every callback, because stable references always improve performance",
        pt: "Ele deve envolver todo callback, porque referências estáveis sempre melhoram performance",
      },
    ],
    correctOption: 0,
  },
  {
    id: "react-quiz-transition-priority",
    category: "performance",
    question: {
      en: "Typing in a search box updates its text and triggers an expensive result list. Which approach keeps typing responsive?",
      pt: "Digitar em uma caixa de busca atualiza seu texto e dispara uma lista de resultados custosa. Qual abordagem mantém a digitação responsiva?",
    },
    options: [
      {
        en: "Put both updates inside a transition so neither is treated as urgent",
        pt: "Colocar ambos os updates dentro de uma transition para que nenhum seja tratado como urgente",
      },
      {
        en: "Update the input urgently and mark the expensive result update as a transition",
        pt: "Atualizar o input como urgente e marcar o update custoso dos resultados como uma transition",
      },
      {
        en: "Move the input value into a ref so typing does not schedule any renders",
        pt: "Mover o valor do input para uma ref para que digitar não agende renders",
      },
      {
        en: "Run the expensive filtering in an Effect after every keystroke",
        pt: "Executar a filtragem custosa em um Effect após cada tecla digitada",
      },
    ],
    correctOption: 1,
  },
  {
    id: "react-quiz-test-visible-behavior",
    category: "testing",
    question: {
      en: "A counter button should update the number a user sees. What should a component test primarily assert?",
      pt: "Um botão de contador deve atualizar o número que o usuário vê. O que um teste de componente deve verificar principalmente?",
    },
    options: [
      {
        en: "The exact order of internal useState calls after the click",
        pt: "A ordem exata das chamadas internas a useState após o clique",
      },
      {
        en: "The component instance's private state object after the click",
        pt: "O objeto de state privado da instância do componente após o clique",
      },
      {
        en: "The visible count after a user clicks the button",
        pt: "O contador visível depois que um usuário clica no botão",
      },
      {
        en: "The number of renders React performed to update the count",
        pt: "O número de renders que o React realizou para atualizar o contador",
      },
    ],
    correctOption: 2,
  },
  {
    id: "react-quiz-test-async-feedback",
    category: "testing",
    question: {
      en: "Submitting a form shows a pending message and later either a success message or an error. How should a test verify this behavior?",
      pt: "Enviar um formulário mostra uma mensagem pendente e depois uma mensagem de sucesso ou erro. Como um teste deve verificar esse comportamento?",
    },
    options: [
      {
        en: "Wait a fixed time, then inspect implementation variables for the final status",
        pt: "Esperar um tempo fixo e então inspecionar variáveis de implementação para o status final",
      },
      {
        en: "Assert only that the submit handler was declared async in the source code",
        pt: "Verificar apenas que o handler de envio foi declarado async no código-fonte",
      },
      {
        en: "Call the component function directly and compare its returned JSX object",
        pt: "Chamar a função do componente diretamente e comparar seu objeto JSX retornado",
      },
      {
        en: "Trigger submission and wait for the expected visible pending and outcome states",
        pt: "Disparar o envio e esperar pelos estados visíveis esperados de pendência e resultado",
      },
    ],
    correctOption: 3,
  },
];
