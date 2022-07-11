import React, { useState, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Logo from './components/Logo/Logo';
import SearchBar from './components/SearchBar/SearchBar';
import ToolBar from './components/ToolBar/ToolBar';
import Notes from './components/Notes/Notes';
import NoteCreationForm from './components/NoteCreationForm/NoteCreationForm';
import NoteEditForm from './components/NoteEditForm/NoteEditForm';
import Notification from './components/Notification/Notification';
import noteService from './services/notes';
import classes from './styles.module.scss';

const App = () => {
  // DB state
  const [notes, setNotes] = useState([]);

  // Search function state
  const [searchFilter, setSearchFilter] = useState('');

  // NoteCreationForm state
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    pinned: false
  });
  const [isNoteCreationFormBlurred, setIsNoteCreationFormBlurred] = useState(true);

  // NoteUpdateForm state
  const [editedNote, setEditedNote] = useState(null);

  // Notification state
  const [notification, setNotification] = useState(null);

  // misc state
  const [isListView, setListView] = useState(false);

  const notesFiltered = notes.filter((note) =>
    note.content.toLowerCase().includes(searchFilter.trim().toLowerCase())
  );

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const fetchAllNotes = async () => {
    try {
      const notes = await noteService.getAll();
      setNotes(notes);
    } catch {
      showNotification('Failed to fetch notes');
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  const toggleViewMode = () => setListView(!isListView);

  // SearchBar functions
  const handleSearchFilterChange = (e) => setSearchFilter(e.target.value);
  const handleSearchFilterClear = () => setSearchFilter('');

  // NoteCreationForm functions
  const handleCreate = async (e) => {
    e.preventDefault();
    if (isNoteCreationFormBlurred) return;
    if (newNote.title.length === 0 && newNote.content.length === 0) {
      clearNoteCreationForm();
      return;
    }

    const noteObject = {
      ...newNote,
      date: new Date().toISOString()
    };

    try {
      const returnedNote = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
      clearNoteCreationForm();
    } catch {
      showNotification('Note creation failed, please try again');
    }
  };

  const handleNewNotePinClick = () => setNewNote({ ...newNote, pinned: !newNote.pinned });
  const handleNewNoteChange = (e) => setNewNote({ ...newNote, [e.target.name]: e.target.value });
  const handleNoteCreationFormFocus = () => setIsNoteCreationFormBlurred(false);

  const clearNoteCreationForm = () => {
    setNewNote({
      title: '',
      content: '',
      pinned: false
    });
    setIsNoteCreationFormBlurred(true);
  };

  // NoteEditForm functions

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const note = notes.find((p) => p.id === id);

    const changedNote = {
      ...note,
      ...editedNote
    };

    try {
      const returnedNote = await noteService.update(id, changedNote);
      setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
      setEditedNote(null);
    } catch {
      showNotification('Note update failed, please try again');
    }
  };

  const handleEditedNotePinClick = () =>
    setEditedNote({ ...editedNote, pinned: !editedNote.pinned });
  const handleEditedNoteChange = (e) =>
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });

  // Note functions
  const togglePinned = async (e, id) => {
    e.stopPropagation();
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, pinned: !note.pinned };

    try {
      const returnedNote = await noteService.update(id, changedNote);
      setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
    } catch {
      showNotification(`Note '${note.content}' was already removed from server`);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const isConfirmed = window.confirm('Are you sure you want to delete this note?');
    if (isConfirmed) {
      noteService.remove(id).then(() => setNotes(notes.filter((n) => n.id !== id)));
    }
  };

  const handleNoteClick = (e, id) => {
    const note = notes.find((n) => n.id === id);
    setEditedNote(note);
  };

  return (
    <div className={classes.app}>
      <header>
        <div className={classes.logoContainer}>
          <Logo />
        </div>
        <div className={classes.searchContainer}>
          <SearchBar
            searchFilter={searchFilter}
            onSearchFilterChange={handleSearchFilterChange}
            onSearchFilterClear={handleSearchFilterClear}
          />
        </div>
        <div className={classes.toolsContainer}>
          <ToolBar
            refresh={fetchAllNotes}
            isListView={isListView}
            toggleViewMode={toggleViewMode}
          />
        </div>
      </header>
      <div className={classes.contentContainer}>
        <div className={classes.noteCreationFormContainer}>
          <OutsideClickHandler onOutsideClick={handleCreate}>
            <NoteCreationForm
              newNote={newNote}
              onFocus={handleNoteCreationFormFocus}
              onPin={handleNewNotePinClick}
              onChange={handleNewNoteChange}
              onSubmit={handleCreate}
              isBlurred={isNoteCreationFormBlurred}
            />
          </OutsideClickHandler>
          {editedNote && (
            <NoteEditForm
              note={editedNote}
              onPin={handleEditedNotePinClick}
              onChange={handleEditedNoteChange}
              onSubmit={handleUpdate}
            />
          )}
        </div>
        <Notification message={notification} />
        <div className={`${classes.notesContainer} ${isListView && classes.listView}`}>
          {notesFiltered.length > 0 && (
            <Notes
              notes={notesFiltered}
              onClick={handleNoteClick}
              onPin={togglePinned}
              onDelete={handleDelete}
              isListView={isListView}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
