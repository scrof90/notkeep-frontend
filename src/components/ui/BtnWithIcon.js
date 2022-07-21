import PropTypes from 'prop-types';
import classes from './assets/BtnWithIcon.module.scss';

const BtnWithIcon = ({ onClick, icon: Icon }) => {
  return (
    <button className={classes.btnWithIcon} onClick={onClick} type="button">
      <Icon />
    </button>
  );
};

BtnWithIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.func.isRequired
};

export default BtnWithIcon;
