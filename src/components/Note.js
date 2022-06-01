import PropTypes from 'prop-types';

const Note = ({ note, togglePinned }) => {
  const noteStyle = {
    color: 'grey',
    paddingTop: '3px',
    fontSize: '15px'
  };

  return (
    <>
      <div className={noteStyle}>
        <p>{note.content}</p>
        <button onClick={() => togglePinned(note.id)}>{note.pinned ? 'unpin' : 'pin'}</button>
      </div>
    </>
  );
};

Note.propTypes = {
  note: PropTypes.exact({
    id: PropTypes.number,
    content: PropTypes.string,
    date: PropTypes.string,
    pinned: PropTypes.bool
  }).isRequired,
  togglePinned: PropTypes.func.isRequired
};

export default Note;
