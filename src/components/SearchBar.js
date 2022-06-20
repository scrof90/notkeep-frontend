import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import styles from './SearchBar.module.css';

const SearchBar = ({ searchFilter, onSearchFilterChange, onSearchFilterClear }) => {
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()} method="get" role="search">
      <MdSearch className={styles.svg} />
      <input
        className={styles.input}
        type="text"
        placeholder="Search"
        value={searchFilter}
        onChange={onSearchFilterChange}
      />
      <div className={styles.iconContainer}>
        <MdClose className={styles.svg} onClick={onSearchFilterClear} />
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  searchFilter: PropTypes.string.isRequired,
  onSearchFilterChange: PropTypes.func.isRequired,
  onSearchFilterClear: PropTypes.func.isRequired
};

export default SearchBar;
