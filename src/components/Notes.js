import PropTypes from 'prop-types';
import Note from './Note';

const Notes = ({ notes, togglePinned }) => {
  return (
    <div>
      <h2 className="notes-header">{notes[0].pinned ? 'Pinned' : 'Others'}</h2>
      <div className="notes">
        {notes.map((note) => (
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
