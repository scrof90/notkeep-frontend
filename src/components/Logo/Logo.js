import { MdInsertDriveFile } from 'react-icons/md';
import classes from './styles.module.scss';

const Logo = () => {
  return (
    <div className={classes.logo}>
      <div className={classes.iconContainer}>
        <MdInsertDriveFile />
      </div>
      <h1>NotKeep</h1>
    </div>
  );
};

export default Logo;
