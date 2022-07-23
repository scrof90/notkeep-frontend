import PropTypes from 'prop-types';
import BtnTooltip from './BtnTooltip';
import classes from './assets/BtnWithIconLarge.module.scss';

const BtnWithIconLarge = ({ onClick, icon: Icon, tooltipText }) => {
  return (
    <button className={classes.btnWithIconLarge} onClick={onClick} type="button">
      <Icon />
      <BtnTooltip tip={tooltipText} />
    </button>
  );
};

BtnWithIconLarge.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.func.isRequired,
  tooltipText: PropTypes.string.isRequired
};

export default BtnWithIconLarge;
