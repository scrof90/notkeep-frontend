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
  return (
    <form className={styles.noteCreationForm} onSubmit={onSubmit}>
      <input type="text" value={inputTitleValue} onChange={onTitleChange} />
      <input type="text" value={inputContentValue} onChange={onContentChange} />
      <input type="checkbox" value={inputPinnedValue} onChange={onPinnedChange} />
      <button type="submit">save</button>
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
