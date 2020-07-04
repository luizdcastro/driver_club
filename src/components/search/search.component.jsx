import React from 'react';

import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import './search.styles.css';

const SearchBar = ({ onChange }) => {
  return (
    <div className="search-container">
      <SearchIcon className="search-icon" />
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
