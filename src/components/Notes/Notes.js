import PropTypes from 'prop-types';
import Note from './Note/Note';
import classes from './styles.module.scss';

const Notes = ({ notes, togglePinned, isListView }) => {
  const notesPinned = notes.filter((note) => note.pinned);
  const notesUnpinned = notes.filter((note) => !note.pinned);
  const wrapperLayout = isListView ? `${classes.wrapper} ${classes.centered}` : classes.wrapper;
  const notesLayout = isListView ? classes.listLayout : classes.gridLayout;

  return (
    <div className={wrapperLayout}>
      {notesPinned.length > 0 && <h2>Pinned</h2>}
      <div className={notesLayout}>
        {notesPinned.length > 0 &&
          notesPinned.map((note) => <Note key={note.id} note={note} togglePinned={togglePinned} />)}
      </div>
      {notesUnpinned.length > 0 && <h2>Others</h2>}
      <div className={notesLayout}>
        {notesUnpinned.length > 0 &&
          notesUnpinned.map((note) => (
            <Note key={note.id} note={note} togglePinned={togglePinned} />
          ))}
      </div>
    </div>
  );
};

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  togglePinned: PropTypes.func.isRequired,
  isListView: PropTypes.bool.isRequired
};

export default Notes;