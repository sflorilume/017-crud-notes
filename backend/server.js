const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ----------------------CRUD FEATUREs----------------------
let notes = [];

// GET /notes - retrieve all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// POST /notes - add a new notes
app.post("/notes", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "Note text is required" });
  }

  const newNote = { id: Date.now(), text };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// DELETE /notes
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  notes = notes.filter((note) => note.id !== parseInt(id));
  res.status(200).json({ message: "Note deleted" });
});

// UPDATE /notes
app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Note text is required" });
  }

  const noteIndex = notes.findIndex((note) => note.id === parseInt(id));
  if (noteIndex === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  notes[noteIndex].text = text;
  res.json(notes[noteIndex]);
});

// ----------------------LOGIN FEATUREs (OTW)----------------------

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
