import cl from './filter.module.css';
import Search from 'components/ui/icons/Search';
import { useContext } from 'react';
import { Context } from 'context/globalContext';

const Filter = () => {
  const { filter, setFilter } = useContext(Context);

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

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
          value={filter}
        />
        <Search />
      </div>
    </div>
  );
};

export default Filter;
