/**
 * ============================================================================
 * APLICAÇÃO DE LISTA DE TAREFAS (TO-DO LIST) — DESAFIO 3 (IMERSÃO IA ALURA)
 * ============================================================================
 * Arquitetura didática dividida em 3 camadas:
 * 1. Regras de Negócio (Funções puras: adicionar, concluir, remover, filtrar)
 * 2. Persistência Local (localStorage do navegador)
 * 3. Interface Visual / DOM (Renderização e Eventos de clique/formulário)
 */

const CHAVE_STORAGE = "imersao_alura_tarefas_v1";

// ============================================================================
// 1. CAMADA DE REGRAS DE NEGÓCIO (Lógica Pura)
// ============================================================================

/**
 * Gera um identificador numérico único, evitando colisão caso
 * múltiplas tarefas sejam adicionadas no mesmo milissegundo.
 * @param {Array} listaAtual
 * @returns {number}
 */
function gerarIdUnico(listaAtual) {
  const maiorId = listaAtual.reduce(
    (max, item) => Math.max(max, Number(item.id) || 0),
    0
  );
  return Math.max(Date.now(), maiorId + 1);
}

/**
 * Cria e adiciona uma nova tarefa na lista.
 * @param {Array} listaAtual - Lista atual de tarefas.
 * @param {string} texto - Descrição digitada pela pessoa usuária.
 * @param {number} [idCustomizado] - ID opcional (útil para testes determinísticos).
 * @returns {Array} Nova lista contendo a tarefa adicionada.
 */
function adicionarTarefa(listaAtual, texto, idCustomizado) {
  const textoLimpo = typeof texto === "string" ? texto.trim() : "";
  if (!textoLimpo) {
    throw new Error("A descrição da tarefa não pode estar vazia.");
  }

  const novaTarefa = {
    id: idCustomizado !== undefined ? idCustomizado : gerarIdUnico(listaAtual),
    texto: textoLimpo,
    concluida: false,
    criadaEm: new Date().toISOString(),
  };

  return [...listaAtual, novaTarefa];
}

/**
 * Marca ou desmarca uma tarefa como concluída pelo seu ID.
 * @param {Array} listaAtual - Lista atual de tarefas.
 * @param {number} id - Identificador único da tarefa.
 * @returns {Array} Nova lista com o estado atualizado.
 */
function alternarConclusaoTarefa(listaAtual, id) {
  let encontrou = false;
  const novaLista = listaAtual.map((tarefa) => {
    if (tarefa.id === id) {
      encontrou = true;
      return { ...tarefa, concluida: !tarefa.concluida };
    }
    return tarefa;
  });

  if (!encontrou) {
    throw new Error(`Tarefa com ID ${id} não encontrada.`);
  }

  return novaLista;
}

/**
 * Remove uma tarefa da lista pelo seu ID.
 * @param {Array} listaAtual - Lista atual de tarefas.
 * @param {number} id - Identificador único da tarefa a ser excluída.
 * @returns {Array} Nova lista sem a tarefa removida.
 */
function removerTarefa(listaAtual, id) {
  const tamanhoInicial = listaAtual.length;
  const novaLista = listaAtual.filter((tarefa) => tarefa.id !== id);

  if (novaLista.length === tamanhoInicial) {
    throw new Error(`Tarefa com ID ${id} não encontrada para remoção.`);
  }

  return novaLista;
}

/**
 * Filtra as tarefas de acordo com o critério selecionado.
 * @param {Array} listaAtual - Lista completa de tarefas.
 * @param {string} filtro - 'todas' | 'pendentes' | 'concluidas'
 * @returns {Array} Lista filtrada.
 */
function filtrarTarefas(listaAtual, filtro = "todas") {
  switch (filtro) {
    case "pendentes":
      return listaAtual.filter((t) => !t.concluida);
    case "concluidas":
      return listaAtual.filter((t) => t.concluida);
    case "todas":
    default:
      return [...listaAtual];
  }
}

/**
 * Calcula os totais de tarefas para exibir no painel de resumo.
 * @param {Array} listaAtual - Lista completa de tarefas.
 * @returns {{ total: number, pendentes: number, concluidas: number }}
 */
function calcularResumo(listaAtual) {
  const total = listaAtual.length;
  const concluidas = listaAtual.filter((t) => t.concluida).length;
  const pendentes = total - concluidas;
  return { total, pendentes, concluidas };
}

// ============================================================================
// 2. CAMADA DE PERSISTÊNCIA (Salva no navegador para não perder ao atualizar)
// ============================================================================

function carregarTarefasSalvas() {
  if (typeof localStorage === "undefined") return [];
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    if (!dados) {
      // Tarefas iniciais de exemplo na primeira abertura
      return [
        {
          id: 1,
          texto: "Concluir o Desafio 1 no Google AI Studio",
          concluida: true,
        },
        {
          id: 2,
          texto: "Evoluir a calculadora no Google Antigravity (Desafio 2)",
          concluida: true,
        },
        {
          id: 3,
          texto: "Testar a nova Lista de Tarefas com interface visual (Desafio 3)",
          concluida: false,
        },
      ];
    }
    return JSON.parse(dados);
  } catch {
    return [];
  }
}

function salvarTarefas(lista) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
  } catch {
    // Ignora erro caso o armazenamento esteja desabilitado
  }
}

// ============================================================================
// 3. CAMADA DE INTERFACE VISUAL (Manipulação do DOM)
// ============================================================================

/**
 * Gera a estrutura de classes e rótulos visuais de uma tarefa,
 * diferenciando tarefas PENDENTES de tarefas CONCLUÍDAS.
 * @param {{ id: number, texto: string, concluida: boolean }} tarefa
 */
function obterMetadadosVisuaisTarefa(tarefa) {
  const estaConcluida = Boolean(tarefa.concluida);
  return {
    classeItem: estaConcluida ? "tarefa-item concluida" : "tarefa-item pendente",
    classeBadge: estaConcluida ? "status-badge concluida" : "status-badge pendente",
    textoBadge: estaConcluida ? "✅ Concluída" : "⏳ Pendente",
    ariaLabelCheckbox: estaConcluida
      ? `Desmarcar tarefa "${tarefa.texto}" como concluída`
      : `Marcar tarefa "${tarefa.texto}" como concluída`,
  };
}

/**
 * Inicializa os eventos e a renderização quando executado no navegador.
 */
function inicializarApp() {
  if (typeof document === "undefined") return;

  let estadoTarefas = carregarTarefasSalvas();
  let filtroAtual = "todas";

  // Referências aos elementos do HTML
  const form = document.getElementById("form-tarefa");
  const input = document.getElementById("input-tarefa");
  const msgErro = document.getElementById("mensagem-erro");
  const listaEl = document.getElementById("lista-tarefas");
  const estadoVazioEl = document.getElementById("estado-vazio");
  const contadorTotalEl = document.getElementById("contador-total");
  const contadorPendentesEl = document.getElementById("contador-pendentes");
  const contadorConcluidasEl = document.getElementById("contador-concluidas");
  const botoesFiltro = document.querySelectorAll(".btn-filtro");

  function atualizarTela() {
    // 1. Atualiza os contadores no topo
    const resumo = calcularResumo(estadoTarefas);
    contadorTotalEl.textContent = String(resumo.total);
    contadorPendentesEl.textContent = String(resumo.pendentes);
    contadorConcluidasEl.textContent = String(resumo.concluidas);

    // 2. Filtra as tarefas para exibição
    const tarefasVisiveis = filtrarTarefas(estadoTarefas, filtroAtual);
    listaEl.innerHTML = "";

    // 3. Exibe ou oculta a mensagem contextual de lista vazia
    if (tarefasVisiveis.length === 0) {
      const paragrafoVazio = estadoVazioEl.querySelector("p");
      if (paragrafoVazio) {
        if (filtroAtual === "pendentes") {
          paragrafoVazio.textContent =
            "🎉 Parabéns! Você não tem nenhuma tarefa pendente.";
        } else if (filtroAtual === "concluidas") {
          paragrafoVazio.textContent =
            "⏳ Nenhuma tarefa concluída ainda. Marque uma atividade quando terminar!";
        } else {
          paragrafoVazio.textContent =
            "✨ Nenhuma tarefa por aqui! Adicione uma atividade acima para começar.";
        }
      }
      estadoVazioEl.hidden = false;
    } else {
      estadoVazioEl.hidden = true;
    }

    // 4. Cria cada item visual <li> na lista
    tarefasVisiveis.forEach((tarefa) => {
      const visual = obterMetadadosVisuaisTarefa(tarefa);

      const li = document.createElement("li");
      li.className = visual.classeItem;
      li.dataset.id = String(tarefa.id);

      // Rótulo clicável contendo o checkbox e o texto da atividade
      const label = document.createElement("label");
      label.className = "tarefa-label";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "tarefa-checkbox";
      checkbox.checked = tarefa.concluida;
      checkbox.setAttribute("aria-label", visual.ariaLabelCheckbox);

      // Evento: Marcar/desmarcar tarefa como concluída
      checkbox.addEventListener("change", () => {
        estadoTarefas = alternarConclusaoTarefa(estadoTarefas, tarefa.id);
        // Fallback para navegadores antigos sem suporte ao seletor CSS :has()
        if (typeof CSS !== "undefined" && !CSS.supports("selector(:has(*))")) {
          li.classList.toggle("concluida", checkbox.checked);
        }
        salvarTarefas(estadoTarefas);
        atualizarTela();
      });

      const spanTexto = document.createElement("span");
      spanTexto.className = "tarefa-texto";
      spanTexto.textContent = tarefa.texto;

      label.appendChild(checkbox);
      label.appendChild(spanTexto);

      // Área direita: Badge de Status (Pendente vs Concluída) + Botão Remover
      const divAcoes = document.createElement("div");
      divAcoes.className = "tarefa-acoes";

      const badge = document.createElement("span");
      badge.className = visual.classeBadge;
      badge.textContent = visual.textoBadge;

      const btnRemover = document.createElement("button");
      btnRemover.type = "button";
      btnRemover.className = "btn-remover";
      btnRemover.textContent = "🗑️ Remover";
      btnRemover.setAttribute("aria-label", `Remover tarefa "${tarefa.texto}"`);

      // Evento: Remover tarefa da lista
      btnRemover.addEventListener("click", () => {
        estadoTarefas = removerTarefa(estadoTarefas, tarefa.id);
        salvarTarefas(estadoTarefas);
        atualizarTela();
      });

      divAcoes.appendChild(badge);
      divAcoes.appendChild(btnRemover);

      li.appendChild(label);
      li.appendChild(divAcoes);
      listaEl.appendChild(li);
    });
  }

  // Evento: Envio do formulário para adicionar nova tarefa
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    try {
      estadoTarefas = adicionarTarefa(estadoTarefas, input.value);
      salvarTarefas(estadoTarefas);
      input.value = "";
      msgErro.hidden = true;

      // Se estiver filtrando apenas "Concluídas", volta para "Todas" para exibir a nova tarefa pendente
      if (filtroAtual === "concluidas") {
        filtroAtual = "todas";
        botoesFiltro.forEach((b) => {
          b.classList.toggle("ativo", b.dataset.filtro === "todas");
        });
      }

      input.focus();
      atualizarTela();
    } catch (erro) {
      msgErro.textContent = erro.message;
      msgErro.hidden = false;
    }
  });

  // Limpa mensagem de erro ao digitar
  input.addEventListener("input", () => {
    if (!msgErro.hidden) {
      msgErro.hidden = true;
    }
  });

  // Evento: Troca de filtros (Todas / Pendentes / Concluídas)
  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
      botoesFiltro.forEach((b) => b.classList.remove("ativo"));
      botao.classList.add("ativo");
      filtroAtual = botao.dataset.filtro || "todas";
      atualizarTela();
    });
  });

  atualizarTela();
}

// Inicializa automaticamente no navegador
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", inicializarApp);
}

// Exporta funções para execução de testes automatizados (Node.js)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    adicionarTarefa,
    alternarConclusaoTarefa,
    removerTarefa,
    filtrarTarefas,
    calcularResumo,
    obterMetadadosVisuaisTarefa,
  };
}

