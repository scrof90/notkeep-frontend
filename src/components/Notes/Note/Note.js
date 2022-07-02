import PropTypes from 'prop-types';
import { MdPushPin, MdOutlinePushPin } from 'react-icons/md';
import classes from './styles.module.scss';

const Note = ({ note, togglePinned, isListView }) => {
  return (
    <div className={`${classes.note} ${isListView && classes.listView}`}>
      <button onClick={() => togglePinned(note.id)}>
        {note.pinned ? <MdPushPin /> : <MdOutlinePushPin />}
      </button>
      {note.title.length > 0 && <h3>{note.title}</h3>}
      <p>{note.content}</p>
    </div>
  );
};

Note.propTypes = {
  note: PropTypes.exact({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    pinned: PropTypes.bool
  }).isRequired,
  togglePinned: PropTypes.func.isRequired,
  isListView: PropTypes.bool.isRequired
};

export default Note;
