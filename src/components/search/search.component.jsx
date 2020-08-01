import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

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
    </div>
  );
};

export default SearchBar;
