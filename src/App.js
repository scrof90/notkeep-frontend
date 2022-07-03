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
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNotePinned, setNewNotePinned] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [isListView, setListView] = useState(false);
  const [isNoteCreationFormBlurred, setIsNoteCreationFormBlurred] = useState(true);

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

  // Note functions
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

  // SearchBar functions
  const handleSearchFilterChange = (e) => setSearchFilter(e.target.value);
  const handleSearchFilterClear = () => setSearchFilter('');

  // NoteCreationForm functions
  const addNote = async (e) => {
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
    if (newNoteTitle || newNoteContent) addNote(e);
    setNewNotePinned(false);
    setIsNoteCreationFormBlurred(true);
  };

  return (
    <div className={classes.app}>
      <header>
        <div>Main menu</div>
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
        <div>Account</div>
      </header>
      <div className={classes.notesContainer}>
        <div className={classes.noteCreationFormContainer}>
          <OutsideClickHandler onOutsideClick={handleNoteCreationFormBlur}>
            <NoteCreationForm
              onFocus={handleNoteCreationFormFocus}
              onSubmit={addNote}
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
        {notesFiltered.length > 0 && (
          <Notes notes={notesFiltered} togglePinned={togglePinned} isListView={isListView} />
        )}
      </div>
    </div>
  );
};

export default App;
