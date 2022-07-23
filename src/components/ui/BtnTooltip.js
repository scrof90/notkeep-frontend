import PropTypes from 'prop-types';
import capitalizeStr from 'utils/capitalizeStr';
import classes from './assets/BtnTooltip.module.scss';

const BtnTooltip = ({ tip }) => {
  return (
    <div className={classes.btnTooltip}>
      <span>{capitalizeStr(tip)}</span>
    </div>
  );
};

BtnTooltip.propTypes = {
  tip: PropTypes.string.isRequired
};

export default BtnTooltip;
