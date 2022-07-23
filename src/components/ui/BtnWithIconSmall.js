import PropTypes from 'prop-types';
import BtnTooltip from './BtnTooltip';
import classes from './assets/BtnWithIconSmall.module.scss';

const BtnWithIconSmall = ({ onClick, icon: Icon, tooltipText }) => {
  return (
    <button className={classes.btnWithIconSmall} onClick={onClick} type="button">
      <Icon />
      <BtnTooltip tip={tooltipText} />
    </button>
  );
};

BtnWithIconSmall.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.func.isRequired,
  tooltipText: PropTypes.string.isRequired
};

export default BtnWithIconSmall;
