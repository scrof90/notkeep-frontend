import PropTypes from 'prop-types';

const Note = ({ note }) => {
  const noteStyle = {
    color: 'grey',
    paddingTop: '3px',
    fontSize: '15px'
  };

  return (
    <>
      <li className={noteStyle}>{note.content}</li>
    </>
  );
};

Note.propTypes = {
  note: PropTypes.object.isRequired
};

export default Note;
