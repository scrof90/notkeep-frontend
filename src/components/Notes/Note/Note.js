import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdPushPin, MdOutlinePushPin, MdDeleteForever } from 'react-icons/md';
import classes from './styles.module.scss';

const Note = ({ note, onPin, onDelete, isListView }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const onMouseOver = () => setIsMouseOver(true);
  const onMouseOut = () => setIsMouseOver(false);

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className={`${classes.note} ${isListView && classes.listView} ${
        isMouseOver && classes.mouseOver
      }`}
    >
      <button
        className={`${classes.pinBtn} ${!isMouseOver && classes.hidden}`}
        onClick={() => onPin(note.id)}
      >
        {note.pinned ? <MdPushPin /> : <MdOutlinePushPin />}
      </button>
      {note.title.length > 0 && <h3>{note.title}</h3>}
      <p>{note.content}</p>
      <div className={`${classes.bottomBar} ${!isMouseOver && classes.hidden}`}>
        <button onClick={() => onDelete(note.id)}>
          <MdDeleteForever />
        </button>
      </div>
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
  onPin: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isListView: PropTypes.bool.isRequired
};

export default Note;
