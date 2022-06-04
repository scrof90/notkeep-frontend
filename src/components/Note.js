import PropTypes from 'prop-types';
import { FaThumbtack } from 'react-icons/fa';

const Note = ({ note, togglePinned }) => {
  return (
    <div className="note">
      <FaThumbtack className="pin" onClick={() => togglePinned(note.id)}>
        {note.pinned ? 'unpin' : 'pin'}
      </FaThumbtack>
      <p>{note.content}</p>
    </div>
  );
};

Note.propTypes = {
  note: PropTypes.exact({
    id: PropTypes.number,
    content: PropTypes.string,
    date: PropTypes.string,
    pinned: PropTypes.bool
  }).isRequired,
  togglePinned: PropTypes.func.isRequired
};

export default Note;
