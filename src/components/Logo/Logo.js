import { MdInsertDriveFile } from 'react-icons/md';
import classes from './styles.module.scss';

const Logo = () => {
  return (
    <div className={classes.wrapper}>
      <div>
        <MdInsertDriveFile />
      </div>
      <h1>NotKeep</h1>
    </div>
  );
};

export default Logo;
