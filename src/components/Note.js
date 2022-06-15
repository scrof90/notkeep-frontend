import PropTypes from 'prop-types';
import { MdPushPin } from 'react-icons/md';
import { MdOutlinePushPin } from 'react-icons/md';

const Note = ({ note, togglePinned }) => {
  return (
    <div className="note">
      <div className="pin-container" onClick={() => togglePinned(note.id)}>
        {note.pinned && <MdPushPin className="icon" />}
        {!note.pinned && <MdOutlinePushPin className="icon" />}
      </div>
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
