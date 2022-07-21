import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import BtnWithIconLarge from 'components/ui/BtnWithIconLarge';
import classes from './assets/SearchBar.module.scss';

const SearchBar = ({ searchFilter, onFocusChange, onChange, onClear, isBlurred }) => {
  return (
    <form
      onFocus={onFocusChange}
      onBlur={onFocusChange}
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
        onChange={onChange}
      />
      <div>
        <BtnWithIconLarge onClick={onClear} icon={MdClose} />
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  searchFilter: PropTypes.string.isRequired,
  onFocusChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  isBlurred: PropTypes.bool.isRequired
};

export default SearchBar;
