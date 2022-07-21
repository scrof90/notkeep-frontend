import PropTypes from 'prop-types';
import classes from './assets/BtnWithIconSmall.module.scss';

const BtnWithIconSmall = ({ onClick, icon: Icon }) => {
  return (
    <button className={classes.btnWithIconSmall} onClick={onClick} type="button">
      <Icon />
    </button>
  );
};

BtnWithIconSmall.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.func.isRequired
};

export default BtnWithIconSmall;
