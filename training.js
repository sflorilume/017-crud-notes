import { useEffect, useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [editedText, setEditedText] = useState("");

  // CRUD - Create
  const addNote = () => {
    if (!noteText.trim()) return;

    axios
      .post("http://localhost:5000/notes", { text: noteText })
      .then((response) => {
        setNotes([...notes, response.data]);
        setNoteText("");
      })
      .catch((error) => console.error("Error adding note:", error));
  };

  // CRUD - Read
  useEffect(() => {
    axios
      .get("http://localhost:5000/notes")
      .then((response) => setNotes(response.data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  // CRUD - Update
  const editNote = (id, currentText) => {
    setEditingNote(id);
    setEditedText(currentText);
  };
  const saveEditedNote = () => {
    if (!editedText.trim()) return;
    axios
      .put(`http://localhost:5000/notes/${editingNote}`, { text: editedText })
      .then((response) => {
        setNotes(
          notes.map((note) => (note.id === editingNote ? response.data : note))
        );
        setEditingNote(null);
        setEditedText("");
      })
      .catch((error) => console.error("Error editing note:", error));
  };

  // CRUD - Delete
  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:5000/notes/${id}`)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((error) => console.error("Error deleteing note:", error));
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-10">
      <h1>Notes App</h1>

      <div>
        <input type="text" value={noteText} onChange={(e) => setNoteText(e.target.value)} />

        <button onClick={addNote}>Add Note</button>
      </div>

      <ul>
        {notes.length > 0 ? (
          notes.map((note) => (
            <li key={note.id}>{editingNote === note.id ? (
              <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} /> ): ()</li>
          ))
        )}
      </ul>
    </div>
  )
};

export default App; 
