import PropTypes from 'prop-types';
import { MdPushPin, MdOutlinePushPin } from 'react-icons/md';
import classes from './styles.module.scss';

const NoteCreationForm = ({ newNote, onFocus, onSubmit, onChange, onPin, isBlurred }) => {
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
        onClick={onPin}
        type="button"
      >
        {newNote.pinned ? <MdPushPin /> : <MdOutlinePushPin />}
      </button>
      <label htmlFor="newNoteTitle" hidden>
        Title:
      </label>
      <input
        id="newNoteTitle"
        name="title"
        className={`${classes.titleInput} ${isBlurred ? classes.hidden : undefined}`}
        type="textarea"
        value={newNote.title}
        onChange={onChange}
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
        value={newNote.content}
        onChange={onChange}
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
  newNote: PropTypes.exact({
    title: PropTypes.string,
    content: PropTypes.string,
    pinned: PropTypes.bool
  }).isRequired,
  onFocus: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onPin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isBlurred: PropTypes.bool.isRequired
};

export default NoteCreationForm;
