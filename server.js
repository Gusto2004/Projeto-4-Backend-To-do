const express = require("express");
const app = express();
const PORTA = 3000;

app.use(express.json());

let tarefas = [
  { id: 1, texto: "Aprender Express", concluida: false },
  { id: 2, texto: "Criar a primeira API", concluida: true },
];

app.get("/tarefas", function (pedido, resposta) {
  resposta.json(tarefas);
});

app.post("/tarefas", function (pedido, resposta) {
  const novaTarefa = {
    id: tarefas.length + 1,
    texto: pedido.body.texto,
    concluida: false,
  };

  tarefas.push(novaTarefa);
  resposta.status(201).json(novaTarefa);
});
app.delete('/tarefas/:id', function (pedido, resposta) {
  const id = Number(pedido.params.id);

  tarefas = tarefas.filter(function (tarefa) {
    return tarefa.id !== id;
  });

  resposta.status(204).send();
});

app.put('/tarefas/:id', function (pedido, resposta) {
  const id = Number(pedido.params.id);

  const tarefa = tarefas.find(function (tarefa) {
    return tarefa.id === id;
  });

  if (!tarefa) {
    resposta.status(404).json({ erro: 'Tarefa não encontrada' });
    return;
  }

  tarefa.concluida = !tarefa.concluida;
  resposta.json(tarefa);
});

app.listen(PORTA, function () {
  console.log(`Servidor a correr em http://localhost:${PORTA}`);
});
