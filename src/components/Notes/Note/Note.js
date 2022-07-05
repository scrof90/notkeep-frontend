import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdPushPin, MdOutlinePushPin, MdDeleteForever } from 'react-icons/md';
import classes from './styles.module.scss';

const Note = ({ note, onPin, onDelete, isListView }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const onMouseOver = () => setIsMouseOver(true);
  const onMouseOut = () => setIsMouseOver(false);
  const onClick = () => {
    console.log('success!');
  };

  return (
    <div
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className={`${classes.note} ${isListView && classes.listView} ${
        isMouseOver && classes.mouseOver
      }`}
    >
      <button
        className={`${classes.pinBtn} ${!isMouseOver && classes.hidden}`}
        onClick={(e) => onPin(e, note.id)}
        type="button"
      >
        {note.pinned ? <MdPushPin /> : <MdOutlinePushPin />}
      </button>
      <section>
        {note.title.length > 0 && <h3>{note.title}</h3>}
        <p>{note.content}</p>
      </section>
      <div className={`${classes.bottomBar} ${!isMouseOver && classes.hidden}`}>
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
  onPin: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isListView: PropTypes.bool.isRequired
};

export default Note;
