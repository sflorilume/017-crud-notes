const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ----------------------CRUD FEATUREs----------------------
let notes = [];

// GET /notes - retrieve all notes (intp 5w6 541)
app.get("/notes", (req, res) => {
  res.json(notes); // show the current list of notes in the notes array
});

// POST /notes - add a new notes (enfp 7w6 724)
app.post("/notes", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "Note text is required" });
  }

  // if there is text, it proceeds on creates a new note with unique id (using Date.now() and pushes it into the notes array)
  const newNote = { id: Date.now(), text };
  notes.push(newNote);
  res.status(201).json(newNote); // success
});

// DELETE /notes (istp 8w7 831)
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  notes = notes.filter((note) => note.id !== parseInt(id)); // The server filters out the note with the matching id from the notes array.
  res.status(200).json({ message: "Note deleted" });
});

// UPDATE /notes (istj 1w9 135)
app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Note text is required" });
  }

  const noteIndex = notes.findIndex((note) => note.id === parseInt(id)); // findIndex iterates through the notes array and checks if the note.id is equal to the provided id.
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
