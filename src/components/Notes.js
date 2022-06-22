import PropTypes from 'prop-types';
import Note from './Note';
import styles from './Notes.module.css';

const Notes = ({ notes, togglePinned, isListView }) => {
  const notesPinned = notes.filter((note) => note.pinned);
  const notesUnpinned = notes.filter((note) => !note.pinned);
  const wrapperLayout = isListView ? `${styles.wrapper} ${styles.centered}` : styles.wrapper;
  const notesLayout = isListView ? styles.listLayout : styles.gridLayout;

  return (
    <div className={wrapperLayout}>
      {notesPinned.length && <h2 className={styles.header}>Pinned</h2>}
      <div className={notesLayout}>
        {notesPinned.length &&
          notesPinned.map((note) => <Note key={note.id} note={note} togglePinned={togglePinned} />)}
      </div>
      {notesUnpinned.length && <h2 className={styles.header}>Others</h2>}
      <div className={notesLayout}>
        {notesUnpinned.length &&
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
