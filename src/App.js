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
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNotePinned, setNewNotePinned] = useState(false);
  const [isNoteCreationFormBlurred, setIsNoteCreationFormBlurred] = useState(true);

  // NoteUpdateForm state
  const [editedNote, setEditedNote] = useState(null);
  const [editedNoteTitle, setEditedNoteTitle] = useState('');
  const [editedNoteContent, setEditedNoteContent] = useState('');
  const [editedNotePinned, setEditedNotePinned] = useState(false);

  // Notification state
  const [errorMessage, setErrorMessage] = useState(null);

  // misc state
  const [isListView, setListView] = useState(false);

  const notesFiltered = notes.filter((note) =>
    note.content.toLowerCase().includes(searchFilter.trim().toLowerCase())
  );

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

  const toggleViewMode = () => setListView(!isListView);

  // SearchBar functions
  const handleSearchFilterChange = (e) => setSearchFilter(e.target.value);
  const handleSearchFilterClear = () => setSearchFilter('');

  // NoteCreationForm functions
  const handleCreate = async (e) => {
    e.preventDefault();
    const noteObject = {
      title: newNoteTitle,
      content: newNoteContent,
      date: new Date().toISOString(),
      pinned: newNotePinned
    };

    try {
      const returnedNote = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
      setNewNoteTitle('');
      setNewNoteContent('');
      setNewNotePinned(false);
    } catch {
      handleError('Note creation failed, please try again');
    }
  };

  const handleNotePinClick = (e) => {
    e.preventDefault();
    setNewNotePinned(!newNotePinned);
  };

  const handleNoteTitleChange = (e) => setNewNoteTitle(e.target.value);
  const handleNoteContentChange = (e) => setNewNoteContent(e.target.value);
  const handleNoteCreationFormFocus = () => setIsNoteCreationFormBlurred(false);

  const handleNoteCreationFormBlur = (e) => {
    if (isNoteCreationFormBlurred) return;
    if (newNoteTitle || newNoteContent) handleCreate(e);
    setNewNotePinned(false);
    setIsNoteCreationFormBlurred(true);
  };

  // NoteEditForm functions

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const note = notes.find((p) => p.id === id);

    const changedNote = {
      ...note,
      pinned: editedNotePinned,
      title: editedNoteTitle,
      content: editedNoteContent
    };

    try {
      const returnedNote = await noteService.update(id, changedNote);
      setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
      setEditedNote(null);
      setEditedNotePinned(false);
      setEditedNoteTitle('');
      setEditedNoteContent('');
    } catch {
      handleError('Note update failed, please try again');
    }
  };

  const handleEditedNotePinClick = (e) => {
    e.preventDefault();
    setEditedNotePinned(!editedNotePinned);
  };

  const handleEditedNoteTitleChange = (e) => setEditedNoteTitle(e.target.value);
  const handleEditedNoteContentChange = (e) => setEditedNoteContent(e.target.value);

  // Note functions
  const togglePinned = async (e, id) => {
    e.stopPropagation();
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, pinned: !note.pinned };

    try {
      const returnedNote = await noteService.update(id, changedNote);
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    } catch {
      handleError(`Note '${note.content}' was already removed from server`);
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
    setEditedNotePinned(note.pinned);
    setEditedNoteTitle(note.title);
    setEditedNoteContent(note.content);
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
          <OutsideClickHandler onOutsideClick={handleNoteCreationFormBlur}>
            <NoteCreationForm
              onFocus={handleNoteCreationFormFocus}
              onSubmit={handleCreate}
              onTitleChange={handleNoteTitleChange}
              onContentChange={handleNoteContentChange}
              onPin={handleNotePinClick}
              titleValue={newNoteTitle}
              contentValue={newNoteContent}
              isPinned={newNotePinned}
              isBlurred={isNoteCreationFormBlurred}
            />
          </OutsideClickHandler>
          {editedNote && (
            <NoteEditForm
              onSubmit={handleUpdate}
              onPin={handleEditedNotePinClick}
              onTitleChange={handleEditedNoteTitleChange}
              onContentChange={handleEditedNoteContentChange}
              note={editedNote}
              isPinned={editedNotePinned}
              titleValue={editedNoteTitle}
              contentValue={editedNoteContent}
            />
          )}
        </div>
        <Notification message={errorMessage} />
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
