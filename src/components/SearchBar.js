import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { MdClose } from 'react-icons/md';

const SearchBar = ({ searchFilter, onSearchFilterChange, onSearchFilterClear }) => {
  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()} method="get" role="search">
      <MdSearch className="icon" />
      <input
        type="text"
        placeholder="Search"
        value={searchFilter}
        onChange={onSearchFilterChange}
      />
      <div className="icon-container">
        <MdClose className="icon" onClick={onSearchFilterClear} />
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
