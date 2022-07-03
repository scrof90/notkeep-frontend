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
      <button className={`${classes.pinBtn} ${isBlurred && classes.hidden}`} onClick={onPinClick}>
        {isPinned ? <MdPushPin /> : <MdOutlinePushPin />}
      </button>
      <input
        className={`${classes.titleInput} ${isBlurred && classes.hidden}`}
        type="textarea"
        value={titleValue}
        onChange={onTitleChange}
        placeholder="Title"
      />
      <input
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
