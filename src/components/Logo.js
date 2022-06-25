import { MdInsertDriveFile } from 'react-icons/md';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <MdInsertDriveFile />
      </div>
      <h1>NotKeep</h1>
    </div>
  );
};

export default Logo;
