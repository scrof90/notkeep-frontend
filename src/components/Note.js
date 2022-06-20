import PropTypes from 'prop-types';
import { MdPushPin } from 'react-icons/md';
import { MdOutlinePushPin } from 'react-icons/md';
import styles from './Note.module.css';

const Note = ({ note, togglePinned }) => {
  return (
    <div className={styles.note}>
      <div className={styles.iconContainer} onClick={() => togglePinned(note.id)}>
        {note.pinned && <MdPushPin className={styles.icon} />}
        {!note.pinned && <MdOutlinePushPin className={styles.icon} />}
      </div>
      {note.title.length > 0 && <h3>{note.title}</h3>}
      <p>{note.content}</p>
    </div>
  );
};

Note.propTypes = {
  note: PropTypes.exact({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    pinned: PropTypes.bool
  }).isRequired,
  togglePinned: PropTypes.func.isRequired
};

export default Note;
