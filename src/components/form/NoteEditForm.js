import PropTypes from 'prop-types';
import { MdPushPin, MdOutlinePushPin } from 'react-icons/md';
import BtnWithIconSmall from 'components/ui/BtnWithIconSmall';
import autoresizeTextarea from 'utils/autoresizeTextarea';
import classes from './assets/NoteEditForm.module.scss';

const NoteEditForm = ({ note, onPin, onChange, onSubmit }) => {
  return (
    <>
      <form className={classes.noteEditForm} onSubmit={(e) => onSubmit(e, note.id)}>
        <div className={classes.pinBtnContainer}>
          <BtnWithIconSmall
            onClick={onPin}
            icon={note.pinned ? MdPushPin : MdOutlinePushPin}
            tooltipText={note.pinned ? 'Unpin note' : 'Pin note'}
          />
        </div>
        <label htmlFor="title" hidden>
          Title:
        </label>
        <textarea
          id="title"
          name="title"
          className={classes.titleTextarea}
          value={note.title}
          onChange={onChange}
          placeholder="Title"
          onInput={autoresizeTextarea}
        />
        <label htmlFor="content" hidden>
          Note content:
        </label>
        <textarea
          id="content"
          name="content"
          className={classes.contentTextarea}
          value={note.content}
          onChange={onChange}
          placeholder="Take a note..."
          onInput={autoresizeTextarea}
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
  note: PropTypes.exact({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    pinned: PropTypes.bool
  }).isRequired,
  onPin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default NoteEditForm;
