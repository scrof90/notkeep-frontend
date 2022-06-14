import PropTypes from 'prop-types';
import Note from './Note';

const Notes = ({ notes, togglePinned, searchFilter }) => {
  return (
    <div>
      <h2 className="notes-header">{notes[0].pinned ? 'Pinned' : 'Others'}</h2>
      <div className="notes">
        {notes
          .filter((note) => note.content.toLowerCase().includes(searchFilter.trim().toLowerCase()))
          .map((note) => (
            <Note key={note.id} note={note} togglePinned={togglePinned} />
          ))}
      </div>
    </div>
  );
};

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  togglePinned: PropTypes.func.isRequired,
  searchFilter: PropTypes.string.isRequired
};

export default Notes;
