import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import styles from './SearchBar.module.css';

const SearchBar = ({ searchFilter, onSearchFilterChange, onSearchFilterClear }) => {
  const [isBlurred, setIsBlurred] = useState(true);
  const handleOnFocusChange = () => setIsBlurred(!isBlurred);

  return (
    <form
      onFocus={handleOnFocusChange}
      onBlur={handleOnFocusChange}
      className={`${styles.wrapper} ${isBlurred && styles.blurred}`}
      onSubmit={(e) => e.preventDefault()}
      method="get"
      role="search"
    >
      <div className={styles.iconContainer}>
        <MdSearch />
      </div>
      <input
        type="text"
        placeholder="Search"
        value={searchFilter}
        onChange={onSearchFilterChange}
      />
      <button onClick={onSearchFilterClear}>
        <MdClose />
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
