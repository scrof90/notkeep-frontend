import React, { useState, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Logo from 'components/ui/Logo';
import SearchBar from 'pages/Home/SearchBar';
import ToolBar from 'pages/Home/ToolBar';
import Notes from 'pages/Home/Notes';
import NoteCreationForm from 'components/form/NoteCreationForm';
import NoteEditForm from 'components/form/NoteEditForm';
import Notification from 'components/ui/Notification';
import noteService from 'services/notes';
import classes from './assets/App.module.scss';

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
      showNotification('Note update failed, please try again');
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const isConfirmed = window.confirm('Are you sure you want to delete this note?');
    if (isConfirmed) {
      try {
        await noteService.remove(id);
        setNotes(notes.filter((n) => n.id !== id));
      } catch {
        showNotification('Note deletion failed, please try again');
      }
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
        <OutsideClickHandler onOutsideClick={handleCreate}>
          <div className={classes.noteCreationFormContainer}>
            <NoteCreationForm
              newNote={newNote}
              onFocus={handleNoteCreationFormFocus}
              onPin={handleNewNotePinClick}
              onChange={handleNewNoteChange}
              onSubmit={handleCreate}
              isBlurred={isNoteCreationFormBlurred}
            />
          </div>
        </OutsideClickHandler>
        {editedNote && (
          <NoteEditForm
            note={editedNote}
            onPin={handleEditedNotePinClick}
            onChange={handleEditedNoteChange}
            onSubmit={handleUpdate}
          />
        )}
        <Notification message={notification} />
        <div className={`${classes.notesContainer} ${isListView ? classes.listView : undefined}`}>
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
