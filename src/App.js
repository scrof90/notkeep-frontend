import React, { useState, useEffect } from 'react';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import ToolBar from './components/ToolBar';
import Notes from './components/Notes';
import NoteCreationForm from './components/NoteCreationForm';
import Notification from './components/Notification';
import noteService from './services/notes';
import styles from './App.module.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [isListView, setListView] = useState(false);

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const fetchAllNotes = async () => {
    try {
      const notes = await noteService.getAll();
      setNotes(notes);
    } catch {
      handleError('Failed to fetch notes');
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  // TODO: add logic for determining title
  const addNote = async (e) => {
    e.preventDefault();
    const noteObject = {
      title: '',
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

  const toggleViewMode = () => setListView(!isListView);

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
  const handleSearchFilterClear = () => setSearchFilter('');

  const notesFiltered = notes.filter((note) =>
    note.content.toLowerCase().includes(searchFilter.trim().toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div>Main menu</div>
        <Logo />
        <div className={styles.searchContainer}>
          <SearchBar
            searchFilter={searchFilter}
            onSearchFilterChange={handleSearchFilterChange}
            onSearchFilterClear={handleSearchFilterClear}
          />
        </div>
        <div className={styles.toolsContainer}>
          <ToolBar
            refresh={fetchAllNotes}
            isListView={isListView}
            toggleViewMode={toggleViewMode}
          />
        </div>
        <div>Account</div>
      </header>
      <div className={styles.notesContainer}>
        <NoteCreationForm onSubmit={addNote} inputValue={newNote} onChange={handleNoteChange} />
        <Notification message={errorMessage} />
        {notesFiltered.length && (
          <Notes notes={notesFiltered} togglePinned={togglePinned} isListView={isListView} />
        )}
      </div>
    </div>
  );
};

export default App;
