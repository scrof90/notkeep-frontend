import PropTypes from 'prop-types';
import Note from './Note/Note';
import classes from './styles.module.scss';

const Notes = ({ notes, onPin, onDelete, isListView }) => {
  const notesPinned = notes.filter((note) => note.pinned);
  const notesUnpinned = notes.filter((note) => !note.pinned);

  return (
    <div className={classes.notes}>
      {notesPinned.length > 0 && (
        <>
          <h2>Pinned</h2>
          <div className={isListView ? classes.listLayout : classes.gridLayout}>
            {notesPinned.map((note) => (
              <Note key={note.id} note={note} onPin={onPin} isListView={isListView} />
            ))}
          </div>
        </>
      )}
      {notesUnpinned.length > 0 && (
        <>
          <h2>Others</h2>
          <div className={isListView ? classes.listLayout : classes.gridLayout}>
            {notesUnpinned.map((note) => (
              <Note
                key={note.id}
                note={note}
                onPin={onPin}
                onDelete={onDelete}
                isListView={isListView}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  onPin: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isListView: PropTypes.bool.isRequired
};

export default Notes;
