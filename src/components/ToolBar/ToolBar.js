import PropTypes from 'prop-types';
import { MdRefresh, MdOutlineViewAgenda, MdGridView } from 'react-icons/md';
import { GoMarkGithub } from 'react-icons/go';
import classes from './styles.module.scss';

const ToolBar = ({ refresh, isListView, toggleViewMode }) => {
  return (
    <div className={classes.toolBar}>
      <button onClick={refresh} type="button">
        <MdRefresh />
      </button>
      <button onClick={toggleViewMode} type="button">
        {isListView ? <MdGridView /> : <MdOutlineViewAgenda />}
      </button>
      <a href="https://github.com/scrof90/notkeep-frontend">
        <GoMarkGithub />
      </a>
    </div>
  );
};

ToolBar.propTypes = {
  refresh: PropTypes.func.isRequired,
  isListView: PropTypes.bool.isRequired,
  toggleViewMode: PropTypes.func.isRequired
};

export default ToolBar;
