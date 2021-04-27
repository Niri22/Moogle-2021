import React from 'react'
import './searchBar.css'

const SearchBar = ({input:keyword,onChange:setKeyword}) => {
  return (
    <div className={'searchBar'}>
      <input 
        className={'searchInput'}
        key="random1"
        value={keyword}
        placeholder={"Search here!"}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
}

export default SearchBar