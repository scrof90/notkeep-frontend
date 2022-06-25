import PropTypes from 'prop-types';
import { MdRefresh, MdOutlineViewAgenda, MdGridView, MdOutlineDarkMode } from 'react-icons/md';
import styles from './ToolBar.module.css';

const ToolBar = ({ refresh, isListView, toggleViewMode }) => {
  return (
    <div className={styles.wrapper}>
      <button onClick={refresh}>
        <MdRefresh />
      </button>
      <button onClick={toggleViewMode}>
        {isListView ? <MdGridView /> : <MdOutlineViewAgenda />}
      </button>
      <button>
        <MdOutlineDarkMode />
      </button>
    </div>
  );
};

ToolBar.propTypes = {
  refresh: PropTypes.func.isRequired,
  isListView: PropTypes.bool.isRequired,
  toggleViewMode: PropTypes.func.isRequired
};

export default ToolBar;
