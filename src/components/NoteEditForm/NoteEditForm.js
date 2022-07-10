import PropTypes from 'prop-types';
// import OutsideClickHandler from 'react-outside-click-handler';
import { MdPushPin, MdOutlinePushPin } from 'react-icons/md';
import classes from './styles.module.scss';

const NoteEditForm = ({
  note,
  onPin,
  onTitleChange,
  onContentChange,
  onSubmit,
  titleValue,
  contentValue,
  isPinned
}) => {
  return (
    <>
      <form className={classes.noteEditForm} onSubmit={(e) => onSubmit(e, note.id)}>
        <label htmlFor="pin" hidden>
          Pin:
        </label>
        <button id="pin" name="pin" className={classes.pinBtn} onClick={onPin} type="button">
          {isPinned ? <MdPushPin /> : <MdOutlinePushPin />}
        </button>
        <label htmlFor="title" hidden>
          Title:
        </label>
        <input
          id="title"
          name="title"
          className={classes.titleInput}
          type="textarea"
          value={titleValue}
          onChange={onTitleChange}
          placeholder="Title"
        />
        <label htmlFor="content" hidden>
          Note content:
        </label>
        <input
          id="content"
          name="content"
          className={classes.contentInput}
          type="textarea"
          value={contentValue}
          onChange={onContentChange}
          placeholder="Take a note..."
        />
        <div className={classes.bottomBar}>
          <label htmlFor="submit" hidden>
            Submit:
          </label>
          <button id="submit" className={classes.saveBtn} type="submit">
            Save
          </button>
        </div>
      </form>
      <div onClick={(e) => onSubmit(e, note.id)} className={classes.bg}></div>
    </>
  );
};

NoteEditForm.propTypes = {
  note: PropTypes.object.isRequired,
  onPin: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  titleValue: PropTypes.string.isRequired,
  contentValue: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired
};

export default NoteEditForm;
