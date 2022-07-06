import { useState } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { MdPushPin, MdOutlinePushPin, MdDeleteForever } from 'react-icons/md';
import classes from './styles.module.scss';

const Note = ({ note, onPin, onDelete, isListView }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const onMouseOver = () => setIsMouseOver(true);
  const onMouseOut = () => setIsMouseOver(false);
  const onBlur = () => {
    setIsFocused(false);
  };
  const onClick = (e) => {
    if (isFocused) return;
    e.preventDefault();
    setIsFocused(true);
  };

  return (
    <OutsideClickHandler onOutsideClick={onBlur}>
      <form
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        className={`${classes.note} ${isListView && classes.listView} ${
          isMouseOver && classes.mouseOver
        } ${isFocused && classes.focused}`}
      >
        <label className={classes.hidden} htmlFor="pin">
          Pin:
        </label>
        <button
          id="pin"
          className={`${classes.pinBtn} ${!isMouseOver && !isFocused && classes.transparent}`}
          onClick={(e) => onPin(e, note.id)}
          type="button"
        >
          {note.pinned ? <MdPushPin /> : <MdOutlinePushPin />}
        </button>
        <label className={classes.hidden} htmlFor="pin">
          Pin:
        </label>
        <section>
          {note.title.length > 0 && <h3>{note.title}</h3>}
          <p>{note.content}</p>
        </section>
        <div
          className={`${classes.bottomBar} ${!isMouseOver && !isFocused && classes.transparent}`}
        >
          <button
            className={isFocused && classes.hidden}
            onClick={(e) => onDelete(e, note.id)}
            type="button"
          >
            <MdDeleteForever />
          </button>
          <label className={classes.hidden} htmlFor="submit">
            Submit:
          </label>
          <button
            id="submit"
            className={isFocused ? classes.saveBtn : classes.hidden}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
      <div onClick={onBlur} className={isFocused ? classes.bg : classes.hidden}></div>
    </OutsideClickHandler>
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
