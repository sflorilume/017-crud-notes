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
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>

      {/* Input and Add Note Button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded w-64"
          placeholder="Enter a note..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <ul className="bg-white p-4 rounded shadow w-80">
        {notes.length > 0 ? (
          notes.map((note) => (
            <li
              key={note.id}
              className="border-b last:border-0 p-2 flex justify-between items-center"
            >
              {editingNote === note.id ? (
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="border p-2 rounded w-64"
                />
              ) : (
                note.text
              )}

              {editingNote === note.id ? (
                <>
                  <button
                    onClick={saveEditedNote}
                    className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingNote(null)}
                    className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => editNote(note.id, note.text)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <p className="text-red-300 text-center">No notes yet</p>
        )}
      </ul>
    </div>
  );
};

export default App;
