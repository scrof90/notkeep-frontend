import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdPushPin, MdOutlinePushPin, MdDeleteForever } from 'react-icons/md';
import classes from './assets/Note.module.scss';

const Note = ({ note, onClick, onPin, onDelete, isListView }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const onMouseOver = () => setIsMouseOver(true);
  const onMouseOut = () => setIsMouseOver(false);

  return (
    <div
      className={`${classes.note} ${isListView ? classes.listView : undefined} ${
        isMouseOver ? classes.mouseOver : undefined
      }`}
      onClick={(e) => onClick(e, note.id)}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <label htmlFor="pin" hidden>
        Pin:
      </label>
      <button
        id="pin"
        className={`${classes.pinBtn} ${!isMouseOver ? classes.transparent : undefined}`}
        onClick={(e) => onPin(e, note.id)}
        type="button"
      >
        {note.pinned ? <MdPushPin /> : <MdOutlinePushPin />}
      </button>
      <section>
        {note.title.length > 0 && <h3>{note.title}</h3>}
        <p>{note.content}</p>
      </section>
      <div className={`${classes.bottomBar} ${!isMouseOver ? classes.transparent : undefined}`}>
        <button onClick={(e) => onDelete(e, note.id)} type="button">
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
  onClick: PropTypes.func.isRequired,
  onPin: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isListView: PropTypes.bool.isRequired
};

export default Note;
