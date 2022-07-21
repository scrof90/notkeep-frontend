import PropTypes from 'prop-types';
import { MdRefresh, MdOutlineViewAgenda, MdGridView } from 'react-icons/md';
import { GoMarkGithub } from 'react-icons/go';
import BtnWithIconLarge from 'components/ui/BtnWithIconLarge';
import classes from './assets/ToolBar.module.scss';

const ToolBar = ({ refresh, isListView, toggleViewMode }) => {
  return (
    <div className={classes.toolBar}>
      <BtnWithIconLarge onClick={refresh} icon={MdRefresh} />
      <BtnWithIconLarge
        onClick={toggleViewMode}
        icon={isListView ? MdGridView : MdOutlineViewAgenda}
      />
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
