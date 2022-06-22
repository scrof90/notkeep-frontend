import PropTypes from 'prop-types';
import Note from './Note';
import styles from './Notes.module.css';

const Notes = ({ notes, togglePinned, isListView }) => {
  const notesPinned = notes.filter((note) => note.pinned);
  const notesUnpinned = notes.filter((note) => !note.pinned);

  return (
    <div className={styles.wrapper}>
      {notesPinned.length && <h2 className={styles.header}>Pinned</h2>}
      <div className={isListView ? styles.listView : styles.gridView}>
        {notesPinned.length > 0 &&
          notesPinned.map((note) => <Note key={note.id} note={note} togglePinned={togglePinned} />)}
      </div>
      {notesUnpinned.length && <h2 className={styles.header}>Others</h2>}
      <div className={isListView ? styles.listView : styles.gridView}>
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
