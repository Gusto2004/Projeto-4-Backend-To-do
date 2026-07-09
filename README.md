# API de Tarefas (Backend)

API REST para gerir tarefas, feita com Node.js e Express, com persistência de dados numa base de dados SQLite. Primeiro projeto de backend.

## Funcionalidades

- Listar todas as tarefas
- Criar uma nova tarefa
- Alternar o estado de uma tarefa (concluída / por fazer)
- Apagar uma tarefa
- Os dados persistem numa base de dados (não se perdem ao reiniciar o servidor)
- Validação dos dados recebidos e respostas de erro adequadas

## Tecnologias

- Node.js
- Express
- SQLite (via better-sqlite3)

## Endpoints

| Método   | Rota           | Descrição                                          |
| -------- | -------------- | -------------------------------------------------- |
| `GET`    | `/tarefas`     | Devolve todas as tarefas                           |
| `POST`   | `/tarefas`     | Cria uma nova tarefa (body: `{ "texto": "..." }`)  |
| `PUT`    | `/tarefas/:id` | Alterna o estado `concluida` da tarefa com esse id |
| `DELETE` | `/tarefas/:id` | Apaga a tarefa com esse id                         |

## Estrutura da base de dados

Tabela `tarefas`:

| Coluna      | Tipo    | Descrição                              |
| ----------- | ------- | -------------------------------------- |
| `id`        | INTEGER | Identificador único (auto-incremento)  |
| `texto`     | TEXT    | Descrição da tarefa                     |
| `concluida` | INTEGER | Estado (0 = por fazer, 1 = concluída)  |

## Conceitos praticados

- Criar um servidor com Express (`app.listen`)
- Rotas para os métodos HTTP `GET`, `POST`, `PUT` e `DELETE`
- Parâmetros de rota (`:id`) e leitura do corpo do pedido (`req.body`)
- Códigos de estado HTTP (`200`, `201`, `204`, `400`, `404`)
- Persistência com SQLite e *prepared statements* (proteção contra SQL injection)
- Validação de dados de entrada
- Conversão entre o formato da base de dados (0/1) e o da API (true/false)

## Como correr

```bash
npm install
node server.js
```

O servidor fica disponível em `http://localhost:3000`. A base de dados (`tarefas.db`) é criada automaticamente na primeira execução.

## Como testar

Os endpoints podem ser testados com o [Thunder Client](https://www.thunderclient.com/) (extensão do VSCode) ou o Postman. O `GET /tarefas` também pode ser visto diretamente no browser.

## Próximos passos

- [ ] Adicionar um frontend simples que consuma esta API
- [ ] Adicionar uma data de criação a cada tarefa
- [ ] Publicar o servidor online (ex: Render, Railway)