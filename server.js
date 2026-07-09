const express = require("express");
const db = require("./db");

const app = express();
const PORTA = 3000;

app.use(express.json());

// Converte uma linha da BD (concluida: 0/1) para o formato da API (concluida: true/false)
function formatarTarefa(linha) {
  return {
    id: linha.id,
    texto: linha.texto,
    concluida: Boolean(linha.concluida),
  };
}

// LER todas as tarefas
app.get("/tarefas", function (pedido, resposta) {
  const linhas = db.prepare("SELECT * FROM tarefas ORDER BY id").all();
  resposta.json(linhas.map(formatarTarefa));
});

// CRIAR uma nova tarefa
app.post("/tarefas", function (pedido, resposta) {
  const texto = pedido.body.texto;

  if (!texto || texto.trim() === "") {
    return resposta.status(400).json({ erro: "O texto é obrigatório" });
  }

  const resultado = db
    .prepare("INSERT INTO tarefas (texto, concluida) VALUES (?, 0)")
    .run(texto.trim());

  const novaTarefa = db
    .prepare("SELECT * FROM tarefas WHERE id = ?")
    .get(resultado.lastInsertRowid);

  resposta.status(201).json(formatarTarefa(novaTarefa));
});

// ALTERNAR o estado concluida
app.put("/tarefas/:id", function (pedido, resposta) {
  const id = Number(pedido.params.id);

  const tarefa = db.prepare("SELECT * FROM tarefas WHERE id = ?").get(id);

  if (!tarefa) {
    return resposta.status(404).json({ erro: "Tarefa não encontrada" });
  }

  const novoEstado = tarefa.concluida ? 0 : 1;
  db.prepare("UPDATE tarefas SET concluida = ? WHERE id = ?").run(novoEstado, id);

  const atualizada = db.prepare("SELECT * FROM tarefas WHERE id = ?").get(id);
  resposta.json(formatarTarefa(atualizada));
});

// APAGAR uma tarefa
app.delete("/tarefas/:id", function (pedido, resposta) {
  const id = Number(pedido.params.id);

  const resultado = db.prepare("DELETE FROM tarefas WHERE id = ?").run(id);

  if (resultado.changes === 0) {
    return resposta.status(404).json({ erro: "Tarefa não encontrada" });
  }

  resposta.status(204).send();
});

app.listen(PORTA, function () {
  console.log(`Servidor a correr em http://localhost:${PORTA}`);
});