import PropTypes from 'prop-types';
import { MdPushPin, MdOutlinePushPin } from 'react-icons/md';
import classes from './styles.module.scss';

const NoteCreationForm = ({
  onFocus,
  onSubmit,
  onTitleChange,
  onContentChange,
  onPinClick,
  titleValue,
  contentValue,
  isPinned,
  isBlurred
}) => {
  return (
    <form
      onFocus={onFocus}
      className={`${classes.noteCreationForm} ${isBlurred && classes.blurred}`}
      onSubmit={onSubmit}
    >
      <label className={classes.hidden} htmlFor="newNotePin">
        Pin:
      </label>
      <button
        id="newNotePin"
        className={`${classes.pinBtn} ${isBlurred && classes.hidden}`}
        onClick={onPinClick}
        type="button"
      >
        {isPinned ? <MdPushPin /> : <MdOutlinePushPin />}
      </button>
      <label className={classes.hidden} htmlFor="newNoteTitle">
        Title:
      </label>
      <input
        id="newNoteTitle"
        className={`${classes.titleInput} ${isBlurred && classes.hidden}`}
        type="textarea"
        value={titleValue}
        onChange={onTitleChange}
        placeholder="Title"
      />
      <label className={classes.hidden} htmlFor="newNoteContent">
        Note content:
      </label>
      <input
        id="newNoteContent"
        className={classes.contentInput}
        type="textarea"
        value={contentValue}
        onChange={onContentChange}
        placeholder="Take a note..."
      />
      <div className={`${classes.bottomBar} ${isBlurred && classes.hidden}`}>
        <button className={classes.saveBtn} type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

NoteCreationForm.propTypes = {
  onFocus: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  titleValue: PropTypes.string.isRequired,
  contentValue: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onPinClick: PropTypes.func.isRequired,
  isBlurred: PropTypes.bool.isRequired
};

export default NoteCreationForm;
