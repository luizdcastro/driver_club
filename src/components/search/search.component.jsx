import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';

import './search.styles.css';

const SearchBar = ({ onChange }) => {
  return (
    <div className="search-container">
      <SearchIcon className="search-icon" style={{ fontSize: 30 }} />
      <input
        className="search-input"
        placeholder="Busque pelo nome do parceiro"
        type="text"
        onChange={onChange}
      />
      <FilterListIcon className="filter-icon" style={{ fontSize: 30 }} />
    </div>
  );
};

export default SearchBar;
