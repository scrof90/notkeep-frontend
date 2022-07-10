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
      className={`${classes.noteCreationForm} ${isBlurred ? classes.blurred : undefined}`}
      onSubmit={onSubmit}
    >
      <label htmlFor="newNotePin" hidden>
        Pin:
      </label>
      <button
        id="newNotePin"
        name="pin"
        className={`${classes.pinBtn} ${isBlurred ? classes.hidden : undefined}`}
        onClick={onPinClick}
        type="button"
      >
        {isPinned ? <MdPushPin /> : <MdOutlinePushPin />}
      </button>
      <label htmlFor="newNoteTitle" hidden>
        Title:
      </label>
      <input
        id="newNoteTitle"
        name="title"
        className={`${classes.titleInput} ${isBlurred ? classes.hidden : undefined}`}
        type="textarea"
        value={titleValue}
        onChange={onTitleChange}
        placeholder="Title"
      />
      <label htmlFor="newNoteContent" hidden>
        Note content:
      </label>
      <input
        id="newNoteContent"
        name="content"
        className={classes.contentInput}
        type="textarea"
        value={contentValue}
        onChange={onContentChange}
        placeholder="Take a note..."
      />
      <div className={`${classes.bottomBar} ${isBlurred ? classes.hidden : undefined}`}>
        <label htmlFor="submit" hidden>
          Submit:
        </label>
        <button id="submit" className={classes.saveBtn} type="submit">
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
