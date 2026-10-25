# To-do REST API (Backend)

A REST API to manage tasks, built with Node.js and Express, storing data in an SQLite database. It was my first backend project.

## Features

- List all tasks
- Create a new task
- Toggle a task's state (completed / not completed)
- Delete a task
- Data is stored in a database, so it isn't lost when the server restarts
- Input validation and proper error responses

## Technologies

- Node.js
- Express
- SQLite (via better-sqlite3)

## Endpoints

| Method   | Route        | Description                                            |
| -------- | ------------ | ------------------------------------------------------ |
| `GET`    | `/tasks`     | Returns all tasks                                      |
| `POST`   | `/tasks`     | Creates a new task (body: `{ "text": "..." }`)         |
| `PUT`    | `/tasks/:id` | Toggles the `completed` state of the task with that id |
| `DELETE` | `/tasks/:id` | Deletes the task with that id                          |

## Database structure

Table `tasks`:

| Column      | Type    | Description                        |
| ----------- | ------- | ---------------------------------- |
| `id`        | INTEGER | Unique identifier (auto-increment) |
| `text`      | TEXT    | Task description                   |
| `completed` | INTEGER | State (0 = to do, 1 = completed)   |

## Concepts practiced

- Creating a server with Express (`app.listen`)
- Routes for the `GET`, `POST`, `PUT` and `DELETE` HTTP methods
- Route parameters (`:id`) and reading the request body (`req.body`)
- HTTP status codes (`200`, `201`, `204`, `400`, `404`)
- Persistence with SQLite and *prepared statements* (protection against SQL injection)
- Validating input data
- Converting between the database format (0/1) and the API format (true/false)

## How to run

```bash
npm install
node server.js
```

The server runs at `http://localhost:3000`. The database (`tasks.db`) is created automatically on the first run.

## How to test

You can test the endpoints with [Thunder Client](https://www.thunderclient.com/) (a VS Code extension) or Postman. `GET /tasks` can also be opened directly in the browser.

## Next steps

- [ ] Add a simple frontend that consumes this API
- [ ] Add a creation date to each task
- [ ] Deploy the server online (e.g. Render, Railway)
