const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const {
  adicionarTarefa,
  alternarConclusaoTarefa,
  removerTarefa,
  filtrarTarefas,
  calcularResumo,
  obterMetadadosVisuaisTarefa,
} = require("./app.js");

test("1. Adicionar tarefa: inclui nova atividade como pendente na lista", () => {
  const listaInicial = [];
  const novaLista = adicionarTarefa(listaInicial, "  Estudar JavaScript no Antigravity  ", 101);

  assert.equal(novaLista.length, 1);
  assert.equal(novaLista[0].id, 101);
  assert.equal(novaLista[0].texto, "Estudar JavaScript no Antigravity");
  assert.equal(novaLista[0].concluida, false);
});

test("2. Validação de entrada: rejeita tarefa vazia ou apenas com espaços", () => {
  assert.throws(
    () => adicionarTarefa([], "   "),
    /A descrição da tarefa não pode estar vazia/
  );
});

test("3. Marcar tarefa como concluída: alterna o estado concluida (false -> true -> false)", () => {
  let lista = adicionarTarefa([], "Finalizar Desafio 3", 202);
  assert.equal(lista[0].concluida, false);

  // Marca como concluída
  lista = alternarConclusaoTarefa(lista, 202);
  assert.equal(lista[0].concluida, true);

  // Permite reabrir para pendente
  lista = alternarConclusaoTarefa(lista, 202);
  assert.equal(lista[0].concluida, false);
});

test("4. Diferenciação visual: tarefas pendentes e concluídas recebem classes, badges e estilos distintos", () => {
  const tarefaPendente = { id: 1, texto: "Ler documentação", concluida: false };
  const tarefaConcluida = { id: 2, texto: "Executar testes", concluida: true };

  const visualPendente = obterMetadadosVisuaisTarefa(tarefaPendente);
  const visualConcluida = obterMetadadosVisuaisTarefa(tarefaConcluida);

  // Verifica classes e rótulos de tarefa pendente
  assert.equal(visualPendente.classeItem, "tarefa-item pendente");
  assert.equal(visualPendente.classeBadge, "status-badge pendente");
  assert.equal(visualPendente.textoBadge, "⏳ Pendente");

  // Verifica classes e rótulos de tarefa concluída
  assert.equal(visualConcluida.classeItem, "tarefa-item concluida");
  assert.equal(visualConcluida.classeBadge, "status-badge concluida");
  assert.equal(visualConcluida.textoBadge, "✅ Concluída");

  // Verifica no CSS se a regra visual de concluída (line-through e :has) está presente
  const cssContent = fs.readFileSync(path.join(__dirname, "style.css"), "utf8");
  assert.match(cssContent, /\.tarefa-item:has\(\.tarefa-checkbox:checked\)/);
  assert.match(cssContent, /--item-decoracao:\s*line-through/);
});

test("5. Remover tarefa: exclui a atividade pelo ID sem afetar as demais", () => {
  let lista = [];
  lista = adicionarTarefa(lista, "Tarefa A", 1);
  lista = adicionarTarefa(lista, "Tarefa B", 2);
  lista = adicionarTarefa(lista, "Tarefa C", 3);

  lista = removerTarefa(lista, 2);

  assert.equal(lista.length, 2);
  assert.deepEqual(
    lista.map((t) => t.id),
    [1, 3]
  );
});

test("6. Resumo e Filtros: contabiliza e separa pendentes de concluídas corretamente", () => {
  let lista = [];
  lista = adicionarTarefa(lista, "Tarefa 1", 1);
  lista = adicionarTarefa(lista, "Tarefa 2", 2);
  lista = adicionarTarefa(lista, "Tarefa 3", 3);
  lista = alternarConclusaoTarefa(lista, 1);
  lista = alternarConclusaoTarefa(lista, 3);

  const resumo = calcularResumo(lista);
  assert.deepEqual(resumo, { total: 3, pendentes: 1, concluidas: 2 });

  const apenasPendentes = filtrarTarefas(lista, "pendentes");
  const apenasConcluidas = filtrarTarefas(lista, "concluidas");

  assert.equal(apenasPendentes.length, 1);
  assert.equal(apenasPendentes[0].id, 2);
  assert.equal(apenasConcluidas.length, 2);
});

test("7. Prevenção de colisão de ID: adições simultâneas no mesmo milissegundo geram IDs únicos", () => {
  let lista = [];
  for (let i = 0; i < 10; i++) {
    lista = adicionarTarefa(lista, `Tarefa rápida ${i}`);
  }

  const idsUnicos = new Set(lista.map((t) => t.id));
  assert.equal(idsUnicos.size, 10);

  // Remover uma tarefa não pode apagar outra por engano
  lista = removerTarefa(lista, lista[4].id);
  assert.equal(lista.length, 9);
});


