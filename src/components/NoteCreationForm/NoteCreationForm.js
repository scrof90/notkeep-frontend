import { useState } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { MdPushPin, MdOutlinePushPin } from 'react-icons/md';
import classes from './styles.module.scss';

const NoteCreationForm = ({
  onSubmit,
  titleValue,
  contentValue,
  isPinned,
  onTitleChange,
  onContentChange,
  onPinClick
}) => {
  const [isBlurred, setIsBlurred] = useState(true);
  const handleFocus = () => setIsBlurred(false);
  const handleBlur = () => setIsBlurred(true);

  return (
    <OutsideClickHandler onOutsideClick={handleBlur}>
      <form
        onFocus={handleFocus}
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
    </OutsideClickHandler>
  );
};

NoteCreationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  titleValue: PropTypes.string.isRequired,
  contentValue: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onPinClick: PropTypes.func.isRequired
};

export default NoteCreationForm;
