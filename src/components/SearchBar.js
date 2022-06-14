import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange }) => {
  return (
    <div>
      <form method="get" role="search">
        <input type="text" placeholder="Search" value={value} onChange={onChange} />
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchBar;
