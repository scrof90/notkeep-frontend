import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdPushPin, MdOutlinePushPin } from 'react-icons/md';
import styles from './NoteCreationForm.module.css';

const NoteCreationForm = ({
  onSubmit,
  titleValue,
  contentValue,
  pinnedValue,
  onTitleChange,
  onContentChange,
  onPinnedChange
}) => {
  const [isBlurred, setIsBlurred] = useState(true);
  const handleOnFocusChange = () => setIsBlurred(!isBlurred);

  return (
    <form
      onFocus={handleOnFocusChange}
      onBlur={handleOnFocusChange}
      className={`${styles.wrapper} ${isBlurred && styles.blurred}`}
      onSubmit={onSubmit}
    >
      {!isBlurred && (
        <button className={styles.pin} value={pinnedValue} onChange={onPinnedChange}>
          {pinnedValue ? <MdPushPin /> : <MdOutlinePushPin />}
        </button>
      )}
      {!isBlurred && (
        <input type="textarea" value={titleValue} onChange={onTitleChange} placeholder="Title" />
      )}
      <input
        type="textarea"
        value={contentValue}
        onChange={onContentChange}
        placeholder="Take a note..."
      />
      {!isBlurred && <button type="submit">save</button>}
    </form>
  );
};

NoteCreationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  titleValue: PropTypes.string.isRequired,
  contentValue: PropTypes.string.isRequired,
  pinnedValue: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onPinnedChange: PropTypes.func.isRequired
};

export default NoteCreationForm;
