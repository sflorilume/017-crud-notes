import { useEffect, useState } from "react";
import axios from "axios";

// The frontend (React app) interacts with the backend by sending HTTP requests to perform the CRUD actions.

const App = () => {
  // state for creating notes
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  // state for updating notes
  const [editingNote, setEditingNote] = useState(null);
  const [editedText, setEditedText] = useState("");

  // add new notes C
  // In the frontend, when a user enters a note and clicks the "Add Note" button, we send a POST request to the backend.
  const addNote = () => {
    if (!noteText.trim()) return; // prevent empty notes

    axios
      .post("http://localhost:5000/notes", { text: noteText }) // a POST request is sent to the backend with the note text in the request body ({ text: noteText }).
      .then((response) => {
        setNotes([...notes, response.data]); // On success, the new note is added to the notes state, which automatically updates the UI (React re-renders). addNote update notes by appending a new object { id, text }.
        setNoteText(""); // The input field is cleared.
      })
      .catch((error) => console.error("Error adding note:", error));
  };

  // fetch all notes R
  // The frontend fetches the list of notes when the app is first loaded using a GET request.
  useEffect(() => {
    axios
      .get("http://localhost:5000/notes")
      .then((response) => setNotes(response.data)) // On success, the list of notes is saved in the notes state and displayed.
      .catch((error) => console.error("error fetching notes:", error));
  }, []); // will only run once, when the component mounts.

  // update existing notes U
  // The frontend updates the state by replacing the old note with the new one, causing React to re-render the component.
  const editNote = (id, currentText) => {
    setEditingNote(id);
    setEditedText(currentText);
  };
  // When a user edits a note, the frontend sends a PUT request to update it on the server.
  const saveEditedNote = () => {
    if (!editedText.trim()) return;
    axios
      .put(`http://localhost:5000/notes/${editingNote}`, { text: editedText }) // When the user clicks "Save" after editing, a PUT request is sent to the backend with the note’s new text.
      .then((response) => {
        setNotes(
          notes.map((note) => (note.id === editingNote ? response.data : note)) // The backend updates the note and returns the updated note.
        );
        setEditingNote(null); // clear editing state
        setEditedText(""); // clear input
      })
      .catch((error) => console.error("Error editing note:", error));
  };

  // delete existed notes D
  // When the user clicks "Delete," the frontend sends a DELETE request with the note's id to the backend.
  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:5000/notes/${id}`)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id)); // If the note’s id matches the target id, that note will be filtered out (excluded from the new array).
          // example: 2 !== 2 is false, so it will be excluded from the new array. But 3 !== 2 is true, so it stays in the array.
        // filter() creates a new array with all elements that pass the condition specified in the callback function. It does not modify the original array
      })
      .catch((error) => console.error("Error deleting note:", error));
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
