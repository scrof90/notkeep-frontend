import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './NoteCreationForm.module.css';

const NoteCreationForm = ({
  onSubmit,
  inputTitleValue,
  inputContentValue,
  inputPinnedValue,
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
        <input
          type="textarea"
          value={inputTitleValue}
          onChange={onTitleChange}
          placeholder="Title"
        />
      )}
      <input
        type="textarea"
        value={inputContentValue}
        onChange={onContentChange}
        placeholder="Take a note..."
      />
      {!isBlurred && <input type="checkbox" value={inputPinnedValue} onChange={onPinnedChange} />}
      {!isBlurred && <button type="submit">save</button>}
    </form>
  );
};

NoteCreationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  inputTitleValue: PropTypes.string.isRequired,
  inputContentValue: PropTypes.string.isRequired,
  inputPinnedValue: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onPinnedChange: PropTypes.func.isRequired
};

export default NoteCreationForm;
