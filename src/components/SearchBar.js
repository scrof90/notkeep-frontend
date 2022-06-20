import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { MdClose } from 'react-icons/md';

const SearchBar = ({ searchFilter, onSearchFilterChange, onSearchFilterClear }) => {
  return (
    <div className="search-bar">
      <MdSearch className="icon" />
      <form onSubmit={(e) => e.preventDefault()} className="search-form" method="get" role="search">
        <input
          type="text"
          placeholder="Search"
          value={searchFilter}
          onChange={onSearchFilterChange}
        />
      </form>
      <div className="icon-container">
        <MdClose className="icon" onClick={onSearchFilterClear} />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  searchFilter: PropTypes.string.isRequired,
  onSearchFilterChange: PropTypes.func.isRequired,
  onSearchFilterClear: PropTypes.func.isRequired
};

export default SearchBar;
