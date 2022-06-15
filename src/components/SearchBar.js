import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <MdSearch className="icon search-icon" />
      <form className="search-form" method="get" role="search">
        <input type="text" placeholder="Search" value={value} onChange={onChange} />
      </form>
      <MdCancel className="icon cancel-icon" />
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchBar;
