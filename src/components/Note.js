import PropTypes from 'prop-types';
import { MdPushPin } from 'react-icons/md';
import { MdOutlinePushPin } from 'react-icons/md';
import styles from './Note.module.css';

const Note = ({ note, togglePinned }) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.btn} onClick={() => togglePinned(note.id)}>
        {note.pinned ? <MdPushPin /> : <MdOutlinePushPin />}
      </button>
      {note.title.length && <h3 className={styles.title}>{note.title}</h3>}
      <p className={styles.content}>{note.content}</p>
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
