import React, { useState, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Logo from './components/Logo/Logo';
import SearchBar from './components/SearchBar/SearchBar';
import ToolBar from './components/ToolBar/ToolBar';
import Notes from './components/Notes/Notes';
import NoteCreationForm from './components/NoteCreationForm/NoteCreationForm';
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
  const handleNoteTitleChange = (e) => setNewNoteTitle(e.target.value);
  const handleNoteContentChange = (e) => setNewNoteContent(e.target.value);
  const handleNotePinClick = (e) => {
    e.preventDefault();
    setNewNotePinned(!newNotePinned);
  };
  const handleNoteCreationFormFocus = () => setIsNoteCreationFormBlurred(false);
  const handleNoteCreationFormBlur = (e) => {
    if (isNoteCreationFormBlurred) return;
    if (newNoteTitle || newNoteContent) handleCreate(e);
    setNewNotePinned(false);
    setIsNoteCreationFormBlurred(true);
  };

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
              onPinClick={handleNotePinClick}
              titleValue={newNoteTitle}
              contentValue={newNoteContent}
              isPinned={newNotePinned}
              isBlurred={isNoteCreationFormBlurred}
            />
          </OutsideClickHandler>
        </div>
        <Notification message={errorMessage} />
        <div className={`${classes.notesContainer} ${isListView && classes.listView}`}>
          {notesFiltered.length > 0 && (
            <Notes
              notes={notesFiltered}
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
