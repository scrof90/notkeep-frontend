import PropTypes from 'prop-types';
import Note from 'pages/Home/Note';
import classes from './assets/Notes.module.scss';

const Notes = ({ notes, onClick, onPin, onDelete, isListView }) => {
  const notesPinned = notes.filter((note) => note.pinned);
  const notesUnpinned = notes.filter((note) => !note.pinned);

  const mapper = (note) => (
    <Note
      key={note.id}
      note={note}
      onClick={onClick}
      onPin={onPin}
      onDelete={onDelete}
      isListView={isListView}
    />
  );

  return (
    <div className={classes.notes}>
      {notesPinned.length > 0 && (
        <>
          <h2>Pinned</h2>
          <div className={isListView ? classes.listLayout : classes.gridLayout}>
            {notesPinned.map(mapper)}
          </div>
        </>
      )}
      {notesUnpinned.length > 0 && (
        <>
          <h2>Others</h2>
          <div className={isListView ? classes.listLayout : classes.gridLayout}>
            {notesUnpinned.map(mapper)}
          </div>
        </>
      )}
    </div>
  );
};

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onPin: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isListView: PropTypes.bool.isRequired
};

export default Notes;
