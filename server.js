const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());

// Converts a DB row (completed: 0/1) to the API format (completed: true/false)
function formatTask(row) {
  return {
    id: row.id,
    text: row.text,
    completed: Boolean(row.completed),
  };
}

// READ all tasks
app.get("/tasks", function (req, res) {
  const rows = db.prepare("SELECT * FROM tasks ORDER BY id").all();
  res.json(rows.map(formatTask));
});

// CREATE a new task
app.post("/tasks", function (req, res) {
  const text = req.body.text;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text is required" });
  }

  const result = db
    .prepare("INSERT INTO tasks (text, completed) VALUES (?, 0)")
    .run(text.trim());

  const newTask = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(formatTask(newTask));
});

// TOGGLE the completed state
app.put("/tasks/:id", function (req, res) {
  const id = Number(req.params.id);

  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const newState = task.completed ? 0 : 1;
  db.prepare("UPDATE tasks SET completed = ? WHERE id = ?").run(newState, id);

  const updated = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  res.json(formatTask(updated));
});

// DELETE a task
app.delete("/tasks/:id", function (req, res) {
  const id = Number(req.params.id);

  const result = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).send();
});

app.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}`);
});
