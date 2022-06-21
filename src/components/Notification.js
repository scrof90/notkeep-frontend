import PropTypes from 'prop-types';
import styles from './Notification.module.css';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className={styles.error}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string
};

export default Notification;
