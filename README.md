"# Projeto-4-Backend-To-do" 
# API de Tarefas (Backend)

API REST simples para gerir tarefas, feita com Node.js e Express, como primeiro projeto de backend.

## Funcionalidades

- Listar todas as tarefas
- Criar uma nova tarefa
- Marcar uma tarefa como concluída / por fazer
- Apagar uma tarefa

## Tecnologias

- Node.js
- Express

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/tarefas` | Devolve todas as tarefas |
| `POST` | `/tarefas` | Cria uma nova tarefa (body: `{ "texto": "..." }`) |
| `PUT` | `/tarefas/:id` | Alterna o estado `concluida` da tarefa com esse id |
| `DELETE` | `/tarefas/:id` | Apaga a tarefa com esse id |

## Conceitos praticados

- Criar um servidor com Express (`app.listen`)
- Rotas para os métodos HTTP `GET`, `POST`, `PUT` e `DELETE`
- Parâmetros de rota (`:id`) e leitura do corpo do pedido (`req.body`)
- Códigos de estado HTTP (`200`, `201`, `204`, `404`)
- Manipulação de arrays em memória como armazenamento temporário de dados

## Como correr

```bash
npm install
node server.js
```

O servidor fica disponível em `http://localhost:3000`.

## Como testar

Os endpoints podem ser testados com o [Thunder Client](https://www.thunderclient.com/) (extensão do VSCode) ou o Postman. O `GET /tarefas` também pode ser visto diretamente no browser.

## Nota

Os dados vivem apenas em memória (um array), por isso são reiniciados sempre que o servidor reinicia. Uma base de dados persistente (ex: SQLite ou MongoDB) é o próximo passo planeado.

## Próximos passos

- [ ] Ligar a uma base de dados real (SQLite ou MongoDB)
- [ ] Adicionar validação dos dados recebidos
- [ ] Publicar o servidor online (ex: Render, Railway)