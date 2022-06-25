import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import styles from './SearchBar.module.css';

const SearchBar = ({ searchFilter, onSearchFilterChange, onSearchFilterClear }) => {
  return (
    <form
      className={styles.wrapper}
      onSubmit={(e) => e.preventDefault()}
      method="get"
      role="search"
    >
      <div className={styles.iconContainer}>
        <MdSearch className={styles.icon} />
      </div>
      <input
        className={styles.input}
        type="text"
        placeholder="Search"
        value={searchFilter}
        onChange={onSearchFilterChange}
      />
      <button className={styles.btn} onClick={onSearchFilterClear}>
        <MdClose className={styles.icon} />
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  searchFilter: PropTypes.string.isRequired,
  onSearchFilterChange: PropTypes.func.isRequired,
  onSearchFilterClear: PropTypes.func.isRequired
};

export default SearchBar;
