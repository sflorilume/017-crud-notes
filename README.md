## INTEGRATION STAGE

### Axios built-in methods

| **Method**               | **Description**                                                                                                                                                | **Rate of Appearance / Popularity** |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **`axios.get()`**        | Makes a GET request to retrieve data from the server.                                                                                                          | Very High                           |
| **`axios.post()`**       | Makes a POST request to send data to the server.                                                                                                               | Very High                           |
| **`axios.put()`**        | Makes a PUT request to update data on the server.                                                                                                              | High                                |
| **`axios.delete()`**     | Makes a DELETE request to remove data from the server.                                                                                                         | High                                |
| **`axios.all()`**        | Executes multiple `axios` requests simultaneously and returns a promise with an array of results.                                                              | Medium                              |
| **`axios.spread()`**     | Used with `axios.all()` to handle multiple responses from concurrent requests.                                                                                 | Medium                              |
| **`axios.create()`**     | Creates a custom `axios` instance with custom settings (e.g., base URL, headers).                                                                              | Medium                              |
| **`axios.interceptors`** | Allows you to define functions that will run before or after a request or response, useful for handling requests globally (e.g., adding authorization tokens). | Low                                 |
| **`axios.cancelToken`**  | Used for cancelling requests. Useful when you want to abort a request (e.g., when a component unmounts).                                                       | Low                                 |

### Axios built-in properties

| **Property**     | **Description**                                                                                                   | **Rate of Appearance / Popularity** |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **`data`**       | Contains the actual data returned from the server (e.g., JSON).                                                   | Very High                           |
| **`status`**     | HTTP status code returned by the server (e.g., 200, 404).                                                         | High                                |
| **`statusText`** | The status message corresponding to the HTTP status code (e.g., "OK", "Not Found").                               | High                                |
| **`headers`**    | Contains the response headers sent by the server (e.g., content type, caching policies).                          | Medium                              |
| **`config`**     | The configuration used for the request, including parameters like URL, method, etc.                               | Medium                              |
| **`request`**    | The actual request object that was sent. Contains details of the HTTP request made (e.g., the URL, method, etc.). | Low                                 |

### JSX Tree's Map for App.js

Simplified

```less
<div wrapper>
  ├── <h1>Notes App</h1>
  ├── <div> {/* Input and Add Note Button */}
  │     ├── <input placeholder="Enter a note..." value={noteText} onChange={(e) => setNoteText(e.target.value)} />
  │     └── <button onClick={addNote}>Add Note</button>
  |
  ├── <ul> {/* Notes List */}
  │     ├── {notes.length > 0 ?
  |     |   // If YES: notes.length > 0
  │     │     notes.map((note) => (
  │     │       <li key={note.id}>
  │     │         {editingNote === note.id ?
  |     |           | // If YES: editingNote === note.id (this condition is a magical term)
  │     │           ├── <input
  │     │           │     type="text"
  │     │           │     value={editedText}
  │     │           │     onChange={(e) => setEditedText(e.target.value)}
  │     │           │   />
  │     │           ├── <button onClick={saveEditedNote}>Save</button>
  │     │           ├── <button onClick={() => setEditingNote(null)}>Cancel</button>
  │     │           : // If NO: editingNote === note.id
  │     │           ├── {note.text}
  │     │           ├── <button onClick={() => editNote(note.id, note.text)}>Edit</button>
  │     │           ├── <button onClick={() => deleteNote(note.id)}>Delete</button>
  │     │       </li>
  │     │     ))
  |     |   // If NO: notes.length > 0
  │     │     : <p>No notes yet</p>}
  └── </ul>
</div>
```

- Gen1: div wrapper
- Gen2: h1, div, ul
- Gen3a (div): input, button
- Gen3b (ul): li, input, buttons (save, cancel, edit, delete), <p>


Commented

```less
<div>
  ├── <h1>Notes App</h1>  // Title of the app
  ├── <div> {/* Input and Add Note Button */}
  │     ├── <input placeholder="Enter a note..." value={noteText} onChange={(e) => setNoteText(e.target.value)} />
  │     │    // Input field for entering a new note, binds to `noteText` state
  │     └── <button onClick={addNote}>Add Note</button>
  │          // Button to add the note, triggers the `addNote` function
  |
  ├── <ul> {/* Notes List */}
  │     ├── {notes.length > 0 ?
  │     │     notes.map((note) => ( // Iterating over each note in the `notes` array
  │     │       <li key={note.id}>   // List item for each note
  │     │         {editingNote === note.id ?
  │     │           <input
  │     │             type="text"
  │     │             value={editedText}
  │     │             onChange={(e) => setEditedText(e.target.value)}
  │     │           />  // If the note is being edited, show an input field for editing
  │     │           : note.text}  // Otherwise, show the note's text
  │     │
  │     │         {editingNote === note.id ?
  │     │           <>
  │     │             <button onClick={saveEditedNote}>Save</button>
  │     │             // Save button to save edited text
  │     │             <button onClick={() => setEditingNote(null)}>Cancel</button>
  │     │             // Cancel button to stop editing and revert changes
  │     │           </>
  │     │           :
  │     │           <>
  │     │             <button onClick={() => editNote(note.id, note.text)}>Edit</button>
  │     │             // Edit button to start editing a note
  │     │             <button onClick={() => deleteNote(note.id)}>Delete</button>
  │     │             // Delete button to remove a note
  │     │           </>
  │     │       </li>
  │     │     ))
  │     │     : <p>No notes yet</p>}  // Message if there are no notes
  └── </ul>
</div>
```
