import PropTypes from 'prop-types';
import Note from './Note';
import styles from './Notes.module.css';

const Notes = ({ notes, togglePinned }) => {
  const notesPinned = notes.filter((note) => note.pinned);
  const notesUnpinned = notes.filter((note) => !note.pinned);

  return (
    <div>
      {notesPinned.length > 0 && <h2 className={styles.header}>Pinned</h2>}
      <div className={styles.notes}>
        {notesPinned.length > 0 &&
          notesPinned.map((note) => <Note key={note.id} note={note} togglePinned={togglePinned} />)}
      </div>
      {notesUnpinned.length > 0 && <h2 className={styles.header}>Others</h2>}
      <div className={styles.notes}>
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
  togglePinned: PropTypes.func.isRequired
};

export default Notes;
