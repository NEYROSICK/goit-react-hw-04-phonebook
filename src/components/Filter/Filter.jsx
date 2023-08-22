import PropTypes from 'prop-types';
import cl from './filter.module.css';
import Search from 'components/ui/icons/Search';

const Filter = ({ handleFilterChange, state }) => {
  return (
    <div className={cl.filter}>
      <label className={cl.label} htmlFor="filter">
        Find contacts by name || number
      </label>
      <div className={cl.inputField}>
        <input
          className={cl.input}
          type="text"
          name="filter"
          id="filter"
          onChange={handleFilterChange}
          value={state.filter}
        />
        <Search />
      </div>
    </div>
  );
};

Filter.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

export default Filter;
