import PropTypes from 'prop-types';
import classes from './styles.module.scss';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className={classes.error}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string
};

export default Notification;
