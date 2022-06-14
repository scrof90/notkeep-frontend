import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Notes from './components/Notes';
import NoteCreationForm from './components/NoteCreationForm';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');

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

  const handleNoteChange = (e) => setNewNote(e.target.value);
  const handleSearchFilterChange = (e) => setSearchFilter(e.target.value);

  const notesPinned = notes.filter((note) => note.pinned);
  const notesUnpinned = notes.filter((note) => !note.pinned);

  return (
    <div>
      <header className="topbar">
        <div>
          <div>main menu button</div>
          <div>
            <div>logo</div>
            <h1>NotKeep</h1>
          </div>
        </div>
        <SearchBar value={searchFilter} onChange={handleSearchFilterChange} />
        <div>
          <div>tools</div>
          <div>account</div>
        </div>
      </header>
      <div className="notes-container">
        <NoteCreationForm onSubmit={addNote} inputValue={newNote} onChange={handleNoteChange} />
        <Notification message={errorMessage} />
        {notesPinned.length > 0 && (
          <Notes notes={notesPinned} searchFilter={searchFilter} togglePinned={togglePinned} />
        )}
        {notesUnpinned.length > 0 && (
          <Notes notes={notesUnpinned} searchFilter={searchFilter} togglePinned={togglePinned} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
