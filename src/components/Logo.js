import { MdInsertDriveFile } from 'react-icons/md';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconContainer}>
        <MdInsertDriveFile className={styles.icon} />
      </div>
      <h1>NotKeep</h1>
    </div>
  );
};

export default Logo;
