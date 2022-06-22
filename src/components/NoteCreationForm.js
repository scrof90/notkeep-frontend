import PropTypes from 'prop-types';
import styles from './NoteCreationForm.module.css';

const NoteCreationForm = ({ onSubmit, inputValue, onChange }) => {
  return (
    <form className={styles.noteCreationForm} onSubmit={onSubmit}>
      <input value={inputValue} onChange={onChange} />
      <button type="submit">save</button>
    </form>
  );
};

NoteCreationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default NoteCreationForm;
