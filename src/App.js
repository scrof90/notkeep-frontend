import React, { useState, useEffect } from 'react';
import Notes from './components/Notes';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  useEffect(() => {
    const setInitialNotes = async () => {
      try {
        const initialNotes = await noteService.getAll();
        setNotes(initialNotes);
      } catch {
        handleError('Failed to fetch notes');
      }
    };

    setInitialNotes();
  }, []);

  const addNote = async (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      pinned: false
    };

    try {
      const returnedNote = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    } catch {
      handleError('Note creation failed, please try again');
    }
  };

  const togglePinned = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, pinned: !note.pinned };

    try {
      const returnedNote = await noteService.update(id, changedNote);
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    } catch {
      handleError(`Note '${note.content}' was already removed from server`);
    }
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const notesPinned = notes.filter((note) => note.pinned);
  const notesUnpinned = notes.filter((note) => !note.pinned);

  return (
    <div>
      <h1>NotKeep</h1>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Notification message={errorMessage} />
      {notesPinned.length > 0 && <Notes notes={notesPinned} togglePinned={togglePinned} />}
      <br />
      {notesUnpinned.length > 0 && <Notes notes={notesUnpinned} togglePinned={togglePinned} />}
      <br />
      <Footer />
    </div>
  );
};

export default App;
