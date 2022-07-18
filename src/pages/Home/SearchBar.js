import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import classes from './assets/SearchBar.module.scss';

const SearchBar = ({ searchFilter, onSearchFilterChange, onSearchFilterClear }) => {
  const [isBlurred, setIsBlurred] = useState(true);
  const handleOnFocusChange = () => setIsBlurred(!isBlurred);

  return (
    <form
      onFocus={handleOnFocusChange}
      onBlur={handleOnFocusChange}
      className={`${classes.searchBar} ${isBlurred && classes.blurred}`}
      onSubmit={(e) => e.preventDefault()}
      method="get"
      role="search"
    >
      <div className={classes.iconContainer}>
        <MdSearch />
      </div>
      <label className={classes.hidden} htmlFor="search">
        Search:
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search"
        value={searchFilter}
        onChange={onSearchFilterChange}
      />
      <button onClick={onSearchFilterClear} type="reset">
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
