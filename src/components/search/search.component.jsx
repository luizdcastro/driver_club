import React from 'react';

const SearchBar = ({ onChange }) => {
  return (
    <div>
      <input
        placeholder="Pesquise por estabelecimentos"
        type="text"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
