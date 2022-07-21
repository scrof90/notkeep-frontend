import PropTypes from 'prop-types';
import classes from './assets/BtnWithIconLarge.module.scss';

const BtnWithIconLarge = ({ onClick, icon: Icon }) => {
  return (
    <button className={classes.btnWithIconLarge} onClick={onClick} type="button">
      <Icon />
    </button>
  );
};

BtnWithIconLarge.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.func.isRequired
};

export default BtnWithIconLarge;
