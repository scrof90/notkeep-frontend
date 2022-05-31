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

export default Note;
