import PropTypes from 'prop-types';
import { MdRefresh, MdOutlineViewAgenda, MdGridView, MdOutlineDarkMode } from 'react-icons/md';
import styles from './ToolBar.module.css';

const ToolBar = ({ isListView, toggleViewMode }) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.btn}>
        <MdRefresh />
      </button>
      <button className={styles.btn} onClick={toggleViewMode}>
        {isListView ? <MdGridView /> : <MdOutlineViewAgenda />}
      </button>
      <button className={styles.btn}>
        <MdOutlineDarkMode />
      </button>
    </div>
  );
};

ToolBar.propTypes = {
  isListView: PropTypes.bool.isRequired,
  toggleViewMode: PropTypes.func.isRequired
};

export default ToolBar;
